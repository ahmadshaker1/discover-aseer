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
  id: string | number;
  status?: string | null;
  title?: string | null;
  title_ar?: string | null;
  name?: string | null;
  name_ar?: string | null;
  location?: string | null;
  address?: string | null;
  description?: string | null;
  content?: string | null;
  cover_image?: string | null;
  hero_image?: string | null;
  destination_image?: string | null;
  city?: string | null;
  traveller_types?: string[] | null;
  tags?: string | null;
  price_range_from?: number | null;
  price_range_to?: number | null;
  /**
   * Optional backend field for interests/categories.
   * If not present, frontend uses keyword-based fallback tags.
   */
  interest_tags?: string[] | null;
}

export interface ApiResponse {
  data: ApiLandmark[];
}

function normalizeText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/ـ/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function mapInterestTokenToId(token: string): string | null {
  const t = normalizeText(token);
  if (!t) return null;
  if (/مغام|هايكنج|تسلق|adventure/.test(t)) return "adventure";
  if (/ثقاف|تراث|قرية|متحف|culture|heritage/.test(t)) return "culture";
  if (/طبيع|منتزه|جبل|nature/.test(t)) return "nature";
  if (/طعام|مطعم|اكل|food/.test(t)) return "food";
  if (/استرخ|relax/.test(t)) return "relaxation";
  if (/تسوق|سوق|shopping/.test(t)) return "shopping";
  if (/تاريخ|اثري|معلم|histor/.test(t)) return "historical";
  return null;
}

export const transformLandmark = (
  apiLandmark: ApiLandmark,
  directusUrl: string
): Landmark => {
  const imageAsset =
    apiLandmark.cover_image || apiLandmark.hero_image || apiLandmark.destination_image;
  const imageUrl = imageAsset
    ? imageAsset.startsWith("http://") || imageAsset.startsWith("https://")
      ? imageAsset
      : `${directusUrl}/assets/${imageAsset}`
    : "/assets/experiences/experiences.png";

  const title =
    apiLandmark.title?.trim() ||
    apiLandmark.title_ar?.trim() ||
    apiLandmark.name?.trim() ||
    apiLandmark.name_ar?.trim() ||
    "";
  const location =
    apiLandmark.location?.trim() || apiLandmark.address?.trim() || apiLandmark.city?.trim() || "";
  const description = apiLandmark.description?.trim() || apiLandmark.content?.trim() || "";

  // Extract guide name from description if it contains one
  // The description format seems to be: "تسلق جبل سودا مع متسلق الجبال المحلي فيصل"
  // We'll try to extract the last word as guide name
  let guideName = "";
  if (description) {
    const descriptionParts = description.split(/\s+/);
    // If description has multiple words, take the last one as guide name
    if (descriptionParts.length > 1) {
      guideName = descriptionParts[descriptionParts.length - 1];
    }
  }

  // Use city if available, otherwise extract from location
  const area = apiLandmark.city || location?.split(",")[0]?.trim() || "";

  const cityMap: Record<string, string> = {
    abha: "abha",
    "أبها": "abha",
    السودة: "abha",
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
  const citySource = `${apiLandmark.city || ""} ${location} ${area}`;
  const cityId =
    Object.entries(cityMap).find(([name]) =>
      normalizeText(citySource).includes(normalizeText(name))
    )?.[1] || undefined;

  // Fallback interests from title/description when backend tags are not provided.
  const sourceText = `${title} ${description}`;
  const fallbackInterests: string[] = [];
  if (/تاريخ|تراث|قصر|سوق/i.test(sourceText)) fallbackInterests.push("historical", "culture");
  if (/جبل|حديقة|طبيعة|منتزه|وادي|قمم|السودة/i.test(sourceText))
    fallbackInterests.push("nature", "adventure");
  if (/تسوق|سوق/i.test(sourceText)) fallbackInterests.push("shopping");
  const rawInterestTags = Array.isArray(apiLandmark.interest_tags)
    ? apiLandmark.interest_tags.map((tag) => String(tag).trim()).filter(Boolean)
    : [];
  const rawTagsField =
    typeof apiLandmark.tags === "string"
      ? apiLandmark.tags
          .split(/[،,]/)
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];
  const rawTags = [...rawInterestTags, ...rawTagsField, ...fallbackInterests, sourceText];
  const interestTags = Array.from(
    new Set(
      rawTags
        .map((tag) => mapInterestTokenToId(tag) ?? tag)
        .map((tag) => normalizeText(tag))
        .filter((tag) =>
          [
            "adventure",
            "culture",
            "nature",
            "food",
            "relaxation",
            "shopping",
            "historical",
          ].includes(tag)
        )
    )
  );
  if (interestTags.length === 0) {
    interestTags.push("culture");
  }

  return {
    id: String(apiLandmark.id),
    title,
    location,
    area: area,
    description,
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
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  try {
    const response = await fetch(`${directusUrl}/items/attractions`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch landmarks: ${response.statusText}`);
    }

    const apiData: ApiResponse = await response.json();
    return apiData.data
      .filter((landmark) => !landmark.status || landmark.status === "published")
      .map((landmark) => transformLandmark(landmark, directusUrl));
  } catch (error) {
    console.error("Error fetching landmarks:", error);
    return [];
  }
};


