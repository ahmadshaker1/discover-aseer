"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const IGCAT_WEBSITE_URL =
  process.env.NEXT_PUBLIC_IGCAT_WEBSITE_URL?.trim() || "https://igcat.org";

const ara = "var(--font-ara-hamah-1964), sans-serif";

const RestaurantsCredibilitySection = () => {
  const t = useTranslations("restaurantsPage");
  const tCommon = useTranslations("common");

  return (
    <section
      className="flex w-full justify-center bg-[#CD8CFF3D] py-5"
      aria-labelledby="restaurants-credibility-heading"
    >
      <div className="flex min-h-[448px] w-full max-w-[1440px] flex-col items-center justify-center gap-[10px] px-[clamp(1rem,calc((100vw-428px)/2),506px)] py-5">
        <Image
          src="/assets/restaurant/IGCAT.png"
          alt="IGCAT — International Institute of Gastronomy, Culture, Arts and Tourism"
          width={377}
          height={139}
          className="h-auto w-full max-w-[377px] object-contain mix-blend-multiply"
          sizes="377px"
        />

        <h2
          id="restaurants-credibility-heading"
          className="w-full max-w-[428px] text-center text-[40px] font-bold leading-[119%] text-black"
          style={{ fontFamily: ara }}
        >
          {t("credibilityLine")}
        </h2>

        <Link
          href={IGCAT_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[52px] min-w-[161px] items-center justify-center rounded-[55px] border border-[#6027D2] bg-[#6027D2] px-[10px] py-[10px] text-[20px] font-bold leading-[119%] text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6027D2]"
          style={{ fontFamily: ara }}
        >
          {tCommon("visitorSite")}
        </Link>
      </div>
    </section>
  );
};

export default RestaurantsCredibilitySection;
