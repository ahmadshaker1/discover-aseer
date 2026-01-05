"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import EventsCarouselCard, {
  EventsCarouselCardProps,
} from "./EventsCarouselCard";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

export interface EventsCarouselItem extends EventsCarouselCardProps {}

interface EventsCarouselProps {
  items: EventsCarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  slidesPerView?: number;
}

const EventsCarousel = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  slidesPerView = 4,
}: EventsCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="relative w-full py-12 md:py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-12 md:px-24">
        {/* Header */}
        <div className="flex justify-end mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6027D2]">
            مواسم وفعاليات سابقة
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={slidesPerView}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={
              autoPlay
                ? {
                    delay: autoPlayInterval,
                    disableOnInteraction: false,
                  }
                : false
            }
            loop={items.length > slidesPerView}
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
                slidesPerView: slidesPerView,
                spaceBetween: 24,
              },
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <EventsCarouselCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          {items.length > slidesPerView && (
            <>
              <button
                className="swiper-button-prev-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Previous slide"
              >
                <ChevronRightIcon />
              </button>
              <button
                className="swiper-button-next-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Next slide"
              >
                <ChevronLeftIcon />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsCarousel;

