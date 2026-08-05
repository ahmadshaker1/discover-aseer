"use client";

import { Button, Checkbox } from "@headlessui/react";
import { HeartIcon } from "./Icons";
import type { TourGuidesFilterOptions } from "@/components/tour-guides/data";
import { useLocale, useTranslations } from "next-intl";
import {
  FIXED_SPECIALIZATION_FILTERS,
  localizeTourGuideFilterLabel,
} from "@/components/tour-guides/tourGuideFilterLabels";

export interface TourGuidesFilterState {
  specializations: string[];
  gender: string[];
  transportation: string | null;
}

interface TourGuidesFilterProps {
  filterOptions: TourGuidesFilterOptions;
  filters: TourGuidesFilterState;
  onFiltersChange: (filters: TourGuidesFilterState) => void;
  onReset: () => void;
}

const TourGuidesFilter = ({
  filterOptions,
  filters,
  onFiltersChange,
  onReset,
}: TourGuidesFilterProps) => {
  const locale = useLocale();
  const t = useTranslations("tourGuides");
  const tCommon = useTranslations("common");

  const specializationCounts = new Map(
    filterOptions.specializations.map((item) => [item.id, item.count]),
  );

  const specializationOptions = FIXED_SPECIALIZATION_FILTERS.map((item) => ({
    id: item.id,
    label: locale === "en" ? item.en : item.id,
    count: specializationCounts.get(item.id) ?? 0,
  }));

  const handleSpecializationToggle = (id: string) => {
    onFiltersChange({
      ...filters,
      specializations: filters.specializations.includes(id)
        ? filters.specializations.filter((s) => s !== id)
        : [...filters.specializations, id],
    });
  };

  return (
    <div className="font-brando w-full rounded-lg bg-surface p-4 text-foreground shadow-sm lg:max-w-xs">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          {t("filterGuides")}
        </h2>
        <Button
          onClick={onReset}
          className="self-start whitespace-nowrap rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2 sm:self-auto"
        >
          {tCommon("resetFilters")}
        </Button>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <HeartIcon />
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            {t("specializations")}
          </h3>
        </div>
        <div className="space-y-2">
          {specializationOptions.map((item) => {
            const isChecked = filters.specializations.includes(item.id);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded p-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleSpecializationToggle(item.id)}
                    className="group relative inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border-2 border-border bg-surface transition data-checked:border-primary data-checked:bg-primary data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2"
                  >
                    <svg
                      className="h-3 w-3 stroke-white opacity-0 group-data-checked:opacity-100"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox>
                  <span className="text-start text-sm text-foreground">
                    {localizeTourGuideFilterLabel(item.label, locale)}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TourGuidesFilter;
