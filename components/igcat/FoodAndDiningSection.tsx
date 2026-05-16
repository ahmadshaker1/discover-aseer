"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CuisineGridCard, { type CuisineGridCardData } from "@/components/aseer-cuisine/CuisineGridCard";
import CuisineRestaurantCard, {
  type CuisineRestaurantCardData,
} from "@/components/aseer-cuisine/CuisineRestaurantCard";

interface FoodAndDiningSectionProps {
  dishCards: CuisineGridCardData[];
  restaurantCards: CuisineRestaurantCardData[];
}

export default function FoodAndDiningSection({
  dishCards,
  restaurantCards,
}: FoodAndDiningSectionProps) {
  const t = useTranslations("igcat.food");
  const featuredDishes = dishCards.slice(0, 4);
  const featuredRestaurants = restaurantCards.slice(0, 8);

  return (
    <div className="w-full">
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between gap-4">
            <h2 className="text-start text-[28px] font-bold leading-tight text-foreground md:text-[36px]">
              {t("dishesTitle")}
            </h2>
            <Link
              href="/aseer-cuisine"
              className="rounded-full bg-primary px-8 py-2.5 text-[14px] font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              {t("dishesCta")}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDishes.map((card) => (
              <CuisineGridCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between gap-4">
            <h2 className="text-start text-[28px] font-bold leading-tight text-foreground md:text-[36px]">
              {t("restaurantsTitle")}
            </h2>
            <Link
              href="/restaurants"
              className="rounded-full bg-primary px-8 py-2.5 text-[14px] font-bold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              {t("restaurantsCta")}
            </Link>
          </div>

          {featuredRestaurants.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              {t("noRestaurants")}
            </p>
          ) : (
            <div className="hide-scrollbar w-full overflow-x-auto pb-5">
              <div className="flex min-w-max gap-6 px-1">
                {featuredRestaurants.map((card) => (
                  <CuisineRestaurantCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
