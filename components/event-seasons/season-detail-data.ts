import { transformApiEventToListingItem } from "@/components/events/data";
import { pickLocalizedField, type LocaleCode } from "@/lib/i18n/localized";
import type {
  SeasonDetail,
  SeasonDetailEvent,
  SeasonDetailPageData,
  SeasonEventCategoryId,
  SeasonEventDetail,
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

// Public role cannot read removed/restricted fields — requesting them 403s the whole query.
// Gone from schema: `date`, `tags`, `unclickable`, `not_allowed_for_kids`, `thumbnail`, `hero_mobile`, `start_time`, `end_time`.
// `season` is an M2M via `events_seasons`; bare `season` values are junction row ids, so read `season.seasons_id`.
const SEASON_EVENT_FIELDS =
  "id,title,title_en,start_date,end_date,image,image_new,map,city,description,description_en,free_event,price,suitable_for_kids,audience_type,event_status,type_ar,type_en,season.seasons_id";

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
  description_en?: string | null;
  free_event?: string | null;
  price?: string | number | null;
  event_status?: string | null;
  unclickable?: string | boolean | null;
  tags?: string | null;
  /** Multi-select event types from CMS, e.g. `["nature", "entertainment"]`. */
  type_en?: string[] | string | null;
  type_ar?: string[] | string | null;
  /**
   * M2M via `events_seasons`. With `fields=season` Directus returns junction ids;
   * with `fields=season.seasons_id` it returns `{ seasons_id: "<uuid>" }` objects.
   */
  season?: Array<number | string | { seasons_id?: number | string | null }> | null;
  [key: string]: unknown;
}

function eventSeasonIds(apiEvent: ApiEvent): string[] {
  const seasons = apiEvent.season;
  if (!Array.isArray(seasons) || seasons.length === 0) return [];
  return seasons
    .map((entry) => {
      if (entry == null) return "";
      if (typeof entry === "object") return String(entry.seasons_id ?? "");
      return String(entry);
    })
    .filter(Boolean);
}

function eventBelongsToSeason(apiEvent: ApiEvent, seasonId: string): boolean {
  return eventSeasonIds(apiEvent).some((id) => id === String(seasonId));
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

function normalizeTypeTokens(
  value: string[] | string | null | undefined,
): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    const clean = value.trim();
    if (!clean) return [];
    try {
      const parsed = JSON.parse(clean) as unknown;
      if (Array.isArray(parsed)) return normalizeTypeTokens(parsed as string[]);
    } catch {
      // comma-separated fallback
    }
    return clean
      .split(/[،,]/)
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [];
}

function typeToCategoryId(token: string): SeasonEventCategoryId | null {
  const t = token.toLowerCase().trim();
  if (!t) return null;
  if (t === "nature" || /طبيع|بيئ/.test(t)) return "nature";
  if (t === "sports" || t === "sport" || /رياض/.test(t)) return "sports";
  if (
    t === "cultural" ||
    t === "culture" ||
    /ثقاف|تراث|heritage/.test(t)
  ) {
    return "cultural";
  }
  if (t === "tech" || /تقن/.test(t)) return "tech";
  if (t === "entertainment" || /ترفيه/.test(t)) return "entertainment";
  if (t === "creative" || /ابداع|إبداع|art/.test(t)) return "creative";
  return null;
}

/** Map CMS multi-select types (`type_en` / `type_ar`) onto filter category ids. */
function categoriesFromEventTypes(apiEvent: ApiEvent): SeasonEventCategoryId[] {
  const ids = new Set<SeasonEventCategoryId>();
  const tokens = [
    ...normalizeTypeTokens(apiEvent.type_en),
    ...normalizeTypeTokens(apiEvent.type_ar),
    // Legacy fallback if older records still expose tags.
    ...parseTags(apiEvent.tags),
  ];

  for (const token of tokens) {
    const id = typeToCategoryId(token);
    if (id) ids.add(id);
  }

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

function seasonReferenceYear(apiSeason: ApiSeason): number | undefined {
  const end = parseDateOnly(apiSeason.end_date);
  const start = parseDateOnly(apiSeason.start_date);
  return end?.getFullYear() ?? start?.getFullYear();
}

function resolveEventDates(
  apiEvent: ApiEvent,
  referenceYear?: number,
): {
  start: Date | null;
  end: Date | null;
} {
  const fallback = parseDateOnly(apiEvent.date, referenceYear);
  const start = parseDateOnly(apiEvent.start_date, referenceYear) ?? fallback;
  const end =
    parseDateOnly(apiEvent.end_date, referenceYear) ?? start ?? fallback;
  return { start, end };
}

function transformEvent(
  apiEvent: ApiEvent,
  locale: LocaleCode,
  referenceYear?: number,
): SeasonDetailEvent {
  const { start, end } = resolveEventDates(apiEvent, referenceYear);

  return {
    listing: transformApiEventToListingItem(apiEvent, locale, referenceYear),
    categoryIds: categoriesFromEventTypes(apiEvent),
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

async function fetchEventsForSeason(seasonId: string): Promise<ApiEvent[]> {
  const params = new URLSearchParams({
    // Filter on the related season UUID, not the junction row id.
    "filter[season][seasons_id][_eq]": seasonId,
    fields: SEASON_EVENT_FIELDS,
    limit: "-1",
  });
  const response = await fetch(`${API_BASE}/items/events?${params}`, {
    headers: getDirectusHeaders(),
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    console.error(
      `[event-seasons] Failed to fetch events for season ${seasonId}: ${response.status}`,
    );
    return [];
  }
  const json = (await response.json()) as { data: ApiEvent[] };
  return json.data ?? [];
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

const CATEGORY_LABELS: Record<
  Exclude<SeasonEventCategoryId, "all">,
  { ar: string; en: string }
> = {
  nature: { ar: "طبيعة", en: "Nature" },
  sports: { ar: "رياضة", en: "Sports" },
  cultural: { ar: "ثقافي", en: "Cultural" },
  tech: { ar: "تقنية", en: "Tech" },
  entertainment: { ar: "ترفيه", en: "Entertainment" },
  creative: { ar: "إبداعي", en: "Creative" },
};

function categoryLabelsForEvent(
  categoryIds: SeasonEventCategoryId[],
  locale: LocaleCode,
): string[] {
  return categoryIds
    .filter((id): id is Exclude<SeasonEventCategoryId, "all"> => id !== "all")
    .map((id) => CATEGORY_LABELS[id][locale === "en" ? "en" : "ar"]);
}

function pickEventDescription(apiEvent: ApiEvent, locale: LocaleCode): string {
  const row = apiEvent as Record<string, unknown>;
  const localized =
    pickLocalizedField(row, "description", locale) ||
    (typeof apiEvent.description === "string" ? apiEvent.description : "");
  return stripHtml(localized);
}

export async function fetchSeasonDetailPage(
  id: string,
  locale: LocaleCode = "ar",
): Promise<SeasonDetailPageData | null> {
  try {
    const apiSeason = await fetchSeasonById(id);
    if (!apiSeason) return null;

    const season = transformSeason(apiSeason, locale);
    const referenceYear = seasonReferenceYear(apiSeason);
    const apiEvents = await fetchEventsForSeason(id);

    const events = apiEvents
      .filter(
        (e) =>
          eventBelongsToSeason(e, id) &&
          isVisibleSeasonEvent(e.event_status) &&
          isClickableEvent(e.unclickable),
      )
      .map((e) => transformEvent(e, locale, referenceYear))
      // Newest first — public CMS can't reliably sort by date; id is creation order.
      .sort((a, b) => Number(b.listing.id) - Number(a.listing.id));

    return { season, events };
  } catch (error) {
    console.error("[event-seasons] Failed to fetch season detail:", error);
    return null;
  }
}

async function fetchEventById(eventId: string): Promise<ApiEvent | null> {
  const numericId = Number(eventId);
  if (Number.isFinite(numericId)) {
    const byNumeric = await fetchEventsByIds([numericId]);
    const match = byNumeric.find((e) => String(e.id) === String(eventId));
    if (match) return match;
  }

  const params = new URLSearchParams({
    "filter[id][_eq]": eventId,
    fields: SEASON_EVENT_FIELDS,
    limit: "1",
  });
  const response = await fetch(`${API_BASE}/items/events?${params}`, {
    headers: getDirectusHeaders(),
    next: { revalidate: 3600 },
  });
  if (!response.ok) return null;
  const json = (await response.json()) as { data: ApiEvent[] };
  return json.data?.[0] ?? null;
}

export async function fetchSeasonEventDetail(
  seasonId: string,
  eventId: string,
  locale: LocaleCode = "ar",
): Promise<SeasonEventDetail | null> {
  try {
    const apiSeason = await fetchSeasonById(seasonId);
    if (!apiSeason) return null;

    const apiEvent = await fetchEventById(eventId);
    if (
      !apiEvent ||
      !eventBelongsToSeason(apiEvent, seasonId) ||
      !isVisibleSeasonEvent(apiEvent.event_status) ||
      !isClickableEvent(apiEvent.unclickable)
    ) {
      return null;
    }

    const event = transformEvent(
      apiEvent,
      locale,
      seasonReferenceYear(apiSeason),
    );
    return {
      season: transformSeason(apiSeason, locale),
      event,
      description: pickEventDescription(apiEvent, locale),
      categoryLabels: categoryLabelsForEvent(event.categoryIds, locale),
    };
  } catch (error) {
    console.error("[event-seasons] Failed to fetch event detail:", error);
    return null;
  }
}
