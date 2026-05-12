"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import {
  FILM_SHOWCASE_FILTERS,
  type FilmShowcaseCard,
  type FilmShowcaseCategory,
} from "@/components/film/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const inter = "var(--font-inter), Inter, sans-serif";

interface FilmShowcaseSectionProps {
  cards: FilmShowcaseCard[];
}

const FilmShowcaseSection = ({ cards }: FilmShowcaseSectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [selected, setSelected] = useState<FilmShowcaseCategory>("الكل");

  const getFilterLabel = (filter: FilmShowcaseCategory) => {
    if (isRtl) return filter;
    switch (filter) {
      case "الكل":
        return "All";
      case "أفلام":
        return "Films";
      case "أﻓﻼم ﺗﺮوﻳﺠﻴﺔ":
        return "Promotional films";
      case "ﻣﺴﻠﺴﻼت":
        return "Series";
      case "أفلام ﻣﻮﺳﻴﻘﻴﺔ":
        return "Music films";
      default:
        return filter;
    }
  };

  const visibleCards = useMemo(() => {
    if (selected === "الكل") return cards.slice(0, 6);
    return cards.filter((c) => c.category === selected).slice(0, 6);
  }, [cards, selected]);

  return (
    <section className="mx-auto min-h-[839px] w-full max-w-[1442px] bg-background px-4 py-[60px] text-foreground sm:px-8 md:px-[68px]" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto flex w-full max-w-[1306px] flex-col gap-16">
        <header className="h-[96px] w-full">
          <h2
            className={`${isRtl ? "text-right" : "text-left"} text-[64px] font-bold leading-[96px] text-foreground`}
            style={{ fontFamily: ara }}
          >
            {isRtl ? "أعمال مصورة في عسير" : "Filmed works in Aseer"}
          </h2>
        </header>

        <div className="flex w-full flex-col gap-8">
          <div className="flex h-[50px] w-full items-center justify-start gap-4 overflow-x-auto" dir={isRtl ? "rtl" : "ltr"}>
            {FILM_SHOWCASE_FILTERS.map((filter) => {
              const active = selected === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelected(filter)}
                  className={`h-[50px] min-w-[80px] shrink-0 border-b-2 px-2 text-center text-[16px] leading-6 ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-foreground"
                  }`}
                  style={{ fontFamily: inter, paddingTop: 11.5, paddingBottom: 12.5 }}
                >
                  {getFilterLabel(filter)}
                </button>
              );
            })}
          </div>

          <div className="w-full overflow-x-auto">
            <div className="flex min-w-max items-start gap-[10px]">
              {visibleCards.map((card) => (
                <article
                  key={card.id}
                  className="relative h-[420px] w-[345px] shrink-0 overflow-hidden rounded-[20px]"
                >
                  <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-[120px] bg-linear-to-b from-transparent to-black/80" />
                  <h3
                    className={`absolute bottom-6 ${isRtl ? "right-6 text-right" : "left-6 text-left"} text-[20px] font-bold leading-[30px] text-white`}
                    style={{ fontFamily: ara }}
                  >
                    {card.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmShowcaseSection;
