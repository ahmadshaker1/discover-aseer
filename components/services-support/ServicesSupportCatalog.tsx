"use client";

import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useLocale, useTranslations } from "next-intl";
import ServicesSupportFilterSidebar from "./ServicesSupportFilterSidebar";
import ServicesSupportGrid from "./ServicesSupportGrid";
import ServicesSupportPagination from "./ServicesSupportPagination";
import type { SupportService } from "./types";

interface ServicesSupportCatalogProps {
  services: SupportService[];
}

/** 3 columns × 4 rows on large screens */
const ITEMS_PER_PAGE = 12;

interface FilterOption {
  value: string;
  count: number;
}

function buildOptions(values: string[], locale: "ar" | "en"): FilterOption[] {
  const counts = values.reduce<Map<string, number>>((map, value) => {
    const key = value.trim();
    if (!key) return map;
    map.set(key, (map.get(key) || 0) + 1);
    return map;
  }, new Map());

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value, locale));
}

const ServicesSupportCatalog = ({ services }: ServicesSupportCatalogProps) => {
  const t = useTranslations("servicesSupport");
  const locale = useLocale() as "ar" | "en";
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const cityOptions = useMemo(
    () => buildOptions(services.map((service) => service.filterCity), locale),
    [services, locale],
  );

  const categoryOptions = useMemo(
    () =>
      buildOptions(services.map((service) => service.filterCategory), locale),
    [services, locale],
  );

  const typeOptions = useMemo(
    () => buildOptions(services.map((service) => service.filterType), locale),
    [services, locale],
  );

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const cityMatch = !selectedCity || selectedCity === service.filterCity;
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(service.filterCategory);
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(service.filterType);

      return cityMatch && categoryMatch && typeMatch;
    });
  }, [services, selectedCity, selectedCategories, selectedTypes]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredServices.length / ITEMS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedServices = filteredServices.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  const toggleInList = (
    setter: Dispatch<SetStateAction<string[]>>,
    value: string,
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCity(null);
    setSelectedCategories([]);
    setSelectedTypes([]);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="flex w-full min-w-0 flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="order-2 min-w-0 flex-1 lg:order-2">
          {services.length === 0 ? (
            <div
              className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-muted-foreground"
             
            >
              {t("noServicesData")}
            </div>
          ) : (
            <ServicesSupportGrid services={paginatedServices} />
          )}
          <ServicesSupportPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="order-1 w-full shrink-0 lg:order-1 lg:w-[min(100%,320px)] lg:max-w-[320px]">
          <ServicesSupportFilterSidebar
            cityOptions={cityOptions}
            categoryOptions={categoryOptions}
            typeOptions={typeOptions}
            selectedCity={selectedCity}
            selectedCategories={selectedCategories}
            selectedTypes={selectedTypes}
            onCityChange={(value) => {
              setSelectedCity(value);
              setCurrentPage(1);
            }}
            onToggleCategory={(value) =>
              toggleInList(setSelectedCategories, value)
            }
            onToggleType={(value) => toggleInList(setSelectedTypes, value)}
            onReset={resetFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesSupportCatalog;
