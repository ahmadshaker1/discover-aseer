"use client";

import { useCallback } from "react";
import { Restaurant } from "./data";
import { SaudiRiyalIcon } from "./Icons";

interface RestaurantsGridProps {
  restaurants: Restaurant[];
}

const RestaurantsGrid = ({ restaurants }: RestaurantsGridProps) => {
  const handleRestaurantClick = useCallback((mapsUrl: string) => {
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {restaurants.map((restaurant) => (
          <button
            key={restaurant.id}
            type="button"
            onClick={() => handleRestaurantClick(restaurant.mapsUrl)}
            className="group w-full h-[360px] sm:h-[380px] md:h-[400px] lg:h-[420px] flex flex-col text-left rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />
              {restaurant.rating > 0 && (
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white">
                    {restaurant.reviewsCount > 0 && (
                      <span>{`(${restaurant.reviewsCount})`}</span>
                    )}
                    <span>{restaurant.rating.toFixed(1)}</span>
                    <span className="text-yellow-300">★</span>
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between px-4 sm:px-5 py-3 sm:py-4 flex-1">
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-right text-gray-900 line-clamp-2">
                  {restaurant.name}
                </h3>
                <div className="flex items-center justify-end gap-1 text-xs sm:text-sm text-gray-500">
                  {restaurant.distanceKm > 0 && (
                    <>
                      <span>كم</span>
                      <span>{restaurant.distanceKm}</span>
                      <span className="mx-1 text-gray-400">•</span>
                    </>
                  )}
                  <span className="truncate">{restaurant.location}</span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs sm:text-sm text-gray-700 flex-wrap gap-2">
                <div className="flex items-center gap-1">
                  <SaudiRiyalIcon />
                  <span>{restaurant.priceRange}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {restaurant.nationality && (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                      <span>{restaurant.nationality}</span>
                    </div>
                  )}
                  {restaurant.category && (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      <span>{restaurant.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsGrid;
