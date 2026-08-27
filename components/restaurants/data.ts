/**
 * Restaurants listing from Directus `items/restaurants`.
 * Env: `NEXT_PUBLIC_RESTAURANTS_API_BASE` (optional) or `NEXT_PUBLIC_DIRECTUS_APP_URL`.
 */

import { inferCityIdFromLocation } from "@/components/landmarks/filterOptions";
import {
  translateRestaurantCity,
  translateRestaurantLabel,
} from "./restaurantLocale";
import type { Restaurant } from "./types";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import {
  catalogTotalPages,
  fetchDirectusCollectionAll,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";

const RESTAURANT_FIELDS = [
  "id",
  "title_ar",
  "title_en",
  "city",
  "image_new",
  "image",
  "location_map",
  "cuisine_type",
  "content",
  "content_ar",
  "latitude",
  "longitude",
  "slug",
] as const;

export type { Restaurant } from "./types";

/** API shape from GET …/items/restaurants (Directus-style). */
export interface ApiLocation {
  id: string | number;
  status?: string | null;
  sort?: number | null;
  category_ar?: string | null;
  category_en?: string | null;
  type_ar?: string | null;
  type_en?: string | null;
  name_ar?: string | null;
  name_en?: string | null;
  city_ar?: string | null;
  city_en?: string | null;
  booking_info_ar?: string | null;
  booking_info_en?: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  google_maps_url?: string | null;
  picture_url?: string | null;
  picture_note_ar?: string | null;
  picture_note_en?: string | null;
  picture_url_new?: string | null;
  /** New endpoint fields (items/restaurants). */
  content?: string | null;
  /** Primary CMS image (Directus asset id or URL). */
  image_new?: string | null;
  image?: string | null;
  location_map?: string | null;
  type?: string | null;
  city?: string | null;
  tags?: string | null;
  cuisine_type?: string[] | string | null;
  categories?: string | null;
  title_en?: string | null;
  title_ar?: string | null;
  content_ar?: string | null;
  /** Optional — maps to Restaurant.rating (0–5). */
  rating?: number | string | null;
  /** Optional — maps to Restaurant.reviewsCount. */
  reviews_count?: number | string | null;
  /** Optional — maps to Restaurant.priceRange (e.g. "$$"). */
  price_range?: string | null;
  /** Optional — maps to Restaurant.priceBand (e.g. "100-50"). */
  price_band?: string | null;
  /** Optional — maps to Restaurant.nationality. */
  nationality_ar?: string | null;
  nationality_en?: string | null;
  /** Optional — maps to Restaurant.distanceKm. */
  distance_km?: number | string | null;
}

export interface LocationsApiResponse {
  data: ApiLocation[];
}

const PLACEHOLDER_IMAGE = "/assets/experiences/experiences.png";

/** Exported so backend/docs can reference the same path as the code. */
export const RESTAURANTS_LOCATIONS_ITEMS_PATH = "/items/restaurants" as const;

const LOCATIONS_API_BASE =
  process.env.NEXT_PUBLIC_RESTAURANTS_API_BASE?.replace(/\/$/, "") ||
  "https://tool-portal.discoveraseer.com";

function toFiniteNumber(value: unknown, fallback: number): number {
  if (value == null || value === "") return fallback;
  const n = typeof value === "number" ? value : Number(String(value).trim());
  return Number.isFinite(n) ? n : fallback;
}

function toNonNegativeInt(value: unknown, fallback: number): number {
  const n = Math.round(toFiniteNumber(value, fallback));
  return n < 0 ? fallback : n;
}

function clampRating(value: unknown): number {
  const r = toFiniteNumber(value, 0);
  if (r <= 0) return 0;
  return Math.min(5, r);
}

function getGoogleDriveFileId(pictureUrl: string): string | null {
  if (!pictureUrl.includes("drive.google.com")) return null;
  const pathMatch = pictureUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (pathMatch) return pathMatch[1];
  const queryMatch = pictureUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return queryMatch ? queryMatch[1] : null;
}

function toRestaurantImageUrl(value: string | null | undefined): string | null {
  const clean = value?.trim() || "";
  if (!clean || clean.includes("لا يوجد صورة")) return null;

  const driveFileId = getGoogleDriveFileId(clean);
  if (driveFileId) return `/api/image-proxy?id=${encodeURIComponent(driveFileId)}`;

  if (/^https?:\/\//i.test(clean)) return clean;
  if (clean.startsWith("//")) return `https:${clean}`;
  if (clean.startsWith("/")) return clean;

  return `${LOCATIONS_API_BASE}/assets/${clean}`;
}

function resolveRestaurantImageUrl(
  imageNew: string | null | undefined,
  image: string | null | undefined,
): string {
  return (
    toRestaurantImageUrl(imageNew) ??
    toRestaurantImageUrl(image) ??
    PLACEHOLDER_IMAGE
  );
}

function pickBestName(loc: ApiLocation, locale: LocaleCode): string {
  const row = loc as unknown as Record<string, unknown>;
  return (
    pickLocalizedField(row, "name", locale) ||
    pickLocalizedField(row, "title", locale) ||
    ""
  ).trim();
}

function isPublished(item: ApiLocation): boolean {
  if (!item.status) return true;
  return item.status === "published";
}

function normalizeCuisineTypes(value: unknown): string[] {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value
      .filter((entry): entry is string => typeof entry === "string")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return normalizeCuisineTypes(parsed);
    } catch {
      // Not JSON — fall through to delimiter split.
    }
    return trimmed
      .split(/[,،]/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
}

export const transformLocationToRestaurant = (
  loc: ApiLocation,
  locale: LocaleCode = "ar",
): Restaurant => {
  const row = loc as unknown as Record<string, unknown>;
  const name = pickBestName(loc, locale);

  const cityNameRaw =
    pickLocalizedField(row, "city", locale) || (loc.city || "").trim();
  const cityName =
    locale === "en"
      ? translateRestaurantCity(cityNameRaw, locale)
      : cityNameRaw;
  const location = cityName
    ? locale === "ar"
      ? `${cityName}، عسير`
      : `${cityName}, Aseer`
    : locale === "ar"
      ? "عسير"
      : "Aseer";

  const image = resolveRestaurantImageUrl(loc.image_new, loc.image);
  const mapsUrl =
    loc.google_maps_url?.trim() ||
    loc.location_map?.trim() ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;

  const priceRangeRaw = (loc.price_range ?? "").trim();
  const priceBandRaw = (loc.price_band ?? "").trim();
  const cuisineTypes = normalizeCuisineTypes(loc.cuisine_type);
  const nationalityRaw = pickLocalizedField(row, "nationality", locale) || "";

  const categoryRaw =
    pickLocalizedField(row, "category", locale) ||
    pickLocalizedField(row, "type", locale) ||
    (loc.categories || loc.type || loc.tags || "").trim() ||
    (locale === "ar" ? "مطعم" : "Restaurant");

  const category = translateRestaurantLabel(categoryRaw, locale);
  const nationality = translateRestaurantLabel(
    nationalityRaw || (locale === "ar" ? "سعودي" : "Saudi"),
    locale,
  );

  const cityId = inferCityIdFromLocation(location);

  const restaurant: Restaurant = {
    id: String(loc.id),
    name: name || (locale === "ar" ? "بدون اسم" : "Untitled"),
    location,
    ...(cityId ? { cityId } : {}),
    distanceKm: toFiniteNumber(loc.distance_km, 0),
    rating: clampRating(loc.rating),
    reviewsCount: toNonNegativeInt(loc.reviews_count, 0),
    priceRange: priceRangeRaw || (locale === "ar" ? "غير محدد" : "Not specified"),
    nationality,
    category,
    ...(cuisineTypes.length > 0 ? { cuisineTypes } : {}),
    image,
    mapsUrl,
  };

  if (priceBandRaw) restaurant.priceBand = priceBandRaw;

  return restaurant;
};

export async function fetchRestaurants(
  locale: LocaleCode = "ar",
): Promise<{
  items: Restaurant[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const empty = { items: [] as Restaurant[], total: 0, page: 1, totalPages: 1 };
  try {
    const { rows } = await fetchDirectusCollectionAll<ApiLocation>(
      (page, pageSize, meta) =>
        directusItemsUrl(LOCATIONS_API_BASE, "restaurants", {
          fields: RESTAURANT_FIELDS,
          page,
          pageSize,
          meta,
        }),
    );
    const items = rows
      .filter(
        (item) =>
          isPublished(item) &&
          (item.name_ar != null ||
            item.name_en != null ||
            item.title_ar != null ||
            item.title_en != null)
      )
      .map((item) => transformLocationToRestaurant(item, locale));
    return {
      items,
      total: items.length,
      page: 1,
      totalPages: catalogTotalPages(items.length, items.length || 1),
    };
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return empty;
  }
}
