"use client";

import { useTranslations } from "next-intl";
import AseerExperiencesCardsCarousel from "@/components/experiences/AseerExperiencesCardsCarousel";
import type { ExperienceCardProps } from "@/components/experiences/ExperienceCard/ExperienceCard";

interface ExperiencesSectionProps {
  experiences: ExperienceCardProps[];
}

export default function ExperiencesSection({
  experiences,
}: ExperiencesSectionProps) {
  const t = useTranslations("gettingHere.experiences");

  if (!experiences || experiences.length === 0) return null;

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
          <AseerExperiencesCardsCarousel cards={experiences} />
        </div>
      </div>
    </section>
  );
}
