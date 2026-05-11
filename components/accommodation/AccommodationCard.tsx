"use client";

import { useTranslations } from "next-intl";
import type { Accommodation } from "./data";
import { accommodationMapsHref } from "./data";

const LOCATION_PIN = "/assets/accommodation/hotel-location-pin.svg";
const EXCEPTIONAL_NAME_BADGE = "/assets/accommodation/exceptional-name-badge.svg";

interface AccommodationCardProps {
  accommodation: Accommodation;
  layout?: "grid" | "carousel";
  /** When true, show the exceptional badge beside the title (e.g. all cards in the exceptional strip). */
  showExceptionalTag?: boolean;
}

const AccommodationCard = ({
  accommodation,
  layout = "grid",
  showExceptionalTag = false,
}: AccommodationCardProps) => {
  const t = useTranslations("common");
  const mapsHref = accommodationMapsHref(accommodation);
  const showBadge = showExceptionalTag || Boolean(accommodation.exceptional);
  const widthClass =
    layout === "carousel"
      ? "w-[min(300px,calc(100vw-2.5rem))] shrink-0"
      : "w-full min-w-0";

  return (
    <article
      className={`overflow-hidden rounded-[16px] border border-border bg-surface text-foreground shadow-sm ${widthClass}`}
      dir="rtl"
      lang="ar"
    >
      <div className="relative h-[190px] w-full overflow-hidden">
        <img
          src={accommodation.image}
          alt={accommodation.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/0 to-black/10" />
        <div className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[12px] text-white">
          ({accommodation.reviewsCount}) {accommodation.rating.toFixed(1)}/5{" "}
          <span className="text-yellow-300">★</span>
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[12px] text-white">
          {accommodation.city}
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h3
          dir="rtl"
          className="w-full min-w-0 text-right text-[28px] font-bold leading-tight text-foreground [unicode-bidi:plaintext]"
        >
          {accommodation.name}
          {showBadge ? (
            <img
              src={EXCEPTIONAL_NAME_BADGE}
              alt=""
              width={55}
              height={28}
              className="ms-2 inline-block h-7 w-[55px] shrink-0 align-middle object-contain [unicode-bidi:isolate]"
            />
          ) : null}
        </h3>
        <p
          dir="rtl"
          className="line-clamp-3 text-right text-[14px] leading-6 text-muted-foreground [unicode-bidi:plaintext]"
        >
          {accommodation.description}
        </p>
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          dir="rtl"
          className="mt-3 inline-flex w-full flex-row items-center justify-center gap-2 rounded-full bg-primary/15 px-4 py-2.5 text-[16px] font-bold text-primary transition-colors hover:bg-primary/25"
        >
          <span className="text-right">{t("location")}</span>
          <img src={LOCATION_PIN} alt="" width={15} height={15} className="shrink-0" />
        </a>
      </div>
    </article>
  );
};

export default AccommodationCard;
