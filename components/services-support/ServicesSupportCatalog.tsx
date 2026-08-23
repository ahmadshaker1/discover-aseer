"use client";

import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useLocale, useTranslations } from "next-intl";
import CatalogPagination from "@/components/catalog/CatalogPagination";
import ServicesSupportFilterSidebar from "./ServicesSupportFilterSidebar";
import ServicesSupportGrid from "./ServicesSupportGrid";
import type { SupportService } from "./types";

interface ServicesSupportCatalogProps {
  services: SupportService[];
  currentPage: number;
  totalPages: number;
}

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

const ServicesSupportCatalog = ({
  services,
  currentPage,
  totalPages,
}: ServicesSupportCatalogProps) => {
  const t = useTranslations("servicesSupport");
  const locale = useLocale() as "ar" | "en";
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const cityOptions = useMemo(
    () =>
      buildOptions(
        services.map((service) => service.filterCity),
        locale,
      ),
    [services, locale],
  );

  const typeOptions = useMemo(
    () =>
      buildOptions(
        services.map((service) => service.filterType),
        locale,
      ),
    [services, locale],
  );

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const cityMatch = !selectedCity || selectedCity === service.filterCity;
      const typeMatch =
        selectedTypes.length === 0 ||
        selectedTypes.includes(service.filterType);

      return cityMatch && typeMatch;
    });
  }, [services, selectedCity, selectedTypes]);

  const toggleInList = (
    setter: Dispatch<SetStateAction<string[]>>,
    value: string,
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const resetFilters = () => {
    setSelectedCity(null);
    setSelectedTypes([]);
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="flex w-full min-w-0 flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="order-2 min-w-0 flex-1 lg:order-2">
          {services.length === 0 ? (
            <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-6 text-center text-muted-foreground">
              {t("noServicesData")}
            </div>
          ) : (
            <ServicesSupportGrid services={filteredServices} />
          )}
          <CatalogPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>

        <div className="order-1 w-full shrink-0 lg:order-1 lg:w-[min(100%,320px)] lg:max-w-[320px]">
          <ServicesSupportFilterSidebar
            cityOptions={cityOptions}
            typeOptions={typeOptions}
            selectedCity={selectedCity}
            selectedTypes={selectedTypes}
            onCityChange={(value) => {
              setSelectedCity(value);
            }}
            onToggleType={(value) => toggleInList(setSelectedTypes, value)}
            onReset={resetFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesSupportCatalog;
