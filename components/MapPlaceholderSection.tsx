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
          <img src={PLACEHOLDER_SRC} alt={imageAlt} className="h-full w-full object-cover object-center" />
          <div className="pointer-events-none absolute inset-x-4 top-1/2 z-10 flex -translate-y-1/2 justify-center">
            <a
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto inline-flex max-w-full items-center justify-center gap-2 whitespace-normal rounded-[55px] border border-solid border-[#FFFFFF54] bg-[#6027D2] px-6 py-3 text-center text-[20px] font-bold leading-[119%] text-white transition-opacity hover:opacity-90 sm:px-10 sm:py-[14px]"
              style={{ fontFamily: ara }}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPlaceholderSection;
