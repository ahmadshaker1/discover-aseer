"use client";

import { useState } from "react";
import { PointOfInterest } from "./data";
import { BackgroundImage } from "./BackgroundImage";
import { TextOverlay } from "./TextOverlay";
import { NavigationControls } from "./NavigationControls";
import { PreviewImages } from "./PreviewImages";

interface PointsOfInterestCarouselProps {
  points: PointOfInterest[];
}

export const PointsOfInterestCarousel = ({
  points,
}: PointsOfInterestCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPoint = points[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % points.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + points.length) % points.length);
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (points.length === 0) {
    return (
      <div className="relative w-full min-h-screen max-w-screen-2xl mx-auto overflow-hidden flex items-center justify-center">
        <p className="text-white text-xl">لا توجد نقاط اهتمام متاحة</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen max-w-screen-2xl mx-auto overflow-hidden">
      <BackgroundImage point={currentPoint} />
      <TextOverlay point={currentPoint} />

      {/* Carousel Preview Images - Lower Left */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-12 md:left-12 lg:bottom-24 lg:left-24 flex flex-col items-end gap-2 sm:gap-3 md:gap-4">
        <NavigationControls onNext={nextImage} onPrev={prevImage} />
        <PreviewImages
          points={points}
          currentIndex={currentIndex}
          onSelect={selectImage}
        />
      </div>
    </div>
  );
};
