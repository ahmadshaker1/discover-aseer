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
  interests: FilterOptionWithCount[];
  costOptions: FilterOptionWithCount[];
  travelerTypes: FilterOptionWithCount[];
}

/** Experience card props plus fields used for filtering */
export interface ExperienceWithFilterMeta extends ExperienceCardProps {
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

/** Normalize interest/tag string for consistent id */
function normalizeInterestLabel(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

/** Map target_audience Arabic labels to filter ids */
const TRAVELER_LABEL_TO_ID: Record<string, string> = {
  فردي: "individual",
  زوجين: "couple",
  مجموعات: "groups",
  "عائلة وأطفال": "family",
  "عائلة و أطفال": "family",
  "فردي سيدات": "female",
};
const TRAVELER_ID_TO_LABEL: Record<string, string> = {
  individual: "فردي",
  couple: "زوجين",
  groups: "مجموعات",
  family: "عائلة وأطفال",
  female: "فردي سيدات",
};

function parseFilterInterests(api: ApiExperience): string[] {
  const combined = [api.type, api.tags].filter(Boolean).join(",");
  const tokens = combined.split(",").map((t) => normalizeInterestLabel(t)).filter(Boolean);
  return [...new Set(tokens)];
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
    currency: "ر.س",
    groupSize,
    bookUrl,
    filterInterests,
    isPaid,
    filterTravelers,
  };
}

function buildFilterOptions(apiItems: ApiExperience[]): FilterOptions {
  const interestCounts = new Map<string, number>();
  let paidCount = 0;
  let freeCount = 0;
  const travelerCounts = new Map<string, number>();

  for (const api of apiItems) {
    const meta = transformExperience(api);
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
    .map(([id, count]) => ({ id, label: id, count }))
    .sort((a, b) => b.count - a.count);

  const costOptions: FilterOptionWithCount[] = [
    { id: "paid", label: "مدفوعة", count: paidCount },
    { id: "free", label: "مجانية", count: freeCount },
  ];

  const travelerTypes: FilterOptionWithCount[] = Array.from(travelerCounts.entries())
    .map(([id, count]) => ({ id, label: TRAVELER_ID_TO_LABEL[id] ?? id, count }))
    .sort((a, b) => b.count - a.count);

  return { interests, costOptions, travelerTypes };
}

export interface FetchExperiencesResult {
  experiences: ExperienceWithFilterMeta[];
  filterOptions: FilterOptions;
}

export async function fetchExperiences(): Promise<FetchExperiencesResult> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return { experiences: [], filterOptions: { interests: [], costOptions: [], travelerTypes: [] } };
  }

  try {
    const response = await fetch(`${directusUrl}/items/experiences`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch experiences: ${response.statusText}`);
    }

    const apiData: ExperiencesApiResponse = await response.json();
    if (!Array.isArray(apiData.data)) {
      return { experiences: [], filterOptions: { interests: [], costOptions: [], travelerTypes: [] } };
    }

    const experiences = apiData.data.map(transformExperience);
    const filterOptions = buildFilterOptions(apiData.data);
    return { experiences, filterOptions };
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return { experiences: [], filterOptions: { interests: [], costOptions: [], travelerTypes: [] } };
  }
}
