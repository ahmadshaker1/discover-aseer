"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/shared/icons/CarouselChevrons";
import {
  FILM_SHOWCASE_FILTERS,
  type FilmShowcaseCard,
  type FilmShowcaseCategory,
} from "@/components/film/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const inter = "var(--font-inter), Inter, sans-serif";

const showcaseCardClass =
  "relative block h-[420px] w-full overflow-hidden rounded-[20px]";

const showcaseCardLinkClass = `${showcaseCardClass} cursor-pointer`;

const NAV_BTN_CLASS =
  "flex h-11 w-11 rotate-180 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35";

interface FilmShowcaseSectionProps {
  cards: FilmShowcaseCard[];
}

const FilmShowcaseSection = ({ cards }: FilmShowcaseSectionProps) => {
  const t = useTranslations("film");
  const tCommon = useTranslations("common");
  const swiperRef = useRef<SwiperType | null>(null);
  const [nav, setNav] = useState({
    show: false,
    canPrev: false,
    canNext: false,
  });
  const [selected, setSelected] = useState<FilmShowcaseCategory>("الكل");

  const syncNav = useCallback((s: SwiperType, count: number) => {
    if (s.isLocked || count < 2) {
      setNav({ show: false, canPrev: false, canNext: false });
      return;
    }
    const eps = 0.02;
    setNav({
      show: true,
      canPrev: s.progress > eps,
      canNext: s.progress < 1 - eps,
    });
  }, []);

  const filterLabels: Record<FilmShowcaseCategory, string> = {
    الكل: t("filterAll"),
    أفلام: t("filterFilms"),
    "أﻓﻼم ﺗﺮوﻳﺠﻴﺔ": t("filterPromo"),
    ﻣﺴﻠﺴﻼت: t("filterSeries"),
    "أفلام ﻣﻮﺳﻴﻘﻴﺔ": t("filterMusic"),
  };

  const visibleCards = useMemo(() => {
    if (selected === "الكل") return cards;
    return cards.filter((c) => c.category === selected);
  }, [cards, selected]);

  return (
    <section className="mx-auto min-h-[839px] w-full max-w-[1442px] bg-background px-4 py-[60px] text-foreground sm:px-8 md:px-[68px]">
      <div className="mx-auto flex w-full max-w-[1306px] flex-col gap-16">
        <header className="h-[96px] w-full">
          <h2
            className={`text-start text-[64px] font-bold leading-[96px] text-foreground`}
            style={{ fontFamily: ara }}
          >
            {t("filmedWorks")}
          </h2>
        </header>

        <div className="flex w-full flex-col gap-8">
          <div className="flex h-[50px] w-full items-center justify-start gap-4 overflow-x-auto">
            {FILM_SHOWCASE_FILTERS.map((filter) => {
              const active = selected === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelected(filter)}
                  className={`h-[50px] min-w-[80px] shrink-0 cursor-pointer border-b-2 px-2 text-center text-[16px] leading-6 ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-foreground"
                  }`}
                  style={{
                    fontFamily: inter,
                    paddingTop: 11.5,
                    paddingBottom: 12.5,
                  }}
                >
                  {filterLabels[filter]}
                </button>
              );
            })}
          </div>

          <div className="w-full min-w-0 overflow-hidden pb-1">
            {visibleCards.length > 0 ? (
              <>
                <Swiper
                  key={selected}
                  dir="rtl"
                  initialSlide={0}
                  modules={[FreeMode, Mousewheel]}
                  grabCursor
                  mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                  }}
                  freeMode={{
                    enabled: true,
                    momentum: true,
                    momentumRatio: 0.55,
                    momentumVelocityRatio: 0.55,
                  }}
                  slidesPerView="auto"
                  spaceBetween={10}
                  resistanceRatio={0.85}
                  watchOverflow
                  className="film-showcase-swiper w-full overflow-hidden"
                  onSwiper={(s) => {
                    swiperRef.current = s;
                    syncNav(s, visibleCards.length);
                  }}
                  onProgress={(s) => syncNav(s, visibleCards.length)}
                  onSlideChange={(s) => syncNav(s, visibleCards.length)}
                  onResize={(s) => syncNav(s, visibleCards.length)}
                >
                  {visibleCards.map((card, index) => {
                    const body = (
                      <>
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          priority={selected === "الكل" && index === 0}
                          className="object-cover"
                          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 690px"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-[120px] bg-linear-to-b from-transparent to-black/80" />
                        <h3
                          className={`absolute bottom-6 start-6 text-start text-[20px] font-bold leading-[30px] text-white`}
                          style={{ fontFamily: ara }}
                        >
                          {card.title}
                        </h3>
                      </>
                    );

                    return (
                      <SwiperSlide
                        key={card.id}
                        className="w-[345px]! max-w-[345px] shrink-0"
                      >
                        {card.watchUrl ? (
                          <a
                            href={card.watchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={showcaseCardLinkClass}
                          >
                            {body}
                          </a>
                        ) : (
                          <article className={showcaseCardClass}>
                            {body}
                          </article>
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                {nav.show ? (
                  <div className="mt-4 flex flex-row items-center justify-center gap-3 sm:justify-start">
                    <button
                      type="button"
                      aria-label={tCommon("previous")}
                      disabled={!nav.canPrev}
                      className={NAV_BTN_CLASS}
                      onClick={() => swiperRef.current?.slidePrev(320)}
                    >
                      <ChevronRightIcon />
                    </button>
                    <button
                      type="button"
                      aria-label={tCommon("next")}
                      disabled={!nav.canNext}
                      className={NAV_BTN_CLASS}
                      onClick={() => swiperRef.current?.slideNext(320)}
                    >
                      <ChevronLeftIcon />
                    </button>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmShowcaseSection;
