"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import ExperienceCard from "@/components/experiences/ExperienceCard/ExperienceCard";
import ExperiencesFilter, {
  type FilterState,
} from "@/components/experiences/ExperiencesFilter/ExperiencesFilter";
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
}

function applyFilters(
  experiences: ExperienceWithFilterMeta[],
  filters: FilterState
): ExperienceWithFilterMeta[] {
  return experiences.filter((exp) => {
    if (filters.city && exp.filterCity !== filters.city) return false;
    if (filters.interests.length > 0) {
      const hasInterest = exp.filterInterests.some((i) =>
        filters.interests.includes(i)
      );
      if (!hasInterest) return false;
    }
    if (filters.cost === "paid" && !exp.isPaid) return false;
    if (filters.cost === "free" && exp.isPaid) return false;
    if (filters.travelers.length > 0) {
      const hasTraveler = exp.filterTravelers.some((t) =>
        filters.travelers.includes(t)
      );
      if (!hasTraveler) return false;
    }
    return true;
  });
}

export default function ExperiencesWithFilter({
  experiences,
  filterOptions,
}: ExperiencesWithFilterProps) {
  const tCommon = useTranslations("common");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filteredExperiences = useMemo(
    () => applyFilters(experiences, filters),
    [experiences, filters]
  );

  const handleReset = () => setFilters(INITIAL_FILTERS);

  return (
    <div className="flex flex-col gap-8 lg:flex-row-reverse">
      <aside className="shrink-0 lg:self-start">
        <ExperiencesFilter
          filterOptions={filterOptions}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={handleReset}
        />
      </aside>

      <div className="flex-1">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredExperiences.map((experience) => (
            <ExperienceCard key={experience.id} {...experience} />
          ))}
        </div>
        {filteredExperiences.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            {tCommon("noExperiencesFilter")}
          </p>
        )}
      </div>
    </div>
  );
}
