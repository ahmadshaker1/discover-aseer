"use client";

import { useTranslations } from "next-intl";
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
  if (items.length === 0) return null;

  return (
    <section
      className={`min-w-0 ${showTopDivider ? "border-t border-gray-200 pt-10 lg:pt-12" : ""}`}
      dir="rtl"
      lang="ar"
    >
      <h2
        dir="rtl"
        className="mb-4 text-right text-xl font-bold text-black sm:text-2xl [unicode-bidi:isolate]"
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
