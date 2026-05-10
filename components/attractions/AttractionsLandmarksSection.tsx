/* eslint-disable @next/next/no-img-element */
"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import type { Landmark } from "@/components/landmarks/data";
import {
  getCityOptions,
  getInterestOptions,
  getPriceOptions,
  getTravelerOptions,
  locationMatchesCityId,
} from "@/components/landmarks/filterOptions";

function landmarkMatchesCity(landmark: Landmark, city: string | null): boolean {
  if (!city) return true;
  if (landmark.cityId) return landmark.cityId === city;
  return locationMatchesCityId(`${landmark.location} ${landmark.area}`, city);
}

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface AttractionsLandmarksSectionProps {
  landmarks: Landmark[];
  title?: string;
  description?: string;
  decorationImageSrc?: string;
  showFilters?: boolean;
  /** When set, each card gets a full-card link (share stays clickable above it). */
  landmarkCardHref?: string;
}

type PriceFilterId = "free" | "budget" | "mid-range" | "luxury" | null;

function LeftArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M3.01172 8.69438L13.6367 8.69438"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.29688 12.9616L3.01146 8.69459L7.29688 4.42688"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const AttractionsLandmarksSection = ({
  landmarks,
  title,
  description,
  decorationImageSrc,
  showFilters = false,
  landmarkCardHref,
}: AttractionsLandmarksSectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("common");
  const sectionTitle = title ?? t("exploreAttractionsDefault");
  const cityOptions = useMemo(() => getCityOptions(locale), [locale]);
  const interestOpts = useMemo(() => getInterestOptions(locale), [locale]);
  const travelerOpts = useMemo(() => getTravelerOptions(locale), [locale]);
  const priceOpts = useMemo(() => getPriceOptions(locale), [locale]);
  const [city, setCity] = useState<string | null>(null);
  const [interest, setInterest] = useState<string | null>(null);
  const [traveler, setTraveler] = useState<string | null>(null);
  const [price, setPrice] = useState<PriceFilterId>(null);

  const filteredLandmarks = useMemo(() => {
    return landmarks.filter((landmark) => {
      if (!landmarkMatchesCity(landmark, city)) return false;

      if (interest) {
        const tags = landmark.interestTags ?? [];
        if (tags.length > 0 && !tags.includes(interest)) return false;
      }

      if (traveler) {
        const types = landmark.travelerTypes ?? [];
        if (types.length > 0 && !types.includes(traveler)) return false;
      }

      const hasPriceData = landmark.priceFrom != null || landmark.priceTo != null;
      if (price && hasPriceData) {
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
    <section className="relative w-full overflow-hidden bg-white py-12" dir={isRtl ? "rtl" : "ltr"}>
      {decorationImageSrc ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute top-1/2 z-1 h-[457px] w-[773px] -translate-y-1/2 bg-[#7300CD] opacity-40 ${isRtl ? "right-0" : "left-0"}`}
          style={{
            WebkitMaskImage: `url(${decorationImageSrc})`,
            maskImage: `url(${decorationImageSrc})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: isRtl ? "right center" : "left center",
            maskPosition: isRtl ? "right center" : "left center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="mx-auto mb-8 flex w-full max-w-[1320px] items-start justify-between gap-4">
          <div className={`space-y-2 ${isRtl ? "text-right" : "text-left"}`}>
            <h2
              className={`w-full max-w-[620px] text-[48px] font-bold leading-[100%] text-[#280048] ${isRtl ? "text-right" : "text-left"}`}
              style={{ fontFamily: ara }}
            >
              {sectionTitle}
            </h2>
            {description ? (
              <p
                className={`h-[11px] w-[430px] text-[24px] font-bold leading-[119%] text-[#252525]/80 ${isRtl ? "text-right" : "text-left"}`}
                style={{ fontFamily: ara }}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {showFilters ? (
          <div className="mx-auto mb-8 w-full max-w-[1181px] overflow-x-auto pb-1">
            <div className={`flex min-w-max items-center gap-3 px-1 ${isRtl ? "justify-start" : "justify-end"}`}>
              <select
                value={city ?? ""}
                onChange={(e) => setCity(e.target.value || null)}
                className="h-[48px] w-[190px] shrink-0 cursor-pointer rounded-full border border-[#DCDCDC] bg-white px-4 text-sm text-[#535353]"
              >
                <option value="">{t("city")}</option>
                {cityOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={interest ?? ""}
                onChange={(e) => setInterest(e.target.value || null)}
                className="h-[48px] w-[230px] shrink-0 cursor-pointer rounded-full border border-[#DCDCDC] bg-white px-4 text-sm text-[#535353]"
              >
                <option value="">{t("interests")}</option>
                {interestOpts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={traveler ?? ""}
                onChange={(e) => setTraveler(e.target.value || null)}
                className="h-[48px] w-[230px] shrink-0 cursor-pointer rounded-full border border-[#DCDCDC] bg-white px-4 text-sm text-[#535353]"
              >
                <option value="">{t("travelers")}</option>
                {travelerOpts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={price ?? ""}
                onChange={(e) => setPrice((e.target.value as PriceFilterId) || null)}
                className="h-[48px] w-[230px] shrink-0 cursor-pointer rounded-full border border-[#DCDCDC] bg-white px-4 text-sm text-[#535353]"
              >
                <option value="">{t("price")}</option>
                {priceOpts.map((opt) => (
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
                className="h-[48px] shrink-0 cursor-pointer rounded-full border border-[#DCDCDC] bg-white px-5 text-sm text-[#535353] hover:bg-gray-50"
              >
                {t("resetFilters")}
              </button>
            </div>
          </div>
        ) : null}

        <div className="mx-auto w-full max-w-[1320px] overflow-x-auto pb-2">
          <div className="flex min-w-max flex-row gap-6">
            {filteredLandmarks.map((landmark) => (
              <AttractionsLandmarkCard
                key={landmark.id}
                landmark={landmark}
                className="w-[312px] shrink-0"
                cardHref={landmarkCardHref}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-[1320px] justify-center">
          <Link
            href="/attractions"
            className="inline-flex h-[52px] min-w-[161px] cursor-pointer items-center justify-center gap-2 rounded-[55px] border border-[#6027D2]/30 bg-[#6027D2] px-8 text-[20px] font-bold leading-[119%] text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: ara }}
            dir={isRtl ? "ltr" : "rtl"}
          >
            <LeftArrowIcon className={`text-white ${isRtl ? "" : "rotate-180"}`} />
            <span className={`whitespace-nowrap text-[20px] font-bold leading-[100%] ${isRtl ? "text-right" : "text-left"}`}>
              {t("browseMore")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AttractionsLandmarksSection;
