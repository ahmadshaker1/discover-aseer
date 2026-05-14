"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { CuisineGridCardData } from "./CuisineGridCard";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface AseerCuisineFlavorCard extends CuisineGridCardData {}

export interface AseerCuisineLocalFlavorsSectionData {
  title: string;
  subtitle: string;
  cards: AseerCuisineFlavorCard[];
  ctaLabel: string;
  ctaHref: string;
}

interface AseerCuisineLocalFlavorsSectionProps {
  data: AseerCuisineLocalFlavorsSectionData;
}

function FlavorCard({
  card,
  className,
  sizes,
}: {
  card: AseerCuisineFlavorCard;
  className: string;
  sizes: string;
}) {
  return (
    <Link
      href={`/aseer-cuisine/${card.slug}`}
      className={`group relative block overflow-hidden rounded-[10px] shadow-[0px_4.28px_3.37px_0px_#29489803,0px_8.72px_6.97px_0px_#29489805,0px_21.4px_13.91px_0px_#29489806] transition-transform duration-200 hover:scale-[1.02] ${className}`}
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
}

const AseerCuisineLocalFlavorsSection = ({ data }: AseerCuisineLocalFlavorsSectionProps) => {
  const [leftTall, topLeft, topRight, bottomWide] = data.cards;

  return (
    <section className="mx-auto w-full max-w-[1440px] py-8 text-foreground">
      <div className="flex w-full flex-col gap-8">
        <div className="px-4 sm:px-8 xl:px-[120px]">
          <div className="mx-auto flex h-[116px] w-full max-w-[704px] flex-col items-center gap-3 text-center">
            <h2
              className="w-full text-center text-[64px] font-bold leading-[119%] text-foreground"
              style={{ fontFamily: ara }}
            >
              {data.title}
            </h2>
            <p
              className="w-full text-center text-[15px] font-light leading-[119%] text-muted-foreground"
              style={{ fontFamily: ibm }}
            >
              {data.subtitle}
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-8 md:px-[60px]">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 lg:h-[632px] lg:flex-row-reverse">
            {leftTall ? (
              <FlavorCard
                card={leftTall}
                className="h-[320px] w-full lg:h-[632px] lg:w-[522px]"
                sizes="(max-width: 1024px) 100vw, 522px"
              />
            ) : null}

            <div className="flex w-full flex-col gap-[22px] lg:h-[632px] lg:w-[774px]">
              <div className="grid h-[305px] w-full grid-cols-1 gap-6 sm:grid-cols-2">
                {topLeft ? (
                  <FlavorCard
                    card={topLeft}
                    className="h-[305px] w-full"
                    sizes="(max-width: 1024px) 100vw, 375px"
                  />
                ) : null}
                {topRight ? (
                  <FlavorCard
                    card={topRight}
                    className="h-[305px] w-full"
                    sizes="(max-width: 1024px) 100vw, 375px"
                  />
                ) : null}
              </div>

              {bottomWide ? (
                <FlavorCard
                  card={bottomWide}
                  className="h-[305px] w-full"
                  sizes="(max-width: 1024px) 100vw, 774px"
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex justify-center px-4">
          <Link
            href={data.ctaHref}
            className="flex h-[52px] min-w-[161px] items-center justify-center rounded-[55px] border border-primary/40 bg-primary px-6 text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90"
            style={{ fontFamily: ara }}
          >
            {data.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineLocalFlavorsSection;
