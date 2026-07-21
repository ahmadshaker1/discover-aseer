import { stripHtml } from "@/components/event-seasons/utils";
import {
  type ApiDestination,
  type ApiDestinationResponse,
  pickDestinationHomePageContent,
  pickDestinationPoiSubtitle,
  pickDestinationTitle,
  resolveDestinationHeroImageUrl,
} from "@/components/destinations/data";
import type { LocaleCode } from "@/lib/i18n/localized";

/** Home carousel destinations (Al Birk → Bisha → Abha → Rijal Almaa). */
const POI_DESTINATION_IDS = [20, 11, 9, 7] as const;

const poiSortIndex = (id: string | number): number => {
  const n = Number(id);
  const index = POI_DESTINATION_IDS.indexOf(n as (typeof POI_DESTINATION_IDS)[number]);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};

export interface PointOfInterest {
  id: string;
  image: string;
  title: string;
  /** Terrain / area label from Directus `tda`. */
  tda: string;
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

const transformDestinationToPointOfInterest = (
  row: ApiDestination,
  directusUrl: string,
  locale: LocaleCode,
): PointOfInterest => {
  const title = pickDestinationTitle(row, locale);
  const subtitle = pickDestinationPoiSubtitle(row, locale);
  const image =
    resolveDestinationHeroImageUrl(row, directusUrl) || FALLBACK_IMAGE;
  const descriptionHtml = pickDestinationHomePageContent(row, locale);

  return {
    id: String(row.id),
    image,
    title,
    tda: typeof row.tda === "string" ? row.tda.trim() : "",
    subtitle,
    location: subtitle,
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
    const response = await fetch(`${directusUrl}/items/destination`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch points of interest: ${response.statusText}`,
      );
    }

    const apiData: ApiDestinationResponse = await response.json();
    const rows = Array.isArray(apiData.data) ? apiData.data : [];
    const allowedIds = new Set<number>(POI_DESTINATION_IDS);

    return rows
      .filter((row) => allowedIds.has(Number(row.id)))
      .filter((row) => !row.status || row.status === "published")
      .sort((a, b) => poiSortIndex(a.id) - poiSortIndex(b.id))
      .map((row) =>
        transformDestinationToPointOfInterest(row, directusUrl, locale),
      );
  } catch (error) {
    console.error("Error fetching points of interest:", error);
    return [];
  }
};
