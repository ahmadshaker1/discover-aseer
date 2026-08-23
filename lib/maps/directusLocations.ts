import {
  coordinatesFromGoogleMapsUrl,
  geocodeWithGoogleApi,
  getCachedCoordinatesFromGoogleMapsUrl,
  type LatLng,
} from "@/lib/maps/googleMapsCoordinates";
import {
  buildEventMapPlace,
  buildLocationMapPlace,
  isHiddenFromMap,
  isPublishedLocation,
  mapHideFlagFromRow,
  type DirectusEventRow,
  type DirectusLocationRow,
  type LocationMapPlace,
} from "@/lib/maps/locationMapPlace";
import type { LocaleCode } from "@/lib/i18n/localized";
import { directusCollectionFetch } from "@/lib/directus/collectionCache";

const LOCATION_FIELDS = [
  "id",
  "status",
  "latitude",
  "longitude",
  "name_ar",
  "name_en",
  "city_ar",
  "city_en",
  "description_ar",
  "description_en",
  "category_ar",
  "category_en",
  "type_ar",
  "type_en",
  "booking_info_ar",
  "booking_info_en",
  "google_maps_url",
  "picture_url",
  "picture_url_new",
  "season",
].join(",");

const EVENT_MAP_FIELDS = [
  "id",
  "title",
  "title_en",
  "description",
  "description_en",
  "latitude",
  "longitude",
  "map",
  "city",
  "hide_from_interactive_map",
  "image",
  "image_new",
  "type_ar",
  "type_en",
  "event_status",
].join(",");

const LOCATIONS_COLLECTION = "locations";
const EVENTS_COLLECTION = "events";

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
  /** First-page `/items/events` read succeeded (Directus token / permissions OK). */
  eventsFetchOk: boolean;
  /** Event pins in the payload after hide + build (before on-the-fly coordinate resolve). */
  eventsListed: number;
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
    url.searchParams.set("fields", LOCATION_FIELDS);

    const response = await fetch(url.toString(), {
      headers,
      ...directusCollectionFetch,
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

const fetchAllEventRows = async (
  baseUrl: string,
  readToken?: string,
): Promise<{ rows: DirectusEventRow[]; ok: boolean }> => {
  const headers: HeadersInit | undefined = readToken
    ? { Authorization: `Bearer ${readToken}` }
    : undefined;

  const rows: DirectusEventRow[] = [];
  const limit = 100;
  let offset = 0;
  let ok = true;

  for (;;) {
    const url = new URL(`${baseUrl}/items/${EVENTS_COLLECTION}`);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("meta", "filter_count");
    url.searchParams.set("filter[event_status][_eq]", "Now");
    url.searchParams.set("fields", EVENT_MAP_FIELDS);

    const response = await fetch(url.toString(), {
      headers,
      ...directusCollectionFetch,
    });

    if (!response.ok) {
      if (offset === 0) {
        ok = false;
        console.warn(
          `[directusLocations] events fetch failed (${response.status}) — falling back to location rows for event pins`,
        );
      }
      break;
    }

    const json = (await response.json()) as {
      data?: DirectusEventRow[];
      meta?: { filter_count?: number };
    };

    const batch = Array.isArray(json.data) ? json.data : [];
    rows.push(...batch);

    if (batch.length < limit) break;
    offset += limit;
    if (offset > 10_000) break;
  }

  return { rows, ok };
};

/**
 * Combine `locations` pins with `events` pins. When both collections share the same
 * Google/Apple Maps URL, keep the `events:*` row so the richer event payload wins.
 * Rows without a map URL are all kept (no dedupe key).
 */
const mergeLocationAndEventPlaces = (
  locationPlaces: LocationMapPlace[],
  eventPlaces: LocationMapPlace[],
): LocationMapPlace[] => {
  const byUrl = new Map<string, LocationMapPlace>();
  const noUrl: LocationMapPlace[] = [];

  const consider = (place: LocationMapPlace) => {
    const key = place.mapsUrl?.trim().toLowerCase();
    if (!key) {
      noUrl.push(place);
      return;
    }
    const existing = byUrl.get(key);
    if (!existing) {
      byUrl.set(key, place);
      return;
    }
    if (
      place.id.startsWith("events:") &&
      existing.id.startsWith("locations:")
    ) {
      byUrl.set(key, place);
    }
  };

  for (const place of locationPlaces) consider(place);
  for (const place of eventPlaces) consider(place);

  return [...byUrl.values(), ...noUrl];
};

type HiddenRestaurantMatch = {
  names: Set<string>;
};

const normalizeMatchText = (value: unknown): string =>
  String(value ?? "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

/** Restaurants flagged `hide_from_interactive_map` should not appear as map pins. */
const fetchHiddenRestaurantMatches = async (
  baseUrl: string,
  readToken?: string,
): Promise<HiddenRestaurantMatch> => {
  const names = new Set<string>();
  const headers: HeadersInit | undefined = readToken
    ? { Authorization: `Bearer ${readToken}` }
    : undefined;

  try {
    const url = new URL(`${baseUrl}/items/restaurants`);
    url.searchParams.set("limit", "100");
    url.searchParams.set(
      "fields",
      "title_en,title_ar,hide_from_interactive_map",
    );
    url.searchParams.set("filter[hide_from_interactive_map][_eq]", "true");

    const response = await fetch(url.toString(), {
      headers,
      ...directusCollectionFetch,
    });
    if (!response.ok) return { names };

    const json = (await response.json()) as {
      data?: Array<Record<string, unknown>>;
    };
    for (const row of json.data ?? []) {
      if (!isHiddenFromMap(mapHideFlagFromRow(row))) continue;
      for (const key of ["title_en", "title_ar"] as const) {
        const name = normalizeMatchText(row[key]);
        if (name) names.add(name);
      }
    }
  } catch (error) {
    console.warn(
      "[directusLocations] failed to load hidden restaurants for map filter",
      error,
    );
  }

  return { names };
};

const isPlaceHiddenByRestaurantFlag = (
  place: LocationMapPlace,
  row: DirectusLocationRow,
  hidden: HiddenRestaurantMatch,
): boolean => {
  if (hidden.names.size === 0) return false;

  const title = normalizeMatchText(place.title);
  if (title && hidden.names.has(title)) return true;

  for (const key of ["name_en", "name_ar"] as const) {
    const name = normalizeMatchText(row[key]);
    if (name && hidden.names.has(name)) return true;
  }

  return false;
};

const recountListedStats = (
  places: LocationMapPlace[],
  stats: MapLocationsStats,
): void => {
  stats.listed = places.length;
  stats.withCoordinates = 0;
  stats.withoutCoordinates = 0;
  stats.byCategoryAr = {};

  for (const place of places) {
    const categoryLabel = place.categoryAr || place.categoryEn || "—";
    stats.byCategoryAr[categoryLabel] =
      (stats.byCategoryAr[categoryLabel] ?? 0) + 1;
    if (place.hasCoordinates) stats.withCoordinates += 1;
    else stats.withoutCoordinates += 1;
  }
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
  /**
   * `places` lists all locations first, then events. Without reordering, the resolve
   * budget can be exhausted by location rows and event pins never get coordinates.
   */
  pending.sort((a, b) => {
    const aEvent = a.id.startsWith("events:") ? 0 : 1;
    const bEvent = b.id.startsWith("events:") ? 0 : 1;
    return aEvent - bEvent;
  });
  const batch = pending.slice(0, limit);
  if (batch.length === 0) return;

  await runWithConcurrency(batch, concurrency, async (place) => {
    const mapsUrl = place.mapsUrl;
    if (!mapsUrl) {
      stats.geocodeSkippedNoUrl += 1;
      return;
    }

    let coords = (await getCachedCoordinatesFromGoogleMapsUrl(mapsUrl)) ?? null;

    if (!coords) {
      const sourceId = place.id.startsWith("locations:")
        ? place.id.slice("locations:".length)
        : "";
      const row =
        sourceId && rows.length > 0
          ? rows.find((item) => String(item.id) === sourceId)
          : undefined;
      coords = await geocodeLocationRow(
        row ?? ({} as DirectusLocationRow),
        place,
        googleApiKey,
      );
    }

    if (!coords) {
      stats.geocodeFailed += 1;
      return;
    }

    place.latitude = coords.latitude;
    place.longitude = coords.longitude;
    place.hasCoordinates = true;
    stats.resolvedThisRequest += 1;

    if (persist && place.id.startsWith("locations:")) {
      const sourceId = place.id.slice("locations:".length);
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
  const resolveLimit = Math.min(Math.max(options.resolveLimit ?? 40, 0), 300);
  const geocodeLimit = Math.min(Math.max(options.geocodeLimit ?? 25, 0), 50);
  const shouldResolve = options.resolve === true;
  const shouldPersist = options.geocode === true;

  const [rows, eventResult, hiddenRestaurants] = await Promise.all([
    fetchAllLocationRows(baseUrl, readToken),
    fetchAllEventRows(baseUrl, readToken),
    fetchHiddenRestaurantMatches(baseUrl, readToken),
  ]);
  const eventRows = eventResult.rows;
  const eventsCollectionReady = eventResult.ok;

  const stats: MapLocationsStats = {
    totalFetched: rows.length + eventRows.length,
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
    eventsFetchOk: eventsCollectionReady,
    eventsListed: 0,
  };

  const locationPlaces: LocationMapPlace[] = [];

  for (const row of rows) {
    if (!isPublishedLocation(row)) continue;
    stats.published += 1;
    if (isHiddenFromMap(mapHideFlagFromRow(row as Record<string, unknown>)))
      continue;

    const place = buildLocationMapPlace(row, options.locale);
    if (!place) continue;
    if (isPlaceHiddenByRestaurantFlag(place, row, hiddenRestaurants)) continue;

    locationPlaces.push(place);
  }

  const eventPlaces: LocationMapPlace[] = [];

  for (const row of eventRows) {
    stats.published += 1;
    if (isHiddenFromMap(mapHideFlagFromRow(row as Record<string, unknown>))) {
      continue;
    }

    if (row.event_status !== "Now") {
      continue;
    }

    const place = buildEventMapPlace(row, options.locale);
    if (!place) continue;

    stats.eventsListed += 1;
    eventPlaces.push(place);
  }

  const places = mergeLocationAndEventPlaces(locationPlaces, eventPlaces);
  recountListedStats(places, stats);

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
    if (isHiddenFromMap(mapHideFlagFromRow(row as Record<string, unknown>)))
      continue;

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
    eventsFetchOk: true,
    eventsListed: 0,
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
