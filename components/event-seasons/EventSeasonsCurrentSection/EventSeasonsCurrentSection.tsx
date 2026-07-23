"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { SeasonListingItem } from "../types";
import SeasonExpandableCard from "./SeasonExpandableCard";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface EventSeasonsCurrentSectionProps {
  seasons: SeasonListingItem[];
}

export default function EventSeasonsCurrentSection({
  seasons,
}: EventSeasonsCurrentSectionProps) {
  const t = useTranslations("eventSeasons");

  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex =
    seasons.length === 0 ? 0 : Math.min(activeIndex, seasons.length - 1);

  return (
    <section className="mx-auto w-full max-w-[1439px] rounded-[24px] bg-surface px-4 py-8 sm:px-8 md:px-[60px] md:py-8">
      <div className="mx-auto flex w-full max-w-[1319px] flex-col gap-8 md:gap-[43px]">
        <header className="flex w-full flex-col items-start gap-8">
          <h2
            className="w-full text-start text-[clamp(1.75rem,4vw,48px)] font-bold leading-none text-foreground"
            style={{ fontFamily: ara }}
          >
            {t("currentSeasonsTitle")}
          </h2>
        </header>

        <div
          className="flex w-full gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-8 lg:overflow-hidden [&::-webkit-scrollbar]:hidden"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {seasons.map((season, index) => (
            <SeasonExpandableCard
              key={season.id}
              season={season}
              isActive={safeActiveIndex === index}
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
