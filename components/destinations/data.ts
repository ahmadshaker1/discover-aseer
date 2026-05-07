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

export const transformDestination = (
  row: ApiDestination,
  directusUrl: string,
  locale: LocaleCode = "ar",
): Destination => {
  const imageAsset = row.cover_image || row.hero_image || row.destination_image;
  const imageUrl = imageAsset
    ? `${directusUrl}/assets/${imageAsset}`
    : "/assets/activities/points-of-interest.jpg";

  const title =
    pickLocalizedField(row, "title", locale) ||
    pickLocalizedField(row, "name", locale) ||
    "";
  const location = row.location?.trim() || row.address?.trim() || row.city?.trim() || "";
  const description =
    pickLocalizedField(row, "description", locale) ||
    pickLocalizedField(row, "content", locale) ||
    "";

  const slug =
    row.slug?.trim() ||
    title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u0600-\u06FF-]+/g, "");

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
    return apiData.data
      .filter((d) => !d.status || d.status === "published")
      .map((d) => transformDestination(d, directusUrl, locale));
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

export const getDestinationBySlug = async (
  slug: string,
  locale: LocaleCode = "ar",
): Promise<Destination | null> => {
  const rows = await fetchDestinationsWithFallback(locale);
  return rows.find((d) => d.slug === slug) ?? null;
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
