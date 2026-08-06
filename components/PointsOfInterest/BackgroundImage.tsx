"use client";

import Image from "next/image";
import { PointOfInterest } from "./data";

interface BackgroundImageProps {
  point: PointOfInterest;
}

export const BackgroundImage = ({ point }: BackgroundImageProps) => {
  return (
    <div className="relative h-[min(65dvh,700px)] min-h-[420px] w-full">
      <Image
        src={point.image}
        alt={point.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
};
