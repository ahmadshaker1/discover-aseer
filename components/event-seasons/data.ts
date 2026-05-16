import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import { getDateFormatLocale } from "./utils";
import type {
  EventSeasonsPageData,
  PreviousSeasonItem,
  SeasonListingItem,
} from "./types";

const SEASONS_ITEMS_PATH = "/items/seasons" as const;
const API_BASE =
  process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_EVENTS_API_BASE?.replace(/\/$/, "") ||
  "https://tool-portal.discoveraseer.com";

const FALLBACK_IMAGES = [
  "/assets/event-seasons/fallback-teal.png",
  "/assets/event-seasons/fallback-purple.png",
] as const;

interface ApiSeason {
  id: string;
  status?: string | null;
  title?: string | null;
  title_ar?: string | null;
  title_en?: string | null;
  image?: string | null;
  banner_image?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  [key: string]: unknown;
}

interface SeasonsApiResponse {
  data: ApiSeason[];
}

function parseDateOnly(value: string | null | undefined): Date | null {
  const clean = (value || "").trim().split("T")[0];
  if (!clean) return null;
  const [year, month, day] = clean.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function todayDateOnly(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function isPublishedSeason(status: string | null | undefined): boolean {
  const value = (status || "").trim().toLowerCase();
  if (!value) return true;
  return value === "published";
}

function isCurrentSeason(endDate: string | null | undefined): boolean {
  const end = parseDateOnly(endDate);
  if (!end) return false;
  return end >= todayDateOnly();
}

function isHappeningNow(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
): boolean {
  const start = parseDateOnly(startDate);
  const end = parseDateOnly(endDate);
  const today = todayDateOnly();
  if (!start || !end) return false;
  return start <= today && today <= end;
}

function normalizeMaybeUrl(value: string | null | undefined): string | null {
  const clean = value?.trim() || "";
  if (!clean) return null;
  if (/^https?:\/\//i.test(clean) || clean.startsWith("/")) return clean;
  return null;
}

function buildAssetUrl(assetId: string | null | undefined): string | null {
  const clean = (assetId || "").trim();
  if (!clean) return null;
  const asUrl = normalizeMaybeUrl(clean);
  if (asUrl) return asUrl;
  return `${API_BASE}/assets/${clean}`;
}

function pickSeasonImage(apiSeason: ApiSeason, fallbackIndex: number): string {
  const fromImage = buildAssetUrl(apiSeason.image);
  const fromBanner = buildAssetUrl(apiSeason.banner_image);
  return (
    fromImage ||
    fromBanner ||
    FALLBACK_IMAGES[fallbackIndex % FALLBACK_IMAGES.length]
  );
}

function formatDate(dateInput: string | null | undefined, locale: LocaleCode): string | null {
  const parsed = parseDateOnly(dateInput);
  if (!parsed) return null;
  return new Intl.DateTimeFormat(getDateFormatLocale(locale), {
    day: "numeric",
    month: "long",
    calendar: "gregory",
  }).format(parsed);
}

function buildDateRange(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  locale: LocaleCode,
): string {
  const start = formatDate(startDate, locale);
  const end = formatDate(endDate, locale);
  if (start && end) return start === end ? start : `${start} - ${end}`;
  return start || end || (locale === "ar" ? "غير محدد" : "Not specified");
}

function seasonYears(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
): number[] {
  const start = parseDateOnly(startDate);
  const end = parseDateOnly(endDate);
  if (!start && !end) return [todayDateOnly().getFullYear()];
  if (!start) return [end!.getFullYear()];
  if (!end) return [start.getFullYear()];

  const years: number[] = [];
  for (let y = start.getFullYear(); y <= end.getFullYear(); y += 1) {
    years.push(y);
  }
  return years.length > 0 ? years : [start.getFullYear()];
}

function transformToListingItem(
  apiSeason: ApiSeason,
  locale: LocaleCode,
  fallbackIndex: number,
): SeasonListingItem {
  const title =
    pickLocalizedField(apiSeason, "title", locale) ||
    (locale === "ar" ? "موسم بدون عنوان" : "Untitled season");

  const years = seasonYears(apiSeason.start_date, apiSeason.end_date);

  return {
    id: apiSeason.id,
    year: years[0],
    years,
    title,
    imageUrl: pickSeasonImage(apiSeason, fallbackIndex),
    dateRange: buildDateRange(apiSeason.start_date, apiSeason.end_date, locale),
    isHappeningNow: isHappeningNow(apiSeason.start_date, apiSeason.end_date),
  };
}

function transformToPreviousItem(
  apiSeason: ApiSeason,
  locale: LocaleCode,
  fallbackIndex: number,
): PreviousSeasonItem {
  const title =
    pickLocalizedField(apiSeason, "title", locale) ||
    (locale === "ar" ? "موسم بدون عنوان" : "Untitled season");

  return {
    id: apiSeason.id,
    title,
    imageUrl: pickSeasonImage(apiSeason, fallbackIndex),
    dateRange: buildDateRange(apiSeason.start_date, apiSeason.end_date, locale),
  };
}

function sortCurrentSeasons(a: ApiSeason, b: ApiSeason): number {
  const aEnd = parseDateOnly(a.end_date)?.getTime() ?? 0;
  const bEnd = parseDateOnly(b.end_date)?.getTime() ?? 0;
  return aEnd - bEnd;
}

function sortPreviousSeasons(a: ApiSeason, b: ApiSeason): number {
  const aEnd = parseDateOnly(a.end_date)?.getTime() ?? 0;
  const bEnd = parseDateOnly(b.end_date)?.getTime() ?? 0;
  return bEnd - aEnd;
}

async function fetchApiSeasons(): Promise<ApiSeason[]> {
  const response = await fetch(`${API_BASE}${SEASONS_ITEMS_PATH}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch seasons: ${response.status} ${response.statusText}`);
  }

  const apiData: SeasonsApiResponse = await response.json();
  return apiData.data.filter((item) => isPublishedSeason(item.status));
}

export async function fetchEventSeasonsPageData(
  locale: LocaleCode = "ar",
): Promise<EventSeasonsPageData> {
  try {
    const rows = await fetchApiSeasons();

    const currentRows = rows
      .filter((row) => isCurrentSeason(row.end_date))
      .sort(sortCurrentSeasons);
    const previousRows = rows
      .filter((row) => !isCurrentSeason(row.end_date))
      .sort(sortPreviousSeasons);

    return {
      currentSeasons: currentRows.map((row, index) =>
        transformToListingItem(row, locale, index),
      ),
      previousSeasons: previousRows.map((row, index) =>
        transformToPreviousItem(row, locale, index),
      ),
    };
  } catch (error) {
    console.error("[event-seasons] Failed to fetch seasons:", error);
    return { currentSeasons: [], previousSeasons: [] };
  }
}
