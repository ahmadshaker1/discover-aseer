"use client";

import Image from "next/image";
import { Button } from "@headlessui/react";
import { PointOfInterest } from "./data";

interface PreviewImagesProps {
  points: PointOfInterest[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const PreviewImages = ({
  points,
  currentIndex,
  onSelect,
}: PreviewImagesProps) => {
  return (
    <div
      className="flex gap-2 sm:gap-3 overflow-x-auto hide-scrollbar"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {points.map((point, index) => (
        <Button
          key={point.id}
          onClick={() => onSelect(index)}
          className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
            index === currentIndex
              ? "scale-110"
              : "opacity-70 hover:opacity-100 hover:scale-105"
          }`}
          aria-label={`Select ${point.title}`}
        >
          <Image
            src={point.image}
            alt={point.title}
            fill
            className="object-cover"
          />
          {index === currentIndex && <div className="absolute inset-0" />}
        </Button>
      ))}
    </div>
  );
};
