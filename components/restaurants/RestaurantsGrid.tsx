"use client";

import { useCallback } from "react";
import { Restaurant } from "./data";
import { LocationIcon } from "./Icons";

interface RestaurantsGridProps {
  restaurants: Restaurant[];
}

const PLACEHOLDER_IMAGE = "/assets/experiences/experiences.png";

const RestaurantsGrid = ({ restaurants }: RestaurantsGridProps) => {
  const handleRestaurantClick = useCallback((mapsUrl: string) => {
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  }, []);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = PLACEHOLDER_IMAGE;
    },
    []
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {restaurants.map((restaurant) => (
          <button
            key={restaurant.id}
            type="button"
            onClick={() => handleRestaurantClick(restaurant.mapsUrl)}
            className="group w-full flex flex-col text-right rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-gray-200 transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            {/* Image area ~65–70% of card */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Info area: name + location only (from JSON) */}
            <div className="flex flex-col gap-1.5 px-4 sm:px-5 py-3 sm:py-4 bg-white">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 line-clamp-2">
                {restaurant.name}
              </h3>
              <div className="flex items-center justify-end gap-1.5 text-xs sm:text-sm text-gray-500">
                <LocationIcon />
                <span className="truncate">{restaurant.location}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsGrid;
