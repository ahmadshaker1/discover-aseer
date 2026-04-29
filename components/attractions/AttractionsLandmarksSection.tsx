/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import type { Landmark } from "@/components/landmarks/data";
import { cityOptions, interestOptions, priceOptions, travelerOptions } from "@/components/landmarks/filterOptions";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface AttractionsLandmarksSectionProps {
  landmarks: Landmark[];
  title?: string;
  description?: string;
  decorationImageSrc?: string;
  showFilters?: boolean;
}

type PriceFilterId = "free" | "budget" | "mid-range" | "luxury" | null;

function LeftArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M3.01172 8.69438L13.6367 8.69438"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.29688 12.9616L3.01146 8.69459L7.29688 4.42688"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const AttractionsLandmarksSection = ({
  landmarks,
  title = "اكتشف أشهر المعالم السياحية",
  description,
  decorationImageSrc,
  showFilters = true,
}: AttractionsLandmarksSectionProps) => {
  const [city, setCity] = useState<string | null>(null);
  const [interest, setInterest] = useState<string | null>(null);
  const [traveler, setTraveler] = useState<string | null>(null);
  const [price, setPrice] = useState<PriceFilterId>(null);

  const filteredLandmarks = useMemo(() => {
    return landmarks.filter((landmark) => {
      if (city && landmark.cityId !== city) return false;
      if (interest && !(landmark.interestTags ?? []).includes(interest)) return false;
      if (traveler && !(landmark.travelerTypes ?? []).includes(traveler)) return false;
      if (price) {
        const from = landmark.priceFrom ?? 0;
        const to = landmark.priceTo ?? from;
        if (price === "free" && !(from === 0 && to === 0)) return false;
        if (price === "budget" && from >= 50) return false;
        if (price === "mid-range" && (to < 50 || from > 200)) return false;
        if (price === "luxury" && to <= 200) return false;
      }
      return true;
    });
  }, [city, interest, landmarks, price, traveler]);

  return (
    <section className="relative w-full overflow-hidden bg-white py-12" dir="rtl">
      {decorationImageSrc ? (
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 z-1 h-[457px] w-[773px] -translate-y-1/2 bg-[#7300CD] opacity-40"
          style={{
            WebkitMaskImage: `url(${decorationImageSrc})`,
            maskImage: `url(${decorationImageSrc})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "right center",
            maskPosition: "right center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="mx-auto mb-8 flex w-full max-w-[1320px] items-start justify-between gap-4">
          <div className="space-y-2 text-right">
            <h2
              className="w-full max-w-[620px] text-right text-[48px] font-bold leading-[100%] text-[#280048]"
              style={{ fontFamily: ara }}
            >
              {title}
            </h2>
            {description ? (
              <p
                className="h-[11px] w-[430px] text-right text-[24px] font-bold leading-[119%] text-[#252525]/80"
                style={{ fontFamily: ara }}
              >
                {description}
              </p>
            ) : null}
          </div>

          <Link
            href="/attractions"
            className="inline-flex h-6 w-[98px] shrink-0 items-center justify-between gap-2 hover:opacity-80"
            style={{ fontFamily: ara }}
            dir="ltr"
          >
            <LeftArrowIcon />
            <span className="h-6 w-[73px] whitespace-nowrap text-right text-[20px] font-bold leading-[100%] text-[#280048]">
              عرض المزيد
            </span>
          </Link>
        </div>

        {showFilters ? (
          <div className="mx-auto mb-8 w-full max-w-[1181px] overflow-x-auto pb-1">
            <div className="flex min-w-max items-center justify-start gap-3 px-1">
              <select
                value={city ?? ""}
                onChange={(e) => setCity(e.target.value || null)}
                className="h-[48px] w-[190px] shrink-0 rounded-full border border-[#DCDCDC] bg-white px-4 text-sm text-[#535353]"
              >
                <option value="">المدينة</option>
                {cityOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={interest ?? ""}
                onChange={(e) => setInterest(e.target.value || null)}
                className="h-[48px] w-[230px] shrink-0 rounded-full border border-[#DCDCDC] bg-white px-4 text-sm text-[#535353]"
              >
                <option value="">الاهتمامات</option>
                {interestOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={traveler ?? ""}
                onChange={(e) => setTraveler(e.target.value || null)}
                className="h-[48px] w-[230px] shrink-0 rounded-full border border-[#DCDCDC] bg-white px-4 text-sm text-[#535353]"
              >
                <option value="">المسافرين</option>
                {travelerOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={price ?? ""}
                onChange={(e) => setPrice((e.target.value as PriceFilterId) || null)}
                className="h-[48px] w-[230px] shrink-0 rounded-full border border-[#DCDCDC] bg-white px-4 text-sm text-[#535353]"
              >
                <option value="">السعر</option>
                {priceOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  setCity(null);
                  setInterest(null);
                  setTraveler(null);
                  setPrice(null);
                }}
                className="h-[48px] shrink-0 rounded-full border border-[#DCDCDC] bg-white px-5 text-sm text-[#535353] hover:bg-gray-50"
              >
                اعادة تعيين النتائج
              </button>
            </div>
          </div>
        ) : null}

        <div className="mx-auto w-full max-w-[1320px] overflow-x-auto pb-2">
          <div className="flex min-w-max flex-row gap-6">
            {filteredLandmarks.map((landmark) => (
              <AttractionsLandmarkCard key={landmark.id} landmark={landmark} className="w-[312px] shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractionsLandmarksSection;
