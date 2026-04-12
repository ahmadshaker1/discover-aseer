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
 * │ List endpoint path                  │ RESTAURANTS_LOCATIONS_ITEMS_PATH → `/items/locations`    │
 * │ Google Drive images via proxy       │ /api/image-proxy + getProxiedImageUrl()                  │
 * │ Remote image hosts for dummy        │ next.config.ts → images.remotePatterns (e.g. Unsplash)   │
 * │ Page that loads data                │ app/restaurants/page.tsx → fetchRestaurants()            │
 * │ IGCAT “visit site” URL              │ NEXT_PUBLIC_IGCAT_WEBSITE_URL → RestaurantsCredibility…  │
 * └─────────────────────────────────────┴──────────────────────────────────────────────────────────┘
 *
 * HTTP contract (live)
 * --------------------
 *   Method: GET
 *   URL:    `{NEXT_PUBLIC_RESTAURANTS_API_BASE || default}/items/locations`
 *   Body:   n/a
 *   JSON:   `{ "data": ApiLocation[] }` (Directus-style). Each item must include fields used in
 *           `transformLocationToRestaurant`; optional fields in `ApiLocation` fill the rich card.
 *   Filter: client keeps rows with status === "published", category_en === "Food & Beverage",
 *           and at least one of name_ar / name_en. Adjust `FOOD_BEVERAGE_CATEGORY` if CMS differs.
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

export type { Restaurant } from "./types";

/** API shape from GET …/items/locations (Directus-style). */
export interface ApiLocation {
  id: string;
  status: string;
  sort: number | null;
  category_ar: string | null;
  category_en: string | null;
  type_ar: string | null;
  type_en: string | null;
  name_ar: string | null;
  name_en: string | null;
  city_ar: string | null;
  city_en: string | null;
  booking_info_ar: string | null;
  booking_info_en: string | null;
  description_ar: string | null;
  description_en: string | null;
  google_maps_url: string | null;
  picture_url: string | null;
  picture_note_ar: string | null;
  picture_note_en: string | null;
  picture_url_new: string | null;
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
const PLACEHOLDER_IMAGE = "/assets/experiences/experiences.png";

/** Exported so backend/docs can reference the same path as the code. */
export const RESTAURANTS_LOCATIONS_ITEMS_PATH = "/items/locations" as const;

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
    !pictureUrl.startsWith("https://drive.google.com/")
  )
    return null;
  const match = pictureUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function getProxiedImageUrl(pictureUrl: string | null): string {
  const fileId = getGoogleDriveFileId(pictureUrl);
  if (fileId) return `/api/image-proxy?id=${encodeURIComponent(fileId)}`;
  return PLACEHOLDER_IMAGE;
}

export const transformLocationToRestaurant = (loc: ApiLocation): Restaurant => {
  const name = (loc.name_ar || loc.name_en || "").trim();
  const location = loc.city_ar
    ? `${loc.city_ar}، عسير`
    : loc.city_en
      ? `${loc.city_en}، عسير`
      : "عسير";
  const pictureSource = loc.picture_url_new || loc.picture_url;
  const image = getProxiedImageUrl(pictureSource);
  const mapsUrl =
    loc.google_maps_url?.trim() ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;

  const priceRangeRaw = (loc.price_range ?? "").trim();
  const priceBandRaw = (loc.price_band ?? "").trim();
  const nationalityRaw = (loc.nationality_ar || loc.nationality_en || "").trim();

  const restaurant: Restaurant = {
    id: loc.id,
    name: name || "بدون اسم",
    location,
    distanceKm: toFiniteNumber(loc.distance_km, 0),
    rating: clampRating(loc.rating),
    reviewsCount: toNonNegativeInt(loc.reviews_count, 0),
    priceRange: priceRangeRaw || "غير محدد",
    nationality: nationalityRaw || "سعودي",
    category: loc.category_ar || loc.category_en || "مطعم",
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

export async function fetchRestaurants(): Promise<Restaurant[]> {
  if (shouldUseRestaurantDummy()) {
    return DUMMY_RESTAURANTS;
  }

  try {
    // TODO(backend): Confirm path, filters, and auth with API owner.
    const response = await fetch(`${LOCATIONS_API_BASE}${RESTAURANTS_LOCATIONS_ITEMS_PATH}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`);
    }

    const apiData: LocationsApiResponse = await response.json();
    return apiData.data
      .filter(
        (item) =>
          item.status === "published" &&
          item.category_en === FOOD_BEVERAGE_CATEGORY &&
          (item.name_ar != null || item.name_en != null)
      )
      .map(transformLocationToRestaurant);
  } catch (error) {
    console.error("Error fetching restaurants (locations):", error);
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
