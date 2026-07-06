import {
  TOUR_GUIDE_ACCOUNT_FIELD,
  TOUR_GUIDE_DRAFT_STATUS,
  TOUR_GUIDE_EMAIL_FIELD,
  TOUR_GUIDE_PUBLISHED_STATUS,
  TOUR_GUIDES_COLLECTION,
} from "./config";

import type { DirectusUser } from "./types";

export type { DirectusUser };

export function getDirectusServerUrl(): string | null {
  const raw =
    process.env.DIRECTUS_WRITE_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_TOOL_PORTAL_DIRECTUS_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

/** Server-only static token for profile lookup when Guide/Public rules miss linked rows. */
function getDirectusAdminToken(): string | null {
  return process.env.DIRECTUS_ADMIN_TOKEN?.trim() || null;
}

function directusAdminAuthHeaders(): HeadersInit | undefined {
  const token = getDirectusAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export function getBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.toLowerCase().startsWith("bearer ")) return null;
  return header.slice(7).trim() || null;
}

export async function parseDirectusError(response: Response): Promise<string> {
  try {
    const text = await response.text();
    if (!text.trim()) {
      return `Request failed (${response.status})`;
    }
    const body = JSON.parse(text);
    const errors = body?.errors;
    if (Array.isArray(errors) && errors[0]?.message) {
      return String(errors[0].message);
    }
    if (body?.error?.message) return String(body.error.message);
  } catch {
    // ignore
  }
  return `Request failed (${response.status})`;
}

async function parseDirectusJson<T>(response: Response): Promise<T | null> {
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Invalid response from Directus (${response.status}).`);
  }
}

interface AuthTokensResponse {
  data?: {
    access_token?: string;
    refresh_token?: string;
    expires?: number;
  };
}

interface MeResponse {
  data?: DirectusUser;
}

/** Auth headers for Directus user endpoints (login session). */
function directusUserAuthHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

type ProfileDirectusAuth =
  | { mode: "user"; accessToken: string }
  | { mode: "public" };

/** Writes prefer the guide token; fall back to Public when the Guide role has no access. */
function resolvePortalProfileWriteAuth(
  userAccessToken?: string | null,
): ProfileDirectusAuth {
  if (userAccessToken) {
    return { mode: "user", accessToken: userAccessToken };
  }
  return { mode: "public" };
}

function isDirectusCollectionPermissionError(message: string): boolean {
  return /don't have permission to access collection/i.test(message);
}

async function directusWriteWithAuthFallback(
  userAccessToken: string | null | undefined,
  request: (auth: ProfileDirectusAuth) => Promise<Response>,
): Promise<Response> {
  const primaryAuth = resolvePortalProfileWriteAuth(userAccessToken);
  const response = await request(primaryAuth);
  if (response.ok || primaryAuth.mode !== "user") {
    return response;
  }

  const message = await parseDirectusError(response.clone());
  if (!isDirectusCollectionPermissionError(message)) {
    return response;
  }

  return request({ mode: "public" });
}

function directusProfileHeaders(
  auth: ProfileDirectusAuth,
  json = false,
  returnRepresentation = false,
): HeadersInit {
  const headers: Record<string, string> = {};
  if (auth.mode === "user") {
    headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  if (json) headers["Content-Type"] = "application/json";
  if (returnRepresentation) headers.Prefer = "return=representation";
  return headers;
}

/** Public-only headers (legacy fallback). */
function directusPublicHeaders(
  json = false,
  returnRepresentation = false,
): HeadersInit | undefined {
  const headers: Record<string, string> = {};
  if (json) headers["Content-Type"] = "application/json";
  if (returnRepresentation) headers.Prefer = "return=representation";
  return Object.keys(headers).length > 0 ? headers : undefined;
}

/** Resolve email from /users/me or the address used at sign-in. */
export async function enrichDirectusUser(
  user: DirectusUser,
  knownEmail?: string,
): Promise<DirectusUser> {
  const fromUser = user.email?.trim().toLowerCase();
  if (fromUser) {
    return { ...user, email: fromUser };
  }

  const normalizedKnown = knownEmail?.trim().toLowerCase();
  if (normalizedKnown) {
    return { ...user, email: normalizedKnown };
  }

  return user;
}

export async function directusFetchCurrentUser(
  baseUrl: string,
  accessToken: string,
  knownEmail?: string,
): Promise<DirectusUser> {
  const response = await fetch(
    `${baseUrl}/users/me?fields=id,email,first_name,last_name`,
    {
      headers: directusUserAuthHeaders(accessToken),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = (await response.json()) as MeResponse;
  if (!json.data?.id) {
    throw new Error("Could not load user profile.");
  }

  return enrichDirectusUser(json.data, knownEmail);
}

export async function directusLogin(
  baseUrl: string,
  email: string,
  password: string,
) {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
      mode: "json",
    }),
  });

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = (await response.json()) as AuthTokensResponse;
  const accessToken = json.data?.access_token;
  const refreshToken = json.data?.refresh_token;
  const expires = json.data?.expires ?? 900_000;

  if (!accessToken || !refreshToken) {
    throw new Error("Invalid login response.");
  }

  const user = await directusFetchCurrentUser(
    baseUrl,
    accessToken,
    email.trim().toLowerCase(),
  );
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires,
    user,
  };
}

export type DirectusRegisterResult =
  | {
      kind: "session";
      access_token: string;
      refresh_token: string;
      expires: number;
      user: DirectusUser;
    }
  | {
      kind: "registered";
      message: string;
    };

async function directusRegisterPublic(
  baseUrl: string,
  input: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  },
) {
  const verificationUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  const body: Record<string, string> = {
    email: input.email.trim().toLowerCase(),
    password: input.password,
    first_name: input.first_name.trim(),
    last_name: input.last_name.trim(),
  };
  if (verificationUrl) {
    body.verification_url = `${verificationUrl.replace(/\/$/, "")}/tour-guides/portal`;
  }

  const response = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }
}

export async function directusRegister(
  baseUrl: string,
  input: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  },
): Promise<DirectusRegisterResult> {
  const normalized = {
    ...input,
    email: input.email.trim().toLowerCase(),
  };

  // Avoid duplicate Directus users when "Create account" is used with existing credentials.
  try {
    const session = await directusLogin(
      baseUrl,
      normalized.email,
      normalized.password,
    );
    return { kind: "session", ...session };
  } catch (loginError) {
    const loginMessage =
      loginError instanceof Error ? loginError.message : "Sign-in failed.";
    if (!/invalid user credentials/i.test(loginMessage)) {
      throw loginError;
    }
  }

  try {
    await directusRegisterPublic(baseUrl, normalized);
  } catch (registerError) {
    const registerMessage =
      registerError instanceof Error ? registerError.message : "Registration failed.";
    if (/unique|already|duplicate|exists/i.test(registerMessage)) {
      throw new Error(
        "An account with this email already exists. Use the Sign in tab with your password.",
      );
    }
    throw registerError;
  }

  try {
    const session = await directusLogin(
      baseUrl,
      normalized.email,
      normalized.password,
    );
    return { kind: "session", ...session };
  } catch (loginError) {
    const loginMessage =
      loginError instanceof Error ? loginError.message : "Sign-in failed.";
    const isCredentialError = /invalid user credentials/i.test(loginMessage);

    return {
      kind: "registered",
      message: isCredentialError
        ? "Your account was created. If email verification is enabled in Directus, verify your email first, then sign in with the same password."
        : `Your account was created but automatic sign-in failed (${loginMessage}). Please sign in manually.`,
    };
  }
}

export async function directusRefresh(
  baseUrl: string,
  refreshToken: string,
) {
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = (await response.json()) as AuthTokensResponse;
  const accessToken = json.data?.access_token;
  const nextRefresh = json.data?.refresh_token ?? refreshToken;
  const expires = json.data?.expires ?? 900_000;

  if (!accessToken) {
    throw new Error("Could not refresh session.");
  }

  const user = await directusFetchCurrentUser(baseUrl, accessToken);
  return {
    access_token: accessToken,
    refresh_token: nextRefresh,
    expires,
    user,
  };
}

/** Guide-facing saves must never accept status from the client. */
export function sanitizeTourGuidePortalPayload(
  payload: Record<string, unknown>,
): Record<string, unknown> {
  const next = { ...payload };
  delete next.status;
  delete next.id;
  delete next[TOUR_GUIDE_EMAIL_FIELD];
  delete next[TOUR_GUIDE_ACCOUNT_FIELD];
  return next;
}

export function buildTourGuideProfilePayload(
  fields: Record<string, unknown>,
  user: DirectusUser,
): TourGuideProfilePayload {
  return withOwnerOnPayload(
    {
      ...sanitizeTourGuidePortalPayload(fields),
      status: TOUR_GUIDE_DRAFT_STATUS,
    },
    user,
  );
}

function normalizeSavedGuideProfile(
  profile: Record<string, unknown>,
): Record<string, unknown> {
  return { ...profile, status: TOUR_GUIDE_DRAFT_STATUS };
}

export function coerceDirectusId(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }
  if (typeof value === "string") {
    const id = Number.parseInt(value.trim(), 10);
    return Number.isFinite(id) && id > 0 ? id : null;
  }
  return null;
}

function extractCreatedItemId(response: Response): number | null {
  const location = response.headers.get("location");
  if (!location) return null;
  const match = location.match(/\/items\/[^/]+\/(\d+)\/?$/);
  return match ? coerceDirectusId(match[1]) : null;
}

function buildProfileFromSavePayload(
  payload: TourGuideProfilePayload,
  user: DirectusUser,
  id?: number | null,
): Record<string, unknown> {
  const profile = buildTourGuideProfilePayload(payload, user);
  if (id != null) profile.id = id;
  return normalizeSavedGuideProfile(profile);
}

async function resolveSavedProfileAfterWrite(
  baseUrl: string,
  user: DirectusUser,
  payload: TourGuideProfilePayload,
  response: Response,
  userAccessToken: string | null | undefined,
  options: { id?: number | null; profileIdHint?: number | null },
): Promise<Record<string, unknown>> {
  const json = await parseDirectusJson<{ data?: Record<string, unknown> }>(
    response,
  );

  const resolvedId =
    coerceDirectusId(json?.data?.id) ??
    extractCreatedItemId(response) ??
    options.id ??
    options.profileIdHint ??
    null;

  if (json?.data && typeof json.data === "object") {
    const data = normalizeProfileRecord(json.data, resolvedId);
    return finalizeSavedGuideProfile(baseUrl, user, data, userAccessToken);
  }

  if (resolvedId != null) {
    const snapshot = buildProfileFromSavePayload(payload, user, resolvedId);
    return finalizeSavedGuideProfile(baseUrl, user, snapshot, userAccessToken);
  }

  const refetched = await findPortalGuideProfileByUser(
    baseUrl,
    user,
    options.profileIdHint ?? options.id ?? coerceDirectusId(resolvedId),
    { userAccessToken },
  );
  if (refetched && typeof refetched === "object") {
    return finalizeSavedGuideProfile(
      baseUrl,
      user,
      refetched as Record<string, unknown>,
      userAccessToken,
    );
  }

  // Directus accepted the write but Public Read cannot load the row back.
  return buildProfileFromSavePayload(payload, user, resolvedId);
}

export type TourGuideProfilePayload = Record<string, unknown>;

function normalizeGuideEmail(email: string | null | undefined): string {
  return email?.trim().toLowerCase() ?? "";
}

function withOwnerOnPayload(
  payload: TourGuideProfilePayload,
  user: DirectusUser,
): TourGuideProfilePayload {
  const next = { ...payload };
  const email = normalizeGuideEmail(user.email);
  if (email) next[TOUR_GUIDE_EMAIL_FIELD] = email;
  next[TOUR_GUIDE_ACCOUNT_FIELD] = user.id;
  return next;
}

function profileEmailMatches(
  profile: Record<string, unknown>,
  userEmail: string | null | undefined,
): boolean {
  const expected = normalizeGuideEmail(userEmail);
  if (!expected) return false;
  return normalizeGuideEmail(profile[TOUR_GUIDE_EMAIL_FIELD] as string | null) === expected;
}

function profileAccountMatches(
  profile: Record<string, unknown>,
  userId: string,
): boolean {
  const owner = profile[TOUR_GUIDE_ACCOUNT_FIELD];
  if (typeof owner === "string") return owner === userId;
  if (owner && typeof owner === "object" && "id" in owner) {
    return String((owner as { id: string }).id) === userId;
  }
  return false;
}

function isUnlinkedLegacyProfile(
  profile: Record<string, unknown>,
): boolean {
  return (
    !normalizeGuideEmail(profile[TOUR_GUIDE_EMAIL_FIELD] as string | null) &&
    profile[TOUR_GUIDE_ACCOUNT_FIELD] == null
  );
}

/** Rows with email match by email; legacy rows without email match by account. */
function profileOwnedByUser(
  profile: Record<string, unknown>,
  user: DirectusUser,
): boolean {
  const rowEmail = normalizeGuideEmail(
    profile[TOUR_GUIDE_EMAIL_FIELD] as string | null,
  );
  if (rowEmail) {
    return profileEmailMatches(profile, user.email);
  }
  return profileAccountMatches(profile, user.id);
}

function profileAccessibleViaHint(
  profile: Record<string, unknown>,
  user: DirectusUser,
  profileIdHint?: number | null,
): boolean {
  const id = coerceDirectusId(profile.id);
  const hintId = coerceDirectusId(profileIdHint);
  if (!hintId || id !== hintId) return false;

  const rowEmail = normalizeGuideEmail(
    profile[TOUR_GUIDE_EMAIL_FIELD] as string | null,
  );
  if (rowEmail && !profileEmailMatches(profile, user.email)) return false;

  if (
    profile[TOUR_GUIDE_ACCOUNT_FIELD] != null &&
    !profileAccountMatches(profile, user.id)
  ) {
    return false;
  }

  return true;
}

const directusPublicListTourGuides = async (
  baseUrl: string,
  params: URLSearchParams,
): Promise<Record<string, unknown>[]> => {
  const response = await fetch(
    `${baseUrl}/items/${TOUR_GUIDES_COLLECTION}?${params}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    const message = await parseDirectusError(response);
    throw new Error(message);
  }

  const json = await parseDirectusJson<{ data?: Record<string, unknown>[] }>(
    response,
  );
  return json?.data ?? [];
};

async function directusListTourGuides(
  baseUrl: string,
  params: URLSearchParams,
  userAccessToken?: string | null,
): Promise<Record<string, unknown>[]> {
  const url = `${baseUrl}/items/${TOUR_GUIDES_COLLECTION}?${params}`;

  if (userAccessToken) {
    const authedResponse = await fetch(url, {
      headers: { Authorization: `Bearer ${userAccessToken}` },
      cache: "no-store",
    });

    if (authedResponse.ok) {
      const json = await parseDirectusJson<{ data?: Record<string, unknown>[] }>(
        authedResponse,
      );
      if (json?.data?.length) return json.data;
    }
  }

  return directusPublicListTourGuides(baseUrl, params);
}

async function directusAdminListTourGuides(
  baseUrl: string,
  params: URLSearchParams,
): Promise<Record<string, unknown>[]> {
  const headers = directusAdminAuthHeaders();
  if (!headers) return [];

  const response = await fetch(
    `${baseUrl}/items/${TOUR_GUIDES_COLLECTION}?${params}`,
    { headers, cache: "no-store" },
  );

  if (!response.ok) {
    return [];
  }

  const json = await parseDirectusJson<{ data?: Record<string, unknown>[] }>(
    response,
  );
  return json?.data ?? [];
}

async function findLegacyGuideByNationalId(
  baseUrl: string,
  nationalId: string,
): Promise<Record<string, unknown> | null> {
  const normalized = nationalId.trim();
  if (!normalized) return null;

  const params = new URLSearchParams({
    limit: "3",
    sort: "-id",
    fields: "*",
  });
  params.set("filter[national_id][_eq]", normalized);

  const rows = await directusPublicListTourGuides(baseUrl, params);
  const unlinked = rows.filter(isUnlinkedLegacyProfile);
  return unlinked.length === 1 ? unlinked[0]! : null;
}

function profileLinkedToUser(
  profile: Record<string, unknown>,
  user: DirectusUser,
): boolean {
  return profileOwnedByUser(profile, user);
}

async function findPortalGuideProfileByUser(
  baseUrl: string,
  user: DirectusUser,
  profileIdHint?: number | null,
  options?: {
    userAccessToken?: string | null;
    nationalIdHint?: string | null;
  },
): Promise<Record<string, unknown> | null> {
  const email = normalizeGuideEmail(user.email);

  if (email) {
    const params = new URLSearchParams({
      limit: "1",
      sort: "-id",
      fields: "*",
    });
    params.set(`filter[${TOUR_GUIDE_EMAIL_FIELD}][_eq]`, email);

    const rows = await directusListTourGuides(
      baseUrl,
      params,
      options?.userAccessToken,
    );

    const match = rows.find((row) => profileEmailMatches(row, email));
    if (match) return match;

    const adminRows = await directusAdminListTourGuides(baseUrl, params);
    const adminMatch = adminRows.find((row) => profileEmailMatches(row, email));
    if (adminMatch) return adminMatch;
  }

  const hintId = coerceDirectusId(profileIdHint);
  if (hintId) {
    const hinted = await directusFetchGuideProfileById(
      baseUrl,
      hintId,
      options?.userAccessToken ?? null,
      { throwOnError: false },
    );
    if (hinted && typeof hinted === "object") {
      return hinted as Record<string, unknown>;
    }
  }

  if (user.id) {
    const accountParams = new URLSearchParams({
      limit: "1",
      sort: "-id",
      fields: "*",
    });
    accountParams.set(`filter[${TOUR_GUIDE_ACCOUNT_FIELD}][_eq]`, user.id);

    const byAccount = await directusAdminListTourGuides(baseUrl, accountParams);
    const accountMatch = byAccount.find((row) => profileOwnedByUser(row, user));
    if (accountMatch) return accountMatch;
  }

  const nationalId = options?.nationalIdHint?.trim();
  if (nationalId) {
    const byNationalId = await findLegacyGuideByNationalId(baseUrl, nationalId);
    if (byNationalId) return byNationalId;
  }

  return null;
}

function appendPortalProfileFields(params: URLSearchParams): void {
  params.set("fields", "*");
}

export function parseProfileIdHint(raw: string | null): number | null {
  if (!raw) return null;
  const id = Number.parseInt(raw.trim(), 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}

async function directusFetchGuideProfileByIdForPortal(
  baseUrl: string,
  id: number,
): Promise<Record<string, unknown> | null> {
  const profile = await directusFetchGuideProfileById(
    baseUrl,
    id,
    null,
    { throwOnError: false },
  );
  if (!profile || typeof profile !== "object") return null;
  const record = profile as Record<string, unknown>;
  return coerceDirectusId(record.id) === id ? record : null;
}

async function directusPatchGuideProfileFields(
  baseUrl: string,
  id: number,
  fields: Record<string, unknown>,
  userAccessToken?: string | null,
): Promise<boolean> {
  const response = await directusWriteWithAuthFallback(
    userAccessToken,
    (auth) =>
      fetch(`${baseUrl}/items/${TOUR_GUIDES_COLLECTION}/${id}`, {
        method: "PATCH",
        headers: directusProfileHeaders(auth, true, true),
        body: JSON.stringify(fields),
        cache: "no-store",
      }),
  );
  return response.ok;
}

async function ensureGuideProfileLinked(
  baseUrl: string,
  id: number,
  user: DirectusUser,
  saved: Record<string, unknown>,
  userAccessToken?: string | null,
): Promise<Record<string, unknown>> {
  if (profileLinkedToUser(saved, user)) return saved;

  const linkPatch = withOwnerOnPayload({}, user);

  if (
    await directusPatchGuideProfileFields(
      baseUrl,
      id,
      linkPatch,
      userAccessToken,
    )
  ) {
    const refetched = await directusFetchGuideProfileById(
      baseUrl,
      id,
      userAccessToken,
    );
    if (refetched && typeof refetched === "object") {
      return refetched as Record<string, unknown>;
    }
  }

  return saved;
}

export async function directusFetchMyGuideProfile(
  baseUrl: string,
  user: DirectusUser,
  userAccessToken?: string | null,
  profileIdHint?: number | null,
) {
  return findPortalGuideProfileByUser(baseUrl, user, profileIdHint, {
    userAccessToken,
  });
}


async function directusFetchGuideProfileById(
  baseUrl: string,
  id: number,
  userAccessToken?: string | null,
  options?: { throwOnError?: boolean },
) {
  const params = new URLSearchParams();
  appendPortalProfileFields(params);
  const url = `${baseUrl}/items/${TOUR_GUIDES_COLLECTION}/${id}?${params}`;

  const authAttempts: HeadersInit[] = [];
  if (userAccessToken) {
    authAttempts.push({ Authorization: `Bearer ${userAccessToken}` });
  }
  const adminHeaders = directusAdminAuthHeaders();
  if (adminHeaders) {
    authAttempts.push(adminHeaders);
  }
  authAttempts.push({});

  let lastError = `Could not load tourist guide profile ${id}.`;

  for (const headers of authAttempts) {
    const response = await fetch(url, { headers, cache: "no-store" });
    if (response.ok) {
      const json = await parseDirectusJson<{ data?: unknown }>(response);
      if (json?.data && typeof json.data === "object") {
        return json.data;
      }
      continue;
    }

    lastError = await parseDirectusError(response);
    if (response.status === 403 || response.status === 404) {
      continue;
    }
    if (options?.throwOnError === false) {
      return null;
    }
    throw new Error(lastError);
  }

  if (options?.throwOnError === false) return null;
  throw new Error(lastError);
}

function ensureGuideProfileDraftAfterSave(
  saved: Record<string, unknown>,
): Record<string, unknown> {
  return normalizeSavedGuideProfile(saved);
}

async function finalizeSavedGuideProfile(
  baseUrl: string,
  user: DirectusUser,
  saved: Record<string, unknown>,
  userAccessToken?: string | null,
): Promise<Record<string, unknown>> {
  const id = coerceDirectusId(saved.id);
  if (!id) {
    return normalizeSavedGuideProfile(saved);
  }

  const withId = { ...saved, id };
  const linked = await ensureGuideProfileLinked(
    baseUrl,
    id,
    user,
    withId,
    userAccessToken,
  );
  const linkedId = coerceDirectusId(linked.id) ?? id;
  return ensureGuideProfileDraftAfterSave({ ...linked, id: linkedId });
}

function normalizeProfileRecord(
  profile: Record<string, unknown>,
  resolvedId?: number | null,
): Record<string, unknown> {
  const id = coerceDirectusId(resolvedId ?? profile.id);
  return id != null ? { ...profile, id } : profile;
}

export async function directusUpsertGuideProfile(
  baseUrl: string,
  user: DirectusUser,
  payload: TourGuideProfilePayload,
  userAccessToken?: string | null,
  profileIdHint?: number | null,
) {
  const knownProfileId = coerceDirectusId(profileIdHint);
  if (knownProfileId) {
    return directusUpdateGuideProfile(
      baseUrl,
      knownProfileId,
      user,
      payload,
      userAccessToken,
    );
  }

  const nationalIdHint =
    typeof payload.national_id === "string"
      ? payload.national_id
      : payload.national_id != null
        ? String(payload.national_id)
        : null;

  const existing = await findPortalGuideProfileByUser(
    baseUrl,
    user,
    profileIdHint,
    { userAccessToken, nationalIdHint },
  );
  const existingId = existing
    ? coerceDirectusId((existing as { id?: unknown }).id)
    : null;

  if (existingId) {
    return directusUpdateGuideProfile(
      baseUrl,
      existingId,
      user,
      payload,
      userAccessToken,
    );
  }

  return directusCreateGuideProfile(
    baseUrl,
    user,
    payload,
    userAccessToken,
    profileIdHint,
  );
}

export async function directusCreateGuideProfile(
  baseUrl: string,
  user: DirectusUser,
  payload: TourGuideProfilePayload,
  userAccessToken?: string | null,
  profileIdHint?: number | null,
) {
  const response = await directusWriteWithAuthFallback(
    userAccessToken,
    (auth) =>
      fetch(`${baseUrl}/items/${TOUR_GUIDES_COLLECTION}`, {
        method: "POST",
        headers: directusProfileHeaders(auth, true, true),
        body: JSON.stringify(buildTourGuideProfilePayload(payload, user)),
      }),
  );

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const createdId =
    coerceDirectusId(
      (await parseDirectusJson<{ data?: { id?: unknown } }>(response.clone()))
        ?.data?.id,
    ) ?? extractCreatedItemId(response);

  return resolveSavedProfileAfterWrite(
    baseUrl,
    user,
    payload,
    response,
    userAccessToken,
    { id: createdId, profileIdHint },
  );
}

export async function directusUpdateGuideProfile(
  baseUrl: string,
  id: number,
  user: DirectusUser,
  payload: TourGuideProfilePayload,
  userAccessToken?: string | null,
) {
  const response = await directusWriteWithAuthFallback(
    userAccessToken,
    (auth) =>
      fetch(`${baseUrl}/items/${TOUR_GUIDES_COLLECTION}/${id}`, {
        method: "PATCH",
        headers: directusProfileHeaders(auth, true, true),
        body: JSON.stringify(buildTourGuideProfilePayload(payload, user)),
      }),
  );

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  return resolveSavedProfileAfterWrite(
    baseUrl,
    user,
    payload,
    response,
    userAccessToken,
    { id, profileIdHint: id },
  );
}

/**
 * File uploads use Public Create on `directus_files` (no guide token).
 */
function directusFileUploadHeaders(): HeadersInit | undefined {
  return undefined;
}

export async function directusUploadFile(baseUrl: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${baseUrl}/files`, {
    method: "POST",
    headers: directusFileUploadHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = await parseDirectusJson<{ data?: { id?: string } }>(response);
  if (!json?.data?.id) {
    throw new Error("File upload did not return an id.");
  }
  return json.data.id;
}
