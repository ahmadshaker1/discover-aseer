"use client";

import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Restaurant } from "./data";
import { SaudiRiyalIcon } from "./Icons";
import { ChevronLeftIcon, ChevronRightIcon } from "../events/EventsCarousel/Icons";

interface RestaurantsCardsProps {
  restaurants: Restaurant[];
}

const RestaurantsCards = ({ restaurants }: RestaurantsCardsProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleRestaurantClick = useCallback((mapsUrl: string) => {
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  }, []);

  if (restaurants.length === 0) return null;

  return (
    <div className="relative w-full flex justify-end">
      <div className="w-full max-w-full">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={4}
          navigation={{
            nextEl: ".swiper-button-next-restaurants",
            prevEl: ".swiper-button-prev-restaurants",
          }}
          loop={restaurants.length > 4}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="overflow-visible"
        >
          {restaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.id}>
              <button
                type="button"
                onClick={() => handleRestaurantClick(restaurant.mapsUrl)}
                className="group w-full h-[360px] sm:h-[380px] md:h-[400px] lg:h-[420px] flex flex-col text-left rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <div className="relative h-56 md:h-64 w-full overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/0 to-black/10" />
                  {restaurant.rating > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                        {restaurant.reviewsCount > 0 && (
                          <span>{`(${restaurant.reviewsCount})`}</span>
                        )}
                        <span>{restaurant.rating.toFixed(1)}</span>
                        <span className="text-yellow-300">★</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between px-5 py-4 flex-1">
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-right text-gray-900">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                      {restaurant.distanceKm > 0 && (
                        <>
                          <span className="text-[10px]">كم</span>
                          <span>{restaurant.distanceKm}</span>
                          <span className="mx-1 text-gray-400">•</span>
                        </>
                      )}
                      <span className="truncate">{restaurant.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-700">
                    <div className="flex items-center gap-1">
                      <SaudiRiyalIcon />
                      <span>{restaurant.priceRange}</span>
                    </div>
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
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        {restaurants.length > 4 && (
          <>
            <button
              className="swiper-button-prev-restaurants absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronRightIcon />
            </button>
            <button
              className="swiper-button-next-restaurants absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronLeftIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantsCards;
