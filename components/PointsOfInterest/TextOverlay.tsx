"use client";

import { useLocale } from "next-intl";
import { PointOfInterest } from "./data";
import SafeHtml from "@/components/common/SafeHtml";
import type { ReactNode } from "react";

interface TextOverlayProps {
  point: PointOfInterest;
  carouselSlot: ReactNode;
}

export const TextOverlay = ({ point, carouselSlot }: TextOverlayProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-12 lg:p-24"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Top Section - Title and Subtitle */}
      <div
        className={`mt-4 w-full max-w-[720px] sm:mt-6 md:mt-8 ${isRtl ? "ml-auto text-right" : "mr-auto text-left"}`}
      >
        <h1 className="w-full pb-3 text-[32px] font-bold text-white sm:pb-4 sm:text-[44px] md:pb-6 md:text-[56px] lg:text-[64px]">
          {point.title}
        </h1>
        <h2 className="text-[18px] font-light text-white/90 sm:text-[22px] md:text-[28px]">
          {point.subtitle}
        </h2>
      </div>

      {/* Bottom Section - description above carousel */}
      <div className="mt-8 flex w-full flex-col gap-5 sm:mt-12 md:mt-16">
        <div
          className={`flex w-full max-w-[397px] flex-col gap-4 lg:h-[99px] lg:gap-[33px] ${isRtl ? "ml-auto text-right" : "mr-auto text-left"}`}
        >
          <h3 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {point.location}
          </h3>
          <SafeHtml
            html={point.description}
            className={`${isRtl ? "ml-auto" : "mr-auto"} max-w-full text-sm text-white/90 sm:text-base md:text-lg lg:text-xl`}
          />
        </div>
        <div className="w-full" dir={isRtl ? "ltr" : "rtl"}>
          <div className="w-full lg:w-[653px] lg:shrink-0">
            {carouselSlot}
          </div>
        </div>
      </div>
    </div>
  );
};
