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

export interface ApiRestaurant {
  id: string;
  status: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  name: string;
  price_range_start: string;
  price_range_end: string;
  average_rating: number;
  cover_image: string;
  city: string | null;
  price_range_from: number | null;
  price_range_to: number | null;
}

export interface ApiResponse {
  data: ApiRestaurant[];
}

export const transformRestaurant = (
  apiRestaurant: ApiRestaurant,
  directusUrl: string
): Restaurant => {
  const imageUrl = apiRestaurant.cover_image
    ? `${directusUrl}/assets/${apiRestaurant.cover_image}`
    : "/assets/experiences/experiences.png";

  // Construct price range from start and end
  const priceRange =
    apiRestaurant.price_range_start && apiRestaurant.price_range_end
      ? `${apiRestaurant.price_range_start}-${apiRestaurant.price_range_end}`
      : apiRestaurant.price_range_start
        ? `${apiRestaurant.price_range_start}+`
        : "غير محدد";

  // Use city for location, or provide default
  const location = apiRestaurant.city
    ? `${apiRestaurant.city}، عسير`
    : "عسير";

  // Generate maps URL from restaurant name
  const encodedName = encodeURIComponent(apiRestaurant.name.trim());
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedName}`;

  return {
    id: apiRestaurant.id,
    name: apiRestaurant.name?.trim() || "",
    location: location,
    distanceKm: 0, // Not available in API, default to 0
    rating: apiRestaurant.average_rating || 0,
    reviewsCount: 0, // Not available in API, default to 0
    priceRange: priceRange,
    nationality: "سعودي", // Default value, not in API
    category: "مطعم", // Default value, not in API
    image: imageUrl,
    mapsUrl: mapsUrl,
  };
};

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  try {
    const response = await fetch(`${directusUrl}/items/restaurants`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();
    return apiData.data
      .filter((restaurant) => restaurant.status === "published")
      .map((restaurant) => transformRestaurant(restaurant, directusUrl));
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};


