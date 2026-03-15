"use client";

import { useRef } from "react";
import { Button } from "@headlessui/react";
import { Recipe } from "./data";
import { RecipeCard } from "./RecipeCard";

interface RecipesCarouselProps {
  recipes: Recipe[];
}

export const RecipesCarousel = ({ recipes }: RecipesCarouselProps) => {
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

  if (recipes.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500">
        لا توجد وصفات متاحة
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="mt-4 sm:mt-6 flex justify-start gap-3 sm:gap-4">
        <Button
          onClick={() => scroll("left")}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
          aria-label="السابق"
        >
          <span className="text-lg sm:text-xl">←</span>
        </Button>
        <Button
          onClick={() => scroll("right")}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
          aria-label="التالي"
        >
          <span className="text-lg sm:text-xl">→</span>
        </Button>
      </div>
    </div>
  );
};
