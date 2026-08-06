"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PreviousSeasonItem } from "../types";
import { DetailsChevronIcon } from "./icons";


interface PreviousSeasonEventCardProps {
  season: PreviousSeasonItem;
}

export default function PreviousSeasonEventCard({ season }: PreviousSeasonEventCardProps) {
  const t = useTranslations("eventSeasons");

  return (
    <article className="flex h-[388px] w-[min(85vw,387px)] shrink-0 flex-col gap-[9px] overflow-hidden rounded-[20px] border border-border bg-surface">
      <div className="relative h-[255px] shrink-0 px-[14px] pt-4">
        <div className="relative h-full w-full overflow-hidden rounded-t-[20px]">
          <Image
            src={season.imageUrl}
            alt={season.title}
            fill
            className="object-cover"
            sizes="387px"
            unoptimized={season.imageUrl.startsWith("http")}
          />

          <span
            className="absolute top-3 end-3 rounded-[20px] bg-[#7300CD]/65 px-2.5 py-2.5 text-[16px] font-bold leading-none text-white backdrop-blur-md ltr:end-auto ltr:right-3 dark:bg-primary/70"
          >
            {season.dateRange}
          </span>
        </div>
      </div>

      <div className="flex min-h-[124px] flex-1 flex-col items-start gap-4 px-4 pb-4 pt-0 text-start">
        <h3
          className="w-full line-clamp-2 text-[clamp(1.5rem,4vw,35px)] font-bold leading-none text-foreground"
        >
          {season.title}
        </h3>

        <Link
          href={`/event-seasons/${season.id}`}
          className="inline-flex h-11 w-fit max-w-full shrink-0 items-center justify-start gap-2.5 rounded-[86px] py-2.5 text-[25px] font-bold leading-none text-primary transition-opacity hover:opacity-80"
        >
          <span>{t("details")}</span>
          <DetailsChevronIcon className="text-primary ltr:rotate-180" />
        </Link>
      </div>
    </article>
  );
}
