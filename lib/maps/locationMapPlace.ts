import type { MapCategoryKey } from "@/components/interactive-map/mapCategories";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

/** Directus `events` collection rows (interactive map). */
export type DirectusEventRow = Record<string, unknown> & {
  id?: string | number;
  title?: string | null;
  title_en?: string | null;
  description?: string | null;
  description_en?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  map?: string | null;
  city?: string | null;
  hide_from_interactive_map?: string | boolean | null;
  /** Alternate field name on some Directus collections */
  hide_from_map?: string | boolean | null;
  image?: string | null;
  thumbnail?: string | null;
  hero_mobile?: string | null;
  image_new?: string | null;
  type?: string | null;
  categories?: string | null;
};

export type DirectusLocationRow = Record<string, unknown> & {
  id?: string | number;
  status?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  hide_from_interactive_map?: string | boolean | null;
  /** Alternate field name on some Directus collections */
  hide_from_map?: string | boolean | null;
  name_ar?: string | null;
  name_en?: string | null;
  city_ar?: string | null;
  city_en?: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  category_ar?: string | null;
  category_en?: string | null;
  type_ar?: string | null;
  type_en?: string | null;
  booking_info_ar?: string | null;
  booking_info_en?: string | null;
  google_maps_url?: string | null;
  picture_url?: string | null;
  picture_url_new?: string | null;
};

export interface LocationMapPlace {
  id: string;
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  hasCoordinates: boolean;
  category: string;
  categoryAr: string;
  categoryEn: string;
  categoryKey: MapCategoryKey | null;
  city: string;
  tag?: string;
  mapsUrl?: string;
  imageUrl?: string;
}

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

const CATEGORY_AR_TO_KEY: Record<string, MapCategoryKey> = {
  الفعاليات: "events",
  "التجارب السياحية": "experiences",
  "المعالم السياحية": "attractions",
  "تخييم + كرفانات": "camping",
  "مطاعم وكافيهات": "restaurants",
  "أماكن الاقامة": "accommodation",
  "أماكن الإقامة": "accommodation",
};

const CATEGORY_EN_TO_KEY: Record<string, MapCategoryKey> = {
  Events: "events",
  Experiences: "experiences",
  Attractions: "attractions",
  "Camping & Caravans": "camping",
  "Food & Beverage": "restaurants",
  Accommodation: "accommodation",
};

export const resolveLocationCategoryKey = (
  categoryAr: string,
  categoryEn: string,
): MapCategoryKey | null => {
  if (categoryAr && CATEGORY_AR_TO_KEY[categoryAr]) {
    return CATEGORY_AR_TO_KEY[categoryAr];
  }
  if (categoryEn && CATEGORY_EN_TO_KEY[categoryEn]) {
    return CATEGORY_EN_TO_KEY[categoryEn];
  }
  if (/تجارب|experience/i.test(`${categoryAr} ${categoryEn}`)) {
    return "experiences";
  }
  if (/تخييم|كرفان|camping|caravan/i.test(`${categoryAr} ${categoryEn}`)) {
    return "camping";
  }
  if (/فعاليات|event/i.test(`${categoryAr} ${categoryEn}`)) return "events";
  if (/معالم|attraction/i.test(`${categoryAr} ${categoryEn}`)) {
    return "attractions";
  }
  if (/مطعم|مقهى|restaurant|cafe|food/i.test(`${categoryAr} ${categoryEn}`)) {
    return "restaurants";
  }
  if (/إقامة|فندق|accommodation|hotel/i.test(`${categoryAr} ${categoryEn}`)) {
    return "accommodation";
  }
  return null;
};

function getGoogleDriveFileId(pictureUrl: string): string | null {
  if (!pictureUrl.includes("drive.google.com")) return null;
  const pathMatch = pictureUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (pathMatch) return pathMatch[1];
  const queryMatch = pictureUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return queryMatch ? queryMatch[1] : null;
}

function resolveLocationImageUrl(row: DirectusLocationRow): string | undefined {
  const candidates = [row.picture_url_new, row.picture_url]
    .map((value) => asText(value))
    .filter(Boolean);

  for (const raw of candidates) {
    if (/لا يوجد صور?/i.test(raw)) continue;

    const driveId = getGoogleDriveFileId(raw);
    if (driveId) return `/api/image-proxy?id=${encodeURIComponent(driveId)}`;

    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.startsWith("//")) return `https:${raw}`;
    if (raw.startsWith("/")) return raw;
  }

  return undefined;
}

function resolveEventImageUrl(row: DirectusEventRow): string | undefined {
  const candidates = [
    row.image_new,
    row.hero_mobile,
    row.thumbnail,
    row.image,
  ]
    .map((value) => asText(value))
    .filter(Boolean);

  for (const raw of candidates) {
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.startsWith("//")) return `https:${raw}`;
    if (raw.startsWith("/")) return raw;
  }

  return undefined;
}

/**
 * Map an `events` collection row to the shared interactive-map place model.
 * `hide_from_interactive_map` is handled by the caller (same semantics as `locations`).
 */
export const buildEventMapPlace = (
  row: DirectusEventRow,
  locale: LocaleCode,
): LocationMapPlace | null => {
  const sourceId = asText(row.id);
  if (!sourceId) return null;

  const record = row as Record<string, unknown>;
  const title =
    pickLocalizedField(record, "title", locale) ||
    (locale === "en" ? "Event" : "فعالية");
  const description =
    pickLocalizedField(record, "description", locale) ||
    (locale === "en" ? "Event" : "فعالية");

  const lat = asNumberOrNull(row.latitude);
  const lng = asNumberOrNull(row.longitude);
  const hasCoordinates = lat != null && lng != null;

  const cityRaw = asText(row.city);
  const city = cityRaw || (locale === "en" ? "Aseer" : "عسير");
  const mapsUrl = asText(row.map) || undefined;
  const tag = asText(row.type) || undefined;

  const categoryAr = "الفعاليات";
  const categoryEn = "Events";
  const category = locale === "en" ? categoryEn : categoryAr;

  return {
    id: `events:${sourceId}`,
    title,
    description,
    latitude: lat,
    longitude: lng,
    hasCoordinates,
    category,
    categoryAr,
    categoryEn,
    categoryKey: "events",
    city,
    tag: tag || undefined,
    mapsUrl,
    imageUrl: resolveEventImageUrl(row),
  };
};

export const buildLocationMapPlace = (
  row: DirectusLocationRow,
  locale: LocaleCode,
): LocationMapPlace | null => {
  const sourceId = asText(row.id);
  if (!sourceId) return null;

  const lat = asNumberOrNull(row.latitude);
  const lng = asNumberOrNull(row.longitude);
  const hasCoordinates = lat != null && lng != null;

  const record = row as Record<string, unknown>;
  const title =
    pickLocalizedField(record, "name", locale) ||
    (locale === "en" ? `Place` : `موقع`);
  const description =
    pickLocalizedField(record, "description", locale) ||
    pickLocalizedField(record, "booking_info", locale) ||
    (locale === "en" ? "Tourism location" : "موقع سياحي");

  const categoryAr = asText(row.category_ar);
  const categoryEn = asText(row.category_en);
  const category =
    locale === "en"
      ? categoryEn || categoryAr
      : categoryAr || categoryEn;

  const city =
    pickLocalizedField(record, "city", locale) ||
    (locale === "en" ? "Aseer" : "عسير");

  const tag =
    pickLocalizedField(record, "type", locale) ||
    undefined;

  const mapsUrl = asText(row.google_maps_url) || undefined;

  return {
    id: `locations:${sourceId}`,
    title,
    description,
    latitude: lat,
    longitude: lng,
    hasCoordinates,
    category,
    categoryAr,
    categoryEn,
    categoryKey: resolveLocationCategoryKey(categoryAr, categoryEn),
    city,
    tag: tag || undefined,
    mapsUrl,
    imageUrl: resolveLocationImageUrl(row),
  };
};

export const isPublishedLocation = (row: DirectusLocationRow): boolean => {
  if (typeof row.status !== "string" || row.status.trim() === "") return true;
  return row.status.trim().toLowerCase() === "published";
};

/** Prefer CMS `hide_from_interactive_map`; some collections use `hide_from_map`. */
export const mapHideFlagFromRow = (row: Record<string, unknown>): unknown =>
  row.hide_from_interactive_map ?? row.hide_from_map;

/**
 * `true` means exclude from the interactive map.
 * Supports Directus booleans, yes/no toggles, strings, and 0/1 integers.
 */
export const isHiddenFromMap = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") {
    if (value === 0) return false;
    if (value === 1) return true;
    return false;
  }
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return false;
  if (["false", "no", "0", "off", "لا"].includes(normalized)) return false;
  return ["true", "1", "yes", "y", "on", "نعم"].includes(normalized);
};
