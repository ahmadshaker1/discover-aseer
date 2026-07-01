import { transformApiEventToListingItem } from "@/components/events/data";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import type {
  SeasonDetail,
  SeasonDetailEvent,
  SeasonDetailPageData,
  SeasonEventCategoryId,
} from "./types";
import {
  formatDateRangeLabel,
  parseDateOnly,
  stripHtml,
  toIsoDateString,
} from "./utils";

const API_BASE =
  process.env.NEXT_PUBLIC_DIRECTUS_APP_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_EVENTS_API_BASE?.replace(/\/$/, "") ||
  "https://tool-portal.discoveraseer.com";

function getDirectusHeaders(): HeadersInit | undefined {
  const token = process.env.DIRECTUS_READ_TOKEN?.trim();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

// Public role cannot read `thumbnail`, `hero_mobile`, `start_time`, or `end_time` — requesting them 403s the whole query.
const SEASON_EVENT_FIELDS =
  "id,title,title_en,start_date,end_date,date,image,image_new,map,city,tags,description,free_event,price,not_allowed_for_kids,audience_type,event_status,unclickable";

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
  content?: string | null;
  content_ar?: string | null;
  content_en?: string | null;
  image?: string | null;
  banner_image?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  [key: string]: unknown;
}

interface ApiEvent {
  id: number | string;
  title?: string | null;
  title_en?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  image?: string | null;
  thumbnail?: string | null;
  hero_mobile?: string | null;
  map?: string | null;
  city?: string | null;
  tags?: string | null;
  description?: string | null;
  free_event?: string | null;
  price?: string | number | null;
  event_status?: string | null;
  unclickable?: string | boolean | null;
  [key: string]: unknown;
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
  return normalizeMaybeUrl(clean) || `${API_BASE}/assets/${clean}`;
}

function pickSeasonImage(apiSeason: ApiSeason): string {
  return (
    buildAssetUrl(apiSeason.banner_image) ||
    buildAssetUrl(apiSeason.image) ||
    FALLBACK_IMAGES[0]
  );
}

/** Season detail shows linked events even when CMS marks them as past/previous. */
function isVisibleSeasonEvent(eventStatus: string | null | undefined): boolean {
  const value = (eventStatus || "").trim().toLowerCase();
  if (!value) return true;
  return !["draft", "hidden", "archived"].includes(value);
}

function isClickableEvent(flag: string | boolean | null | undefined): boolean {
  if (typeof flag === "boolean") return !flag;
  const value = (flag || "").toString().trim().toLowerCase();
  return !["true", "1", "yes"].includes(value);
}

function parseTags(raw: string | null | undefined): string[] {
  const clean = (raw || "").trim();
  if (!clean) return [];
  try {
    const parsed = JSON.parse(clean) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map((t) => String(t).trim()).filter(Boolean);
    }
  } catch {
    // fall through
  }
  return clean
    .split(/[،,]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function tagToCategoryId(tag: string): SeasonEventCategoryId | null {
  const t = tag.toLowerCase();
  if (/طبيع|nature|بيئ/.test(t)) return "nature";
  if (/رياض|sport/.test(t)) return "sports";
  if (/ثقاف|تراث|culture|heritage/.test(t)) return "cultural";
  if (/تقن|tech/.test(t)) return "tech";
  if (/ترفيه|entertain/.test(t)) return "entertainment";
  if (/ابداع|إبداع|creative|art/.test(t)) return "creative";
  return null;
}

function categoriesFromTags(tags: string[]): SeasonEventCategoryId[] {
  const ids = new Set<SeasonEventCategoryId>();
  for (const tag of tags) {
    const id = tagToCategoryId(tag);
    if (id) ids.add(id);
  }
  if (ids.size === 0) ids.add("entertainment");
  return Array.from(ids);
}

function transformSeason(
  apiSeason: ApiSeason,
  locale: LocaleCode,
): SeasonDetail {
  const title =
    pickLocalizedField(apiSeason, "title", locale) ||
    (locale === "ar" ? "موسم بدون عنوان" : "Untitled season");

  const htmlContent = pickLocalizedField(apiSeason, "content", locale) || "";

  const start = parseDateOnly(apiSeason.start_date);
  const end = parseDateOnly(apiSeason.end_date);

  return {
    id: apiSeason.id,
    title,
    imageUrl: pickSeasonImage(apiSeason),
    description: stripHtml(htmlContent),
    startDate: start ? toIsoDateString(start) : "",
    endDate: end ? toIsoDateString(end) : "",
    dateRangeLabel:
      start && end
        ? formatDateRangeLabel(start, end, locale)
        : locale === "ar"
          ? "غير محدد"
          : "Not specified",
  };
}

function resolveEventDates(apiEvent: ApiEvent): {
  start: Date | null;
  end: Date | null;
} {
  const fallback = parseDateOnly(apiEvent.date);
  const start = parseDateOnly(apiEvent.start_date) ?? fallback;
  const end = parseDateOnly(apiEvent.end_date) ?? start ?? fallback;
  return { start, end };
}

function transformEvent(
  apiEvent: ApiEvent,
  locale: LocaleCode,
): SeasonDetailEvent {
  const { start, end } = resolveEventDates(apiEvent);

  return {
    listing: transformApiEventToListingItem(apiEvent, locale),
    categoryIds: categoriesFromTags(parseTags(apiEvent.tags)),
    startDate: start ? toIsoDateString(start) : null,
    endDate: end ? toIsoDateString(end) : null,
  };
}

async function fetchSeasonById(id: string): Promise<ApiSeason | null> {
  const params = new URLSearchParams({
    fields:
      "id,title,title_ar,content,content_ar,image,banner_image,start_date,end_date,status",
  });
  const response = await fetch(`${API_BASE}/items/seasons/${id}?${params}`, {
    headers: getDirectusHeaders(),
    next: { revalidate: 3600 },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    console.error(
      `[event-seasons] Failed to fetch season ${id}: ${response.status}`,
    );
    return null;
  }
  const json = (await response.json()) as { data: ApiSeason };
  return json.data ?? null;
}

async function fetchEventIdsForSeason(seasonId: string): Promise<number[]> {
  const params = new URLSearchParams({
    "filter[seasons_id][_eq]": seasonId,
    fields: "events_id",
    limit: "-1",
  });
  const response = await fetch(`${API_BASE}/items/events_seasons?${params}`, {
    headers: getDirectusHeaders(),
    next: { revalidate: 3600 },
  });
  if (!response.ok) return [];
  const json = (await response.json()) as {
    data: { events_id: number }[];
  };
  return json.data.map((row) => row.events_id).filter(Boolean);
}

async function fetchEventsByIds(ids: number[]): Promise<ApiEvent[]> {
  if (ids.length === 0) return [];
  const params = new URLSearchParams({
    "filter[id][_in]": ids.join(","),
    fields: SEASON_EVENT_FIELDS,
    limit: "-1",
  });
  const response = await fetch(`${API_BASE}/items/events?${params}`, {
    headers: getDirectusHeaders(),
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    console.error(
      `[event-seasons] Failed to fetch events by ids: ${response.status}`,
    );
    return [];
  }
  const json = (await response.json()) as { data: ApiEvent[] };
  return json.data ?? [];
}

export async function fetchSeasonDetailPage(
  id: string,
  locale: LocaleCode = "ar",
): Promise<SeasonDetailPageData | null> {
  try {
    const apiSeason = await fetchSeasonById(id);
    if (!apiSeason) return null;

    const season = transformSeason(apiSeason, locale);
    const eventIds = await fetchEventIdsForSeason(id);
    const apiEvents = await fetchEventsByIds(eventIds);

    const events = apiEvents
      .filter(
        (e) =>
          isVisibleSeasonEvent(e.event_status) &&
          isClickableEvent(e.unclickable),
      )
      .map((e) => transformEvent(e, locale));

    return { season, events };
  } catch (error) {
    console.error("[event-seasons] Failed to fetch season detail:", error);
    return null;
  }
}
