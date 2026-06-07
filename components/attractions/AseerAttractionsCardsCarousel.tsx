"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import type { Landmark } from "@/components/landmarks/data";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/shared/icons/CarouselChevrons";

/** Horizontal inset for the scroll track and chevron row (aligned). */
const TRACK_PAD =
  "px-5 sm:px-8 md:px-10 lg:px-6 xl:px-8";

const NAV_BTN_CLASS =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35";

function scrollStepPx(scroller: HTMLElement): number {
  const row = scroller.firstElementChild as HTMLElement | null;
  const firstCard = row?.firstElementChild as HTMLElement | null;
  if (!row || !firstCard) return 332;
  const gapRaw = getComputedStyle(row).columnGap || getComputedStyle(row).gap;
  const gap = Number.parseFloat(gapRaw || "32") || 32;
  return firstCard.getBoundingClientRect().width + gap;
}

export interface AseerAttractionsCardsCarouselProps {
  landmarks: Landmark[];
}

export default function AseerAttractionsCardsCarousel({
  landmarks,
}: AseerAttractionsCardsCarouselProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollDir = locale === "ar" ? "rtl" : "ltr";

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
  }, [landmarks, syncScrollState]);

  const isRtl = locale === "ar";

  const scrollByOne = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * scrollStepPx(el),
      behavior: "smooth",
    });
  }, []);

  if (landmarks.length === 0) return null;

  return (
    <div className="flex min-w-0 w-full flex-col lg:flex-1">
      <div
        ref={scrollerRef}
        dir={scrollDir}
        className={`hide-scrollbar relative left-1/2 w-screen max-w-full -translate-x-1/2 overflow-x-auto overflow-y-hidden scroll-smooth lg:left-0 lg:min-w-0 lg:w-full lg:max-w-none lg:shrink-0 lg:translate-x-0 ${TRACK_PAD}`}
      >
        <div className="flex min-w-max gap-8 pb-2">
          {landmarks.map((landmark) => (
            <div key={landmark.id} className="w-[320px] shrink-0">
              <AttractionsLandmarkCard
                landmark={landmark}
                cardHref={`/attractions/${landmark.slug}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`mt-4 flex flex-row items-center justify-start rtl:justify-end gap-3 [direction:ltr] ${TRACK_PAD}`}
      >
        <button
          type="button"
          aria-label={isRtl ? t("next") : t("previous")}
          disabled={isRtl ? !canNext : !canPrev}
          className={NAV_BTN_CLASS}
          onClick={() => scrollByOne(-1)}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label={isRtl ? t("previous") : t("next")}
          disabled={isRtl ? !canPrev : !canNext}
          className={NAV_BTN_CLASS}
          onClick={() => scrollByOne(1)}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
