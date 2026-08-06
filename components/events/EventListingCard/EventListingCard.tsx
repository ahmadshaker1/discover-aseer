"use client";

import { useCallback, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { EventListingItem } from "../types";
import {
  CalendarIcon,
  CardImageNavNext,
  CardImageNavPrev,
  ClockIcon,
  CurrencyIcon,
  KidFriendlyIcon,
  MapPinIcon,
} from "./icons";

const PLACEHOLDER = "/assets/experiences/experiences.png";

interface EventListingCardProps {
  event: EventListingItem;
  /** When set, the card body navigates here (maps/image controls stay clickable). */
  detailHref?: string;
}

const EventListingCard = ({ event, detailHref }: EventListingCardProps) => {
  const locale = useLocale();
  const t = useTranslations("eventSeasons");
  const isArabic = locale === "ar";
  const imageCount = event.images.length;
  const hasPrice =
    (event.priceLabel || "").trim() !== "" &&
    !["Not specified", "غير محدد"].includes((event.priceLabel || "").trim());

  const [imageIndex, setImageIndex] = useState(0);
  const safeIndex = Math.min(imageIndex, Math.max(0, imageCount - 1));
  const canGoPrev = safeIndex > 0;
  const canGoNext = safeIndex < imageCount - 1;

  const onImgError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = PLACEHOLDER;
    },
    [],
  );

  const statusCorner = isArabic ? "left-2" : "right-2";
  const counterCorner = isArabic ? "right-2" : "left-2";

  return (
    <div className="relative z-0 mx-auto h-[440px] w-full max-w-none justify-self-stretch">
      <article
        className={`relative h-full w-full overflow-hidden rounded-[20px] border border-border bg-neutral-900 shadow-sm ${
          detailHref ? "transition-opacity hover:opacity-[0.98]" : ""
        }`}
      >
        <div className="relative h-full w-full overflow-hidden">
          {event.images.map((src, i) => (
            <img
              key={`${event.id}-${i}-${src}`}
              src={src}
              alt={i === safeIndex ? event.title : ""}
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                i === safeIndex ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onError={onImgError}
            />
          ))}
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10"
            aria-hidden
          />
          {detailHref ? (
            <Link
              href={detailHref}
              className="absolute inset-0 z-[1]"
              aria-label={t("openEventDetails")}
            />
          ) : null}

          {event.isOver ? (
            <div
              className={`pointer-events-none absolute top-2 z-10 flex h-[29px] min-w-[89px] items-center justify-center rounded-[50px] bg-[#00000080] px-3 py-[6px] ${statusCorner}`}
            >
              <span
                className="min-w-0 truncate text-start text-[11px] font-medium leading-none text-white"
              >
                {t("eventOver")}
              </span>
            </div>
          ) : null}

          <div
            className={`pointer-events-none absolute top-1 z-10 flex h-6 min-w-[35px] items-center justify-center rounded-[20px] bg-[#000000A6] px-1.5 text-[14px] font-bold leading-none text-white ${counterCorner}`}
          >
            {safeIndex + 1}/{imageCount}
          </div>

          {imageCount > 1 ? (
            <div
              dir={isArabic ? "rtl" : "ltr"}
              className="absolute inset-x-0 top-1/2 z-20 mx-auto flex h-8 w-full -translate-y-1/2 items-center justify-between px-4"
            >
              <button
                type="button"
                onClick={() => setImageIndex((i) => Math.max(0, i - 1))}
                disabled={!canGoPrev}
                className="relative z-20 shrink-0 opacity-50 transition enabled:cursor-pointer enabled:opacity-100 disabled:cursor-not-allowed"
                aria-label={t("imagePrev")}
              >
                <CardImageNavPrev />
              </button>
              <button
                type="button"
                onClick={() =>
                  setImageIndex((i) => Math.min(imageCount - 1, i + 1))
                }
                disabled={!canGoNext}
                className="relative z-20 shrink-0 opacity-50 transition enabled:cursor-pointer enabled:opacity-100 disabled:cursor-not-allowed"
                aria-label={t("imageNext")}
              >
                <CardImageNavNext />
              </button>
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-5 flex w-full flex-col items-stretch gap-3 p-4 pt-24 text-start">
            {event.isKidFriendly ? (
              <div className="flex w-full items-center justify-start gap-1">
                <KidFriendlyIcon />
                <span
                  className="text-[10px] font-medium leading-none text-[#FCAED2]"
                >
                  {t("kidFriendly")}
                </span>
              </div>
            ) : null}
            <h3
              className="w-full text-start text-2xl font-bold leading-none text-white"
            >
              {event.title}
            </h3>
            {hasPrice ? (
              <div className="flex w-full justify-start">
                <div
                  className="inline-flex max-w-full items-center gap-1.5 rounded-[55px] bg-surface/85 px-2 py-1 text-start text-foreground"
                >
                  <span className="text-start text-sm font-bold leading-none">
                    {event.priceLabel}
                  </span>
                  {!event.isFree ? (
                    <CurrencyIcon className="shrink-0 text-foreground" />
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="flex w-full flex-col items-stretch gap-3 text-start">
              <div className="pointer-events-auto relative z-20 flex w-full items-center gap-2 text-[#EAEAEA]">
                <MapPinIcon />
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1 text-start text-[14px] font-medium leading-none text-white underline decoration-white underline-offset-2 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {event.mapsLinkLabel}
                </a>
              </div>
              <div className="flex w-full items-center gap-2 text-[#EAEAEA]">
                <CalendarIcon />
                <span
                  className="min-w-0 flex-1 text-start text-[14px] font-medium leading-none text-white"
                >
                  {event.dateRange}
                </span>
              </div>
              <div className="flex w-full items-center gap-2 text-[#EAEAEA]">
                <ClockIcon />
                <span
                  className="min-w-0 flex-1 text-start text-[14px] font-medium leading-none text-white"
                >
                  {event.timeRange}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EventListingCard;
