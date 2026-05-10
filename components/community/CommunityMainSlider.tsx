"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";

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
  // Slider dataset from backend/CMS.
  slides: CommunitySlide[];
}

interface CommunityMainSliderProps {
  content: CommunityMainSliderContent;
}

function ChevronRight() {
  return (
    <svg width="27" height="44" viewBox="0 0 27 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M16.875 15.25L10.125 22L16.875 28.75" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="27" height="44" viewBox="0 0 27 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10.125 28.75L16.875 22L10.125 15.25" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CommunityMainSlider = ({ content }: CommunityMainSliderProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  // Backend: pass `content.slides` from API; UI autoplay/controls work automatically.
  const slides = content.slides;
  const hasSlides = slides.length > 0;
  const lastIndex = slides.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = useMemo(() => slides[activeIndex], [slides, activeIndex]);

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
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[60px]" dir={isRtl ? "rtl" : "ltr"}>
      {/* Backend: update `sectionTitle` + `sectionSubtitle` from API/CMS only. */}
      <div className="mx-auto mb-8 flex w-full max-w-[760px] flex-col items-center text-center">
        <h2 className="text-[44px] font-bold leading-[180%] text-black" style={{ fontFamily: ara }}>
          {content.sectionTitle}
        </h2>
        <p className="text-[20px] font-bold leading-[140%] text-[#6f6f6f]" style={{ fontFamily: ara }}>
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
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1298px"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-4 text-white sm:p-6 lg:p-8">
          <div className={`flex w-full max-w-[510px] flex-col gap-[18px] ${isRtl ? "text-right" : "text-left"} sm:h-[187px]`}>
            <h3
              className="text-[26px] font-bold leading-[40px] text-white sm:h-[48px] sm:text-[32px] sm:leading-[48px]"
              style={{ fontFamily: ara }}
            >
              {activeSlide?.title}
            </h3>
            <div className="sm:h-[121px]">
              <p
                className="text-[18px] font-light leading-[100%] text-white/95"
                style={{ fontFamily: ibm }}
              >
                {activeSlide?.description}
              </p>
            </div>
          </div>

          {/* Prev/next controls rendered as links (not buttons). */}
          <div className="flex h-12 w-[314px] items-center gap-6" dir={isRtl ? "ltr" : "rtl"}>
            <Link
              href={`/aseer-community?slide=${activeIndex >= lastIndex ? 0 : activeIndex + 1}`}
              onClick={(event) => {
                event.preventDefault();
                goNext();
              }}
              className="flex h-12 w-[145px] items-center justify-center gap-2 rounded-full text-white transition-colors hover:bg-white/20"
            >
              <span className={isRtl ? "" : "rotate-180"}><ChevronRight /></span>
              <span
                className={`text-[18px] font-light leading-[100%] ${isRtl ? "text-right" : "text-left"}`}
                style={{ fontFamily: ibm }}
              >
                {isRtl ? "مجتمع مترابط" : "Connected community"}
              </span>
            </Link>
            <Link
              href={`/aseer-community?slide=${activeIndex <= 0 ? lastIndex : activeIndex - 1}`}
              onClick={(event) => {
                event.preventDefault();
                goPrev();
              }}
              className="flex h-12 w-[145px] items-center justify-center gap-2 rounded-full  text-white opacity-80 transition-colors hover:bg-white/20"
            >
              <span
                className={`text-[18px] font-light leading-[100%] ${isRtl ? "text-right" : "text-left"}`}
                style={{ fontFamily: ibm }}
              >
                {isRtl ? "شيم عسير" : "Aseer values"}
              </span>
              <span className={isRtl ? "" : "rotate-180"}><ChevronLeft /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityMainSlider;
