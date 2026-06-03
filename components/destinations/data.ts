/**
 * Directus collection: `destination`
 * Env: `NEXT_PUBLIC_DIRECTUS_APP_URL`
 */

import type { Landmark } from "@/components/landmarks/data";
import {
  getDestinationFilterLabel,
  resolveDestinationFilterId,
} from "@/components/destinations/filterOptions";
import {
  isMostlyArabicText,
  pickLocalizedField,
  type LocaleCode,
} from "@/lib/i18n/localized";

export const DEFAULT_ABHA_MAP_CENTER = {
  lat: 18.087563,
  lon: 42.43704,
} as const;

export interface Destination {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  /** @deprecated Prefer `displayCity` + `destinations.landmarksSectionTitle` i18n on slug pages. */
  sectionTitle: string;
  /** Locale-aware place name for intro headings and section titles ({area}). */
  displayCity: string;
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
  /** Raw CMS `destination_filter` (Arabic). */
  destinationFilter: string;
  destinationFilterId?: string;
  /** Localized label for `destinationFilterId`. */
  destinationFilterLabel: string;
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
  /** Preferred URL slug (Latin). Directus may expose this as `slug_en` or a single `slug`. */
  slug_en?: string | null;
  slug?: string | null;
  location?: string | null;
  address?: string | null;
  description?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  content?: string | null;
  content_en?: string | null;
  content_ar?: string | null;
  content_of_home_page?: string | null;
  content_of_home_page_en?: string | null;
  content_of_home_page_ar?: string | null;
  destination_content?: string | null;
  destination_content_en?: string | null;
  destination_content_ar?: string | null;
  sub_title?: string | null;
  sub_title_orange?: string | null;
  sub_title_orange_en?: string | null;
  sub_title_orange_ar?: string | null;
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
  city_en?: string | null;
  city_ar?: string | null;
  temp_ar?: string | null;
  temp_en?: string | null;
  destination_filter?: string | null;
  tags?: string | null;
  interest_tags?: string[] | null;
}

export interface ApiDestinationResponse {
  data: ApiDestination[];
}

const cityMap: Record<string, string> = {
  abha: "abha",
  أبها: "abha",
  "خميس مشيط": "khamis",
  khamis: "khamis",
  tanomah: "tanomah",
  تنومة: "tanomah",
  bisha: "bisha",
  بيشة: "bisha",
  mahayil: "mahayil",
  "محايل عسير": "mahayil",
  najran: "najran",
  نجران: "najran",
};

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

export function resolveDestinationImageUrl(
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

const readApiText = (row: ApiDestination, key: keyof ApiDestination): string => {
  const value = row[key];
  return typeof value === "string" ? value.trim() : "";
};

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

const pickDisplayCity = (
  row: ApiDestination,
  locale: LocaleCode,
  title: string,
): string => {
  if (locale === "en") {
    return (
      readApiText(row, "city_en") ||
      title ||
      readApiText(row, "title_en") ||
      ""
    );
  }
  return (
    readApiText(row, "city_ar") ||
    readApiText(row, "city") ||
    readApiText(row, "title_ar") ||
    title
  );
};

/** Hero tagline — EN uses `*_en` fields; AR uses `sub_title` + `sub_title_orange`. */
const pickSubtitle = (row: ApiDestination, locale: LocaleCode): string => {
  if (locale === "en") {
    const line1 =
      readApiText(row, "sub_title_en") || readApiText(row, "subtitle_en");
    const line2 = readApiText(row, "sub_title_orange_en");
    const fromEn = [line1, line2].filter(Boolean).join(" ").trim();
    if (fromEn) return fromEn;

    // CMS sometimes stores the full EN tagline only in `sub_title_en`
    if (line1) return line1;

    // Legacy rows: English copy still in non-suffixed fields
    const legacy1 = readApiText(row, "sub_title") || readApiText(row, "subtitle");
    const legacy2 = readApiText(row, "sub_title_orange");
    const legacy = [legacy1, legacy2].filter(Boolean).join(" ").trim();
    if (legacy && !isMostlyArabicText(legacy)) return legacy;

    return "";
  }

  const line1 =
    readApiText(row, "sub_title_ar") ||
    readApiText(row, "sub_title") ||
    readApiText(row, "subtitle_ar") ||
    readApiText(row, "subtitle");
  const line2 =
    readApiText(row, "sub_title_orange_ar") ||
    readApiText(row, "sub_title_orange");

  return [line1, line2].filter(Boolean).join(" ").trim();
};

/** Same tagline logic used on destination slug hero. */
export const pickDestinationSubtitle = pickSubtitle;

/** Home carousel body copy — `content_of_home_page` fields only. */
export const pickDestinationHomePageContent = (
  row: ApiDestination,
  locale: LocaleCode,
): string => {
  const record = toLocalizedRecord(row);
  const localized = pickLocalizedField(record, "content_of_home_page", locale);

  if (localized) {
    if (locale === "en" && isMostlyArabicText(localized)) return "";
    return localized;
  }

  if (locale === "en") {
    const fallback = readApiText(row, "content_of_home_page");
    return fallback && !isMostlyArabicText(fallback) ? fallback : "";
  }

  return readApiText(row, "content_of_home_page");
};

export const pickDestinationTitle = (
  row: ApiDestination,
  locale: LocaleCode,
): string => {
  const record = toLocalizedRecord(row);
  return (
    pickLocalizedField(record, "title", locale) ||
    pickLocalizedField(record, "name", locale) ||
    ""
  );
};

/** POI carousel category line — `temp_ar` / `temp_en`. */
export const pickDestinationPoiSubtitle = (
  row: ApiDestination,
  locale: LocaleCode,
): string => {
  const record = toLocalizedRecord(row);
  return pickLocalizedField(record, "temp", locale) || "";
};

export const resolveDestinationHeroImageUrl = (
  row: ApiDestination,
  directusUrl: string,
): string =>
  resolveDestinationImageUrl(
    row.hero_image_new ||
      row.hero_image ||
      row.hero_image_1 ||
      row.cover_image ||
      row.destination_image,
    directusUrl,
  );

const pickDescription = (row: ApiDestination, locale: LocaleCode): string => {
  if (locale === "en") {
    const candidates: (keyof ApiDestination)[] = [
      "content_en",
      "description_en",
      "destination_content_en",
      "content_of_home_page_en",
      "content",
      "description",
      "destination_content",
      "content_of_home_page",
    ];
    for (const key of candidates) {
      const text = readApiText(row, key);
      if (text && !isMostlyArabicText(text)) return text;
    }
    return "";
  }

  return (
    readApiText(row, "content_ar") ||
    readApiText(row, "content") ||
    readApiText(row, "description_ar") ||
    readApiText(row, "description") ||
    readApiText(row, "destination_content_ar") ||
    readApiText(row, "destination_content") ||
    readApiText(row, "content_of_home_page_ar") ||
    readApiText(row, "content_of_home_page") ||
    ""
  );
};

export const transformDestination = (
  row: ApiDestination,
  directusUrl: string,
  locale: LocaleCode = "ar",
): Destination => {
  const heroImage = resolveDestinationImageUrl(
    row.hero_image_new ||
      row.hero_image ||
      row.hero_image_1 ||
      row.cover_image ||
      row.destination_image,
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
  // CMS `city` is Arabic-only; for EN cards use the English title as the location line.
  const location =
    locale === "en"
      ? title ||
        row.location?.trim() ||
        row.address?.trim() ||
        row.city?.trim() ||
        ""
      : row.location?.trim() || row.address?.trim() || row.city?.trim() || "";
  const description = pickDescription(row, locale);

  const slug = resolveDestinationSlug(row);

  const city = (row.city || "").trim();
  const displayCity = pickDisplayCity(row, locale, title);
  const titleSection2 = pickTitleSection2(row, locale);
  const sectionTitle = buildSectionTitle(titleSection2, city);

  const destinationFilter = (row.destination_filter || "").trim();
  const destinationFilterId = resolveDestinationFilterId(destinationFilter);
  const destinationFilterLabel = destinationFilterId
    ? getDestinationFilterLabel(destinationFilterId, locale)
    : destinationFilter;
  const area = destinationFilterLabel || location.split(",")[0]?.trim() || "";
  const cityId = cityMap[city] || undefined;
  const lat = toNumber(row.lat ?? row.latitude);
  const lon = toNumber(row.lon ?? row.longitude);

  const sourceText = `${title} ${description}`;
  const fallbackTags: string[] = [];
  if (/طبيعة|منتزه|جبل|وادي/i.test(sourceText))
    fallbackTags.push("nature", "adventure");
  if (/تراث|قرية|تاريخ|ثقافة/i.test(sourceText))
    fallbackTags.push("historical", "culture");
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
    displayCity,
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
    destinationFilterId,
    destinationFilterLabel,
  };
};

/** Ensure each destination has a unique slug (Directus rows may share titles). */
function uniquifyDestinationSlugs(destinations: Destination[]): Destination[] {
  const counts = new Map<string, number>();
  return destinations.map((d) => {
    const base = d.slug.trim() || `destination-${d.id}`;
    const n = (counts.get(base) ?? 0) + 1;
    counts.set(base, n);
    if (n === 1) return { ...d, slug: base };
    return { ...d, slug: `${base}-${d.id}` };
  });
}

export const fetchDestinations = async (
  locale: LocaleCode = "ar",
): Promise<Destination[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;
  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }
  try {
    const response = await fetch(
      `${directusUrl.replace(/\/$/, "")}/items/destination`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!response.ok) return [];
    const apiData: ApiDestinationResponse = await response.json();
    const rows = Array.isArray(apiData.data) ? apiData.data : [];
    return uniquifyDestinationSlugs(
      rows
        .filter((d) => !d.status || d.status === "published")
        .map((d) => transformDestination(d, directusUrl, locale)),
    );
  } catch {
    return [];
  }
};

export const getDestinationBySlug = async (
  slugOrId: string,
  locale: LocaleCode = "ar",
): Promise<Destination | null> => {
  const normalized = normalizeDestinationSlugParam(slugOrId);
  const rows = await fetchDestinations(locale);

  if (normalized) {
    const bySlug = rows.find((d) => d.slug === normalized);
    if (bySlug) return bySlug;
  }

  let decoded = slugOrId;
  try {
    decoded = decodeURIComponent(slugOrId).trim();
  } catch {
    decoded = slugOrId.trim();
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
  destinationFilterOrId: string,
  excludeSlug?: string,
): Destination[] => {
  const filterId =
    resolveDestinationFilterId(destinationFilterOrId) ?? destinationFilterOrId;
  if (!filterId.trim()) return [];

  return destinations.filter((d) => {
    if (excludeSlug && d.slug === excludeSlug) return false;
    if (d.destinationFilterId) return d.destinationFilterId === filterId;
    return (
      resolveDestinationFilterId(d.destinationFilter) === filterId ||
      d.destinationFilter.trim().toLowerCase() ===
        destinationFilterOrId.trim().toLowerCase()
    );
  });
};

export const resolveDestinationMapCenter = (destination: Destination) => {
  if (
    typeof destination.lat === "number" &&
    typeof destination.lon === "number"
  ) {
    return { lat: destination.lat, lon: destination.lon };
  }
  return DEFAULT_ABHA_MAP_CENTER;
};

/** Maps a destination into `Landmark` shape for reuse of `AttractionsLandmarkCard`. */
export const destinationToLandmark = (d: Destination): Landmark => ({
  id: d.id,
  slug: d.slug,
  title: d.title,
  subtitle: d.subtitle,
  location: d.location,
  area: d.area,
  city: d.city,
  description: d.description,
  contentHtml: d.description,
  guideName: "",
  image: d.image,
  galleryImages: [d.image],
  lat: d.lat,
  lon: d.lon,
  categoryLabel: d.destinationFilterLabel || d.destinationFilter,
  cityId: d.cityId,
  interestTags: d.interestTags,
});
