"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import DestinationsGridCard from "@/components/destinations/DestinationsGridCard";
import type { Destination } from "@/components/destinations/data";
import {
  getCityOptions,
  getInterestOptions,
  locationMatchesCityId,
} from "@/components/landmarks/filterOptions";
import {
  ChevronDownIcon,
  HeartIcon,
  LocationIcon,
} from "@/components/landmarks/Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface DestinationsMainPageContentProps {
  destinations: Destination[];
  /** Browse page: same filter chrome as default, but no interest checkboxes. */
  filterLayout?: "default" | "browse";
}

interface FilterState {
  city: string | null;
}

const INITIAL_FILTERS: FilterState = { city: null };

const includesInterests = (d: Destination, selected: string[]): boolean => {
  if (selected.length === 0) return true;
  const tags = d.interestTags ?? [];
  if (tags.length === 0) return true;
  return selected.some((id) => tags.includes(id));
};

/**
 * Browse `/destinations` — same layout as landmarks listing; filters use
 * `Destination.cityId` and `Destination.interestTags` from Directus.
 */
const DestinationsMainPageContent = ({
  destinations,
  filterLayout = "default",
}: DestinationsMainPageContentProps) => {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const isBrowse = filterLayout === "browse";
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const cityOptions = useMemo(() => getCityOptions(locale), [locale]);
  const interestOptions = useMemo(() => getInterestOptions(locale), [locale]);

  const includesCity = (d: Destination, city: string | null): boolean => {
    if (!city) return true;
    if (d.cityId) return d.cityId === city;
    return locationMatchesCityId(`${d.location} ${d.area}`, city);
  };

  const interestCounts = useMemo(() => {
    return interestOptions.reduce<Record<string, number>>((acc, option) => {
      acc[option.id] = destinations.filter((d) =>
        (d.interestTags ?? []).includes(option.id),
      ).length;
      return acc;
    }, {});
  }, [destinations, interestOptions]);

  const visible = useMemo(() => {
    const cityFiltered = destinations.filter((d) =>
      includesCity(d, filters.city),
    );
    if (isBrowse) return cityFiltered;
    return cityFiltered.filter((d) => includesInterests(d, selectedInterests));
  }, [filters.city, destinations, selectedInterests, isBrowse]);

  return (
    <section className="w-full bg-background py-12 text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full flex-1 lg:order-2 lg:max-w-[1033px]">
            <div className="mx-auto grid w-full max-w-[1033px] grid-cols-1 gap-[23px] md:grid-cols-2 xl:min-h-[862px] xl:grid-cols-3">
              {visible.map((d) => (
                <DestinationsGridCard key={d.id} destination={d} />
              ))}
            </div>

            {visible.length === 0 ? (
              <p
                className={`py-8 text-sm text-muted-foreground text-start`}
                style={{ fontFamily: ibm }}
              >
                {tCommon("noDestinationsMatchFilters")}
              </p>
            ) : null}
          </div>

          <aside
            className={`w-full lg:sticky lg:top-24 lg:min-h-0 lg:w-[320px] lg:shrink-0 lg:border-border lg:pt-6 lg:ps-8 lg:pe-8 lg:border-s`}
          >
            <div className="flex h-full flex-col gap-6">
              <div className="flex h-8 w-full max-w-[256px] items-center justify-between">
                <h3
                  className={`max-w-[200px] text-[24px] font-bold leading-6 tracking-[-0.31px] text-foreground text-start`}
                  style={{ fontFamily: ara }}
                >
                  {tCommon("filterDestinationsLabel")}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setFilters(INITIAL_FILTERS);
                    setSelectedInterests([]);
                  }}
                  className="flex h-8 w-auto shrink-0 items-center justify-center rounded-[8px] border border-border bg-surface px-3 text-center text-[18px] font-bold leading-5 tracking-[-0.15px] text-foreground transition-colors hover:bg-muted"
                  style={{ fontFamily: ara }}
                >
                  {tCommon("resetFilters")}
                </button>
              </div>

              <div className="relative h-12 w-full max-w-[256px] overflow-hidden rounded-[55px] border border-border px-6 py-3">
                <select
                  aria-label={tCommon("city")}
                  value={filters.city ?? ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      city: e.target.value ? e.target.value : null,
                    }))
                  }
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                >
                  <option value="">{tCommon("city")}</option>
                  {cityOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex h-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LocationIcon />
                    <span
                      className="text-[14px] font-normal leading-5 tracking-[-0.15px] text-foreground"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {cityOptions.find((o) => o.id === filters.city)?.label ??
                        tCommon("city")}
                    </span>
                  </div>
                  <ChevronDownIcon />
                </div>
              </div>

              {!isBrowse ? (
                <div className="pt-2">
                  <div className="mb-4 h-px w-full max-w-[256px] bg-border" />

                  <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                    <HeartIcon />
                    <h4
                      className={`h-6 min-w-[73px] text-[20px] font-bold leading-[119%] tracking-[0] text-foreground text-start`}
                      style={{ fontFamily: ara }}
                    >
                      {tCommon("interests")}
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {interestOptions.map((option) => {
                      const checked = selectedInterests.includes(option.id);
                      const count = interestCounts[option.id] ?? 0;
                      return (
                        <label
                          key={option.id}
                          className="flex cursor-pointer items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setSelectedInterests((prev) =>
                                  prev.includes(option.id)
                                    ? prev.filter((id) => id !== option.id)
                                    : [...prev, option.id],
                                )
                              }
                              className="h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-border bg-muted shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <span
                              className={`h-5 min-w-[73px] text-[14px] font-normal leading-5 tracking-[-0.15px] text-foreground text-start`}
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {option.label}
                            </span>
                          </div>
                          <span
                            className="inline-flex h-7 min-w-7 items-center justify-center rounded-[8px] bg-muted px-2 text-[24px] leading-[100%] text-muted-foreground"
                            style={{ fontFamily: ara }}
                          >
                            {count}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DestinationsMainPageContent;
