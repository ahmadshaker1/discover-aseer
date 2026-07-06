"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { CuisineRestaurantCardData } from "./cuisineRestaurantCardData";
import {
  CardCurrencyIcon,
  CardPersonIcon,
  CardPinIcon,
  CardRatingStar,
  CardUtensilIcon,
} from "./Icons";

export type { CuisineRestaurantCardData } from "./cuisineRestaurantCardData";
export { mapRestaurantToCuisineCard } from "./cuisineRestaurantCardData";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

function formatPriceBand(card: CuisineRestaurantCardData): string {
  if (card.priceBand?.trim()) return card.priceBand.trim();
  if (card.priceRange?.trim()) return card.priceRange.trim();
  return "50-100";
}

interface CuisineRestaurantCardProps {
  card: CuisineRestaurantCardData;
  className?: string;
}

const CuisineRestaurantCard = ({
  card,
  className = "",
}: CuisineRestaurantCardProps) => {
  return (
    <Link
      href="/restaurants"
      className={`group flex w-[282px] flex-col overflow-hidden rounded-2xl border border-border bg-surface text-start transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl ${className}`}
    >
      <div className="relative h-[190px] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="282px"
          loading="lazy"
        />
        {/* <div
          className="absolute top-3 end-3 z-10 flex h-[29px] min-w-[89px] max-w-[89px] items-center justify-center gap-1 rounded-[50px] bg-[#00000080] p-[6px]"
          dir="ltr"
        >
          <CardRatingStar />
          <span
            className="min-w-0 truncate text-start text-[11px] font-medium leading-none text-white"
            style={{ fontFamily: ibm }}
          >
            ({card.reviewsCount}) {Number(card.rating).toFixed(1)}/5
          </span>
        </div> */}
      </div>

      <div className="flex h-[115px] flex-col justify-between gap-2 px-4 py-3 sm:px-5 sm:py-4">
        <h3
          className="line-clamp-1 text-[24px] font-bold leading-[119%] text-foreground"
          style={{ fontFamily: ara }}
        >
          {card.title}
        </h3>

        <div className="flex w-full items-center justify-start gap-1.5">
          <CardPinIcon />
          <span
            className="min-w-0 flex-1 truncate text-[10px] font-bold leading-none text-foreground"
            style={{ fontFamily: ibm }}
          >
            {card.location}
          </span>
        </div>

        <div className="flex w-full flex-wrap items-center justify-start gap-3">
          <div className="flex items-center justify-start gap-1">
            <CardUtensilIcon />
            <span
              className="text-xs font-bold leading-none text-foreground"
              style={{ fontFamily: ibm }}
            >
              {card.cuisineType}
            </span>
          </div>
          <CardPersonIcon />
          <div className="flex items-center justify-start gap-1">
            <span
              className="text-xs font-bold leading-none text-foreground"
              style={{ fontFamily: ibm }}
            >
              {formatPriceBand(card)}
            </span>
            <CardCurrencyIcon />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CuisineRestaurantCard;
