"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";
import { Restaurant } from "./data";
import { formatCuisineTypes } from "./restaurantLocale";

interface RestaurantsGridProps {
  restaurants: Restaurant[];
}

const PLACEHOLDER_IMAGE = "/assets/experiences/experiences.png";

const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";
const ara = "var(--font-ara-hamah-1964), sans-serif";
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 6.5C5.82843 6.5 6.5 5.82843 6.5 5C6.5 4.17157 5.82843 3.5 5 3.5C4.17157 3.5 3.5 4.17157 3.5 5C3.5 5.82843 4.17157 6.5 5 6.5Z"
        stroke="currentColor"
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
        fill="currentColor"
      />
    </svg>
  );
}

const RestaurantsGrid = ({ restaurants }: RestaurantsGridProps) => {
  const locale = useLocale() as "ar" | "en";

  const handleRestaurantClick = useCallback((mapsUrl: string) => {
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  }, []);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = PLACEHOLDER_IMAGE;
    },
    []
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {restaurants.map((restaurant) => {
          const cuisineLabel = formatCuisineTypes(restaurant.cuisineTypes, locale);

          return (
            <button
              key={restaurant.id}
              type="button"
              onClick={() => handleRestaurantClick(restaurant.mapsUrl)}
              className={`group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface text-foreground transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:rounded-3xl text-start`}
             
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col gap-2 px-4 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-5">
                <h3
                  className="line-clamp-2 text-[24px] font-bold leading-[119%] text-foreground"
                  style={{ fontFamily: ara }}
                >
                  {restaurant.name}
                </h3>

                <div className="flex w-full items-center justify-start gap-1.5">
                  <CardPinIcon />
                  <span
                    className="min-w-0 flex-1 truncate text-[10px] font-bold leading-none text-foreground"
                    style={{ fontFamily: ibm }}
                  >
                    {restaurant.location}
                  </span>
                </div>

                {cuisineLabel ? (
                  <div className="flex w-full items-start justify-start gap-1 pb-1">
                    <span className="mt-0.5 shrink-0">
                      <CardUtensilIcon />
                    </span>
                    <span
                      className="line-clamp-2 text-xs font-bold leading-[1.5] text-foreground"
                      style={{ fontFamily: ibm }}
                    >
                      {cuisineLabel}
                    </span>
                  </div>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsGrid;
