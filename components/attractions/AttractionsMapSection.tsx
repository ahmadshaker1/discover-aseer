"use client";

import DestinationPreviewMap from "@/components/destinations/DestinationPreviewMap";
import { DEFAULT_ATTRACTION_MAP_CENTER } from "@/components/landmarks/data";
import type { ResolvedLandmarkMap } from "@/components/landmarks/data";
import MapPlaceholderSection from "@/components/MapPlaceholderSection";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";


interface AttractionsMapSectionProps {
  areaLabel: string;
  mapTarget: ResolvedLandmarkMap;
}

const AttractionsMapSection = ({
  areaLabel,
  mapTarget,
}: AttractionsMapSectionProps) => {
  const t = useTranslations("attractionsPage");
  const tDest = useTranslations("destinations");

  if (mapTarget?.kind === "external") {
    return (
      <MapPlaceholderSection
        ctaLabel={tDest("mapViewOnMap", { area: areaLabel })}
        ctaWidthPx={266}
        mapHref={mapTarget.href}
        imageAlt={t("mapPalacesAlt")}
      />
    );
  }

  const mapLat =
    mapTarget?.kind === "interactive"
      ? mapTarget.lat
      : DEFAULT_ATTRACTION_MAP_CENTER.lat;
  const mapLon =
    mapTarget?.kind === "interactive"
      ? mapTarget.lon
      : DEFAULT_ATTRACTION_MAP_CENTER.lon;

  const mapHref = {
    pathname: "/interactive-map" as const,
    query: {
      lat: String(mapLat),
      lon: String(mapLon),
      title: areaLabel,
    },
  };

  return (
    <section className="w-full bg-background py-12 text-foreground">
      <div className="mx-auto w-full max-w-[1437px] px-4 sm:px-6">
        <div className="relative h-[468.7745056152344px] w-full max-w-[1437px] shrink-0 overflow-hidden self-center rounded-[10px]">
          <DestinationPreviewMap lat={mapLat} lon={mapLon} title={areaLabel} />
          <Link
            href={mapHref}
            className="absolute top-1/2 left-1/2 z-10 inline-flex h-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[10px] overflow-hidden text-ellipsis whitespace-nowrap rounded-[55px] border border-solid border-white/33 bg-primary px-4 py-[10px] text-center text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90"
            style={{
              width: "min(100% - 2rem, 266px)",
            }}
          >
            {tDest("mapViewOnMap", { area: areaLabel })}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AttractionsMapSection;
