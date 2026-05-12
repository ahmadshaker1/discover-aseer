import { DUMMY_EVENTS } from "./dummyEvents";
import type { EventInterestId, EventListingItem } from "./types";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";

export type { EventListingItem } from "./types";

interface ApiEvent {
  id: number | string;
  title?: string | null;
  title_en?: string | null;
  image?: string | null;
  thumbnail?: string | null;
  hero_mobile?: string | null;
  map?: string | null;
  city?: string | null;
  tags?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  free_event?: string | null;
  price?: string | number | null;
  event_status?: string | null;
  unclickable?: string | boolean | null;
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

function shouldUseEventsDummy(): boolean {
  const flag = process.env.NEXT_PUBLIC_EVENTS_USE_DUMMY;
  if (flag === "true") return true;
  if (flag === "false") return false;
  return process.env.NODE_ENV === "development";
}

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
    if (tag.includes("تراث") || tag.includes("ثقاف") || tag.includes("herit")) ids.add("heritage");
    if (
      tag.includes("طهي") ||
      tag.includes("أكل") ||
      tag.includes("مطعم") ||
      tag.includes("كاف") ||
      tag.includes("culin")
    ) {
      ids.add("culinary");
    }
    if (tag.includes("طبيع") || tag.includes("nature") || tag.includes("بيئ")) ids.add("nature");
    if (tag.includes("ترفي") || tag.includes("entertain")) ids.add("adventure");
  }

  if (ids.size === 0) ids.add(FALLBACK_INTEREST);
  return Array.from(ids);
}

function buildImages(apiEvent: ApiEvent): [string, string, string] {
  const candidates = [
    normalizeMaybeUrl(apiEvent.image),
    normalizeMaybeUrl(apiEvent.thumbnail),
    normalizeMaybeUrl(apiEvent.hero_mobile),
  ].filter(Boolean) as string[];

  const images = candidates.length > 0 ? candidates : [PLACEHOLDER_IMAGE];
  while (images.length < 3) images.push(images[images.length - 1]);
  return [images[0], images[1], images[2]];
}

function formatDate(dateInput: string | null | undefined, locale: LocaleCode): string | null {
  const clean = (dateInput || "").trim();
  if (!clean) return null;
  const date = new Date(clean);
  if (Number.isNaN(date.getTime())) return clean;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
    day: "numeric",
    month: "long",
  }).format(date);
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

function toPriceLabel(
  isFree: boolean,
  price: string | number | null | undefined,
  locale: LocaleCode,
): string {
  if (isFree) return locale === "ar" ? "مجاني" : "Free";
  if (typeof price === "number" && Number.isFinite(price)) return `${price} ريال`;
  const clean = typeof price === "string" ? price.trim() : "";
  if (!clean) return locale === "ar" ? "غير محدد" : "Not specified";
  if (clean.includes("ريال") || clean.includes("SAR")) return clean;
  if (/^\d+(\.\d+)?$/.test(clean)) return `${clean} ريال`;
  return clean;
}

function toMapsUrl(mapUrl: string | null | undefined, title: string): string {
  const direct = normalizeMaybeUrl(mapUrl);
  if (direct) return direct;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title)}`;
}

function isPublishedEvent(eventStatus: string | null | undefined): boolean {
  const value = (eventStatus || "").trim().toLowerCase();
  if (!value) return true;
  return !["draft", "hidden", "archived"].includes(value);
}

function isClickableEvent(flag: string | boolean | null | undefined): boolean {
  if (typeof flag === "boolean") return !flag;
  const value = (flag || "").toString().trim().toLowerCase();
  return !["true", "1", "yes"].includes(value);
}

export function transformApiEventToListingItem(
  apiEvent: ApiEvent,
  locale: LocaleCode = "ar",
): EventListingItem {
  const title = pickLocalizedField(apiEvent, "title", locale) || (locale === "ar" ? "فعالية بدون عنوان" : "Untitled event");
  const city = (apiEvent.city || "").trim();

  const freeFromFlag = parseIsFree(apiEvent.free_event);
  const isFree =
    freeFromFlag != null
      ? freeFromFlag
      : apiEvent.price == null || String(apiEvent.price).trim() === "";

  return {
    id: String(apiEvent.id),
    cityId: city ? toSlug(city) : "asir",
    interestIds: parseInterestIds(apiEvent.tags),
    isFree,
    title,
    images: buildImages(apiEvent),
    rating: 4.5,
    reviewsCount: 0,
    priceLabel: toPriceLabel(isFree, apiEvent.price, locale),
    locationLine: city ? `${city}، عسير` : locale === "ar" ? "عسير" : "Aseer",
    mapsUrl: toMapsUrl(apiEvent.map, title),
    mapsLinkLabel: city ? `${city}، عسير` : title,
    dateRange: buildDateRange(apiEvent.start_date, apiEvent.end_date, locale),
    timeRange: buildTimeRange(apiEvent.start_time, apiEvent.end_time, locale),
    venueLabel: title,
  };
}

export async function fetchEvents(locale: LocaleCode = "ar"): Promise<EventListingItem[]> {
  if (shouldUseEventsDummy()) {
    return DUMMY_EVENTS;
  }

  try {
    const response = await fetch(`${EVENTS_API_BASE}${EVENTS_ITEMS_PATH}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }

    const apiData: EventsApiResponse = await response.json();

    return apiData.data
      .filter((item) => isPublishedEvent(item.event_status) && isClickableEvent(item.unclickable))
      .map((item) => transformApiEventToListingItem(item, locale));
  } catch (error) {
    console.error("Error fetching events:", error);
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_EVENTS_USE_DUMMY !== "false"
    ) {
      console.warn(
        "[events] Fetch failed - showing dummy list. Set NEXT_PUBLIC_EVENTS_USE_DUMMY=false to force live API."
      );
      return DUMMY_EVENTS;
    }
    return [];
  }
}
