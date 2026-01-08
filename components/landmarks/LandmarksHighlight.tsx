"use client";

import { useRouter } from "next/navigation";
import { landmarks } from "./data";
import { Button } from "@headlessui/react";

const LandmarksHighlight = () => {
  const router = useRouter();

  const handleShowMoreClick = () => {
    router.push("/landmarks");
  };

  return (
    <section className="w-full flex flex-col items-center justify-center bg-white py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-24 space-y-6 sm:space-y-8 md:space-y-10">
        {/* Header */}
        <div className="flex flex-col items-end space-y-4 text-right w-full">
          <span className="h-px w-24 bg-gradient-to-l from-transparent via-black/40 to-transparent" />
          <h2 className="text-3xl md:text-4xl font-bold text-right w-full text-black">
            عسير.. ثروة من المعالم والتجارب
          </h2>
        </div>

        {/* Filter pills row (static, visual only) */}
        <div className="flex justify-end w-full">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button className="flex items-center gap-2 rounded-full bg-black text-white px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <span>مدة الزيارة</span>
            </button>
            <button className="flex items-center gap-2 rounded-full bg-black text-white px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <span>الأسعار</span>
            </button>
            <button className="flex items-center gap-2 rounded-full bg-black text-white px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <span>المسافرين</span>
            </button>
            <button className="flex items-center gap-2 rounded-full bg-black text-white px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <span>الاهتمامات</span>
            </button>
          </div>
        </div>

        {/* Landmarks cards row */}
        <div className="flex justify-end w-full overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 sm:gap-6 min-w-max">
            {landmarks.slice(0, 4).map((landmark) => (
              <div
                key={landmark.id}
                className="group w-[260px] sm:w-[280px] md:w-[320px] lg:w-[340px] h-[380px] sm:h-[420px] md:h-[440px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black/90  flex-shrink-0"
              >
                <div className="relative h-full w-full">
                  <img
                    src={landmark.image}
                    alt={landmark.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute bottom-6 left-0 right-0 px-6 text-right space-y-2 text-white">
                    <div className="text-xs opacity-80">
                      {landmark.location}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">
                      {landmark.title}
                    </h3>
                    <p className="text-sm opacity-90 line-clamp-2">
                      {landmark.description}
                    </p>
                    <div className="text-xs opacity-80">
                      {landmark.guideName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show more CTA */}
      <Button
        onClick={handleShowMoreClick}
        className="mt-10 inline-flex items-center justify-center rounded-full bg-[#6027D2] px-10 py-3 text-sm md:text-base font-semibold text-white  cursor-pointer hover:bg-[#4f1fb0] transition-colors"
      >
        عرض المزيد
      </Button>
    </section>
  );
};

export default LandmarksHighlight;
