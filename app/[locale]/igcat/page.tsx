import IGCatBannerSection from "@/components/igcat/bannerSection";
import IGCatBackgroundSection from "@/components/igcat/backgroundSection";
import IGCatEventCards from "@/components/igcat/eventCards";
import QuotesSection from "@/components/igcat/quotesSection";
import WinnersSection from "@/components/igcat/WinnersSection";
import FoodFilmSection from "@/components/igcat/FoodFilmSection";
import InitiativesSection from "@/components/igcat/InitiativesSection";
import FoodAndDiningSection from "@/components/igcat/FoodAndDiningSection";
import EventsInfo from "@/components/EventsInfo/EventsInfo";
import AseerCuisineHeritageRestaurantsSection from "@/components/aseer-cuisine/AseerCuisineHeritageRestaurantsSection";
import { fetchRestaurants } from "@/components/restaurants/data";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchSiteAssets } from "@/lib/siteAssets";

export const revalidate = 300;

export default async function IGCatPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations("aseerCuisine");
  const tCommon = await getTranslations("common");
  const assets = await fetchSiteAssets("igcat");

  const restaurants = await fetchRestaurants(locale);
  const heritageRestaurants = restaurants
    .filter((restaurant) => restaurant.cuisineTypes?.includes("aseeri_cuisine"))
    .slice(0, 6)
    .map((restaurant) => ({
      id: restaurant.id,
      image: restaurant.image,
      title: restaurant.name,
      location: restaurant.location,
      cuisineType: restaurant.category || tCommon("restaurant"),
      priceRange:
        restaurant.priceBand ||
        restaurant.priceRange ||
        tCommon("notSpecified"),
      rating: restaurant.rating > 0 ? restaurant.rating : 4.5,
      reviewsCount: restaurant.reviewsCount ?? 0,
    }));

  return (
    <main className="flex w-full flex-col bg-background text-foreground">
      <IGCatBannerSection />
      <IGCatBackgroundSection />
      <IGCatEventCards assets={assets} />
      <QuotesSection />
      <InitiativesSection />
      <WinnersSection />
      <FoodFilmSection />
      <AseerCuisineHeritageRestaurantsSection
        data={{
          title: tCommon("restaurants"),
          ctaLabel: t("heritageRestaurantsSection.ctaLabel"),
          ctaHref: "/restaurants",
          cards: heritageRestaurants,
        }}
      />
      <EventsInfo />
    </main>
  );
}
