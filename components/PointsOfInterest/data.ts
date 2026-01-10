export interface PointOfInterest {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
}

export interface ApiPointOfInterest {
  id: string;
  status: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  city: string;
  description: string;
  name: string;
  cover_image?: string;
}

export interface ApiResponse {
  data: ApiPointOfInterest[];
}

export const transformPointOfInterest = (
  apiPoint: ApiPointOfInterest,
  directusUrl: string
): PointOfInterest => {
  const imageUrl = apiPoint.cover_image
    ? `${directusUrl}/assets/${apiPoint.cover_image}`
    : "/assets/points-of-interest/Rectangle 2154.jpg"; // Default fallback image

  // Use name as title, city as location
  // For subtitle, we'll use a default since it's not in the API
  // You might want to add this field to the API later
  const subtitle = "الشواطئ الساحلية"; // Default value, not in API

  return {
    id: apiPoint.id,
    image: imageUrl,
    title: apiPoint.name?.trim() || "",
    subtitle: subtitle,
    location: apiPoint.city?.trim() || "",
    description: apiPoint.description?.trim() || "",
  };
};

export const fetchPointsOfInterest = async (): Promise<PointOfInterest[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  try {
    const response = await fetch(`${directusUrl}/items/points_of_interest`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch points of interest: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();
    return apiData.data
      .filter((point) => point.status === "published")
      .map((point) => transformPointOfInterest(point, directusUrl));
  } catch (error) {
    console.error("Error fetching points of interest:", error);
    return [];
  }
};
