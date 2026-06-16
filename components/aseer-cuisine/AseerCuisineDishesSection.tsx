"use client";

import { Link } from "@/i18n/navigation";
import CuisineGridCard, { type CuisineGridCardData } from "./CuisineGridCard";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface AseerCuisineDishCard extends CuisineGridCardData {}

export interface AseerCuisineDishesSectionData {
  title: string;
  description: string;
  cards: AseerCuisineDishCard[];
  ctaLabel: string;
  ctaHref: string;
}

interface AseerCuisineDishesSectionProps {
  data: AseerCuisineDishesSectionData;
}

const AseerCuisineDishesSection = ({
  data,
}: AseerCuisineDishesSectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] py-12 text-foreground">
      <div className="flex w-full flex-col gap-[59px]">
        <div className="px-4 sm:px-8 md:px-[62px]">
          <div className="mx-auto flex w-full max-w-[1316px] flex-col items-center gap-5 text-center">
            <h2
              className="w-full text-center text-[48px] font-bold leading-[100%] text-secondary"
              style={{ fontFamily: ara }}
            >
              {data.title}
            </h2>
            <p
              className="w-full max-w-[704px] text-center text-[18px] font-light leading-6 text-muted-foreground"
              style={{ fontFamily: ibm }}
            >
              {data.description}
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-8 md:px-[62px]">
          <div className="mx-auto grid w-full max-w-[1316px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.cards.map((card) => (
              <CuisineGridCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineDishesSection;
