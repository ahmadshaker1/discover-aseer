export interface PointOfInterest {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
}

export interface ApiPointOfInterest {
  id: string | number;
  status?: string | null;
  city?: string | null;
  city_ar?: string | null;
  city_en?: string | null;
  description?: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  name?: string | null;
  name_ar?: string | null;
  name_en?: string | null;
  category_ar?: string | null;
  category_en?: string | null;
  type_ar?: string | null;
  type_en?: string | null;
  cover_image?: string | null;
  picture_url_new?: string | null;
  picture_url?: string | null;
}

export interface ApiResponse {
  data: ApiPointOfInterest[];
}

export const transformPointOfInterest = (
  apiPoint: ApiPointOfInterest,
  directusUrl: string
): PointOfInterest => {
  const directImage = apiPoint.cover_image
    ? `${directusUrl}/assets/${apiPoint.cover_image}`
    : apiPoint.picture_url_new?.trim() || "";
  const fallbackImage = "/assets/points-of-interest/Rectangle 2154.jpg";

  const extractDriveFileId = (url: string): string | null => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]{20,})/) || url.match(/[?&]id=([a-zA-Z0-9_-]{20,})/);
    return match?.[1] ?? null;
  };

  const driveId = apiPoint.picture_url ? extractDriveFileId(apiPoint.picture_url) : null;
  const imageUrl =
    directImage ||
    (driveId ? `/api/image-proxy?id=${driveId}` : "") ||
    (apiPoint.picture_url?.startsWith("http") ? apiPoint.picture_url : "") ||
    fallbackImage;

  // Use name as title, city as location
  // For subtitle, we'll use a default since it's not in the API
  // You might want to add this field to the API later
  const subtitle =
    apiPoint.category_ar?.trim() ||
    apiPoint.type_ar?.trim() ||
    apiPoint.category_en?.trim() ||
    apiPoint.type_en?.trim() ||
    "الشواطئ الساحلية";

  return {
    id: String(apiPoint.id),
    image: imageUrl,
    title: apiPoint.name_ar?.trim() || apiPoint.name?.trim() || apiPoint.name_en?.trim() || "",
    subtitle: subtitle,
    location: apiPoint.city_ar?.trim() || apiPoint.city?.trim() || apiPoint.city_en?.trim() || "",
    description:
      apiPoint.description_ar?.trim() ||
      apiPoint.description?.trim() ||
      apiPoint.description_en?.trim() ||
      "",
  };
};

export const fetchPointsOfInterest = async (): Promise<PointOfInterest[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  try {
    const response = await fetch(`${directusUrl}/items/locations`, {
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
