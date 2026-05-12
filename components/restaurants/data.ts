/**
 * RESTAURANTS — WHERE TO PLUG THINGS IN
 *
 * ┌─────────────────────────────────────┬──────────────────────────────────────────────────────────┐
 * │ You put…                            │ It goes…                                                 │
 * ├─────────────────────────────────────┼──────────────────────────────────────────────────────────┤
 * │ Force dummy / skip API in prod      │ .env.local → NEXT_PUBLIC_RESTAURANTS_USE_DUMMY=true      │
 * │ Force live API in dev               │ .env.local → NEXT_PUBLIC_RESTAURANTS_USE_DUMMY=false     │
 * │ Real API base URL (optional)        │ .env.local → NEXT_PUBLIC_RESTAURANTS_API_BASE            │
 * │                                     │   (no trailing /). If unset, default tool-portal URL below.│
 * │ Dummy rows to edit / remove         │ dummyRestaurants.ts → DUMMY_RESTAURANTS                  │
 * │ API JSON field names                │ ApiLocation + LocationsApiResponse in this file          │
 * │ API row → Restaurant card           │ transformLocationToRestaurant()                          │
 * │ List endpoint path                  │ RESTAURANTS_LOCATIONS_ITEMS_PATH → `/items/restaurants`  │
 * │ Google Drive images via proxy       │ /api/image-proxy + getProxiedImageUrl()                  │
 * │ Remote image hosts for dummy        │ next.config.ts → images.remotePatterns (e.g. Unsplash)   │
 * │ Page that loads data                │ app/restaurants/page.tsx → fetchRestaurants()            │
 * │ IGCAT “visit site” URL              │ NEXT_PUBLIC_IGCAT_WEBSITE_URL → RestaurantsCredibility…  │
 * └─────────────────────────────────────┴──────────────────────────────────────────────────────────┘
 *
 * HTTP contract (live)
 * --------------------
 *   Method: GET
 *   URL:    `{NEXT_PUBLIC_RESTAURANTS_API_BASE || default}/items/restaurants`
 *   Body:   n/a
 *   JSON:   `{ "data": ApiLocation[] }` (Directus-style). Supports old and new shapes
 *           (`name_ar/name_en` or `title_ar/title_en`, `picture_url*` or `image`).
 *   Filter: client keeps rows that are published (when status exists), match restaurant category,
 *           and include at least one display name field.
 *
 * Switch from dummy to real data
 * ------------------------------
 *   1. Development: add `NEXT_PUBLIC_RESTAURANTS_USE_DUMMY=false` to hit the real API.
 *   2. Production: dummy is used only if `NEXT_PUBLIC_RESTAURANTS_USE_DUMMY=true` (otherwise live API).
 *   3. Optional cleanup: delete `dummyRestaurants.ts` and simplify `shouldUseRestaurantDummy()` below.
 *
 * Decision order
 * --------------
 *   - Production: dummy only when NEXT_PUBLIC_RESTAURANTS_USE_DUMMY === "true".
 *   - Development: dummy by default; live API when NEXT_PUBLIC_RESTAURANTS_USE_DUMMY === "false".
 *   - Dev + live fetch fails: falls back to dummy unless USE_DUMMY is explicitly "false".
 *   - Prod + live fetch fails: returns [] (empty grid); set USE_DUMMY=true temporarily if needed.
 */

import { DUMMY_RESTAURANTS } from "./dummyRestaurants";
import type { Restaurant } from "./types";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

export type { Restaurant } from "./types";

/** API shape from GET …/items/restaurants (Directus-style). */
export interface ApiLocation {
  id: string;
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
  image?: string | null;
  location_map?: string | null;
  type?: string | null;
  city?: string | null;
  tags?: string | null;
  categories?: string | null;
  title_en?: string | null;
  title_ar?: string | null;
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

const FOOD_BEVERAGE_CATEGORY = "Food & Beverage";
const FOOD_BEVERAGE_CATEGORY_AR = "مطاعم وكافيهات";
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

function getGoogleDriveFileId(pictureUrl: string | null): string | null {
  if (!pictureUrl || typeof pictureUrl !== "string" || pictureUrl.trim() === "")
    return null;
  if (
    pictureUrl.includes("لا يوجد صورة") ||
    !pictureUrl.includes("drive.google.com")
  )
    return null;
  const pathMatch = pictureUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (pathMatch) return pathMatch[1];
  const queryMatch = pictureUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return queryMatch ? queryMatch[1] : null;
}

function getImageUrl(pictureUrl: string | null | undefined): string {
  const clean = pictureUrl?.trim() || "";
  if (!clean || clean.includes("لا يوجد صورة")) return PLACEHOLDER_IMAGE;

  const fileId = getGoogleDriveFileId(clean);
  if (fileId) return `/api/image-proxy?id=${encodeURIComponent(fileId)}`;

  if (/^https?:\/\//i.test(clean) || clean.startsWith("/")) return clean;

  return PLACEHOLDER_IMAGE;
}

function pickBestName(loc: ApiLocation, locale: LocaleCode): string {
  return (
    pickLocalizedField(loc, "name", locale) ||
    pickLocalizedField(loc, "title", locale) ||
    ""
  ).trim();
}

function isPublished(item: ApiLocation): boolean {
  if (!item.status) return true;
  return item.status === "published";
}

function isRestaurantCategory(item: ApiLocation): boolean {
  const legacyCategoryEn = (item.category_en || "").trim();
  const legacyCategoryAr = (item.category_ar || "").trim();
  const category = (item.categories || "").trim();
  const type = (item.type || "").trim();

  if (!legacyCategoryEn && !legacyCategoryAr && !category && !type) return true;

  return (
    legacyCategoryEn === FOOD_BEVERAGE_CATEGORY ||
    category === FOOD_BEVERAGE_CATEGORY_AR ||
    type === "المطاعم"
  );
}

export const transformLocationToRestaurant = (
  loc: ApiLocation,
  locale: LocaleCode = "ar",
): Restaurant => {
  const name = pickBestName(loc, locale);
  const location = loc.city_ar
    ? `${loc.city_ar}، عسير`
    : loc.city_en
      ? `${loc.city_en}، عسير`
      : loc.city
        ? `${loc.city}، عسير`
      : locale === "ar"
        ? "عسير"
        : "Aseer";
  const pictureSource = loc.picture_url_new || loc.picture_url || loc.image;
  const image = getImageUrl(pictureSource);
  const mapsUrl =
    loc.google_maps_url?.trim() ||
    loc.location_map?.trim() ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;

  const priceRangeRaw = (loc.price_range ?? "").trim();
  const priceBandRaw = (loc.price_band ?? "").trim();
  const nationalityRaw = (loc.nationality_ar || loc.nationality_en || loc.tags || "").trim();

  const restaurant: Restaurant = {
    id: loc.id,
    name: name || (locale === "ar" ? "بدون اسم" : "Untitled"),
    location,
    distanceKm: toFiniteNumber(loc.distance_km, 0),
    rating: clampRating(loc.rating),
    reviewsCount: toNonNegativeInt(loc.reviews_count, 0),
    priceRange: priceRangeRaw || (locale === "ar" ? "غير محدد" : "Not specified"),
    nationality: nationalityRaw || (locale === "ar" ? "سعودي" : "Saudi"),
    category:
      loc.category_ar ||
      loc.category_en ||
      loc.categories ||
      loc.type ||
      (locale === "ar" ? "مطعم" : "Restaurant"),
    image,
    mapsUrl,
  };

  if (priceBandRaw) restaurant.priceBand = priceBandRaw;

  return restaurant;
};

function shouldUseRestaurantDummy(): boolean {
  const flag = process.env.NEXT_PUBLIC_RESTAURANTS_USE_DUMMY;
  if (flag === "true") return true;
  if (flag === "false") return false;
  return process.env.NODE_ENV === "development";
}

export async function fetchRestaurants(locale: LocaleCode = "ar"): Promise<Restaurant[]> {
  if (shouldUseRestaurantDummy()) {
    return DUMMY_RESTAURANTS;
  }

  try {
    // TODO(backend): Confirm path, filters, and auth with API owner.
    const response = await fetch(`${LOCATIONS_API_BASE}${RESTAURANTS_LOCATIONS_ITEMS_PATH}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: ${response.status} ${response.statusText}`);
    }

    const apiData: LocationsApiResponse = await response.json();
    return apiData.data
      .filter(
        (item) =>
          isPublished(item) &&
          isRestaurantCategory(item) &&
          (item.name_ar != null ||
            item.name_en != null ||
            item.title_ar != null ||
            item.title_en != null)
      )
      .map((item) => transformLocationToRestaurant(item, locale));
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_RESTAURANTS_USE_DUMMY !== "false"
    ) {
      console.warn(
        "[restaurants] Fetch failed — showing dummy list. Use NEXT_PUBLIC_RESTAURANTS_USE_DUMMY=false when the API is ready."
      );
      return DUMMY_RESTAURANTS;
    }
    return [];
  }
}
