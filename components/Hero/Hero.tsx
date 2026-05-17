"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import HeroSocialLinks, {
  heroSocialLinkClassDesktop,
  heroSocialLinkClassMobile,
} from "@/components/Hero/HeroSocialLinks";

import Image from "next/image";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const HERO_SLIDES = [
  "/assets/landing/discover-aseer-hero.jpg",
  "/assets/landing/hero-aseer-cultural.png",
] as const;

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD_PX = 48;
const TRANSITION_MS = 500;

const mod = (value: number, length: number) => ((value % length) + length) % length;

const Hero = ({ title, subtitle }: HeroProps) => {
  const t = useTranslations("home");
  const displayTitle = title ?? t("heroTitle");
  const displaySubtitle = subtitle ?? t("heroSubtitle");

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef(0);
  const autoplayRef = useRef<number | null>(null);

  const slideCount = HERO_SLIDES.length;

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    if (slideCount <= 1) return;

    autoplayRef.current = window.setInterval(() => {
      if (isDraggingRef.current) return;
      setDragOffset(0);
      setActiveIndex((current) => mod(current + 1, slideCount));
    }, AUTOPLAY_MS);
  }, [clearAutoplay, slideCount]);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransitionEnabled(true));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    startAutoplay();
    return clearAutoplay;
  }, [clearAutoplay, startAutoplay]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (slideCount <= 1 || event.button !== 0) return;

    clearAutoplay();
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    isDraggingRef.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const delta = event.clientX - startXRef.current;
    if (Math.abs(delta) > 4) {
      event.preventDefault();
    }
    dragOffsetRef.current = delta;
    setDragOffset(delta);
  };

  const onPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    pointerIdRef.current = null;
    isDraggingRef.current = false;
    setIsDragging(false);

    const width = heroRef.current?.offsetWidth ?? 0;
    const threshold = Math.min(SWIPE_THRESHOLD_PX, width * 0.12);
    const offset = dragOffsetRef.current;

    if (width > 0 && offset < -threshold) {
      dragOffsetRef.current = 0;
      setDragOffset(0);
      setActiveIndex((current) => mod(current + 1, slideCount));
    } else if (width > 0 && offset > threshold) {
      dragOffsetRef.current = 0;
      setDragOffset(0);
      setActiveIndex((current) => mod(current - 1, slideCount));
    } else {
      dragOffsetRef.current = 0;
      setDragOffset(0);
    }

    startAutoplay();
  };

  const slideStepPercent = 100 / slideCount;

  const trackStyle: React.CSSProperties = {
    width: `${slideCount * 100}%`,
    transform: `translateX(calc(-${activeIndex * slideStepPercent}% + ${dragOffset}px))`,
    transition:
      isDragging || !transitionEnabled
        ? "none"
        : `transform ${TRANSITION_MS}ms ease-in-out`,
  };

  return (
    <section className="w-full bg-[#070707]">
      <div
        ref={heroRef}
        className="relative h-[756px] w-full touch-pan-y overflow-hidden select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label={displayTitle}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="flex h-full" style={trackStyle}>
            {HERO_SLIDES.map((src, index) => (
              <div
                key={src}
                className="h-full shrink-0 grow-0 bg-cover bg-center bg-no-repeat"
                style={{
                  width: `${slideStepPercent}%`,
                  backgroundImage: `url('${src}')`,
                }}
                aria-hidden={index !== activeIndex}
              />
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-1 bg-black/35"
          aria-hidden
        />

        <Image
          src="/hero-pattern/ribbon_column.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 z-20 h-full object-cover"
          width={15}
          height={100}
        />

        <div className="pointer-events-none relative z-10 mx-auto h-full w-full max-w-[1440px] px-6 md:px-[130px]">
          <div
            className="pointer-events-auto absolute inset-x-0 bottom-5 z-30 flex flex-row items-center justify-center gap-2 px-3 text-white md:hidden"
            dir="ltr"
          >
            <div className="h-px min-w-[20px] max-w-[56px] flex-1 bg-white" aria-hidden />
            <div className="flex max-w-full flex-row flex-wrap items-center justify-center gap-1.5">
              <HeroSocialLinks linkClassName={heroSocialLinkClassMobile} />
            </div>
            <div className="h-px min-w-[20px] max-w-[56px] flex-1 bg-white" aria-hidden />
          </div>

          <div
            className="pointer-events-auto absolute top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center md:flex start-4 md:start-10"
            dir="ltr"
          >
            <div
              className="mb-3 h-14 w-px shrink-0 bg-white md:mb-[15px] md:h-20"
              aria-hidden
            />
            <div className="flex flex-col items-center gap-3 text-white md:gap-[15px]">
              <HeroSocialLinks linkClassName={heroSocialLinkClassDesktop} />
            </div>
            <div
              className="mt-3 h-14 w-px shrink-0 bg-white md:mt-[15px] md:h-20"
              aria-hidden
            />
          </div>

          <div className="ml-auto flex h-full w-full flex-col justify-center text-right md:w-[616px]">
            <div className="flex w-full flex-col gap-[50px] md:h-[134px]">
              <h1
                className="text-white"
                style={{
                  fontFamily: "var(--font-ara-hamah-1964), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(44px, 5vw, 88px)",
                  lineHeight: "119%",
                }}
              >
                {displayTitle}
              </h1>

              <p
                className="text-white"
                style={{
                  fontFamily: "var(--font-ara-hamah-1964), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 1.9vw, 24px)",
                  lineHeight: "133%",
                }}
              >
                {displaySubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
