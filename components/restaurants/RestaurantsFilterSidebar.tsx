"use client";

import type { Dispatch, SetStateAction } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Checkbox, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getCityOptions } from "@/components/landmarks/filterOptions";
import type { Restaurant } from "@/components/restaurants/types";
import {
  countRestaurantsForCuisine,
  CUISINE_FILTER_IDS,
  type RestaurantFilterState,
} from "@/components/restaurants/applyRestaurantFilters";
import {
  LocationIcon,
  RestaurantTypeIcon,
  CuisineIcon,
  StarIcon,
  BuildingIcon,
  DiamondIcon,
  ChevronDownIcon,
} from "./Icons";

interface RestaurantType {
  id: string;
  label: string;
  icon: React.ReactNode;
}

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
      <h2 className="text-lg font-bold text-foreground sm:text-xl">{t("filterRestaurants")}</h2>
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
  selectedCity: string | null;
  onCityChange: (cityId: string | null) => void;
}

const LocationFilter = ({
  selectedCity,
  onCityChange,
}: LocationFilterProps) => {
  const locale = useLocale();
  const t = useTranslations("common");
  const cityOpts = getCityOptions(locale);
  const selectedCityOption = cityOpts.find((opt) => opt.id === selectedCity);

  return (
    <div className="mb-6 sm:mb-8">
      <Menu as="div" className="relative">
        <Menu.Button className={`flex w-full cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-3 py-2.5 text-xs text-foreground transition-all duration-200 hover:border-muted-foreground sm:px-4 sm:py-3 sm:text-sm flex-row`}>
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
          <Menu.Items className={`absolute z-50 mt-2 w-full rounded-lg border border-border bg-surface shadow-xl ring-1 ring-border focus:outline-none start-0 origin-top-start`}>
            <div className="py-1">
              {cityOpts.map((option) => (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        onCityChange(
                          selectedCity === option.id ? null : option.id
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

// Restaurant Type Filter Component
interface RestaurantTypeFilterProps {
  restaurantTypes: RestaurantType[];
  selectedTypes: string[];
  onTypeToggle: (typeId: string) => void;
}

const RestaurantTypeFilter = ({
  restaurantTypes,
  selectedTypes,
  onTypeToggle,
}: RestaurantTypeFilterProps) => {
  const t = useTranslations("common");
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <RestaurantTypeIcon />
        <h3 className="text-base font-bold text-foreground sm:text-lg">
          {t("restaurantType")}
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {restaurantTypes.map((type) => {
          const isSelected = selectedTypes.includes(type.id);
          return (
            <Button
              key={type.id}
              onClick={() => onTypeToggle(type.id)}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-3 transition-all data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2 sm:p-4 ${
                isSelected
                  ? "border-primary bg-muted"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <div
                className={`mb-1.5 sm:mb-2 ${
                  isSelected ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {type.icon}
              </div>
              <span className="text-xs font-medium text-foreground sm:text-sm">
                {type.label}
              </span>
            </Button>
          );
        })}
      </div>
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
      className="group relative inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded border-2 border-border bg-surface transition data-checked:border-primary data-checked:bg-primary data-focus:outline-none data-focus:ring-2 data-focus:ring-primary data-focus:ring-offset-2"
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
      <div className="space-y-3 sm:space-y-4">
        {cuisines.map((cuisine) => {
          const isChecked = selectedCuisines.includes(cuisine.id);
          return (
            <div
              key={cuisine.id}
              className="flex items-center justify-between p-2 rounded transition-colors"
            >
              <div className={`flex items-center gap-3 flex-row`}>
                <span className="text-sm text-foreground">{cuisine.label}</span>
                <FilterCheckbox
                  checked={isChecked}
                  onChange={() => onCuisineToggle(cuisine.id)}
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {cuisine.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CUISINE_LABEL_KEYS: Record<(typeof CUISINE_FILTER_IDS)[number], string> = {
  asian: "cuisineAsian",
  american: "cuisineAmerican",
  saudi: "cuisineSaudi",
  "middle-eastern": "cuisineMiddleEastern",
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
  const t = useTranslations("common");

  const restaurantTypes: RestaurantType[] = [
    { id: "featured", label: t("featured"), icon: <StarIcon /> },
    { id: "popular", label: t("popular"), icon: <BuildingIcon /> },
    { id: "luxury", label: t("luxury"), icon: <DiamondIcon /> },
  ];

  const cuisinesWithCounts: CuisineOption[] = CUISINE_FILTER_IDS.map((id) => ({
    id,
    label: t(CUISINE_LABEL_KEYS[id]),
    count: countRestaurantsForCuisine(restaurants, id),
  }));

  const handleRestaurantTypeToggle = (typeId: string) => {
    onFiltersChange((prev) => ({
      ...prev,
      restaurantType: prev.restaurantType.includes(typeId)
        ? prev.restaurantType.filter((id) => id !== typeId)
        : [...prev.restaurantType, typeId],
    }));
  };

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
    <div className="w-full max-w-md rounded-lg bg-surface p-4 text-foreground shadow-sm lg:max-w-none">
      <FilterHeader onReset={onReset} />
      <LocationFilter
        selectedCity={filters.city}
        onCityChange={handleCityChange}
      />
      <RestaurantTypeFilter
        restaurantTypes={restaurantTypes}
        selectedTypes={filters.restaurantType}
        onTypeToggle={handleRestaurantTypeToggle}
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
