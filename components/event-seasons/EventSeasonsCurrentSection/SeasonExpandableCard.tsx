"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SeasonListingItem } from "../types";
import { DetailsArrowIcon } from "./icons";


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
      className={`group relative aspect-video shrink-0 overflow-hidden rounded-xl p-5 outline-none transition-[width] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        isActive
          ? "w-[min(100%,854px)] lg:w-[854px]"
          : "w-[min(85vw,480px)] lg:w-[480px]"
      }`}
    >
      <Image
        src={season.imageUrl}
        alt={season.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={isActive ? "854px" : "480px"}
        unoptimized={season.imageUrl.startsWith("http")}
      />

      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col justify-end gap-4 sm:gap-6">
        <div
          className={`flex flex-col gap-3 transition-opacity duration-300 sm:gap-4 ${
            isActive ? "max-w-[420px]" : "max-w-full"
          }`}
        >
          {season.isHappeningNow ? (
            <span
              className="inline-flex w-fit items-center justify-center rounded-[30px] bg-[#00000073] px-[18px] py-1.5 text-[16px] font-medium leading-none text-white sm:text-[18px]"
            >
              {tCommon("happeningNow")}
            </span>
          ) : null}

          <h3
            className={`font-bold leading-none text-white transition-all duration-500 ${
              isActive
                ? "text-[clamp(1.5rem,3.5vw,40px)]"
                : "line-clamp-2 text-[clamp(1.15rem,2.5vw,28px)]"
            }`}
          >
            {season.title}
          </h3>

          <Link
            href={`/event-seasons/${season.id}`}
            className="inline-flex w-fit items-center gap-3 rounded-[86px] border border-[#28004829] bg-primary px-4 py-2.5 text-[18px] font-bold leading-[180%] text-primary-foreground transition-opacity hover:opacity-90 sm:text-[20px]"
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
