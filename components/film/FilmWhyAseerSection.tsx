"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
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
    <svg
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7.875 1.125L1.125 7.875L7.875 14.625"
        stroke={stroke}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RightChevron({ stroke }: { stroke: string }) {
  return (
    <svg
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1.125 14.625L7.875 7.875L1.125 1.125"
        stroke={stroke}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FilmWhyAseerSection = ({ slides }: FilmWhyAseerSectionProps) => {
  const t = useTranslations("film");
  const tCommon = useTranslations("common");

  const lanes = useMemo(() => {
    const source = slides.length > 0 ? slides : FALLBACK_FILM_WHY_ASEER_SLIDES;
    const left = source.filter((s) => s.lane === "left");
    const right = source.filter((s) => s.lane === "right");
    return {
      left:
        left.length > 0
          ? left
          : FALLBACK_FILM_WHY_ASEER_SLIDES.filter((s) => s.lane === "left"),
      right:
        right.length > 0
          ? right
          : FALLBACK_FILM_WHY_ASEER_SLIDES.filter((s) => s.lane === "right"),
    };
  }, [slides]);

  const [naturalIndex, setNaturalIndex] = useState(0);
  const [culturalIndex, setCulturalIndex] = useState(0);

  const naturalImages = useMemo(
    () => lanes.right.map((s) => s.image),
    [lanes.right],
  );
  const culturalImages = useMemo(
    () => lanes.left.map((s) => s.image),
    [lanes.left],
  );

  const renderImageSlider = (
    images: string[],
    index: number,
    onPrev: () => void,
    onNext: () => void,
    sectionName: string,
  ) => {
    if (images.length === 0) return null;

    return (
      <div className="relative h-[360px] sm:h-[480px] md:h-[520px] lg:h-full lg:flex-1 w-full overflow-hidden rounded-[20px] shadow-lg bg-black/5">
        {images.map((imgSrc, imgIdx) => {
          const isActive = imgIdx === index % images.length;
          return (
            <img
              key={`${imgSrc}-${imgIdx}`}
              src={imgSrc}
              alt={`${sectionName} - image ${imgIdx + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-1" : "opacity-0 z-0"
              }`}
            />
          );
        })}

        {/* Bottom Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-2" />

        {/* Navigation Controls */}
        <div className="absolute bottom-6 end-6 flex items-center gap-3 z-10">
          <button
            type="button"
            onClick={onPrev}
            aria-label={tCommon("previous")}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-105 active:scale-95"
          >
            <span className="rtl:rotate-180 flex items-center justify-center">
              <LeftChevron stroke="currentColor" />
            </span>
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label={tCommon("next")}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-105 active:scale-95"
          >
            <span className="rtl:rotate-180 flex items-center justify-center">
              <RightChevron stroke="currentColor" />
            </span>
          </button>
        </div>

        {/* Dots Pagination */}
        {images.length > 1 && (
          <div className="absolute bottom-8 start-6 flex items-center gap-1.5 z-10">
            {images.map((_, imgIdx) => {
              const isActive = imgIdx === index % images.length;
              return (
                <span
                  key={imgIdx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="mx-auto h-auto w-full max-w-[1442px] px-4 py-[60px] sm:px-8 md:px-[68px]">
      <div className="mx-auto flex w-full max-w-[1306px] flex-col gap-16 md:gap-24">
        {/* Main Section Header */}
        <div className="w-full">
          <h2
            className={`text-[48px] font-bold leading-[38px] text-foreground text-start`}
            style={{ fontFamily: ara }}
          >
            {t("whyAseer")}
          </h2>
        </div>

        {/* Content Sections Container */}
        <div className="flex w-full flex-col gap-16 md:gap-24">
          {/* Section 1: Natural Diversity (text left, image right — reversed in RTL) */}
          <div className="flex flex-col-reverse items-center gap-8 lg:flex-row rtl:lg:flex-row-reverse lg:gap-16 lg:items-stretch w-full">
            {/* Left Column: Text */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-start">
              <h3
                className="text-[32px] sm:text-[38px] font-bold leading-[48px] text-foreground text-start mb-4"
                style={{ fontFamily: ara }}
              >
                {t("whyAseerNaturalTitle")}
              </h3>
              <p
                className="text-[18px] sm:text-[20px] font-light leading-10 text-muted-foreground text-start"
                style={{ fontFamily: ibm }}
              >
                {t("whyAseerNaturalDesc")}
              </p>
            </div>

            {/* Right Column: Natural Images */}
            <div className="w-full lg:w-1/2 flex flex-col">
              {renderImageSlider(
                naturalImages,
                naturalIndex,
                () =>
                  setNaturalIndex(
                    (prev) =>
                      (prev - 1 + naturalImages.length) % naturalImages.length,
                  ),
                () =>
                  setNaturalIndex((prev) => (prev + 1) % naturalImages.length),
                t("whyAseerNaturalTitle"),
              )}
            </div>
          </div>

          {/* Section 2: Cultural Diversity (images left, text right — reversed in RTL) */}
          <div className="flex flex-col items-center gap-8 lg:flex-row rtl:lg:flex-row-reverse lg:gap-16 lg:items-stretch w-full">
            {/* Left Column: Cultural Images */}
            <div className="w-full lg:w-1/2 flex flex-col">
              {renderImageSlider(
                culturalImages,
                culturalIndex,
                () =>
                  setCulturalIndex(
                    (prev) =>
                      (prev - 1 + culturalImages.length) %
                      culturalImages.length,
                  ),
                () =>
                  setCulturalIndex(
                    (prev) => (prev + 1) % culturalImages.length,
                  ),
                t("whyAseerCulturalTitle"),
              )}
            </div>

            {/* Right Column: Text */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-start">
              <h3
                className="text-[32px] sm:text-[38px] font-bold leading-[48px] text-foreground text-start mb-4"
                style={{ fontFamily: ara }}
              >
                {t("whyAseerCulturalTitle")}
              </h3>
              <p
                className="text-[18px] sm:text-[20px] font-light leading-10 text-muted-foreground text-start"
                style={{ fontFamily: ibm }}
              >
                {t("whyAseerCulturalDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmWhyAseerSection;
