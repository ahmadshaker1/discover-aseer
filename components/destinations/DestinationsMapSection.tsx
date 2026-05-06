import MapPlaceholderSection from "@/components/MapPlaceholderSection";

const ABHA_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("أبها، السعودية");

interface DestinationsMapSectionProps {
  areaLabel?: string;
  lat?: number;
  lon?: number;
}

const DestinationsMapSection = ({ areaLabel = "أبها", lat, lon }: DestinationsMapSectionProps) => {
  const mapHref =
    typeof lat === "number" && typeof lon === "number"
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lon}`)}`
      : ABHA_MAPS_URL;

  return (
    <MapPlaceholderSection
      ctaLabel={`مشاهدة ${areaLabel} على الخريطة`}
      ctaWidthPx={220}
      mapHref={mapHref}
      imageAlt={`خريطة ${areaLabel}`}
    />
  );
};

export default DestinationsMapSection;
