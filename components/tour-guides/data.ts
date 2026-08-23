/**
 * Tour guides listing from Directus `items/tourist_guides`.
 * Env: `NEXT_PUBLIC_DIRECTUS_APP_URL`.
 */

import {
  coerceCityId,
  getCityLabelById,
  inferCityIdFromLocation,
} from "@/components/landmarks/filterOptions";
import type { LocaleCode } from "@/lib/i18n/localized";
import { isPublishedTourGuide } from "@/lib/directus/config";
import {
  DIRECTUS_COLLECTION_LIMIT,
  directusCollectionFetch,
  directusItemsUrl,
} from "@/lib/directus/collectionCache";
import {
  buildSpecLabelMapFromApi,
  canonicalizeSpecializationTokens,
  canonicalEnglishSpecLabel,
  FIXED_SPECIALIZATION_FILTERS,
  localizeTourGuideFilterLabel,
  normalizeGuideGender,
  parseSpecializationTokens,
} from "./tourGuideFilterLabels";
import { tourGuidePlaceholderAvatar } from "./tourGuideAvatar";
import type { TourGuideData } from "./TourGuideCard/TourGuideCard";
import type {
  ApiTouristGuide,
  FetchTourGuidesResult,
  TourGuideWithFilterMeta,
  TourGuidesFilterOptions,
  TouristGuidesApiResponse,
} from "./types";

const TOUR_GUIDE_LIST_FIELDS = [
  "id",
  "status",
  "name",
  "name_en",
  "image",
  "phone_number",
  "whatsapp",
  "email",
  "content",
  "content_en",
  "description",
  "description_en",
  "other_languages",
  "website",
  "instagram",
  "x_platform",
  "tiktok",
  "snapchat",
  "gender",
  "arabic_language_level",
  "english_language_level",
  "specializations",
  "specializations_en",
  "city",
  "city_id",
  "transportation",
] as const;

export type {
  ApiTouristGuide,
  FetchTourGuidesResult,
  FilterOptionWithCount,
  TourGuideWithFilterMeta,
  TourGuidesFilterOptions,
  TouristGuidesApiResponse,
} from "./types";

const LANGUAGE_LEVEL_AR: Record<string, string> = {
  advanced: "متقدم",
  intermediate: "متوسط",
  beginner: "مبتدئ",
};

const LANGUAGE_LEVEL_EN: Record<string, string> = {
  advanced: "Advanced",
  intermediate: "Intermediate",
  beginner: "Beginner",
};

function parseSpecializations(raw: string | null): string[] {
  return parseSpecializationTokens(raw);
}

function inferGuideCityId(api: ApiTouristGuide): string | undefined {
  const explicit =
    coerceCityId(typeof api.city === "string" ? api.city : null) ??
    coerceCityId(typeof api.city_id === "string" ? api.city_id : null);
  if (explicit) return explicit;
  const blob = [
    api.description,
    api.description_en,
    api.specializations,
    api.specializations_en,
    api.content,
    api.content_en,
  ]
    .filter((x): x is string => typeof x === "string" && x.length > 0)
    .join(" ");
  return inferCityIdFromLocation(blob);
}

export function filterTourGuidesByCityId(
  guides: TourGuideWithFilterMeta[],
  cityId: string,
): TourGuideWithFilterMeta[] {
  return guides.filter((g) => g.cityId === cityId);
}

export function toTourGuideCardData(
  guide: TourGuideWithFilterMeta,
): TourGuideData {
  const {
    filterSpecializations: _fs,
    hasTransportation: _ht,
    cityId: _c,
    ...rest
  } = guide;
  return rest;
}

function buildLanguages(
  api: ApiTouristGuide,
  locale: LocaleCode,
): Array<{ code: string; name: string; flag: string }> {
  const list: Array<{ code: string; name: string; flag: string }> = [];
  const ar = api.arabic_language_level;
  const en = api.english_language_level;
  const levelMap = locale === "en" ? LANGUAGE_LEVEL_EN : LANGUAGE_LEVEL_AR;

  if (ar) {
    const level = levelMap[ar] ?? ar;
    list.push({
      code: "ar",
      name: locale === "en" ? `Arabic (${level})` : `العربية (${level})`,
      flag: "🇸🇦",
    });
  }
  if (en) {
    const level = levelMap[en] ?? en;
    list.push({
      code: "en",
      name: `English (${level})`,
      flag: "🇬🇧",
    });
  }
  if (list.length === 0) {
    list.push({
      code: "ar",
      name: locale === "en" ? "Arabic" : "العربية",
      flag: "🇸🇦",
    });
  }
  return list;
}

function pickGuideDescription(
  api: ApiTouristGuide,
  locale: LocaleCode,
  specLabelMap: Map<string, string>,
): string {
  if (locale === "en") {
    const text = (
      api.description_en ||
      api.content_en ||
      api.description ||
      api.content ||
      ""
    ).trim();
    if (text) return text;

    const enSpecs = parseSpecializations(api.specializations_en);
    if (enSpecs.length > 0) {
      return enSpecs.map((s) => canonicalEnglishSpecLabel(s)).join(", ");
    }

    const arSpecs = parseSpecializations(api.specializations);
    if (arSpecs.length > 0) {
      return arSpecs
        .map((s) => localizeTourGuideFilterLabel(s, "en", specLabelMap))
        .join(", ");
    }
    return "";
  }

  return (
    (
      api.description ||
      api.content ||
      api.description_en ||
      api.content_en ||
      ""
    ).trim() || (api.specializations || api.specializations_en || "").trim()
  );
}

function buildDisplaySpecialties(
  api: ApiTouristGuide,
  filterSpecializations: string[],
  locale: LocaleCode,
  specLabelMap: Map<string, string>,
): string[] | undefined {
  if (locale === "en") {
    if (filterSpecializations.length > 0) {
      return filterSpecializations.map((s) =>
        localizeTourGuideFilterLabel(s, "en", specLabelMap),
      );
    }
    const enSpecs = parseSpecializations(api.specializations_en);
    if (enSpecs.length > 0) {
      return enSpecs.map((label) => canonicalEnglishSpecLabel(label));
    }
    return undefined;
  }
  return filterSpecializations.length > 0 ? filterSpecializations : undefined;
}

export function transformTourGuide(
  api: ApiTouristGuide,
  locale: LocaleCode = "ar",
  specLabelMap: Map<string, string> = new Map(),
): TourGuideWithFilterMeta {
  let phone = (api.whatsapp ?? api.phone_number ?? "")
    .toString()
    .replace(/\D/g, "");
  if (phone.length === 9 && phone.startsWith("5")) phone = `966${phone}`;
  else if (phone.length === 10 && phone.startsWith("05"))
    phone = `966${phone.slice(1)}`;
  const whatsappUrl = phone ? `https://wa.me/${phone}` : "#";
  const description =
    pickGuideDescription(api, locale, specLabelMap) ||
    (locale === "en"
      ? "Professional tour guide in the Aseer region"
      : "مرشد سياحي في منطقة عسير");
  // Fixed filter facets only — free-text / "other" values are dropped.
  const filterSpecializations = canonicalizeSpecializationTokens(
    api.specializations,
  );
  const specialties = buildDisplaySpecialties(
    api,
    filterSpecializations,
    locale,
    specLabelMap,
  );
  const hasTransportation = api.transportation === true;
  const gender = normalizeGuideGender(api.gender);
  // Always use gender placeholders — do not show uploaded CMS profile photos.
  const imageUrl = tourGuidePlaceholderAvatar(gender);
  const cityId = inferGuideCityId(api);
  const locationLabel = cityId
    ? getCityLabelById(cityId, locale)
    : locale === "en"
      ? "Aseer region"
      : "منطقة عسير";
  const name =
    (locale === "en"
      ? (api.name_en || api.name || "").trim()
      : (api.name || api.name_en || "").trim()) ||
    (locale === "en" ? "Tour guide" : "مرشد سياحي");

  return {
    id: api.id,
    name,
    location: locationLabel,
    profileImage: imageUrl,
    languages: buildLanguages(api, locale),
    whatsappUrl,
    description,
    specialties,
    transportation: hasTransportation
      ? locale === "en"
        ? "Available"
        : "متوفر"
      : locale === "en"
        ? "Not available"
        : "غير متوفر",
    availability: locale === "en" ? "Flexible" : "مرن",
    filterSpecializations,
    gender,
    hasTransportation,
    cityId,
  };
}

function buildFilterOptions(
  apiItems: ApiTouristGuide[],
  locale: LocaleCode,
): TourGuidesFilterOptions {
  const specLabelMap = buildSpecLabelMapFromApi(apiItems);
  const specCounts = new Map<string, number>(
    FIXED_SPECIALIZATION_FILTERS.map((item) => [item.id, 0]),
  );
  const genderCounts = new Map<string, number>();
  let withTransport = 0;
  let withoutTransport = 0;

  for (const api of apiItems) {
    const filterSpecializations = canonicalizeSpecializationTokens(
      api.specializations,
    );
    const gender = normalizeGuideGender(api.gender);
    const hasTransportation = api.transportation === true;

    for (const s of filterSpecializations) {
      specCounts.set(s, (specCounts.get(s) ?? 0) + 1);
    }
    if (gender && gender !== "—") {
      genderCounts.set(gender, (genderCounts.get(gender) ?? 0) + 1);
    }
    if (hasTransportation) withTransport += 1;
    else withoutTransport += 1;
  }

  // Always expose the fixed specialization set (never grow from free-text registrations).
  const specializations = FIXED_SPECIALIZATION_FILTERS.map((item) => ({
    id: item.id,
    label: locale === "en" ? item.en : item.id,
    count: specCounts.get(item.id) ?? 0,
  }));
  const genderOptions = Array.from(genderCounts.entries())
    .map(([id, count]) => ({
      id,
      label:
        locale === "en"
          ? localizeTourGuideFilterLabel(id, "en", specLabelMap)
          : id,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const transportation = [
    { id: "yes", label: "توفر مواصلات", count: withTransport },
    { id: "no", label: "غير متوفر", count: withoutTransport },
  ];

  return { specializations, gender: genderOptions, transportation };
}

function resultFromApiRows(
  rows: ApiTouristGuide[],
  locale: LocaleCode,
): FetchTourGuidesResult {
  const specLabelMap = buildSpecLabelMapFromApi(rows);
  const guides = rows.map((api) =>
    transformTourGuide(api, locale, specLabelMap),
  );
  const filterOptions = buildFilterOptions(rows, locale);
  return { guides, filterOptions };
}

const EMPTY_TOUR_GUIDES_RESULT: FetchTourGuidesResult = {
  guides: [],
  filterOptions: { specializations: [], gender: [], transportation: [] },
};

export async function fetchTourGuides(
  locale: LocaleCode = "ar",
): Promise<FetchTourGuidesResult> {
  const directusUrl =
    process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "") ||
    "https://tool-portal.discoveraseer.com";

  if (!directusUrl) {
    return EMPTY_TOUR_GUIDES_RESULT;
  }

  try {
    // TODO(backend): Confirm collection slug and query params (?fields=*, etc.) with the API owner.
    const adminToken = process.env.DIRECTUS_ADMIN_TOKEN;
    const headers: HeadersInit = {};
    if (adminToken) {
      headers["Authorization"] = `Bearer ${adminToken}`;
    }

    const response = await fetch(
      directusItemsUrl(directusUrl, "tourist_guides", {
        fields: TOUR_GUIDE_LIST_FIELDS,
        limit: DIRECTUS_COLLECTION_LIMIT,
        published: true,
      }),
      { ...directusCollectionFetch, headers },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tour guides: ${response.status} ${response.statusText}`,
      );
    }

    const apiData: TouristGuidesApiResponse = await response.json();
    if (!Array.isArray(apiData.data)) {
      return EMPTY_TOUR_GUIDES_RESULT;
    }

    // Defense in depth: never surface drafts on the public listing page.
    const publishedRows = apiData.data.filter(isPublishedTourGuide);
    return resultFromApiRows(publishedRows, locale);
  } catch (error) {
    console.error("Error fetching tour guides:", error);
    return EMPTY_TOUR_GUIDES_RESULT;
  }
}
