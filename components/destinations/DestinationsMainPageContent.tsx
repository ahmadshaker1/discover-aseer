"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import DestinationsGridCard from "@/components/destinations/DestinationsGridCard";
import type { Destination } from "@/components/destinations/data";
import {
  destinationMatchesFilterId,
  getDestinationFilterOptions,
  type DestinationFilterId,
} from "@/components/destinations/filterOptions";
import { getInterestOptions } from "@/components/landmarks/filterOptions";
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
  /** From `/destinations?filter=` (e.g. About Aseer landscape cards). */
  initialDestinationFilter?: DestinationFilterId | null;
}

interface FilterState {
  destinationFilter: string | null;
}

const INITIAL_FILTERS: FilterState = { destinationFilter: null };

const includesInterests = (d: Destination, selected: string[]): boolean => {
  if (selected.length === 0) return true;
  const tags = d.interestTags ?? [];
  if (tags.length === 0) return true;
  return selected.some((id) => tags.includes(id));
};

/**
 * Browse `/destinations` — same layout as landmarks listing; filters use
 * `Destination.destinationFilterId` and `Destination.interestTags` from Directus.
 */
const DestinationsMainPageContent = ({
  destinations,
  filterLayout = "default",
  initialDestinationFilter = null,
}: DestinationsMainPageContentProps) => {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const isBrowse = filterLayout === "browse";
  const [filters, setFilters] = useState<FilterState>(() => ({
    destinationFilter: initialDestinationFilter ?? null,
  }));
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const destinationFilterOptions = useMemo(
    () => getDestinationFilterOptions(locale),
    [locale],
  );
  const interestOptions = useMemo(() => getInterestOptions(locale), [locale]);

  const interestCounts = useMemo(() => {
    return interestOptions.reduce<Record<string, number>>((acc, option) => {
      acc[option.id] = destinations.filter((d) =>
        (d.interestTags ?? []).includes(option.id),
      ).length;
      return acc;
    }, {});
  }, [destinations, interestOptions]);

  const visible = useMemo(() => {
    const filterId = filters.destinationFilter;
    const categoryFiltered = destinations.filter((d) =>
      destinationMatchesFilterId(
        d.destinationFilterId,
        d.destinationFilter,
        filterId,
      ),
    );
    if (isBrowse) return categoryFiltered;
    return categoryFiltered.filter((d) =>
      includesInterests(d, selectedInterests),
    );
  }, [filters.destinationFilter, destinations, selectedInterests, isBrowse]);

  return (
    <section className="w-full bg-background py-12 text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="order-2 w-full flex-1 lg:order-2 lg:max-w-[1033px]">
            <div className="mx-auto grid w-full max-w-[1033px] grid-cols-1 justify-items-center gap-[23px] md:grid-cols-2 xl:min-h-[862px] xl:grid-cols-3">
              {visible.map((d) => (
                <DestinationsGridCard
                  key={d.id}
                  destination={d}
                  className="mx-auto w-full max-w-[320px]"
                />
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
            className={`order-1 w-full min-w-0 lg:order-1 lg:sticky lg:top-24 lg:min-h-0 lg:w-[320px] lg:shrink-0 lg:border-border lg:pt-6 lg:ps-8 lg:pe-8 lg:border-s`}
          >
            <div className="mx-auto flex w-full max-w-[320px] flex-col gap-6 lg:mx-0 lg:max-w-[256px]">
              <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <h3
                  className={`min-w-0 flex-1 text-xl font-bold leading-tight tracking-[-0.31px] text-foreground text-start sm:text-2xl`}
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

              <div className="group relative h-12 w-full overflow-hidden rounded-[55px] border border-border bg-muted/20 px-6 py-3 transition-all duration-200 hover:bg-muted/40 hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <select
                  aria-label={tCommon("destinationFilter")}
                  value={filters.destinationFilter ?? ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      destinationFilter: e.target.value ? e.target.value : null,
                    }))
                  }
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--foreground)",
                  }}
                  className="absolute inset-0 z-10 cursor-pointer bg-surface text-foreground opacity-0 dark:[color-scheme:dark]"
                >
                  <option
                    value=""
                    className="bg-surface text-foreground"
                    style={{
                      backgroundColor: "var(--surface)",
                      color: "var(--foreground)",
                    }}
                  >
                    {tCommon("destinationFilter")}
                  </option>
                  {destinationFilterOptions.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                      className="bg-surface text-foreground"
                      style={{
                        backgroundColor: "var(--surface)",
                        color: "var(--foreground)",
                      }}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex h-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary">
                      <LocationIcon />
                    </span>
                    <span
                      className="text-[14px] font-normal leading-5 tracking-[-0.15px] text-foreground transition-colors duration-200 group-hover:text-primary/90"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {destinationFilterOptions.find(
                        (o) => o.id === filters.destinationFilter,
                      )?.label ?? tCommon("destinationFilter")}
                    </span>
                  </div>
                  <span className="text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {!isBrowse ? (
                <div className="w-full pt-2">
                  <div className="mb-4 h-px w-full bg-border" />

                  <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                    <HeartIcon />
                    <h4
                      className={`text-lg font-bold leading-[119%] tracking-[0] text-foreground text-start sm:text-[20px]`}
                      style={{ fontFamily: ara }}
                    >
                      {tCommon("interests")}
                    </h4>
                  </div>

                  <div className="w-full space-y-3">
                    {interestOptions.map((option) => {
                      const checked = selectedInterests.includes(option.id);
                      const count = interestCounts[option.id] ?? 0;
                      return (
                        <label
                          key={option.id}
                          className="flex w-full cursor-pointer items-center justify-between gap-2"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-3">
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
                              className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-border bg-muted shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <span
                              className={`min-w-0 text-sm font-normal leading-5 tracking-[-0.15px] text-foreground text-start`}
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {option.label}
                            </span>
                          </div>
                          <span
                            className="inline-flex h-7 shrink-0 items-center justify-center rounded-[8px] bg-muted px-2 text-base leading-[100%] text-muted-foreground sm:text-lg"
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
