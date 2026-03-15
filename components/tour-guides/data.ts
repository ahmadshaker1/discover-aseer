import type { TourGuideData } from "./TourGuideCard/TourGuideCard";

/** Directus API item shape for tourist_guides collection */
export interface ApiTouristGuide {
  id: number;
  name: string | null;
  name_en: string | null;
  image: string | null;
  phone_number: string | null;
  whatsapp: string | null;
  content: string | null;
  content_en: string | null;
  description: string | null;
  description_en: string | null;
  website: string | null;
  instagram: string | null;
  x_platform: string | null;
  tiktok: string | null;
  gender: string | null;
  arabic_language_level: string | null;
  english_language_level: string | null;
  specializations: string | null;
  specializations_en: string | null;
  date: string | null;
  transportation: boolean | null;
  [key: string]: unknown;
}

export interface TouristGuidesApiResponse {
  data: ApiTouristGuide[];
}

export interface FilterOptionWithCount {
  id: string;
  label: string;
  count: number;
}

export interface TourGuidesFilterOptions {
  specializations: FilterOptionWithCount[];
  gender: FilterOptionWithCount[];
  transportation: FilterOptionWithCount[];
}

export interface TourGuideWithFilterMeta extends TourGuideData {
  filterSpecializations: string[];
  gender: string;
  hasTransportation: boolean;
}

const DEFAULT_IMAGE = "/assets/experiences/experiences.png";
const DEFAULT_LOCATION = "منطقة عسير";

const LANGUAGE_LEVEL_MAP: Record<string, string> = {
  advanced: "متقدم",
  intermediate: "متوسط",
  beginner: "مبتدئ",
};

function parseSpecializations(raw: string | null): string[] {
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function buildLanguages(api: ApiTouristGuide): Array<{ code: string; name: string; flag: string }> {
  const list: Array<{ code: string; name: string; flag: string }> = [];
  const ar = api.arabic_language_level;
  const en = api.english_language_level;
  if (ar) list.push({ code: "ar", name: `العربية (${LANGUAGE_LEVEL_MAP[ar] ?? ar})`, flag: "🇸🇦" });
  if (en) list.push({ code: "en", name: `English (${LANGUAGE_LEVEL_MAP[en] ?? en})`, flag: "🇬🇧" });
  if (list.length === 0) list.push({ code: "ar", name: "العربية", flag: "🇸🇦" });
  return list;
}

export function transformTourGuide(api: ApiTouristGuide): TourGuideWithFilterMeta {
  const imageUrl =
    api.image && typeof api.image === "string" && api.image.startsWith("http")
      ? api.image
      : DEFAULT_IMAGE;
  let phone = (api.whatsapp ?? api.phone_number ?? "").toString().replace(/\D/g, "");
  if (phone.length === 9 && phone.startsWith("5")) phone = `966${phone}`;
  else if (phone.length === 10 && phone.startsWith("05")) phone = `966${phone.slice(1)}`;
  const whatsappUrl = phone ? `https://wa.me/${phone}` : "#";
  const description = (api.description || api.description_en || api.specializations || "").trim() || "مرشد سياحي في منطقة عسير";
  const filterSpecializations = parseSpecializations(api.specializations);
  const specialties = filterSpecializations.length > 0 ? filterSpecializations : undefined;
  const hasTransportation = api.transportation === true;
  const gender = (api.gender || "").trim() || "—";

  return {
    id: api.id,
    name: (api.name || api.name_en || "").trim() || "مرشد سياحي",
    location: DEFAULT_LOCATION,
    profileImage: imageUrl,
    languages: buildLanguages(api),
    whatsappUrl,
    description,
    specialties,
    transportation: hasTransportation ? "متوفر" : "غير متوفر",
    availability: "مرن",
    filterSpecializations,
    gender,
    hasTransportation,
  };
}

function buildFilterOptions(apiItems: ApiTouristGuide[]): TourGuidesFilterOptions {
  const specCounts = new Map<string, number>();
  const genderCounts = new Map<string, number>();
  let withTransport = 0;
  let withoutTransport = 0;

  for (const api of apiItems) {
    const t = transformTourGuide(api);
    for (const s of t.filterSpecializations) {
      specCounts.set(s, (specCounts.get(s) ?? 0) + 1);
    }
    if (t.gender && t.gender !== "—") {
      genderCounts.set(t.gender, (genderCounts.get(t.gender) ?? 0) + 1);
    }
    if (t.hasTransportation) withTransport += 1;
    else withoutTransport += 1;
  }

  const specializations: FilterOptionWithCount[] = Array.from(specCounts.entries())
    .map(([id, count]) => ({ id, label: id, count }))
    .sort((a, b) => b.count - a.count);

  const genderOptions: FilterOptionWithCount[] = Array.from(genderCounts.entries())
    .map(([id, count]) => ({ id, label: id, count }))
    .sort((a, b) => b.count - a.count);

  const transportation: FilterOptionWithCount[] = [
    { id: "yes", label: "متوفر", count: withTransport },
    { id: "no", label: "غير متوفر", count: withoutTransport },
  ];

  return { specializations, gender: genderOptions, transportation };
}

export interface FetchTourGuidesResult {
  guides: TourGuideWithFilterMeta[];
  filterOptions: TourGuidesFilterOptions;
}

export async function fetchTourGuides(): Promise<FetchTourGuidesResult> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return {
      guides: [],
      filterOptions: { specializations: [], gender: [], transportation: [] },
    };
  }

  try {
    const response = await fetch(`${directusUrl}/items/tourist_guides`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tour guides: ${response.statusText}`);
    }

    const apiData: TouristGuidesApiResponse = await response.json();
    if (!Array.isArray(apiData.data)) {
      return {
        guides: [],
        filterOptions: { specializations: [], gender: [], transportation: [] },
      };
    }

    const guides = apiData.data.map(transformTourGuide);
    const filterOptions = buildFilterOptions(apiData.data);
    return { guides, filterOptions };
  } catch (error) {
    console.error("Error fetching tour guides:", error);
    return {
      guides: [],
      filterOptions: { specializations: [], gender: [], transportation: [] },
    };
  }
}
