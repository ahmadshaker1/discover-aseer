"use client";

import { useState } from "react";
import { Button, Checkbox, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { cityOptions } from "./filterOptions";
import {
  LocationIcon,
  RestaurantTypeIcon,
  CuisineIcon,
  StarIcon,
  BuildingIcon,
  DiamondIcon,
  ChevronDownIcon,
} from "./Icons";

// Types
interface FilterState {
  city: string | null;
  restaurantType: string[];
  cuisineTypes: string[];
}

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
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 sm:space-x-4">
      <h2 className="text-lg sm:text-xl font-bold text-black">تصفية المطاعم</h2>
      <Button
        onClick={onReset}
        className="px-3 sm:px-4 py-1.5 sm:py-2 cursor-pointer text-xs sm:text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-gray-500 data-[focus]:ring-offset-2"
      >
        إعادة تعيين النتائج
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
  const selectedCityOption = cityOptions.find((opt) => opt.id === selectedCity);

  return (
    <div className="mb-6 sm:mb-8">
      <Menu as="div" className="relative">
        <Menu.Button className="flex flex-row-reverse items-center gap-2 w-full rounded-full bg-white text-black px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-pointer">
          <ChevronDownIcon />
          <span className="flex-1 text-right">
            {selectedCityOption?.label || "المدينة"}
          </span>
          <LocationIcon />
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
          <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black/10 focus:outline-none z-50 border border-gray-200">
            <div className="py-1">
              {cityOptions.map((option) => (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        onCityChange(
                          selectedCity === option.id ? null : option.id
                        )
                      }
                      className={`${
                        active ? "bg-[#6027D2]/10 text-[#6027D2]" : ""
                      } ${
                        selectedCity === option.id
                          ? "bg-[#6027D2]/5 text-[#6027D2] font-semibold"
                          : "text-black"
                      } block w-full text-right px-4 py-2 text-sm cursor-pointer transition-colors duration-150`}
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
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <RestaurantTypeIcon />
        <h3 className="text-base sm:text-lg font-bold text-black">
          نوع المطعم
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {restaurantTypes.map((type) => {
          const isSelected = selectedTypes.includes(type.id);
          return (
            <Button
              key={type.id}
              onClick={() => onTypeToggle(type.id)}
              className={`flex flex-col items-center justify-center cursor-pointer p-3 sm:p-4 rounded-lg border-2 transition-all data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-black data-[focus]:ring-offset-2 ${
                isSelected
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`mb-1.5 sm:mb-2 ${
                  isSelected ? "text-black" : "text-gray-400"
                }`}
              >
                {type.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium text-black">
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
      className="group relative cursor-pointer inline-flex h-4 w-4 items-center justify-center rounded border-2 border-gray-300 bg-white transition data-[checked]:border-black data-[checked]:bg-black data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-black data-[focus]:ring-offset-2"
    >
      <svg
        className="h-3 w-3 stroke-white opacity-0 group-data-[checked]:opacity-100"
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
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <CuisineIcon />
        <h3 className="text-base sm:text-lg font-bold text-black">
          اختر نوع المطبخ
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
              <div className="flex items-center gap-3 flex-row-reverse">
                <span className="text-sm text-black">{cuisine.label}</span>
                <FilterCheckbox
                  checked={isChecked}
                  onChange={() => onCuisineToggle(cuisine.id)}
                />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {cuisine.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Component
const RestaurantsFilterSidebar = () => {
  const [filters, setFilters] = useState<FilterState>({
    city: null,
    restaurantType: [],
    cuisineTypes: [],
  });

  const restaurantTypes: RestaurantType[] = [
    { id: "featured", label: "مميزة", icon: <StarIcon /> },
    { id: "popular", label: "شعبية", icon: <BuildingIcon /> },
    { id: "luxury", label: "فاخرة", icon: <DiamondIcon /> },
  ];

  // Sample cuisine counts - in real app, these would come from data
  const cuisinesWithCounts: CuisineOption[] = [
    { id: "asian", label: "اسيوي", count: 4 },
    { id: "american", label: "امريكي", count: 3 },
    { id: "saudi", label: "سعودي", count: 3 },
    { id: "middle-eastern", label: "شرق اوسطي", count: 3 },
  ];

  const handleRestaurantTypeToggle = (typeId: string) => {
    setFilters((prev) => ({
      ...prev,
      restaurantType: prev.restaurantType.includes(typeId)
        ? prev.restaurantType.filter((id) => id !== typeId)
        : [...prev.restaurantType, typeId],
    }));
  };

  const handleCuisineToggle = (cuisineId: string) => {
    setFilters((prev) => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisineId)
        ? prev.cuisineTypes.filter((id) => id !== cuisineId)
        : [...prev.cuisineTypes, cuisineId],
    }));
  };

  const handleCityChange = (cityId: string | null) => {
    setFilters((prev) => ({
      ...prev,
      city: cityId,
    }));
  };

  const handleReset = () => {
    setFilters({
      city: null,
      restaurantType: [],
      cuisineTypes: [],
    });
  };

  return (
    <div className="w-full max-w-md lg:max-w-none bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <FilterHeader onReset={handleReset} />
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
