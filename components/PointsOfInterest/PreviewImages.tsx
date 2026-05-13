"use client";

import Image from "next/image";
import { Button } from "@headlessui/react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("common");

  return (
    <div
      className="flex h-[101px] w-full max-w-[653px] flex-row items-center gap-[24px] overflow-x-auto hide-scrollbar lg:w-[653px]"

      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {points.map((point, index) => (
        <Button
          key={point.id}
          onClick={() => onSelect(index)}
          className={`relative h-[101px] w-[140px] shrink-0 overflow-hidden rounded-[12px] transition-opacity duration-300 cursor-pointer ${index === currentIndex
              ? "z-1 opacity-100 ring-2 ring-white ring-offset-2 ring-offset-black/40"
              : "opacity-70 hover:opacity-100"
            }`}
          aria-label={`${t("browseMore")} ${point.title}`}
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
