"use client";

import { Link } from "@/i18n/navigation";
import CuisineRestaurantCard, {
  type CuisineRestaurantCardData,
} from "./CuisineRestaurantCard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  getCityOptions,
  getInterestOptions,
  getPriceOptions,
  inferCityIdFromLocation,
  locationMatchesCityId,
} from "@/components/landmarks/filterOptions";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/shared/icons/CarouselChevrons";


export type AseerCuisineRestaurantCard = CuisineRestaurantCardData;

export interface AseerCuisineRestaurantsSectionData {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  showFilters?: boolean;
  cards: AseerCuisineRestaurantCard[];
}

interface AseerCuisineRestaurantsSectionProps {
  data: AseerCuisineRestaurantsSectionData;
}

type PriceFilterId = "free" | "budget" | "mid-range" | "luxury" | null;

function inferCityId(card: AseerCuisineRestaurantCard): string | undefined {
  return inferCityIdFromLocation(card.location);
}

function inferInterestTags(card: AseerCuisineRestaurantCard): string[] {
  const text = `${card.title} ${card.cuisineType} ${card.location}`;
  const out = new Set<string>();
  if (/مغام|تسلق|هايكنج|adventure/i.test(text)) out.add("adventure");
  if (/ثقاف|تراث|قرية|متحف|culture|heritage/i.test(text)) out.add("culture");
  if (/طبيع|منتزه|جبل|وادي|nature/i.test(text)) out.add("nature");
  if (/طعام|مطعم|مأكولات|شواء|مطبخ|food/i.test(text)) out.add("food");
  if (/استرخ|سبا|relax/i.test(text)) out.add("relaxation");
  if (/تسوق|سوق|shopping/i.test(text)) out.add("shopping");
  if (/تاريخ|اثري|histor/i.test(text)) out.add("historical");
  if (out.size === 0) out.add("food");
  return [...out];
}

function parsePriceBounds(
  card: AseerCuisineRestaurantCard,
): { from: number; to: number } | null {
  const band = card.priceBand?.trim();
  if (band && /^\d+\s*-\s*\d+$/.test(band)) {
    const [a, b] = band.split("-").map((s) => Number(String(s).trim()));
    if (Number.isFinite(a) && Number.isFinite(b)) {
      return { from: Math.min(a, b), to: Math.max(a, b) };
    }
  }
  const pr = card.priceRange?.trim();
  if (pr === "$") return { from: 0, to: 49 };
  if (pr === "$$") return { from: 50, to: 120 };
  if (pr === "$$$") return { from: 120, to: 250 };
  if (pr === "$$$$") return { from: 250, to: 9999 };
  return null;
}

function cardMatchesCity(
  card: AseerCuisineRestaurantCard,
  city: string | null,
): boolean {
  if (!city) return true;
  const inferred = inferCityId(card);
  if (inferred) return inferred === city;
  return locationMatchesCityId(card.location, city);
}

function scrollStepPx(scroller: HTMLElement): number {
  const row = scroller.firstElementChild as HTMLElement | null;
  const firstCard = row?.firstElementChild as HTMLElement | null;
  if (!row || !firstCard) return 306;
  const gapRaw = getComputedStyle(row).columnGap || getComputedStyle(row).gap;
  const gap = Number.parseFloat(gapRaw || "24") || 24;
  return firstCard.getBoundingClientRect().width + gap;
}

const AseerCuisineRestaurantsSection = ({
  data,
}: AseerCuisineRestaurantsSectionProps) => {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const cityOptions = useMemo(() => getCityOptions(locale), [locale]);
  const interestOpts = useMemo(() => getInterestOptions(locale), [locale]);
  const priceOpts = useMemo(() => getPriceOptions(locale), [locale]);
  const [city, setCity] = useState<string | null>(null);
  const [interest, setInterest] = useState<string | null>(null);
  const [price, setPrice] = useState<PriceFilterId>(null);

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

  const filteredCards = useMemo(() => {
    return data.cards.filter((card) => {
      if (!cardMatchesCity(card, city)) return false;

      if (interest) {
        const tags = inferInterestTags(card);
        if (tags.length > 0 && !tags.includes(interest)) return false;
      }

      const bounds = parsePriceBounds(card);
      if (price && bounds) {
        const from = bounds.from;
        const to = bounds.to;
        if (price === "free" && !(from === 0 && to === 0)) return false;
        if (price === "budget" && from >= 50) return false;
        if (price === "mid-range" && (to < 50 || from > 200)) return false;
        if (price === "luxury" && to <= 200) return false;
      }
      return true;
    });
  }, [city, data.cards, interest, price]);

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
  }, [filteredCards, syncScrollState]);

  const scrollByOne = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * scrollStepPx(el),
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1440px] py-8 text-foreground px-2 sm:px-8 md:px-[60px]">
      <div className="flex w-full flex-col gap-8">
        <div className="">
          <div className="flex w-full items-center justify-between">
            <div
              className={`flex min-h-[94px] flex-col gap-2 pb-[10px] pt-[7px] items-start justify-start text-start`}
            >
              <h2
                className="w-full max-w-[620px] text-start text-[48px] font-bold leading-[100%] text-secondary"
              >
                {data.title}
              </h2>
              {data.subtitle ? (
                <p
                  className={`h-[11px] w-[224px] text-[24px] font-bold leading-[119%] text-muted-foreground text-start`}
                >
                  {data.subtitle}
                </p>
              ) : null}
            </div>

            <Link
              href={data.ctaHref}
              className="flex h-[52px] min-w-[161px] items-center justify-center gap-2 rounded-[55px] border border-primary/40 bg-primary px-8 text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90 whitespace-nowrap"
            >
              {data.ctaLabel}
            </Link>
          </div>
        </div>

        {data.showFilters ? (
          <div className="font-brando hide-scrollbar mx-auto mb-2 w-full max-w-[1181px] overflow-x-auto overflow-y-hidden pb-1">
            <div
              className={`flex min-w-max items-center gap-3 px-1 justify-end`}
            >
              <select
                value={city ?? ""}
                onChange={(e) => setCity(e.target.value || null)}
                className="h-[48px] w-[190px] shrink-0 cursor-pointer rounded-full border border-border bg-surface px-4 text-sm text-foreground"
              >
                <option value="">{tCommon("city")}</option>
                {cityOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={interest ?? ""}
                onChange={(e) => setInterest(e.target.value || null)}
                className="h-[48px] w-[230px] shrink-0 cursor-pointer rounded-full border border-border bg-surface px-4 text-sm text-foreground"
              >
                <option value="">{tCommon("interests")}</option>
                {interestOpts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={price ?? ""}
                onChange={(e) =>
                  setPrice((e.target.value as PriceFilterId) || null)
                }
                className="h-[48px] w-[230px] shrink-0 cursor-pointer rounded-full border border-border bg-surface px-4 text-sm text-foreground"
              >
                <option value="">{tCommon("price")}</option>
                {priceOpts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  setCity(null);
                  setInterest(null);
                  setPrice(null);
                }}
                className="h-[48px] shrink-0 cursor-pointer rounded-full border border-border bg-surface px-5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                {tCommon("resetFilters")}
              </button>
            </div>
          </div>
        ) : null}

        <div
          ref={scrollerRef}
          dir={scrollDir}
          className="hide-scrollbar h-[337px] w-full overflow-x-auto overflow-y-hidden pb-5 scroll-smooth"
        >
          <div className="flex min-w-max gap-6 ">
            {filteredCards.map((card) => (
              <CuisineRestaurantCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {filteredCards.length > 0 && (
          <div className="flex flex-row items-center justify-start rtl:justify-end gap-3  [direction:ltr]">
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
      </div>
    </section>
  );
};

export default AseerCuisineRestaurantsSection;
