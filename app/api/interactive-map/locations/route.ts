import { NextResponse } from "next/server";
import { enrichPlacesWithGoogleMapsCoordinates } from "@/lib/maps/resolveGoogleMapsCoordinates";

/** Allow time to resolve many Google Maps short links (Vercel / similar). */
export const maxDuration = 60;

/** Never statically cache this route; each request runs Google link resolution. */
export const dynamic = "force-dynamic";

type DirectusRow = Record<string, unknown> & {
  id?: number | string;
  status?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  hide_from_interactive_map?: string | boolean | null;
  google_maps_url?: string | null;
  /** support_service */
  location?: string | null;
  title_ar?: string | null;
  title_en?: string | null;
  /** attractions */
  map_link?: string | null;
};

interface DirectusResponse {
  data?: DirectusRow[];
}

type CollectionName = "locations" | "support_service" | "attractions";

interface MapPlace {
  id: string;
  source: CollectionName;
  sourceId: string;
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  hasCoordinates: boolean;
  /** True when latitude/longitude come from CMS; false when approximated for map display */
  hasPreciseCoordinates: boolean;
  category: string;
  city: string;
  tag?: string;
  mapsUrl?: string;
}

const DEFAULT_TOOL_PORTAL_DIRECTUS_URL = "https://tool-portal.discoveraseer.com";

/** Mapbox-style [lng, lat] when used as pair; also used as region fallback. */
const REGION_CENTER_LNG = 42.62;
const REGION_CENTER_LAT = 18.25;

/**
 * Known city centroids (lng, lat). Keys: trimmed lowercase Latin or Arabic.
 * Used so link-only rows still appear on the map near their city.
 */
const CITY_CENTROID_LNG_LAT: Record<string, [number, number]> = {
  abha: [42.5054, 18.2164],
  أبها: [42.5054, 18.2164],
  "khamis mushait": [42.7288, 18.3001],
  "khamis mushit": [42.7288, 18.3001],
  "خميس مشيط": [42.7288, 18.3001],
  tanomah: [42.1, 18.1],
  تنومة: [42.1, 18.1],
  "tanuma": [42.1, 18.1],
  bisha: [42.6054, 19.9844],
  بيشة: [42.6054, 19.9844],
  tathleeth: [43.4967, 19.5264],
  تثليث: [43.4967, 19.5264],
  "dhahran al janoub": [47.7224, 17.4993],
  "ظهران الجنوب": [47.7224, 17.4993],
  "sarat abidah": [43.7544, 19.5564],
  "sarat ubaidah": [43.7544, 19.5564],
  "sarat ubaida": [43.7544, 19.5564],
  "سراة عبيدة": [43.7544, 19.5564],
  "rijal almaa": [42.2336, 17.4853],
  "rijal alma": [42.2336, 17.4853],
  "رجال ألمع": [42.2336, 17.4853],
  "رجال المع": [42.2336, 17.4853],
  muhayil: [42.55, 18.55],
  "muhayil asir": [42.55, 18.55],
  "محايل عسير": [42.55, 18.55],
  balqarn: [41.95, 19.88],
  بلقرن: [41.95, 19.88],
  bareq: [41.8833, 18.9333],
  بارق: [41.8833, 18.9333],
  "ahad rafidah": [42.5042, 18.5033],
  "أحد رفيدة": [42.5042, 18.5033],
  "al majardah": [41.9114, 19.1331],
  "al majarda": [41.9114, 19.1331],
  المجاردة: [41.9114, 19.1331],
  "bani amr": [42.0, 18.85],
  "بني عمرو": [42.0, 18.85],
  najran: [44.1277, 17.565],
  نجران: [44.1277, 17.565],
  aseer: [42.62, 18.25],
  عسير: [42.62, 18.25],
};

const normalizeCityLookupKey = (value: string): string => {
  const t = value.trim().toLowerCase().replace(/\s+/g, " ");
  if (!t) return "";
  if (CITY_CENTROID_LNG_LAT[t]) return t;
  const collapsed = t.replace(/\s+/g, "");
  for (const key of Object.keys(CITY_CENTROID_LNG_LAT)) {
    if (key.replace(/\s+/g, "") === collapsed) return key;
  }
  return t;
};

const centroidForCityLabel = (cityLabel: string): [number, number] => {
  const key = normalizeCityLookupKey(cityLabel);
  if (key && CITY_CENTROID_LNG_LAT[key]) return CITY_CENTROID_LNG_LAT[key];
  return [REGION_CENTER_LNG, REGION_CENTER_LAT];
};

const jitterLngLat = (
  seed: string,
): { dLng: number; dLat: number } => {
  let h = 2_166_136_261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16_777_619);
  }
  const u1 = (h >>> 0) / 2 ** 32;
  const h2 = Math.imul(h, 79_831);
  const u2 = (h2 >>> 0) / 2 ** 32;
  const theta = 2 * Math.PI * u1;
  const r = 0.0035 + 0.045 * Math.sqrt(u2);
  return { dLng: r * Math.cos(theta), dLat: r * Math.sin(theta) * 0.92 };
};

const resolvePlotCoordinates = (
  row: DirectusRow,
  source: CollectionName,
  sourceId: string,
  locale: "ar" | "en",
): { lat: number; lng: number; hasPreciseCoordinates: boolean } => {
  const lat = asNumberOrNull(row.latitude);
  const lng = asNumberOrNull(row.longitude);
  if (lat != null && lng != null) {
    return { lat, lng, hasPreciseCoordinates: true };
  }
  const cityLabel = pickFirstText(
    row,
    locale === "en" ? ["city_en", "city", "city_ar"] : ["city_ar", "city", "city_en"],
    "",
  );
  const [baseLng, baseLat] = centroidForCityLabel(cityLabel);
  const { dLng, dLat } = jitterLngLat(`${source}:${sourceId}`);
  return {
    lat: baseLat + dLat,
    lng: baseLng + dLng,
    hasPreciseCoordinates: false,
  };
};

const asText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const asNumberOrNull = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.trim());
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

const isPublished = (row: DirectusRow): boolean => {
  if (typeof row.status !== "string" || row.status.trim() === "") return true;
  return row.status.trim().toLowerCase() === "published";
};

const isHiddenFromMap = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  const normalized = asText(value).toLowerCase();
  return ["true", "1", "yes", "y", "نعم"].includes(normalized);
};

const isDraftRemovalRow = (row: DirectusRow): boolean => {
  const blob = `${asText(row.name_ar)} ${asText(row.name_en)}`.toLowerCase();
  return blob.includes("please remove");
};

const pickFirstText = (
  row: DirectusRow,
  keys: string[],
  fallback = "",
): string => {
  for (const key of keys) {
    const value = asText(row[key]);
    if (value) return value;
  }
  return fallback;
};

const buildMapPlace = (
  row: DirectusRow,
  source: CollectionName,
  index: number,
  locale: "ar" | "en",
): MapPlace => {
  const sourceId = String(row.id ?? index + 1);
  const plot = resolvePlotCoordinates(row, source, sourceId, locale);
  const hasCoordinates = Number.isFinite(plot.lat) && Number.isFinite(plot.lng);

  const title = pickFirstText(
    row,
    locale === "en"
      ? ["name_en", "title_en", "title_ar", "title", "name_ar"]
      : ["name_ar", "title_ar", "title_en", "title", "name_en"],
    locale === "en" ? `Place ${index + 1}` : `موقع ${index + 1}`,
  );

  const description = pickFirstText(
    row,
    [
      "content",
      ...(locale === "en"
        ? ([
            "description_en",
            "description",
            "description_ar",
            "booking_info_en",
            "booking_info_ar",
          ] as string[])
        : ([
            "description_ar",
            "description",
            "description_en",
            "booking_info_ar",
            "booking_info_en",
          ] as string[])),
    ],
    locale === "en" ? "Tourism location" : "موقع سياحي",
  );

  const category = pickFirstText(
    row,
    locale === "en"
      ? [
          "category_en",
          "type_en",
          "categories",
          "tags",
          "type",
          "category_ar",
          "type_ar",
        ]
      : ["category_ar", "categories", "tags", "type_ar", "type", "category_en", "type_en"],
    locale === "en" ? "Information" : "استفسارات",
  );

  const city = pickFirstText(
    row,
    locale === "en" ? ["city_en", "city", "city_ar"] : ["city_ar", "city", "city_en"],
    locale === "en" ? "Aseer" : "عسير",
  );
  const tag =
    pickFirstText(
      row,
      locale === "en" ? ["type_en", "type", "type_ar", "tags"] : ["type_ar", "type", "type_en", "tags"],
      "",
    ) || undefined;

  const mapsUrlRaw =
    asText(row.google_maps_url) ||
    asText(row.location) ||
    asText(row.map_link);
  const mapsUrl = mapsUrlRaw.length > 0 ? mapsUrlRaw : undefined;

  return {
    id: `${source}:${sourceId}`,
    source,
    sourceId,
    title,
    description,
    latitude: plot.lat,
    longitude: plot.lng,
    hasCoordinates,
    hasPreciseCoordinates: plot.hasPreciseCoordinates,
    category,
    city,
    tag,
    mapsUrl,
  };
};

/** One row per Directus item; do not merge by coordinates (many venues share pins). */
const dedupePlaces = (places: MapPlace[]): MapPlace[] => {
  const byKey = new Map<string, MapPlace>();
  for (const place of places) {
    byKey.set(`${place.source}:${place.sourceId}`, place);
  }
  return Array.from(byKey.values());
};

const PAGE_SIZE = 500;
const MAX_ROWS = 20_000;

const fetchAllCollectionRows = async (
  baseUrl: string,
  collection: string,
  headers?: HeadersInit,
): Promise<DirectusRow[]> => {
  const rows: DirectusRow[] = [];
  let offset = 0;

  while (offset < MAX_ROWS) {
    const qs = new URLSearchParams({
      limit: String(PAGE_SIZE),
      offset: String(offset),
      sort: "id",
    });
    const response = await fetch(
      `${baseUrl}/items/${collection}?${qs.toString()}`,
      {
        headers,
        next: { revalidate: 120 },
      },
    );
    if (!response.ok) break;

    const json: DirectusResponse = await response.json();
    const batch = Array.isArray(json.data) ? json.data : [];
    rows.push(...batch);
    if (batch.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return rows;
};

const normalizeBaseUrl = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/\/$/, "");
};

const rowHasMappableOrLinkOrName = (
  row: DirectusRow,
  collection: CollectionName,
): boolean => {
  const lat = asNumberOrNull(row.latitude);
  const lng = asNumberOrNull(row.longitude);
  if (lat != null && lng != null) return true;
  if (
    asText(row.google_maps_url) ||
    asText(row.location) ||
    asText(row.map_link)
  ) {
    return true;
  }
  if (
    asText(row.name_ar) ||
    asText(row.name_en) ||
    asText(row.title) ||
    asText(row.title_ar) ||
    asText(row.title_en)
  ) {
    return true;
  }
  if (collection !== "locations") {
    return Boolean(asText(row.slug) || asText(row.id));
  }
  return false;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") === "en" ? "en" : "ar";
  const toolPortalUrl =
    normalizeBaseUrl(process.env.NEXT_PUBLIC_TOOL_PORTAL_DIRECTUS_URL) ??
    DEFAULT_TOOL_PORTAL_DIRECTUS_URL;
  const readToken = process.env.DIRECTUS_READ_TOKEN?.trim();

  try {
    const headers = readToken
      ? { Authorization: `Bearer ${readToken}` }
      : undefined;
    const [locationsResult, supportResult, attractionsResult] =
      await Promise.allSettled([
        fetchAllCollectionRows(toolPortalUrl, "locations", headers),
        fetchAllCollectionRows(toolPortalUrl, "support_service", headers),
        fetchAllCollectionRows(toolPortalUrl, "attractions", headers),
      ]);

    const merged: MapPlace[] = [];

    const ingest = (
      rows: DirectusRow[],
      collection: CollectionName,
    ): void => {
      const mapped = rows
        .filter((row) => isPublished(row))
        .filter((row) => !isHiddenFromMap(row.hide_from_interactive_map))
        .filter((row) => !isDraftRemovalRow(row))
        .filter((row) => rowHasMappableOrLinkOrName(row, collection))
        .map((row, index) => buildMapPlace(row, collection, index, locale));
      merged.push(...mapped);
    };

    if (locationsResult.status === "fulfilled") {
      ingest(locationsResult.value, "locations");
    }
    if (supportResult.status === "fulfilled") {
      ingest(supportResult.value, "support_service");
    }
    if (attractionsResult.status === "fulfilled") {
      ingest(attractionsResult.value, "attractions");
    }

    const data = dedupePlaces(merged);
    const resolveFromGoogle =
      process.env.INTERACTIVE_MAP_RESOLVE_GOOGLE_MAPS !== "0";
    const enriched = await enrichPlacesWithGoogleMapsCoordinates(data, {
      enabled: resolveFromGoogle,
      concurrency: 8,
      timeoutMs: 8_000,
    });
    return NextResponse.json(
      { data: enriched },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "private, no-store, no-cache, must-revalidate, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("[interactive-map/api] Failed to fetch locations", error);
    return NextResponse.json({ data: [] as MapPlace[] }, { status: 500 });
  }
}
