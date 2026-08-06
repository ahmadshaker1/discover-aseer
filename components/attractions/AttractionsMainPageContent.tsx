"use client";

import { useEffect, useMemo, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import {
  attractionMatchesTerrain,
  TERRAIN_TO_INTERESTS,
  type FilmLandscapeFilterId,
} from "@/components/film/landscapeFilters";
import type { Landmark } from "@/components/landmarks/data";
import {
  getCityLabelById,
  isValidAttractionsCityId,
  locationMatchesCityId,
} from "@/components/landmarks/filterOptions";
import {
  ChevronDownIcon,
  ClockIcon,
  HeartIcon,
  LocationIcon,
} from "@/components/landmarks/Icons";


interface AttractionsMainPageContentProps {
  landmarks: Landmark[];
  /** From `/attractions?terrain=mountains` (film page landscape cards). */
  initialTerrain?: FilmLandscapeFilterId | null;
}

interface FilterState {
  city: string | null;
  attractionType: string[];
}

function buildInitialFilters(initialCityId?: string | null): FilterState {
  return {
    city: initialCityId?.trim() || null,
    attractionType: [],
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

  const cityOptions = useMemo(() => {
    const unique = new Map<string, string>();
    for (const landmark of landmarks) {
      const id = (landmark.cityId || landmark.city || "").trim();
      if (!id) continue;

      let label = (landmark.city || id).trim();
      if (landmark.cityId) {
        const defLabel = getCityLabelById(landmark.cityId, locale);
        if (defLabel !== landmark.cityId) {
          label = defLabel;
        }
      }

      if (!unique.has(id)) {
        unique.set(id, label);
      }
    }
    return Array.from(unique.entries())
      .map(([id, label]) => ({ id, label }))
      .sort((a, b) => a.label.localeCompare(b.label, locale));
  }, [landmarks, locale]);

  const terrainInterests = useMemo(
    () => (initialTerrain ? TERRAIN_TO_INTERESTS[initialTerrain] : []),
    [initialTerrain],
  );

  const includesCity = (landmark: Landmark, city: string | null): boolean => {
    if (!city) return true;

    const id = (landmark.cityId || landmark.city || "").trim();
    if (id) {
      return id === city;
    }

    if (isValidAttractionsCityId(city)) {
      return locationMatchesCityId(
        `${landmark.location} ${landmark.area}`,
        city,
      );
    }

    return false;
  };

  const includesAttractionType = (
    landmark: Landmark,
    types: string[],
  ): boolean => {
    if (types.length === 0) return true;
    const value = (landmark.attractionType || "").trim();
    return types.includes(value);
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
    setFilters((prev) => {
      const valid = prev.attractionType.filter((t) =>
        attractionTypeOptions.includes(t),
      );
      if (valid.length !== prev.attractionType.length) {
        return { ...prev, attractionType: valid };
      }
      return prev;
    });
  }, [attractionTypeOptions]);

  const typeScopedLandmarks = useMemo(
    () =>
      cityScopedLandmarks.filter((landmark) =>
        includesAttractionType(landmark, filters.attractionType),
      ),
    [cityScopedLandmarks, filters.attractionType],
  );

  const attractionTypeCounts = useMemo(() => {
    return attractionTypeOptions.reduce<Record<string, number>>(
      (acc, option) => {
        acc[option] = cityScopedLandmarks.filter(
          (landmark) => (landmark.attractionType || "").trim() === option,
        ).length;
        return acc;
      },
      {},
    );
  }, [attractionTypeOptions, cityScopedLandmarks]);

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
              >
                {tCommon("noLandmarksMatchFilters")}
              </p>
            ) : null}
          </div>

          <aside
            className={`font-brando order-1 w-full min-w-0 lg:order-1 lg:w-[320px] lg:shrink-0 lg:border-border lg:pt-6 lg:ps-8 lg:pe-8 lg:border-e`}
          >
            <div className="mx-auto flex w-full max-w-[320px] flex-col gap-6 lg:mx-0 lg:max-w-[256px]">
              <h3
                className="whitespace-pre-line text-[24px] text-foreground text-start"
                style={{ fontWeight: "bold" }}
              >
                {tCommon("discoverAttractionsTitle")}
              </h3>
              <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <h3
                  className={`min-w-0 flex-1 text-[16px] leading-tight tracking-[-0.31px] text-foreground text-start`}
                  style={{ fontWeight: "semi-bold" }}
                >
                  {tCommon("filterLandmarks")}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setFilters({
                      city: null,
                      attractionType: [],
                    });
                    setSelectedInterests([]);
                  }}
                  className="flex h-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-[8px] border border-border bg-surface px-3 text-center text-[16px] leading-5 tracking-[-0.15px] text-foreground transition-colors hover:bg-muted"
                  style={{ fontWeight: "400" }}
                >
                  {tCommon("resetFilters")}
                </button>
              </div>

              <div className="mb-6 sm:mb-8">
                <Menu as="div" className="relative">
                  <Menu.Button
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-3 py-2.5 text-xs text-foreground transition-all duration-200 hover:border-muted-foreground sm:px-4 sm:py-3 sm:text-sm flex-row`}
                  >
                    <ClockIcon />
                    <span className="flex-1 text-start">
                      {cityOptions.find((option) => option.id === filters.city)
                        ?.label ?? tCommon("city")}
                    </span>
                    <ChevronDownIcon />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 scale-95 translate-y-1"
                    enterTo="opacity-100 scale-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 scale-100 translate-y-0"
                    leaveTo="opacity-0 scale-95 translate-y-1"
                  >
                    <Menu.Items
                      className={`absolute z-50 mt-2 w-full rounded-lg border border-border bg-surface shadow-xl ring-1 ring-border focus:outline-none start-0 origin-top-start`}
                    >
                      <div className="py-1">
                        {cityOptions.map((option) => (
                          <Menu.Item key={option.id}>
                            {({ active }) => (
                              <button
                                onClick={() =>
                                  setFilters((prev) => ({
                                    ...prev,
                                    city:
                                      filters.city === option.id
                                        ? null
                                        : option.id,
                                  }))
                                }
                                className={`${
                                  active ? "bg-primary/10 text-primary" : ""
                                } ${
                                  filters.city === option.id
                                    ? "bg-primary/5 font-semibold text-primary"
                                    : "text-foreground"
                                } block w-full text-start px-4 py-2 text-sm cursor-pointer transition-colors duration-150`}
                              >
                                {option.label}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              {attractionTypeOptions.length > 0 ? (
                <div className="w-full pt-2">
                  <div className="mb-4 h-px w-full bg-border" />

                  <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                    <HeartIcon />
                    <h4
                      className={`text-lg leading-[119%] tracking-[0] text-foreground text-start sm:text-[16px]`}
                      style={{ fontWeight: 400 }}
                    >
                      {tCommon("attractionType")}
                    </h4>
                  </div>

                  <div className="w-full space-y-3">
                    {attractionTypeOptions.map((option) => {
                      const checked = filters.attractionType.includes(option);
                      const count = attractionTypeCounts[option] ?? 0;
                      return (
                        <label
                          key={option}
                          className="flex w-full cursor-pointer items-center justify-between gap-2"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  attractionType: prev.attractionType.includes(
                                    option,
                                  )
                                    ? prev.attractionType.filter(
                                        (t) => t !== option,
                                      )
                                    : [...prev.attractionType, option],
                                }))
                              }
                              className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-border bg-muted shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <span
                              className={`min-w-0 text-sm font-normal leading-5 tracking-[-0.15px] text-foreground text-start`}
                            >
                              {option}
                            </span>
                          </div>
                          <span
                            className="inline-flex h-7 shrink-0 items-center justify-center rounded-[8px] bg-muted px-2 text-base leading-[100%] text-muted-foreground sm:text-lg"
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

export default AttractionsMainPageContent;
