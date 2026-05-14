/**
 * Backend handoff — destinations:
 * - Suggested Directus collection: `destinations` (or reuse `landmarks` with a type flag).
 * - Env: `NEXT_PUBLIC_DIRECTUS_APP_URL` (same as landmarks).
 * - Map API rows → `Destination` via `transformDestination`.
 */

import type { Landmark } from "@/components/landmarks/data";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

export interface Destination {
  id: string;
  slug: string;
  title: string;
  location: string;
  area: string;
  description: string;
  image: string;
  lat?: number;
  lon?: number;
  cityId?: string;
  interestTags?: string[];
}

/** UI fallback when Directus `destinations` is empty or env is missing. */
export const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: "d-1",
    slug: "abha",
    title: "أبها",
    location: "منطقة عسير",
    area: "أبها",
    description: "عاصمة المنطقة ووجهة معتدلة الطقس مع حدائق وأسواق وإطلالات جبلية.",
    image: "/assets/activities/aseer-residence.jpg",
    cityId: "abha",
    interestTags: ["culture", "shopping", "nature"],
  },
  {
    id: "d-2",
    slug: "al-soudah",
    title: "السودة",
    location: "أعلى قمم المملكة",
    area: "أبها",
    description: "هواء عليل ومسارات مشي ومناظر سحابية على مد البصر.",
    image: "/assets/activities/landmarks.jpg",
    cityId: "abha",
    interestTags: ["nature", "adventure"],
  },
  {
    id: "d-3",
    slug: "rijal-almua",
    title: "رجال ألمع",
    location: "محافظة رجال ألمع",
    area: "رجال ألمع",
    description: "قرية تراثية على لائحة اليونسكو وطراز معماري فريد.",
    image: "/assets/activities/points-of-interest.jpg",
    cityId: "mahayil",
    interestTags: ["historical", "culture"],
  },
  {
    id: "d-4",
    slug: "khamis-mushait",
    title: "خميس مشيط",
    location: "منطقة عسير",
    area: "خميس مشيط",
    description: "مدينة نابضة بالحياة وقريبة من أبرز المواقع الطبيعية.",
    image: "/assets/activities/seasonal-activities.jpg",
    cityId: "khamis",
    interestTags: ["shopping", "culture"],
  },
  {
    id: "d-5",
    slug: "tanomah",
    title: "تنومة",
    location: "محافظة تنومة",
    area: "تنومة",
    description: "جبال وضباب وقرى أثرية تجمع بين الطبيعة والتراث.",
    image: "/assets/activities/aseer-residence.jpg",
    cityId: "tanomah",
    interestTags: ["nature", "historical"],
  },
  {
    id: "d-6",
    slug: "bisha",
    title: "بيشة",
    location: "منطقة عسير",
    area: "بيشة",
    description: "واحات ووديان وترحيب بدوي أصيل في قلب الجنوب.",
    image: "/assets/activities/landmarks.jpg",
    cityId: "bisha",
    interestTags: ["nature", "culture"],
  },
];

export interface ApiDestination {
  id: string | number;
  status?: string;
  title?: string | null;
  title_en?: string | null;
  title_ar?: string | null;
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
  cover_image?: string | null;
  hero_image?: string | null;
  destination_image?: string | null;
  lat?: number | string | null;
  lon?: number | string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  city?: string | null;
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

const fallbackCoordsBySlug: Record<string, { lat: number; lon: number }> = {
  abha: { lat: 18.2164, lon: 42.5053 },
  "al-soudah": { lat: 18.2676, lon: 42.3678 },
  "rijal-almua": { lat: 18.2007, lon: 42.2236 },
  "khamis-mushait": { lat: 18.3009, lon: 42.7292 },
  tanomah: { lat: 27.0972, lon: 44.1277 },
  bisha: { lat: 19.9844, lon: 42.6052 },
};

const toNumber = (value: number | string | null | undefined): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
};

const DEFAULT_DESTINATION_IMAGE = "/assets/activities/points-of-interest.jpg";

/** URL segment: Latin letters, digits, single hyphens (stable across locales). */
function isAsciiUrlSlug(s: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(s);
}

/** Build a kebab slug from English (or other Latin) text; strips non-Latin characters. */
function slugifyLatin(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveCanonicalSlug(row: ApiDestination): string {
  const candidates = [row.slug_en, row.slug]
    .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
    .map((s) => s.trim());

  for (const c of candidates) {
    if (isAsciiUrlSlug(c)) return c.toLowerCase();
  }

  const titleEn =
    pickLocalizedField(row, "title", "en") ||
    pickLocalizedField(row, "name", "en") ||
    "";
  const fromTitle = slugifyLatin(titleEn);
  if (fromTitle) return fromTitle;

  return `destination-${row.id}`;
}

function uniquifyDestinationSlugs(items: Destination[]): Destination[] {
  const taken = new Set<string>();
  return items.map((item) => {
    let slug = item.slug;
    if (taken.has(slug)) {
      slug = `${item.slug}-${item.id}`;
    }
    taken.add(slug);
    return { ...item, slug };
  });
}

/** Resolve Directus file id, absolute URL, or local public path — avoid double-prefixing. */
function resolveDestinationImageUrl(
  imageAsset: string | null | undefined,
  directusUrl: string,
): string {
  const trimmed = typeof imageAsset === "string" ? imageAsset.trim() : "";
  if (!trimmed) return DEFAULT_DESTINATION_IMAGE;

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("//")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  const base = directusUrl.replace(/\/$/, "");
  return `${base}/assets/${trimmed}`;
}

export const transformDestination = (
  row: ApiDestination,
  directusUrl: string,
  locale: LocaleCode = "ar",
): Destination => {
  const imageAsset = row.cover_image || row.hero_image || row.destination_image;
  const imageUrl = resolveDestinationImageUrl(imageAsset, directusUrl);

  const title =
    pickLocalizedField(row, "title", locale) ||
    pickLocalizedField(row, "name", locale) ||
    "";
  const location = row.location?.trim() || row.address?.trim() || row.city?.trim() || "";
  const description =
    pickLocalizedField(row, "description", locale) ||
    pickLocalizedField(row, "content", locale) ||
    "";

  const slug = resolveCanonicalSlug(row);

  const area = row.city || location?.split(",")[0]?.trim() || "";
  const cityId = cityMap[(row.city || "").trim()] || undefined;
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
    location,
    area,
    description,
    image: imageUrl,
    lat,
    lon,
    cityId,
    interestTags: mappedTags.filter(Boolean),
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
    return uniquifyDestinationSlugs(
      apiData.data
        .filter((d) => !d.status || d.status === "published")
        .map((d) => transformDestination(d, directusUrl, locale)),
    );
  } catch {
    return [];
  }
};

export const fetchDestinationsWithFallback = async (locale: LocaleCode = "ar"): Promise<Destination[]> => {
  const rows = await fetchDestinations(locale);
  const source = rows.length > 0 ? rows : FALLBACK_DESTINATIONS;
  return source.map((d) => {
    if (typeof d.lat === "number" && typeof d.lon === "number") return d;
    const fallback = fallbackCoordsBySlug[d.slug];
    return fallback ? { ...d, ...fallback } : d;
  });
};

/** Old links used a slug derived from the Arabic title (`تثليث` → encoded path). */
function legacySlugFromLocalizedTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]+/g, "");
}

export const getDestinationBySlug = async (
  slugOrId: string,
  locale: LocaleCode = "ar",
): Promise<Destination | null> => {
  const param = decodeURIComponent(slugOrId.trim());
  const rows = await fetchDestinationsWithFallback(locale);

  const byId = rows.find((d) => d.id === param);
  if (byId) return byId;

  const bySlug = rows.find((d) => d.slug === param);
  if (bySlug) return bySlug;

  if (/[\u0600-\u06FF]/.test(param)) {
    const arRows = locale === "ar" ? rows : await fetchDestinationsWithFallback("ar");
    const hitAr = arRows.find((d) => legacySlugFromLocalizedTitle(d.title) === param);
    if (hitAr) {
      return rows.find((d) => d.id === hitAr.id) ?? hitAr;
    }
  }

  return null;
};

/** Maps a destination into `Landmark` shape for reuse of `AttractionsLandmarkCard` (design parity). */
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
