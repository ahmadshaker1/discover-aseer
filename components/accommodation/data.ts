import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import {
  DIRECTUS_COLLECTION_LIMIT,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";

const ACCOMMODATION_FIELDS = [
  "id",
  "status",
  "name_ar",
  "name_en",
  "name",
  "city",
  "city_en",
  "area",
  "location",
  "content",
  "description",
  "short_description",
  "cover_image",
  "image",
  "hero_image",
  "hotel_rating",
  "average_rating",
  "reviews_count",
  "stars",
  "booking_link",
  "maps_url",
  "google_maps_url",
  "type",
  "type_ar",
  "featured",
  "exceptional",
  "is_exceptional",
] as const;

export type AccommodationType = "hotel" | "hotel_apartment";

export const ACCOMMODATION_TYPES: AccommodationType[] = [
  "hotel",
  "hotel_apartment",
];

export interface Accommodation {
  id: string;
  name: string;
  city: string;
  location: string;
  description: string;
  hero_image: string;
  rating: number;
  reviewsCount: number;
  stars: number;
  type: AccommodationType;
  bookingUrl: string;
  /** Featured / exceptional property — shown in horizontal strip + badge */
  exceptional?: boolean;
  /** Maps link for "الموقع" CTA; falls back to Google search from name/city/location */
  mapsUrl?: string | null;
}

export interface ApiAccommodation {
  id: string | number;
  status?: string | null;
  name_ar?: string | null;
  name_en?: string | null;
  name?: string | null;
  city?: string | null;
  city_en?: string | null;
  area?: string | null;
  location?: string | null;
  content?: string | null;
  description?: string | null;
  short_description?: string | null;
  cover_image?: string | null;
  image?: string | null;
  hero_image?: string | null;
  hotel_rating?: number | string | null;
  average_rating?: number | string | null;
  reviews_count?: number | string | null;
  stars?: number | string | null;
  booking_link?: string | null;
  maps_url?: string | null;
  google_maps_url?: string | null;
  type?: string | null;
  type_ar?: string | null;
  featured?: boolean | null;
  exceptional?: boolean | null;
  is_exceptional?: boolean | null;
  [key: string]: unknown;
}

export interface ApiResponse {
  data: ApiAccommodation[];
}

const FALLBACK_IMAGE = "/assets/experiences/experiences.png";
const DEFAULT_LOCATION = "منطقة عسير";

const toNumber = (
  value: number | string | null | undefined,
  fallback: number,
) => {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (!Number.isNaN(n)) return n;
  }
  return fallback;
};

const isHttpUrl = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://");

export function normalizeAccommodationType(value: unknown): AccommodationType {
  const raw = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  if (
    raw === "hotel_apartment" ||
    raw === "apartment" ||
    raw.includes("apartment") ||
    raw.includes("شقق")
  ) {
    return "hotel_apartment";
  }
  return "hotel";
}

function toFeaturedFlag(value: unknown): boolean {
  if (value === true || value === 1 || value === "1" || value === "true") {
    return true;
  }
  return false;
}

const buildAssetUrl = (directusUrl: string, assetId?: string | null) => {
  if (!assetId) return FALLBACK_IMAGE;
  if (assetId.startsWith("http://") || assetId.startsWith("https://"))
    return assetId;
  return `${directusUrl}/assets/${assetId}`;
};

const normalizeCity = (city: string, locale: LocaleCode): string => {
  const c = city.trim();
  if (locale === "en") {
    const map: Record<string, string> = {
      أبها: "Abha",
      "خميس مشيط": "Khamis Mushait",
      السودة: "Al Soudah",
      بيشة: "Bisha",
      تنومة: "Tanomah",
      النماص: "Al Namas",
      "محايل عسير": "Mahayil Aseer",
      "رجال ألمع": "Rijal Almaa",
    };
    return map[c] || c;
  }
  if (locale === "ar") {
    const map: Record<string, string> = {
      Abha: "أبها",
      "Khamis Mushait": "خميس مشيط",
      "Al Soudah": "السودة",
      Bisha: "بيشة",
      Tanomah: "تنومة",
      "Al Namas": "النماص",
      "Mahayil Aseer": "محايل عسير",
      "Rijal Almaa": "رجال ألمع",
    };
    return map[c] || c;
  }
  return c;
};

export const transformAccommodation = (
  apiAccommodation: ApiAccommodation,
  directusUrl: string,
  locale: LocaleCode = "ar",
): Accommodation => {
  const imageUrl = buildAssetUrl(
    directusUrl,
    String(
      apiAccommodation.hero_image ||
        apiAccommodation.cover_image ||
        apiAccommodation.image ||
        "",
    ),
  );

  const name = String(
    pickLocalizedField(apiAccommodation, "name", locale) ||
      apiAccommodation.name ||
      (locale === "ar" ? "مكان إقامة" : "Accommodation"),
  );

  const rawCity = String(
    pickLocalizedField(apiAccommodation, "city", locale) ||
      apiAccommodation.city ||
      (locale === "ar" ? "أبها" : "Abha"),
  );
  const city = normalizeCity(rawCity, locale);

  const locationValue = String(
    pickLocalizedField(apiAccommodation, "location", locale) ||
      apiAccommodation.location ||
      "",
  ).trim();
  const location =
    (locationValue && !isHttpUrl(locationValue) ? locationValue : "") ||
    String(
      pickLocalizedField(apiAccommodation, "area", locale) ||
        apiAccommodation.area ||
        city ||
        DEFAULT_LOCATION,
    );

  const hotelRating = toNumber(apiAccommodation.hotel_rating, 4);

  const mapsUrlRaw = String(
    apiAccommodation.maps_url || apiAccommodation.google_maps_url || "",
  ).trim();
  const mapsUrl = mapsUrlRaw && isHttpUrl(mapsUrlRaw) ? mapsUrlRaw : undefined;

  const exceptional = toFeaturedFlag(
    apiAccommodation.featured ??
      apiAccommodation.exceptional ??
      apiAccommodation.is_exceptional,
  );

  return {
    id: String(apiAccommodation.id),
    name,
    city,
    location,
    description: String(
      pickLocalizedField(apiAccommodation, "content", locale) ||
        pickLocalizedField(apiAccommodation, "short_description", locale) ||
        pickLocalizedField(apiAccommodation, "description", locale) ||
        (locale === "ar"
          ? "إقامة مميزة بخدمات فندقية وتجربة مريحة."
          : "A premium stay with comfortable hospitality services."),
    ),
    hero_image: imageUrl,
    rating: toNumber(apiAccommodation.average_rating, 4.5),
    reviewsCount: toNumber(apiAccommodation.reviews_count, 100),
    stars: toNumber(apiAccommodation.stars, hotelRating),
    bookingUrl: String(
      apiAccommodation.booking_link || "https://www.booking.com",
    ),
    type: normalizeAccommodationType(
      apiAccommodation.type ?? apiAccommodation.type_ar,
    ),
    exceptional,
    mapsUrl,
  };
};

export function accommodationMapsHref(a: Accommodation): string {
  const raw = a.mapsUrl?.trim();
  if (raw && isHttpUrl(raw)) return raw;
  const q = `${a.name} ${a.city} ${a.location}`.trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/**
 * Splits filtered hotels into carousel vs grid using CMS `featured` only.
 * Non-featured hotels stay in the grid; an empty featured list hides the strip.
 */
export function splitAccommodationLists(
  filtered: Accommodation[],
  onlyExceptional: boolean,
): { carousel: Accommodation[]; grid: Accommodation[] } {
  const carousel = filtered.filter((a) => a.exceptional);
  const grid = onlyExceptional
    ? []
    : filtered.filter((a) => !a.exceptional);
  return { carousel, grid };
}

export const fetchAccommodations = async (
  locale: LocaleCode = "ar",
): Promise<Accommodation[]> => {
  const directusUrl = (
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "") ||
    "https://tool-portal.discoveraseer.com"
  );

  try {
    const response = await fetch(
      directusItemsUrl(directusUrl, "accomodation", {
        fields: ACCOMMODATION_FIELDS,
        limit: DIRECTUS_COLLECTION_LIMIT,
        published: true,
      }),
      directusCollectionFetch,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch accommodations: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();
    const rows = Array.isArray(apiData.data) ? apiData.data : [];

    return rows
      .filter(
        (accommodation) =>
          !accommodation.status || accommodation.status === "published",
      )
      .map((accommodation) =>
        transformAccommodation(accommodation, directusUrl, locale),
      );
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    return [];
  }
};
