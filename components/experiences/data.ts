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
  type: string | null;
  tags: string | null;
  date: string | null;
  tour_agency: string | null;
  price: number | string | null;
  booking_link: string | null;
  target_audience: string | null;
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

function stripHtml(html: string | null | undefined): string {
  if (!html || typeof html !== "string") return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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
};
const TRAVELER_TYPES = [
  { id: "female", label: "مسافرة منفردة" },
  { id: "individual", label: "رحلة فردية" },
  { id: "couple", label: "زوج" },
  { id: "family", label: "عائلة و أطفال" },
  { id: "groups", label: "رحلة جماعية" },
] as const;

function parseFilterInterests(api: ApiExperience): string[] {
  const combined = [api.type, api.tags].filter(Boolean).join(",");
  const byKey = new Map<string, string>();
  for (const token of combined.split(",")) {
    const label = normalizeInterestLabel(token);
    if (!label) continue;
    const key = normalizeInterestKey(label);
    if (!byKey.has(key)) byKey.set(key, label);
  }
  return Array.from(byKey.keys());
}

function parseFilterTravelers(api: ApiExperience): string[] {
  const raw = (api.target_audience || "").trim();
  if (!raw) return [];
  const ids: string[] = [];
  const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
  for (const part of parts) {
    const id = TRAVELER_LABEL_TO_ID[part] ?? TRAVELER_LABEL_TO_ID[part.replace(/\s+/g, " ")];
    if (id && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

export function transformExperience(api: ApiExperience): ExperienceWithFilterMeta {
  const description = stripHtml(api.description || api.description_eng || "");
  const title = (api.title || api.title_eng || "").trim() || "تجربة";
  const category = (api.type || api.tags || "").split(",")[0]?.trim() || "التجارب";
  const imageUrl = (api.image && api.image.startsWith("http")) ? api.image : DEFAULT_IMAGE;
  const bookUrl = (api.booking_link || api.link || "").trim() || "#";
  const price = parsePrice(api.price ?? api.price_1);
  const groupSize = parseGroupSize(api.minimum_number_of_people);
  const provider = (api.tour_agency || "").trim() || "—";
  const duration = (api.duration || "").trim() || "—";
  const filterCity = normalizeCityLabel(api.destination || "") || null;
  const filterInterests = parseFilterInterests(api);
  const isPaid = price > 0;
  const filterTravelers = parseFilterTravelers(api);

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
  };
}

function buildFilterOptions(apiItems: ApiExperience[]): FilterOptions {
  const cityCounts = new Map<string, number>();
  const interestCounts = new Map<string, number>();
  const interestLabels = new Map<string, string>();
  let paidCount = 0;
  let freeCount = 0;
  const travelerCounts = new Map<string, number>();

  for (const api of apiItems) {
    const meta = transformExperience(api);
    if (meta.filterCity) {
      cityCounts.set(meta.filterCity, (cityCounts.get(meta.filterCity) ?? 0) + 1);
    }
    for (const token of [api.type, api.tags].filter(Boolean).join(",").split(",")) {
      const label = normalizeInterestLabel(token);
      if (!label) continue;
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

  const interests: FilterOptionWithCount[] = Array.from(interestCounts.entries())
    .map(([id, count]) => ({ id, label: interestLabels.get(id) ?? id, count }))
    .sort((a, b) => b.count - a.count);

  const cityOptions: FilterOptionWithCount[] = Array.from(cityCounts.entries())
    .map(([id, count]) => ({ id, label: id, count }))
    .sort((a, b) => b.count - a.count);

  const costOptions: FilterOptionWithCount[] = [
    { id: "paid", label: "مدفوعة", count: paidCount },
    { id: "free", label: "مجانية", count: freeCount },
  ];

  const travelerTypes: FilterOptionWithCount[] = TRAVELER_TYPES.map(
    ({ id, label }) => ({
      id,
      label,
      count: travelerCounts.get(id) ?? 0,
    })
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

function buildFilterOptionsFromExperiences(
  experiences: ExperienceWithFilterMeta[]
): FilterOptions {
  const cityCounts = new Map<string, number>();
  const interestCounts = new Map<string, number>();
  const travelerCounts = new Map<string, number>();
  let paidCount = 0;
  let freeCount = 0;

  for (const exp of experiences) {
    if (exp.filterCity) {
      cityCounts.set(exp.filterCity, (cityCounts.get(exp.filterCity) ?? 0) + 1);
    }
    for (const interest of exp.filterInterests) {
      interestCounts.set(interest, (interestCounts.get(interest) ?? 0) + 1);
    }
    for (const traveler of exp.filterTravelers) {
      travelerCounts.set(traveler, (travelerCounts.get(traveler) ?? 0) + 1);
    }
    if (exp.isPaid) paidCount += 1;
    else freeCount += 1;
  }

  const interests: FilterOptionWithCount[] = Array.from(interestCounts.entries())
    .map(([id, count]) => ({ id, label: normalizeInterestLabel(id), count }))
    .sort((a, b) => b.count - a.count);

  const cityOptions: FilterOptionWithCount[] = Array.from(cityCounts.entries())
    .map(([id, count]) => ({ id, label: id, count }))
    .sort((a, b) => b.count - a.count);

  const costOptions: FilterOptionWithCount[] = [
    { id: "paid", label: "مدفوعة", count: paidCount },
    { id: "free", label: "مجانية", count: freeCount },
  ];

  const travelerTypes: FilterOptionWithCount[] = TRAVELER_TYPES.map(
    ({ id, label }) => ({
      id,
      label,
      count: travelerCounts.get(id) ?? 0,
    })
  );

  return { cityOptions, interests, costOptions, travelerTypes };
}

/**
 * Load one experience by id (Directus single-item endpoint) with fallbacks to the
 * list endpoint and dummy data so `/experiences/[id]` stays in sync with home cards.
 */
export async function fetchExperienceById(id: string): Promise<ExperienceWithFilterMeta | null> {
  const trimmed = id.trim();
  if (!trimmed) return null;

  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "");



  try {
    const res = await fetch(`${directusUrl}/items/experiences/${encodeURIComponent(trimmed)}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json: { data?: ApiExperience } = await res.json();
      const item = json.data;
      if (item && item.id != null) {
        return transformExperience(item);
      }
    }
  } catch (error) {
    console.error("Error fetching experience by id:", error);
  }

  try {
    const { experiences } = await fetchExperiences();
    return experiences.find((e) => String(e.id) === trimmed) ?? null;
  } catch (error) {
    console.error("Error fetching experiences:", error);
  }
  return null;
}

export async function fetchExperiences(): Promise<FetchExperiencesResult> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  try {
    const response = await fetch(`${directusUrl}/items/experiences`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch experiences: ${response.statusText}`);
    }

    const apiData: ExperiencesApiResponse = await response.json();


    const experiences = apiData.data.map(transformExperience);
    if (experiences.length === 0) {
      // Fallback when API is healthy but collection has no records yet.
      return {
        experiences: DUMMY_EXPERIENCES,
        filterOptions: buildFilterOptionsFromExperiences(DUMMY_EXPERIENCES),
      };
    }
    const filterOptions = buildFilterOptions(apiData.data);
    return { experiences, filterOptions };
  } catch (error) {
    console.error("Error fetching experiences:", error);
    // Network/API fallback.
    return {
      experiences: DUMMY_EXPERIENCES,
      filterOptions: buildFilterOptionsFromExperiences(DUMMY_EXPERIENCES),
    };
  }
}
