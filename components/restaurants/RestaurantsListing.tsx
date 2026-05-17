"use client";

import { useMemo, useState } from "react";
import RestaurantsFilterSidebar from "@/components/restaurants/RestaurantsFilterSidebar";
import RestaurantsGrid from "@/components/restaurants/RestaurantsGrid";
import type { Restaurant } from "@/components/restaurants/types";
import {
  applyRestaurantFilters,
  withInferredCityIds,
  type RestaurantFilterState,
} from "@/components/restaurants/applyRestaurantFilters";

const INITIAL_FILTERS: RestaurantFilterState = {
  city: null,
  restaurantType: [],
  cuisineTypes: [],
};

interface RestaurantsListingProps {
  restaurants: Restaurant[];
}

export default function RestaurantsListing({ restaurants }: RestaurantsListingProps) {
  const [filters, setFilters] = useState<RestaurantFilterState>(INITIAL_FILTERS);

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
      <div className="order-2 w-full flex-1 lg:order-1">
        <RestaurantsGrid restaurants={filtered} />
      </div>

      <aside className="order-1 w-full shrink-0 lg:order-2 lg:w-auto">
        <RestaurantsFilterSidebar
          restaurants={restaurantsWithCity}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={() => setFilters(INITIAL_FILTERS)}
        />
      </aside>
    </div>
  );
}
