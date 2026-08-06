"use client";

import type { ReactNode } from "react";
import { PointOfInterest } from "./data";


interface TextOverlayProps {
  point: PointOfInterest;
  sectionTitle: string;
  carouselSlot: ReactNode;
}

export const TextOverlay = ({
  point,
  sectionTitle,
  carouselSlot,
}: TextOverlayProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 p-4 sm:p-6 md:p-12 lg:p-24">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[min(100%,1180px)] flex-col items-start justify-between">
        {/* Top — section heading + tda */}
        <div className="mt-4 w-full max-w-[720px] self-start text-start sm:mt-6 md:mt-8">
          <h1
            className="w-full pb-3 text-[32px] font-bold text-white sm:pb-4 sm:text-[44px] md:pb-6 md:text-[56px] lg:text-[64px]"
          >
            {sectionTitle}
          </h1>
          {point.tda ? (
            <h2 className="text-[18px] font-light text-white/90 sm:text-[22px] md:text-[28px]">
              {point.tda}
            </h2>
          ) : null}
        </div>

        {/* Bottom — destination name, description, previews */}
        <div className="mt-8 flex w-full flex-col gap-5 sm:mt-12 md:mt-16 lg:mt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="flex w-full max-w-[397px] shrink-0 flex-col gap-4 self-start text-start lg:gap-[33px]">
            {point.title ? (
              <h3
                className="text-[22px] font-bold leading-[115%] text-white sm:text-[26px] md:text-[30px]"
              >
                {point.title}
              </h3>
            ) : null}
            <p className="line-clamp-3 max-w-full text-start text-sm text-white/90 sm:text-base md:text-lg lg:text-xl">
              {point.description}
            </p>
          </div>
          <div className="pointer-events-auto w-full min-h-0 min-w-0 max-w-full flex-1 self-stretch overflow-x-visible overflow-y-visible lg:max-w-[min(100%,820px)] lg:self-end">
            {carouselSlot}
          </div>
        </div>
      </div>
    </div>
  );
};
