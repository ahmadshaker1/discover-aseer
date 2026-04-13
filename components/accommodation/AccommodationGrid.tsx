"use client";

import { useMemo, useState } from "react";
import { Accommodation } from "./data";

interface AccommodationGridProps {
  accommodations: Accommodation[];
}

const AccommodationGrid = ({ accommodations }: AccommodationGridProps) => {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  const cityOptions = useMemo(() => {
    const cities = Array.from(new Set(accommodations.map((a) => a.city)));
    return cities;
  }, [accommodations]);

  const starsCount = useMemo(() => {
    const map = new Map<number, number>();
    accommodations.forEach((a) => {
      map.set(a.stars, (map.get(a.stars) ?? 0) + 1);
    });
    return map;
  }, [accommodations]);

  const filtered = useMemo(() => {
    return accommodations.filter((a) => {
      if (selectedCity !== "all" && a.city !== selectedCity) return false;
      if (selectedStars.length > 0 && !selectedStars.includes(a.stars)) return false;
      return true;
    });
  }, [accommodations, selectedCity, selectedStars]);

  const toggleStars = (stars: number) => {
    setSelectedStars((prev) =>
      prev.includes(stars) ? prev.filter((s) => s !== stars) : [...prev, stars]
    );
  };

  const resetFilters = () => {
    setSelectedCity("all");
    setSelectedStars([]);
  };

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
      <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-start">
        <aside
          className="w-full rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 lg:h-[796px] lg:w-[320px] lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:border-[#0000001A] lg:bg-transparent lg:pt-6 lg:pr-8 lg:pl-8 lg:pb-0 lg:shadow-none"
          dir="rtl"
        >
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-gray-200 pb-6">
            <h2 className="text-lg font-bold text-black sm:text-xl">تصفية الوجهات</h2>
            <button
              type="button"
              onClick={resetFilters}
              className="shrink-0 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-50 sm:text-sm"
            >
              إعادة تعيين النتائج
            </button>
          </div>

          <section className="mb-6 border-b border-gray-200 pb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden>
                <path
                  d="M9 18.8999L13.95 13.9499C14.9289 12.9709 15.5955 11.7236 15.8656 10.3658C16.1356 9.00795 15.9969 7.60052 15.4671 6.32148C14.9373 5.04244 14.04 3.94923 12.8889 3.18009C11.7378 2.41095 10.3844 2.00043 9 2.00043C7.61557 2.00043 6.26222 2.41095 5.11109 3.18009C3.95996 3.94923 3.06275 5.04244 2.53292 6.32148C2.00308 7.60052 1.86442 9.00795 2.13445 10.3658C2.40449 11.7236 3.07111 12.9709 4.05 13.9499L9 18.8999ZM9 21.7279L2.636 15.3639C1.37734 14.1052 0.520187 12.5016 0.172928 10.7558C-0.17433 9.00995 0.00390685 7.20035 0.685099 5.55582C1.36629 3.91129 2.51984 2.50569 3.99988 1.51677C5.47992 0.527838 7.21998 0 9 0C10.78 0 12.5201 0.527838 14.0001 1.51677C15.4802 2.50569 16.6337 3.91129 17.3149 5.55582C17.9961 7.20035 18.1743 9.00995 17.8271 10.7558C17.4798 12.5016 16.6227 14.1052 15.364 15.3639L9 21.7279ZM9 10.9999C9.53044 10.9999 10.0391 10.7892 10.4142 10.4141C10.7893 10.0391 11 9.53035 11 8.99992C11 8.46949 10.7893 7.96078 10.4142 7.58571C10.0391 7.21064 9.53044 6.99992 9 6.99992C8.46957 6.99992 7.96086 7.21064 7.58579 7.58571C7.21072 7.96078 7 8.46949 7 8.99992C7 9.53035 7.21072 10.0391 7.58579 10.4141C7.96086 10.7892 8.46957 10.9999 9 10.9999ZM9 12.9999C7.93914 12.9999 6.92172 12.5785 6.17158 11.8283C5.42143 11.0782 5 10.0608 5 8.99992C5 7.93906 5.42143 6.92164 6.17158 6.17149C6.92172 5.42135 7.93914 4.99992 9 4.99992C10.0609 4.99992 11.0783 5.42135 11.8284 6.17149C12.5786 6.92164 13 7.93906 13 8.99992C13 10.0608 12.5786 11.0782 11.8284 11.8283C11.0783 12.5785 10.0609 12.9999 9 12.9999Z"
                  fill="#9B9B9C"
                />
              </svg>
              <h3 className="text-base font-bold text-black">المدينة</h3>
            </div>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full appearance-none rounded-full border border-gray-300 bg-white py-3 pl-11 pr-4 text-right text-sm text-black focus:border-[#7300CD] focus:outline-none focus:ring-2 focus:ring-[#7300CD]/20"
              >
                <option value="all">المدينة</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                  <path d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z" fill="#1D1B20" />
                </svg>
              </span>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden>
                <path
                  d="M20 18H0V16H1V1C1 0.734784 1.10536 0.48043 1.29289 0.292893C1.48043 0.105357 1.73478 0 2 0H16C16.2652 0 16.5196 0.105357 16.7071 0.292893C16.8946 0.48043 17 0.734784 17 1V6H19V16H20V18ZM15 16H17V8H11V16H13V10H15V16ZM15 6V2H3V16H9V6H15ZM5 8H7V10H5V8ZM5 12H7V14H5V12ZM5 4H7V6H5V4Z"
                  fill="#9B9B9C"
                />
              </svg>
              <h3 className="text-base font-bold text-black">تصنيف الفندق</h3>
            </div>
            <div className="flex flex-col gap-2">
              {[5, 4, 3].map((stars) => (
                <label
                  key={stars}
                  className="flex cursor-pointer items-center gap-3 rounded-lg py-2 pr-1 transition-colors hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedStars.includes(stars)}
                    onChange={() => toggleStars(stars)}
                    className="h-4 w-4 shrink-0 rounded border-gray-300 text-[#7300CD] focus:ring-[#7300CD]"
                  />
                  <span className="min-w-0 flex-1 text-right text-sm font-normal text-black">
                    {stars} نجوم
                  </span>
                  <span className="shrink-0 rounded-[8px] bg-[#ECEEF2] px-2 py-0.5 text-xs text-black">
                    {starsCount.get(stars) ?? 0}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </aside>

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((accommodation) => (
              <article
                key={accommodation.id}
                className="overflow-hidden rounded-[16px] border border-[#D9D9D9] bg-white shadow-sm"
                dir="rtl"
              >
                <div className="relative h-[190px] w-full overflow-hidden">
                  <img
                    src={accommodation.image}
                    alt={accommodation.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/0 to-black/10" />
                  <div className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[12px] text-white">
                    ({accommodation.reviewsCount}) {accommodation.rating.toFixed(1)}/5{" "}
                    <span className="text-yellow-300">★</span>
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[12px] text-white">
                    {accommodation.city}
                  </div>
                </div>

                <div className="space-y-2 p-4">
                  <h3 className="text-right text-[28px] font-bold leading-[1.1] text-black">
                    {accommodation.name}
                  </h3>
                  <p className="text-right text-[14px] leading-6 text-[#777] line-clamp-3">
                    {accommodation.description}
                  </p>
                  <a
                    href={accommodation.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E9D9F2] px-4 py-2.5 text-[16px] font-bold text-[#6C2BD9] transition-colors hover:bg-[#dfc5ee]"
                  >
                    احجز الآن
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                      className="shrink-0"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 1.875C0 0.839466 0.839466 0 1.875 0H2.5C2.84518 0 3.125 0.279822 3.125 0.625C3.125 0.970178 2.84518 1.25 2.5 1.25H1.875C1.52982 1.25 1.25 1.52982 1.25 1.875V9.375C1.25 9.72018 1.52982 10 1.875 10H9.375C9.72018 10 10 9.72018 10 9.375V8.75C10 8.40482 10.2798 8.125 10.625 8.125C10.9702 8.125 11.25 8.40482 11.25 8.75V9.375C11.25 10.4105 10.4105 11.25 9.375 11.25H1.875C0.839466 11.25 0 10.4105 0 9.375V1.875Z"
                        fill="#7300CD"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.25009 1.25C5.90492 1.25 5.62509 0.970178 5.62509 0.625C5.62509 0.279822 5.90492 0 6.25009 0H10.6695C11.0147 0 11.2945 0.279822 11.2945 0.625L11.2945 5.04442C11.2945 5.3896 11.0147 5.66942 10.6695 5.66942C10.3243 5.66942 10.0445 5.3896 10.0445 5.04442L10.0445 2.08947L5.44194 6.69204C5.19786 6.93611 4.80214 6.93611 4.55806 6.69204C4.31398 6.44796 4.31398 6.05223 4.55806 5.80815L9.11621 1.25H6.25009Z"
                        fill="#7300CD"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              لا توجد أماكن إقامة تطابق التصفية المحددة.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AccommodationGrid;
