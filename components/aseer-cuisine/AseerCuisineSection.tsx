 "use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { AseerCuisineDish } from "@/components/aseer-cuisine/data";
import { ClockIcon, RatingStarIcon, UtensilsIcon } from "./Icons";

interface AseerCuisineSectionProps {
  dishes: AseerCuisineDish[];
}

const ara = "var(--font-ara-hamah-1964), sans-serif";

const AseerCuisineSection = ({ dishes }: AseerCuisineSectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const cards = dishes.slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-[1440px] py-8 text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex w-full flex-col gap-8">
        <div className="px-4 sm:px-8 xl:px-[120px]">
          <div className="flex w-full items-start justify-between">
            <div className={`flex min-h-[94px] flex-col gap-2 pb-[10px] pt-[7px] ${isRtl ? "items-end justify-end text-right" : "items-start justify-start text-left"}`}>
              <h2
                className={`w-full text-[64px] font-bold leading-[119%] text-foreground ${isRtl ? "text-right" : "text-left"}`}
                style={{ fontFamily: ara }}
              >
                {isRtl ? "المطبخ العسيري" : "Aseeri cuisine"}
              </h2>
              <p
                className={`h-[7px] w-[610px] text-[16px] font-bold leading-[24px] text-muted-foreground ${isRtl ? "text-right" : "text-left"}`}
                style={{ fontFamily: ara }}
              >
                {isRtl
                  ? "زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب."
                  : "One visit is never enough with all the activities and experiences on offer."}
              </p>
            </div>

            <Link
              href="/aseer-cuisine"
              className="flex h-[52px] w-[161px] items-center justify-center gap-2 rounded-[55px] border border-primary/40 bg-primary p-[10px] text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90"
              style={{ fontFamily: ara }}
            >
              {isRtl ? "المطبخ العسيري" : "Aseeri cuisine"}
            </Link>
          </div>
        </div>

        <div className="h-[337px] w-full overflow-x-auto pb-5">
          <div className="flex min-w-max gap-6 px-4 sm:px-8 xl:px-[120px]">
            {cards.map((card) => (
              <article
                key={card.id}
                className={`group flex w-[282px] flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl ${isRtl ? "text-right" : "text-left"}`}
                dir={isRtl ? "rtl" : "ltr"}
              >
                <div className="relative h-[190px] w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className={`absolute top-3 z-10 flex h-[29px] min-w-[89px] max-w-[89px] items-center justify-center gap-1 rounded-[50px] bg-[#00000080] p-[6px] ${isRtl ? "left-3" : "right-3"}`} dir="ltr">
                    <RatingStarIcon />
                    <span className="min-w-0 truncate text-[11px] font-medium leading-none text-white">
                      ({card.reviews}) {Number(card.rating).toFixed(1)}/5
                    </span>
                  </div>
                </div>

                <div className="flex h-[115px] flex-col justify-between gap-2 px-4 py-3 sm:px-5 sm:py-4">
                  <h3
                    className="line-clamp-1 text-[24px] font-bold leading-[119%] text-foreground"
                    style={{ fontFamily: ara }}
                  >
                    {card.title}
                  </h3>

                  <div className="flex h-[16px] w-[139px] items-center gap-6">
                    <div className="flex h-[16px] w-[73px] items-center gap-1">
                      <span className="text-foreground"><ClockIcon /></span>
                      <span
                        className="h-[8px] w-[53px] -translate-y-px text-[18px] font-bold leading-[100%] text-foreground"
                        style={{ fontFamily: ara }}
                      >
                        {card.timeText}
                      </span>
                    </div>

                    <div className="flex h-[16px] w-[42px] items-center gap-1">
                      <span className="text-foreground"><UtensilsIcon /></span>
                      <span
                        className="h-[8px] w-[22px] -translate-y-px text-[18px] font-bold leading-[100%] text-foreground"
                        style={{ fontFamily: ara }}
                      >
                        {card.mainIngredient}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineSection;
