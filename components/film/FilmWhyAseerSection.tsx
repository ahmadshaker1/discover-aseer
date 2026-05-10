"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import {
  FALLBACK_FILM_WHY_ASEER_SLIDES,
  type FilmWhyAseerSlide,
} from "@/components/film/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface FilmWhyAseerSectionProps {
  slides: FilmWhyAseerSlide[];
}

function LeftChevron({ stroke }: { stroke: string }) {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7.875 1.125L1.125 7.875L7.875 14.625" stroke={stroke} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RightChevron({ stroke }: { stroke: string }) {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M1.125 14.625L7.875 7.875L1.125 1.125" stroke={stroke} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FilmWhyAseerSection = ({ slides }: FilmWhyAseerSectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const lanes = useMemo(() => {
    const source = slides.length > 0 ? slides : FALLBACK_FILM_WHY_ASEER_SLIDES;
    const left = source.filter((s) => s.lane === "left");
    const right = source.filter((s) => s.lane === "right");
    return {
      left: left.length > 0 ? left : FALLBACK_FILM_WHY_ASEER_SLIDES.filter((s) => s.lane === "left"),
      right: right.length > 0 ? right : FALLBACK_FILM_WHY_ASEER_SLIDES.filter((s) => s.lane === "right"),
    };
  }, [slides]);

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  const leftSlide = lanes.left[leftIndex % lanes.left.length];
  const rightSlide = lanes.right[rightIndex % lanes.right.length];

  const renderCard = (
    slide: FilmWhyAseerSlide,
    onPrev: () => void,
    onNext: () => void
  ) => {
    const lightText = slide.textTheme === "light";
    const textColor = lightText ? "text-white" : "text-[#111111]";
    const chevronStroke = lightText ? "#FFFFFF" : "#111111";
    const overlay = lightText
      ? "bg-linear-to-b from-black/15 via-black/20 to-black/45"
      : "bg-linear-to-b from-white/10 via-white/15 to-white/35";

    return (
      <article className="relative h-[803px] w-full max-w-[640px] shrink-0 overflow-hidden rounded-[10px]">
        <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
        <div className={`absolute inset-0 ${overlay}`} />

        <div className={`absolute top-0 w-full max-w-[510px] p-8 ${isRtl ? "right-0" : "left-0"}`}>
          <div className={`space-y-[18px] p-5 ${isRtl ? "text-right" : "text-left"}`}>
            <h3
              className={`text-[32px] font-bold leading-[48px] ${textColor} ${isRtl ? "text-right" : "text-left"}`}
              style={{ fontFamily: ara }}
            >
              {slide.title}
            </h3>
            <p
              className={`line-clamp-4 text-[18px] font-light leading-[100%] ${textColor} ${isRtl ? "text-right" : "text-left"}`}
              style={{ fontFamily: ibm }}
            >
              {slide.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onPrev}
          aria-label={`${isRtl ? "السابق" : "Previous"} - ${slide.title}`}
          className={`absolute bottom-8 inline-flex h-[44px] w-[27px] items-center justify-center ${isRtl ? "left-8" : "right-8"}`}
        >
          <span className={isRtl ? "" : "rotate-180"}><LeftChevron stroke={chevronStroke} /></span>
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={`${isRtl ? "التالي" : "Next"} - ${slide.title}`}
          className={`absolute bottom-8 inline-flex h-[44px] w-[27px] items-center justify-center ${isRtl ? "right-8" : "left-8"}`}
        >
          <span className={isRtl ? "" : "rotate-180"}><RightChevron stroke={chevronStroke} /></span>
        </button>
      </article>
    );
  };

  return (
    <section className="mx-auto h-auto w-full max-w-[1442px] px-4 py-[60px] sm:px-8 md:px-[68px]" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto flex w-full max-w-[1306px] flex-col gap-16">
        <div className="w-full">
          <h2
            className={`text-[48px] font-bold leading-[38px] text-[#111111] ${isRtl ? "text-right" : "text-left"}`}
            style={{ fontFamily: ara }}
          >
            {isRtl ? "لماذا عسير؟" : "Why Aseer?"}
          </h2>
        </div>

        <div className={`flex w-full flex-col gap-3 lg:items-start lg:justify-between ${isRtl ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
          {renderCard(
            leftSlide,
            () => setLeftIndex((prev) => (prev - 1 + lanes.left.length) % lanes.left.length),
            () => setLeftIndex((prev) => (prev + 1) % lanes.left.length)
          )}
          {renderCard(
            rightSlide,
            () => setRightIndex((prev) => (prev - 1 + lanes.right.length) % lanes.right.length),
            () => setRightIndex((prev) => (prev + 1) % lanes.right.length)
          )}
        </div>
      </div>
    </section>
  );
};

export default FilmWhyAseerSection;
