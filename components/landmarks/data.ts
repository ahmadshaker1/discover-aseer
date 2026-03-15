export interface Landmark {
  id: string;
  title: string;
  location: string;
  area: string;
  description: string;
  guideName: string;
  image: string;
}

export interface ApiLandmark {
  id: string;
  status: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  title: string;
  location: string;
  description: string;
  cover_image: string;
  city: string | null;
  traveller_types: string[] | null;
  price_range_from: number | null;
  price_range_to: number | null;
}

export interface ApiResponse {
  data: ApiLandmark[];
}

export const transformLandmark = (
  apiLandmark: ApiLandmark,
  directusUrl: string
): Landmark => {
  const imageUrl = apiLandmark.cover_image
    ? `${directusUrl}/assets/${apiLandmark.cover_image}`
    : "/assets/experiences/experiences.png";

  // Extract guide name from description if it contains one
  // The description format seems to be: "تسلق جبل سودا مع متسلق الجبال المحلي فيصل"
  // We'll try to extract the last word as guide name
  let guideName = "";
  if (apiLandmark.description) {
    const descriptionParts = apiLandmark.description.trim().split(/\s+/);
    // If description has multiple words, take the last one as guide name
    if (descriptionParts.length > 1) {
      guideName = descriptionParts[descriptionParts.length - 1];
    }
  }

  // Use city if available, otherwise extract from location
  const area = apiLandmark.city || apiLandmark.location?.split(",")[0]?.trim() || "";

  return {
    id: apiLandmark.id,
    title: apiLandmark.title?.trim() || "",
    location: apiLandmark.location?.trim() || "",
    area: area,
    description: apiLandmark.description?.trim() || "",
    guideName: guideName,
    image: imageUrl,
  };
};

export const fetchLandmarks = async (): Promise<Landmark[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  try {
    const response = await fetch(`${directusUrl}/items/landmarks`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch landmarks: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();
    return apiData.data
      .filter((landmark) => landmark.status === "published")
      .map((landmark) => transformLandmark(landmark, directusUrl));
  } catch (error) {
    console.error("Error fetching landmarks:", error);
    return [];
  }
};


