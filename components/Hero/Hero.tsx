"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AseerSocialIcon } from "@/components/social/AseerSocialIcon";
import { discoverAseerLinks } from "@/lib/discoverAseerLinks";
import Image from "next/image";

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

        <Image
          src="/hero-pattern/ribbon_column.png"
          alt=""
          aria-hidden
          className="absolute top-0 right-0 z-20 h-full object-cover"
          width={15}
          height={100}
        />

        <div className="relative z-10 mx-auto h-full w-full max-w-[1440px] px-6 md:px-[130px]">
          {/* Small screens: horizontal strip + horizontal rules at bottom of hero */}
          <div
            className="absolute inset-x-0 bottom-5 z-30 flex flex-row items-center justify-center gap-2 px-3 text-white md:hidden"
            dir="ltr"
          >
            <div
              className="h-px min-w-[20px] max-w-[56px] flex-1 bg-white"
              aria-hidden
            />
            <div className="flex max-w-full flex-row flex-wrap items-center justify-center gap-1.5">
              <HeroSocialLinks linkClassName={heroSocialLinkClassMobile} />
            </div>
            <div
              className="h-px min-w-[20px] max-w-[56px] flex-1 bg-white"
              aria-hidden
            />
          </div>

          {/* md+: vertical column on the start side */}
          <div
            className="absolute top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center md:flex start-4 md:start-10"
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
