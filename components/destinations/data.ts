/**
 * Directus collection: `destination`
 * Env: `NEXT_PUBLIC_DIRECTUS_APP_URL`
 */

import type { Landmark } from "@/components/landmarks/data";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

export const DEFAULT_ABHA_MAP_CENTER = {
  lat: 18.087563,
  lon: 42.43704,
} as const;

export interface Destination {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  sectionTitle: string;
  city: string;
  location: string;
  area: string;
  description: string;
  image: string;
  introImage: string;
  lat?: number;
  lon?: number;
  cityId?: string;
  interestTags?: string[];
  destinationFilter: string;
}

export interface ApiDestination {
  id: string | number;
  status?: string;
  title?: string | null;
  title_en?: string | null;
  title_ar?: string | null;
  title_section_2?: string | null;
  title_section_2_en?: string | null;
  title_section_2_ar?: string | null;
  name?: string | null;
  name_en?: string | null;
  name_ar?: string | null;
  slug?: string | null;
  location?: string | null;
  address?: string | null;
  description?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  content?: string | null;
  content_en?: string | null;
  content_ar?: string | null;
  sub_title?: string | null;
  subtitle?: string | null;
  sub_title_en?: string | null;
  sub_title_ar?: string | null;
  subtitle_en?: string | null;
  subtitle_ar?: string | null;
  cover_image?: string | null;
  hero_image?: string | null;
  hero_image_1?: string | null;
  hero_image_new?: string | null;
  destination_image?: string | null;
  lat?: number | string | null;
  lon?: number | string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  city?: string | null;
  destination_filter?: string | null;
  tags?: string | null;
  interest_tags?: string[] | null;
}

export interface ApiDestinationResponse {
  data: ApiDestination[];
}

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

const toNumber = (value: number | string | null | undefined): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
};

function resolveDestinationImageUrl(
  imageAsset: string | null | undefined,
  directusUrl: string,
): string {
  const trimmed = typeof imageAsset === "string" ? imageAsset.trim() : "";
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("//")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  const base = directusUrl.replace(/\/$/, "");
  return `${base}/assets/${trimmed}`;
}

const toLocalizedRecord = (row: ApiDestination): Record<string, unknown> =>
  row as unknown as Record<string, unknown>;

/** Locale-independent slug — always derived from English title (or CMS slug / id). */
export const slugifyDestination = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const resolveDestinationSlug = (row: ApiDestination): string => {
  const fromCms = row.slug?.trim();
  if (fromCms) return slugifyDestination(fromCms);

  const fromEnglish = row.title_en?.trim();
  if (fromEnglish) return slugifyDestination(fromEnglish);

  const fromArabic = row.title_ar?.trim();
  if (fromArabic) return slugifyDestination(fromArabic);

  return String(row.id);
};

export const normalizeDestinationSlugParam = (slug: string): string => {
  try {
    return slugifyDestination(decodeURIComponent(slug));
  } catch {
    return slugifyDestination(slug);
  }
};

const pickTitleSection2 = (row: ApiDestination, locale: LocaleCode): string => {
  const record = toLocalizedRecord(row);
  const localized =
    pickLocalizedField(record, "title_section_2", locale) ||
    (locale === "en" ? row.title_section_2_en : row.title_section_2_ar);
  return (localized || row.title_section_2 || "").trim();
};

const buildSectionTitle = (titleSection2: string, city: string): string =>
  [titleSection2, city].filter(Boolean).join(" ").trim();

const pickSubtitle = (row: ApiDestination, locale: LocaleCode): string => {
  const record = toLocalizedRecord(row);
  const localized =
    pickLocalizedField(record, "sub_title", locale) ||
    pickLocalizedField(record, "subtitle", locale) ||
    (locale === "en"
      ? row.sub_title_en || row.subtitle_en
      : row.sub_title_ar || row.subtitle_ar);
  return (localized || row.sub_title || row.subtitle || "").trim();
};

export const transformDestination = (
  row: ApiDestination,
  directusUrl: string,
  locale: LocaleCode = "ar",
): Destination => {
  const heroImage = resolveDestinationImageUrl(
    row.hero_image_new || row.hero_image || row.hero_image_1 || row.cover_image || row.destination_image,
    directusUrl,
  );
  const introImage = resolveDestinationImageUrl(
    row.hero_image_1 || row.hero_image || row.hero_image_new || row.cover_image,
    directusUrl,
  );

  const record = toLocalizedRecord(row);
  const title =
    pickLocalizedField(record, "title", locale) ||
    pickLocalizedField(record, "name", locale) ||
    "";
  const location = row.location?.trim() || row.address?.trim() || row.city?.trim() || "";
  const description =
    pickLocalizedField(record, "description", locale) ||
    pickLocalizedField(record, "content", locale) ||
    "";

  const slug = resolveDestinationSlug(row);

  const city = (row.city || "").trim();
  const titleSection2 = pickTitleSection2(row, locale);
  const sectionTitle = buildSectionTitle(titleSection2, city);

  const destinationFilter = (row.destination_filter || city || "").trim();
  const area = destinationFilter || location.split(",")[0]?.trim() || "";
  const cityId =
    cityMap[destinationFilter] ||
    cityMap[city] ||
    undefined;
  const lat = toNumber(row.lat ?? row.latitude);
  const lon = toNumber(row.lon ?? row.longitude);

  const sourceText = `${title} ${description}`;
  const fallbackTags: string[] = [];
  if (/طبيعة|منتزه|جبل|وادي/i.test(sourceText)) fallbackTags.push("nature", "adventure");
  if (/تراث|قرية|تاريخ|ثقافة/i.test(sourceText)) fallbackTags.push("historical", "culture");
  if (/سوق|تسوق/i.test(sourceText)) fallbackTags.push("shopping");
  const mappedTags =
    row.interest_tags ??
    row.tags
      ?.split(/[،,]/)
      .map((tag) => tag.trim())
      .filter(Boolean) ??
    fallbackTags;

  return {
    id: String(row.id),
    slug,
    title,
    subtitle: pickSubtitle(row, locale),
    sectionTitle,
    city,
    location,
    area,
    description,
    image: heroImage,
    introImage,
    lat,
    lon,
    cityId,
    interestTags: mappedTags.filter(Boolean),
    destinationFilter,
  };
};

export const fetchDestinations = async (locale: LocaleCode = "ar"): Promise<Destination[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;
  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }
  try {
    const response = await fetch(`${directusUrl.replace(/\/$/, "")}/items/destination`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const apiData: ApiDestinationResponse = await response.json();
    return apiData.data
      .filter((d) => !d.status || d.status === "published")
      .map((d) => transformDestination(d, directusUrl, locale));
  } catch {
    return [];
  }
};

export const getDestinationBySlug = async (
  slug: string,
  locale: LocaleCode = "ar",
): Promise<Destination | null> => {
  const normalized = normalizeDestinationSlugParam(slug);
  const rows = await fetchDestinations(locale);

  if (normalized) {
    const bySlug = rows.find((d) => d.slug === normalized);
    if (bySlug) return bySlug;
  }

  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug).trim();
  } catch {
    decoded = slug.trim();
  }

  if (decoded) {
    const byTitle = rows.find((d) => d.title.trim() === decoded);
    if (byTitle) return byTitle;
  }

  if (/^\d+$/.test(decoded)) {
    return rows.find((d) => d.id === decoded) ?? null;
  }

  return null;
};

export const filterDestinationsByArea = (
  destinations: Destination[],
  destinationFilter: string,
  excludeSlug?: string,
): Destination[] => {
  const normalized = destinationFilter.trim().toLowerCase();
  if (!normalized) return [];

  return destinations.filter((d) => {
    if (excludeSlug && d.slug === excludeSlug) return false;
    return d.destinationFilter.trim().toLowerCase() === normalized;
  });
};

export const resolveDestinationMapCenter = (destination: Destination) => {
  if (typeof destination.lat === "number" && typeof destination.lon === "number") {
    return { lat: destination.lat, lon: destination.lon };
  }
  return DEFAULT_ABHA_MAP_CENTER;
};

/** Maps a destination into `Landmark` shape for reuse of `AttractionsLandmarkCard`. */
export const destinationToLandmark = (d: Destination): Landmark => ({
  id: d.id,
  title: d.title,
  location: d.location,
  area: d.area,
  description: d.description,
  guideName: "",
  image: d.image,
  cityId: d.cityId,
  interestTags: d.interestTags,
});
