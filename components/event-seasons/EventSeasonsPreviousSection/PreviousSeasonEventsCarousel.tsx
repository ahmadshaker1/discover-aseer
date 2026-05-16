"use client";

import type { PreviousSeasonItem } from "../types";
import PreviousSeasonEventCard from "./PreviousSeasonEventCard";

interface PreviousSeasonEventsCarouselProps {
  seasons: PreviousSeasonItem[];
}

export default function PreviousSeasonEventsCarousel({
  seasons,
}: PreviousSeasonEventsCarouselProps) {
  if (seasons.length === 0) return null;

  return (
    <div
      className="flex w-full gap-6 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] md:gap-[24px] [&::-webkit-scrollbar]:hidden"
      role="region"
      aria-label="Previous seasons carousel"
    >
      {seasons.map((season) => (
        <PreviousSeasonEventCard key={season.id} season={season} />
      ))}
    </div>
  );
}
