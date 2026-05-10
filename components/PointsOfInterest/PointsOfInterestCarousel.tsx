"use client";

import { useLocale, useTranslations } from "next-intl";
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
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("common");
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
        <p className="text-white text-xl">{t("noPointsOfInterest")}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen max-w-screen-2xl mx-auto overflow-hidden">
      <BackgroundImage point={currentPoint} />
      <TextOverlay
        point={currentPoint}
        carouselSlot={
          <div
            className={`flex flex-col gap-4 ${isRtl ? "items-end" : "items-start"}`}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <NavigationControls onNext={nextImage} onPrev={prevImage} />
            <PreviewImages
              points={points}
              currentIndex={currentIndex}
              onSelect={selectImage}
            />
          </div>
        }
      />
    </div>
  );
};
