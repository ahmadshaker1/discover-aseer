"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { PointOfInterest } from "./data";

interface PreviewImagesProps {
  points: PointOfInterest[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const PreviewImages = ({
  points,
  currentIndex,
  onSelect,
}: PreviewImagesProps) => {
  const t = useTranslations("common");
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || points.length === 0) return;
    const idx = Math.min(Math.max(0, currentIndex), points.length - 1);
    if (swiper.activeIndex !== idx) {
      swiper.slideTo(idx, 280);
    }
  }, [currentIndex, points.length]);

  if (points.length === 0) return null;

  return (
    <div className="relative z-10 w-full min-w-0 max-w-full" dir="ltr">
      <Swiper
        modules={[FreeMode]}
        className="points-preview-swiper py-2"
        slidesPerView="auto"
        spaceBetween={10}
        breakpoints={{
          640: { spaceBetween: 12 },
          768: { spaceBetween: 12 },
        }}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.55,
          momentumVelocityRatio: 0.55,
        }}
        resistanceRatio={0.85}
        watchOverflow
        initialSlide={Math.min(currentIndex, points.length - 1)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {points.map((point, index) => {
          const selected = index === currentIndex;
          return (
            <SwiperSlide
              key={`${point.id}-${index}`}
              className="w-[100px]! shrink-0 sm:w-[106px]! md:w-[112px]!"
            >
              <button
                type="button"
                onClick={() => onSelect(index)}
                className={`relative block h-[72px] w-full cursor-pointer overflow-hidden rounded-md bg-black/50 transition-transform duration-200 ease-out will-change-transform sm:h-[76px] md:h-[80px] ${
                  selected ? "z-10 scale-110" : "z-0 scale-100 hover:scale-105"
                }`}
                aria-label={`${t("browseMore")} ${point.title}`}
                aria-current={selected ? "true" : undefined}
              >
                <Image
                  src={point.image}
                  alt={point.title}
                  fill
                  sizes="(max-width: 640px) 100px, (max-width: 1024px) 112px, 120px"
                  className="pointer-events-none object-cover object-center"
                />
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
