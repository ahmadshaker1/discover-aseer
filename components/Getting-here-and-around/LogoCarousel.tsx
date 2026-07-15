"use client";

import {
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/shared/icons/CarouselChevrons";

const NAV_BTN_CLASS =
  "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35";

export interface LogoCarouselSlide {
  key: string;
  content: ReactNode;
}

interface LogoCarouselProps {
  slides: LogoCarouselSlide[];
  slideClassName?: string;
  spaceBetween?: number;
  className?: string;
}

export default function LogoCarousel({
  slides,
  slideClassName = "w-[220px]! max-w-[220px] shrink-0",
  spaceBetween = 24,
  className = "",
}: LogoCarouselProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const swiperRef = useRef<SwiperType | null>(null);
  const [nav, setNav] = useState({
    show: false,
    canPrev: false,
    canNext: false,
  });

  const isRtl = locale === "ar";
  const scrollDir = isRtl ? "rtl" : "ltr";

  const syncNav = useCallback(
    (s: SwiperType) => {
      if (s.isLocked || slides.length < 2) {
        setNav({ show: false, canPrev: false, canNext: false });
        return;
      }
      const eps = 0.02;
      setNav({
        show: true,
        canPrev: s.progress > eps,
        canNext: s.progress < 1 - eps,
      });
    },
    [slides.length],
  );

  if (slides.length === 0) return null;

  return (
    <div className={`w-full min-w-0 ${className}`} dir={scrollDir}>
      <Swiper
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
        spaceBetween={spaceBetween}
        resistanceRatio={0.85}
        watchOverflow
        className="getting-here-logo-swiper"
        onSwiper={(s) => {
          swiperRef.current = s;
          requestAnimationFrame(() => syncNav(s));
        }}
        onProgress={(s) => syncNav(s)}
        onSlideChange={(s) => syncNav(s)}
        onResize={(s) => syncNav(s)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.key} className={slideClassName}>
            <div key={slide.key} className="h-full w-full">
              {slide.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {nav.show ? (
        <div className="mt-6 flex flex-row items-center justify-start rtl:justify-end gap-3 px-1 [direction:ltr]">
          <button
            type="button"
            aria-label={isRtl ? t("next") : t("previous")}
            disabled={isRtl ? !nav.canNext : !nav.canPrev}
            className={NAV_BTN_CLASS}
            onClick={() => {
              if (isRtl) swiperRef.current?.slideNext(320);
              else swiperRef.current?.slidePrev(320);
            }}
          >
            <ChevronLeftIcon className="ltr:rotate-180" />
          </button>
          <button
            type="button"
            aria-label={isRtl ? t("previous") : t("next")}
            disabled={isRtl ? !nav.canPrev : !nav.canNext}
            className={NAV_BTN_CLASS}
            onClick={() => {
              if (isRtl) swiperRef.current?.slidePrev(320);
              else swiperRef.current?.slideNext(320);
            }}
          >
            <ChevronRightIcon className="ltr:rotate-180" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
