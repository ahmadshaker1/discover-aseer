"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "@/i18n/navigation";
import HeroSocialLinks, {
  heroSocialLinkClassDesktop,
  heroSocialLinkClassMobile,
} from "@/components/Hero/HeroSocialLinks";
import { getYouTubeEmbedSrc } from "@/components/landing/youtubeStoryEmbed";
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

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Hero = ({ slides }: HeroProps) => {
  const locale = useLocale();
  const isLtr = locale === "en";
  const [filmEmbedSrc, setFilmEmbedSrc] = useState<string | null>(null);
  const [filmTitle, setFilmTitle] = useState("");
  const dialogTitleId = useId();

  const closeFilm = useCallback(() => setFilmEmbedSrc(null), []);

  useEffect(() => {
    if (!filmEmbedSrc) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFilm();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filmEmbedSrc, closeFilm]);

  const openFilm = (slide: HeroSlide) => {
    if (!slide.filmUrl) return;
    const embed = getYouTubeEmbedSrc(slide.filmUrl);
    if (!embed) return;
    setFilmTitle(slide.cta);
    setFilmEmbedSrc(`${embed}?autoplay=1&rel=0`);
  };

  return (
    <section className="relative w-full h-[100vh] bg-[#070707]">
      <Swiper
        modules={[Autoplay]}
        className="hero-main-swiper w-full h-full"
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

            <div className="relative z-10 mx-auto h-full w-full max-w-[1440px] px-6 md:px-[20px]">
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
                  className={`flex w-full max-w-[800px] flex-col ${isLtr ? "mr-auto text-left" : "ml-auto text-right"}`}
                >
                  <h1
                    className="w-full text-white mb-[76px]"
                    style={{
                      fontWeight: 900,
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
                    className="w-full text-base leading-[1.33] text-white md:text-[clamp(18px,1.9vw,24px)] 
                    mb-[25px]"
                    style={{ fontWeight: 700 }}
                  >
                    {slide.subtitle}
                  </p>
                </div>
                {slide.filmUrl ? (
                  <button
                    type="button"
                    onClick={() => openFilm(slide)}
                    className={`${CTA_CLASS} mt-6 ${isLtr ? "mr-auto" : "ml-auto"}`}
                    style={{ fontWeight: "bold" }}
                  >
                    {slide.cta}
                  </button>
                ) : isExternalHref(slide.href) ? (
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

      {filmEmbedSrc ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close"
            onClick={closeFilm}
          />

          <div className="relative z-10 w-full max-w-5xl">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h3
                id={dialogTitleId}
                className="truncate text-start text-base font-semibold text-white sm:text-lg"
              >
                {filmTitle}
              </h3>
              <button
                type="button"
                onClick={closeFilm}
                className="inline-flex shrink-0 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
              <iframe
                title={filmTitle}
                src={filmEmbedSrc}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Hero;
