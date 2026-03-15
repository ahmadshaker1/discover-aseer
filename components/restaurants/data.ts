export interface Restaurant {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  nationality: string;
  category: string;
  image: string;
  mapsUrl: string;
}

/** API shape from https://tool-portal.discoveraseer.com/items/locations */
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
}

export interface LocationsApiResponse {
  data: ApiLocation[];
}

const FOOD_BEVERAGE_CATEGORY = "Food & Beverage";
const PLACEHOLDER_IMAGE = "/assets/experiences/experiences.png";

/** Extract Google Drive file ID from sharing URL; return null if not a valid Drive link. */
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

/** Return our image-proxy URL for a Google Drive file ID so images load (Drive blocks direct hotlinking). */
function getProxiedImageUrl(pictureUrl: string | null): string {
  const fileId = getGoogleDriveFileId(pictureUrl);
  if (fileId) return `/api/image-proxy?id=${encodeURIComponent(fileId)}`;
  return PLACEHOLDER_IMAGE;
}

export const transformLocationToRestaurant = (
  loc: ApiLocation
): Restaurant => {
  const name = (loc.name_ar || loc.name_en || "").trim();
  const location = loc.city_ar
    ? `${loc.city_ar}، عسير`
    : loc.city_en
      ? `${loc.city_en}، عسير`
      : "عسير";
  const image = getProxiedImageUrl(loc.picture_url);
  const mapsUrl =
    loc.google_maps_url?.trim() ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;

  return {
    id: loc.id,
    name: name || "بدون اسم",
    location,
    distanceKm: 0,
    rating: 0,
    reviewsCount: 0,
    priceRange: "غير محدد",
    nationality: "سعودي",
    category: loc.category_ar || loc.category_en || "مطعم",
    image,
    mapsUrl,
  };
};

const LOCATIONS_API_BASE = "https://tool-portal.discoveraseer.com";

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await fetch(`${LOCATIONS_API_BASE}/items/locations`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
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
    return [];
  }
};
