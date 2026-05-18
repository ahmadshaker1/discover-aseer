import {
  coordinatesFromGoogleMapsUrl,
  geocodeWithGoogleApi,
  getCachedCoordinatesFromGoogleMapsUrl,
  type LatLng,
} from "@/lib/maps/googleMapsCoordinates";
import {
  buildLocationMapPlace,
  isHiddenFromMap,
  isPublishedLocation,
  type DirectusLocationRow,
  type LocationMapPlace,
} from "@/lib/maps/locationMapPlace";
import type { LocaleCode } from "@/lib/i18n/localized";

const LOCATIONS_COLLECTION = "locations";

export interface MapLocationsStats {
  totalFetched: number;
  published: number;
  listed: number;
  withCoordinates: number;
  withoutCoordinates: number;
  resolvedThisRequest: number;
  geocodedThisRequest: number;
  geocodePersistFailed: number;
  geocodeFailed: number;
  geocodeSkippedNoUrl: number;
  byCategoryAr: Record<string, number>;
}

export interface FetchMapLocationsResult {
  places: LocationMapPlace[];
  stats: MapLocationsStats;
}

const getDirectusConfig = () => {
  const baseUrl = (
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_TOOL_PORTAL_DIRECTUS_URL?.replace(/\/$/, "") ||
    "https://tool-portal.discoveraseer.com"
  ).replace(/\/$/, "");

  const readToken = process.env.DIRECTUS_READ_TOKEN?.trim();
  const writeToken =
    process.env.DIRECTUS_WRITE_TOKEN?.trim() ||
    process.env.DIRECTUS_MAP_WRITE_TOKEN?.trim() ||
    readToken;

  return { baseUrl, readToken, writeToken };
};

const fetchAllLocationRows = async (
  baseUrl: string,
  readToken?: string,
): Promise<DirectusLocationRow[]> => {
  const headers: HeadersInit | undefined = readToken
    ? { Authorization: `Bearer ${readToken}` }
    : undefined;

  const rows: DirectusLocationRow[] = [];
  const limit = 100;
  let offset = 0;

  for (;;) {
    const url = new URL(`${baseUrl}/items/${LOCATIONS_COLLECTION}`);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("meta", "filter_count");

    const response = await fetch(url.toString(), {
      headers,
      cache: "no-store",
    });

    if (!response.ok) break;

    const json = (await response.json()) as {
      data?: DirectusLocationRow[];
      meta?: { filter_count?: number };
    };

    const batch = Array.isArray(json.data) ? json.data : [];
    rows.push(...batch);

    if (batch.length < limit) break;
    offset += limit;
    if (offset > 10_000) break;
  }

  return rows;
};

const patchLocationCoordinates = async (
  baseUrl: string,
  id: string,
  coords: LatLng,
  writeToken?: string,
): Promise<boolean> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (writeToken) {
    headers.Authorization = `Bearer ${writeToken}`;
  }

  const response = await fetch(
    `${baseUrl}/items/${LOCATIONS_COLLECTION}/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.warn(
      `[directusLocations] PATCH ${id} failed (${response.status})`,
      detail.slice(0, 200),
    );
  }

  return response.ok;
};

const geocodeLocationRow = async (
  row: DirectusLocationRow,
  place: LocationMapPlace,
  googleApiKey?: string,
): Promise<LatLng | null> => {
  const mapsUrl = place.mapsUrl;
  if (mapsUrl) {
    const fromUrl = await coordinatesFromGoogleMapsUrl(mapsUrl);
    if (fromUrl) return fromUrl;
  }

  if (googleApiKey) {
    const query = [place.title, place.city, "Aseer", "Saudi Arabia"]
      .filter(Boolean)
      .join(", ");
    return geocodeWithGoogleApi(query, googleApiKey);
  }

  return null;
};

export interface FetchMapLocationsOptions {
  locale: LocaleCode;
  /** Resolve lat/lng from google_maps_url for map display (cached). */
  resolve?: boolean;
  resolveLimit?: number;
  /** Persist resolved coordinates back to Directus when a write token exists. */
  geocode?: boolean;
  geocodeLimit?: number;
}

const refreshCoordinateStats = (
  places: LocationMapPlace[],
  stats: MapLocationsStats,
): void => {
  let withCoordinates = 0;
  for (const place of places) {
    if (place.hasCoordinates) withCoordinates += 1;
  }
  stats.withCoordinates = withCoordinates;
  stats.withoutCoordinates = places.length - withCoordinates;
};

const runWithConcurrency = async <T>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<void>,
): Promise<void> => {
  if (items.length === 0) return;

  let index = 0;
  const poolSize = Math.min(Math.max(concurrency, 1), items.length);

  await Promise.all(
    Array.from({ length: poolSize }, async () => {
      while (index < items.length) {
        const current = items[index];
        index += 1;
        await worker(current);
      }
    }),
  );
};

const resolveCoordinatesForPlaces = async ({
  places,
  rows,
  limit,
  concurrency,
  persist,
  baseUrl,
  writeToken,
  googleApiKey,
  stats,
}: {
  places: LocationMapPlace[];
  rows: DirectusLocationRow[];
  limit: number;
  concurrency: number;
  persist: boolean;
  baseUrl: string;
  writeToken?: string;
  googleApiKey?: string;
  stats: MapLocationsStats;
}): Promise<void> => {
  const pending = places.filter(
    (place) => !place.hasCoordinates && Boolean(place.mapsUrl),
  );
  const batch = pending.slice(0, limit);
  if (batch.length === 0) return;

  await runWithConcurrency(batch, concurrency, async (place) => {
    const mapsUrl = place.mapsUrl;
    if (!mapsUrl) {
      stats.geocodeSkippedNoUrl += 1;
      return;
    }

    let coords =
      (await getCachedCoordinatesFromGoogleMapsUrl(mapsUrl)) ?? null;

    if (!coords) {
      const sourceId = place.id.replace(/^locations:/, "");
      const row = rows.find((item) => String(item.id) === sourceId);
      if (row) {
        coords = await geocodeLocationRow(row, place, googleApiKey);
      }
    }

    if (!coords) {
      stats.geocodeFailed += 1;
      return;
    }

    place.latitude = coords.latitude;
    place.longitude = coords.longitude;
    place.hasCoordinates = true;
    stats.resolvedThisRequest += 1;

    if (persist) {
      const sourceId = place.id.replace(/^locations:/, "");
      const saved = await patchLocationCoordinates(
        baseUrl,
        sourceId,
        coords,
        writeToken,
      );
      if (saved) stats.geocodedThisRequest += 1;
      else stats.geocodePersistFailed += 1;
    }
  });

  refreshCoordinateStats(places, stats);
};

export async function fetchMapLocations(
  options: FetchMapLocationsOptions,
): Promise<FetchMapLocationsResult> {
  const { baseUrl, readToken, writeToken } = getDirectusConfig();
  const googleApiKey = process.env.GOOGLE_MAPS_GEOCODING_API_KEY?.trim();
  const resolveLimit = Math.min(Math.max(options.resolveLimit ?? 40, 0), 80);
  const geocodeLimit = Math.min(Math.max(options.geocodeLimit ?? 25, 0), 50);
  const shouldResolve = options.resolve === true;
  const shouldPersist = options.geocode === true;

  const rows = await fetchAllLocationRows(baseUrl, readToken);

  const stats: MapLocationsStats = {
    totalFetched: rows.length,
    published: 0,
    listed: 0,
    withCoordinates: 0,
    withoutCoordinates: 0,
    resolvedThisRequest: 0,
    geocodedThisRequest: 0,
    geocodePersistFailed: 0,
    geocodeFailed: 0,
    geocodeSkippedNoUrl: 0,
    byCategoryAr: {},
  };

  const places: LocationMapPlace[] = [];

  for (const row of rows) {
    if (!isPublishedLocation(row)) continue;
    stats.published += 1;
    if (isHiddenFromMap(row.hide_from_interactive_map)) continue;

    const place = buildLocationMapPlace(row, options.locale);
    if (!place) continue;

    stats.listed += 1;
    const categoryLabel = place.categoryAr || place.categoryEn || "—";
    stats.byCategoryAr[categoryLabel] =
      (stats.byCategoryAr[categoryLabel] ?? 0) + 1;

    if (place.hasCoordinates) {
      stats.withCoordinates += 1;
    } else {
      stats.withoutCoordinates += 1;
    }

    places.push(place);
  }

  if (shouldResolve) {
    await resolveCoordinatesForPlaces({
      places,
      rows,
      limit: resolveLimit,
      concurrency: 10,
      persist: shouldPersist,
      baseUrl,
      writeToken,
      googleApiKey,
      stats,
    });
  } else if (shouldPersist) {
    await resolveCoordinatesForPlaces({
      places,
      rows,
      limit: geocodeLimit,
      concurrency: 5,
      persist: true,
      baseUrl,
      writeToken,
      googleApiKey,
      stats,
    });
  }

  return { places, stats };
}

export interface BackfillLocationCoordinatesOptions {
  locale?: LocaleCode;
  /** Max locations to resolve and persist per call (default 50). */
  limit?: number;
  concurrency?: number;
}

export interface BackfillLocationCoordinatesResult extends FetchMapLocationsResult {
  remaining: number;
}

const buildListedPlaces = (
  rows: DirectusLocationRow[],
  locale: LocaleCode,
  stats: MapLocationsStats,
): LocationMapPlace[] => {
  const places: LocationMapPlace[] = [];

  for (const row of rows) {
    if (!isPublishedLocation(row)) continue;
    stats.published += 1;
    if (isHiddenFromMap(row.hide_from_interactive_map)) continue;

    const place = buildLocationMapPlace(row, locale);
    if (!place) continue;

    stats.listed += 1;
    const categoryLabel = place.categoryAr || place.categoryEn || "—";
    stats.byCategoryAr[categoryLabel] =
      (stats.byCategoryAr[categoryLabel] ?? 0) + 1;

    if (place.hasCoordinates) {
      stats.withCoordinates += 1;
    } else {
      stats.withoutCoordinates += 1;
    }

    places.push(place);
  }

  return places;
};

/** Resolve Google Maps URLs and persist latitude/longitude to Directus. */
export async function backfillLocationCoordinates(
  options: BackfillLocationCoordinatesOptions = {},
): Promise<BackfillLocationCoordinatesResult> {
  const locale = options.locale ?? "ar";
  const limit = Math.min(Math.max(options.limit ?? 50, 1), 80);
  const concurrency = Math.min(Math.max(options.concurrency ?? 8, 1), 15);

  const { baseUrl, readToken, writeToken } = getDirectusConfig();
  const googleApiKey = process.env.GOOGLE_MAPS_GEOCODING_API_KEY?.trim();
  const rows = await fetchAllLocationRows(baseUrl, readToken);

  const stats: MapLocationsStats = {
    totalFetched: rows.length,
    published: 0,
    listed: 0,
    withCoordinates: 0,
    withoutCoordinates: 0,
    resolvedThisRequest: 0,
    geocodedThisRequest: 0,
    geocodePersistFailed: 0,
    geocodeFailed: 0,
    geocodeSkippedNoUrl: 0,
    byCategoryAr: {},
  };

  const places = buildListedPlaces(rows, locale, stats);

  await resolveCoordinatesForPlaces({
    places,
    rows,
    limit,
    concurrency,
    persist: true,
    baseUrl,
    writeToken,
    googleApiKey,
    stats,
  });

  const remaining = places.filter(
    (place) => !place.hasCoordinates && Boolean(place.mapsUrl),
  ).length;

  return { places, stats, remaining };
}
