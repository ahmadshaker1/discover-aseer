"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import CatalogPagination from "@/components/catalog/CatalogPagination";
import { CATALOG_PAGE_SIZE, catalogTotalPages } from "@/lib/directus/collectionCache";
import { usePathname, useRouter } from "@/i18n/navigation";
import AccommodationExceptionalCarousel from "./AccommodationExceptionalCarousel";
import AccommodationFilters from "./AccommodationFilters";
import AccommodationHotelsGrid from "./AccommodationHotelsGrid";
import type { Accommodation, AccommodationType } from "./data";
import { splitAccommodationLists } from "./data";

interface AccommodationGridProps {
  accommodations: Accommodation[];
  currentPage: number;
}

const AccommodationGrid = ({
  accommodations,
  currentPage,
}: AccommodationGridProps) => {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedTypes, setSelectedTypes] = useState<AccommodationType[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [onlyExceptional, setOnlyExceptional] = useState(false);

  const goToFirstPage = () => {
    if (currentPage <= 1) return;
    router.replace(pathname, { scroll: false });
  };

  const cityOptions = useMemo(() => {
    return Array.from(new Set(accommodations.map((a) => a.city)));
  }, [accommodations]);

  const typeCount = useMemo(() => {
    const map = new Map<AccommodationType, number>();
    accommodations.forEach((a) => {
      map.set(a.type, (map.get(a.type) ?? 0) + 1);
    });
    return map;
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
      if (selectedTypes.length > 0 && !selectedTypes.includes(a.type))
        return false;
      if (selectedStars.length > 0 && !selectedStars.includes(a.stars))
        return false;
      return true;
    });
  }, [accommodations, selectedCity, selectedStars, selectedTypes]);

  const filtered = useMemo(() => {
    if (!onlyExceptional) return baseFiltered;
    if (hasExceptionalFlags) return baseFiltered.filter((a) => a.exceptional);
    return baseFiltered;
  }, [baseFiltered, onlyExceptional, hasExceptionalFlags]);

  const exceptionalFilterCount = useMemo(
    () => baseFiltered.filter((a) => a.exceptional).length,
    [baseFiltered],
  );

  const { carousel, grid } = useMemo(
    () => splitAccommodationLists(filtered, onlyExceptional),
    [filtered, onlyExceptional],
  );

  const totalPages = catalogTotalPages(grid.length, CATALOG_PAGE_SIZE);
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const pagedGrid = useMemo(() => {
    const start = (page - 1) * CATALOG_PAGE_SIZE;
    return grid.slice(start, start + CATALOG_PAGE_SIZE);
  }, [grid, page]);

  const toggleType = (type: AccommodationType) => {
    goToFirstPage();
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleStars = (stars: number) => {
    goToFirstPage();
    setSelectedStars((prev) =>
      prev.includes(stars) ? prev.filter((s) => s !== stars) : [...prev, stars],
    );
  };

  const handleCityChange = (city: string) => {
    goToFirstPage();
    setSelectedCity(city);
  };

  const handleOnlyExceptionalChange = (value: boolean) => {
    goToFirstPage();
    setOnlyExceptional(value);
  };

  const resetFilters = () => {
    goToFirstPage();
    setSelectedCity("all");
    setSelectedTypes([]);
    setSelectedStars([]);
    setOnlyExceptional(false);
  };

  if (accommodations.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-lg text-muted-foreground">{t("noAccommodation")}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("resultsCount", { count: 0 })}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1245px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
        <AccommodationFilters
          cityOptions={cityOptions}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          selectedTypes={selectedTypes}
          onToggleType={toggleType}
          typeCount={typeCount}
          selectedStars={selectedStars}
          onToggleStars={toggleStars}
          starsCount={starsCount}
          onlyExceptional={onlyExceptional}
          onOnlyExceptionalChange={handleOnlyExceptionalChange}
          exceptionalFilterCount={exceptionalFilterCount}
          onReset={resetFilters}
        />

        <div
          className="flex min-w-0 flex-1 flex-col gap-8 lg:gap-10"
          lang={locale}
        >
          <AccommodationExceptionalCarousel items={carousel} />
          <AccommodationHotelsGrid
            items={pagedGrid}
            showTopDivider={carousel.length > 0}
          />

          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              {t("noAccommodationFilter")}
            </p>
          ) : null}
          <CatalogPagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default AccommodationGrid;
