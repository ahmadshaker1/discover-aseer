import Link from "next/link";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import type { Landmark } from "@/components/landmarks/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface AttractionsLandmarksSectionProps {
  landmarks: Landmark[];
}

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

const AttractionsLandmarksSection = ({ landmarks }: AttractionsLandmarksSectionProps) => {
  return (
    <section className="w-full bg-white py-12" dir="rtl">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="mx-auto mb-8 flex h-[58px] w-full max-w-[1320px] items-center justify-between">
          <h2
            className="h-[58px] w-full max-w-[498px] text-right text-[48px] font-bold leading-[100%] text-[#280048]"
            style={{ fontFamily: ara }}
          >
            اكتشف أشهر المعالم السياحية
          </h2>

          <Link
            href="/landmarks"
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

        <div className="mx-auto w-full max-w-[1320px] overflow-x-auto pb-2">
          <div className="flex min-w-max flex-row gap-6">
            {landmarks.slice(0, 6).map((landmark) => (
              <AttractionsLandmarkCard key={landmark.id} landmark={landmark} className="w-[312px] shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractionsLandmarksSection;
