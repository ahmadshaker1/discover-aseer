import {
  TOUR_GUIDE_DRAFT_STATUS,
  TOUR_GUIDES_COLLECTION,
  TOUR_GUIDE_OWNER_FIELD,
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

/** Optional static token for server-side profile CRUD fallback. */
function getDirectusPortalToken(): string | null {
  return process.env.DIRECTUS_WRITE_TOKEN?.trim() || null;
}

type ProfileDirectusAuth =
  | { mode: "user"; accessToken: string }
  | { mode: "admin" }
  | { mode: "public" };

function resolveProfileDirectusAuth(
  userAccessToken?: string | null,
): ProfileDirectusAuth {
  if (userAccessToken) return { mode: "user", accessToken: userAccessToken };
  if (getDirectusPortalToken()) return { mode: "admin" };
  return { mode: "public" };
}

function directusProfileHeaders(
  auth: ProfileDirectusAuth,
  json = false,
  returnRepresentation = false,
): HeadersInit {
  const headers: Record<string, string> = {};
  if (auth.mode === "user") {
    headers.Authorization = `Bearer ${auth.accessToken}`;
  } else if (auth.mode === "admin") {
    headers.Authorization = `Bearer ${getDirectusPortalToken()!}`;
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
  const verificationUrl =
    process.env.DIRECTUS_TOUR_GUIDE_VERIFICATION_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

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

  await directusRegisterPublic(baseUrl, normalized);

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

export function buildTourGuideProfilePayload(
  fields: Record<string, unknown>,
): TourGuideProfilePayload {
  return { ...fields, status: TOUR_GUIDE_DRAFT_STATUS };
}

export type TourGuideProfilePayload = Record<string, unknown>;

function withOwnerOnPayload(
  payload: TourGuideProfilePayload,
  user: DirectusUser,
): TourGuideProfilePayload {
  return { ...payload, [TOUR_GUIDE_OWNER_FIELD]: user.id };
}

function profileAccountMatches(
  profile: Record<string, unknown>,
  userId: string,
): boolean {
  const owner = profile[TOUR_GUIDE_OWNER_FIELD];
  if (typeof owner === "string") return owner === userId;
  if (owner && typeof owner === "object" && "id" in owner) {
    return String((owner as { id: string }).id) === userId;
  }
  return false;
}

/**
 * Profile CRUD prefers the **signed-in user's** Directus token so role rules
 * (`account` = `$CURRENT_USER`) apply. Falls back to admin token, then Public.
 */
async function directusListGuideProfiles(
  baseUrl: string,
  params: URLSearchParams,
  auth: ProfileDirectusAuth,
) {
  const response = await fetch(
    `${baseUrl}/items/${TOUR_GUIDES_COLLECTION}?${params}`,
    {
      headers: directusProfileHeaders(auth),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = await parseDirectusJson<{ data?: Record<string, unknown>[] }>(
    response,
  );
  return json?.data ?? [];
}

function profileOwnedByUser(
  profile: Record<string, unknown>,
  user: DirectusUser,
  auth: ProfileDirectusAuth,
): boolean {
  if (auth.mode === "user") return true;
  return profileAccountMatches(profile, user.id);
}

export async function directusFetchMyGuideProfile(
  baseUrl: string,
  user: DirectusUser,
  userAccessToken?: string | null,
) {
  const auth = resolveProfileDirectusAuth(userAccessToken);
  const params = new URLSearchParams({ limit: "1" });

  if (auth.mode !== "user") {
    params.set(`filter[${TOUR_GUIDE_OWNER_FIELD}][_eq]`, user.id);
  }

  const items = await directusListGuideProfiles(baseUrl, params, auth);
  const item = items[0] ?? null;
  if (!item) return null;
  if (!profileOwnedByUser(item, user, auth)) return null;
  return item;
}

async function directusFindGuideProfileForUser(
  baseUrl: string,
  user: DirectusUser,
  userAccessToken?: string | null,
) {
  const auth = resolveProfileDirectusAuth(userAccessToken);
  const byAccount = await directusFetchMyGuideProfile(
    baseUrl,
    user,
    userAccessToken,
  );
  if (byAccount) return byAccount;

  if (auth.mode === "user") return null;

  const params = new URLSearchParams({
    limit: "25",
    sort: "-id",
    fields: `id,status,${TOUR_GUIDE_OWNER_FIELD}`,
  });
  const items = await directusListGuideProfiles(baseUrl, params, auth);
  return (
    items.find((item) => profileAccountMatches(item, user.id)) ?? null
  );
}

function buildProfileLoadError(): string {
  return [
    "Profile saved in Directus but could not be loaded.",
    "On the guide user role, allow Create/Read/Update on tourist_guides with rule",
    `{ "account": { "_eq": "$CURRENT_USER" } } and writable account on create.`,
  ].join(" ");
}

async function directusFetchGuideProfileById(
  baseUrl: string,
  id: number,
  userAccessToken?: string | null,
) {
  const auth = resolveProfileDirectusAuth(userAccessToken);
  const response = await fetch(
    `${baseUrl}/items/${TOUR_GUIDES_COLLECTION}/${id}`,
    {
      headers: directusProfileHeaders(auth),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = await parseDirectusJson<{ data?: unknown }>(response);
  return json?.data ?? null;
}

export async function directusCreateGuideProfile(
  baseUrl: string,
  user: DirectusUser,
  payload: TourGuideProfilePayload,
  userAccessToken?: string | null,
) {
  const auth = resolveProfileDirectusAuth(userAccessToken);
  const response = await fetch(`${baseUrl}/items/${TOUR_GUIDES_COLLECTION}`, {
    method: "POST",
    headers: directusProfileHeaders(auth, true, true),
    body: JSON.stringify(
      buildTourGuideProfilePayload(withOwnerOnPayload(payload, user)),
    ),
  });

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = await parseDirectusJson<{ data?: Record<string, unknown> }>(
    response,
  );
  if (json?.data) {
    if (profileOwnedByUser(json.data, user, auth)) {
      return json.data;
    }
    if (typeof json.data.id === "number") {
      const byId = await directusFetchGuideProfileById(
        baseUrl,
        json.data.id,
        userAccessToken,
      );
      if (byId) return byId;
      return json.data;
    }
  }

  const refetched = await directusFindGuideProfileForUser(
    baseUrl,
    user,
    userAccessToken,
  );
  if (!refetched) {
    throw new Error(buildProfileLoadError());
  }
  return refetched;
}

export async function directusUpdateGuideProfile(
  baseUrl: string,
  id: number,
  user: DirectusUser,
  payload: TourGuideProfilePayload,
  userAccessToken?: string | null,
) {
  const auth = resolveProfileDirectusAuth(userAccessToken);
  const existing = await directusFetchMyGuideProfile(
    baseUrl,
    user,
    userAccessToken,
  );
  if (
    !existing ||
    (existing as { id?: number }).id !== id ||
    !profileOwnedByUser(existing as Record<string, unknown>, user, auth)
  ) {
    throw new Error("Profile not found or access denied.");
  }

  const response = await fetch(
    `${baseUrl}/items/${TOUR_GUIDES_COLLECTION}/${id}`,
    {
      method: "PATCH",
      headers: directusProfileHeaders(auth, true, true),
      body: JSON.stringify(
        buildTourGuideProfilePayload(withOwnerOnPayload(payload, user)),
      ),
    },
  );

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = await parseDirectusJson<{ data?: unknown }>(response);
  if (json?.data) return json.data;

  const refetched =
    (await directusFetchGuideProfileById(baseUrl, id, userAccessToken)) ??
    (await directusFindGuideProfileForUser(baseUrl, user, userAccessToken));
  if (!refetched) {
    throw new Error(buildProfileLoadError());
  }
  return refetched;
}

/**
 * File uploads use Public or admin token — not the guide session token.
 * Guides rarely have `directus_files` on their role; Public Create is enough.
 */
function directusFileUploadHeaders(): HeadersInit | undefined {
  const admin = getDirectusPortalToken();
  if (admin) return { Authorization: `Bearer ${admin}` };
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
