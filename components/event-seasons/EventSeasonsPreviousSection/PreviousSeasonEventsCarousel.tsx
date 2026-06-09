"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { PreviousSeasonItem } from "../types";
import PreviousSeasonEventCard from "./PreviousSeasonEventCard";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/shared/icons/CarouselChevrons";

interface PreviousSeasonEventsCarouselProps {
  seasons: PreviousSeasonItem[];
}

function scrollStepPx(scroller: HTMLElement): number {
  const firstCard = scroller.firstElementChild as HTMLElement | null;
  if (!firstCard) return 411; // 387 + 24
  const gapRaw =
    getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap;
  const gap = Number.parseFloat(gapRaw || "24") || 24;
  return firstCard.getBoundingClientRect().width + gap;
}

export default function PreviousSeasonEventsCarousel({
  seasons,
}: PreviousSeasonEventsCarouselProps) {
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollDir = locale === "ar" ? "rtl" : "ltr";
  const isRtl = locale === "ar";

  const syncScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const eps = 2;
    if (max <= eps) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }
    const rtl = getComputedStyle(el).direction === "rtl";
    const sl = el.scrollLeft;
    if (rtl && sl < 0) {
      setCanPrev(sl < -eps);
      setCanNext(sl > -(max - eps));
      return;
    }
    setCanPrev(sl > eps);
    setCanNext(sl < max - eps);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const raf = requestAnimationFrame(() => {
      el.scrollLeft = 0;
      syncScrollState();
    });

    syncScrollState();
    el.addEventListener("scroll", syncScrollState, { passive: true });
    const ro = new ResizeObserver(syncScrollState);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", syncScrollState);
      ro.disconnect();
    };
  }, [seasons, syncScrollState]);

  const scrollByOne = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * scrollStepPx(el),
      behavior: "smooth",
    });
  }, []);

  if (seasons.length === 0) return null;

  return (
    <div className="flex w-full flex-col min-w-0">
      <div
        ref={scrollerRef}
        dir={scrollDir}
        className="flex w-full gap-6 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] md:gap-[24px] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Previous seasons carousel"
      >
        {seasons.map((season) => (
          <PreviousSeasonEventCard key={season.id} season={season} />
        ))}
      </div>

      <div className="mt-4 flex flex-row items-center justify-start rtl:justify-end gap-3 [direction:ltr]">
        <button
          type="button"
          aria-label={isRtl ? tCommon("next") : tCommon("previous")}
          disabled={isRtl ? !canNext : !canPrev}
          onClick={() => scrollByOne(-1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label={isRtl ? tCommon("previous") : tCommon("next")}
          disabled={isRtl ? !canPrev : !canNext}
          onClick={() => scrollByOne(1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
