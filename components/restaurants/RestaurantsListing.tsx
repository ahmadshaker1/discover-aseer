"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import RestaurantsFilterSidebar from "@/components/restaurants/RestaurantsFilterSidebar";
import RestaurantsGrid from "@/components/restaurants/RestaurantsGrid";
import type { Restaurant } from "@/components/restaurants/types";
import {
  applyRestaurantFilters,
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
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [filters, setFilters] = useState<RestaurantFilterState>(INITIAL_FILTERS);

  const filtered = useMemo(
    () => applyRestaurantFilters(restaurants, filters),
    [restaurants, filters]
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="w-full flex-1">
        <RestaurantsGrid restaurants={filtered} />
      </div>

      <aside className="w-full shrink-0 lg:w-auto">
        <RestaurantsFilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          onReset={() => setFilters(INITIAL_FILTERS)}
        />
      </aside>
    </div>
  );
}
