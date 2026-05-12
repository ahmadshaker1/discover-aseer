import { NextResponse } from "next/server";

type DirectusRow = Record<string, unknown> & {
  id?: number | string;
  status?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  hide_from_interactive_map?: string | boolean | null;
};

interface DirectusResponse {
  data?: DirectusRow[];
}

type CollectionName =
  | "attractions"
  | "restaurants"
  | "events"
  | "accomodation"
  | "support_service";

interface MapPlace {
  id: string;
  source: CollectionName;
  sourceId: string;
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  hasCoordinates: boolean;
  category: string;
  city: string;
  tag?: string;
}

const COLLECTIONS: CollectionName[] = [
  "attractions",
  "restaurants",
  "events",
  "accomodation",
  "support_service",
];

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
  const lat = asNumberOrNull(row.latitude);
  const lng = asNumberOrNull(row.longitude);
  const hasCoordinates = lat != null && lng != null;

  const title = pickFirstText(
    row,
    locale === "en"
      ? ["name_en", "title_en", "title", "name_ar", "title_ar"]
      : ["name_ar", "title", "title_ar", "name_en", "title_en"],
    locale === "en" ? `Place ${index + 1}` : `موقع ${index + 1}`,
  );

  const description = pickFirstText(
    row,
    [
      "content",
      ...(locale === "en"
        ? (["description_en", "description", "description_ar"] as string[])
        : (["description_ar", "description", "description_en"] as string[])),
      "booking_info_ar",
      "booking_info_en",
    ],
    locale === "en" ? "Tourism location" : "موقع سياحي",
  );

  const category = pickFirstText(
    row,
    locale === "en"
      ? ["category_en", "type_en", "categories", "type", "category_ar", "type_ar"]
      : ["category_ar", "categories", "type_ar", "type", "category_en", "type_en"],
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

  return {
    id: `${source}:${sourceId}`,
    source,
    sourceId,
    title,
    description,
    latitude: lat,
    longitude: lng,
    hasCoordinates,
    category,
    city,
    tag,
  };
};

const dedupePlaces = (places: MapPlace[]): MapPlace[] => {
  const sourceUniq = new Map<string, MapPlace>();
  for (const place of places) {
    sourceUniq.set(`${place.source}:${place.sourceId}`, place);
  }

  const semanticUniq = new Map<string, MapPlace>();
  for (const place of sourceUniq.values()) {
    const key =
      place.latitude != null && place.longitude != null
        ? `${place.title.toLowerCase()}|${place.latitude.toFixed(6)}|${place.longitude.toFixed(6)}`
        : `${place.source}:${place.sourceId}`;
    if (!semanticUniq.has(key)) semanticUniq.set(key, place);
  }
  return Array.from(semanticUniq.values());
};

const fetchCollection = async (
  baseUrl: string,
  collection: CollectionName,
  headers?: HeadersInit,
): Promise<DirectusRow[]> => {
  const response = await fetch(`${baseUrl}/items/${collection}?limit=1000`, {
    headers,
    next: { revalidate: 120 },
  });
  if (!response.ok) return [];
  const json: DirectusResponse = await response.json();
  return Array.isArray(json.data) ? json.data : [];
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") === "en" ? "en" : "ar";
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(
    /\/$/,
    "",
  );
  const readToken = process.env.DIRECTUS_READ_TOKEN?.trim();

  if (!directusUrl) {
    return NextResponse.json(
      { data: [] as MapPlace[], error: "Missing Directus base URL" },
      { status: 500 },
    );
  }

  try {
    const headers = readToken
      ? { Authorization: `Bearer ${readToken}` }
      : undefined;
    const results = await Promise.allSettled(
      COLLECTIONS.map((collection) =>
        fetchCollection(directusUrl, collection, headers),
      ),
    );

    const merged: MapPlace[] = [];

    for (let i = 0; i < COLLECTIONS.length; i += 1) {
      const collection = COLLECTIONS[i];
      const result = results[i];
      if (result.status !== "fulfilled") continue;

      const mapped = result.value
        .filter((row) => isPublished(row))
        .filter((row) => !isHiddenFromMap(row.hide_from_interactive_map))
        .map((row, index) => buildMapPlace(row, collection, index, locale));

      merged.push(...mapped);
    }
    // filtering for the data points that have long and lat values
    const data = dedupePlaces(merged).filter((place) => place.hasCoordinates);
    console.log(data.length);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("[interactive-map/api] Failed to fetch locations", error);
    return NextResponse.json({ data: [] as MapPlace[] }, { status: 500 });
  }
}
