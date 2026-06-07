"use client";

import { useTranslations } from "next-intl";
import AseerAttractionsCardsCarousel from "@/components/attractions/AseerAttractionsCardsCarousel";
import type { Landmark } from "@/components/landmarks/data";

interface AttractionsSectionProps {
  attractions: Landmark[];
}

export default function AttractionsSection({
  attractions,
}: AttractionsSectionProps) {
  const t = useTranslations("gettingHere.attractions");

  if (!attractions || attractions.length === 0) return null;

  return (
    <section className="py-12 text-foreground text-start">
      <div className="container mx-auto px-6 mb-12">
        {/* Title */}
        <div className="mb-6 border-b border-border pb-4 pt-6">
          <h2 className="text-[32px] font-bold text-foreground sm:text-[40px] text-start">
            {t("title")}
          </h2>
        </div>

        {/* Description */}
        <div className="mb-8 flex justify-start">
          <p className="max-w-2xl text-[16px] leading-[1.6] text-muted-foreground sm:text-[18px] text-start">
            {t("subtitle")}
          </p>
        </div>

        {/* Carousel */}
        <div className="w-full">
          <AseerAttractionsCardsCarousel landmarks={attractions} />
        </div>
      </div>
    </section>
  );
}
