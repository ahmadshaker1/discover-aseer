"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Accommodation } from "./data";
import AccommodationCard from "./AccommodationCard";

export interface AccommodationHotelsGridProps {
  items: Accommodation[];
  showTopDivider: boolean;
}

const AccommodationHotelsGrid = ({
  items,
  showTopDivider,
}: AccommodationHotelsGridProps) => {
  const t = useTranslations("common");
  const locale = useLocale();
  if (items.length === 0) return null;

  return (
    <section
      className={`min-w-0 ${showTopDivider ? "border-t border-border pt-10 lg:pt-12" : ""}`}
      lang={locale}
    >
      <h2

        className="mb-4 text-start text-xl font-bold text-foreground sm:text-2xl [unicode-bidi:isolate]"
      >
        {t("hotels")}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((a) => (
          <AccommodationCard key={a.id} accommodation={a} layout="grid" />
        ))}
      </div>
    </section>
  );
};

export default AccommodationHotelsGrid;
