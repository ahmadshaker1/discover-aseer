import {
  getDateFormatLocale,
  parseDateOnly,
} from "@/components/event-seasons/utils";
import type { EventInterestId, EventListingItem } from "./types";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

export type { EventListingItem } from "./types";

interface ApiEvent {
  [key: string]: unknown;
  id: number | string;
  title?: string | null;
  title_en?: string | null;
  image?: string | null;
  thumbnail?: string | null;
  hero_mobile?: string | null;
  map?: string | null;
  city?: string | null;
  city_en?: string | null;
  tags?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  free_event?: string | null;
  price?: string | number | null;
  status?: string | null;
  event_status?: string | null;
  unclickable?: string | boolean | null;
  suitable_for_kids?: boolean | string | number | null;
  audience_type?: string | null;
  image_new?: string | null;
  images?: string | unknown[] | null;
}

interface EventsApiResponse {
  data: ApiEvent[];
}

const PLACEHOLDER_IMAGE = "/assets/experiences/experiences.png";
const EVENTS_ITEMS_PATH = "/items/events" as const;
const EVENTS_API_BASE =
  process.env.NEXT_PUBLIC_EVENTS_API_BASE?.replace(/\/$/, "") ||
  "https://tool-portal.discoveraseer.com";

const FALLBACK_INTEREST: EventInterestId = "heritage";

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function normalizeMaybeUrl(value: string | null | undefined): string | null {
  const clean = value?.trim() || "";
  if (!clean) return null;
  if (/^https?:\/\//i.test(clean) || clean.startsWith("/")) return clean;
  return null;
}

function parseIsFree(value: string | null | undefined): boolean | null {
  const clean = (value || "").trim().toLowerCase();
  if (!clean) return null;
  if (["yes", "true", "1", "free", "مجاني"].includes(clean)) return true;
  if (["no", "false", "0", "paid", "مدفوع"].includes(clean)) return false;
  return null;
}

function parseInterestIds(tags: string | null | undefined): EventInterestId[] {
  const raw = (tags || "").trim();
  if (!raw) return [FALLBACK_INTEREST];

  const tokens = raw
    .split(/[،,]/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const ids = new Set<EventInterestId>();

  for (const tag of tokens) {
    if (tag.includes("مغام") || tag.includes("advent")) ids.add("adventure");
    if (tag.includes("تراث") || tag.includes("ثقاف") || tag.includes("herit"))
      ids.add("heritage");
    if (
      tag.includes("طهي") ||
      tag.includes("أكل") ||
      tag.includes("مطعم") ||
      tag.includes("كاف") ||
      tag.includes("culin")
    ) {
      ids.add("culinary");
    }
    if (tag.includes("طبيع") || tag.includes("nature") || tag.includes("بيئ"))
      ids.add("nature");
    if (tag.includes("ترفي") || tag.includes("entertain")) ids.add("adventure");
  }

  if (ids.size === 0) ids.add(FALLBACK_INTEREST);
  return Array.from(ids);
}

function buildAssetUrl(assetId: string | null | undefined): string | null {
  const clean = (assetId || "").trim();
  if (!clean) return null;
  if (normalizeMaybeUrl(clean)) return normalizeMaybeUrl(clean);
  return `${EVENTS_API_BASE}/assets/${clean}`;
}

function parseExtraImages(
  raw: string | unknown[] | null | undefined,
): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (typeof item === "string")
          return normalizeMaybeUrl(item) || buildAssetUrl(item);
        if (item && typeof item === "object" && "directus_files_id" in item) {
          const id = String(
            (item as { directus_files_id?: string }).directus_files_id || "",
          );
          return buildAssetUrl(id);
        }
        return null;
      })
      .filter(Boolean) as string[];
  }
  const text = String(raw).trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text) as unknown;
    if (Array.isArray(parsed)) return parseExtraImages(parsed);
  } catch {
    // comma-separated URLs or asset ids
  }
  return text
    .split(/[،,]/)
    .map((part) => normalizeMaybeUrl(part.trim()) || buildAssetUrl(part.trim()))
    .filter(Boolean) as string[];
}

function parseKidFriendly(
  suitableForKids: boolean | string | number | null | undefined,
): boolean {
  // Trust the dashboard field only — do not infer from audience_type
  // (e.g. "عائلة" is not the same as "suitable for kids").
  if (suitableForKids == null || suitableForKids === "") return false;
  if (typeof suitableForKids === "boolean") return suitableForKids;
  if (typeof suitableForKids === "number") return suitableForKids === 1;

  const flag = suitableForKids.toString().trim().toLowerCase();
  if (["yes", "true", "1"].includes(flag)) return true;
  if (["no", "false", "0"].includes(flag)) return false;
  return false;
}

function buildImages(apiEvent: ApiEvent): string[] {
  const candidates = [
    normalizeMaybeUrl(apiEvent.image),
    normalizeMaybeUrl(apiEvent.thumbnail),
    normalizeMaybeUrl(apiEvent.hero_mobile),
    buildAssetUrl(apiEvent.image_new),
    ...parseExtraImages(apiEvent.images),
  ].filter(Boolean) as string[];

  const unique = [...new Set(candidates)];
  return unique.length > 0 ? unique : [PLACEHOLDER_IMAGE];
}

function formatDate(
  dateInput: string | null | undefined,
  locale: LocaleCode,
  referenceYear?: number,
): string | null {
  const parsed = parseDateOnly(dateInput, referenceYear);
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
  fallbackDate: string | null | undefined,
  locale: LocaleCode,
  referenceYear?: number,
): string {
  const resolvedStart = startDate || fallbackDate;
  const resolvedEnd = endDate || fallbackDate || startDate;
  const start = formatDate(resolvedStart, locale, referenceYear);
  const end = formatDate(resolvedEnd, locale, referenceYear);
  if (start && end) return start === end ? start : `${start} - ${end}`;
  return start || end || (locale === "ar" ? "غير محدد" : "Not specified");
}

function buildTimeRange(
  startTime: string | null | undefined,
  endTime: string | null | undefined,
  locale: LocaleCode,
): string {
  const start = (startTime || "").trim();
  const end = (endTime || "").trim();
  if (start && end) return `${start} - ${end}`;
  return start || end || (locale === "ar" ? "غير محدد" : "Not specified");
}

function extractNumericPrice(
  price: string | number | null | undefined,
): string {
  if (typeof price === "number" && Number.isFinite(price)) {
    return String(price);
  }
  const clean = typeof price === "string" ? price.trim() : "";
  if (!clean) return "";

  const withoutCurrency = clean
    .replace(/ريال(?:\s*سعودي)?|ر\.?\s*س\.?|SAR|SR|saudi\s*riyals?/gi, " ")
    .trim();

  // Keep digits and common range/decimal separators; drop other text.
  return withoutCurrency
    .replace(/[^\d.,\-–—\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toPriceLabel(
  isFree: boolean,
  price: string | number | null | undefined,
  locale: LocaleCode,
): string {
  if (isFree) return locale === "ar" ? "مجاني" : "Free";

  const numeric = extractNumericPrice(price);
  if (numeric) return numeric;

  // Keep non-numeric price text (e.g. ticket tiers); show a dash when unknown.
  const raw = typeof price === "string" ? price.trim() : "";
  return raw || "—";
}

function toMapsUrl(mapUrl: string | null | undefined, title: string): string {
  const direct = normalizeMaybeUrl(mapUrl);
  if (direct) return direct;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title)}`;
}

/** CMS publish state (`status`), not the seasonal `event_status` (Now/Previous). */
function isPublishedCmsStatus(status: string | null | undefined): boolean {
  const value = (status || "").trim().toLowerCase();
  if (!value) return true;
  return !["archived", "draft", "hidden", "unpublished"].includes(value);
}

function isVisibleEventStatus(eventStatus: string | null | undefined): boolean {
  const value = (eventStatus || "").trim().toLowerCase();
  if (!value) return true;
  return !["draft", "hidden", "archived"].includes(value);
}

export function isListedEvent(apiEvent: {
  status?: string | null;
  event_status?: string | null;
  unclickable?: string | boolean | null;
}): boolean {
  return (
    isPublishedCmsStatus(apiEvent.status) &&
    isVisibleEventStatus(apiEvent.event_status) &&
    isClickableEvent(apiEvent.unclickable)
  );
}

function isClickableEvent(flag: string | boolean | null | undefined): boolean {
  if (typeof flag === "boolean") return !flag;
  const value = (flag || "").toString().trim().toLowerCase();
  return !["true", "1", "yes"].includes(value);
}

function resolveEventReferenceYear(
  apiEvent: ApiEvent,
  referenceYear?: number,
): number | undefined {
  if (referenceYear != null) return referenceYear;
  for (const value of [apiEvent.end_date, apiEvent.start_date, apiEvent.date]) {
    const match = String(value || "").match(/\b((?:19|20)\d{2})\b/);
    if (match) return Number(match[1]);
  }
  return undefined;
}

function isEventOver(apiEvent: ApiEvent, referenceYear?: number): boolean {
  const year = resolveEventReferenceYear(apiEvent, referenceYear);
  const end =
    parseDateOnly(apiEvent.end_date, year) ||
    parseDateOnly(apiEvent.date, year) ||
    parseDateOnly(apiEvent.start_date, year);
  if (!end) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return end.getTime() < today.getTime();
}

export function transformApiEventToListingItem(
  apiEvent: ApiEvent,
  locale: LocaleCode = "ar",
  referenceYear?: number,
): EventListingItem {
  const title =
    pickLocalizedField(apiEvent, "title", locale) ||
    (locale === "ar" ? "فعالية بدون عنوان" : "Untitled event");
  const city = (apiEvent.city || "").trim();
  const year = resolveEventReferenceYear(apiEvent, referenceYear);

  // Only treat as free when CMS explicitly marks `free_event`; missing price ≠ free.
  const isFree = parseIsFree(apiEvent.free_event) === true;

  return {
    id: String(apiEvent.id),
    cityId: city ? toSlug(city) : "asir",
    interestIds: parseInterestIds(apiEvent.tags),
    isFree,
    title,
    images: buildImages(apiEvent),
    isKidFriendly: parseKidFriendly(apiEvent.suitable_for_kids),
    isOver: isEventOver(apiEvent, year),
    priceLabel: toPriceLabel(isFree, apiEvent.price, locale),
    locationLine:
      locale === "ar"
        ? city
          ? `${city}، عسير`
          : "عسير"
        : apiEvent.city_en
          ? `${apiEvent.city_en}, Aseer`
          : "Aseer",
    mapsUrl: toMapsUrl(apiEvent.map, title),
    mapsLinkLabel:
      locale === "ar"
        ? city
          ? `${city}، عسير`
          : title
        : apiEvent.city_en
          ? `${apiEvent.city_en}, Aseer`
          : title,
    dateRange: buildDateRange(
      apiEvent.start_date,
      apiEvent.end_date,
      apiEvent.date,
      locale,
      year,
    ),
    timeRange: buildTimeRange(apiEvent.start_time, apiEvent.end_time, locale),
    price: apiEvent.price,
    startDate: apiEvent.start_date,
    endDate: apiEvent.end_date,
    venueLabel: title,
  };
}

export async function fetchEvents(
  locale: LocaleCode = "ar",
): Promise<EventListingItem[]> {
  try {
    const response = await fetch(`${EVENTS_API_BASE}${EVENTS_ITEMS_PATH}`, {
      next: { revalidate: 0 }, // TODO: restore 3600 collection cache
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch events: ${response.status} ${response.statusText}`,
      );
    }

    const apiData: EventsApiResponse = await response.json();

    return apiData.data
      .filter((item) => isListedEvent(item))
      .map((item) => transformApiEventToListingItem(item, locale));
  } catch (error) {
    console.error("[events] Failed to fetch events:", error);
    return [];
  }
}
