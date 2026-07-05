"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import {
  attractionMatchesTerrain,
  TERRAIN_TO_INTERESTS,
  type FilmLandscapeFilterId,
} from "@/components/film/landscapeFilters";
import type { Landmark } from "@/components/landmarks/data";
import {
  getCityOptions,
  getInterestOptions,
  locationMatchesCityId,
} from "@/components/landmarks/filterOptions";
import {
  ChevronDownIcon,
  ClockIcon,
  HeartIcon,
  LocationIcon,
} from "@/components/landmarks/Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface AttractionsMainPageContentProps {
  landmarks: Landmark[];
  /** From `/attractions?terrain=mountains` (film page landscape cards). */
  initialTerrain?: FilmLandscapeFilterId | null;
}

interface FilterState {
  city: string | null;
  attractionType: string | null;
  interests: string[];
}

function buildInitialFilters(initialCityId?: string | null): FilterState {
  return {
    city: initialCityId?.trim() || null,
    attractionType: null,
    interests: [],
  };
}

const includesInterests = (
  landmark: Landmark,
  selectedInterests: string[],
): boolean => {
  if (selectedInterests.length === 0) return true;
  const tags = landmark.interestTags ?? [];
  if (tags.length === 0) return false;
  return selectedInterests.some((interest) => tags.includes(interest));
};

const AttractionsMainPageContent = ({
  landmarks,
  initialTerrain = null,
}: AttractionsMainPageContentProps) => {
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tFilm = useTranslations("film");

  const cityOptions = useMemo(() => getCityOptions(locale), [locale]);
  const interestOptions = useMemo(() => getInterestOptions(locale), [locale]);

  const terrainInterests = useMemo(
    () => (initialTerrain ? TERRAIN_TO_INTERESTS[initialTerrain] : []),
    [initialTerrain],
  );

  const includesCity = (landmark: Landmark, city: string | null): boolean => {
    if (!city) return true;
    if (landmark.cityId) return landmark.cityId === city;
    return locationMatchesCityId(`${landmark.location} ${landmark.area}`, city);
  };

  const includesAttractionType = (
    landmark: Landmark,
    type: string | null,
  ): boolean => {
    if (!type) return true;
    const value = (landmark.attractionType || "").trim();
    return value === type;
  };
  /**
   * Backend handoff:
   * - These filters are fully wired to `Landmark` metadata:
   *   `cityId`, `travelerTypes`, `priceFrom/priceTo`, `interestTags`.
   * - If backend doesn't return some metadata yet, cards still render and
   *   filters gracefully fall back (won't break page rendering).
   */
  const [filters, setFilters] = useState<FilterState>(() =>
    buildInitialFilters(),
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    () => terrainInterests,
  );

  const cityScopedLandmarks = useMemo(
    () => landmarks.filter((landmark) => includesCity(landmark, filters.city)),
    [filters.city, landmarks],
  );

  const attractionTypeOptions = useMemo(() => {
    const unique = new Set<string>();
    for (const landmark of cityScopedLandmarks) {
      const value = landmark.attractionType?.trim();
      if (value) unique.add(value);
    }
    return [...unique].sort((a, b) => a.localeCompare(b, locale));
  }, [cityScopedLandmarks, locale]);

  useEffect(() => {
    if (!filters.attractionType) return;
    if (!attractionTypeOptions.includes(filters.attractionType)) {
      setFilters((prev) => ({ ...prev, attractionType: null }));
    }
  }, [attractionTypeOptions, filters.attractionType]);

  const typeScopedLandmarks = useMemo(
    () =>
      cityScopedLandmarks.filter((landmark) =>
        includesAttractionType(landmark, filters.attractionType),
      ),
    [cityScopedLandmarks, filters.attractionType],
  );

  const interestCounts = useMemo(() => {
    return interestOptions.reduce<Record<string, number>>((acc, option) => {
      acc[option.id] = typeScopedLandmarks.filter((landmark) =>
        (landmark.interestTags ?? []).includes(option.id),
      ).length;
      return acc;
    }, {});
  }, [interestOptions, typeScopedLandmarks]);

  const visibleLandmarks = useMemo(() => {
    return typeScopedLandmarks.filter((landmark) => {
      if (
        initialTerrain &&
        !attractionMatchesTerrain(landmark, initialTerrain)
      ) {
        return false;
      }
      return includesInterests(landmark, selectedInterests);
    });
  }, [typeScopedLandmarks, selectedInterests, initialTerrain]);

  return (
    <section className="w-full bg-background py-12 text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        {initialTerrain ? (
          <p
            className="mb-6 text-start text-sm text-muted-foreground"
            style={{ fontFamily: ibm }}
          >
            {tFilm("landscapes.filteredBy", {
              label: tFilm(`landscapes.${initialTerrain}`),
            })}
          </p>
        ) : null}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="order-2 w-full flex-1 lg:order-2 lg:max-w-[1033px]">
            <div className="mx-auto grid w-full max-w-[1033px] grid-cols-1 justify-items-center gap-[23px] md:grid-cols-2 xl:min-h-[862px] xl:grid-cols-3">
              {visibleLandmarks.map((landmark) => (
                <AttractionsLandmarkCard
                  key={landmark.id}
                  landmark={landmark}
                  className="mx-auto"
                  cardHref={`/attractions/${landmark.slug}`}
                />
              ))}
            </div>

            {visibleLandmarks.length === 0 ? (
              <p
                className={`py-8 text-sm text-muted-foreground text-start`}
                style={{ fontFamily: ibm }}
              >
                {tCommon("noLandmarksMatchFilters")}
              </p>
            ) : null}
          </div>

          <aside
            className={`order-1 w-full min-w-0 lg:order-1 lg:sticky lg:top-24 lg:h-[796px] lg:w-[320px] lg:shrink-0 lg:border-border lg:pt-6 lg:ps-8 lg:pe-8 lg:border-e`}
          >
            <div className="mx-auto flex w-full max-w-[320px] flex-col gap-6 lg:mx-0 lg:max-w-[256px]">
              <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <h3
                  className={`min-w-0 flex-1 text-xl font-bold leading-tight tracking-[-0.31px] text-foreground text-start sm:text-2xl`}
                  style={{ fontFamily: ara }}
                >
                  {tCommon("filterLandmarks")}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setFilters({
                      city: null,
                      attractionType: null,
                      interests: [],
                    });
                    setSelectedInterests([]);
                  }}
                  className="flex h-8 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[8px] border border-border bg-surface px-3 text-center text-sm font-bold leading-5 tracking-[-0.15px] text-foreground transition-colors hover:bg-muted sm:text-[18px]"
                  style={{ fontFamily: ara }}
                >
                  {tCommon("resetFilters")}
                </button>
              </div>

              <div className="group relative h-12 w-full overflow-hidden rounded-[55px] border border-border bg-muted/20 px-6 py-3 transition-all duration-200 hover:bg-muted/40 hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                <select
                  aria-label={tCommon("city")}
                  value={filters.city ?? ""}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      city: event.target.value ? event.target.value : null,
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
                    {tCommon("city")}
                  </option>
                  {cityOptions.map((option) => (
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
                      <ClockIcon />
                    </span>
                    <span
                      className="text-[14px] font-normal leading-5 tracking-[-0.15px] text-foreground transition-colors duration-200 group-hover:text-primary/90"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {cityOptions.find((option) => option.id === filters.city)
                        ?.label ?? tCommon("city")}
                    </span>
                  </div>
                  <span className="text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>

              {attractionTypeOptions.length > 0 ? (
                <div className="group relative h-12 w-full overflow-hidden rounded-[55px] border border-border bg-muted/20 px-6 py-3 transition-all duration-200 hover:bg-muted/40 hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                  <select
                    aria-label={tCommon("attractionType")}
                    value={filters.attractionType ?? ""}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        attractionType: event.target.value
                          ? event.target.value
                          : null,
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
                      {tCommon("attractionType")}
                    </option>
                    {attractionTypeOptions.map((value) => (
                      <option
                        key={value}
                        value={value}
                        className="bg-surface text-foreground"
                        style={{
                          backgroundColor: "var(--surface)",
                          color: "var(--foreground)",
                        }}
                      >
                        {value}
                      </option>
                    ))}
                  </select>

                  <div className="flex h-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary">
                        <ClockIcon />
                      </span>
                      <span
                        className="text-[14px] font-normal leading-5 tracking-[-0.15px] text-foreground transition-colors duration-200 group-hover:text-primary/90"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {attractionTypeOptions.includes(
                          filters.attractionType ?? "",
                        )
                          ? (filters.attractionType as string)
                          : tCommon("attractionType")}
                      </span>
                    </div>
                    <span className="text-foreground transition-colors duration-200 group-hover:text-primary group-focus-within:text-primary">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
              ) : null}

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
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AttractionsMainPageContent;
