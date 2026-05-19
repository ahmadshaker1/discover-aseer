type MapListingsCloseIconProps = {
  className?: string;
};

/** Close control for the mobile listings drawer. */
export function MapListingsCloseIcon({ className }: MapListingsCloseIconProps) {
  return (
    <svg
      width={29}
      height={30}
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect
        y={0.5}
        width={29}
        height={29}
        rx={14.5}
        className="fill-muted"
      />
      <path
        d="M20 10L9.5 20.5"
        className="stroke-foreground"
        strokeWidth={2}
      />
      <path
        d="M9.5 10L20 20.5"
        className="stroke-foreground"
        strokeWidth={2}
      />
    </svg>
  );
}
