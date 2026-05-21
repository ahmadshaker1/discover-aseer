type MapDirectionsIconProps = {
  className?: string;
};

export function MapDirectionsIcon({ className = "" }: MapDirectionsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`map-directions-icon-svg shrink-0 size-6 ${className}`}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M15.708 8.33c.943.935-.566 8.533-2.114 8.667c-1.298.112-1.703-2.45-1.976-3.26c-.27-.802-.57-1.09-1.365-1.353c-2.019-.668-3.028-1.002-3.228-1.53c-.53-1.4 7.479-3.717 8.683-2.523" />
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" />
      </g>
    </svg>
  );
}
