import { stripHtml } from "@/components/event-seasons/utils";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

/** Directus collection: `home_featured_destinations` */
interface ApiHomeFeaturedDestination {
  id: string | number;
  status?: string | null;
  sort?: number | null;
  title_ar?: string | null;
  title_en?: string | null;
  category_ar?: string | null;
  category_en?: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  image?: string | null;
}

interface ApiResponse {
  data: ApiHomeFeaturedDestination[];
}

export interface PointOfInterest {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
}

const FALLBACK_IMAGE = "/assets/points-of-interest/Rectangle 2154.jpg";
const DESCRIPTION_MAX_LENGTH = 180;

const truncatePlainText = (
  text: string,
  maxLength = DESCRIPTION_MAX_LENGTH,
): string => {
  const plain = text.replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;

  const cut = plain.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = lastSpace > maxLength * 0.55 ? cut.slice(0, lastSpace) : cut;

  return `${trimmed.trimEnd()}…`;
};

const excerptFromHtml = (
  html: string | null | undefined,
  maxLength = DESCRIPTION_MAX_LENGTH,
): string => {
  if (!html?.trim()) return "";
  return truncatePlainText(stripHtml(html), maxLength);
};

function resolvePoiImageUrl(
  imageAsset: string | null | undefined,
  directusUrl: string,
): string {
  const trimmed = typeof imageAsset === "string" ? imageAsset.trim() : "";
  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("//")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `${directusUrl.replace(/\/$/, "")}/assets/${trimmed}`;
}

const toRecord = (row: ApiHomeFeaturedDestination): Record<string, unknown> =>
  row as unknown as Record<string, unknown>;

const transformHomeFeaturedToPointOfInterest = (
  row: ApiHomeFeaturedDestination,
  directusUrl: string,
  locale: LocaleCode,
): PointOfInterest => {
  const record = toRecord(row);
  const title =
    pickLocalizedField(record, "title", locale) ||
    pickLocalizedField(record, "name", locale) ||
    "";
  const category = pickLocalizedField(record, "category", locale) || "";
  const descriptionHtml =
    pickLocalizedField(record, "description", locale) || "";
  const image =
    resolvePoiImageUrl(row.image, directusUrl) || FALLBACK_IMAGE;

  return {
    id: String(row.id),
    image,
    title,
    subtitle: category,
    location: category,
    description: excerptFromHtml(descriptionHtml),
  };
};

export const fetchPointsOfInterest = async (
  locale: LocaleCode = "ar",
): Promise<PointOfInterest[]> => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(
    /\/$/,
    "",
  );

  if (!directusUrl) {
    console.error("NEXT_PUBLIC_DIRECTUS_APP_URL is not set");
    return [];
  }

  try {
    const response = await fetch(
      `${directusUrl}/items/home_featured_destinations?limit=-1&sort=sort`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch points of interest: ${response.statusText}`,
      );
    }

    const apiData: ApiResponse = await response.json();
    const rows = Array.isArray(apiData.data) ? apiData.data : [];

    return rows
      .filter((row) => !row.status || row.status === "published")
      .sort((a, b) => (a.sort ?? Number(a.id)) - (b.sort ?? Number(b.id)))
      .map((row) =>
        transformHomeFeaturedToPointOfInterest(row, directusUrl, locale),
      );
  } catch (error) {
    console.error("Error fetching points of interest:", error);
    return [];
  }
};
