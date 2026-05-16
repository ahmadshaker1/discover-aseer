"use client";

import { useTranslations } from "next-intl";
import type { PreviousSeasonItem } from "../types";
import PreviousSeasonEventsCarousel from "./PreviousSeasonEventsCarousel";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface EventSeasonsPreviousSectionProps {
  seasons: PreviousSeasonItem[];
}

export default function EventSeasonsPreviousSection({
  seasons,
}: EventSeasonsPreviousSectionProps) {
  const t = useTranslations("eventSeasons");

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 md:px-8 lg:px-12">
      <div className="flex w-full flex-col gap-16 md:gap-[112px]">
        <h2
          className="w-full text-start text-[clamp(1.75rem,4vw,48px)] font-bold leading-none text-foreground"
          style={{ fontFamily: ara }}
        >
          {t("previousSeasonsTitle")}
        </h2>

        <PreviousSeasonEventsCarousel seasons={seasons} />
      </div>
    </section>
  );
}
