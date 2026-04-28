"use client";

import { useMemo, useState } from "react";
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

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  const leftSlide = lanes.left[leftIndex % lanes.left.length];
  const rightSlide = lanes.right[rightIndex % lanes.right.length];

  const renderCard = (
    slide: FilmWhyAseerSlide,
    onPrev: () => void,
    onNext: () => void,
  ) => {
    const lightText = slide.textTheme === "light";
    const textColor = lightText ? "text-white" : "text-[#111111]";
    const chevronStroke = lightText ? "#FFFFFF" : "#111111";
    const overlay = lightText
      ? "bg-linear-to-b from-black/15 via-black/20 to-black/45"
      : "bg-linear-to-b from-white/10 via-white/15 to-white/35";

    return (
      <article className="relative h-[803px] w-full max-w-[640px] shrink-0 overflow-hidden rounded-[10px]">
        <img
          src={slide.image}
          alt={slide.title}
          className="h-full w-full object-cover"
        />
        <div className={`absolute inset-0 ${overlay}`} />

        <div className="absolute top-0 right-0 w-full max-w-[510px] p-8">
          <div className="space-y-[18px] p-5">
            <h3
              className={`text-right text-[32px] font-bold leading-[1.5] ${textColor}`}
              style={{ fontFamily: ara }}
            >
              {slide.title}
            </h3>
            <p
              className={`line-clamp-4 text-right text-[18px] font-light leading-[1.5] ${textColor}`}
              style={{ fontFamily: ibm }}
            >
              {slide.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onPrev}
          aria-label={`السابق - ${slide.title}`}
          className="absolute bottom-8 left-8 inline-flex h-[44px] w-[27px] items-center justify-center"
        >
          <LeftChevron stroke={chevronStroke} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={`التالي - ${slide.title}`}
          className="absolute bottom-8 right-8 inline-flex h-[44px] w-[27px] items-center justify-center"
        >
          <RightChevron stroke={chevronStroke} />
        </button>
      </article>
    );
  };

  return (
    <section
      className="mx-auto h-auto w-full max-w-[1442px] px-4 py-[60px] sm:px-8 md:px-[68px]"
      dir="ltr"
    >
      <div className="mx-auto flex w-full max-w-[1306px] flex-col gap-16">
        <div className="w-full">
          <h2
            className="text-right text-[48px] font-bold leading-[38px] text-[#111111]"
            style={{ fontFamily: ara }}
          >
            لماذا عسير؟
          </h2>
        </div>

        <div
          className="flex w-full flex-col gap-3 lg:flex-row lg:items-start lg:justify-between"
          dir="ltr"
        >
          {renderCard(
            leftSlide,
            () =>
              setLeftIndex(
                (prev) => (prev - 1 + lanes.left.length) % lanes.left.length,
              ),
            () => setLeftIndex((prev) => (prev + 1) % lanes.left.length),
          )}
          {renderCard(
            rightSlide,
            () =>
              setRightIndex(
                (prev) => (prev - 1 + lanes.right.length) % lanes.right.length,
              ),
            () => setRightIndex((prev) => (prev + 1) % lanes.right.length),
          )}
        </div>
      </div>
    </section>
  );
};

export default FilmWhyAseerSection;
