import Link from "next/link";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import type { Landmark } from "@/components/landmarks/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface AttractionsLandmarksSectionProps {
  landmarks: Landmark[];
  title?: string;
  description?: string;
  decorationImageSrc?: string;
}

const filterItems = [
  { key: "city", label: "المدينة", active: true },
  { key: "interests", label: "الاهتمامات" },
  { key: "travelers", label: "المسافرين" },
  { key: "price", label: "السعر" },
  { key: "duration", label: "مدة الزيارة" },
];

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
}: AttractionsLandmarksSectionProps) => {
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

        <div className="mx-auto mb-8 w-full max-w-[1181px] overflow-x-auto pb-1">
          <div className="flex min-w-max items-center justify-start gap-3 px-1">
            {filterItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`h-[48px] shrink-0 rounded-full border px-4 ${
                  item.active
                    ? "w-[170px] border-[#DCDCDC] bg-white text-[#535353]"
                    : "w-[230px] border-[#DCDCDC] bg-white text-[#9B9B9C]"
                }`}
                dir="rtl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                {item.key === "city" ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z"
                      stroke={item.active ? "#535353" : "#9B9B9C"}
                      strokeWidth="1.5"
                    />
                    <path
                      d="M19.5 10.5C19.5 16.5 12 21 12 21C12 21 4.5 16.5 4.5 10.5C4.5 6.35786 7.85786 3 12 3C16.1421 3 19.5 6.35786 19.5 10.5Z"
                      stroke={item.active ? "#535353" : "#9B9B9C"}
                      strokeWidth="1.5"
                    />
                  </svg>
                ) : item.key === "interests" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 21L10.55 19.7C5.4 15.05 2 11.98 2 8.25C2 5.18 4.42 2.75 7.5 2.75C9.24 2.75 10.91 3.56 12 4.84C13.09 3.56 14.76 2.75 16.5 2.75C19.58 2.75 22 5.18 22 8.25C22 11.98 18.6 15.05 13.45 19.7L12 21Z" stroke={item.active ? "#535353" : "#9B9B9C"} strokeWidth="1.5" />
                  </svg>
                ) : item.key === "travelers" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M16 11C17.6569 11 19 9.65685 19 8C19 6.34315 17.6569 5 16 5C14.3431 5 13 6.34315 13 8C13 9.65685 14.3431 11 16 11Z" stroke={item.active ? "#535353" : "#9B9B9C"} strokeWidth="1.5" />
                    <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke={item.active ? "#535353" : "#9B9B9C"} strokeWidth="1.5" />
                    <path d="M2 19C2 16.7909 3.79086 15 6 15H10C12.2091 15 14 16.7909 14 19" stroke={item.active ? "#535353" : "#9B9B9C"} strokeWidth="1.5" />
                    <path d="M13 19C13 17.3431 14.3431 16 16 16H18C20.2091 16 22 17.7909 22 20" stroke={item.active ? "#535353" : "#9B9B9C"} strokeWidth="1.5" />
                  </svg>
                ) : item.key === "price" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 4V20M16 8.5C16 7.11929 14.2091 6 12 6C9.79086 6 8 7.11929 8 8.5C8 9.88071 9.79086 11 12 11C14.2091 11 16 12.1193 16 13.5C16 14.8807 14.2091 16 12 16C9.79086 16 8 14.8807 8 13.5" stroke={item.active ? "#535353" : "#9B9B9C"} strokeWidth="1.5" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 7V12L15.5 14" stroke={item.active ? "#535353" : "#9B9B9C"} strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="9" stroke={item.active ? "#535353" : "#9B9B9C"} strokeWidth="1.5" />
                  </svg>
                )}
                <span className="text-[24px] font-bold leading-[100%]" style={{ fontFamily: ara }}>
                  {item.label}
                </span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M7 10L12 15L17 10" stroke={item.active ? "#535353" : "#535353"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
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
