"use client";

import { Link } from "@/i18n/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import CuisineRestaurantCard, {
  type CuisineRestaurantCardData,
} from "@/components/aseer-cuisine/CuisineRestaurantCard";
import type { ExperienceCardProps } from "@/components/experiences/ExperienceCard/ExperienceCard";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/shared/icons/CarouselChevrons";

const FALLBACK_CARD_IMAGE = "/assets/experiences/experiences.png";

/** Home passes ExperienceCardProps; cuisine page passes CuisineRestaurantCardData. */
export type AseerExperiencesSectionCard =
  | CuisineRestaurantCardData
  | ExperienceCardProps;

export interface AseerCuisineCookingExperiencesSectionData {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cards: AseerExperiencesSectionCard[];
}

interface AseerCuisineCookingExperiencesSectionProps {
  data: AseerCuisineCookingExperiencesSectionData;
  /** When set, only this many cards are shown. */
  featuredCount?: number;
  decorationImageSrc?: string;
}

function isCuisineRestaurantCard(
  card: AseerExperiencesSectionCard,
): card is CuisineRestaurantCardData {
  return "image" in card && !("imageUrl" in card);
}

function toCuisineCard(
  card: AseerExperiencesSectionCard,
): CuisineRestaurantCardData {
  if (isCuisineRestaurantCard(card)) {
    return {
      ...card,
      image: card.image?.trim() || FALLBACK_CARD_IMAGE,
    };
  }

  return {
    id: String(card.id),
    image: card.imageUrl?.trim() || FALLBACK_CARD_IMAGE,
    title: card.title,
    location: card.provider || card.category || "",
    cuisineType: card.category || card.duration || "",
    priceRange: card.price > 0 ? String(card.price) : "",
    rating: 4.5,
    reviewsCount: 0,
  };
}

function scrollStepPx(scroller: HTMLElement): number {
  const row = scroller.firstElementChild as HTMLElement | null;
  const firstCard = row?.firstElementChild as HTMLElement | null;
  if (!row || !firstCard) return 306;
  const gapRaw = getComputedStyle(row).columnGap || getComputedStyle(row).gap;
  const gap = Number.parseFloat(gapRaw || "24") || 24;
  return firstCard.getBoundingClientRect().width + gap;
}

const AseerCuisineCookingExperiencesSection = ({
  data,
  featuredCount,
  decorationImageSrc,
}: AseerCuisineCookingExperiencesSectionProps) => {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const displayCards = useMemo(() => {
    const mapped = data.cards.map(toCuisineCard);
    return featuredCount == null ? mapped : mapped.slice(0, featuredCount);
  }, [data.cards, featuredCount]);

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
  }, [displayCards, syncScrollState]);

  const scrollByOne = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    let delta = direction * scrollStepPx(el);
    // RTL scrollLeft sign differs by engine; buttons pass Chrome-oriented deltas.
    if (getComputedStyle(el).direction === "rtl") {
      const original = el.scrollLeft;
      el.scrollLeft = 1;
      const positiveModel = el.scrollLeft > 0;
      el.scrollLeft = original;
      if (!positiveModel) delta = -delta;
    }
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-background py-8 text-foreground">
      {decorationImageSrc ? (
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 z-1 h-[450px] w-[750px] -translate-y-1/2 bg-primary opacity-40 start-0"
          style={{
            WebkitMaskImage: `url(${decorationImageSrc})`,
            maskImage: `url(${decorationImageSrc})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "start center",
            maskPosition: "start center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-2 sm:px-8 md:px-[60px]">
        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex min-w-0 flex-col gap-2 items-start justify-start text-start space-y-8">
              <h2 className="w-full max-w-[620px] text-start text-[48px] font-bold leading-[100%] text-secondary">
                {data.title}
              </h2>
              {data.description ? (
                <p className="w-full max-w-[620px] text-[24px] font-bold leading-[119%] text-muted-foreground text-start">
                  {data.description}
                </p>
              ) : null}
            </div>

            <Link
              href={data.ctaHref}
              className="flex h-[52px] min-w-[161px] shrink-0 items-center justify-center gap-2 rounded-[55px] border border-primary/40 bg-primary px-8 text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90 whitespace-nowrap"
            >
              {data.ctaLabel}
            </Link>
          </div>

          <div
            ref={scrollerRef}
            dir={scrollDir}
            className="hide-scrollbar h-[337px] w-full overflow-x-auto overflow-y-hidden pb-5 scroll-smooth"
          >
            <div className="flex min-w-max gap-6">
              {displayCards.map((card) => (
                <CuisineRestaurantCard
                  key={card.id}
                  card={card}
                  className="shrink-0"
                  href={`/experiences/${card.id}`}
                />
              ))}
            </div>
          </div>

          {displayCards.length > 0 ? (
            <div className="flex flex-row items-center justify-start rtl:justify-end gap-3 [direction:ltr]">
              <button
                type="button"
                aria-label={isRtl ? tCommon("next") : tCommon("previous")}
                disabled={isRtl ? !canNext : !canPrev}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
                onClick={() => scrollByOne(isRtl ? 1 : -1)}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                aria-label={isRtl ? tCommon("previous") : tCommon("next")}
                disabled={isRtl ? !canPrev : !canNext}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35"
                onClick={() => scrollByOne(isRtl ? -1 : 1)}
              >
                <ChevronRightIcon />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineCookingExperiencesSection;
