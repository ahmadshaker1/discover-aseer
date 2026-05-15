import IGCatBannerSection from "@/components/igcat/bannerSection";
import IGCatBackgroundSection from "@/components/igcat/backgroundSection";
import IGCatEventCards from "@/components/igcat/eventCards";
import QuotesSection from "@/components/igcat/quotesSection";
import WinnersSection from "@/components/igcat/WinnersSection";
import FoodFilmSection from "@/components/igcat/FoodFilmSection";
import InitiativesSection from "@/components/igcat/InitiativesSection";
import FoodAndDiningSection from "@/components/igcat/FoodAndDiningSection";
import { fetchFeaturedCuisineCards } from "@/components/aseer-cuisine/data";
import { mapRestaurantToCuisineCard } from "@/components/aseer-cuisine/cuisineRestaurantCardData";
import { fetchRestaurants } from "@/components/restaurants/data";
import { getLocale, getTranslations } from "next-intl/server";

export const revalidate = 300;

export default async function IGCatPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const tCommon = await getTranslations("common");

  const [dishCards, restaurants] = await Promise.all([
    fetchFeaturedCuisineCards({
      locale,
      cuisineType: "dish",
      count: 4,
    }),
    fetchRestaurants(locale),
  ]);

  const restaurantCards = restaurants
    .slice(0, 8)
    .map((restaurant) =>
      mapRestaurantToCuisineCard(restaurant, {
        cuisineTypeFallback: tCommon("restaurant"),
        priceFallback: tCommon("notSpecified"),
      }),
    );

  return (
    <main className="flex w-full flex-col bg-background text-foreground">
      <IGCatBannerSection />
      <IGCatBackgroundSection />
      <IGCatEventCards />
      <QuotesSection />
      <WinnersSection />
      <FoodFilmSection />
      <InitiativesSection />
      <FoodAndDiningSection dishCards={dishCards} restaurantCards={restaurantCards} />
    </main>
  );
}
