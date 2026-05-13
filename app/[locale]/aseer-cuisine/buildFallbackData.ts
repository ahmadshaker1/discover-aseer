import type { ExperienceCardProps } from "@/components/experiences/ExperienceCard/ExperienceCard";
import type { AseerCuisinePageData } from "./types";

type CuisineTranslator = {
  (key: string): string;
};

export function buildAseerCuisineFallback(
  t: CuisineTranslator,
  currency: string
): AseerCuisinePageData {
  const cookingVideo = "/videos/cooking.mp4";
  const cookingPoster = "/assets/community/hero-comunity-bg.png";

  return {
    hero: {
      videoUrl: cookingVideo,
      posterImage: cookingPoster,
    },
    dishesSection: {
      title: t("dishesSection.title"),
      description: t("dishesSection.description"),
      cards: [
        {
          id: "dish-1",
          title: t("dishesSection.cards.dish1"),
          image: "/assets/community/hero-comunity-bg.png",
        },
        {
          id: "dish-2",
          title: t("dishesSection.cards.dish2"),
          image: "/assets/community/hero-comunity-bg.png",
        },
        {
          id: "dish-3",
          title: t("dishesSection.cards.dish3"),
          image: "/assets/community/hero-comunity-bg.png",
        },
        {
          id: "dish-4",
          title: t("dishesSection.cards.dish4"),
          image: "/assets/community/hero-comunity-bg.png",
        },
      ],
    },
    restaurantsSection: {
      title: t("restaurantsSection.title"),
      ctaLabel: t("restaurantsSection.ctaLabel"),
      ctaHref: "/restaurants",
      cards: ["r1", "r2", "r3", "r4", "r5", "r6"].map((id, index) => ({
        id: `r-${index + 1}`,
        image: "/assets/community/hero-comunity-bg.png",
        title: t(`restaurantsSection.cards.${id}.title`),
        location: t(`restaurantsSection.cards.${id}.location`),
        cuisineType: t(`restaurantsSection.cards.${id}.cuisineType`),
        priceRange: t(`restaurantsSection.cards.${id}.priceRange`),
        rating: [4.8, 4.6, 4.7, 4.5, 4.4, 4.9][index],
        reviewsCount: [542, 389, 261, 317, 198, 476][index],
      })),
    },
    localFlavorsSection: {
      title: t("localFlavorsSection.title"),
      subtitle: t("localFlavorsSection.subtitle"),
      cards: [
        {
          id: "flavor-1",
          title: t("localFlavorsSection.cards.flavor1"),
          image: "/assets/restaurant/img1.png",
        },
        {
          id: "flavor-2",
          title: t("localFlavorsSection.cards.flavor2"),
          image: "/assets/restaurant/img2.png",
        },
        {
          id: "flavor-3",
          title: t("localFlavorsSection.cards.flavor3"),
          image: "/assets/restaurant/img3.png",
        },
        {
          id: "flavor-4",
          title: t("localFlavorsSection.cards.flavor4"),
          image: "/assets/restaurant/img4.png",
        },
      ],
    },
    cookingExperiencesSection: {
      title: t("cookingExperiencesSection.title"),
      description: t("cookingExperiencesSection.description"),
      ctaLabel: t("cookingExperiencesSection.ctaLabel"),
      ctaHref: "/experiences",
      cards: buildCookingExperienceCards(t, currency),
    },
    chefsVideoSection: {
      title: t("chefsVideoSection.title"),
      subtitle: t("chefsVideoSection.subtitle"),
      videoUrl: cookingVideo,
      posterImage: cookingPoster,
    },
  };
}

function buildCookingExperienceCards(
  t: CuisineTranslator,
  currency: string
): ExperienceCardProps[] {
  const ids = ["cookExp1", "cookExp2", "cookExp3", "cookExp4"] as const;
  const images = [
    "/assets/restaurant/img1.png",
    "/assets/restaurant/img2.png",
    "/assets/restaurant/img3.png",
    "/assets/restaurant/img4.png",
  ];
  const prices = [180, 120, 95, 75];
  const groupSizes = [6, 8, 10, 12];

  return ids.map((id, index) => ({
    id: `cook-exp-${index + 1}`,
    imageUrl: images[index],
    category: t(`cookingExperiencesSection.cards.${id}.category`),
    title: t(`cookingExperiencesSection.cards.${id}.title`),
    duration: t(`cookingExperiencesSection.cards.${id}.duration`),
    description: t(`cookingExperiencesSection.cards.${id}.description`),
    provider: t(`cookingExperiencesSection.cards.${id}.provider`),
    price: prices[index],
    currency,
    groupSize: groupSizes[index],
    bookUrl: "#",
  }));
}
