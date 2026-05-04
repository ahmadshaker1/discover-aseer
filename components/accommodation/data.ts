export interface Accommodation {
  id: string;
  name: string;
  city: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  stars: number;
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
  area?: string | null;
  location?: string | null;
  content?: string | null;
  description?: string | null;
  short_description?: string | null;
  cover_image?: string | null;
  image?: string | null;
  hotel_rating?: number | string | null;
  average_rating?: number | string | null;
  reviews_count?: number | string | null;
  stars?: number | string | null;
  booking_link?: string | null;
  maps_url?: string | null;
  google_maps_url?: string | null;
  exceptional?: boolean | null;
  is_exceptional?: boolean | null;
  [key: string]: unknown;
}

export interface ApiResponse {
  data: ApiAccommodation[];
}

const FALLBACK_IMAGE = "/assets/experiences/experiences.png";
const DEFAULT_LOCATION = "منطقة عسير";
const ACCOMMODATION_ITEMS_PATH = "/items/accomodation" as const;

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&h=600&q=80`;

/**
 * Temporary fallback list for `/accommodation`.
 *
 * Required data points for each card/filter item:
 * - id: unique stable value for React key and tracking
 * - name: accommodation title
 * - city: city badge + city filter matching key
 * - location: short location line under title
 * - description: short body copy on card
 * - image: main card image URL
 * - rating: numeric rating (shown as 4.8/5)
 * - reviewsCount: numeric reviews count (shown in rating pill)
 * - stars: hotel class (3/4/5) used by right filter
 * - bookingUrl: legacy / external booking reference if needed
 * - exceptional: featured strip + badge
 * - mapsUrl: explicit maps link, else derived in UI
 */
const maps = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const DUMMY_ACCOMMODATIONS: Accommodation[] = [
  {
    id: "a1",
    name: "قصر أبها",
    city: "أبها",
    location: "طريق الملك فهد، أبها",
    description:
      "من أرقى أماكن الإقامة الفاخرة في أبها مع خدمات فندقية وسياحية مميزة.",
    image: u("1590490360182-c33d57733427"),
    rating: 4.8,
    reviewsCount: 233,
    stars: 5,
    bookingUrl: "https://www.booking.com",
    exceptional: true,
    mapsUrl: maps("قصر أبها أبها طريق الملك فهد"),
  },
  {
    id: "a2",
    name: "بيات",
    city: "أبها",
    location: "حي السد، أبها",
    description:
      "إقامة عصرية بإطلالة رائعة وغرف مريحة وخيارات مناسبة للعائلات والأفراد.",
    image: u("1566665797739-1674de7a421a"),
    rating: 4.8,
    reviewsCount: 233,
    stars: 4,
    bookingUrl: "https://www.booking.com",
    exceptional: false,
    mapsUrl: maps("بيات أبها حي السد"),
  },
  {
    id: "a3",
    name: "قصر أبها سكاي",
    city: "أبها",
    location: "طريق الأمير سلطان، أبها",
    description:
      "تجربة إقامة فاخرة في قلب المدينة مع سهولة الوصول لأبرز الوجهات السياحية.",
    image: u("1590490359689-bf3f6f7ea1f5"),
    rating: 4.7,
    reviewsCount: 188,
    stars: 5,
    bookingUrl: "https://www.booking.com",
    exceptional: true,
    mapsUrl: maps("قصر أبها سكاي أبها"),
  },
  {
    id: "a4",
    name: "منتجع السودة",
    city: "السودة",
    location: "مرتفعات السودة",
    description:
      "إقامة جبلية هادئة وسط الطبيعة والضباب مع أجواء استثنائية لمحبي الهدوء.",
    image: u("1505693416388-ac5ce068fe85"),
    rating: 4.6,
    reviewsCount: 120,
    stars: 4,
    bookingUrl: "https://www.booking.com",
    exceptional: false,
    mapsUrl: maps("منتجع السودة"),
  },
  {
    id: "a5",
    name: "فندق خميس بارك",
    city: "خميس مشيط",
    location: "مركز خميس مشيط",
    description:
      "فندق مريح بخدمات متكاملة وموقع قريب من الأسواق والمطاعم في المدينة.",
    image: u("1631049307264-da0ec9d70304"),
    rating: 4.5,
    reviewsCount: 97,
    stars: 3,
    bookingUrl: "https://www.booking.com",
    exceptional: false,
    mapsUrl: maps("فندق خميس بارك خميس مشيط"),
  },
  {
    id: "a6",
    name: "أجنحة عسير",
    city: "أبها",
    location: "حي المنسك، أبها",
    description:
      "أجنحة فندقية حديثة مناسبة للإقامات القصيرة والطويلة مع خدمات يومية.",
    image: u("1522708323590-d24dbb6b0267"),
    rating: 4.4,
    reviewsCount: 76,
    stars: 3,
    bookingUrl: "https://www.booking.com",
    exceptional: false,
    mapsUrl: maps("أجنحة عسير أبها"),
  },
  {
    id: "a7",
    name: "فندق لولوة أبها",
    city: "أبها",
    location: "حي الموظفين، أبها",
    description: "فندق بخدمات راقية وموقع مميز قرب المطار وطريق الملك فهد.",
    image: u("1618773928121-ec2e2058ed99"),
    rating: 4.9,
    reviewsCount: 312,
    stars: 5,
    bookingUrl: "https://www.booking.com",
    exceptional: true,
    mapsUrl: maps("فندق لولوة أبها"),
  },
  {
    id: "a8",
    name: "نُزل الضباب",
    city: "السودة",
    location: "قرية رجال ألمع",
    description: "إقامة تراثية فاخرة مع إطلالة جبلية وضباب الصباح.",
    image: u("1582719478250-c89cae4dc85b"),
    rating: 4.85,
    reviewsCount: 156,
    stars: 4,
    bookingUrl: "https://www.booking.com",
    exceptional: true,
    mapsUrl: maps("نزل الضباب السودة"),
  },
  {
    id: "a9",
    name: "فيلا الجبل الذهبي",
    city: "خميس مشيط",
    location: "طريق الملك عبدالله",
    description: "فيلا فندقية بمسبح داخلي وخدمة خاصة للعائلات الكبيرة.",
    image: u("1571896349842-33c89424de2d"),
    rating: 4.75,
    reviewsCount: 201,
    stars: 5,
    bookingUrl: "https://www.booking.com",
    exceptional: true,
    mapsUrl: maps("فيلا الجبل الذهبي خميس مشيط"),
  },
];

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

function shouldUseAccommodationDummy(): boolean {
  const flag = process.env.NEXT_PUBLIC_ACCOMMODATION_USE_DUMMY;
  if (flag === "true") return true;
  if (flag === "false") return false;
  return process.env.NODE_ENV === "development";
}

const buildAssetUrl = (directusUrl: string, assetId?: string | null) => {
  if (!assetId) return FALLBACK_IMAGE;
  if (assetId.startsWith("http://") || assetId.startsWith("https://"))
    return assetId;
  return `${directusUrl}/assets/${assetId}`;
};

export const transformAccommodation = (
  apiAccommodation: ApiAccommodation,
  directusUrl: string,
): Accommodation => {
  const imageUrl = buildAssetUrl(
    directusUrl,
    String(apiAccommodation.cover_image || apiAccommodation.image || ""),
  );

  const name = String(
    apiAccommodation.name_ar ||
      apiAccommodation.name ||
      apiAccommodation.name_en ||
      "مكان إقامة",
  );

  const city = String(apiAccommodation.city || "أبها");

  const locationValue = String(apiAccommodation.location || "").trim();
  const location =
    (locationValue && !isHttpUrl(locationValue) ? locationValue : "") ||
    String(apiAccommodation.area || city || DEFAULT_LOCATION);

  const hotelRating = toNumber(apiAccommodation.hotel_rating, 4);

  const mapsUrlRaw = String(
    apiAccommodation.maps_url ||
      apiAccommodation.google_maps_url ||
      "",
  ).trim();
  const mapsUrl =
    mapsUrlRaw && isHttpUrl(mapsUrlRaw) ? mapsUrlRaw : undefined;

  const exceptional = Boolean(
    apiAccommodation.exceptional ?? apiAccommodation.is_exceptional,
  );

  return {
    id: String(apiAccommodation.id),
    name,
    city,
    location,
    description: String(
      apiAccommodation.content ||
        apiAccommodation.short_description ||
        apiAccommodation.description ||
        "إقامة مميزة بخدمات فندقية وتجربة مريحة.",
    ),
    image: imageUrl,
    rating: toNumber(apiAccommodation.average_rating, 4.5),
    reviewsCount: toNumber(apiAccommodation.reviews_count, 100),
    stars: toNumber(apiAccommodation.stars, hotelRating),
    bookingUrl: String(
      apiAccommodation.booking_link || "https://www.booking.com",
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
 * Splits filtered hotels into carousel vs grid.
 * When CMS never sets `exceptional`, the first five matches populate the carousel
 * so the strip is still visible; those same items are omitted from the grid to avoid duplicates.
 */
export function splitAccommodationLists(
  filtered: Accommodation[],
  onlyExceptional: boolean,
): { carousel: Accommodation[]; grid: Accommodation[] } {
  const flagged = filtered.filter((a) => a.exceptional);
  if (flagged.length > 0) {
    const carousel = flagged;
    const grid = onlyExceptional ? [] : filtered.filter((a) => !a.exceptional);
    return { carousel, grid };
  }

  if (onlyExceptional) {
    return {
      carousel: filtered.slice(0, Math.min(5, filtered.length)),
      grid: [],
    };
  }

  const carousel = filtered.slice(0, Math.min(5, filtered.length));
  const carouselIds = new Set(carousel.map((a) => a.id));
  const grid = filtered.filter((a) => !carouselIds.has(a.id));
  return { carousel, grid };
}

export const fetchAccommodations = async (): Promise<Accommodation[]> => {
  if (shouldUseAccommodationDummy()) {
    return DUMMY_ACCOMMODATIONS;
  }

  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(
    /\/$/,
    "",
  );

  if (!directusUrl) {
    console.warn(
      "[accommodation] NEXT_PUBLIC_DIRECTUS_APP_URL is not set — using dummy data.",
    );
    // Fallback keeps page usable before backend/env wiring is complete.
    return DUMMY_ACCOMMODATIONS;
  }

  try {
    const response = await fetch(`${directusUrl}${ACCOMMODATION_ITEMS_PATH}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch accommodations: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();
    const rows = Array.isArray(apiData.data) ? apiData.data : [];

    // Fallback when collection is empty.
    if (rows.length === 0) {
      return DUMMY_ACCOMMODATIONS;
    }

    const transformed = rows
      .filter(
        (accommodation) =>
          !accommodation.status || accommodation.status === "published",
      )
      .map((accommodation) =>
        transformAccommodation(accommodation, directusUrl),
      );
    return transformed.length > 0 ? transformed : DUMMY_ACCOMMODATIONS;
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    // Network/API fallback.
    return DUMMY_ACCOMMODATIONS;
  }
};
