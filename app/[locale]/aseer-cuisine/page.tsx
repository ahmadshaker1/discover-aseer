import AseerCuisineHero from "@/components/aseer-cuisine/AseerCuisineHero";
import AseerCuisineDishesSection from "@/components/aseer-cuisine/AseerCuisineDishesSection";
import AseerCuisineRestaurantsSection from "@/components/aseer-cuisine/AseerCuisineRestaurantsSection";
import AseerCuisineLocalFlavorsSection from "@/components/aseer-cuisine/AseerCuisineLocalFlavorsSection";
import AseerCuisineCookingExperiencesSection from "@/components/experiences/AseerExperiencesSection";
import AseerCuisineChefsVideoSection from "@/components/aseer-cuisine/AseerCuisineChefsVideoSection";
import { fetchFeaturedCuisineCards } from "@/components/aseer-cuisine/data";
import {
  COOKING_EXPERIENCE_TYPE,
  fetchExperiences,
} from "@/components/experiences/data";
import { fetchRestaurants } from "@/components/restaurants/data";
import RestaurantsCredibilitySection from "@/components/restaurants/RestaurantsCredibilitySection";
import { getLocale, getTranslations } from "next-intl/server";

export const revalidate = 300;

const CUISINE_VIDEO = "/videos/cooking.mp4";
const FALLBACK_POSTER = "/assets/activities/aseer-cuisine.jpg";

const AseerCuisinePage = async () => {
  const t = await getTranslations("aseerCuisine");
  const tCommon = await getTranslations("common");
  const locale = (await getLocale()) as "ar" | "en";

  const [dishCards, flavorCards, restaurants, experiencesResult] =
    await Promise.all([
      fetchFeaturedCuisineCards({ locale, cuisineType: "dish", count: 100 }),
      fetchFeaturedCuisineCards({ locale, cuisineType: "flavour", count: 100 }),
      fetchRestaurants(locale),
      // Same idea as restaurants: page shows cooking experiences; CTA opens all.
      fetchExperiences({ type: COOKING_EXPERIENCE_TYPE, locale }),
    ]);
  const posterImage =
    dishCards[0]?.image || flavorCards[0]?.image || FALLBACK_POSTER;

  const cuisineRestaurants = restaurants
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

  const cuisineExperiences = experiencesResult.experiences
    .slice(0, 6)
    .map((experience) => ({
      id: String(experience.id),
      image:
        experience.imageUrl?.trim() || "/assets/experiences/experiences.png",
      title: experience.title,
      location: experience.provider || experience.category || "",
      cuisineType: experience.category || experience.duration || "",
      priceRange:
        experience.price > 0
          ? String(experience.price)
          : tCommon("notSpecified"),
      rating: 4.5,
      reviewsCount: 0,
    }));

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <AseerCuisineHero
        data={{
          videoUrl: CUISINE_VIDEO,
          posterImage,
        }}
      />

      <AseerCuisineDishesSection
        data={{
          title: t("dishesSection.title"),
          description: t("dishesSection.description"),
          cards: dishCards,
          ctaLabel: t("dishesSection.browseAll"),
          ctaHref: "/aseer-cuisine/dishes",
        }}
      />

      <AseerCuisineLocalFlavorsSection
        data={{
          title: t("localFlavorsSection.title"),
          subtitle: t("localFlavorsSection.subtitle"),
          cards: flavorCards,
          ctaLabel: t("localFlavorsSection.browseAll"),
          ctaHref: "/aseer-cuisine/flavors",
        }}
      />

      <RestaurantsCredibilitySection />

      <AseerCuisineChefsVideoSection
        data={{
          title: t("chefsVideoSection.title"),
          subtitle: t("chefsVideoSection.subtitle"),
          videoUrl: CUISINE_VIDEO,
          posterImage,
        }}
      />

      <AseerCuisineCookingExperiencesSection
        data={{
          title: t("cookingExperiencesSection.title"),
          description: t("cookingExperiencesSection.description"),
          ctaLabel: t("cookingExperiencesSection.ctaLabel"),
          ctaHref: "/experiences",
          cards: cuisineExperiences,
        }}
      />

      <AseerCuisineRestaurantsSection
        data={{
          title: t("restaurantsSection.title"),
          ctaLabel: t("restaurantsSection.ctaLabel"),
          ctaHref: "/restaurants",
          cards: cuisineRestaurants,
        }}
      />
    </div>
  );
};

export default AseerCuisinePage;
