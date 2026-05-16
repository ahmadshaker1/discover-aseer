import type { LocaleCode } from "@/lib/i18n/localized";

export function parseDateOnly(value: string | null | undefined): Date | null {
  const clean = (value || "").trim();
  if (!clean) return null;

  const dmy = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy) {
    return new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]));
  }

  const iso = clean.split("T")[0];
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export function toIsoDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Gregorian calendar everywhere — avoids server (Hijri) vs browser mismatch on ar-SA. */
export function getDateFormatLocale(locale: LocaleCode): string {
  return locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US";
}

const dateFormatOptions = {
  day: "numeric",
  month: "long",
  calendar: "gregory",
} as const;

export function formatDayMonth(date: Date, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(getDateFormatLocale(locale), dateFormatOptions).format(
    date,
  );
}

export function formatMonth(date: Date, locale: LocaleCode): string {
  return new Intl.DateTimeFormat(getDateFormatLocale(locale), {
    month: "long",
    calendar: "gregory",
  }).format(date);
}

export function formatDateRangeLabel(
  start: Date,
  end: Date,
  locale: LocaleCode,
): string {
  const startLabel = formatDayMonth(start, locale);
  const endLabel = formatDayMonth(end, locale);
  return startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
}

/** Common named entities from Directus rich-text / WYSIWYG fields. */
const NAMED_HTML_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  bull: "•",
  copy: "©",
  reg: "®",
  trade: "™",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201C",
  rdquo: "\u201D",
  laquo: "«",
  raquo: "»",
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      try {
        return String.fromCodePoint(parseInt(hex, 16));
      } catch {
        return " ";
      }
    })
    .replace(/&#(\d+);/g, (_, num) => {
      try {
        return String.fromCodePoint(Number(num));
      } catch {
        return " ";
      }
    })
    .replace(/&#0*39;/gi, "'")
    .replace(/&([a-zA-Z]+);/g, (match, name: string) => {
      const decoded = NAMED_HTML_ENTITIES[name.toLowerCase()];
      return decoded ?? match;
    });
}

/** Plain text from CMS HTML (content / description fields). */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";

  const withoutBlocks = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<\/div>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  return decodeHtmlEntities(withoutBlocks).replace(/\s+/g, " ").trim();
}

export function eachDayInRange(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const last = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  while (cursor <= last) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function eventOccursOnDay(
  eventStart: Date | null,
  eventEnd: Date | null,
  day: Date,
): boolean {
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());

  // No dates on the event — show on every day in the season calendar.
  if (!eventStart && !eventEnd) return true;

  const start = eventStart
    ? new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate())
    : dayStart;
  const end = eventEnd
    ? new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate())
    : start;
  return start <= dayStart && dayStart <= end;
}

/** Default highlighted day in the season calendar (UI only; does not filter events). */
export function pickDefaultCalendarDay(seasonDays: Date[]): string {
  if (seasonDays.length === 0) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = toIsoDateString(today);

  if (seasonDays.some((d) => toIsoDateString(d) === todayIso)) {
    return todayIso;
  }

  return toIsoDateString(seasonDays[0]);
}

export function pickDefaultSeasonDay(
  seasonDays: Date[],
  events: { startDate: string | null; endDate: string | null }[],
): string {
  if (seasonDays.length === 0) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = toIsoDateString(today);

  if (seasonDays.some((d) => toIsoDateString(d) === todayIso)) {
    return todayIso;
  }

  for (const day of seasonDays) {
    const hasEvent = events.some((event) =>
      eventOccursOnDay(
        parseDateOnly(event.startDate),
        parseDateOnly(event.endDate ?? event.startDate),
        day,
      ),
    );
    if (hasEvent) return toIsoDateString(day);
  }

  return toIsoDateString(seasonDays[0]);
}

export function calendarWindowForDay(
  dayIndex: number,
  totalDays: number,
  visibleDays: number,
): number {
  if (dayIndex < 0 || totalDays <= visibleDays) return 0;
  return Math.min(
    Math.floor(dayIndex / visibleDays) * visibleDays,
    Math.max(0, totalDays - visibleDays),
  );
}
