"use client";

import MapPlaceholderSection from "@/components/MapPlaceholderSection";
import { useLocale } from "next-intl";

const ABHA_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("أبها، السعودية");

interface DestinationsMapSectionProps {
  areaLabel?: string;
  lat?: number;
  lon?: number;
}

const DestinationsMapSection = ({ areaLabel = "أبها", lat, lon }: DestinationsMapSectionProps) => {
  const locale = useLocale();
  const mapHref =
    typeof lat === "number" && typeof lon === "number"
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lon}`)}`
      : ABHA_MAPS_URL;

  return (
    <MapPlaceholderSection
      ctaLabel={
        locale === "ar"
          ? `مشاهدة ${areaLabel} على الخريطة`
          : `View ${areaLabel} on map`
      }
      ctaWidthPx={220}
      mapHref={mapHref}
      imageAlt={locale === "ar" ? `خريطة ${areaLabel}` : `${areaLabel} map`}
    />
  );
};

export default DestinationsMapSection;
