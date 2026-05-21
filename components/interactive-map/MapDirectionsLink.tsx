import type { MouseEvent } from "react";
import { MAP_DIRECTIONS_ICON_SVG } from "./mapDirectionsIcon";

type MapDirectionsLinkProps = {
  href: string;
  label: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
};

export function MapDirectionsLink({
  href,
  label,
  onClick,
  className = "",
}: MapDirectionsLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`map-directions-link mt-3 inline-flex items-center gap-2.5 text-[16px] font-bold text-secondary no-underline transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${className}`}
    >
      <span
        className="map-directions-link-icon inline-flex shrink-0 items-center justify-center text-secondary"
        dangerouslySetInnerHTML={{ __html: MAP_DIRECTIONS_ICON_SVG }}
      />
      <span>{label}</span>
    </a>
  );
}
