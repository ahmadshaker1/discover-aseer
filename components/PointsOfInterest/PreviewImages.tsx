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
      className="flex h-[101px] w-full max-w-[653px] flex-row gap-[24px] overflow-x-auto hide-scrollbar lg:w-[653px]"
      dir="rtl"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {points.map((point, index) => (
        <Button
          key={point.id}
          onClick={() => onSelect(index)}
          className={`relative h-[101px] w-[140px] shrink-0 overflow-hidden rounded-[12px] transition-all duration-300 cursor-pointer ${
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
