import type { DirectusUser } from "./types";

export type { DirectusUser };

const STORAGE_KEY = "directus_tour_guide_auth";

export interface DirectusAuthSession {
  access_token: string;
  refresh_token: string;
  /** Unix ms when the access token expires. */
  expires: number;
  user: DirectusUser;
}

interface SessionResponse {
  access_token?: string;
  refresh_token?: string;
  expires?: number;
  user?: DirectusUser;
  error?: string;
}

function readStoredSession(): DirectusAuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DirectusAuthSession;
    if (!parsed.access_token || !parsed.refresh_token || !parsed.user?.id) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function storeSession(session: DirectusAuthSession | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function buildSession(data: SessionResponse): DirectusAuthSession {
  if (!data.access_token || !data.refresh_token || !data.user?.id) {
    throw new Error("Invalid session response.");
  }
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires: Date.now() + (data.expires ?? 900_000),
    user: data.user,
  };
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string };
    if (body.error) return body.error;
  } catch {
    // ignore
  }
  return `Request failed (${response.status})`;
}

export function getTourGuideSession(): DirectusAuthSession | null {
  return readStoredSession();
}

export function clearTourGuideSession(): void {
  storeSession(null);
}

export async function loginTourGuide(
  email: string,
  password: string,
): Promise<DirectusAuthSession> {
  const response = await fetch("/api/tour-guides/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), password }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const data = (await response.json()) as SessionResponse;
  const session = buildSession(data);
  storeSession(session);
  return session;
}

export async function registerTourGuide(input: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}): Promise<DirectusAuthSession> {
  const response = await fetch("/api/tour-guides/auth/register", {
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
    throw new Error(await parseApiError(response));
  }

  const data = (await response.json()) as SessionResponse;
  const session = buildSession(data);
  storeSession(session);
  return session;
}

export async function refreshTourGuideSession(
  session: DirectusAuthSession,
): Promise<DirectusAuthSession> {
  const response = await fetch("/api/tour-guides/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });

  if (!response.ok) {
    clearTourGuideSession();
    throw new Error(await parseApiError(response));
  }

  const data = (await response.json()) as SessionResponse;
  const next = buildSession(data);
  storeSession(next);
  return next;
}

/** Returns a valid access token, refreshing when close to expiry. */
export async function getValidAccessToken(): Promise<string | null> {
  const session = readStoredSession();
  if (!session) return null;

  const bufferMs = 60_000;
  if (Date.now() < session.expires - bufferMs) {
    return session.access_token;
  }

  try {
    const refreshed = await refreshTourGuideSession(session);
    return refreshed.access_token;
  } catch {
    return null;
  }
}

export function logoutTourGuide(): void {
  clearTourGuideSession();
}

export async function portalFetch(
  path: string,
  accessToken: string,
  init?: RequestInit,
): Promise<Response> {
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);
  return fetch(path, { ...init, headers });
}
