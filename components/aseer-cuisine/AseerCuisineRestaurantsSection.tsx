import Link from "next/link";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface AseerCuisineRestaurantCard {
  id: string;
  image: string;
  title: string;
  location: string;
  cuisineType: string;
  priceRange: string;
  rating: number;
  reviewsCount: number;
}

export interface AseerCuisineRestaurantsSectionData {
  // Backend (Directus): section heading text.
  title: string;
  // Backend (Directus): CTA button text and route.
  ctaLabel: string;
  ctaHref: string;
  // Backend (Directus): carousel cards dataset.
  cards: AseerCuisineRestaurantCard[];
}

interface AseerCuisineRestaurantsSectionProps {
  data: AseerCuisineRestaurantsSectionData;
}

function CardPinIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M9.5 5C9.5 8.5 5 11.5 5 11.5C5 11.5 0.5 8.5 0.5 5C0.5 3.80653 0.974106 2.66193 1.81802 1.81802C2.66193 0.974106 3.80653 0.5 5 0.5C6.19347 0.5 7.33807 0.974106 8.18198 1.81802C9.02589 2.66193 9.5 3.80653 9.5 5Z"
        stroke="#1D1F1F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 6.5C5.82843 6.5 6.5 5.82843 6.5 5C6.5 4.17157 5.82843 3.5 5 3.5C4.17157 3.5 3.5 4.17157 3.5 5C3.5 5.82843 4.17157 6.5 5 6.5Z"
        stroke="#1D1F1F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardUtensilIcon() {
  return (
    <svg
      width="10"
      height="9"
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M5.60907 4.20581L5.18207 4.63281L8.71757 8.16831L8.01057 8.87531L4.47507 5.34031L0.939573 8.87531L0.232573 8.16831L4.90207 3.49881C4.60807 2.77031 4.91207 1.72131 5.71207 0.920313C6.68857 -0.0556869 8.03407 -0.293187 8.71757 0.390313C9.40107 1.07381 9.16357 2.41931 8.18757 3.39531C7.38657 4.19631 6.33757 4.50031 5.60907 4.20581ZM0.586073 0.0368133L3.94457 3.39531L2.53057 4.80981L0.585573 2.86481C0.210631 2.48976 0 1.98114 0 1.45081C0 0.920485 0.210631 0.411869 0.585573 0.0368133H0.586073ZM7.48007 2.68781C8.10907 2.05931 8.23857 1.32481 8.01057 1.09681C7.78257 0.868813 7.04807 0.998313 6.41957 1.62681C5.79107 2.25581 5.66157 2.99031 5.88957 3.21831C6.11707 3.44581 6.85157 3.31631 7.48007 2.68781Z"
        fill="#1D1F1F"
      />
    </svg>
  );
}

function CardPersonIcon() {
  return (
    <svg
      width="8"
      height="11"
      viewBox="0 0 8 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M0 10.5C0 9.43913 0.421427 8.42172 1.17157 7.67157C1.92172 6.92143 2.93913 6.5 4 6.5C5.06087 6.5 6.07828 6.92143 6.82843 7.67157C7.57857 8.42172 8 9.43913 8 10.5H0ZM4 6C2.3425 6 1 4.6575 1 3C1 1.3425 2.3425 0 4 0C5.6575 0 7 1.3425 7 3C7 4.6575 5.6575 6 4 6Z"
        fill="#1D1F1F"
      />
    </svg>
  );
}

function CardCurrencyIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M11.5901 9.25373C11.8042 8.79435 11.9458 8.29561 12 7.7727L8.47005 8.49922V7.10259L11.59 6.46098C11.8041 6.0016 11.9457 5.50286 11.9999 4.97995L8.46994 5.70585V0.683132C7.92905 0.977024 7.44868 1.36823 7.0582 1.82967V5.99633L5.64645 6.28671V0C5.10556 0.293789 4.62519 0.685094 4.2347 1.14654V6.57699L1.07592 7.22655C0.861779 7.68593 0.720124 8.18467 0.665789 8.70758L4.2347 7.97362V9.73243L0.409913 10.519C0.195776 10.9784 0.0542281 11.4771 0 12L4.00349 11.1767C4.32939 11.1111 4.6095 10.9246 4.79161 10.668L5.52582 9.61467V9.61446C5.60204 9.50548 5.64645 9.37408 5.64645 9.23256V7.68324L7.0582 7.39286V10.1861L11.59 9.25353L11.5901 9.25373Z"
        fill="#19171A"
      />
    </svg>
  );
}

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

function formatPriceBand(card: AseerCuisineRestaurantCard): string {
  if (card.priceRange?.trim()) return card.priceRange.trim();
  return "50-100";
}

const AseerCuisineRestaurantsSection = ({ data }: AseerCuisineRestaurantsSectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] py-8" dir="rtl">
      <div className="flex w-full flex-col gap-8">
        <div className="px-4 sm:px-8 xl:px-[120px]">
          <div className="flex h-[94px] w-full items-center justify-between">
            <div className="flex h-[94px] w-[263px] items-end border-b border-black/20 pb-[10px] pt-[7px]">
              <h2
                className="w-full text-right text-[64px] font-bold leading-[119%] text-black"
                style={{ fontFamily: ara }}
              >
                {data.title}
              </h2>
            </div>

            <Link
              href={data.ctaHref}
              className="flex h-[52px] w-[161px] items-center justify-center gap-2 rounded-[55px] border border-[#FFFFFF54] bg-[#6027D2] p-[10px] text-[20px] font-bold leading-[119%] text-white transition-opacity hover:opacity-90"
              style={{ fontFamily: ara }}
            >
              {data.ctaLabel}
            </Link>
          </div>
        </div>

        <div className="h-[337px] w-full overflow-x-auto pb-5">
          {/* Backend (Directus): cards control image/title/location/cuisine/price/rating and map 1:1 to existing restaurant card fields. */}
          <div className="flex min-w-max gap-6 px-4 sm:px-8 xl:px-[120px]">
            {data.cards.map((card) => (
              <article
                key={card.id}
                className="group flex w-[282px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-right transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl"
                dir="rtl"
              >
                <div className="relative h-[190px] w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute left-3 top-3 z-10 flex h-[29px] min-w-[89px] max-w-[89px] items-center justify-center gap-1 rounded-[50px] bg-[#00000080] p-[6px]"
                    dir="ltr"
                  >
                    <RatingStar />
                    <span
                      className="min-w-0 truncate text-right text-[11px] font-medium leading-none text-white"
                      style={{ fontFamily: ibm }}
                    >
                      ({card.reviewsCount}) {Number(card.rating).toFixed(1)}/5
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

                  <div className="flex w-full items-center justify-start gap-1.5">
                    <CardPinIcon />
                    <span
                      className="min-w-0 flex-1 truncate text-right text-[10px] font-bold leading-none text-[#1D1F1F]"
                      style={{ fontFamily: ibm }}
                    >
                      {card.location}
                    </span>
                  </div>

                  <div className="flex w-full flex-wrap items-center justify-start gap-3">
                    <div className="flex items-center justify-start gap-1">
                      <CardUtensilIcon />
                      <span
                        className="text-right text-xs font-bold leading-none text-[#1D1F1F]"
                        style={{ fontFamily: ibm }}
                      >
                        {card.cuisineType}
                      </span>
                    </div>
                    <CardPersonIcon />
                    <div className="flex items-center justify-start gap-1">
                      <span
                        className="text-right text-xs font-bold leading-none text-[#19171A]"
                        style={{ fontFamily: ibm }}
                      >
                        {formatPriceBand(card)}
                      </span>
                      <CardCurrencyIcon />
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

export default AseerCuisineRestaurantsSection;
