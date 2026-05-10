"use client";

import { useTranslations } from "next-intl";

const RestaurantsHeader = () => {
  const t = useTranslations("restaurantsPage");
  return (
    <div className="flex flex-col items-start space-y-4 text-right w-full">
      <h2 className="text-3xl md:text-7xl font-bold text-right w-full text-black">
        {t("title")}
      </h2>
      <span className="h-px w-24 bg-gradient-to-l from-transparent via-black/40 to-transparent" />
      <p className="text-base md:text-lg text-gray-700 text-right max-w-2xl">
        {t("headerSubtitle")}
      </p>
    </div>
  );
};

export default RestaurantsHeader;
