"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FilmLandscape } from "@/components/film/data";
import { landscapeKeyToDestinationFilter } from "@/components/destinations/filterOptions";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/shared/icons/CarouselChevrons";

interface FilmLandscapesSectionProps {
  landscapes: FilmLandscape[];
  introTitle: string;
  introBody: string;
}

function scrollStepPx(scroller: HTMLElement): number {
  const row = scroller.firstElementChild as HTMLElement | null;
  const firstCard = row?.firstElementChild as HTMLElement | null;
  if (!row || !firstCard) return 306;
  const gapRaw = getComputedStyle(row).columnGap || getComputedStyle(row).gap;
  const gap = Number.parseFloat(gapRaw || "24") || 24;
  return firstCard.getBoundingClientRect().width + gap;
}

const FilmLandscapesSection = ({
  landscapes,
  introTitle,
  introBody,
}: FilmLandscapesSectionProps) => {
  const t = useTranslations("film");
  const locale = useLocale();
  const tCommon = useTranslations("common");

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
  }, [landscapes, syncScrollState]);

  const scrollByOne = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * scrollStepPx(el),
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="mx-auto h-auto w-full max-w-[1600px] bg-background px-4 py-[60px] sm:px-8 md:px-[62px]">
      <div className="mx-auto flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex h-auto w-full flex-col gap-4 text-start lg:w-[450px] shrink-0 lg:h-[265px] lg:gap-8">
          <h2 className="text-[22px] sm:text-[28px] lg:text-[36px] font-bold leading-tight text-foreground">
            {introTitle}
          </h2>
          <p className="text-[15px] font-light leading-7 text-muted-foreground">
            {introBody}
          </p>
        </div>

        <div
          ref={scrollerRef}
          dir={scrollDir}
          className="hide-scrollbar w-full flex-1 overflow-x-auto overflow-y-hidden scroll-smooth"
        >
          <div className="flex min-w-max items-start gap-4 sm:gap-6 pb-2">
            {landscapes.slice(0, 4).map((item) => {
              const label = item.labelKey ? t(item.labelKey) : "";
              const destinationFilter = landscapeKeyToDestinationFilter(
                item.filterId,
              );
              return (
                <Link
                  key={item.id}
                  href={
                    destinationFilter
                      ? {
                          pathname: "/destinations",
                          query: { filter: destinationFilter },
                        }
                      : "/destinations"
                  }
                  className="group relative block h-[240px] w-[220px] sm:h-[305px] sm:w-[282px] shrink-0 overflow-hidden rounded-[10px] shadow-[0px_4.28px_3.37px_0px_rgba(41,72,152,0.01),0px_8.72px_6.97px_0px_rgba(41,72,152,0.02),0px_21.4px_13.91px_0px_rgba(41,72,152,0.02)] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label={t("landscapes.viewDestinations", { label })}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-opacity group-hover:opacity-90"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[91px] rounded-b-[10px] bg-linear-to-b from-transparent to-black p-5">
                    <h3 className="text-start text-[24px] font-bold leading-[119%] text-white">
                      {label}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {landscapes.length > 0 && (
        <div className="mt-6 flex flex-row items-center justify-start rtl:justify-end gap-3 [direction:ltr]">
          <button
            type="button"
            aria-label={isRtl ? tCommon("next") : tCommon("previous")}
            disabled={isRtl ? !canNext : !canPrev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
            onClick={() => scrollByOne(-1)}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label={isRtl ? tCommon("previous") : tCommon("next")}
            disabled={isRtl ? !canPrev : !canNext}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
            onClick={() => scrollByOne(1)}
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </section>
  );
};

export default FilmLandscapesSection;
