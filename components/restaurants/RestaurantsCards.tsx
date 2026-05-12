"use client";

import { useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
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
  const locale = useLocale();
  const isRtl = locale === "ar";
  const tCommon = useTranslations("common");
  const swiperRef = useRef<SwiperType | null>(null);

  const handleRestaurantClick = useCallback((mapsUrl: string) => {
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  }, []);

  if (restaurants.length === 0) return null;

  return (
    <div className={`relative w-full flex ${isRtl ? "justify-end" : "justify-start"}`} dir={isRtl ? "rtl" : "ltr"}>
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
                className={`group flex h-[360px] w-full flex-col overflow-hidden rounded-2xl bg-surface text-foreground shadow-lg transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-[380px] sm:rounded-3xl md:h-[400px] lg:h-[420px] ${isRtl ? "text-right" : "text-left"}`}
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
                    <div className={`absolute top-4 ${isRtl ? "left-4" : "right-4"}`}>
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
                    <h3 className="text-right text-lg font-bold text-foreground md:text-xl">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      {restaurant.distanceKm > 0 && (
                        <>
                          <span className="text-[10px]">{tCommon("kmShort")}</span>
                          <span>{restaurant.distanceKm}</span>
                          <span className="mx-1 text-muted-foreground">•</span>
                        </>
                      )}
                      <span className="truncate">{restaurant.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <SaudiRiyalIcon />
                      <span>{restaurant.priceRange}</span>
                    </div>
                    {restaurant.nationality && (
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                        <span>{restaurant.nationality}</span>
                      </div>
                    )}
                    {restaurant.category && (
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
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
              className={`swiper-button-prev-restaurants absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isRtl ? "right-0" : "left-0"}`}
              aria-label={tCommon("previous")}
            >
              <span className={isRtl ? "" : "rotate-180"}><ChevronRightIcon /></span>
            </button>
            <button
              className={`swiper-button-next-restaurants absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isRtl ? "left-0" : "right-0"}`}
              aria-label={tCommon("next")}
            >
              <span className={isRtl ? "" : "rotate-180"}><ChevronLeftIcon /></span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantsCards;
