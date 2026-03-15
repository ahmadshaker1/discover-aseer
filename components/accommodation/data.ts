export interface Accommodation {
  id: string;
  name: string;
  location: string;
  image: string;
  rating?: number;
  priceRange?: string;
}

export interface ApiAccommodation {
  id: string;
  status: string;
  [key: string]: any; // For now, we'll handle empty data
}

export interface ApiResponse {
  data: ApiAccommodation[];
}

export const transformAccommodation = (
  apiAccommodation: ApiAccommodation,
  directusUrl: string
): Accommodation => {
  // For now, return a basic structure since we expect empty data
  // This will be updated when we know the actual API structure
  const imageUrl = apiAccommodation.cover_image
    ? `${directusUrl}/assets/${apiAccommodation.cover_image}`
    : "/assets/experiences/experiences.png";

  return {
    id: apiAccommodation.id,
    name: apiAccommodation.name || "",
    location: apiAccommodation.city || "عسير",
    image: imageUrl,
    rating: apiAccommodation.average_rating || 0,
    priceRange: apiAccommodation.price_range || "غير محدد",
  };
};

export const fetchAccommodations = async (): Promise<Accommodation[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  try {
    const response = await fetch(`${directusUrl}/items/accommodation`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch accommodations: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();

    // Handle empty data - return empty array
    if (!apiData.data || apiData.data.length === 0) {
      return [];
    }

    return apiData.data
      .filter((accommodation) => accommodation.status === "published")
      .map((accommodation) =>
        transformAccommodation(accommodation, directusUrl)
      );
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    return [];
  }
};
