"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type StoryLinkHref = ComponentProps<typeof Link>["href"];

const ara = "var(--font-ara-hamah-1964), sans-serif";
const brando = "var(--font-brando), sans-serif";
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
  /** When set, the card links to destinations (or another internal route). */
  href?: StoryLinkHref;
}

export interface AboutStoryContent {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionCaption: string;
  highlightCards: AboutStoryHighlightCard[];
  slides: AboutStorySlide[];
}

interface AboutAseerStorySectionProps {
  content: AboutStoryContent;
}

const AboutAseerStorySection = ({ content }: AboutAseerStorySectionProps) => {
  const slides = content.slides;
  const lastIndex = slides.length - 1;
  const hasSlides = slides.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeSlide = useMemo(() => slides[activeIndex], [slides, activeIndex]);

  useEffect(() => {
    if (!hasSlides || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev >= lastIndex ? 0 : prev + 1));
    }, 7000);
    return () => window.clearInterval(timer);
  }, [hasSlides, isPaused, lastIndex]);

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const activeTab = container.querySelector<HTMLElement>(
      `[data-slide-tab="${activeIndex}"]`,
    );
    activeTab?.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
      block: "nearest",
    });
  }, [activeIndex]);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
        <div className="mx-auto flex w-full max-w-[704px] flex-col items-center text-center">
          <h2
            className="w-full text-center text-[48px] font-bold leading-[100%] text-secondary"
            style={{ fontFamily: brando }}
          >
            {content.sectionTitle}
          </h2>
          <p
            className="text-[16px] font-medium leading-[140%] text-muted-foreground"
            style={{ fontFamily: ara }}
          >
            {content.sectionSubtitle}
          </p>
          <h4
            className="mt-2 w-full text-center text-[15px] font-medium text-foreground"
            style={{ fontFamily: ibm }}
          >
            {content.sectionCaption}
          </h4>
        </div>

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[35px] px-4 md:px-[64px]">
          <div className="grid w-full grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-4">
            {content.highlightCards.slice(0, 4).map((card) => {
              const inner = (
                <>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 310px"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex h-[91px] items-end justify-center rounded-b-[10px] bg-linear-to-b from-transparent to-black p-5">
                    <p
                      className="line-clamp-2 w-full text-center text-[16px] font-bold leading-[120%] text-white"
                      style={{ fontFamily: ara }}
                    >
                      {card.title}
                    </p>
                  </div>
                </>
              );

              if (card.href) {
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className="group relative block h-[305px] w-full max-w-[310px] justify-self-center overflow-hidden rounded-[10px] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {inner}
                  </Link>
                );
              }

              return (
                <article
                  key={card.id}
                  className="relative h-[305px] w-full max-w-[310px] justify-self-center overflow-hidden rounded-[10px]"
                >
                  {inner}
                </article>
              );
            })}
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-[1298px] overflow-hidden rounded-[16px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-[520px] w-full sm:h-[640px] lg:h-[803px]">
            {activeSlide ? (
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 1024px) 100vw, 1298px"
                priority={activeIndex === 0}
              />
            ) : null}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.2)_100%)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_left,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_42%,transparent_72%)] rtl:bg-[linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_42%,transparent_72%)]"
            />
          </div>

          <div className="absolute inset-0 flex flex-col justify-between gap-8 p-5 text-white sm:gap-10 sm:p-8 lg:p-10">
            <div className="flex w-full items-start justify-start">
              <div
                ref={tabsRef}
                className="flex min-w-0 max-w-full items-start gap-2 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label={content.sectionTitle}
              >
                {slides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      data-slide-tab={index}
                      onClick={() => setActiveIndex(index)}
                      className={`relative shrink-0 cursor-pointer rounded-[10px] px-4 py-2.5 text-[13px] font-bold leading-none transition-colors sm:px-5 sm:text-[14px] ${
                        isActive
                          ? "bg-primary text-white"
                          : "border border-white/85 bg-black/30 text-white hover:bg-white/10"
                      }`}
                      style={{ fontFamily: ara }}
                    >
                      {slide.title}
                      {isActive ? (
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-[calc(100%+6px)] size-0 -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-primary"
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="max-w-[720px] text-start">
              <h3
                className="mb-3 text-[32px] font-bold leading-[130%] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] sm:text-[40px] lg:text-[48px]"
                style={{ fontFamily: ara }}
              >
                {activeSlide?.title}
              </h3>
              <p
                className="text-[15px] font-light leading-8 text-white/95 drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] sm:text-[18px] sm:leading-9 lg:text-[20px] lg:leading-10"
                style={{ fontFamily: ibm }}
              >
                {activeSlide?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAseerStorySection;
