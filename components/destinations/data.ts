/**
 * Backend handoff — destinations:
 * - Suggested Directus collection: `destinations` (or reuse `landmarks` with a type flag).
 * - Env: `NEXT_PUBLIC_DIRECTUS_APP_URL` (same as landmarks).
 * - Map API rows → `Destination` via `transformDestination`.
 */

import type { Landmark } from "@/components/landmarks/data";

export interface Destination {
  id: string;
  slug: string;
  title: string;
  location: string;
  area: string;
  description: string;
  image: string;
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
  id: string;
  status?: string;
  title: string;
  slug?: string | null;
  location: string;
  description: string;
  cover_image?: string | null;
  city?: string | null;
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

export const transformDestination = (row: ApiDestination, directusUrl: string): Destination => {
  const imageUrl = row.cover_image
    ? `${directusUrl}/assets/${row.cover_image}`
    : "/assets/activities/points-of-interest.jpg";

  const slug =
    row.slug?.trim() ||
    row.title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u0600-\u06FF-]+/g, "");

  const area = row.city || row.location?.split(",")[0]?.trim() || "";
  const cityId = cityMap[(row.city || "").trim()] || undefined;

  const sourceText = `${row.title ?? ""} ${row.description ?? ""}`;
  const fallbackTags: string[] = [];
  if (/طبيعة|منتزه|جبل|وادي/i.test(sourceText)) fallbackTags.push("nature", "adventure");
  if (/تراث|قرية|تاريخ|ثقافة/i.test(sourceText)) fallbackTags.push("historical", "culture");
  if (/سوق|تسوق/i.test(sourceText)) fallbackTags.push("shopping");

  return {
    id: row.id,
    slug,
    title: row.title?.trim() || "",
    location: row.location?.trim() || "",
    area,
    description: row.description?.trim() || "",
    image: imageUrl,
    cityId,
    interestTags: (row.interest_tags ?? fallbackTags).filter(Boolean),
  };
};

export const fetchDestinations = async (): Promise<Destination[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;
  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }
  try {
    const response = await fetch(`${directusUrl}/items/destinations`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const apiData: ApiDestinationResponse = await response.json();
    return apiData.data
      .filter((d) => !d.status || d.status === "published")
      .map((d) => transformDestination(d, directusUrl));
  } catch {
    return [];
  }
};

export const fetchDestinationsWithFallback = async (): Promise<Destination[]> => {
  const rows = await fetchDestinations();
  return rows.length > 0 ? rows : FALLBACK_DESTINATIONS;
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
