"use client";

import { useLocale, useTranslations } from "next-intl";
import AttractionPointMap from "@/components/attractions/AttractionPointMap";
import MapPlaceholderSection from "@/components/MapPlaceholderSection";

interface AttractionsMapSectionProps {
  mapHref?: string;
  ctaLabel?: string;
  imageAlt?: string;
  /** When both are set (and valid), a Mapbox map is shown instead of the static image. */
  latitude?: number | null;
  longitude?: number | null;
}

function hasValidCoordinates(
  latitude?: number | null,
  longitude?: number | null,
): boolean {
  if (latitude == null || longitude == null) return false;
  const lat = Number(latitude);
  const lng = Number(longitude);
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180
  );
}

const AttractionsMapSection = ({
  mapHref: mapHrefProp,
  ctaLabel: ctaLabelProp,
  imageAlt: imageAltProp,
  latitude,
  longitude,
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

  if (hasValidCoordinates(latitude, longitude)) {
    return (
      <AttractionPointMap
        latitude={Number(latitude)}
        longitude={Number(longitude)}
        mapHref={mapHref}
        ctaLabel={ctaLabelProp ?? t("mapPalacesCta")}
        imageAlt={imageAltProp ?? t("mapPalacesAlt")}
      />
    );
  }

  return (
    <MapPlaceholderSection
      ctaLabel={ctaLabelProp ?? t("mapPalacesCta")}
      mapHref={mapHref}
      imageAlt={imageAltProp ?? t("mapPalacesAlt")}
    />
  );
};

export default AttractionsMapSection;
