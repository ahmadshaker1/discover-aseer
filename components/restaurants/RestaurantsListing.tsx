"use client";

import { useMemo, useState } from "react";
import RestaurantsFilterSidebar from "@/components/restaurants/RestaurantsFilterSidebar";
import RestaurantsGrid from "@/components/restaurants/RestaurantsGrid";
import CatalogPagination from "@/components/catalog/CatalogPagination";
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
  totalPages: number;
}

export default function RestaurantsListing({
  restaurants,
  currentPage,
  totalPages,
}: RestaurantsListingProps) {
  const [filters, setFilters] =
    useState<RestaurantFilterState>(INITIAL_FILTERS);

  const restaurantsWithCity = useMemo(
    () => withInferredCityIds(restaurants),
    [restaurants],
  );

  const filtered = useMemo(
    () => applyRestaurantFilters(restaurantsWithCity, filters),
    [restaurantsWithCity, filters],
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <aside className="w-full shrink-0  lg:w-auto">
        <RestaurantsFilterSidebar
          restaurants={restaurantsWithCity}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={() => setFilters(INITIAL_FILTERS)}
        />
      </aside>
      <div className=" w-full ">
        <RestaurantsGrid restaurants={filtered} />
        <CatalogPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
