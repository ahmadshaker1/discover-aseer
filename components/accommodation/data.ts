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
}

export interface ApiAccommodation {
  id: string | number;
  status?: string | null;
  name?: string | null;
  city?: string | null;
  area?: string | null;
  description?: string | null;
  short_description?: string | null;
  cover_image?: string | null;
  image?: string | null;
  average_rating?: number | string | null;
  reviews_count?: number | string | null;
  stars?: number | string | null;
  booking_link?: string | null;
  [key: string]: unknown;
}

export interface ApiResponse {
  data: ApiAccommodation[];
}

const FALLBACK_IMAGE = "/assets/experiences/experiences.png";

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
 * - bookingUrl: destination URL for "احجز الآن" button
 */
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
  },
];

const toNumber = (value: number | string | null | undefined, fallback: number) => {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (!Number.isNaN(n)) return n;
  }
  return fallback;
};

const buildAssetUrl = (directusUrl: string, assetId?: string | null) => {
  if (!assetId) return FALLBACK_IMAGE;
  if (assetId.startsWith("http://") || assetId.startsWith("https://")) return assetId;
  return `${directusUrl}/assets/${assetId}`;
};

export const transformAccommodation = (
  apiAccommodation: ApiAccommodation,
  directusUrl: string
): Accommodation => {
  const imageUrl = buildAssetUrl(
    directusUrl,
    String(apiAccommodation.cover_image || apiAccommodation.image || "")
  );
  return {
    id: String(apiAccommodation.id),
    name: String(apiAccommodation.name || "مكان إقامة"),
    city: String(apiAccommodation.city || "أبها"),
    location: String(apiAccommodation.area || apiAccommodation.city || "عسير"),
    description: String(
      apiAccommodation.short_description ||
        apiAccommodation.description ||
        "إقامة مميزة بخدمات فندقية وتجربة مريحة."
    ),
    image: imageUrl,
    rating: toNumber(apiAccommodation.average_rating, 4.5),
    reviewsCount: toNumber(apiAccommodation.reviews_count, 100),
    stars: toNumber(apiAccommodation.stars, 4),
    bookingUrl: String(apiAccommodation.booking_link || "https://www.booking.com"),
  };
};

export const fetchAccommodations = async (): Promise<Accommodation[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    // Fallback keeps page usable before backend/env wiring is complete.
    return DUMMY_ACCOMMODATIONS;
  }

  try {
    const response = await fetch(`${directusUrl}/items/accommodation`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch accommodations: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();

    // Fallback when collection is empty.
    if (!apiData.data || apiData.data.length === 0) {
      return DUMMY_ACCOMMODATIONS;
    }

    const transformed = apiData.data
      .filter((accommodation) => accommodation.status === "published")
      .map((accommodation) =>
        transformAccommodation(accommodation, directusUrl)
      );
    return transformed.length > 0 ? transformed : DUMMY_ACCOMMODATIONS;
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    // Network/API fallback.
    return DUMMY_ACCOMMODATIONS;
  }
};
