"use client";

import { useTranslations } from "next-intl";

type AseeriCuisineBadgeVariant = "card" | "filter";

interface AseeriCuisineBadgeProps {
  variant?: AseeriCuisineBadgeVariant;
  className?: string;
}

function FilterStarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M6 1.5L7.18 4.32L10.2 4.56L8.1 6.48L8.72 9.48L6 8.1L3.28 9.48L3.9 6.48L1.8 4.56L4.82 4.32L6 1.5Z"
        fill="white"
      />
    </svg>
  );
}

function CardStarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M6.5 1.5L8.01 4.83L11.5 5.17L9.25 7.67L9.84 11.17L6.5 9.5L3.16 11.17L3.75 7.67L1.5 5.17L4.99 4.83L6.5 1.5Z"
        fill="url(#aseeri-card-star-gradient)"
      />
      <defs>
        <linearGradient
          id="aseeri-card-star-gradient"
          x1="10.4"
          y1="11.75"
          x2="2.24"
          y2="9.61"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FB4B37" />
          <stop offset="1" stopColor="#7300CD" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AseeriCuisineBadge({
  variant = "card",
  className = "",
}: AseeriCuisineBadgeProps) {
  const t = useTranslations("common");
  const label = t("cuisineAseeri");

  if (variant === "filter") {
    return (
      <span
        className={`inline-flex h-[22px] max-w-full shrink-0 items-center gap-1 rounded-lg bg-[linear-gradient(135deg,#FB4B37_0%,#7300CD_100%)] px-2 text-[10px] font-bold leading-none text-white shadow-[0px_1px_2px_0px_#0000000D] [unicode-bidi:isolate] ${className}`}
      >
        <span className="truncate">{label}</span>
        <FilterStarIcon />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-7 max-w-full shrink-0 items-center gap-1 text-[11px] font-bold leading-none text-[#7300CD] [unicode-bidi:isolate] ${className}`}
    >
      <span className="truncate">{label}</span>
      <CardStarIcon />
    </span>
  );
}
