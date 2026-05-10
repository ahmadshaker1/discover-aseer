"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import TourGuideCard, {
  type TourGuideData,
} from "@/components/tour-guides/TourGuideCard/TourGuideCard";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface AttractionsGuidesSectionProps {
  guides: TourGuideData[];
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
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

const AttractionsGuidesSection = ({ guides }: AttractionsGuidesSectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const tCommon = useTranslations("common");
  const tAttr = useTranslations("attractionsPage");
  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="mx-auto mb-8 flex h-[58px] w-full max-w-[1320px] items-center justify-between" dir={isRtl ? "rtl" : "ltr"}>
          <h2
            className={`w-full max-w-[498px] text-[48px] font-bold leading-[100%] text-[#280048] ${isRtl ? "text-right" : "text-left"}`}
            style={{ fontFamily: ara }}
          >
            {tAttr("chooseYourGuide")}
          </h2>

          <Link
            href="/tour-guides"
            className="inline-flex h-6 w-[98px] shrink-0 items-center justify-between gap-2 hover:opacity-80"
            style={{ fontFamily: ara }}
            dir={isRtl ? "ltr" : "rtl"}
          >
            <span className={isRtl ? "" : "rotate-180"}>
              <ChevronLeftIcon />
            </span>
            <span className={`h-6 w-[73px] whitespace-nowrap text-[20px] font-bold leading-[100%] text-[#280048] ${isRtl ? "text-right" : "text-left"}`}>
              {tCommon("more")}
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.slice(0, 4).map((guide) => (
            <TourGuideCard
              key={guide.id}
              {...guide}
              onCardClick={() => {
                // Placeholder action; replace with modal/profile navigation if needed.
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AttractionsGuidesSection;
