import MapPlaceholderSection from "@/components/MapPlaceholderSection";

const PALACES_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("قصور آل أبو سراح");

const AttractionsMapSection = () => (
  <MapPlaceholderSection
    ctaLabel="مشاهدة قصور آل أبو سراح على الخريطة"
    ctaWidthPx={266}
    mapHref={PALACES_MAPS_URL}
    imageAlt="خريطة قصور آل أبو سراح"
  />
);

export default AttractionsMapSection;
