"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface AseerCuisineFlavorCard {
  id: string;
  title: string;
  image: string;
}

export interface AseerCuisineLocalFlavorsSectionData {
  // Backend (Directus): section title.
  title: string;
  // Backend (Directus): section subtitle text.
  subtitle: string;
  // Backend (Directus): 4 bento cards ordered LTR as [leftTall, topLeft, topRight, bottomWide].
  // Change image/title values only; layout updates automatically.
  cards: AseerCuisineFlavorCard[];
}

interface AseerCuisineLocalFlavorsSectionProps {
  data: AseerCuisineLocalFlavorsSectionData;
}

function FlavorCard({
  card,
  className,
  sizes,
  isRtl,
}: {
  card: AseerCuisineFlavorCard;
  className: string;
  sizes: string;
  isRtl: boolean;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[10px] shadow-[0px_4.28px_3.37px_0px_#29489803,0px_8.72px_6.97px_0px_#29489805,0px_21.4px_13.91px_0px_#29489806] ${className}`}
    >
      <Image src={card.image} alt={card.title} fill className="object-cover" sizes={sizes} />
      <div className="absolute inset-x-0 bottom-0 h-[51px] rounded-b-[10px] bg-[linear-gradient(179.54deg,rgba(0,0,0,0)_0.39%,#000000_99.6%)] px-5 py-4">
        <p
          className={`line-clamp-1 text-[24px] font-bold leading-[119%] text-white ${isRtl ? "text-right" : "text-left"}`}
          style={{ fontFamily: ara }}
        >
          {card.title}
        </p>
      </div>
    </article>
  );
}

const AseerCuisineLocalFlavorsSection = ({ data }: AseerCuisineLocalFlavorsSectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [leftTall, topLeft, topRight, bottomWide] = data.cards;

  return (
    <section className="mx-auto w-full max-w-[1440px] py-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex w-full flex-col gap-8">
        <div className="px-4 sm:px-8 xl:px-[120px]">
          <div className="mx-auto flex h-[116px] w-full max-w-[704px] flex-col items-center gap-3 text-center">
            <h2
              className="w-full text-center text-[64px] font-bold leading-[119%] text-black"
              style={{ fontFamily: ara }}
            >
              {data.title}
            </h2>
            <p
              className="w-full text-center text-[15px] font-light leading-[119%] text-[#252525]/80"
              style={{ fontFamily: ibm }}
            >
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* Backend (Directus): card images/titles come from `cards` array in this exact visual order (LTR). */}
        <div className="px-4 sm:px-8 md:px-[60px]">
          <div className={`mx-auto flex w-full max-w-[1320px] flex-col gap-6 lg:h-[632px] ${isRtl ? "lg:flex-row" : "lg:flex-row-reverse"}`} dir={isRtl ? "rtl" : "ltr"}>
            {leftTall ? (
              <FlavorCard
                card={leftTall}
                className="h-[320px] w-full lg:h-[632px] lg:w-[522px]"
                sizes="(max-width: 1024px) 100vw, 522px"
                isRtl={isRtl}
              />
            ) : null}

            <div className="flex w-full flex-col gap-[22px] lg:h-[632px] lg:w-[774px]">
              <div className="grid h-[305px] w-full grid-cols-1 gap-6 sm:grid-cols-2">
                {topLeft ? (
                  <FlavorCard
                    card={topLeft}
                    className="h-[305px] w-full"
                    sizes="(max-width: 1024px) 100vw, 375px"
                    isRtl={isRtl}
                  />
                ) : null}
                {topRight ? (
                  <FlavorCard
                    card={topRight}
                    className="h-[305px] w-full"
                    sizes="(max-width: 1024px) 100vw, 375px"
                    isRtl={isRtl}
                  />
                ) : null}
              </div>

              {bottomWide ? (
                <FlavorCard
                  card={bottomWide}
                  className="h-[305px] w-full"
                  sizes="(max-width: 1024px) 100vw, 774px"
                  isRtl={isRtl}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineLocalFlavorsSection;
