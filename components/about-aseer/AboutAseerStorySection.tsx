"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface AboutStorySlide {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface AboutStoryHighlightCard {
  id: string;
  image: string;
  title: string;
}

export interface AboutStoryContent {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionCaption: string;
  prevLabel: string;
  nextLabel: string;
  highlightCards: AboutStoryHighlightCard[];
  slides: AboutStorySlide[];
}

interface AboutAseerStorySectionProps {
  content: AboutStoryContent;
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7.14453 4.5L11.6445 9L7.14453 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10.8555 4.5L6.35547 9L10.8555 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const AboutAseerStorySection = ({ content }: AboutAseerStorySectionProps) => {
  const slides = content.slides;
  const lastIndex = slides.length - 1;
  const hasSlides = slides.length > 0;
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
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[60px]" dir="rtl">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
        {/* Backend: fill `sectionTitle`, `sectionSubtitle`, `sectionCaption` from API/CMS. */}
        <div className="mx-auto flex w-full max-w-[704px] flex-col items-center text-center">
          <h2 className="text-[44px] font-bold leading-[180%] text-black" style={{ fontFamily: ara }}>
            {content.sectionTitle}
          </h2>
          <p className="text-[20px] font-bold leading-[140%] text-[#6f6f6f]" style={{ fontFamily: ara }}>
            {content.sectionSubtitle}
          </p>
          <h4
            className="mt-2 w-full text-center text-[15px] font-medium leading-[119%] text-[#5A5A5A]"
            style={{ fontFamily: ibm }}
          >
            {content.sectionCaption}
          </h4>
        </div>

        {/* Backend: send exactly 4 cards in `highlightCards` to match this layout block. */}
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[35px] px-4 md:px-[64px]">
          <div className="grid w-full grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-4">
            {content.highlightCards.slice(0, 4).map((card) => (
              <article
                key={card.id}
                className="relative h-[305px] w-full max-w-[310px] justify-self-center overflow-hidden rounded-[10px]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 310px"
                />
                <div className="absolute inset-x-0 bottom-0 h-[51px] bg-[linear-gradient(179.54deg,rgba(0,0,0,0)_0.39%,#000000_99.6%)] px-5 py-4">
                  <p
                    className="line-clamp-1 text-right text-[16px] font-bold leading-[120%] text-white"
                    style={{ fontFamily: ara }}
                  >
                    {card.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-[1298px] overflow-hidden rounded-[16px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Backend: `slides` should include all gallery images + text overlay content. */}
          <div className="relative h-[360px] w-full sm:h-[520px] lg:h-[803px]">
            {activeSlide ? (
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1298px"
              />
            ) : null}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 text-white sm:p-6 lg:p-8">
            <div className="max-w-[510px] text-right">
              <h3 className="text-[32px] font-bold leading-[150%]" style={{ fontFamily: ara }}>
                {activeSlide?.title}
              </h3>
              <p className="text-[20px] font-bold leading-[150%] text-white/90" style={{ fontFamily: ara }}>
                {activeSlide?.description}
              </p>
            </div>

            <div className="flex w-full items-center justify-start">
              <div className="flex h-12 w-[314px] items-center gap-6">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-12 w-[145px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronRight />
                  <span style={{ fontFamily: ara }}>{content.prevLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-12 w-[145px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 text-white opacity-80 transition-colors hover:bg-white/20"
                >
                  <span style={{ fontFamily: ara }}>{content.nextLabel}</span>
                  <ChevronLeft />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAseerStorySection;
