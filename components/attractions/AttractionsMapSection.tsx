"use client";

import { useLocale, useTranslations } from "next-intl";
import MapPlaceholderSection from "@/components/MapPlaceholderSection";

const AttractionsMapSection = () => {
  const locale = useLocale();
  const t = useTranslations("attractionsPage");
  const query =
    locale === "en"
      ? "Al Abu Sirah palaces, Asir, Saudi Arabia"
      : "قصور آل أبو سراح";
  const palacesMapsUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <MapPlaceholderSection
      ctaLabel={t("mapPalacesCta")}
      ctaWidthPx={266}
      mapHref={palacesMapsUrl}
      imageAlt={t("mapPalacesAlt")}
    />
  );
};

export default AttractionsMapSection;
