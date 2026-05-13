"use client";

import Image from "next/image";
const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface AseerCuisineDishCard {
  id: string;
  title: string;
  image: string;
}

export interface AseerCuisineDishesSectionData {
  // Backend (Directus): section heading.
  title: string;
  // Backend (Directus): long section description text.
  description: string;
  // Backend (Directus): exactly 4 cards for this row (image + title).
  cards: AseerCuisineDishCard[];
}

interface AseerCuisineDishesSectionProps {
  data: AseerCuisineDishesSectionData;
}

const AseerCuisineDishesSection = ({ data }: AseerCuisineDishesSectionProps) => {
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
              className="w-full max-w-[704px] text-center text-[15px] font-light leading-[119%] text-muted-foreground"
              style={{ fontFamily: ibm }}
            >
              {data.description}
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-8 md:px-[62px]">
          <div className="mx-auto grid w-full max-w-[1316px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.cards.slice(0, 4).map((card) => (
              <article
                key={card.id}
                className="relative h-[305px] w-full max-w-[282px] justify-self-center overflow-hidden rounded-[10px] shadow-[0px_4.28px_3.37px_0px_#29489803,0px_8.72px_6.97px_0px_#29489805,0px_21.4px_13.91px_0px_#29489806]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 282px"
                />
                <div className="absolute inset-x-0 bottom-0 h-[51px] rounded-b-[10px] bg-[linear-gradient(179.54deg,rgba(0,0,0,0)_0.39%,#000000_99.6%)] px-5 py-4">
                  <p
                    className={`line-clamp-1 text-[24px] font-bold leading-[119%] text-white text-start`}
                    style={{ fontFamily: ara }}
                  >
                    {card.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineDishesSection;
