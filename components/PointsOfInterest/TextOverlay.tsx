"use client";

import { PointOfInterest } from "./data";
import SafeHtml from "@/components/common/SafeHtml";
import type { ReactNode } from "react";

interface TextOverlayProps {
  point: PointOfInterest;
  carouselSlot: ReactNode;
}

export const TextOverlay = ({ point, carouselSlot }: TextOverlayProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 p-4 sm:p-6 md:p-12 lg:p-24">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[min(100%,1180px)] flex-col items-start justify-between">
        {/* Top — title / subtitle */}
        <div className="mt-4 w-full max-w-[720px] self-start text-start sm:mt-6 md:mt-8">
          <h1 className="w-full pb-3 text-[32px] font-bold text-white sm:pb-4 sm:text-[44px] md:pb-6 md:text-[56px] lg:text-[64px]">
            {point.title}
          </h1>
          <h2 className="text-[18px] font-light text-white/90 sm:text-[22px] md:text-[28px]">
            {point.subtitle}
          </h2>
        </div>

        {/* Bottom — text (start) + previews (end, wider strip) */}
        <div className="mt-8 flex w-full flex-col gap-5 sm:mt-12 md:mt-16 lg:mt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="flex w-full max-w-[397px] shrink-0 flex-col gap-4 self-start text-start lg:h-[99px] lg:gap-[33px]">
            <h3 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {point.location}
            </h3>
            <SafeHtml
              html={point.description}
              className="max-w-full text-start text-sm text-white/90 sm:text-base md:text-lg lg:text-xl"
            />
          </div>
          <div className="pointer-events-auto w-full min-h-0 min-w-0 max-w-full flex-1 self-stretch overflow-x-visible overflow-y-visible lg:max-w-[min(100%,820px)] lg:self-end">
            {carouselSlot}
          </div>
        </div>
      </div>
    </div>
  );
};
