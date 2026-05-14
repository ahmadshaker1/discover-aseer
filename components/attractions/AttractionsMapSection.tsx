"use client";

import { useLocale, useTranslations } from "next-intl";
import MapPlaceholderSection from "@/components/MapPlaceholderSection";

interface AttractionsMapSectionProps {
  mapHref?: string;
  ctaLabel?: string;
  imageAlt?: string;
}

const AttractionsMapSection = ({
  mapHref: mapHrefProp,
  ctaLabel: ctaLabelProp,
  imageAlt: imageAltProp,
}: AttractionsMapSectionProps = {}) => {
  const locale = useLocale();
  const t = useTranslations("attractionsPage");
  const query =
    locale === "en"
      ? "Al Abu Sirah palaces, Asir, Saudi Arabia"
      : "قصور آل أبو سراح";
  const palacesMapsUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const mapHref = mapHrefProp ?? palacesMapsUrl;

  return (
    <MapPlaceholderSection
      ctaLabel={ctaLabelProp ?? t("mapPalacesCta")}
      ctaWidthPx={266}
      mapHref={mapHref}
      imageAlt={imageAltProp ?? t("mapPalacesAlt")}
    />
  );
};

export default AttractionsMapSection;
