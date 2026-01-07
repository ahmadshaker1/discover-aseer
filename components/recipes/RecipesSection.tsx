"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@headlessui/react";

interface Recipe {
  id: number;
  title: string;
  duration: string;
  type: string;
  rating: number;
  reviews: number;
  image: string;
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: "الحنيد",
    duration: "30 دقيقة",
    type: "لحم",
    rating: 4.8,
    reviews: 233,
    image: "/assets/activities/aseer-cuisine.jpg",
  },
  {
    id: 2,
    title: "الحنيد",
    duration: "30 دقيقة",
    type: "لحم",
    rating: 4.8,
    reviews: 233,
    image: "/assets/activities/aseer-cuisine.jpg",
  },
  {
    id: 3,
    title: "الحنيد",
    duration: "30 دقيقة",
    type: "لحم",
    rating: 4.8,
    reviews: 233,
    image: "/assets/activities/aseer-cuisine.jpg",
  },
  {
    id: 4,
    title: "الحنيد",
    duration: "30 دقيقة",
    type: "لحم",
    rating: 4.8,
    reviews: 233,
    image: "/assets/activities/aseer-cuisine.jpg",
  },
];

const RecipesSection = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24 // gap-6
      : 320;
    const amount = direction === "left" ? -cardWidth : cardWidth;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col items-end mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-right w-full text-black">
            المطبخ العسيري
          </h2>
          <p className="text-sm text-neutral-500 text-right w-full">
            زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {recipes.map((recipe) => (
              <Button
                key={recipe.id}
                as="div"
                className="min-w-[260px] md:min-w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden flex-shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
              >
                <div className="relative h-52 md:h-60">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                  {/* Rating badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs flex items-center gap-1">
                    <span>({recipe.reviews})</span>
                    <span>{recipe.rating.toFixed(1)}/5</span>
                    <span>⭐</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 px-6 py-4">
                  <h3 className="text-lg font-semibold">{recipe.title}</h3>
                  <div className="flex items-center gap-6 text-sm text-neutral-700">
                    <div className="flex items-center gap-1">
                      <span>{recipe.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{recipe.duration}</span>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="mt-6 flex justify-start gap-4">
            <Button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer"
              aria-label="السابق"
            >
              <span className="text-xl">←</span>
            </Button>
            <Button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer"
              aria-label="التالي"
            >
              <span className="text-xl">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
