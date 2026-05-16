"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import type { Landmark } from "@/components/landmarks/data";
import {
  getCityOptions,
  getCityLabelById,
  getInterestOptions,
  getPriceOptions,
  getTravelerOptions,
  landmarkBelongsToCity,
} from "@/components/landmarks/filterOptions";

function landmarkMatchesCity(landmark: Landmark, city: string | null): boolean {
  if (!city) return true;
  return landmarkBelongsToCity(landmark, city);
}

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface AttractionsLandmarksSectionProps {
  landmarks: Landmark[];
  title?: string;
  description?: string;
  decorationImageSrc?: string;
  showFilters?: boolean;
  /** When set, only this many cards are shown (newest first — order from `fetchLandmarks`). */
  featuredCount?: number;
  /** Same `cardHref` for every card (used when not linking to detail pages). */
  landmarkCardHref?: string;
  /**
   * When set with `landmark.hrefSegment`, each card links to
   * `{landmarkDetailBasePath}/{hrefSegment}` (locale prefix added by `Link`).
   */
  landmarkDetailBasePath?: string;
  /**
   * When set, appends a localized “in {city}” / “في {city}” after the section title
   * (uses `getCityLabelById` for the display name).
   */
  titleCityId?: string;
}

type PriceFilterId = "free" | "budget" | "mid-range" | "luxury" | null;

const AttractionsLandmarksSection = ({
  landmarks,
  title,
  description,
  decorationImageSrc,
  showFilters = false,
  featuredCount,
  landmarkCardHref,
  landmarkDetailBasePath,
  titleCityId,
}: AttractionsLandmarksSectionProps) => {
  const locale = useLocale();
  const t = useTranslations("common");
  const sectionTitle = title ?? t("exploreAttractionsDefault");
  const cityLabel =
    titleCityId && titleCityId.trim().length > 0
      ? getCityLabelById(titleCityId.trim(), locale)
      : null;
  const heading =
    cityLabel != null && cityLabel.length > 0
      ? `${sectionTitle} ${t("exploreAttractionsInCity", { city: cityLabel })}`
      : sectionTitle;
  const cityOptions = useMemo(() => getCityOptions(locale), [locale]);
  const interestOpts = useMemo(() => getInterestOptions(locale), [locale]);
  const travelerOpts = useMemo(() => getTravelerOptions(locale), [locale]);
  const priceOpts = useMemo(() => getPriceOptions(locale), [locale]);
  const [city, setCity] = useState<string | null>(null);
  const [interest, setInterest] = useState<string | null>(null);
  const [traveler, setTraveler] = useState<string | null>(null);
  const [price, setPrice] = useState<PriceFilterId>(null);

  const filteredLandmarks = useMemo(() => {
    return landmarks.filter((landmark) => {
      if (!landmarkMatchesCity(landmark, city)) return false;

      if (interest) {
        const tags = landmark.interestTags ?? [];
        if (tags.length > 0 && !tags.includes(interest)) return false;
      }

      if (traveler) {
        const types = landmark.travelerTypes ?? [];
        if (types.length > 0 && !types.includes(traveler)) return false;
      }

      const hasPriceData =
        landmark.priceFrom != null || landmark.priceTo != null;
      if (price && hasPriceData) {
        const from = landmark.priceFrom ?? 0;
        const to = landmark.priceTo ?? from;
        if (price === "free" && !(from === 0 && to === 0)) return false;
        if (price === "budget" && from >= 50) return false;
        if (price === "mid-range" && (to < 50 || from > 200)) return false;
        if (price === "luxury" && to <= 200) return false;
      }
      return true;
    });
  }, [city, interest, landmarks, price, traveler]);

  const displayLandmarks = useMemo(() => {
    if (featuredCount == null) return filteredLandmarks;
    return filteredLandmarks.slice(0, featuredCount);
  }, [filteredLandmarks, featuredCount]);

  return (
    <section className="relative w-full overflow-hidden bg-background py-12 text-foreground">
      {decorationImageSrc ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute top-1/2 z-1 h-[450px] w-[750px] -translate-y-1/2 bg-primary opacity-40 start-0`}
          style={{
            WebkitMaskImage: `url(${decorationImageSrc})`,
            maskImage: `url(${decorationImageSrc})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "start center",
            maskPosition: "start center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 sm:px-8 md:px-[60px]">
        <div className="mx-auto mb-8 flex w-full max-w-[1320px] items-start justify-between gap-4">
          <div className={`space-y-2 text-start`}>
            <h2
              className={`w-full max-w-[620px] text-[48px] font-bold leading-[100%] text-secondary text-start`}
              style={{ fontFamily: ara }}
            >
              {heading}
            </h2>
            {description ? (
              <p
                className={`h-[11px] w-[430px] text-[24px] font-bold leading-[119%] text-muted-foreground text-start`}
                style={{ fontFamily: ara }}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {showFilters ? (
          <div className="mx-auto mb-8 w-full max-w-[1181px] overflow-x-auto pb-1">
            <div
              className={`flex min-w-max items-center gap-3 px-1 justify-end`}
            >
              <select
                value={city ?? ""}
                onChange={(e) => setCity(e.target.value || null)}
                className="h-[48px] w-[190px] shrink-0 cursor-pointer rounded-full border border-border bg-surface px-4 text-sm text-foreground"
              >
                <option value="">{t("city")}</option>
                {cityOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={interest ?? ""}
                onChange={(e) => setInterest(e.target.value || null)}
                className="h-[48px] w-[230px] shrink-0 cursor-pointer rounded-full border border-border bg-surface px-4 text-sm text-foreground"
              >
                <option value="">{t("interests")}</option>
                {interestOpts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={traveler ?? ""}
                onChange={(e) => setTraveler(e.target.value || null)}
                className="h-[48px] w-[230px] shrink-0 cursor-pointer rounded-full border border-border bg-surface px-4 text-sm text-foreground"
              >
                <option value="">{t("travelers")}</option>
                {travelerOpts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={price ?? ""}
                onChange={(e) =>
                  setPrice((e.target.value as PriceFilterId) || null)
                }
                className="h-[48px] w-[230px] shrink-0 cursor-pointer rounded-full border border-border bg-surface px-4 text-sm text-foreground"
              >
                <option value="">{t("price")}</option>
                {priceOpts.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  setCity(null);
                  setInterest(null);
                  setTraveler(null);
                  setPrice(null);
                }}
                className="h-[48px] shrink-0 cursor-pointer rounded-full border border-border bg-surface px-5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                {t("resetFilters")}
              </button>
            </div>
          </div>
        ) : null}

        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 justify-items-center gap-6 pb-2 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4">
          {displayLandmarks.map((landmark) => (
            <AttractionsLandmarkCard
              key={landmark.id}
              landmark={landmark}
              className="max-w-none"
              cardHref={landmarkCardHref ?? `/attractions/${landmark.slug}`}
            />
          ))}
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-[1320px] justify-center">
          <Link
            href="/attractions"
            className="inline-flex h-[52px] min-w-[161px] cursor-pointer items-center justify-center gap-2 rounded-[55px] border border-primary/30 bg-primary px-8 text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90"
            style={{ fontFamily: ara }}
          >
            <span
              className={`whitespace-nowrap text-[20px] font-bold leading-[100%] text-start`}
            >
              {t("browseMore")}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AttractionsLandmarksSection;
