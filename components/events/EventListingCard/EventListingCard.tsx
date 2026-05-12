"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import type { EventListingItem } from "../types";

const PLACEHOLDER = "/assets/experiences/experiences.png";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";
const ara = "var(--font-ara-hamah-1964), sans-serif";

function RatingStar() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 rounded-[1px]"
      aria-hidden
    >
      <path
        fill="#FACC15"
        d="M12 17.3L6.18 20.59L7.54 14.1L2.47 9.59L9.05 8.95L12 3L14.95 8.95L21.53 9.59L16.46 14.1L17.82 20.59L12 17.3Z"
      />
    </svg>
  );
}

function CurrencyIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M11.5901 9.25373C11.8042 8.79435 11.9458 8.29561 12 7.7727L8.47005 8.49922V7.10259L11.59 6.46098C11.8041 6.0016 11.9457 5.50286 11.9999 4.97995L8.46994 5.70585V0.683132C7.92905 0.977024 7.44868 1.36823 7.0582 1.82967V5.99633L5.64645 6.28671V0C5.10556 0.293789 4.62519 0.685094 4.2347 1.14654V6.57699L1.07592 7.22655C0.861779 7.68593 0.720124 8.18467 0.665789 8.70758L4.2347 7.97362V9.73243L0.409913 10.519C0.195776 10.9784 0.0542281 11.4771 0 12L4.00349 11.1767C4.32939 11.1111 4.6095 10.9246 4.79161 10.668L5.52582 9.61467V9.61446C5.60204 9.50548 5.64645 9.37408 5.64645 9.23256V7.68324L7.0582 7.39286V10.1861L11.59 9.25353L11.5901 9.25373Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ""}`}
      aria-hidden
    >
      <path
        d="M14.25 7.5C14.25 12.75 7.5 17.25 7.5 17.25C7.5 17.25 0.75 12.75 0.75 7.5C0.75 5.70979 1.46116 3.9929 2.72703 2.72703C3.9929 1.46116 5.70979 0.75 7.5 0.75C9.29021 0.75 11.0071 1.46116 12.273 2.72703C13.5388 3.9929 14.25 5.70979 14.25 7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.75C8.74264 9.75 9.75 8.74264 9.75 7.5C9.75 6.25736 8.74264 5.25 7.5 5.25C6.25736 5.25 5.25 6.25736 5.25 7.5C5.25 8.74264 6.25736 9.75 7.5 9.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ""}`}
      aria-hidden
    >
      <path
        d="M10.5 0.75V3.75M4.5 0.75V3.75M0.75 6.75H14.25M2.25 2.25H12.75C13.5784 2.25 14.25 2.92157 14.25 3.75V14.25C14.25 15.0784 13.5784 15.75 12.75 15.75H2.25C1.42157 15.75 0.75 15.0784 0.75 14.25V3.75C0.75 2.92157 1.42157 2.25 2.25 2.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ""}`}
      aria-hidden
    >
      <path
        d="M7.68975 14.4398C6.80333 14.4398 5.92558 14.2652 5.10664 13.9259C4.28769 13.5867 3.54357 13.0895 2.91678 12.4627C2.28998 11.8359 1.79278 11.0918 1.45356 10.2729C1.11434 9.45392 0.93975 8.57617 0.93975 7.68975C0.93975 6.80333 1.11434 5.92558 1.45356 5.10664C1.79278 4.28769 2.28998 3.54357 2.91678 2.91678C3.54357 2.28998 4.28769 1.79278 5.10664 1.45356C5.92558 1.11434 6.80333 0.93975 7.68975 0.93975C9.47996 0.93975 11.1968 1.65091 12.4627 2.91678C13.7286 4.18265 14.4398 5.89954 14.4398 7.68975C14.4398 9.47996 13.7286 11.1968 12.4627 12.4627C11.1968 13.7286 9.47996 14.4397 7.68975 14.4398ZM7.68975 12.9398C8.37919 12.9398 9.06188 12.804 9.69884 12.5401C10.3358 12.2763 10.9146 11.8896 11.4021 11.4021C11.8896 10.9146 12.2763 10.3358 12.5401 9.69884C12.804 9.06188 12.9398 8.37919 12.9398 7.68975C12.9398 7.00031 12.804 6.31762 12.5401 5.68066C12.2763 5.0437 11.8896 4.46495 11.4021 3.97744C10.9146 3.48993 10.3358 3.10322 9.69884 2.83938C9.06188 2.57555 8.37919 2.43975 7.68975 2.43975C6.29736 2.43975 4.96201 2.99287 3.97744 3.97744C2.99287 4.96201 2.43975 6.29736 2.43975 7.68975C2.43975 9.08214 2.99287 10.4175 3.97744 11.4021C4.96201 12.3866 6.29736 12.9397 7.68975 12.9398ZM8.43975 7.68975H10.6898V9.18975H6.93975V3.93975H8.43975V7.68975ZM0 2.65125L2.65125 0L3.7125 1.0605L1.05975 3.7125L0 2.65125ZM12.7275 0L15.3795 2.65125L14.319 3.7125L11.667 1.0605L12.7283 0H12.7275Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface EventListingCardProps {
  event: EventListingItem;
}

const EventListingCard = ({ event }: EventListingCardProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [imageIndex, setImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered) return;
    const id = window.setInterval(() => {
      setImageIndex((i) => (i + 1) % 3);
    }, 2000);
    return () => window.clearInterval(id);
  }, [hovered]);

  const onImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER;
  }, []);

  const ratingDisplay = `${Number(event.rating).toFixed(1)}/5`;
  const votesDisplay = `(${event.reviewsCount})`;
  const venue = event.venueLabel ?? event.title;

  const expandedPanel = (
    <div className={`flex flex-col gap-4 px-4 pb-4 pt-5 sm:pt-6 ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
      <h3 className={`w-full text-2xl font-bold leading-none text-foreground ${isRtl ? "text-right" : "text-left"}`} style={{ fontFamily: ara }}>
        {event.title}
      </h3>

      <div className="flex w-full gap-3 text-muted-foreground">
        <MapPinIcon className="shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1 text-right">
          <p className="text-sm font-bold leading-tight text-foreground" style={{ fontFamily: ara }}>
            {venue}
          </p>
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-0.5 block text-sm font-medium text-[#6027D2] underline ${isRtl ? "text-right" : "text-left"}`}
            style={{ fontFamily: ibm }}
          >
            {event.mapsLinkLabel}
          </a>
        </div>
      </div>

      <div className="flex w-full gap-3 text-muted-foreground">
        <CalendarIcon className="shrink-0 text-muted-foreground" />
        <div className={`min-w-0 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: ibm }}>
            {isRtl ? "التاريخ" : "Date"}
          </p>
          <p className="text-sm font-medium text-foreground" style={{ fontFamily: ibm }}>
            {event.dateRange}
          </p>
        </div>
      </div>

      <div className="flex w-full gap-3 text-muted-foreground">
        <ClockIcon className="shrink-0 text-muted-foreground" />
        <div className={`min-w-0 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: ibm }}>
            {isRtl ? "الوقت" : "Time"}
          </p>
          <p className="text-sm font-medium text-foreground" style={{ fontFamily: ibm }}>
            {event.timeRange}
          </p>
        </div>
      </div>

      <div className="flex w-full gap-3">
        <CurrencyIcon className="mt-0.5 shrink-0 text-foreground" />
        <div className={`min-w-0 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="text-xs text-muted-foreground" style={{ fontFamily: ibm }}>
            {isRtl ? "التذكرة" : "Ticket"}
          </p>
          <p className="text-sm font-medium text-foreground" style={{ fontFamily: ibm }}>
            {event.priceLabel}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="group/card relative z-0 mx-auto h-[357px] w-full max-w-[318px] justify-self-center hover:z-40 focus-within:z-40"
      dir={isRtl ? "rtl" : "ltr"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setImageIndex(0);
      }}
    >
      <article className="relative z-2 h-full w-full overflow-hidden rounded-[20px] border border-[#E5E5E5] bg-neutral-900 shadow-sm transition-shadow duration-300 group-hover/card:shadow-xl group-focus-within/card:shadow-xl">
        <div className="relative h-full w-full overflow-hidden">
          {event.images.map((src, i) => (
            <img
              key={`${event.id}-${i}`}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === imageIndex ? "opacity-100" : "opacity-0"
                }`}
              loading="lazy"
              onError={onImgError}
            />
          ))}
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10"
            aria-hidden
          />

          <div
            className={`absolute top-2 z-10 flex h-[29px] min-w-[89px] max-w-[89px] items-center justify-center gap-1 rounded-[50px] bg-[#00000080] p-[6px] ${isRtl ? "left-2" : "right-2"}`}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <RatingStar />
            <span
              className="min-w-0 truncate text-right text-[11px] font-medium leading-none text-white"
              style={{ fontFamily: ibm }}
            >
              {votesDisplay} {ratingDisplay}
            </span>
          </div>

          <div
            className={`absolute top-1 z-10 flex h-6 min-w-[35px] items-center justify-center rounded-[20px] bg-[#000000A6] px-1.5 text-[14px] font-bold leading-none text-white ${isRtl ? "right-2 text-right" : "left-2 text-left"}`}
            style={{ fontFamily: ara }}
          >
            {imageIndex + 1}/3
          </div>

          <div className="absolute inset-x-0 bottom-0 z-5 flex w-full flex-col items-stretch gap-3 p-4 pt-24 text-right transition-opacity duration-300 group-hover/card:pointer-events-none group-hover/card:opacity-0 group-focus-within/card:pointer-events-none group-focus-within/card:opacity-0">
            <h3 className="w-full text-right text-2xl font-bold leading-none text-white" style={{ fontFamily: ara }}>
              {event.title}
            </h3>
            <div className="flex w-full justify-start">
              <div
                className="inline-flex max-w-full items-center gap-1.5 rounded-[55px] bg-surface/85 px-2 py-1 text-right text-foreground"
                style={{ fontFamily: ara }}
              >
                <span className="text-right text-sm font-bold leading-none">{event.priceLabel}</span>
                <CurrencyIcon className="shrink-0 text-foreground" />
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch gap-3 text-right">
              <div className="flex w-full items-center gap-2 text-[#EAEAEA]">
                <MapPinIcon className="shrink-0" />
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1 text-right text-[14px] font-medium leading-none text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] hover:underline"
                  style={{ fontFamily: ibm }}
                >
                  {event.mapsLinkLabel}
                </a>
              </div>
              <div className="flex w-full items-center gap-2 text-[#EAEAEA]">
                <CalendarIcon className="shrink-0" />
                <span
                  className="min-w-0 flex-1 text-right text-[14px] font-medium leading-none text-white"
                  style={{ fontFamily: ibm }}
                >
                  {event.dateRange}
                </span>
              </div>
              <div className="flex w-full items-center gap-2 text-[#EAEAEA]">
                <ClockIcon className="shrink-0" />
                <span
                  className="min-w-0 flex-1 text-right text-[14px] font-medium leading-none text-white"
                  style={{ fontFamily: ibm }}
                >
                  {event.timeRange}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div
        className="pointer-events-none absolute inset-x-0 top-full z-1 -mt-4 max-h-0 origin-top -translate-y-1 overflow-hidden rounded-b-[20px] border-x border-b border-border bg-surface opacity-0 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.14)] transition-[max-height,opacity,transform] duration-300 ease-out group-hover/card:pointer-events-auto group-hover/card:max-h-[min(420px,70vh)] group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:pointer-events-auto group-focus-within/card:max-h-[min(420px,70vh)] group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100"
      >
        {expandedPanel}
      </div>
    </div>
  );
};

export default EventListingCard;
