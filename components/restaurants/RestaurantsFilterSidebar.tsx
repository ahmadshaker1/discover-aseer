"use client";

import type { Dispatch, SetStateAction } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Checkbox, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getCityOptions } from "@/components/landmarks/filterOptions";
import type { Restaurant } from "@/components/restaurants/types";
import AseeriCuisineBadge from "@/components/restaurants/AseeriCuisineBadge";
import {
  countRestaurantsForCuisine,
  countRestaurantsForCity,
  CUISINE_FILTER_IDS,
  type RestaurantFilterState,
} from "@/components/restaurants/applyRestaurantFilters";
import { LocationIcon, CuisineIcon, ChevronDownIcon } from "./Icons";

const ASEERI_CUISINE_FILTER_ID = "aseeri_cuisine";

interface CuisineOption {
  id: string;
  label: string;
  count: number;
}

// Filter Header Component
interface FilterHeaderProps {
  onReset: () => void;
}

const FilterHeader = ({ onReset }: FilterHeaderProps) => {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 sm:space-x-4">
      <h2 className="text-lg font-bold text-foreground sm:text-xl">
        {t("filterRestaurants")}
      </h2>
      <Button
        onClick={onReset}
        className="cursor-pointer whitespace-nowrap rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2 sm:px-4 sm:py-2 sm:text-sm"
      >
        {t("resetFilters")}
      </Button>
    </div>
  );
};

// Location Filter Component
interface LocationFilterProps {
  cityOptions: { id: string; label: string }[];
  selectedCity: string | null;
  onCityChange: (cityId: string | null) => void;
}

const LocationFilter = ({
  cityOptions,
  selectedCity,
  onCityChange,
}: LocationFilterProps) => {
  const t = useTranslations("common");
  const selectedCityOption = cityOptions.find((opt) => opt.id === selectedCity);

  return (
    <div className="mb-6 sm:mb-8">
      <Menu as="div" className="relative">
        <Menu.Button
          className={`flex w-full cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-3 py-2.5 text-xs text-foreground transition-all duration-200 hover:border-muted-foreground sm:px-4 sm:py-3 sm:text-sm flex-row`}
        >
          <LocationIcon />
          <span className="flex-1 text-start">
            {selectedCityOption?.label || t("city")}
          </span>
          <ChevronDownIcon />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95 translate-y-1"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 translate-y-1"
        >
          <Menu.Items
            className={`absolute z-50 mt-2 w-full rounded-lg border border-border bg-surface shadow-xl ring-1 ring-border focus:outline-none start-0 origin-top-start`}
          >
            <div className="py-1">
              {cityOptions.map((option) => (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        onCityChange(
                          selectedCity === option.id ? null : option.id,
                        )
                      }
                      className={`${
                        active ? "bg-primary/10 text-primary" : ""
                      } ${
                        selectedCity === option.id
                          ? "bg-primary/5 font-semibold text-primary"
                          : "text-foreground"
                      } block w-full text-start px-4 py-2 text-sm cursor-pointer transition-colors duration-150`}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

// Filter Checkbox Component
interface FilterCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const FilterCheckbox = ({ checked, onChange }: FilterCheckboxProps) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      className="group relative inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border-2 border-border dark:border-white bg-surface transition data-[checked]:border-primary data-[checked]:bg-primary data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-primary data-[focus]:ring-offset-2"
    >
      <svg
        className="h-3 w-3 stroke-white dark:stroke-white opacity-0 group-data-[checked]:opacity-100"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="white"
        />
      </svg>
    </Checkbox>
  );
};

// Cuisine Type Filter Component
interface CuisineTypeFilterProps {
  cuisines: CuisineOption[];
  selectedCuisines: string[];
  onCuisineToggle: (cuisineId: string) => void;
}

const CuisineTypeFilter = ({
  cuisines,
  selectedCuisines,
  onCuisineToggle,
}: CuisineTypeFilterProps) => {
  const t = useTranslations("common");
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <CuisineIcon />
        <h3 className="text-base font-bold text-foreground sm:text-lg">
          {t("chooseCuisineType")}
        </h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {cuisines.map((cuisine) => {
          const isChecked = selectedCuisines.includes(cuisine.id);
          const isAseeri = cuisine.id === ASEERI_CUISINE_FILTER_ID;
          return (
            <div
              key={cuisine.id}
              className="flex items-center justify-between p-1 rounded transition-colors"
            >
              <div className="flex min-w-0 items-center gap-3">
                <FilterCheckbox
                  checked={isChecked}
                  onChange={() => onCuisineToggle(cuisine.id)}
                />
                {isAseeri ? (
                  <AseeriCuisineBadge variant="filter" />
                ) : (
                  <span className="text-10 text-start text-foreground">
                    {cuisine.label}
                  </span>
                )}
              </div>
              <span className="text-10 text-muted-foreground">
                {cuisine.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CUISINE_LABEL_KEYS: Record<(typeof CUISINE_FILTER_IDS)[number], string> =
  {
    aseeri_cuisine: "cuisineAseeri",
    khaleeji: "cuisineKhaleeji",
    lebanese: "cuisineLebanese",
    italian: "cuisineItalian",
    indian: "cuisineIndian",
    international_cuisine: "cuisineInternational",
    american: "cuisineAmerican",
    cafe: "cuisineCafe",
  };

export interface RestaurantsFilterSidebarProps {
  restaurants: Restaurant[];
  filters: RestaurantFilterState;
  onFiltersChange: Dispatch<SetStateAction<RestaurantFilterState>>;
  onReset: () => void;
}

const RestaurantsFilterSidebar = ({
  restaurants,
  filters,
  onFiltersChange,
  onReset,
}: RestaurantsFilterSidebarProps) => {
  const locale = useLocale();
  const t = useTranslations("common");

  const cityOptions = getCityOptions(locale).filter(
    (opt) => countRestaurantsForCity(restaurants, opt.id) > 0,
  );

  const cuisinesWithCounts: CuisineOption[] = CUISINE_FILTER_IDS.map((id) => ({
    id,
    label: t(CUISINE_LABEL_KEYS[id]),
    count: countRestaurantsForCuisine(restaurants, id),
  }));

  const handleCuisineToggle = (cuisineId: string) => {
    onFiltersChange((prev) => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisineId)
        ? prev.cuisineTypes.filter((id) => id !== cuisineId)
        : [...prev.cuisineTypes, cuisineId],
    }));
  };

  const handleCityChange = (cityId: string | null) => {
    onFiltersChange((prev) => ({
      ...prev,
      city: cityId,
    }));
  };

  return (
    <div className="font-brando w-full max-w-md rounded-lg bg-surface p-4 text-foreground shadow-sm lg:max-w-none">
      <FilterHeader onReset={onReset} />
      <LocationFilter
        cityOptions={cityOptions}
        selectedCity={filters.city}
        onCityChange={handleCityChange}
      />
      <CuisineTypeFilter
        cuisines={cuisinesWithCounts}
        selectedCuisines={filters.cuisineTypes}
        onCuisineToggle={handleCuisineToggle}
      />
    </div>
  );
};

export default RestaurantsFilterSidebar;
