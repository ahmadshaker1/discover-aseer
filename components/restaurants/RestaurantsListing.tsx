"use client";

import { useMemo, useState } from "react";
import RestaurantsFilterSidebar from "@/components/restaurants/RestaurantsFilterSidebar";
import RestaurantsGrid from "@/components/restaurants/RestaurantsGrid";
import CatalogPagination from "@/components/catalog/CatalogPagination";
import { paginateCatalogItems } from "@/lib/directus/collectionCache";
import { useResetCatalogPage } from "@/components/catalog/useResetCatalogPage";
import type { Restaurant } from "@/components/restaurants/types";
import {
  applyRestaurantFilters,
  withInferredCityIds,
  type RestaurantFilterState,
} from "@/components/restaurants/applyRestaurantFilters";

const INITIAL_FILTERS: RestaurantFilterState = {
  city: null,
  cuisineTypes: [],
};

interface RestaurantsListingProps {
  restaurants: Restaurant[];
  currentPage: number;
}

export default function RestaurantsListing({
  restaurants,
  currentPage,
}: RestaurantsListingProps) {
  const [filters, setFilters] =
    useState<RestaurantFilterState>(INITIAL_FILTERS);
  const goToFirstPage = useResetCatalogPage(currentPage);

  const restaurantsWithCity = useMemo(
    () => withInferredCityIds(restaurants),
    [restaurants],
  );

  const filtered = useMemo(
    () => applyRestaurantFilters(restaurantsWithCity, filters),
    [restaurantsWithCity, filters],
  );
  const {
    page,
    totalPages,
    items: pagedRestaurants,
  } = paginateCatalogItems(filtered, currentPage);

  const handleFiltersChange = (next: RestaurantFilterState) => {
    goToFirstPage();
    setFilters(next);
  };

  const handleReset = () => {
    goToFirstPage();
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <aside className="w-full shrink-0  lg:w-auto">
        <RestaurantsFilterSidebar
          restaurants={restaurantsWithCity}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleReset}
        />
      </aside>
      <div className=" w-full ">
        <RestaurantsGrid restaurants={pagedRestaurants} />
        <CatalogPagination currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
