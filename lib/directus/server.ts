import {
  TOUR_GUIDE_DRAFT_STATUS,
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

export function getBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.toLowerCase().startsWith("bearer ")) return null;
  return header.slice(7).trim() || null;
}

export async function parseDirectusError(response: Response): Promise<string> {
  try {
    const body = await response.json();
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

export async function directusLogin(
  baseUrl: string,
  email: string,
  password: string,
) {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), password }),
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

  const user = await directusFetchCurrentUser(baseUrl, accessToken);
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires,
    user,
  };
}

export async function directusRegister(
  baseUrl: string,
  input: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  },
) {
  const response = await fetch(`${baseUrl}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: input.email.trim(),
      password: input.password,
      first_name: input.first_name.trim(),
      last_name: input.last_name.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  return directusLogin(baseUrl, input.email, input.password);
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

export async function directusFetchCurrentUser(
  baseUrl: string,
  accessToken: string,
): Promise<DirectusUser> {
  const response = await fetch(`${baseUrl}/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = (await response.json()) as MeResponse;
  if (!json.data?.id) {
    throw new Error("Could not load user profile.");
  }
  return json.data;
}

export function buildTourGuideProfilePayload(
  fields: Record<string, unknown>,
): Record<string, unknown> {
  return { ...fields, status: TOUR_GUIDE_DRAFT_STATUS };
}

export async function directusFetchMyGuideProfile(
  baseUrl: string,
  accessToken: string,
  userId: string,
) {
  const params = new URLSearchParams({
    "filter[user_created][_eq]": userId,
    limit: "1",
    fields: "*",
  });

  const response = await fetch(
    `${baseUrl}/items/${TOUR_GUIDES_COLLECTION}?${params}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = (await response.json()) as { data?: unknown[] };
  return json.data?.[0] ?? null;
}

export async function directusCreateGuideProfile(
  baseUrl: string,
  accessToken: string,
  payload: Record<string, unknown>,
) {
  const response = await fetch(`${baseUrl}/items/${TOUR_GUIDES_COLLECTION}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildTourGuideProfilePayload(payload)),
  });

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = (await response.json()) as { data: unknown };
  return json.data;
}

export async function directusUpdateGuideProfile(
  baseUrl: string,
  accessToken: string,
  id: number,
  userId: string,
  payload: Record<string, unknown>,
) {
  const existing = await directusFetchMyGuideProfile(baseUrl, accessToken, userId);
  if (!existing || (existing as { id?: number }).id !== id) {
    throw new Error("Profile not found or access denied.");
  }

  const response = await fetch(
    `${baseUrl}/items/${TOUR_GUIDES_COLLECTION}/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildTourGuideProfilePayload(payload)),
    },
  );

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = (await response.json()) as { data: unknown };
  return json.data;
}

export async function directusUploadFile(
  baseUrl: string,
  accessToken: string,
  file: File,
) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${baseUrl}/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseDirectusError(response));
  }

  const json = (await response.json()) as { data?: { id?: string } };
  if (!json.data?.id) {
    throw new Error("File upload did not return an id.");
  }
  return json.data.id;
}
