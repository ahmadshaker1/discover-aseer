import MapPlaceholderSection from "@/components/MapPlaceholderSection";

const ABHA_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("أبها، السعودية");

const DestinationsMapSection = () => (
  <MapPlaceholderSection
    ctaLabel="مشاهدة أبها على الخريطة"
    ctaWidthPx={187}
    mapHref={ABHA_MAPS_URL}
    imageAlt="خريطة أبها"
  />
);

export default DestinationsMapSection;
