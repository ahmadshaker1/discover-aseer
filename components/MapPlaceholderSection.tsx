export interface MapPlaceholderSectionProps {
  ctaLabel: string;
  mapHref: string;
  imageAlt?: string;
}

const PLACEHOLDER_SRC = "/assets/attractions/map-placeholder-abha.png";
const ara = "var(--font-ara-hamah-1964), sans-serif";

const MapPlaceholderSection = ({
  ctaLabel,
  mapHref,
  imageAlt = "معاينة خريطة",
}: MapPlaceholderSectionProps) => {
  return (
    <section className="w-full bg-background py-12 text-foreground">
      <div className="mx-auto w-full max-w-[1437px] px-4 sm:px-6">
        <div className="relative h-[468.7745056152344px] w-full max-w-[1437px] shrink-0 overflow-hidden self-center">
          <img
            src={PLACEHOLDER_SRC}
            alt={imageAlt}
            className="h-full w-full object-cover object-center"
          />
          <a
            href={mapHref}
            target="_blank"
            rel="noreferrer"
            className="absolute top-1/2 left-1/2 z-10 inline-flex h-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-[10px] overflow-hidden text-ellipsis whitespace-nowrap rounded-[55px] border border-solid border-white/33 bg-primary px-4 py-[10px] text-center text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90"
            style={{
              fontFamily: ara,
              width: `min(100% - 2rem, ${ctaWidthPx}px)`,
            }}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default MapPlaceholderSection;
