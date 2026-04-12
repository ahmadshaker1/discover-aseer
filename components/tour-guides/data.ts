/**
 * TOUR GUIDES — WHERE TO PLUG THINGS IN
 *
 * ┌─────────────────────────────────────┬──────────────────────────────────────────────────────────┐
 * │ You put…                            │ It goes…                                                 │
 * ├─────────────────────────────────────┼──────────────────────────────────────────────────────────┤
 * │ CMS base URL (no trailing /)        │ .env.local → NEXT_PUBLIC_DIRECTUS_APP_URL                │
 * │ Force fake 6 guides (ignore API)    │ .env.local → NEXT_PUBLIC_TOUR_GUIDES_USE_DUMMY=true      │
 * │ Fake guide rows for UI only         │ dummyTourGuides.ts → DUMMY_TOURIST_GUIDES                │
 * │ API field names / response shape    │ types.ts → interface ApiTouristGuide                     │
 * │ API row → card + filters            │ this file → transformTourGuide()                         │
 * │ Full URL path for the list request  │ fetchTourGuides() below → fetch(`${directusUrl}/items/…`) │
 * │ JSON type for HTTP body             │ this file → TouristGuidesApiResponse (must be { data: [] })│
 * │ Secret token (never NEXT_PUBLIC_)   │ Prefer app/api/... route + fetch from server; or add     │
 * │                                     │ headers inside fetchTourGuides (not safe for secrets).   │
 * │ Remote guide photo domains          │ next.config.ts → images.remotePatterns                   │
 * │ Page that loads the data            │ app/tour-guides/page.tsx → fetchTourGuides()             │
 * │ “Register as guide” button URL      │ TourGuidesBanner.tsx → NEXT_PUBLIC_TOUR_GUIDE_REGISTER_URL│
 * └─────────────────────────────────────┴──────────────────────────────────────────────────────────┘
 *
 * Decision order (what runs):
 *   NEXT_PUBLIC_TOUR_GUIDES_USE_DUMMY === "true"     → dummyTourGuides.ts only
 *   NEXT_PUBLIC_DIRECTUS_APP_URL missing            → dummyTourGuides.ts + console warning
 *   else                                            → GET {URL}/items/tourist_guides (change path in fetch)
 *
 * If the real API is not Directus or not { data: [...] }:
 *   1. Change the fetch URL string in fetchTourGuides.
 *   2. Parse JSON into an array, then map each item through transformTourGuide — or adjust ApiTouristGuide + transformTourGuide to match your JSON.
 */

import { DUMMY_TOURIST_GUIDES } from "./dummyTourGuides";
import type {
  ApiTouristGuide,
  FetchTourGuidesResult,
  TourGuideWithFilterMeta,
  TourGuidesFilterOptions,
  TouristGuidesApiResponse,
} from "./types";

export type {
  ApiTouristGuide,
  FetchTourGuidesResult,
  FilterOptionWithCount,
  TourGuideWithFilterMeta,
  TourGuidesFilterOptions,
  TouristGuidesApiResponse,
} from "./types";

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

  const specializations = Array.from(specCounts.entries())
    .map(([id, count]) => ({ id, label: id, count }))
    .sort((a, b) => b.count - a.count);

  const genderOptions = Array.from(genderCounts.entries())
    .map(([id, count]) => ({ id, label: id, count }))
    .sort((a, b) => b.count - a.count);

  const transportation = [
    { id: "yes", label: "متوفر", count: withTransport },
    { id: "no", label: "غير متوفر", count: withoutTransport },
  ];

  return { specializations, gender: genderOptions, transportation };
}

function resultFromApiRows(rows: ApiTouristGuide[]): FetchTourGuidesResult {
  const guides = rows.map(transformTourGuide);
  const filterOptions = buildFilterOptions(rows);
  return { guides, filterOptions };
}

export async function fetchTourGuides(): Promise<FetchTourGuidesResult> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");
  const forceDummy = process.env.NEXT_PUBLIC_TOUR_GUIDES_USE_DUMMY === "true";

  if (forceDummy || !directusUrl) {
    if (!directusUrl && !forceDummy) {
      console.warn(
        "[tour-guides] NEXT_PUBLIC_DIRECTUS_APP_URL is not set — using dummy data. See components/tour-guides/data.ts"
      );
    }
    return resultFromApiRows(DUMMY_TOURIST_GUIDES);
  }

  try {
    // TODO(backend): Confirm collection slug and query params (?fields=*, etc.) with the API owner.
    const response = await fetch(`${directusUrl}/items/tourist_guides`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tour guides: ${response.status} ${response.statusText}`);
    }

    const apiData: TouristGuidesApiResponse = await response.json();
    if (!Array.isArray(apiData.data)) {
      return {
        guides: [],
        filterOptions: { specializations: [], gender: [], transportation: [] },
      };
    }

    return resultFromApiRows(apiData.data);
  } catch (error) {
    console.error("Error fetching tour guides:", error);
    // TODO(backend): Optionally fall back to DUMMY_TOURIST_GUIDES in development.
    return {
      guides: [],
      filterOptions: { specializations: [], gender: [], transportation: [] },
    };
  }
}
