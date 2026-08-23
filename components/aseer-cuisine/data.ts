/**
 * Directus collection: `cuisine`
 * Env: `NEXT_PUBLIC_DIRECTUS_APP_URL`
 */

import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import { DIRECTUS_COLLECTION_REVALIDATE } from "@/lib/directus/collectionCache";

const CUISINE_FIELDS = [
  "id",
  "status",
  "title",
  "title_ar",
  "title_en",
  "thumbnail",
  "hero_image_url",
  "subtitle_ar",
  "subtitle_en",
  "subtitle_purple_ar",
  "subtitle_purple_en",
  "hero_content_ar",
  "hero_content_en",
  "content_ar",
  "content_en",
  "extra_content_ar",
  "extra_content_en",
  "cuisine_type",
  "highlighted",
].join(",");

export type CuisineType = "dish" | "flavour";

export const DEFAULT_CUISINE_CARD_IMAGE = "/assets/activities/aseer-cuisine.jpg";

export interface CuisineItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  subtitlePurple: string;
  heroImage: string;
  heroContent: string;
  content: string;
  extraContent: string;
  cuisineType: CuisineType;
  highlighted: boolean;
}

export interface CuisineCard {
  id: string;
  slug: string;
  title: string;
  image: string;
}

/** Legacy landing-section shape */
export interface AseerCuisineDish {
  id: string;
  title: string;
  image: string;
  mainIngredient: string;
  timeText: string;
  rating: number;
  reviews: number;
}

export interface ApiCuisineItem {
  id: string | number;
  status?: string | null;
  title?: string | null;
  title_ar?: string | null;
  title_en?: string | null;
  thumbnail?: string | null;
  hero_image_url?: string | null;
  subtitle_ar?: string | null;
  subtitle_en?: string | null;
  subtitle_purple_ar?: string | null;
  subtitle_purple_en?: string | null;
  hero_content_ar?: string | null;
  hero_content_en?: string | null;
  content_ar?: string | null;
  content_en?: string | null;
  extra_content_ar?: string | null;
  extra_content_en?: string | null;
  cuisine_type?: string | null;
  highlighted?: boolean | null;
}

interface ApiCuisineResponse {
  data: ApiCuisineItem[];
}

const toRecord = (row: ApiCuisineItem): Record<string, unknown> =>
  row as unknown as Record<string, unknown>;

function resolveCuisineImageUrl(
  imageAsset: string | null | undefined,
  directusUrl: string,
): string {
  const trimmed = typeof imageAsset === "string" ? imageAsset.trim() : "";
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("//")) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  return `${directusUrl.replace(/\/$/, "")}/assets/${trimmed}`;
}

export const slugifyCuisine = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const normalizeCuisineType = (value: string | null | undefined): CuisineType | null => {
  const normalized = (value ?? "").trim().toLowerCase();
  if (normalized === "dish") return "dish";
  if (normalized === "flavour" || normalized === "flavor") return "flavour";
  return null;
};

const resolveCuisineSlug = (row: ApiCuisineItem): string => {
  const fromEnglish = row.title_en?.trim();
  if (fromEnglish) return slugifyCuisine(fromEnglish);
  const fromArabic = row.title_ar?.trim();
  if (fromArabic) return slugifyCuisine(fromArabic);
  return String(row.id);
};

export const normalizeCuisineSlugParam = (slug: string): string => {
  try {
    return slugifyCuisine(decodeURIComponent(slug));
  } catch {
    return slugifyCuisine(slug);
  }
};

export const transformCuisineItem = (
  row: ApiCuisineItem,
  directusUrl: string,
  locale: LocaleCode = "ar",
): CuisineItem | null => {
  const cuisineType = normalizeCuisineType(row.cuisine_type);
  if (!cuisineType) return null;

  const record = toRecord(row);
  const title =
    pickLocalizedField(record, "title", locale) || "";
  const subtitle = pickLocalizedField(record, "subtitle", locale) || "";
  const subtitlePurple = pickLocalizedField(record, "subtitle_purple", locale) || "";
  const heroContent = pickLocalizedField(record, "hero_content", locale) || "";
  const content = pickLocalizedField(record, "content", locale) || "";
  const extraContent = pickLocalizedField(record, "extra_content", locale) || "";
  const heroImage = resolveCuisineImageUrl(row.hero_image_url || row.thumbnail, directusUrl);

  return {
    id: String(row.id),
    slug: resolveCuisineSlug(row),
    title,
    subtitle,
    subtitlePurple,
    heroImage,
    heroContent,
    content,
    extraContent,
    cuisineType,
    highlighted: row.highlighted === true,
  };
};

export const toCuisineCard = (item: CuisineItem): CuisineCard => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  image: item.heroImage || DEFAULT_CUISINE_CARD_IMAGE,
});

export interface FetchCuisineItemsOptions {
  locale?: LocaleCode;
  cuisineType?: CuisineType;
  highlighted?: boolean;
  limit?: number;
}

export async function fetchCuisineItems(
  options: FetchCuisineItemsOptions = {},
): Promise<CuisineItem[]> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");
  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  const locale = options.locale ?? "ar";
  const params = new URLSearchParams();
  params.set("filter[status][_eq]", "published");
  if (options.cuisineType) {
    params.set("filter[cuisine_type][_eq]", options.cuisineType);
  }
  if (options.highlighted === true) {
    params.set("filter[highlighted][_eq]", "true");
  } else if (options.highlighted === false) {
    params.set("filter[highlighted][_neq]", "true");
  }
  params.set("fields", CUISINE_FIELDS);
  if (typeof options.limit === "number" && options.limit > 0) {
    params.set("limit", String(options.limit));
  } else if (options.highlighted === undefined) {
    params.set("limit", "100");
  }

  try {
    const response = await fetch(`${directusUrl}/items/cuisine?${params.toString()}`, {
      next: { revalidate: DIRECTUS_COLLECTION_REVALIDATE },
    });
    if (!response.ok) return [];

    const apiData: ApiCuisineResponse = await response.json();
    if (!Array.isArray(apiData.data)) return [];

    return apiData.data
      .map((row) => transformCuisineItem(row, directusUrl, locale))
      .filter((item): item is CuisineItem => item !== null);
  } catch {
    return [];
  }
}

/** Highlighted items first, then fills up to `count` from the rest of the same type. */
export async function fetchFeaturedCuisineCards(options: {
  locale: LocaleCode;
  cuisineType: CuisineType;
  count?: number;
}): Promise<CuisineCard[]> {
  const count = options.count ?? 4;

  const [highlighted, allOfType] = await Promise.all([
    fetchCuisineItems({
      locale: options.locale,
      cuisineType: options.cuisineType,
      highlighted: true,
      limit: count,
    }),
    fetchCuisineItems({
      locale: options.locale,
      cuisineType: options.cuisineType,
    }),
  ]);

  const ordered: CuisineItem[] = [];
  const seen = new Set<string>();

  for (const item of highlighted) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    ordered.push(item);
  }

  for (const item of allOfType) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    ordered.push(item);
    if (ordered.length >= count) break;
  }

  return ordered.slice(0, count).map(toCuisineCard);
}

export async function getCuisineBySlug(
  slug: string,
  locale: LocaleCode = "ar",
): Promise<CuisineItem | null> {
  const normalized = normalizeCuisineSlugParam(slug);
  const rows = await fetchCuisineItems({ locale });

  if (normalized) {
    const bySlug = rows.find((item) => item.slug === normalized);
    if (bySlug) return bySlug;
  }

  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug).trim();
  } catch {
    decoded = slug.trim();
  }

  if (decoded) {
    const byTitle = rows.find((item) => item.title.trim() === decoded);
    if (byTitle) return byTitle;
  }

  if (/^\d+$/.test(decoded)) {
    return rows.find((item) => item.id === decoded) ?? null;
  }

  return rows.find((item) => item.id === decoded || item.slug === decoded) ?? null;
}

export async function fetchAseerCuisineDishes(options?: {
  locale?: string;
}): Promise<AseerCuisineDish[]> {
  const locale = (options?.locale === "en" ? "en" : "ar") as LocaleCode;
  const items = await fetchFeaturedCuisineCards({
    locale,
    cuisineType: "dish",
    count: 4,
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    mainIngredient: item.title,
    timeText: locale === "en" ? "30 min" : "30 دقيقة",
    rating: 4.8,
    reviews: 233,
  }));
}
