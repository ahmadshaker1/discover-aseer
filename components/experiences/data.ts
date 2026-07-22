import type { LocaleCode } from "@/lib/i18n/localized";
import { isMostlyArabicText } from "@/lib/i18n/localized";
import type { ExperienceCardProps } from "./ExperienceCard/ExperienceCard";

/** Directus API item shape for the experiences collection */
export interface ApiExperience {
  id: number;
  title_eng: string | null;
  description_eng: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  link: string | null;
  highlighted: string | null;
  duration: string | null;
  destination: string | null;
  price_1: string | null;
  minimum_number_of_people: string | null;
  details: string | null;
  type: string | string[] | null;
  type_en?: string | string[] | null;
  tags: string | string[] | null;
  date: string | null;
  tour_agency: string | null;
  /** English tour operator label (CMS). */
  tour_agency_en?: string | null;
  price: number | string | null;
  booking_link: string | null;
  target_audience: string | null;
  tour_audience_en?: string | null;
  status?: string | null;
  duration_En?: string | null;
  [key: string]: unknown;
}

export interface ExperiencesApiResponse {
  data: ApiExperience[];
}

/** Filter option with count for sidebar */
export interface FilterOptionWithCount {
  id: string;
  label: string;
  count: number;
}

export interface FilterOptions {
  cityOptions: FilterOptionWithCount[];
  interests: FilterOptionWithCount[];
  costOptions: FilterOptionWithCount[];
  travelerTypes: FilterOptionWithCount[];
}

/** Experience card props plus fields used for filtering */
export interface ExperienceWithFilterMeta extends ExperienceCardProps {
  filterCity: string | null;
  filterInterests: string[];
  isPaid: boolean;
  filterTravelers: string[];
}

const DEFAULT_IMAGE = "/assets/experiences/experiences.png";

/** CMS `type` value for cooking experiences (Aseer cuisine page). */
export const COOKING_EXPERIENCE_TYPE = "فن الطهي";

/** Common Arabic experience type labels → English when `type_en` is missing. */
const EXPERIENCE_TYPE_AR_TO_EN: Record<string, string> = {
  الطبيعة: "Nature",
  مغامرات: "Adventures",
  "فن الطهي": "Culinary arts",
  ثقافة: "Culture",
  تراث: "Heritage",
  استرخاء: "Relaxation",
};

function isPublishedExperience(api: ApiExperience): boolean {
  return api.status === "published";
}

function buildExperiencesListUrl(directusUrl: string): string {
  const url = new URL(`${directusUrl.replace(/\/$/, "")}/items/experiences`);
  url.searchParams.set("filter[status][_eq]", "published");
  return url.toString();
}

const EMPTY_FETCH_RESULT: FetchExperiencesResult = {
  experiences: [],
  filterOptions: {
    cityOptions: [],
    interests: [],
    costOptions: [],
    travelerTypes: [],
  },
};

type ExperienceFieldValue = string | string[] | null | undefined;

/** Parse `type` / `tags` from arrays, plain text, comma lists, or JSON string arrays. */
function parseExperienceFieldTokens(raw: ExperienceFieldValue): string[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw
      .filter((value): value is string => typeof value === "string")
      .map((value) => normalizeInterestLabel(value))
      .filter(Boolean);
  }

  const trimmed = raw.trim();
  if (!trimmed) return [];

  let entries: string[] = [];
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed)) {
        entries = parsed.filter(
          (value): value is string => typeof value === "string",
        );
      }
    } catch {
      entries = [trimmed];
    }
  } else {
    entries = trimmed.split(",");
  }

  const tokens: string[] = [];
  for (const entry of entries) {
    const label = normalizeInterestLabel(entry);
    if (label) tokens.push(label);
  }
  return tokens;
}

function getExperienceTypeTokens(
  api: ApiExperience,
  locale: LocaleCode = "ar",
): string[] {
  if (locale === "en") {
    const enTokens = [
      ...parseExperienceFieldTokens(api.type_en),
      ...parseExperienceFieldTokens(api.tags),
    ];
    if (enTokens.length > 0) return enTokens;

    // Fall back to Arabic type labels only when we can map them to English.
    return parseExperienceFieldTokens(api.type)
      .map((token) => EXPERIENCE_TYPE_AR_TO_EN[token] ?? "")
      .filter(Boolean);
  }
  return [
    ...parseExperienceFieldTokens(api.type),
    ...parseExperienceFieldTokens(api.tags),
  ];
}

export function isCookingExperience(api: ApiExperience): boolean {
  const tokens = getExperienceTypeTokens(api, "ar");
  return tokens.some((token) =>
    COOKING_EXPERIENCE_KEYS.has(normalizeInterestKey(token)),
  );
}

export function matchesExperienceType(
  api: ApiExperience,
  typeFilter: string,
): boolean {
  if (
    normalizeInterestKey(typeFilter) ===
    normalizeInterestKey(COOKING_EXPERIENCE_TYPE)
  ) {
    return isCookingExperience(api);
  }

  const want = normalizeInterestKey(typeFilter);
  const allTokens = [
    ...getExperienceTypeTokens(api, "ar"),
    ...getExperienceTypeTokens(api, "en"),
  ];
  return allTokens.some((token) => normalizeInterestKey(token) === want);
}

function stripHtml(html: string | null | undefined): string {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pickExperienceField(
  api: ApiExperience,
  field: "title" | "description",
  locale: LocaleCode,
): string {
  const primary =
    field === "title"
      ? locale === "en"
        ? api.title_eng
        : api.title
      : locale === "en"
        ? api.description_eng
        : api.description;
  const fallback =
    field === "title"
      ? locale === "en"
        ? api.title
        : api.title_eng
      : locale === "en"
        ? api.description
        : api.description_eng;

  const primaryText = (primary || "").trim();
  if (primaryText) return primaryText;

  const fallbackText = (fallback || "").trim();
  if (!fallbackText) return "";

  // Don't surface Arabic CMS copy on English pages when the EN field is empty.
  if (locale === "en" && isMostlyArabicText(fallbackText)) return "";

  return fallbackText;
}

function formatExperienceDescription(raw: string): string {
  return stripHtml(raw)
    .replace(/\r\n|\r|\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parsePrice(value: number | string | null | undefined): number {
  if (value == null) return 0;
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  const str = String(value).trim();
  const match = str.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function parseGroupSize(value: string | null | undefined): number {
  if (value == null) return 1;
  const n = parseInt(String(value).trim(), 10);
  return Number.isNaN(n) || n < 1 ? 1 : n;
}

function normalizeCityLabel(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

/** Normalize interest/tag string for consistent id */
function normalizeInterestLabel(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function normalizeInterestKey(s: string): string {
  return normalizeInterestLabel(s)
    .normalize("NFKC")
    .replace(/ـ/g, "")
    .toLocaleLowerCase("ar");
}

const COOKING_EXPERIENCE_KEYS = new Set([
  normalizeInterestKey("فن الطهي"),
  normalizeInterestKey("فنون الطهي"),
]);

/** Map target_audience Arabic labels to filter ids */
const TRAVELER_LABEL_TO_ID: Record<string, string> = {
  فردي: "individual",
  "رحلة فردية": "individual",
  زوجين: "couple",
  زوج: "couple",
  مجموعات: "groups",
  "رحلة جماعية": "groups",
  "عائلة وأطفال": "family",
  "عائلة و أطفال": "family",
  "عائلة واطفال": "family",
  "فردي سيدات": "female",
  "مسافرة منفردة": "female",

  individual: "individual",
  "individual trip": "individual",
  couple: "couple",
  groups: "groups",
  "group trip": "groups",
  family: "family",
  "family & kids": "family",
  "family and kids": "family",
  female: "female",
  "solo female traveler": "female",
  "solo female": "female",
};
const TRAVELER_TYPES_AR = [
  { id: "female", label: "مسافرة منفردة" },
  { id: "individual", label: "رحلة فردية" },
  { id: "couple", label: "زوج" },
  { id: "family", label: "عائلة و أطفال" },
  { id: "groups", label: "رحلة جماعية" },
] as const;

const TRAVELER_TYPES_EN = [
  { id: "female", label: "Solo Female Traveler" },
  { id: "individual", label: "Individual Trip" },
  { id: "couple", label: "Couple" },
  { id: "family", label: "Family & Kids" },
  { id: "groups", label: "Group Trip" },
] as const;

function parseFilterInterests(
  api: ApiExperience,
  locale: LocaleCode = "ar",
): string[] {
  const byKey = new Map<string, string>();
  for (const label of getExperienceTypeTokens(api, locale)) {
    const key = normalizeInterestKey(label);
    if (!byKey.has(key)) byKey.set(key, label);
  }
  return Array.from(byKey.keys());
}

function parseFilterTravelers(
  api: ApiExperience,
  locale: LocaleCode = "ar",
): string[] {
  const raw =
    locale === "en"
      ? (api.tour_audience_en || api.target_audience || "").trim()
      : (api.target_audience || "").trim();
  if (!raw) return [];
  const ids: string[] = [];
  const parts = raw
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  for (const part of parts) {
    const key = part.toLowerCase();
    const id =
      TRAVELER_LABEL_TO_ID[key] ??
      TRAVELER_LABEL_TO_ID[key.replace(/\s+/g, " ")];
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

function formatTourAgencyEn(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  // CMS stores slug-style EN labels: tmashi, abha_trips, visit_south
  if (/^[a-z0-9_]+$/i.test(trimmed)) {
    return trimmed
      .split("_")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return trimmed;
}

function pickTourAgency(api: ApiExperience, locale: LocaleCode): string {
  if (locale === "en") {
    const en = (api.tour_agency_en || "").trim();
    if (en) return formatTourAgencyEn(en);
    const ar = (api.tour_agency || "").trim();
    return ar && !isMostlyArabicText(ar) ? ar : "";
  }

  return (api.tour_agency || "").trim();
}

export function transformExperience(
  api: ApiExperience,
  locale: LocaleCode = "ar",
): ExperienceWithFilterMeta {
  const description = formatExperienceDescription(
    pickExperienceField(api, "description", locale),
  );
  const title =
    pickExperienceField(api, "title", locale) ||
    (locale === "en" ? "Experience" : "تجربة");
  const category =
    getExperienceTypeTokens(api, locale)[0] ||
    (locale === "en" ? "Experiences" : "التجارب");
  const imageUrl =
    api.image && api.image.startsWith("http") ? api.image : DEFAULT_IMAGE;
  const bookUrl = (api.booking_link || api.link || "").trim() || "#";
  const price = parsePrice(api.price ?? api.price_1);
  const groupSize = parseGroupSize(api.minimum_number_of_people);
  const provider = pickTourAgency(api, locale) || "—";
  const durationRaw =
    locale === "en"
      ? (api.duration_En || "").trim() || (api.duration || "").trim()
      : (api.duration || "").trim();
  const duration =
    !durationRaw
      ? "—"
      : locale === "en" && isMostlyArabicText(durationRaw)
        ? "—"
        : durationRaw;
  const filterCity = normalizeCityLabel(api.destination || "") || null;
  const filterInterests = parseFilterInterests(api, locale);
  const isPaid = price > 0;
  const filterTravelers = parseFilterTravelers(api, locale);

  return {
    id: api.id,
    imageUrl,
    category,
    title,
    duration,
    description: description.slice(0, 200),
    provider,
    price,
    groupSize,
    bookUrl,
    filterCity,
    filterInterests,
    isPaid,
    filterTravelers,
    type: api.type,
    type_en: api.type_en,
  };
}

function buildFilterOptions(
  apiItems: ApiExperience[],
  locale: LocaleCode = "ar",
): FilterOptions {
  const cityCounts = new Map<string, number>();
  const interestCounts = new Map<string, number>();
  const interestLabels = new Map<string, string>();
  let paidCount = 0;
  let freeCount = 0;
  const travelerCounts = new Map<string, number>();

  for (const api of apiItems) {
    const meta = transformExperience(api, locale);
    if (meta.filterCity) {
      cityCounts.set(
        meta.filterCity,
        (cityCounts.get(meta.filterCity) ?? 0) + 1,
      );
    }
    for (const label of getExperienceTypeTokens(api, locale)) {
      const key = normalizeInterestKey(label);
      if (!interestLabels.has(key)) interestLabels.set(key, label);
    }
    for (const id of meta.filterInterests) {
      interestCounts.set(id, (interestCounts.get(id) ?? 0) + 1);
    }
    if (meta.isPaid) paidCount += 1;
    else freeCount += 1;
    for (const id of meta.filterTravelers) {
      travelerCounts.set(id, (travelerCounts.get(id) ?? 0) + 1);
    }
  }

  const interests: FilterOptionWithCount[] = Array.from(
    interestCounts.entries(),
  )
    .map(([id, count]) => ({ id, label: interestLabels.get(id) ?? id, count }))
    .sort((a, b) => b.count - a.count);

  const cityOptions: FilterOptionWithCount[] = Array.from(cityCounts.entries())
    .map(([id, count]) => ({ id, label: id, count }))
    .sort((a, b) => b.count - a.count);

  const costOptions: FilterOptionWithCount[] =
    locale === "en"
      ? [
          { id: "paid", label: "Paid", count: paidCount },
          { id: "free", label: "Free", count: freeCount },
        ]
      : [
          { id: "paid", label: "مدفوعة", count: paidCount },
          { id: "free", label: "مجانية", count: freeCount },
        ];

  const travelerTypesSource =
    locale === "en" ? TRAVELER_TYPES_EN : TRAVELER_TYPES_AR;
  const travelerTypes: FilterOptionWithCount[] = travelerTypesSource.map(
    ({ id, label }) => ({
      id,
      label,
      count: travelerCounts.get(id) ?? 0,
    }),
  );

  return { cityOptions, interests, costOptions, travelerTypes };
}

export interface FetchExperiencesResult {
  experiences: ExperienceWithFilterMeta[];
  filterOptions: FilterOptions;
}

/**
 * Temporary fallback data for `/experiences`.
 *
 * Required UI/filter data points for each item:
 * - id: unique stable identifier for card key/share actions
 * - imageUrl: hero image URL shown on card
 * - category: top-right badge text
 * - title: main card heading
 * - duration: secondary heading under title
 * - description: short body copy
 * - provider: organizer/agency line
 * - price + currency: pricing display and paid/free logic
 * - groupSize: group capacity shown beside price
 * - bookUrl: CTA target
 * - filterInterests: interest tags used by sidebar filtering
 * - isPaid: cost filter toggle source (paid/free)
 * - filterTravelers: traveler audience tags for sidebar filtering
 */

/**
 * Load one experience by id (Directus single-item endpoint) with fallbacks to the
 * list endpoint and dummy data so `/experiences/[id]` stays in sync with home cards.
 */
export async function fetchExperienceById(
  id: string,
  locale: LocaleCode = "ar",
): Promise<ExperienceWithFilterMeta | null> {
  const trimmed = id.trim();
  if (!trimmed) return null;

  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(
    /\/$/,
    "",
  );

  try {
    const listUrl = new URL(`${directusUrl}/items/experiences`);
    listUrl.searchParams.set("filter[id][_eq]", trimmed);
    listUrl.searchParams.set("filter[status][_eq]", "published");
    listUrl.searchParams.set("limit", "1");

    const res = await fetch(listUrl.toString(), {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json: ExperiencesApiResponse = await res.json();
      const item = json.data[0];
      if (item && item.id != null && isPublishedExperience(item)) {
        return transformExperience(item, locale);
      }
    }
  } catch (error) {
    console.error("Error fetching experience by id:", error);
  }

  try {
    const { experiences } = await fetchExperiences({ locale });
    return experiences.find((e) => String(e.id) === trimmed) ?? null;
  } catch (error) {
    console.error("Error fetching experiences:", error);
  }
  return null;
}

export interface FetchExperiencesOptions {
  /** When set, only items whose `type` field matches (comma-separated values supported). */
  type?: string;
  locale?: LocaleCode;
}

export async function fetchExperiences(
  options?: FetchExperiencesOptions,
): Promise<FetchExperiencesResult> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return EMPTY_FETCH_RESULT;
  }

  try {
    const response = await fetch(buildExperiencesListUrl(directusUrl), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch experiences: ${response.statusText}`);
    }

    const apiData: ExperiencesApiResponse = await response.json();
    const locale = options?.locale ?? "ar";
    const typeFilter = options?.type?.trim();
    const publishedRows = apiData.data.filter(isPublishedExperience);
    const rows = typeFilter
      ? publishedRows.filter((row) => matchesExperienceType(row, typeFilter))
      : publishedRows;

    const experiences = rows.map((row) => transformExperience(row, locale));
    const filterOptions = buildFilterOptions(publishedRows, locale);
    return { experiences, filterOptions };
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return EMPTY_FETCH_RESULT;
  }
}
