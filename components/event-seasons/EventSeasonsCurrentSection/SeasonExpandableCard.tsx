"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SeasonListingItem } from "../types";
import { DetailsArrowIcon } from "./icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface SeasonExpandableCardProps {
  season: SeasonListingItem;
  isActive: boolean;
  onHover: () => void;
}

export default function SeasonExpandableCard({
  season,
  isActive,
  onHover,
}: SeasonExpandableCardProps) {
  const tCommon = useTranslations("common");

  return (
    <article
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onHover}
      tabIndex={0}
      className={`group relative h-[420px] shrink-0 overflow-hidden rounded-xl p-5 outline-none transition-[width] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-[480px] lg:h-[552px] ${isActive
        ? "w-[min(100%,536px)] lg:w-[536px]"
        : "w-[min(85vw,359.5px)] lg:w-[359.5px]"
        }`}
    >
      <Image
        src={season.imageUrl}
        alt={season.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={isActive ? "536px" : "360px"}
        unoptimized={season.imageUrl.startsWith("http")}
      />

      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col justify-end gap-8 lg:gap-12">
        <div
          className={`flex flex-col gap-[19px] transition-opacity duration-300 ${isActive ? "max-w-[285px]" : "max-w-full"
            }`}
        >
          {season.isHappeningNow ? (
            <span
              className="inline-flex w-fit items-center justify-center rounded-[30px] bg-[#00000073] px-[18px] py-1.5 text-[18px] font-medium leading-none text-white"
              style={{ fontFamily: ibm }}
            >
              {tCommon("happeningNow")}
            </span>
          ) : null}

          <h3
            className={`font-bold leading-none text-white transition-all duration-500 ${isActive
              ? "text-[clamp(1.5rem,4vw,48px)]"
              : "line-clamp-3 text-[clamp(1.25rem,3vw,32px)]"
              }`}
            style={{ fontFamily: ara }}
          >
            {season.title}
          </h3>

          <Link
            href={`/event-seasons/${season.id}`}
            className="inline-flex w-fit items-center gap-3 rounded-[86px] border border-[#28004829] bg-primary px-4 py-2.5 text-[20px] font-bold leading-[180%] text-primary-foreground transition-opacity hover:opacity-90"
            style={{ fontFamily: ara }}
          >

            <span>{tCommon("viewDetails")}</span>
            <span className="inline-flex ltr:rotate-180">
              <DetailsArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
