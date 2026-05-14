import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

export interface Landmark {
  id: string;
  title: string;
  location: string;
  area: string;
  description: string;
  guideName: string;
  image: string;
  /**
   * URL segment for `/attractions/[slug]` when using Directus/API-backed rows.
   * Uses `slug` when present, otherwise numeric `id`.
   */
  hrefSegment?: string;
  /** Short tagline (plain text) for hero subtitle and metadata. */
  subtitle?: string | null;
  /** Full article HTML for detail pages. */
  contentHtml?: string | null;
  /** Parsed gallery image URLs from `attraction_gallery` JSON. */
  galleryImageUrls?: string[];
  mapLink?: string | null;
  latitude?: number | null;
  longitude?: number | null;
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
  /** Directus system field — used to surface newest items first when present. */
  date_created?: string | null;
  status?: string | null;
  title?: string | null;
  title_ar?: string | null;
  name?: string | null;
  name_ar?: string | null;
  name_en?: string | null;
  location?: string | null;
  address?: string | null;
  description?: string | null;
  content?: string | null;
  sub_title?: string | null;
  content_home_page_card_content?: string | null;
  slug?: string | null;
  attraction_gallery?: string | null;
  map_link?: string | null;
  latitude?: number | null;
  longitude?: number | null;
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

function containsArabicScript(value: string): boolean {
  return /[\u0600-\u06FF]/.test(value);
}

/**
 * CMS rows sometimes label `name_en` / `name_ar` inconsistently; pick by script + locale.
 */
function pickAttractionTitle(api: ApiLandmark, locale: LocaleCode): string {
  const ne = api.name_en?.trim() || "";
  const na = api.name_ar?.trim() || "";
  if (ne || na) {
    if (locale === "ar") {
      if (containsArabicScript(ne)) return ne || na;
      if (containsArabicScript(na)) return na || ne;
      return ne || na;
    }
    if (na && !containsArabicScript(na)) return na;
    if (ne && !containsArabicScript(ne)) return ne;
    return na || ne;
  }
  const row = api as unknown as Record<string, unknown>;
  return pickLocalizedField(row, "title", locale) || pickLocalizedField(row, "name", locale) || "";
}

export function parseAttractionGalleryJson(raw: string | null | undefined): string[] {
  if (!raw || typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => {
        const row = entry as { image?: { url?: string | null } | null } | null;
        const url = row?.image?.url?.trim();
        return url || "";
      })
      .filter(Boolean);
  } catch {
    return [];
  }
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
  directusUrl: string,
  locale: LocaleCode = "ar",
): Landmark => {
  const imageAsset =
    apiLandmark.cover_image || apiLandmark.hero_image || apiLandmark.destination_image;
  const imageUrl = imageAsset
    ? imageAsset.startsWith("http://") || imageAsset.startsWith("https://")
      ? imageAsset
      : `${directusUrl}/assets/${imageAsset}`
    : "/assets/experiences/experiences.png";

  const title = pickAttractionTitle(apiLandmark, locale);
  const location =
    apiLandmark.location?.trim() || apiLandmark.address?.trim() || apiLandmark.city?.trim() || "";

  const rowRecord = apiLandmark as unknown as Record<string, unknown>;
  const longDescription =
    pickLocalizedField(rowRecord, "description", locale) ||
    pickLocalizedField(rowRecord, "content", locale) ||
    "";

  const sub = apiLandmark.sub_title?.trim() || "";
  const escapedSub = sub
    ? `<p>${sub.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`
    : "";
  const description =
    apiLandmark.content_home_page_card_content?.trim() || escapedSub || longDescription || "";

  // Extract guide name from long description if it contains one
  let guideName = "";
  if (longDescription) {
    const descriptionParts = longDescription.split(/\s+/);
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
    "رجال ألمع": "mahayil",
    "المجاردة": "bisha",
    "سراة عبيدة": "bisha",
    "النماص": "tanomah",
    "قحم": "abha",
    "الحريضة": "abha",
    "البرك": "abha",
  };
  const citySource = `${apiLandmark.city || ""} ${location} ${area}`;
  const cityId =
    Object.entries(cityMap).find(([name]) =>
      normalizeText(citySource).includes(normalizeText(name))
    )?.[1] || undefined;

  // Fallback interests from title/description when backend tags are not provided.
  const sourceText = `${title} ${longDescription || description}`;
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

  const slugTrimmed = apiLandmark.slug?.trim();
  const hrefSegment =
    slugTrimmed && slugTrimmed.length > 0 ? slugTrimmed : String(apiLandmark.id);
  const contentHtml = apiLandmark.content?.trim() || null;

  return {
    id: String(apiLandmark.id),
    title,
    location,
    area: area,
    description,
    guideName: guideName,
    image: imageUrl,
    hrefSegment,
    subtitle: sub || null,
    contentHtml,
    galleryImageUrls: parseAttractionGalleryJson(apiLandmark.attraction_gallery),
    mapLink: apiLandmark.map_link?.trim() || null,
    latitude: apiLandmark.latitude ?? null,
    longitude: apiLandmark.longitude ?? null,
    cityId,
    travelerTypes: apiLandmark.traveller_types ?? [],
    priceFrom: apiLandmark.price_range_from,
    priceTo: apiLandmark.price_range_to,
    interestTags,
  };
};

export const fetchLandmarks = async (locale: LocaleCode = "ar"): Promise<Landmark[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  try {
    const listUrl = new URL(`${directusUrl}/items/attractions`);
    listUrl.searchParams.set("sort", "-date_created,-id");

    let response = await fetch(listUrl.toString(), {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      const fallback = await fetch(`${directusUrl}/items/attractions`, {
        next: { revalidate: 3600 },
      });
      if (!fallback.ok) {
        throw new Error(
          `Failed to fetch landmarks: ${fallback.statusText || response.statusText}`,
        );
      }
      response = fallback;
    }

    const apiData: ApiResponse = await response.json();
    return apiData.data
      .filter((landmark) => !landmark.status || landmark.status === "published")
      .map((landmark) => transformLandmark(landmark, directusUrl, locale));
  } catch (error) {
    console.error("Error fetching landmarks:", error);
    return [];
  }
};

/**
 * Loads one attraction by public URL segment (`slug` from CMS, or numeric `id`).
 */
export const fetchAttractionByHrefSegment = async (
  segment: string,
  locale: LocaleCode = "ar",
): Promise<Landmark | null> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");
  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return null;
  }

  const decoded = decodeURIComponent(segment).trim();
  if (!decoded) return null;

  try {
    let item: ApiLandmark | undefined;

    if (/^\d+$/.test(decoded)) {
      const res = await fetch(`${directusUrl}/items/attractions/${decoded}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) return null;
      const json: { data?: ApiLandmark } = await res.json();
      item = json.data;
    } else {
      const u = new URL(`${directusUrl}/items/attractions`);
      u.searchParams.set("filter[slug][_eq]", decoded);
      u.searchParams.set("limit", "1");
      const res = await fetch(u.toString(), { next: { revalidate: 3600 } });
      if (!res.ok) return null;
      const json: ApiResponse = await res.json();
      item = json.data?.[0];
    }

    if (!item) return null;
    if (item.status && item.status !== "published") return null;

    return transformLandmark(item, directusUrl, locale);
  } catch (error) {
    console.error("Error fetching attraction by segment:", error);
    return null;
  }
};

export const getAttractionHrefSegments = async (locale: LocaleCode = "ar"): Promise<string[]> => {
  const landmarks = await fetchLandmarks(locale);
  return landmarks.map((l) => l.hrefSegment).filter((s): s is string => Boolean(s));
};


