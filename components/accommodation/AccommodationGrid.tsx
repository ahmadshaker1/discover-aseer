"use client";

import { Accommodation } from "./data";

interface AccommodationGridProps {
  accommodations: Accommodation[];
}

const AccommodationGrid = ({ accommodations }: AccommodationGridProps) => {
  if (accommodations.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-600 text-lg">لا توجد أماكن إقامة متاحة حالياً</p>
        <p className="text-gray-500 text-sm mt-2">عدد النتائج: 0</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {accommodations.map((accommodation) => (
          <div
            key={accommodation.id}
            className="group w-full h-[360px] sm:h-[380px] md:h-[400px] lg:h-[420px] flex flex-col text-left rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
              <img
                src={accommodation.image}
                alt={accommodation.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />
              {accommodation.rating && accommodation.rating > 0 && (
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white">
                    <span>{accommodation.rating.toFixed(1)}</span>
                    <span className="text-yellow-300">★</span>
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between px-4 sm:px-5 py-3 sm:py-4 flex-1">
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-right text-gray-900 line-clamp-2">
                  {accommodation.name}
                </h3>
                <div className="flex items-center justify-end gap-1 text-xs sm:text-sm text-gray-500">
                  <span className="truncate">{accommodation.location}</span>
                </div>
              </div>

              {accommodation.priceRange && (
                <div className="mt-3 sm:mt-4 flex items-center justify-start text-xs sm:text-sm text-gray-700">
                  <span>{accommodation.priceRange}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccommodationGrid;
