"use client";

import CuisineCardsCarousel from "./CuisineCardsCarousel";
import type { CuisineGridCardData } from "./CuisineGridCard";

const brando = "var(--font-brando), sans-serif";
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

const AseerCuisineLocalFlavorsSection = ({
  data,
}: AseerCuisineLocalFlavorsSectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] py-8 text-foreground">
      <div className="flex w-full flex-col gap-8">
        <div className="px-4 sm:px-8 xl:px-[120px]">
          <div className="mx-auto flex h-[116px] w-full max-w-[704px] flex-col items-center gap-3 text-center">
            <h2
              className="w-full text-center text-[48px] font-bold leading-[100%] text-secondary"
              style={{ fontFamily: brando }}
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

        <div className="mx-auto w-full max-w-[1440px] px-0 lg:px-[60px]">
          <CuisineCardsCarousel cards={data.cards} />
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineLocalFlavorsSection;
