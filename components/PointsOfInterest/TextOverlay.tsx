"use client";

import { PointOfInterest } from "./data";

interface TextOverlayProps {
  point: PointOfInterest;
}

export const TextOverlay = ({ point }: TextOverlayProps) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-12 lg:p-24">
      {/* Top Section - Title and Subtitle */}
      <div className="text-right space-y-4 sm:space-y-6 md:space-y-8 mt-4 sm:mt-6 md:mt-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white border-b border-white pb-3 sm:pb-4 md:pb-6 w-full sm:w-4/5 md:w-2/3">
          {point.title}
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90">
          {point.subtitle}
        </h2>
        {/* Bottom Section - Location and Description */}
        <div className="text-right space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8 mt-8 sm:mt-12 md:mt-24 lg:mt-36">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {point.location}
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-full sm:max-w-xl md:max-w-2xl ml-auto">
            {point.description}
          </p>
        </div>
      </div>
    </div>
  );
};
