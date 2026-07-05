"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  CheckboxCheckIcon,
  ChevronDownSmallIcon,
  CityPinIcon,
  HotelRatingIcon,
} from "./Icons";

const EXCEPTIONAL_FILTER_BADGE =
  "/assets/accommodation/exceptional-filter-badge.svg";
const EN_EXCEPTIONAL_FILTER_BADGE = "/assets/accommodation/Tag1.svg";

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
  const locale = useLocale();
  const [cityOpen, setCityOpen] = useState(false);
  const cityWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!cityWrapRef.current?.contains(e.target as Node)) setCityOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selectedCityLabel =
    selectedCity === "all" ? t("allCities") : selectedCity;

  return (
    <aside className="w-full shrink-0 rounded-2xl border border-border bg-surface p-4 text-foreground sm:p-6 lg:h-[796px] lg:w-[320px] lg:rounded-none lg:border-y-0 lg:border-s-0 lg:border-e lg:border-border lg:bg-transparent lg:pb-0 lg:ps-8 lg:pe-8 lg:pt-6 lg:shadow-none">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-6">
        <h2 className="text-start text-lg font-bold text-foreground sm:text-xl [unicode-bidi:isolate]">
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
              <ChevronDownSmallIcon />
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
            <CheckboxCheckIcon />
          </div>
          <img
            src={
              locale === "en"
                ? EN_EXCEPTIONAL_FILTER_BADGE
                : EXCEPTIONAL_FILTER_BADGE
            }
            alt={t("exceptional")}
            width={locale === "en" ? 85 : 55}
            height={locale === "en" ? 34 : 22}
            className={`shrink-0 object-contain [unicode-bidi:isolate] ${
              locale === "en" ? "h-[34px] w-[85px]" : "h-[22px] w-[55px]"
            }`}
          />
          <span className="min-w-0 flex-1" aria-hidden="true" />
          <span className="shrink-0 rounded-[8px] bg-muted px-2 py-0.5 text-xs text-foreground">
            {exceptionalFilterCount}
          </span>
        </label>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <HotelRatingIcon />
          <h3 className="text-start text-base font-bold text-foreground [unicode-bidi:isolate]">
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
