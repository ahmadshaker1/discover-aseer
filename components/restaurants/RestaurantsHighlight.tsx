"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { restaurants } from "./data";
import { SaudiRiyalIcon } from "./Icons";
import { Button } from "@headlessui/react";

const RestaurantsHighlight = () => {
  const router = useRouter();

  const handleRestaurantClick = useCallback((mapsUrl: string) => {
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  }, []);

  const handleShowMoreClick = () => {
    router.push("/restaurants");
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-24 space-y-6 sm:space-y-8 md:space-y-10">
        {/* Header */}
        <div className="flex flex-col items-end space-y-4 text-right w-full">
          <span className="h-px w-24 bg-gradient-to-l from-transparent via-black/40 to-transparent" />
          <h2 className="text-3xl md:text-4xl font-bold text-right w-full text-black">
            اكتشف أفضل المطاعم في عسير
          </h2>
          <p className="text-sm md:text-base text-right w-full text-gray-700">
            جرب ألذ المأكولات المحلية والعالمية في أجواء تضاهي روعة طبيعة عسير.
          </p>
        </div>

        {/* Restaurants row */}
        <div className="flex justify-end w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 sm:gap-6 min-w-max">
            {restaurants.slice(0, 4).map((restaurant) => (
              <button
                key={restaurant.id}
                type="button"
                onClick={() => handleRestaurantClick(restaurant.mapsUrl)}
                className="group w-[260px] sm:w-[280px] md:w-[320px] lg:w-[340px] h-[360px] sm:h-[380px] md:h-[400px] lg:h-[420px] flex flex-col text-left rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 flex-shrink-0"
              >
                <div className="relative h-56 md:h-64 w-full overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                      <span>{`(${restaurant.reviewsCount})`}</span>
                      <span>{`5/${restaurant.rating}`}</span>
                      <span className="text-yellow-300">★</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between px-5 py-4 flex-1">
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-right text-gray-900">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                      <span className="text-[10px]">كم</span>
                      <span>{restaurant.distanceKm}</span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="truncate">{restaurant.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-700">
                    <div className="flex items-center gap-1">
                      <SaudiRiyalIcon />
                      <span>{restaurant.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                      <span>{restaurant.nationality}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      <span>{restaurant.category}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Show more CTA */}
      <Button
        onClick={handleShowMoreClick}
        className="mt-10 inline-flex items-center justify-center rounded-full bg-[#6027D2] px-10 py-3 text-sm md:text-base font-semibold text-white  cursor-pointer hover:bg-[#4f1fb0] transition-colors"
      >
        عرض المزيد
      </Button>
    </section>
  );
};

export default RestaurantsHighlight;
