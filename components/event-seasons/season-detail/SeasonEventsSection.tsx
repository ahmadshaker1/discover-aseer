"use client";

import EventListingCard from "@/components/events/EventListingCard/EventListingCard";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { SeasonDetail, SeasonDetailEvent, SeasonEventCategoryId } from "../types";
import {
  calendarWindowForDay,
  eachDayInRange,
  eventOccursOnDay,
  formatDateRangeLabel,
  formatMonth,
  parseDateOnly,
  toIsoDateString,
} from "../utils";
import { CalendarArrowNext, CalendarArrowPrev } from "./icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

const VISIBLE_DAYS = 7;

const CATEGORY_ORDER: SeasonEventCategoryId[] = [
  "all",
  "nature",
  "sports",
  "cultural",
  "tech",
  "entertainment",
  "creative",
];

const FILTER_LABEL_KEYS = {
  all: "filterAll",
  nature: "filterNature",
  sports: "filterSports",
  cultural: "filterCultural",
  tech: "filterTech",
  entertainment: "filterEntertainment",
  creative: "filterCreative",
} as const;

interface SeasonEventsSectionProps {
  season: SeasonDetail;
  events: SeasonDetailEvent[];
  initialDayIso: string;
}

export default function SeasonEventsSection({
  season,
  events,
  initialDayIso,
}: SeasonEventsSectionProps) {
  const locale = useLocale();
  const t = useTranslations("eventSeasons");
  const localeCode = locale === "ar" ? "ar" : "en";
  const seasonDays = useMemo(() => {
    const start = parseDateOnly(season.startDate);
    const end = parseDateOnly(season.endDate);
    if (!start || !end) return [];
    return eachDayInRange(start, end);
  }, [season.startDate, season.endDate]);

  const [selectedDayIso, setSelectedDayIso] = useState(initialDayIso);
  const [windowStart, setWindowStart] = useState(() => {
    const dayIndex = seasonDays.findIndex(
      (d) => toIsoDateString(d) === initialDayIso,
    );
    return calendarWindowForDay(dayIndex, seasonDays.length, VISIBLE_DAYS);
  });
  const [activeCategory, setActiveCategory] =
    useState<SeasonEventCategoryId>("all");

  useEffect(() => {
    const idx = seasonDays.findIndex(
      (d) => toIsoDateString(d) === selectedDayIso,
    );
    if (idx < 0) return;
    setWindowStart((current) => {
      if (idx >= current && idx < current + VISIBLE_DAYS) return current;
      return calendarWindowForDay(idx, seasonDays.length, VISIBLE_DAYS);
    });
  }, [selectedDayIso, seasonDays]);

  const visibleDays = useMemo(
    () => seasonDays.slice(windowStart, windowStart + VISIBLE_DAYS),
    [seasonDays, windowStart],
  );

  const periodTitle = useMemo(() => {
    if (visibleDays.length === 0) return season.dateRangeLabel;
    return formatDateRangeLabel(
      visibleDays[0],
      visibleDays[visibleDays.length - 1],
      localeCode,
    );
  }, [visibleDays, season.dateRangeLabel, localeCode]);

  const canScrollPrev = windowStart > 0;
  const canScrollNext = windowStart + VISIBLE_DAYS < seasonDays.length;

  const selectedDay = useMemo(
    () => parseDateOnly(selectedDayIso),
    [selectedDayIso],
  );

  const filteredEvents = useMemo(() => {
    let result = events;

    if (selectedDay) {
      result = result.filter((event) =>
        eventOccursOnDay(
          parseDateOnly(event.startDate),
          parseDateOnly(event.endDate ?? event.startDate),
          selectedDay,
        ),
      );
    }

    if (activeCategory !== "all") {
      result = result.filter((event) =>
        event.categoryIds.includes(activeCategory),
      );
    }

    return result;
  }, [events, activeCategory, selectedDay]);

  if (seasonDays.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-[1009px] px-4 py-12 sm:px-6">
      <div className="flex w-full flex-col items-center gap-[46px]">
        <div className="flex w-full max-w-[640px] flex-col items-center gap-6 text-center">
          <h2
            className="w-full text-center text-[clamp(2rem,8vw,60px)] font-bold leading-none text-primary"
            style={{ fontFamily: ara }}
          >
            {periodTitle}
          </h2>

          {season.description ? (
            <p
              className="max-w-[501px] text-center text-[clamp(1rem,3vw,24px)] font-bold leading-none text-foreground"
              style={{ fontFamily: ara }}
            >
              {season.description}
            </p>
          ) : null}
        </div>

        <div
          dir={localeCode === "ar" ? "rtl" : "ltr"}
          className="flex w-full max-w-[796px] flex-nowrap items-center justify-center"
        >
          <button
            type="button"
            onClick={() =>
              setWindowStart((w) => Math.max(0, w - VISIBLE_DAYS))
            }
            disabled={!canScrollPrev}
            className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground opacity-50 transition enabled:opacity-100 enabled:hover:bg-muted disabled:cursor-not-allowed"
            aria-label={t("scrollDaysPrev")}
          >
            <CalendarArrowPrev className="rtl:rotate-180" />
          </button>

          <div className="mx-6 flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-6 sm:mx-8">
            {visibleDays.map((day) => {
              const iso = toIsoDateString(day);
              const isSelected = iso === selectedDayIso;
              const monthLabel = formatMonth(day, localeCode);

              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setSelectedDayIso(iso)}
                  className={`flex h-[103px] w-[66px] shrink-0 flex-col items-center justify-center gap-2 rounded-[20px] border px-3 py-4 transition ${isSelected
                    ? "border-transparent bg-[url('/assets/event-seasons/selected-day-bg.png')] bg-cover bg-center text-white shadow-sm"
                    : "border-border bg-surface text-[#5C5C5C] dark:text-muted-foreground"
                    }`}
                >
                  <span
                    className="text-center text-[14px] font-normal leading-none"
                    style={{ fontFamily: ibm }}
                  >
                    {t("dayLabel")}
                  </span>
                  <span
                    className="text-[35px] font-bold leading-none"
                    style={{ fontFamily: ara }}
                  >
                    {day.getDate()}
                  </span>
                  <span
                    className="text-center text-[14px] font-normal leading-none"
                    style={{ fontFamily: ibm }}
                  >
                    {monthLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() =>
              setWindowStart((w) =>
                Math.min(
                  Math.max(0, seasonDays.length - VISIBLE_DAYS),
                  w + VISIBLE_DAYS,
                ),
              )
            }
            disabled={!canScrollNext}
            className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground opacity-50 transition enabled:opacity-100 enabled:hover:bg-muted disabled:cursor-not-allowed"
            aria-label={t("scrollDaysNext")}
          >
            <CalendarArrowNext className="rtl:rotate-180" />
          </button>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-3 overflow-visible px-2">
          {CATEGORY_ORDER.map((categoryId) => {
            const isActive = activeCategory === categoryId;
            return (
              <button
                key={categoryId}
                type="button"
                onClick={() => setActiveCategory(categoryId)}
                className={`inline-flex h-[33px] shrink-0 min-w-[72px] items-center justify-center rounded-[20px] border px-[18px] py-2 text-[18px] font-bold leading-none transition ${isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-black/10 bg-surface text-foreground hover:border-primary/30 dark:border-border"
                  }`}
                style={{ fontFamily: ara }}
              >
                {t(FILTER_LABEL_KEYS[categoryId])}
              </button>
            );
          })}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid w-full grid-cols-1 items-start justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventListingCard key={event.listing.id} event={event.listing} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground">
            {events.length === 0
              ? t("noEventsInSeason")
              : t("noEventsForDay")}
          </p>
        )}
      </div>
    </section>
  );
}
