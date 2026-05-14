import AseerCuisineHero from "@/components/aseer-cuisine/AseerCuisineHero";
import AseerCuisineDishesSection from "@/components/aseer-cuisine/AseerCuisineDishesSection";
import AseerCuisineRestaurantsSection from "@/components/aseer-cuisine/AseerCuisineRestaurantsSection";
import AseerCuisineLocalFlavorsSection from "@/components/aseer-cuisine/AseerCuisineLocalFlavorsSection";
import AseerCuisineCookingExperiencesSection from "@/components/experiences/AseerExperiencesSection";
import AseerCuisineChefsVideoSection from "@/components/aseer-cuisine/AseerCuisineChefsVideoSection";
import { fetchFeaturedCuisineCards } from "@/components/aseer-cuisine/data";
import type { ExperienceCardProps } from "@/components/experiences/ExperienceCard/ExperienceCard";
import { fetchExperiences } from "@/components/experiences/data";
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

  const [dishCards, flavorCards, restaurants, experiencesResult] = await Promise.all([
    fetchFeaturedCuisineCards({ locale, cuisineType: "dish", count: 4 }),
    fetchFeaturedCuisineCards({ locale, cuisineType: "flavour", count: 4 }),
    fetchRestaurants(),
    fetchExperiences(),
  ]);
  const posterImage = dishCards[0]?.image || flavorCards[0]?.image || FALLBACK_POSTER;

  const cuisineRestaurants = restaurants.slice(0, 6).map((restaurant) => ({
    id: restaurant.id,
    image: restaurant.image,
    title: restaurant.name,
    location: restaurant.location,
    cuisineType: restaurant.category || tCommon("restaurant"),
    priceRange: restaurant.priceBand || restaurant.priceRange || tCommon("notSpecified"),
    rating: restaurant.rating > 0 ? restaurant.rating : 4.5,
    reviewsCount: restaurant.reviewsCount ?? 0,
  }));

  const cuisineExperiences: ExperienceCardProps[] = experiencesResult.experiences
    .slice(0, 6)
    .map((experience) => ({
      id: experience.id,
      imageUrl: experience.imageUrl,
      category: experience.category,
      title: experience.title,
      duration: experience.duration,
      description: experience.description,
      provider: experience.provider,
      price: experience.price,
      currency: experience.currency,
      groupSize: experience.groupSize,
      bookUrl: experience.bookUrl,
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

      <AseerCuisineRestaurantsSection
        data={{
          title: t("restaurantsSection.title"),
          ctaLabel: t("restaurantsSection.ctaLabel"),
          ctaHref: "/restaurants",
          cards: cuisineRestaurants,
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

      <AseerCuisineCookingExperiencesSection
        data={{
          title: t("cookingExperiencesSection.title"),
          description: t("cookingExperiencesSection.description"),
          ctaLabel: t("cookingExperiencesSection.ctaLabel"),
          ctaHref: "/experiences",
          cards: cuisineExperiences,
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
    </div>
  );
};

export default AseerCuisinePage;
