"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface CommunitySlide {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface CommunityMainSliderContent {
  // Body heading above the slider.
  sectionTitle: string;
  // Body subtext above the slider.
  sectionSubtitle: string;
  // Previous button label.
  prevLabel: string;
  // Next button label.
  nextLabel: string;
  // Slider dataset from backend/CMS.
  slides: CommunitySlide[];
}

interface CommunityMainSliderProps {
  content: CommunityMainSliderContent;
}

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7.14453 4.5L11.6445 9L7.14453 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10.8555 4.5L6.35547 9L10.8555 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CommunityMainSlider = ({ content }: CommunityMainSliderProps) => {
  // Backend: pass `content.slides` from API; UI autoplay/controls work automatically.
  const slides = content.slides;
  const hasSlides = slides.length > 0;
  const lastIndex = slides.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = useMemo(() => slides[activeIndex], [slides, activeIndex]);
  const previousSlideTitle = hasSlides
    ? slides[(activeIndex - 1 + slides.length) % slides.length]?.title
    : content.prevLabel;
  const nextSlideTitle = hasSlides
    ? slides[(activeIndex + 1) % slides.length]?.title
    : content.nextLabel;

  useEffect(() => {
    if (!hasSlides || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev >= lastIndex ? 0 : prev + 1));
    }, 5000);
    return () => window.clearInterval(timer);
  }, [hasSlides, isPaused, lastIndex]);

  const goNext = () => {
    setActiveIndex((prev) => (prev >= lastIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? lastIndex : prev - 1));
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[60px]">
      {/* Backend: update `sectionTitle` + `sectionSubtitle` from API/CMS only. */}
      <div className="mx-auto mb-8 flex w-full max-w-[760px] flex-col items-center text-center">
        <h2
          className="text-[44px] font-bold leading-[180%] text-foreground"
          style={{ fontFamily: ara }}
        >
          {content.sectionTitle}
        </h2>
        <p
          className="text-[20px] font-bold leading-6 text-muted-foreground"
          style={{ fontFamily: ara }}
        >
          {content.sectionSubtitle}
        </p>
      </div>

      <div
        className="relative mx-auto h-[420px] w-full max-w-[1298px] overflow-hidden rounded-[16px] sm:h-[560px] lg:h-[803px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Backend: `slides[activeIndex].image` is the main displayed image. */}
        {activeSlide ? (
          <Image
            src={activeSlide.image}
            alt={activeSlide.title}
            fill
            priority={activeIndex === 0}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1298px"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 text-white sm:p-6 lg:p-8">
          <div className="max-w-[min(100%,720px)] text-start">
            <h3
              className="mb-2 text-[26px] font-bold leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] sm:text-[32px] sm:leading-[1.2]"
              style={{ fontFamily: ara }}
            >
              {activeSlide?.title}
            </h3>
            <p
              className="line-clamp-4 text-[16px] font-light leading-7 text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] sm:line-clamp-5 sm:text-[18px] lg:line-clamp-6"
              style={{ fontFamily: ibm }}
            >
              {activeSlide?.description}
            </p>
          </div>

          <div className="mt-2 flex w-full flex-wrap items-center gap-3  pt-4 sm:gap-6">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-full px-1 py-2 text-[15px] font-medium leading-none text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:max-w-[min(48%,220px)] sm:gap-3 sm:text-[18px]"
              style={{ fontFamily: ara }}
            >
              <span className="inline-flex shrink-0 rtl:rotate-180" aria-hidden>
                <ChevronRight />
              </span>
              <span className="truncate">{previousSlideTitle}</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-full px-1 py-2 text-[15px] font-medium leading-none text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:max-w-[min(48%,220px)] sm:gap-3 sm:text-[18px]"
              style={{ fontFamily: ara }}
            >
              <span className="truncate">{nextSlideTitle}</span>
              <span className="inline-flex shrink-0 rtl:rotate-180" aria-hidden>
                <ChevronLeft />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityMainSlider;
