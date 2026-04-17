export interface Landmark {
  id: string;
  title: string;
  location: string;
  area: string;
  description: string;
  guideName: string;
  image: string;
  /**
   * Backend-ready optional metadata used by `/attractions` main-page filters.
   * These are optional so existing UI consumers continue to work safely.
   */
  cityId?: string;
  travelerTypes?: string[];
  priceFrom?: number | null;
  priceTo?: number | null;
  interestTags?: string[];
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
  /**
   * Optional backend field for interests/categories.
   * If not present, frontend uses keyword-based fallback tags.
   */
  interest_tags?: string[] | null;
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

  const cityMap: Record<string, string> = {
    abha: "abha",
    "أبها": "abha",
    "خميس مشيط": "khamis",
    khamis: "khamis",
    tanomah: "tanomah",
    "تنومة": "tanomah",
    bisha: "bisha",
    "بيشة": "bisha",
    mahayil: "mahayil",
    "محايل عسير": "mahayil",
    najran: "najran",
    "نجران": "najran",
  };
  const cityId = cityMap[(apiLandmark.city || "").trim()] || undefined;

  // Fallback interests from title/description when backend tags are not provided.
  const sourceText = `${apiLandmark.title ?? ""} ${apiLandmark.description ?? ""}`;
  const fallbackInterests: string[] = [];
  if (/تاريخ|تراث|قصر|سوق/i.test(sourceText)) fallbackInterests.push("historical", "culture");
  if (/جبل|حديقة|طبيعة|منتزه|وادي|قمم|السودة/i.test(sourceText))
    fallbackInterests.push("nature", "adventure");
  if (/تسوق|سوق/i.test(sourceText)) fallbackInterests.push("shopping");
  const interestTags = (apiLandmark.interest_tags ?? fallbackInterests).filter(Boolean);

  return {
    id: apiLandmark.id,
    title: apiLandmark.title?.trim() || "",
    location: apiLandmark.location?.trim() || "",
    area: area,
    description: apiLandmark.description?.trim() || "",
    guideName: guideName,
    image: imageUrl,
    cityId,
    travelerTypes: apiLandmark.traveller_types ?? [],
    priceFrom: apiLandmark.price_range_from,
    priceTo: apiLandmark.price_range_to,
    interestTags,
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


