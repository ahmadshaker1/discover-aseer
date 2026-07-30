"use client";

import { Button, Checkbox } from "@headlessui/react";
import { HeartIcon, WalletIcon } from "./Icons";
import type { TourGuidesFilterOptions } from "@/components/tour-guides/data";
import { useLocale, useTranslations } from "next-intl";
import { localizeTourGuideFilterLabel } from "@/components/tour-guides/tourGuideFilterLabels";

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
  const { specializations, gender, transportation } = filterOptions;

  const yesOption = transportation.find((opt) => opt.id === "yes");
  const isTransportSelected = filters.transportation === "yes";

  const handleSpecializationToggle = (id: string) => {
    onFiltersChange({
      ...filters,
      specializations: filters.specializations.includes(id)
        ? filters.specializations.filter((s) => s !== id)
        : [...filters.specializations, id],
    });
  };

  const handleGenderToggle = (id: string) => {
    onFiltersChange({
      ...filters,
      gender: filters.gender.includes(id)
        ? filters.gender.filter((g) => g !== id)
        : [...filters.gender, id],
    });
  };

  const handleTransportationSelect = (id: string) => {
    onFiltersChange({
      ...filters,
      transportation: filters.transportation === id ? null : id,
    });
  };

  return (
    <div className="font-brando w-full rounded-lg bg-surface p-4 text-foreground shadow-sm lg:max-w-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
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

      {/* Specializations (Interests) */}
      {specializations.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <HeartIcon />
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              {t("specializations")}
            </h3>
          </div>
          <div className="space-y-2">
            {specializations.map((item) => {
              const isChecked = filters.specializations.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded transition-colors"
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
                    <span className="text-sm text-start text-foreground">
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
      )}

      {/* Gender */}
      {gender.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              {t("gender")}
            </h3>
          </div>
          <div className="space-y-2">
            {gender.map((item) => {
              const isChecked = filters.gender.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isChecked}
                      onChange={() => handleGenderToggle(item.id)}
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
                    <span className="text-sm text-start text-foreground">
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
      )}

      {/* Transportation */}
      <div>
        <div className="flex items-center gap-2 mb-4"></div>
        <div className="flex flex-col gap-3">
          {yesOption && (
            <Button
              onClick={() => handleTransportationSelect("yes")}
              disabled={yesOption.count === 0}
              className={`cursor-pointer rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                isTransportSelected
                  ? "border-primary bg-muted text-foreground"
                  : "border-border text-foreground hover:border-muted-foreground"
              }`}
            >
              {t("transportAvailable")}
              <span className="me-1 text-muted-foreground">
                ({yesOption.count})
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourGuidesFilter;
