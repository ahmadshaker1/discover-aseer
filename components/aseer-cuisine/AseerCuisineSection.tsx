 "use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import type { AseerCuisineDish } from "@/components/aseer-cuisine/data";

interface AseerCuisineSectionProps {
  dishes: AseerCuisineDish[];
}

const ara = "var(--font-ara-hamah-1964), sans-serif";

function RatingStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="#FACC15"
        d="M12 17.3L6.18 20.59L7.54 14.1L2.47 9.59L9.05 8.95L12 3L14.95 8.95L21.53 9.59L16.46 14.1L17.82 20.59L12 17.3Z"
      />
    </svg>
  );
}

function UtensilsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M14 1.3335V14.6668H12.6667V9.3335H10.6667V4.66683C10.6667 3.78277 11.0179 2.93493 11.643 2.30981C12.2681 1.68469 13.1159 1.3335 14 1.3335ZM6 9.26683V14.6668H4.66667V9.26683C3.91387 9.11291 3.23733 8.70374 2.75143 8.10852C2.26553 7.51329 2.00009 6.76853 2 6.00016V2.00016H3.33333V6.66683H4.66667V2.00016H6V6.66683H7.33333V2.00016H8.66667V6.00016C8.66657 6.76853 8.40114 7.51329 7.91524 8.10852C7.42934 8.70374 6.75279 9.11291 6 9.26683Z" fill="black" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8.00004 14.6668C4.31804 14.6668 1.33337 11.6822 1.33337 8.00016C1.33337 4.31816 4.31804 1.3335 8.00004 1.3335C11.682 1.3335 14.6667 4.31816 14.6667 8.00016C14.6667 11.6822 11.682 14.6668 8.00004 14.6668ZM8.00004 13.3335C9.41453 13.3335 10.7711 12.7716 11.7713 11.7714C12.7715 10.7712 13.3334 9.41465 13.3334 8.00016C13.3334 6.58567 12.7715 5.22912 11.7713 4.22893C10.7711 3.22873 9.41453 2.66683 8.00004 2.66683C6.58555 2.66683 5.229 3.22873 4.2288 4.22893C3.22861 5.22912 2.66671 6.58567 2.66671 8.00016C2.66671 9.41465 3.22861 10.7712 4.2288 11.7714C5.229 12.7716 6.58555 13.3335 8.00004 13.3335ZM8.66671 8.00016H11.3334V9.3335H7.33337V4.66683H8.66671V8.00016Z" fill="black" />
    </svg>
  );
}

const AseerCuisineSection = ({ dishes }: AseerCuisineSectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const cards = dishes.slice(0, 6);

  return (
    <section className="mx-auto w-full max-w-[1440px] py-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex w-full flex-col gap-8">
        <div className="px-4 sm:px-8 xl:px-[120px]">
          <div className="flex w-full items-start justify-between">
            <div className={`flex min-h-[94px] flex-col gap-2 pb-[10px] pt-[7px] ${isRtl ? "items-end justify-end text-right" : "items-start justify-start text-left"}`}>
              <h2
                className={`w-full text-[64px] font-bold leading-[119%] text-black ${isRtl ? "text-right" : "text-left"}`}
                style={{ fontFamily: ara }}
              >
                {isRtl ? "المطبخ العسيري" : "Aseeri cuisine"}
              </h2>
              <p
                className={`h-[7px] w-[610px] text-[16px] font-bold leading-[24px] text-[#1D1F1F]/70 ${isRtl ? "text-right" : "text-left"}`}
                style={{ fontFamily: ara }}
              >
                {isRtl
                  ? "زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب."
                  : "One visit is never enough with all the activities and experiences on offer."}
              </p>
            </div>

            <Link
              href="/aseer-cuisine"
              className="flex h-[52px] w-[161px] items-center justify-center gap-2 rounded-[55px] border border-[#FFFFFF54] bg-[#6027D2] p-[10px] text-[20px] font-bold leading-[119%] text-white transition-opacity hover:opacity-90"
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
                className={`group flex w-[282px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl ${isRtl ? "text-right" : "text-left"}`}
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
                    <RatingStar />
                    <span className="min-w-0 truncate text-[11px] font-medium leading-none text-white">
                      ({card.reviews}) {Number(card.rating).toFixed(1)}/5
                    </span>
                  </div>
                </div>

                <div className="flex h-[115px] flex-col justify-between gap-2 px-4 py-3 sm:px-5 sm:py-4">
                  <h3
                    className="line-clamp-1 text-[24px] font-bold leading-[119%] text-black"
                    style={{ fontFamily: ara }}
                  >
                    {card.title}
                  </h3>

                  <div className="flex h-[16px] w-[139px] items-center gap-6">
                    <div className="flex h-[16px] w-[73px] items-center gap-1">
                      <ClockIcon />
                      <span
                        className="h-[8px] w-[53px] -translate-y-px text-[18px] font-bold leading-[100%] text-black"
                        style={{ fontFamily: ara }}
                      >
                        {card.timeText}
                      </span>
                    </div>

                    <div className="flex h-[16px] w-[42px] items-center gap-1">
                      <UtensilsIcon />
                      <span
                        className="h-[8px] w-[22px] -translate-y-px text-[18px] font-bold leading-[100%] text-black"
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
