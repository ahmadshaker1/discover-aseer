"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const EXCEPTIONAL_FILTER_BADGE = "/assets/accommodation/exceptional-filter-badge.svg";

function CityPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 18.8999L13.95 13.9499C14.9289 12.9709 15.5955 11.7236 15.8656 10.3658C16.1356 9.00795 15.9969 7.60052 15.4671 6.32148C14.9373 5.04244 14.04 3.94923 12.8889 3.18009C11.7378 2.41095 10.3844 2.00043 9 2.00043C7.61557 2.00043 6.26222 2.41095 5.11109 3.18009C3.95996 3.94923 3.06275 5.04244 2.53292 6.32148C2.00308 7.60052 1.86442 9.00795 2.13445 10.3658C2.40449 11.7236 3.07111 12.9709 4.05 13.9499L9 18.8999ZM9 21.7279L2.636 15.3639C1.37734 14.1052 0.520187 12.5016 0.172928 10.7558C-0.17433 9.00995 0.00390685 7.20035 0.685099 5.55582C1.36629 3.91129 2.51984 2.50569 3.99988 1.51677C5.47992 0.527838 7.21998 0 9 0C10.78 0 12.5201 0.527838 14.0001 1.51677C15.4802 2.50569 16.6337 3.91129 17.3149 5.55582C17.9961 7.20035 18.1743 9.00995 17.8271 10.7558C17.4798 12.5016 16.6227 14.1052 15.364 15.3639L9 21.7279ZM9 10.9999C9.53044 10.9999 10.0391 10.7892 10.4142 10.4141C10.7893 10.0391 11 9.53035 11 8.99992C11 8.46949 10.7893 7.96078 10.4142 7.58571C10.0391 7.21064 9.53044 6.99992 9 6.99992C8.46957 6.99992 7.96086 7.21064 7.58579 7.58571C7.21072 7.96078 7 8.46949 7 8.99992C7 9.53035 7.21072 10.0391 7.58579 10.4141C7.96086 10.7892 8.46957 10.9999 9 10.9999ZM9 12.9999C7.93914 12.9999 6.92172 12.5785 6.17158 11.8283C5.42143 11.0782 5 10.0608 5 8.99992C5 7.93906 5.42143 6.92164 6.17158 6.17149C6.92172 5.42135 7.93914 4.99992 9 4.99992C10.0609 4.99992 11.0783 5.42135 11.8284 6.17149C12.5786 6.92164 13 7.93906 13 8.99992C13 10.0608 12.5786 11.0782 11.8284 11.8283C11.0783 12.5785 10.0609 12.9999 9 12.9999Z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface AccommodationFiltersProps {
  cityOptions: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedStars: number[];
  onToggleStars: (stars: number) => void;
  starsCount: Map<number, number>;
  onlyExceptional: boolean;
  onOnlyExceptionalChange: (value: boolean) => void;
  exceptionalFilterCount: number;
  onReset: () => void;
}

const AccommodationFilters = ({
  cityOptions,
  selectedCity,
  onCityChange,
  selectedStars,
  onToggleStars,
  starsCount,
  onlyExceptional,
  onOnlyExceptionalChange,
  exceptionalFilterCount,
  onReset,
}: AccommodationFiltersProps) => {
  const t = useTranslations("common");
  const [cityOpen, setCityOpen] = useState(false);
  const cityWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!cityWrapRef.current?.contains(e.target as Node)) setCityOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selectedCityLabel = selectedCity === "all" ? t("allCities") : selectedCity;

  return (
    <aside
      className="w-full shrink-0 rounded-2xl border border-border bg-surface p-4 text-foreground sm:p-6 lg:h-[796px] lg:w-[320px] lg:rounded-none lg:border-y-0 lg:border-s-0 lg:border-e lg:border-border lg:bg-transparent lg:pb-0 lg:ps-8 lg:pe-8 lg:pt-6 lg:shadow-none"

    >
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-6">
        <h2

          className="text-start text-lg font-bold text-foreground sm:text-xl [unicode-bidi:isolate]"
        >
          {t("filterDestinations")}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:text-sm"
        >
          {t("resetFilters")}
        </button>
      </div>

      <section className="mb-6 border-b border-border pb-6">
        <div ref={cityWrapRef} className="relative">
          <button
            type="button"
            onClick={() => setCityOpen((o) => !o)}
            aria-expanded={cityOpen}
            className="relative flex w-full appearance-none items-center gap-2 rounded-full border border-border bg-surface py-3 ps-4 pe-11 text-start text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                <path d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4Z" fill="currentColor" />
              </svg>
            </span>
            <span className="flex min-w-0 flex-1 items-center justify-start gap-2">
              <CityPinIcon className="shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">{selectedCityLabel}</span>
            </span>
          </button>
          {cityOpen ? (
            <ul
              className="absolute z-30 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-border bg-surface py-1 shadow-lg"
              role="listbox"

            >
              <li>
                <button
                  type="button"
                  role="option"

                  aria-selected={selectedCity === "all"}
                  onClick={() => {
                    onCityChange("all");
                    setCityOpen(false);
                  }}
                  className="flex w-full items-center justify-start gap-2 px-4 py-3 text-start text-sm text-foreground hover:bg-muted"
                >
                  <CityPinIcon className="shrink-0 text-muted-foreground opacity-70" />
                  <span className="min-w-0 truncate">{t("allCities")}</span>
                </button>
              </li>
              {cityOptions.map((city) => (
                <li key={city}>
                  <button
                    type="button"
                    role="option"

                    aria-selected={selectedCity === city}
                    onClick={() => {
                      onCityChange(city);
                      setCityOpen(false);
                    }}
                    className="flex w-full items-center justify-start gap-2 px-4 py-3 text-start text-sm text-foreground hover:bg-muted"
                  >
                    <CityPinIcon className="shrink-0 text-muted-foreground opacity-70" />
                    <span className="min-w-0 truncate">{city}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="mb-6 border-b border-border pb-6">
        <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg py-2 pe-1 transition-colors hover:bg-muted">
          <div className="relative shrink-0">
            <input
              type="checkbox"
              checked={onlyExceptional}
              onChange={() => onOnlyExceptionalChange(!onlyExceptional)}
              className="peer h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-border bg-muted shadow-[0px_1px_2px_0px_#0000000D] checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <svg
              className="pointer-events-none absolute inset-0 m-auto hidden h-3.5 w-3.5 peer-checked:block"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M4 8.3L6.7 11L12 5.8"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <img
            src={EXCEPTIONAL_FILTER_BADGE}
            alt={t("exceptional")}
            width={55}
            height={22}
            className="h-[22px] w-[55px] shrink-0 object-contain [unicode-bidi:isolate]"
          />
          <span className="min-w-0 flex-1" aria-hidden="true" />
          <span className="shrink-0 rounded-[8px] bg-muted px-2 py-0.5 text-xs text-foreground">
            {exceptionalFilterCount}
          </span>
        </label>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden>
            <path
              d="M20 18H0V16H1V1C1 0.734784 1.10536 0.48043 1.29289 0.292893C1.48043 0.105357 1.73478 0 2 0H16C16.2652 0 16.5196 0.105357 16.7071 0.292893C16.8946 0.48043 17 0.734784 17 1V6H19V16H20V18ZM15 16H17V8H11V16H13V10H15V16ZM15 6V2H3V16H9V6H15ZM5 8H7V10H5V8ZM5 12H7V14H5V12ZM5 4H7V6H5V4Z"
              fill="currentColor"
            />
          </svg>
          <h3

            className="text-start text-base font-bold text-foreground [unicode-bidi:isolate]"
          >
            {t("hotelRating")}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {[5, 4, 3].map((stars) => (
            <label
              key={stars}
              className="flex cursor-pointer items-center gap-3 rounded-lg py-2 pe-1 transition-colors hover:bg-muted"
            >
              <input
                type="checkbox"
                checked={selectedStars.includes(stars)}
                onChange={() => onToggleStars(stars)}
                className="h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary"
              />
              <span className="min-w-0 flex-1 text-start text-sm font-normal text-foreground">
                {t("starRating", { stars })}
              </span>
              <span className="shrink-0 rounded-[8px] bg-muted px-2 py-0.5 text-xs text-foreground">
                {starsCount.get(stars) ?? 0}
              </span>
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default AccommodationFilters;
