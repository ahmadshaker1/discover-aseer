"use client";

import MapPlaceholderSection from "@/components/MapPlaceholderSection";
import { useLocale, useTranslations } from "next-intl";

interface DestinationsMapSectionProps {
  areaLabel?: string;
  lat?: number;
  lon?: number;
}

const DestinationsMapSection = ({ areaLabel, lat, lon }: DestinationsMapSectionProps) => {
  const locale = useLocale();
  const tDest = useTranslations("destinations");
  const resolvedArea = areaLabel ?? tDest("heroTitleAbha");

  const abhaQuery =
    locale === "en"
      ? encodeURIComponent("Abha, Saudi Arabia")
      : encodeURIComponent("أبها، السعودية");
  const fallbackMapsUrl = `https://www.google.com/maps/search/?api=1&query=${abhaQuery}`;

  const mapHref =
    typeof lat === "number" && typeof lon === "number"
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lon}`)}`
      : fallbackMapsUrl;

  return (
    <MapPlaceholderSection
      ctaLabel={tDest("mapViewOnMap", { area: resolvedArea })}
      mapHref={mapHref}
      imageAlt={tDest("mapAlt", { area: resolvedArea })}
    />
  );
};

export default DestinationsMapSection;
