"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import FilterDropdown from "../landmarks/FilterDropdown";
import InterestsFilter from "../landmarks/InterestsFilter";
import { PriceIcon, LocationIcon } from "../landmarks/Icons";
import {
  cityOptions,
  restaurantTypeOptions,
  cuisineTypeOptions,
  priceOptions,
  dietaryOptions,
} from "./filterOptions";

// Icons for restaurant-specific filters
const RestaurantTypeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 21H21V19H3V21ZM5 17H19L18 15H6L5 17ZM7 13H17L16 11H8L7 13ZM9 9H15L14 7H10L9 9ZM11 3H13V5H11V3Z"
      fill="#9B9B9C"
    />
  </svg>
);

const CuisineIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H13V7H11V1H9V7H7V1H5V7H3V9H5V21H7V9H9V21H11V9H13V21H15V9H17V21H19V9H21Z"
      fill="#9B9B9C"
    />
  </svg>
);

const DietaryIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
      fill="#9B9B9C"
    />
  </svg>
);

const RestaurantsFilters = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedRestaurantType, setSelectedRestaurantType] = useState<
    string | null
  >(null);
  const [selectedCuisineType, setSelectedCuisineType] = useState<string | null>(
    null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedDietaryOptions, setSelectedDietaryOptions] = useState<
    string[]
  >([]);

  const handleDietaryToggle = (optionId: string) => {
    setSelectedDietaryOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <div className="flex justify-start w-full">
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <FilterDropdown
          icon={<LocationIcon />}
          label={t("city")}
          selectedValue={selectedCity}
          options={cityOptions}
          onSelect={setSelectedCity}
          onClear={() => setSelectedCity(null)}
          width="w-48"
        />

        <FilterDropdown
          icon={<RestaurantTypeIcon />}
          label={t("restaurantType")}
          selectedValue={selectedRestaurantType}
          options={restaurantTypeOptions}
          onSelect={setSelectedRestaurantType}
          onClear={() => setSelectedRestaurantType(null)}
        />

        <FilterDropdown
          icon={<CuisineIcon />}
          label={t("cuisineType")}
          selectedValue={selectedCuisineType}
          options={cuisineTypeOptions}
          onSelect={setSelectedCuisineType}
          onClear={() => setSelectedCuisineType(null)}
        />

        <FilterDropdown
          icon={<PriceIcon />}
          label={t("priceRange")}
          selectedValue={selectedPrice}
          options={priceOptions}
          onSelect={setSelectedPrice}
          onClear={() => setSelectedPrice(null)}
        />

        <InterestsFilter
          selectedInterests={selectedDietaryOptions}
          onToggle={handleDietaryToggle}
          onClear={() => setSelectedDietaryOptions([])}
          label={t("dietaryOptions")}
          options={dietaryOptions}
          icon={<DietaryIcon />}
        />
      </div>
    </div>
  );
};

export default RestaurantsFilters;
