import type { ApiTouristGuide } from "@/components/tour-guides/types";
import {
  getTourGuideSession,
  getValidAccessToken,
  portalFetch,
} from "@/lib/directus/tourGuideAuth";

const PROFILE_ID_KEY = "directus_tour_guide_profile_id";

function profileIdStorageKey(userId: string): string {
  return `${PROFILE_ID_KEY}:${userId}`;
}

function profileIdStorageKeyByEmail(email: string): string {
  return `${PROFILE_ID_KEY}:email:${email.trim().toLowerCase()}`;
}

function coerceProfileId(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }
  if (typeof value === "string") {
    const id = Number.parseInt(value.trim(), 10);
    return Number.isFinite(id) && id > 0 ? id : null;
  }
  return null;
}

export function getStoredTourGuideProfileId(
  userId: string,
  email?: string | null,
): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(profileIdStorageKey(userId));
    if (raw) {
      const id = coerceProfileId(raw);
      if (id) return id;
    }

    const normalizedEmail = email?.trim().toLowerCase();
    if (normalizedEmail) {
      const byEmail = localStorage.getItem(
        profileIdStorageKeyByEmail(normalizedEmail),
      );
      if (byEmail) {
        return coerceProfileId(byEmail);
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function setStoredTourGuideProfileId(
  userId: string,
  id: number | null,
  email?: string | null,
): void {
  if (typeof window === "undefined") return;
  const key = profileIdStorageKey(userId);
  if (id == null) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, String(id));

  const normalizedEmail = email?.trim().toLowerCase();
  if (normalizedEmail) {
    localStorage.setItem(profileIdStorageKeyByEmail(normalizedEmail), String(id));
  }
}

function profileIdHeaders(profileIdHint?: number | null): HeadersInit {
  if (!profileIdHint) return {};
  return { "X-Profile-Id": String(profileIdHint) };
}

function rememberProfile(profile: ApiTouristGuide): void {
  const session = getTourGuideSession();
  if (!session?.user.id) return;

  const id = coerceProfileId(profile.id);
  if (id) {
    setStoredTourGuideProfileId(session.user.id, id, session.user.email);
  }
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

async function requireAccessToken(): Promise<string> {
  const token = await getValidAccessToken();
  if (!token) {
    throw new Error("Session expired.");
  }
  return token;
}

export async function uploadTourGuideFile(file: File): Promise<string> {
  const accessToken = await requireAccessToken();
  const formData = new FormData();
  formData.append("file", file);

  const response = await portalFetch("/api/tour-guides/portal/upload", accessToken, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const json = (await response.json()) as { data?: { id?: string } };
  if (!json.data?.id) {
    throw new Error("File upload did not return an id.");
  }
  return json.data.id;
}

/** Load the guide profile owned by the signed-in user. */
export async function fetchMyTourGuideProfile(
  profileIdHint?: number | null,
): Promise<ApiTouristGuide | null> {
  const accessToken = await requireAccessToken();
  const session = getTourGuideSession();
  const userId = session?.user.id;
  const userEmail = session?.user.email;
  const resolvedHint =
    profileIdHint ??
    (userId ? getStoredTourGuideProfileId(userId, userEmail) : null);

  const response = await portalFetch("/api/tour-guides/portal/profile", accessToken, {
    cache: "no-store",
    headers: profileIdHeaders(resolvedHint),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const json = (await response.json()) as { data?: ApiTouristGuide | null };
  const profile = json.data ?? null;

  if (profile) {
    rememberProfile(profile);
  }
  return profile;
}

export type TourGuideProfilePayload = Record<string, unknown>;

/** Create or update the signed-in guide's profile (never duplicates when an id is known). */
export async function saveTourGuideProfile(
  payload: TourGuideProfilePayload,
  profileId?: number | null,
): Promise<ApiTouristGuide> {
  const accessToken = await requireAccessToken();
  const session = getTourGuideSession();
  const resolvedId =
    profileId ??
    (session
      ? getStoredTourGuideProfileId(session.user.id, session.user.email)
      : null);

  const headers = new Headers({
    "Content-Type": "application/json",
  });
  if (resolvedId) {
    headers.set("X-Profile-Id", String(resolvedId));
  }

  const response = await portalFetch("/api/tour-guides/portal/profile", accessToken, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...payload,
      ...(resolvedId ? { id: resolvedId } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const json = (await response.json()) as { data: ApiTouristGuide };
  rememberProfile(json.data);
  return json.data;
}

/** @deprecated Use saveTourGuideProfile — kept for compatibility. */
export async function createTourGuideProfile(
  payload: TourGuideProfilePayload,
): Promise<ApiTouristGuide> {
  return saveTourGuideProfile(payload);
}

/** @deprecated Use saveTourGuideProfile — kept for compatibility. */
export async function updateTourGuideProfile(
  id: number,
  payload: TourGuideProfilePayload,
): Promise<ApiTouristGuide> {
  return saveTourGuideProfile(payload, id);
}
