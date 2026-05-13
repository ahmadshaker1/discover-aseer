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
      className="ms-auto flex min-h-[110px] w-full min-w-0 flex-row items-center justify-end gap-2 overflow-x-auto overflow-y-visible py-2 ps-1 hide-scrollbar sm:gap-2.5 md:gap-3"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {points.map((point, index) => {
        const selected = index === currentIndex;
        return (
          <Button
            key={`${point.id}-${index}`}
            onClick={() => onSelect(index)}
            className={`relative h-[72px] w-[100px] shrink-0 cursor-pointer overflow-hidden rounded-md bg-black/50 transition-transform duration-200 ease-out will-change-transform sm:h-[76px] sm:w-[106px] md:h-[80px] md:w-[112px] ${
              selected ? "z-10 scale-110" : "z-0 scale-100 hover:scale-105"
            }`}
            aria-label={`${t("browseMore")} ${point.title}`}
            aria-current={selected ? "true" : undefined}
          >
            <Image
              src={point.image}
              alt={point.title}
              fill
              quality={85}
              sizes="(max-width: 640px) 100px, (max-width: 1024px) 112px, 120px"
              className="object-cover object-center"
            />
          </Button>
        );
      })}
    </div>
  );
};
