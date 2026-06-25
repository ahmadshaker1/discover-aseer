import type { ApiTouristGuide } from "@/components/tour-guides/types";
import {
  getValidAccessToken,
  portalFetch,
} from "@/lib/directus/tourGuideAuth";

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
export async function fetchMyTourGuideProfile(): Promise<ApiTouristGuide | null> {
  const accessToken = await requireAccessToken();

  const response = await portalFetch("/api/tour-guides/portal/profile", accessToken, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const json = (await response.json()) as { data?: ApiTouristGuide | null };
  return json.data ?? null;
}

export type TourGuideProfilePayload = Record<string, unknown>;

export async function createTourGuideProfile(
  payload: TourGuideProfilePayload,
): Promise<ApiTouristGuide> {
  const accessToken = await requireAccessToken();

  const response = await portalFetch("/api/tour-guides/portal/profile", accessToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const json = (await response.json()) as { data: ApiTouristGuide };
  return json.data;
}

export async function updateTourGuideProfile(
  id: number,
  payload: TourGuideProfilePayload,
): Promise<ApiTouristGuide> {
  const accessToken = await requireAccessToken();

  const response = await portalFetch("/api/tour-guides/portal/profile", accessToken, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...payload }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const json = (await response.json()) as { data: ApiTouristGuide };
  return json.data;
}
