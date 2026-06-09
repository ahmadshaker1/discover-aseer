"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Accommodation } from "./data";
import AccommodationCard from "./AccommodationCard";

export interface AccommodationExceptionalCarouselProps {
  items: Accommodation[];
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function scrollStepPx(scroller: HTMLElement): number {
  const first = scroller.querySelector("article");
  if (!first) return 316;
  const style = getComputedStyle(scroller);
  const gapRaw = style.gap || style.columnGap;
  const gap = Number.parseFloat(gapRaw || "16") || 16;
  return first.getBoundingClientRect().width + gap;
}

const AccommodationExceptionalCarousel = ({
  items,
}: AccommodationExceptionalCarouselProps) => {
  const t = useTranslations("common");
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
    return () => cancelAnimationFrame(raf);
  }, [items, syncScrollState]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncScrollState();
    el.addEventListener("scroll", syncScrollState, { passive: true });
    const ro = new ResizeObserver(syncScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncScrollState);
      ro.disconnect();
    };
  }, [syncScrollState]);

  const scrollByOne = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = scrollStepPx(el);
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="min-w-0" lang={locale}>
      <h2 className="mb-4 text-start text-xl font-bold text-foreground sm:text-2xl [unicode-bidi:isolate]">
        {t("exceptionalHotels")}
      </h2>
      <div className="rounded-2xl border border-border bg-linear-to-b from-muted to-surface p-6">
        <div
          ref={scrollerRef}
          dir={scrollDir}
          className="-mx-1 flex flex-row gap-4 overflow-x-auto px-1 py-1 [scrollbar-width:thin] scroll-smooth"
        >
          {items.map((a) => (
            <AccommodationCard
              key={a.id}
              accommodation={a}
              layout="carousel"
              showExceptionalTag
            />
          ))}
        </div>

        <div className="mt-4 flex flex-row items-center justify-start rtl:justify-end gap-3 ps-1 [direction:ltr]">
          <button
            type="button"
            aria-label={isRtl ? t("next") : t("previous")}
            disabled={isRtl ? !canNext : !canPrev}
            onClick={() => scrollByOne(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label={isRtl ? t("previous") : t("next")}
            disabled={isRtl ? !canPrev : !canNext}
            onClick={() => scrollByOne(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AccommodationExceptionalCarousel;
