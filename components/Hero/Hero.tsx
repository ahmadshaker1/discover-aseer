"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const HERO_SLIDES = [
  "/assets/landing/discover-aseer-hero.jpg",
  "/assets/landing/hero-aseer-cultural.png",
] as const;

const SLIDE_INTERVAL_MS = 5000;
const FADE_DURATION_MS = 1000;

const Hero = ({ title, subtitle }: HeroProps) => {
  const t = useTranslations("home");
  const displayTitle = title ?? t("heroTitle");
  const displaySubtitle = subtitle ?? t("heroSubtitle");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="w-full bg-[#070707]">
      <div className="relative h-[756px] w-full overflow-hidden">
        {HERO_SLIDES.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity ease-in-out"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: index === activeIndex ? 1 : 0,
              transitionDuration: `${FADE_DURATION_MS}ms`,
              zIndex: index === activeIndex ? 0 : -1,
            }}
            aria-hidden={index !== activeIndex}
          />
        ))}

        <div
          className="pointer-events-none absolute inset-0 z-1 bg-black/35"
          aria-hidden
        />

        <img
          src="/hero-pattern/ribbon_column.png"
          alt=""
          aria-hidden
          className="absolute top-0 right-0 z-20 h-full w-[15px] object-cover"
        />

        <div className="relative z-10 mx-auto h-full w-full max-w-[1440px] px-6 md:px-[130px]">
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
