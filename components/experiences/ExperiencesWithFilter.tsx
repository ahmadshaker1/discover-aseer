"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import ExperienceCard from "@/components/experiences/ExperienceCard/ExperienceCard";
import ExperiencesFilter, {
  type FilterState,
} from "@/components/experiences/ExperiencesFilter/ExperiencesFilter";
import CatalogPagination from "@/components/catalog/CatalogPagination";
import { paginateCatalogItems } from "@/lib/directus/collectionCache";
import { useResetCatalogPage } from "@/components/catalog/useResetCatalogPage";
import type {
  ExperienceWithFilterMeta,
  FilterOptions,
} from "@/components/experiences/data";

const INITIAL_FILTERS: FilterState = {
  city: null,
  interests: [],
  cost: null,
  travelers: [],
};

interface ExperiencesWithFilterProps {
  experiences: ExperienceWithFilterMeta[];
  filterOptions: FilterOptions;
  currentPage: number;
}

function applyFilters(
  experiences: ExperienceWithFilterMeta[],
  filters: FilterState,
): ExperienceWithFilterMeta[] {
  return experiences.filter((exp) => {
    // if (filters.city && exp.filterCity !== filters.city) return false;
    if (filters.interests.length > 0) {
      const hasInterest = exp.filterInterests.some((i) =>
        filters.interests.includes(i),
      );
      if (!hasInterest) return false;
    }
    if (filters.cost === "paid" && !exp.isPaid) return false;
    if (filters.cost === "free" && exp.isPaid) return false;
    if (filters.travelers.length > 0) {
      const hasTraveler = exp.filterTravelers.some((t) =>
        filters.travelers.includes(t),
      );
      if (!hasTraveler) return false;
    }
    return true;
  });
}

export default function ExperiencesWithFilter({
  experiences,
  filterOptions,
  currentPage,
}: ExperiencesWithFilterProps) {
  const tCommon = useTranslations("common");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const goToFirstPage = useResetCatalogPage(currentPage);

  const filteredExperiences = useMemo(
    () => applyFilters(experiences, filters),
    [experiences, filters],
  );
  const {
    page,
    totalPages,
    items: pagedExperiences,
  } = paginateCatalogItems(filteredExperiences, currentPage);

  const handleFiltersChange = (next: FilterState) => {
    goToFirstPage();
    setFilters(next);
  };

  const handleReset = () => {
    goToFirstPage();
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
      <aside className="w-full max-w-md shrink-0 lg:w-1/4 lg:max-w-[320px] lg:self-start">
        <ExperiencesFilter
          filterOptions={filterOptions}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleReset}
        />
      </aside>

      <div className="w-full min-w-0 flex-1">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {pagedExperiences.map((experience) => (
            <ExperienceCard key={experience.id} {...experience} />
          ))}
        </div>
        {filteredExperiences.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            {tCommon("noExperiencesFilter")}
          </p>
        )}
        <CatalogPagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
