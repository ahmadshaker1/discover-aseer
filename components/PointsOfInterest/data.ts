import type {
  ApiDestination,
  ApiDestinationResponse,
} from "@/components/destinations/data";
import { stripHtml } from "@/components/event-seasons/utils";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

/** Destination row fields used only by Points of Interest (not in shared transform). */
type PoiApiDestination = ApiDestination & {
  sub_title_orange?: string | null;
  content_of_home_page?: string | null;
  content_of_home_page_en?: string | null;
  content_of_home_page_ar?: string | null;
  destination_content?: string | null;
  destination_content_en?: string | null;
  destination_content_ar?: string | null;
};


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

const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

const isMostlyArabic = (text: string): boolean => {
  const letters = text.replace(/[\s\d\W]/g, "");
  if (!letters) return false;
  const arabic = (letters.match(ARABIC_SCRIPT) ?? []).length;
  return arabic / letters.length > 0.5;
};

const isMostlyLatin = (text: string): boolean => {
  const letters = text.replace(/[\s\d\W]/g, "");
  if (!letters) return false;
  const latin = (letters.match(/[A-Za-z]/g) ?? []).length;
  return latin / letters.length > 0.5;
};

const truncatePlainText = (text: string, maxLength = DESCRIPTION_MAX_LENGTH): string => {
  const plain = text.replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;

  const cut = plain.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed =
    lastSpace > maxLength * 0.55 ? cut.slice(0, lastSpace) : cut;

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

const toRecord = (row: PoiApiDestination): Record<string, unknown> =>
  row as unknown as Record<string, unknown>;

const pickPoiTitle = (row: PoiApiDestination, locale: LocaleCode): string => {
  if (locale === "en") {
    return (
      row.title_en?.trim() ||
      pickLocalizedField(toRecord(row), "title", locale) ||
      row.title_ar?.trim() ||
      row.name_en?.trim() ||
      row.name?.trim() ||
      ""
    );
  }
  return (
    row.title_ar?.trim() ||
    pickLocalizedField(toRecord(row), "title", locale) ||
    row.title_en?.trim() ||
    row.name_ar?.trim() ||
    row.name?.trim() ||
    ""
  );
};

const pickPoiSubtitle = (row: PoiApiDestination, locale: LocaleCode): string => {
  const record = toRecord(row);
  const localized =
    pickLocalizedField(record, "sub_title", locale) ||
    pickLocalizedField(record, "subtitle", locale) ||
    "";

  const combined = [localized, row.sub_title_orange?.trim()]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (combined) {
    if (locale === "ar" && isMostlyLatin(combined) && !isMostlyArabic(combined)) {
      // CMS subtitle is English-only on this row — skip for Arabic UI
    } else if (locale === "en" && isMostlyArabic(combined) && !isMostlyLatin(combined)) {
      // CMS subtitle is Arabic-only on this row — skip for English UI
    } else {
      return combined;
    }
  }

  const section2 =
    pickLocalizedField(record, "title_section_2", locale) ||
    (locale === "en" ? row.title_section_2_en : row.title_section_2_ar) ||
    row.title_section_2?.trim() ||
    "";

  return section2 || combined;
};

const pickPoiDescriptionHtml = (
  row: PoiApiDestination,
  locale: LocaleCode,
): string => {
  const record = toRecord(row);

  const home =
    pickLocalizedField(record, "content_of_home_page", locale) ||
    row.content_of_home_page?.trim() ||
    "";
  if (home) return home;

  const destinationBody =
    pickLocalizedField(record, "destination_content", locale) ||
    row.destination_content?.trim() ||
    "";
  if (destinationBody) return destinationBody;

  if (locale === "en") {
    return (
      row.content?.trim() ||
      pickLocalizedField(record, "description", locale) ||
      row.description_en?.trim() ||
      row.description?.trim() ||
      row.content_ar?.trim() ||
      row.description_ar?.trim() ||
      ""
    );
  }

  return (
    row.content_ar?.trim() ||
    pickLocalizedField(record, "description", locale) ||
    row.description_ar?.trim() ||
    row.description?.trim() ||
    row.content?.trim() ||
    row.description_en?.trim() ||
    ""
  );
};

const pickPoiLocation = (row: PoiApiDestination, locale: LocaleCode): string => {
  const record = toRecord(row);
  const city =
    pickLocalizedField(record, "city", locale) || row.city?.trim() || "";

  if (city) {
    if (locale === "en" && isMostlyArabic(city)) {
      return row.title_en?.trim() || city;
    }
    if (locale === "ar" && isMostlyLatin(city) && !isMostlyArabic(city)) {
      return row.title_ar?.trim() || city;
    }
    return city;
  }

  const location =
    pickLocalizedField(record, "location", locale) ||
    pickLocalizedField(record, "address", locale) ||
    row.location?.trim() ||
    row.address?.trim() ||
    "";

  if (location) return location;

  return locale === "en"
    ? row.title_en?.trim() || row.title_ar?.trim() || ""
    : row.title_ar?.trim() || row.title_en?.trim() || "";
};

const transformApiDestinationToPointOfInterest = (
  row: PoiApiDestination,
  directusUrl: string,
  locale: LocaleCode,
): PointOfInterest => {
  const image =
    resolvePoiImageUrl(
      row.hero_image_new ||
        row.hero_image ||
        row.hero_image_1 ||
        row.cover_image ||
        row.destination_image,
      directusUrl,
    ) || FALLBACK_IMAGE;

  return {
    id: String(row.id),
    image,
    title: pickPoiTitle(row, locale),
    subtitle: pickPoiSubtitle(row, locale),
    location: pickPoiLocation(row, locale),
    description: excerptFromHtml(pickPoiDescriptionHtml(row, locale)),
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
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch points of interest: ${response.statusText}`,
      );
    }

    const apiData: ApiDestinationResponse = await response.json();
    const rows = (Array.isArray(apiData.data) ? apiData.data : []) as PoiApiDestination[];

    return rows
      .filter((row) => !row.status || row.status === "published")
      .map((row) =>
        transformApiDestinationToPointOfInterest(row, directusUrl, locale),
      );
  } catch (error) {
    console.error("Error fetching points of interest:", error);
    return [];
  }
};
