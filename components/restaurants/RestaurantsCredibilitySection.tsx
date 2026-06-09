"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import WorldRegionGastronomyAwardLogo from "@/components/restaurants/WorldRegionGastronomyAwardLogo";

const ara = "var(--font-ara-hamah-1964), sans-serif";

const RestaurantsCredibilitySection = () => {
  const t = useTranslations("restaurantsPage");

  return (
    <section
      className="flex w-full justify-center bg-primary/10 py-5"
      aria-labelledby="restaurants-credibility-heading"
    >
      <div className="flex min-h-[448px] w-full max-w-[1440px] flex-col items-center justify-center gap-[10px] px-[clamp(1rem,calc((100vw-428px)/2),506px)] py-5">
        <WorldRegionGastronomyAwardLogo />

        <h2
          id="restaurants-credibility-heading"
          className="w-full max-w-[428px] text-center text-[40px] font-bold leading-[119%] text-foreground"
          style={{ fontFamily: ara }}
        >
          {t("credibilityLine")}
        </h2>

        <Link
          href="/aseer-cuisine"
          className="inline-flex h-[52px] min-w-[161px] items-center justify-center rounded-[55px] border border-primary bg-primary px-[10px] py-[10px] text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          style={{ fontFamily: ara }}
        >
          {t("credibilityCta")}
        </Link>
      </div>
    </section>
  );
};

export default RestaurantsCredibilitySection;
