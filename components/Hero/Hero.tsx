"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "@/i18n/navigation";
import HeroSocialLinks, {
  heroSocialLinkClassDesktop,
  heroSocialLinkClassMobile,
} from "@/components/Hero/HeroSocialLinks";
import type { HeroSlide } from "@/components/Hero/types";

export type { HeroSlide } from "@/components/Hero/types";


const AUTOPLAY_MS = 5000;

type HeroProps = {
  slides: HeroSlide[];
};

const CTA_CLASS =
  "inline-flex min-h-[44px] max-w-[260px] cursor-pointer items-center justify-center rounded-full border border-white/20 bg-gray-500/50 px-6 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-[#6027D2] hover:bg-[#6027D2] md:max-w-none";

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

const Hero = ({ slides }: HeroProps) => {
  const locale = useLocale();
  const isLtr = locale === "en";

  return (
    <section className="relative w-full bg-[#070707]">
      <Swiper
        modules={[Autoplay]}
        className="hero-main-swiper h-[756px] w-full"
        dir={isLtr ? "ltr" : "rtl"}
        loop={slides.length > 1}
        speed={600}
        autoplay={
          slides.length > 1
            ? { delay: AUTOPLAY_MS, disableOnInteraction: false }
            : false
        }
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-[756px] w-full">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 z-1 bg-black/35"
              aria-hidden
            />

            <div className="relative z-10 mx-auto h-full w-full max-w-[1440px] px-6 md:px-[130px]">
              <div
                className={
                  isLtr
                    ? "mr-auto flex h-full w-full max-w-[616px] flex-col justify-center text-left"
                    : "ml-auto flex h-full w-full max-w-[616px] flex-col justify-center text-right"
                }
              >
                {slide.logo ? (
                  <Image
                    src={slide.logo}
                    alt=""
                    width={240}
                    height={120}
                    className={`mb-4 h-auto w-[150px] lg:mb-6 lg:w-[240px] ${isLtr ? "mr-auto" : "ml-auto"}`}
                    priority={index === 1}
                  />
                ) : null}

                <div
                  className={`flex w-full max-w-[527px] flex-col gap-3 md:gap-4 ${isLtr ? "mr-auto text-left" : "ml-auto text-right"}`}
                >
                  <h1
                    className="w-full text-white"
                    style={{
                      fontWeight: "bold",
                      ...(slide.largeTitle
                        ? {
                            fontSize: "clamp(44px, 5vw, 88px)",
                            lineHeight: "119%",
                          }
                        : {
                            fontSize: "clamp(28px, 4vw, 66px)",
                            lineHeight: "1.1",
                          }),
                    }}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="w-full text-base leading-[1.33] text-white md:text-[clamp(18px,1.9vw,24px)]"
                    style={{ fontWeight: "bold" }}
                  >
                    {slide.subtitle}
                  </p>
                </div>

                {isExternalHref(slide.href) ? (
                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${CTA_CLASS} mt-6 ${isLtr ? "mr-auto" : "ml-auto"}`}
                    style={{ fontWeight: "bold" }}
                  >
                    {slide.cta}
                  </a>
                ) : (
                  <Link
                    href={slide.href}
                    className={`${CTA_CLASS} mt-6 ${isLtr ? "mr-auto" : "ml-auto"}`}
                    style={{ fontWeight: "bold" }}
                  >
                    {slide.cta}
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="pointer-events-auto absolute inset-x-0 bottom-5 flex flex-row items-center justify-center gap-2 px-3 text-white md:hidden">
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

        <div
          className={`pointer-events-auto absolute top-1/2 hidden -translate-y-1/2 flex-col items-center md:flex ${isLtr ? "right-4 md:right-10" : "left-4 md:left-10"}`}
          dir="ltr"
        >
          <div
            className="mb-2 h-8 w-px shrink-0 bg-white md:mb-2.5 md:h-12"
            aria-hidden
          />
          <div className="flex flex-col items-center gap-2 text-white md:gap-2.5">
            <HeroSocialLinks linkClassName={heroSocialLinkClassDesktop} />
          </div>
          <div
            className="mt-2 h-8 w-px shrink-0 bg-white md:mt-2.5 md:h-12"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
