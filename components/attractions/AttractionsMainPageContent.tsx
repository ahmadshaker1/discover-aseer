"use client";

import { useMemo, useState } from "react";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import type { Landmark } from "@/components/landmarks/data";
import {
  cityOptions,
  interestOptions,
} from "@/components/landmarks/filterOptions";
import { ChevronDownIcon, HeartIcon, LocationIcon } from "@/components/landmarks/Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface AttractionsMainPageContentProps {
  landmarks: Landmark[];
}

interface FilterState {
  city: string | null;
  interests: string[];
}

const INITIAL_FILTERS: FilterState = {
  city: null,
  interests: [],
};

const includesInterests = (landmark: Landmark, selectedInterests: string[]): boolean => {
  if (selectedInterests.length === 0) return true;
  const tags = landmark.interestTags ?? [];
  if (tags.length === 0) return false;
  return selectedInterests.some((interest) => tags.includes(interest));
};

const includesCity = (landmark: Landmark, city: string | null): boolean => {
  if (!city) return true;
  if (landmark.cityId) return landmark.cityId === city;
  const cityLabel = cityOptions.find((opt) => opt.id === city)?.label ?? "";
  return `${landmark.location} ${landmark.area}`.includes(cityLabel);
};

const AttractionsMainPageContent = ({ landmarks }: AttractionsMainPageContentProps) => {
  /**
   * Backend handoff:
   * - These filters are fully wired to `Landmark` metadata:
   *   `cityId`, `travelerTypes`, `priceFrom/priceTo`, `interestTags`.
   * - If backend doesn't return some metadata yet, cards still render and
   *   filters gracefully fall back (won't break page rendering).
   */
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const cityScopedLandmarks = useMemo(
    () => landmarks.filter((landmark) => includesCity(landmark, filters.city)),
    [filters.city, landmarks]
  );

  const interestCounts = useMemo(() => {
    return interestOptions.reduce<Record<string, number>>((acc, option) => {
      acc[option.id] = cityScopedLandmarks.filter((landmark) =>
        (landmark.interestTags ?? []).includes(option.id)
      ).length;
      return acc;
    }, {});
  }, [cityScopedLandmarks]);

  const visibleLandmarks = useMemo(() => {
    return cityScopedLandmarks.filter((landmark) =>
      includesInterests(landmark, selectedInterests)
    );
  }, [cityScopedLandmarks, selectedInterests]);

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="order-2 w-full flex-1 lg:order-1 lg:max-w-[1033px]">
            <div className="mx-auto grid w-full max-w-[1033px] grid-cols-1 gap-[23px] md:grid-cols-2 xl:min-h-[862px] xl:grid-cols-3">
              {visibleLandmarks.map((landmark) => (
                <AttractionsLandmarkCard key={landmark.id} landmark={landmark} className="mx-auto" />
              ))}
            </div>

            {visibleLandmarks.length === 0 ? (
              <p className="py-8 text-right text-sm text-[#737373]" style={{ fontFamily: ibm }}>
                لا توجد معالم تطابق الفلاتر المحددة حالياً.
              </p>
            ) : null}
          </div>

          <aside className="order-1 w-full lg:order-2 lg:sticky lg:top-24 lg:h-[796px] lg:w-[320px] lg:shrink-0 lg:border-r lg:border-[#E6E6E6] lg:pt-6 lg:pr-8 lg:pl-8" dir="rtl">
            <div className="flex h-full flex-col gap-6">
              <div className="flex h-8 w-full max-w-[256px] items-center justify-between">
                <h3
                  className="h-6 w-[102px] whitespace-nowrap text-right text-[24px] font-bold leading-6 tracking-[-0.31px] text-[#0A0A0A]"
                  style={{ fontFamily: ara }}
                >
                  تصفية المعالم
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setFilters(INITIAL_FILTERS);
                    setSelectedInterests([]);
                  }}
                  className="flex h-8 w-auto cursor-pointer whitespace-nowrap items-center justify-center rounded-[8px] border border-t border-[#0000001A] bg-white px-3 text-center text-[18px] font-bold leading-5 tracking-[-0.15px] text-[#0A0A0A] hover:opacity-80"
                  style={{ fontFamily: ara }}
                >
                  اعادة تعيين النتائج
                </button>
              </div>

              <div className="relative h-12 w-full max-w-[256px] overflow-hidden rounded-[55px] border border-[#9B9B9C] px-6 py-3">
                <select
                  aria-label="المدينة"
                  value={filters.city ?? ""}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      city: event.target.value ? event.target.value : null,
                    }))
                  }
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                >
                  <option value="">المدينة</option>
                  {cityOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex h-full items-center justify-between" dir="rtl">
                  <div className="flex items-center gap-2">
                    <LocationIcon />
                    <span
                      className="text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#0A0A0A]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {cityOptions.find((option) => option.id === filters.city)?.label ?? "المدينة"}
                    </span>
                  </div>
                  <ChevronDownIcon />
                </div>
              </div>

              <div className="pt-2">
                <div className="mb-4 h-px w-full max-w-[256px] bg-[#E3E3E3]" />

                <div className="mb-4 flex items-center gap-2 text-[#757575]">
                  <HeartIcon />
                  <h4
                    className="h-6 min-w-[73px] text-right text-[20px] font-bold leading-[119%] tracking-[0] text-[#0A0A0A]"
                    style={{ fontFamily: ara }}
                  >
                    الاهتمامات
                  </h4>
                </div>

                <div className="space-y-3">
                  {interestOptions.map((option) => {
                    const checked = selectedInterests.includes(option.id);
                    const count = interestCounts[option.id] ?? 0;
                    return (
                      <label key={option.id} className="flex cursor-pointer items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setSelectedInterests((prev) =>
                                prev.includes(option.id)
                                  ? prev.filter((id) => id !== option.id)
                                  : [...prev, option.id]
                              )
                            }
                            className="h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-t border-[#0000001A] bg-[#F3F3F5] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] checked:border-[#6027D2] checked:bg-[#6027D2] checked:bg-[linear-gradient(45deg,transparent_45%,white_45%,white_55%,transparent_55%),linear-gradient(-45deg,transparent_45%,white_45%,white_55%,transparent_55%)] checked:bg-size-[70%_70%] checked:bg-center checked:bg-no-repeat"
                          />
                          <span
                            className="h-5 min-w-[73px] text-right text-[14px] font-normal leading-5 tracking-[-0.15px] text-[#0A0A0A]"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {option.label}
                          </span>
                        </div>
                        <span
                          className="inline-flex h-7 min-w-7 items-center justify-center rounded-[8px] bg-[#EFF0F3] px-2 text-[24px] leading-[100%] text-[#4B4B4B]"
                          style={{ fontFamily: ara }}
                        >
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AttractionsMainPageContent;
