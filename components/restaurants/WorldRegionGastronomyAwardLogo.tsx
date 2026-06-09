type WorldRegionGastronomyAwardLogoProps = {
  className?: string;
};

const VIEWBOX_WIDTH = 212;
const VIEWBOX_HEIGHT = 150;

const WorldRegionGastronomyAwardLogo = ({
  className = "h-auto w-full max-w-[377px]",
}: WorldRegionGastronomyAwardLogoProps) => (
  <svg
    viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
    role="img"
    aria-label="World Region of Gastronomy — Aseer Awarded 2024"
  >
    <image
      href="/assets/restaurant/world-region-gastronomy-award.png"
      width={VIEWBOX_WIDTH}
      height={VIEWBOX_HEIGHT}
      preserveAspectRatio="xMidYMid meet"
    />
  </svg>
);

export default WorldRegionGastronomyAwardLogo;
