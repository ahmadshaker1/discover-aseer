"use client";

import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import ServicesSupportFilterSidebar from "./ServicesSupportFilterSidebar";
import ServicesSupportGrid from "./ServicesSupportGrid";
import ServicesSupportPagination from "./ServicesSupportPagination";
import type { SupportService } from "./types";

interface ServicesSupportCatalogProps {
  services: SupportService[];
}

const ITEMS_PER_PAGE = 9;

interface FilterOption {
  value: string;
  count: number;
}

function buildOptions(values: string[]): FilterOption[] {
  const counts = values.reduce<Map<string, number>>((map, value) => {
    const key = value.trim();
    if (!key) return map;
    map.set(key, (map.get(key) || 0) + 1);
    return map;
  }, new Map());

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value, "ar"));
}

const ServicesSupportCatalog = ({ services }: ServicesSupportCatalogProps) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const cityOptions = useMemo(
    () => buildOptions(services.map((service) => service.city)),
    [services],
  );

  const categoryOptions = useMemo(
    () => buildOptions(services.map((service) => service.category)),
    [services],
  );

  const typeOptions = useMemo(
    () => buildOptions(services.map((service) => service.type)),
    [services],
  );

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const cityMatch =
        selectedCities.length === 0 || selectedCities.includes(service.city);
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(service.category);
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(service.type);

      return cityMatch && categoryMatch && typeMatch;
    });
  }, [services, selectedCities, selectedCategories, selectedTypes]);

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
    setSelectedCities([]);
    setSelectedCategories([]);
    setSelectedTypes([]);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="order-2 w-full flex-1 lg:order-1">
          {services.length === 0 ? (
            <div
              className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-600"
              dir="rtl"
            >
              لا توجد بيانات خدمات متاحة حاليًا. يرجى التحقق من إعدادات الـ API
              أو المحاولة لاحقًا.
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

        <div className="order-1 w-full max-w-[300px] lg:order-2 lg:w-[300px] lg:shrink-0">
          <ServicesSupportFilterSidebar
            cityOptions={cityOptions}
            categoryOptions={categoryOptions}
            typeOptions={typeOptions}
            selectedCities={selectedCities}
            selectedCategories={selectedCategories}
            selectedTypes={selectedTypes}
            onToggleCity={(value) => toggleInList(setSelectedCities, value)}
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
