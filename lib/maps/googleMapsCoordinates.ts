export type LatLng = { latitude: number; longitude: number };

const urlCoordinateCache = new Map<string, LatLng | null>();

const isValidCoord = (lat: number, lng: number): boolean =>
  Number.isFinite(lat) &&
  Number.isFinite(lng) &&
  lat >= -90 &&
  lat <= 90 &&
  lng >= -180 &&
  lng <= 180;

/** Parse lat/lng embedded in a Google Maps URL (after redirects). */
export function parseCoordinatesFromGoogleMapsUrl(
  url: string,
): LatLng | null {
  const decoded = decodeURIComponent(url);

  const atMatch = decoded.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (atMatch) {
    const latitude = Number(atMatch[1]);
    const longitude = Number(atMatch[2]);
    if (isValidCoord(latitude, longitude)) return { latitude, longitude };
  }

  const dMatch = decoded.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (dMatch) {
    const latitude = Number(dMatch[1]);
    const longitude = Number(dMatch[2]);
    if (isValidCoord(latitude, longitude)) return { latitude, longitude };
  }

  const qMatch = decoded.match(/[?&]q=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (qMatch) {
    const latitude = Number(qMatch[1]);
    const longitude = Number(qMatch[2]);
    if (isValidCoord(latitude, longitude)) return { latitude, longitude };
  }

  const llMatch = decoded.match(/[?&]ll=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (llMatch) {
    const latitude = Number(llMatch[1]);
    const longitude = Number(llMatch[2]);
    if (isValidCoord(latitude, longitude)) return { latitude, longitude };
  }

  return null;
}

export async function resolveGoogleMapsUrl(mapsUrl: string): Promise<string> {
  const trimmed = mapsUrl.trim();
  if (!trimmed) return trimmed;

  try {
    const response = await fetch(trimmed, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(12_000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DiscoverAseerMapBot/1.0; +https://discoveraseer.com)",
      },
    });
    return response.url || trimmed;
  } catch {
    return trimmed;
  }
}

export async function coordinatesFromGoogleMapsUrl(
  mapsUrl: string,
): Promise<LatLng | null> {
  const direct = parseCoordinatesFromGoogleMapsUrl(mapsUrl);
  if (direct) return direct;

  const resolved = await resolveGoogleMapsUrl(mapsUrl);
  if (resolved !== mapsUrl) {
    return parseCoordinatesFromGoogleMapsUrl(resolved);
  }

  return null;
}

/** In-memory cache for Google Maps URL → coordinates (works in scripts and API routes). */
export async function getCachedCoordinatesFromGoogleMapsUrl(
  mapsUrl: string,
): Promise<LatLng | null> {
  const normalized = mapsUrl.trim();
  if (!normalized) return null;

  if (urlCoordinateCache.has(normalized)) {
    return urlCoordinateCache.get(normalized) ?? null;
  }

  const coords = await coordinatesFromGoogleMapsUrl(normalized);
  urlCoordinateCache.set(normalized, coords);
  return coords;
}

export async function geocodeWithGoogleApi(
  query: string,
  apiKey: string,
): Promise<LatLng | null> {
  const trimmed = query.trim();
  if (!trimmed || !apiKey.trim()) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", trimmed);
  url.searchParams.set("key", apiKey.trim());
  url.searchParams.set("region", "sa");

  try {
    const response = await fetch(url.toString(), {
      signal: AbortSignal.timeout(12_000),
      next: { revalidate: 0 },
    });
    if (!response.ok) return null;

    const json = (await response.json()) as {
      status?: string;
      results?: Array<{
        geometry?: { location?: { lat?: number; lng?: number } };
      }>;
    };

    if (json.status !== "OK" || !json.results?.length) return null;

    const location = json.results[0]?.geometry?.location;
    if (location?.lat == null || location?.lng == null) return null;

    const latitude = Number(location.lat);
    const longitude = Number(location.lng);
    if (!isValidCoord(latitude, longitude)) return null;

    return { latitude, longitude };
  } catch {
    return null;
  }
}
