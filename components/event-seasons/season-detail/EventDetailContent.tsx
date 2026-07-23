import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  CalendarIcon,
  ClockIcon,
  CurrencyIcon,
  KidFriendlyIcon,
  MapPinIcon,
} from "@/components/events/EventListingCard/icons";
import type { SeasonDetail, SeasonDetailEvent } from "../types";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface EventDetailContentProps {
  season: SeasonDetail;
  event: SeasonDetailEvent;
  description: string;
  categoryLabels: string[];
}

function CategoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M2.25 5.25h13.5M2.25 9h13.5M2.25 12.75h8.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full items-start gap-3 text-start">
      <span className="mt-0.5 shrink-0 text-primary">{icon}</span>
      <div className="min-w-0 flex-1">
        <p
          className="mb-1 text-[14px] font-medium leading-none text-muted-foreground"
          style={{ fontFamily: ibm }}
        >
          {label}
        </p>
        <div
          className="text-[18px] font-bold leading-snug text-foreground sm:text-[20px]"
          style={{ fontFamily: ara }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default async function EventDetailContent({
  season,
  event,
  description,
  categoryLabels,
}: EventDetailContentProps) {
  const t = await getTranslations("eventSeasons");
  const listing = event.listing;
  const hasPrice =
    (listing.priceLabel || "").trim() !== "" &&
    !["Not specified", "غير محدد"].includes((listing.priceLabel || "").trim());
  const hasTime =
    (listing.timeRange || "").trim() !== "" &&
    !["Not specified", "غير محدد"].includes((listing.timeRange || "").trim());

  return (
    <section className="mx-auto w-full max-w-[960px] px-4 py-12 sm:px-6 md:px-8 md:py-16">
      <div className="flex w-full flex-col items-stretch gap-10">
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <h2
            className="text-[clamp(1.75rem,5vw,48px)] font-bold leading-none text-primary"
            style={{ fontFamily: ara }}
          >
            {t("eventAboutTitle")}
          </h2>
          {description ? (
            <p
              className="max-w-[720px] text-center text-[clamp(1rem,2.5vw,22px)] font-bold leading-relaxed text-foreground"
              style={{ fontFamily: ara }}
            >
              {description}
            </p>
          ) : (
            <p
              className="text-[18px] text-muted-foreground"
              style={{ fontFamily: ibm }}
            >
              {t("eventNoDescription")}
            </p>
          )}
        </div>

        <div className="grid w-full grid-cols-1 gap-8 border-y border-border py-10 sm:grid-cols-2">
          {categoryLabels.length > 0 ? (
            <DetailRow icon={<CategoryIcon />} label={t("eventCategory")}>
              <div className="flex flex-wrap gap-2">
                {categoryLabels.map((label) => (
                  <span
                    key={label}
                    className="inline-flex h-[33px] items-center rounded-[20px] border border-primary/25 bg-primary/10 px-3 text-[16px] font-bold text-primary"
                    style={{ fontFamily: ara }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </DetailRow>
          ) : null}

          <DetailRow icon={<CalendarIcon />} label={t("eventDates")}>
            {listing.dateRange}
          </DetailRow>

          {hasTime ? (
            <DetailRow icon={<ClockIcon />} label={t("eventTime")}>
              {listing.timeRange}
            </DetailRow>
          ) : null}

          {hasPrice ? (
            <DetailRow icon={<CurrencyIcon />} label={t("eventPrice")}>
              {listing.priceLabel}
            </DetailRow>
          ) : null}

          <DetailRow icon={<MapPinIcon />} label={t("eventLocation")}>
            <a
              href={listing.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-primary/40 underline-offset-4 transition-opacity hover:opacity-80"
            >
              {listing.mapsLinkLabel || listing.locationLine}
            </a>
          </DetailRow>

          {listing.isKidFriendly ? (
            <DetailRow icon={<KidFriendlyIcon />} label={t("eventAudience")}>
              <span className="text-[#C45A8A]">{t("kidFriendly")}</span>
            </DetailRow>
          ) : null}
        </div>

        <div className="flex justify-center">
          <Link
            href={`/event-seasons/${season.id}`}
            className="inline-flex h-[48px] items-center justify-center rounded-[20px] border border-primary bg-primary px-8 text-[18px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
            style={{ fontFamily: ara }}
          >
            {t("backToSeason")}
          </Link>
        </div>
      </div>
    </section>
  );
}
