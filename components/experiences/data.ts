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
  [key: string]: unknown;
}

export interface ExperiencesApiResponse {
  data: ApiExperience[];
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

export function transformExperience(api: ApiExperience): ExperienceCardProps {
  const description = stripHtml(api.description || api.description_eng || "");
  const title = (api.title || api.title_eng || "").trim() || "تجربة";
  const category = (api.type || api.tags || "").split(",")[0]?.trim() || "التجارب";
  const imageUrl = (api.image && api.image.startsWith("http")) ? api.image : DEFAULT_IMAGE;
  const bookUrl = (api.booking_link || api.link || "").trim() || "#";
  const price = parsePrice(api.price ?? api.price_1);
  const groupSize = parseGroupSize(api.minimum_number_of_people);
  const provider = (api.tour_agency || "").trim() || "—";
  const duration = (api.duration || "").trim() || "—";

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
  };
}

export async function fetchExperiences(): Promise<ExperienceCardProps[]> {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
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
      return [];
    }
    return apiData.data.map(transformExperience);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}
