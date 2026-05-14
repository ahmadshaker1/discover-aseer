"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

const ara = "var(--font-ara-hamah-1964), sans-serif";

export interface CuisineGridCardData {
  id: string;
  slug: string;
  title: string;
  image: string;
}

interface CuisineGridCardProps {
  card: CuisineGridCardData;
  sizes?: string;
}

const CuisineGridCard = ({ card, sizes = "(max-width: 1024px) 50vw, 282px" }: CuisineGridCardProps) => {
  return (
    <Link
      href={`/aseer-cuisine/${card.slug}`}
      className="group relative block h-[305px] w-full max-w-[282px] justify-self-center overflow-hidden rounded-[10px] shadow-[0px_4.28px_3.37px_0px_#29489803,0px_8.72px_6.97px_0px_#29489805,0px_21.4px_13.91px_0px_#29489806] transition-transform duration-200 hover:scale-[1.02]"
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes={sizes}
      />
      <div className="absolute inset-x-0 bottom-0 h-[51px] rounded-b-[10px] bg-[linear-gradient(179.54deg,rgba(0,0,0,0)_0.39%,#000000_99.6%)] px-5 py-4">
        <p
          className="line-clamp-1 text-start text-[24px] font-bold leading-[119%] text-white"
          style={{ fontFamily: ara }}
        >
          {card.title}
        </p>
      </div>
    </Link>
  );
};

export default CuisineGridCard;
