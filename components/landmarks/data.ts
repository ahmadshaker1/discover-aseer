import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import {
  CATALOG_PAGE_SIZE,
  DIRECTUS_COLLECTION_LIMIT,
  catalogTotalPages,
  directusCollectionFetch,
} from "@/lib/directus/collectionCache";

const ATTRACTION_FIELDS = [
  "id",
  "name_en",
  "name_ar",
  "address",
  "content",
  "content_ar",
  "content_home_page_card_content",
  "content_home_page_card_content_ar",
  "hero_image",
  "hero_image_new",
  "city",
  "city_ar",
  "type",
  "type_en",
  "sub_title",
  "sub_title_ar",
  "latitude",
  "longitude",
  "map_link",
  "attraction_gallery",
].join(",");

export const DEFAULT_ATTRACTION_MAP_CENTER = {
  lat: 18.087563,
  lon: 42.43704,
} as const;

export interface Landmark {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  area: string;
  city: string;
  description: string;
  contentHtml: string;
  guideName: string;
  image: string;
  galleryImages: string[];
  lat?: number;
  lon?: number;
  mapLink?: string;
  categoryLabel: string;
  cityId?: string;
  travelerTypes?: string[];
  priceFrom?: number | null;
  priceTo?: number | null;
  interestTags?: string[];
  /** Raw `type` from Directus `attractions` (معالم / طبيعة / …). */
  attractionType?: string;
}

export interface ApiLandmark {
  id: string | number;
  date_created?: string | null;
  status?: string | null;
  title?: string | null;
  title_ar?: string | null;
  name?: string | null;
  name_en?: string | null;
  name_ar?: string | null;
  location?: string | null;
  address?: string | null;
  description?: string | null;
  content?: string | null;
  content_ar?: string | null;
  content_home_page_card_content?: string | null;
  content_home_page_card_content_ar?: string | null;
  cover_image?: string | null;
  hero_image?: string | null;
  hero_image_new?: string | null;
  destination_image?: string | null;
  city?: string | null;
  city_ar?: string | null;
  traveller_types?: string[] | null;
  tags?: string | null;
  type?: string | null;
  type_en?: string | null;
  price_range_from?: number | null;
  price_range_to?: number | null;
  interest_tags?: string[] | null;
  slug?: string | null;
  sub_title?: string | null;
  sub_title_ar?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  map_link?: string | null;
  attraction_gallery?: string | null;
}

export interface ApiResponse {
  data: ApiLandmark[];
}

export interface LandmarkMapTarget {
  kind: "interactive";
  lat: number;
  lon: number;
  title: string;
}

export interface LandmarkMapExternalTarget {
  kind: "external";
  href: string;
}

export type ResolvedLandmarkMap =
  | LandmarkMapTarget
  | LandmarkMapExternalTarget
  | null;

function normalizeText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/ـ/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const toNumber = (
  value: number | string | null | undefined,
): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
};

export const slugifyLandmark = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const resolveLandmarkSlug = (row: ApiLandmark): string => {
  const fromCms = row.slug?.trim();
  if (fromCms) {
    const slug = slugifyLandmark(fromCms);
    if (slug) return slug;
  }

  const fromEnglish = row.name_en?.trim();
  if (fromEnglish) {
    const slug = slugifyLandmark(fromEnglish);
    if (slug) return slug;
  }

  return `attraction-${row.id}`;
};

export const normalizeLandmarkSlugParam = (slug: string): string => {
  try {
    return slugifyLandmark(decodeURIComponent(slug));
  } catch {
    return slugifyLandmark(slug);
  }
};

function resolveImageUrl(
  asset: string | null | undefined,
  directusUrl: string,
): string {
  const trimmed = (asset || "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("//")) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  return `${directusUrl.replace(/\/$/, "")}/assets/${trimmed}`;
}

function parseGallery(
  raw: string | null | undefined,
  directusUrl: string,
): string[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const urls: string[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const image = (item as { image?: { url?: string; permalink?: string } })
        .image;
      const url = image?.url?.trim() || image?.permalink?.trim() || "";
      if (url) urls.push(url);
    }
    return [...new Set(urls)];
  } catch {
    return [];
  }
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

const toLocalizedRecord = (row: ApiLandmark): Record<string, unknown> =>
  row as unknown as Record<string, unknown>;

function pickContentHtml(apiLandmark: ApiLandmark, locale: LocaleCode): string {
  const contentEn = (apiLandmark.content || "").trim();
  const contentAr = (apiLandmark.content_ar || "").trim();

  if (locale === "en") {
    return contentEn || contentAr;
  }

  return contentAr || contentEn;
}

function pickTitle(apiLandmark: ApiLandmark, locale: LocaleCode): string {
  const record = toLocalizedRecord(apiLandmark);
  if (locale === "en") {
    return (
      apiLandmark.name_en?.trim() ||
      apiLandmark.name_ar?.trim() ||
      pickLocalizedField(record, "title", locale) ||
      pickLocalizedField(record, "name", locale) ||
      ""
    );
  }
  return (
    apiLandmark.name_ar?.trim() ||
    apiLandmark.name_en?.trim() ||
    pickLocalizedField(record, "title", locale) ||
    pickLocalizedField(record, "name", locale) ||
    ""
  );
}

export const transformLandmark = (
  apiLandmark: ApiLandmark,
  directusUrl: string,
  locale: LocaleCode = "ar",
): Landmark => {
  const imageUrl =
    resolveImageUrl(apiLandmark.hero_image_new, directusUrl) ||
    resolveImageUrl(apiLandmark.hero_image, directusUrl) ||
    resolveImageUrl(apiLandmark.cover_image, directusUrl) ||
    resolveImageUrl(apiLandmark.destination_image, directusUrl) ||
    "/assets/experiences/experiences.png";

  const title = pickTitle(apiLandmark, locale);
  const record = toLocalizedRecord(apiLandmark);
  const city =
    pickLocalizedField(record, "city", locale) ||
    (apiLandmark.city || "").trim();
  const location =
    apiLandmark.location?.trim() || apiLandmark.address?.trim() || city;
  const contentHtml = pickContentHtml(apiLandmark, locale);
  const cardHtml =
    pickLocalizedField(record, "content_home_page_card_content", locale) ||
    (apiLandmark.content_home_page_card_content || "").trim();
  const description = cardHtml || contentHtml;
  const subtitle =
    pickLocalizedField(record, "sub_title", locale) ||
    (apiLandmark.sub_title || "").trim();

  let guideName = "";
  if (description) {
    const descriptionParts = description.replace(/<[^>]+>/g, " ").split(/\s+/);
    if (descriptionParts.length > 1) {
      guideName = descriptionParts[descriptionParts.length - 1] || "";
    }
  }

  const area = city || location.split(",")[0]?.trim() || "";

  const cityMap: Record<string, string> = {
    abha: "abha",
    أبها: "abha",
    السودة: "abha",
    "خميس مشيط": "khamis",
    khamis: "khamis",
    tanomah: "tanomah",
    تنومة: "tanomah",
    bisha: "bisha",
    بيشة: "bisha",
    mahayil: "mahayil",
    "محايل عسير": "mahayil",
    "رجال ألمع": "mahayil",
    najran: "najran",
    نجران: "najran",
    البرك: "abha",
  };
  const citySource = `${city} ${location} ${area}`;
  const cityId =
    Object.entries(cityMap).find(([name]) =>
      normalizeText(citySource).includes(normalizeText(name)),
    )?.[1] || undefined;

  const sourceText = `${title} ${description}`;
  const fallbackInterests: string[] = [];
  if (/تاريخ|تراث|قصر|سوق/i.test(sourceText))
    fallbackInterests.push("historical", "culture");
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
  const rawTags = [
    ...rawInterestTags,
    ...rawTagsField,
    ...fallbackInterests,
    sourceText,
  ];
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
          ].includes(tag),
        ),
    ),
  );
  if (interestTags.length === 0) {
    interestTags.push("culture");
  }

  let rawAttractionType = (apiLandmark.type || "").trim();
  if (
    locale === "en" &&
    apiLandmark.type_en &&
    apiLandmark.type_en.trim() !== ""
  ) {
    rawAttractionType = apiLandmark.type_en.trim();
  }
  const categoryLabel = (rawAttractionType || apiLandmark.tags || "").trim();
  const galleryImages = parseGallery(
    apiLandmark.attraction_gallery,
    directusUrl,
  );
  const lat = toNumber(apiLandmark.latitude);
  const lon = toNumber(apiLandmark.longitude);
  const mapLink = apiLandmark.map_link?.trim() || undefined;

  return {
    id: String(apiLandmark.id),
    slug: resolveLandmarkSlug(apiLandmark),
    title,
    subtitle,
    location,
    area,
    city,
    description,
    contentHtml,
    guideName,
    image: imageUrl,
    galleryImages: galleryImages.length > 0 ? galleryImages : [imageUrl],
    lat,
    lon,
    mapLink,
    categoryLabel,
    attractionType: rawAttractionType || undefined,
    cityId,
    travelerTypes: apiLandmark.traveller_types ?? [],
    priceFrom: apiLandmark.price_range_from,
    priceTo: apiLandmark.price_range_to,
    interestTags,
  };
};

export const fetchLandmarks = async (
  locale: LocaleCode = "ar",
  options?: { limit?: number; page?: number },
): Promise<{ items: Landmark[]; total: number; page: number; totalPages: number }> => {
  const empty = { items: [] as Landmark[], total: 0, page: 1, totalPages: 1 };
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(
    /\/$/,
    "",
  );

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return empty;
  }

  const page = options?.page;
  const limit = page
    ? CATALOG_PAGE_SIZE
    : (options?.limit ?? DIRECTUS_COLLECTION_LIMIT);

  try {
    const listUrl = new URL(`${directusUrl}/items/attractions`);
    listUrl.searchParams.set("sort", "-id");
    listUrl.searchParams.set("fields", ATTRACTION_FIELDS);
    listUrl.searchParams.set("limit", String(limit));
    if (page) {
      listUrl.searchParams.set("page", String(page));
      listUrl.searchParams.set("meta", "filter_count");
    }

    const response = await fetch(listUrl.toString(), directusCollectionFetch);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch landmarks: ${response.statusText}`,
      );
    }

    const apiData: ApiResponse & { meta?: { filter_count?: number } } =
      await response.json();
    const items = (apiData.data ?? [])
      .filter((landmark) => !landmark.status || landmark.status === "published")
      .map((landmark) => transformLandmark(landmark, directusUrl, locale));
    const total =
      typeof apiData.meta?.filter_count === "number"
        ? apiData.meta.filter_count
        : items.length;
    return {
      items,
      total,
      page: page ?? 1,
      totalPages: catalogTotalPages(total, page ? CATALOG_PAGE_SIZE : total || 1),
    };
  } catch (error) {
    console.error("Error fetching landmarks:", error);
    return empty;
  }
};

export const getLandmarkBySlug = async (
  slug: string,
  locale: LocaleCode = "ar",
): Promise<Landmark | null> => {
  const normalized = normalizeLandmarkSlugParam(slug);
  const { items: rows } = await fetchLandmarks(locale);

  if (normalized) {
    const bySlug = rows.find((row) => row.slug === normalized);
    if (bySlug) return bySlug;
  }

  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug).trim();
  } catch {
    decoded = slug.trim();
  }

  if (decoded) {
    const byTitle = rows.find((row) => row.title.trim() === decoded);
    if (byTitle) return byTitle;
  }

  if (/^\d+$/.test(decoded)) {
    return rows.find((row) => row.id === decoded) ?? null;
  }

  if (decoded.startsWith("attraction-")) {
    const id = decoded.replace(/^attraction-/, "");
    return rows.find((row) => row.id === id) ?? null;
  }

  return null;
};

function sameCity(a: Landmark, b: Landmark): boolean {
  if (a.cityId && b.cityId) return a.cityId === b.cityId;
  if (a.city && b.city) return normalizeText(a.city) === normalizeText(b.city);
  return normalizeText(a.area) === normalizeText(b.area);
}

function sameAttractionType(a: Landmark, b: Landmark): boolean {
  if (!a.attractionType || !b.attractionType) return false;
  return normalizeText(a.attractionType) === normalizeText(b.attractionType);
}

export const getRelatedLandmarks = (
  current: Landmark,
  all: Landmark[],
  limit = 4,
): Landmark[] => {
  return all
    .filter((row) => row.id !== current.id)
    .filter((row) => sameCity(current, row) && !sameAttractionType(current, row))
    .slice(0, limit);
};

export const resolveLandmarkMapTarget = (
  landmark: Landmark,
): ResolvedLandmarkMap => {
  if (typeof landmark.lat === "number" && typeof landmark.lon === "number") {
    return {
      kind: "interactive",
      lat: landmark.lat,
      lon: landmark.lon,
      title: landmark.title,
    };
  }

  if (landmark.mapLink) {
    return { kind: "external", href: landmark.mapLink };
  }

  return null;
};
