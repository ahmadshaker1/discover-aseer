"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { SeasonListingItem } from "../types";
import SeasonExpandableCard from "./SeasonExpandableCard";
import SeasonYearFilter from "./SeasonYearFilter";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface EventSeasonsCurrentSectionProps {
  seasons: SeasonListingItem[];
}

export default function EventSeasonsCurrentSection({
  seasons,
}: EventSeasonsCurrentSectionProps) {
  const t = useTranslations("eventSeasons");

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filteredSeasons = useMemo(() => {
    if (selectedYear === null) return seasons;
    return seasons.filter((s) => s.years.includes(selectedYear));
  }, [seasons, selectedYear]);

  const displaySeasons = filteredSeasons.length > 0 ? filteredSeasons : seasons;

  const safeActiveIndex = Math.min(activeIndex, displaySeasons.length - 1);

  const yearOptions = useMemo(
    () =>
      [...new Set(seasons.flatMap((s) => s.years))].sort((a, b) => b - a),
    [seasons],
  );

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setActiveIndex(0);
  };

  const handleYearClear = () => {
    setSelectedYear(null);
    setActiveIndex(0);
  };

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

          <SeasonYearFilter
            years={yearOptions}
            selectedYear={selectedYear}
            onSelect={handleYearSelect}
            onClear={handleYearClear}
          />
        </header>

        <div
          className="flex w-full gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-8 lg:overflow-hidden [&::-webkit-scrollbar]:hidden"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {displaySeasons.map((season, index) => (
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
