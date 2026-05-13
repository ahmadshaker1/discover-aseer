"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import AccommodationExceptionalCarousel from "./AccommodationExceptionalCarousel";
import AccommodationFilters from "./AccommodationFilters";
import AccommodationHotelsGrid from "./AccommodationHotelsGrid";
import type { Accommodation } from "./data";
import { splitAccommodationLists } from "./data";

interface AccommodationGridProps {
  accommodations: Accommodation[];
}

const AccommodationGrid = ({ accommodations }: AccommodationGridProps) => {
  const t = useTranslations("common");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [onlyExceptional, setOnlyExceptional] = useState(false);

  const cityOptions = useMemo(() => {
    return Array.from(new Set(accommodations.map((a) => a.city)));
  }, [accommodations]);

  const starsCount = useMemo(() => {
    const map = new Map<number, number>();
    accommodations.forEach((a) => {
      map.set(a.stars, (map.get(a.stars) ?? 0) + 1);
    });
    return map;
  }, [accommodations]);

  const hasExceptionalFlags = useMemo(
    () => accommodations.some((a) => a.exceptional),
    [accommodations],
  );

  const baseFiltered = useMemo(() => {
    return accommodations.filter((a) => {
      if (selectedCity !== "all" && a.city !== selectedCity) return false;
      if (selectedStars.length > 0 && !selectedStars.includes(a.stars)) return false;
      return true;
    });
  }, [accommodations, selectedCity, selectedStars]);

  const filtered = useMemo(() => {
    if (!onlyExceptional) return baseFiltered;
    if (hasExceptionalFlags) return baseFiltered.filter((a) => a.exceptional);
    return baseFiltered;
  }, [baseFiltered, onlyExceptional, hasExceptionalFlags]);

  const exceptionalFilterCount = useMemo(() => {
    const { carousel } = splitAccommodationLists(baseFiltered, false);
    return carousel.length;
  }, [baseFiltered]);

  const { carousel, grid } = useMemo(
    () => splitAccommodationLists(filtered, onlyExceptional),
    [filtered, onlyExceptional],
  );

  const toggleStars = (stars: number) => {
    setSelectedStars((prev) =>
      prev.includes(stars) ? prev.filter((s) => s !== stars) : [...prev, stars],
    );
  };

  const resetFilters = () => {
    setSelectedCity("all");
    setSelectedStars([]);
    setOnlyExceptional(false);
  };

  if (accommodations.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-lg text-muted-foreground">{t("noAccommodation")}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t("resultsCount", { count: 0 })}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1245px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
        <AccommodationFilters
          cityOptions={cityOptions}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          selectedStars={selectedStars}
          onToggleStars={toggleStars}
          starsCount={starsCount}
          onlyExceptional={onlyExceptional}
          onOnlyExceptionalChange={setOnlyExceptional}
          exceptionalFilterCount={exceptionalFilterCount}
          onReset={resetFilters}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-8 lg:gap-10" lang="ar">
          <AccommodationExceptionalCarousel items={carousel} />
          <AccommodationHotelsGrid items={grid} showTopDivider={carousel.length > 0} />

          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">{t("noAccommodationFilter")}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AccommodationGrid;
