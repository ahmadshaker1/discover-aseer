"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/shared/icons/CarouselChevrons";
import type { FilmLandscape } from "@/components/film/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";

const NAV_BTN_CLASS =
  "flex h-11 w-11 rotate-180 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-primary shadow-md transition-[opacity,box-shadow] hover:bg-muted hover:shadow-lg disabled:pointer-events-none disabled:opacity-35";

const landscapeCardClass =
  "relative h-[305px] w-full overflow-hidden rounded-[10px] shadow-[0px_4.28px_3.37px_0px_rgba(41,72,152,0.01),0px_8.72px_6.97px_0px_rgba(41,72,152,0.02),0px_21.4px_13.91px_0px_rgba(41,72,152,0.02)]";

const landscapeCardLinkClass = `${landscapeCardClass} cursor-pointer`;

interface FilmLandscapeSwiperProps {
  landscapes: FilmLandscape[];
}

const FilmLandscapeSwiper = ({ landscapes }: FilmLandscapeSwiperProps) => {
  const t = useTranslations("common");
  const swiperRef = useRef<SwiperType | null>(null);
  const [nav, setNav] = useState({
    show: false,
    canPrev: false,
    canNext: false,
  });

  const syncNav = useCallback(
    (s: SwiperType) => {
      if (s.isLocked || landscapes.length < 2) {
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
    [landscapes.length],
  );

  if (landscapes.length === 0) return null;

  return (
    <div className="w-full min-w-0" dir="ltr">
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
        spaceBetween={24}
        resistanceRatio={0.85}
        watchOverflow
        className="film-landscape-swiper"
        onSwiper={(s) => {
          swiperRef.current = s;
          requestAnimationFrame(() => syncNav(s));
        }}
        onProgress={(s) => syncNav(s)}
        onSlideChange={(s) => syncNav(s)}
        onResize={(s) => syncNav(s)}
      >
        {landscapes.map((item, index) => {
          const media = (
            <>
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index < 2}
                className="object-cover"
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 564px"
              />
              <div className="absolute inset-x-0 bottom-0 h-[91px] rounded-b-[10px] bg-linear-to-b from-transparent to-black p-5">
                <h3
                  className="text-start text-[24px] font-bold leading-[119%] text-white"
                  style={{ fontFamily: ara }}
                >
                  {item.title}
                </h3>
              </div>
            </>
          );

          return (
            <SwiperSlide
              key={item.id}
              className="w-[282px]! max-w-[282px] shrink-0"
            >
              {item.watchUrl ? (
                <a
                  href={item.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={landscapeCardLinkClass}
                >
                  {media}
                </a>
              ) : (
                <article className={landscapeCardClass}>{media}</article>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {nav.show ? (
        <div className="mt-4 flex flex-row items-center justify-center gap-3 sm:justify-start">
          <button
            type="button"
            aria-label={t("previous")}
            disabled={!nav.canPrev}
            className={NAV_BTN_CLASS}
            onClick={() => swiperRef.current?.slidePrev(320)}
          >
            <ChevronRightIcon />
          </button>
          <button
            type="button"
            aria-label={t("next")}
            disabled={!nav.canNext}
            className={NAV_BTN_CLASS}
            onClick={() => swiperRef.current?.slideNext(320)}
          >
            <ChevronLeftIcon />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FilmLandscapeSwiper;
