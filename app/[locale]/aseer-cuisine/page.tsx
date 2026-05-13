import AseerCuisineHero from "@/components/aseer-cuisine/AseerCuisineHero";
import AseerCuisineDishesSection from "@/components/aseer-cuisine/AseerCuisineDishesSection";
import AseerCuisineRestaurantsSection from "@/components/aseer-cuisine/AseerCuisineRestaurantsSection";
import AseerCuisineLocalFlavorsSection from "@/components/aseer-cuisine/AseerCuisineLocalFlavorsSection";
import AseerCuisineCookingExperiencesSection from "@/components/experiences/AseerExperiencesSection";
import AseerCuisineChefsVideoSection from "@/components/aseer-cuisine/AseerCuisineChefsVideoSection";
import type { ExperienceCardProps } from "@/components/experiences/ExperienceCard/ExperienceCard";
import { fetchExperiences } from "@/components/experiences/data";
import { fetchRestaurants } from "@/components/restaurants/data";
import RestaurantsCredibilitySection from "@/components/restaurants/RestaurantsCredibilitySection";
import { getTranslations } from "next-intl/server";
import { buildAseerCuisineFallback } from "./buildFallbackData";
import type { AseerCuisinePageData } from "./types";

/**
 * Backend handoff (Directus):
 * - Page is Directus-ready: `fetchAseerCuisinePageData()` reads from Directus and falls back to dummy data.
 * - Expected Directus collection: `aseer_cuisine_page` (single item).
 * - Preferred payload shape is nested JSON sections on the item:
 *   `hero`, `dishesSection`, `restaurantsSection`, `localFlavorsSection`, `cookingExperiencesSection`, `chefsVideoSection`.
 * - Keep component markup unchanged; update only Directus fields/content.
 */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return fallback;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function pick(record: Record<string, unknown>, ...keys: string[]): unknown {
  for (const key of keys) {
    if (key in record) return record[key];
  }
  return undefined;
}

function resolveMedia(value: unknown, directusUrl: string, fallback: string): string {
  if (typeof value !== "string" || !value.trim()) return fallback;
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/")) {
    return value;
  }
  return `${directusUrl.replace(/\/$/, "")}/assets/${value}`;
}

function mapExperienceCards(
  value: unknown,
  fallbackCards: ExperienceCardProps[],
  directusUrl: string
): ExperienceCardProps[] {
  const list = asArray(value);
  if (list.length === 0) return fallbackCards;

  return list.map((item, index) => {
    const raw = isRecord(item) ? item : {};
    const fallback = fallbackCards[index] ?? fallbackCards[0];
    return {
      id: asString(raw.id, `${fallback.id}-${index}`),
      imageUrl: resolveMedia(raw.imageUrl ?? raw.image, directusUrl, fallback.imageUrl),
      category: asString(raw.category, fallback.category),
      title: asString(raw.title, fallback.title),
      duration: asString(raw.duration, fallback.duration),
      description: asString(raw.description, fallback.description),
      provider: asString(raw.provider, fallback.provider),
      price: asNumber(raw.price, Number(fallback.price)),
      currency: asString(raw.currency, fallback.currency ?? "ر.س"),
      groupSize: asNumber(raw.groupSize, fallback.groupSize),
      bookUrl: asString(raw.bookUrl, fallback.bookUrl),
    };
  });
}

function mapAseerCuisineDataFromDirectus(
  item: Record<string, unknown>,
  directusUrl: string,
  fallback: AseerCuisinePageData
): AseerCuisinePageData {
  // Supports both direct nested sections and wrapped payloads.
  const source =
    (isRecord(item.pageData) && item.pageData) ||
    (isRecord(item.page_data) && item.page_data) ||
    (isRecord(item.data) && item.data) ||
    item;

  const heroRaw = isRecord(pick(source, "hero")) ? (pick(source, "hero") as Record<string, unknown>) : {};
  const dishesRaw = isRecord(pick(source, "dishesSection", "dishes_section"))
    ? (pick(source, "dishesSection", "dishes_section") as Record<string, unknown>)
    : {};
  const restaurantsRaw = isRecord(pick(source, "restaurantsSection", "restaurants_section"))
    ? (pick(source, "restaurantsSection", "restaurants_section") as Record<string, unknown>)
    : {};
  const localFlavorsRaw = isRecord(pick(source, "localFlavorsSection", "local_flavors_section"))
    ? (pick(source, "localFlavorsSection", "local_flavors_section") as Record<string, unknown>)
    : {};
  const cookingRaw = isRecord(pick(source, "cookingExperiencesSection", "cooking_experiences_section"))
    ? (pick(source, "cookingExperiencesSection", "cooking_experiences_section") as Record<string, unknown>)
    : {};
  const chefsRaw = isRecord(pick(source, "chefsVideoSection", "chefs_video_section"))
    ? (pick(source, "chefsVideoSection", "chefs_video_section") as Record<string, unknown>)
    : {};

  return {
    hero: {
      videoUrl: resolveMedia(pick(heroRaw, "videoUrl", "video_url"), directusUrl, fallback.hero.videoUrl),
      posterImage: resolveMedia(
        pick(heroRaw, "posterImage", "poster_image"),
        directusUrl,
        fallback.hero.posterImage
      ),
    },
    dishesSection: {
      title: asString(pick(dishesRaw, "title"), fallback.dishesSection.title),
      description: asString(pick(dishesRaw, "description"), fallback.dishesSection.description),
      cards: asArray(pick(dishesRaw, "cards", "items")).length
        ? asArray(pick(dishesRaw, "cards", "items")).map((item, index) => {
          const raw = isRecord(item) ? item : {};
          const fallbackCard =
            fallback.dishesSection.cards[index] ?? fallback.dishesSection.cards[0];
          return {
            id: asString(raw.id, `${fallbackCard.id}-${index}`),
            title: asString(raw.title, fallbackCard.title),
            image: resolveMedia(pick(raw, "image", "image_url"), directusUrl, fallbackCard.image),
          };
        })
        : fallback.dishesSection.cards,
    },
    restaurantsSection: {
      title: asString(pick(restaurantsRaw, "title"), fallback.restaurantsSection.title),
      ctaLabel: asString(
        pick(restaurantsRaw, "ctaLabel", "cta_label"),
        fallback.restaurantsSection.ctaLabel
      ),
      ctaHref: asString(
        pick(restaurantsRaw, "ctaHref", "cta_href"),
        fallback.restaurantsSection.ctaHref
      ),
      cards: asArray(pick(restaurantsRaw, "cards", "items")).length
        ? asArray(pick(restaurantsRaw, "cards", "items")).map((item, index) => {
          const raw = isRecord(item) ? item : {};
          const fallbackCard =
            fallback.restaurantsSection.cards[index] ?? fallback.restaurantsSection.cards[0];
          return {
            id: asString(raw.id, `${fallbackCard.id}-${index}`),
            image: resolveMedia(pick(raw, "image", "image_url"), directusUrl, fallbackCard.image),
            title: asString(pick(raw, "title"), fallbackCard.title),
            location: asString(pick(raw, "location"), fallbackCard.location),
            cuisineType: asString(
              pick(raw, "cuisineType", "cuisine_type"),
              fallbackCard.cuisineType
            ),
            priceRange: asString(
              pick(raw, "priceRange", "price_range"),
              fallbackCard.priceRange
            ),
            rating: asNumber(pick(raw, "rating"), fallbackCard.rating),
            reviewsCount: asNumber(
              pick(raw, "reviewsCount", "reviews_count"),
              fallbackCard.reviewsCount
            ),
          };
        })
        : fallback.restaurantsSection.cards,
    },
    localFlavorsSection: {
      title: asString(pick(localFlavorsRaw, "title"), fallback.localFlavorsSection.title),
      subtitle: asString(pick(localFlavorsRaw, "subtitle"), fallback.localFlavorsSection.subtitle),
      cards: asArray(pick(localFlavorsRaw, "cards", "items")).length
        ? asArray(pick(localFlavorsRaw, "cards", "items")).map((item, index) => {
          const raw = isRecord(item) ? item : {};
          const fallbackCard =
            fallback.localFlavorsSection.cards[index] ?? fallback.localFlavorsSection.cards[0];
          return {
            id: asString(raw.id, `${fallbackCard.id}-${index}`),
            title: asString(pick(raw, "title"), fallbackCard.title),
            image: resolveMedia(pick(raw, "image", "image_url"), directusUrl, fallbackCard.image),
          };
        })
        : fallback.localFlavorsSection.cards,
    },
    cookingExperiencesSection: {
      title: asString(pick(cookingRaw, "title"), fallback.cookingExperiencesSection.title),
      description: asString(
        pick(cookingRaw, "description"),
        fallback.cookingExperiencesSection.description
      ),
      ctaLabel: asString(
        pick(cookingRaw, "ctaLabel", "cta_label"),
        fallback.cookingExperiencesSection.ctaLabel
      ),
      ctaHref: asString(
        pick(cookingRaw, "ctaHref", "cta_href"),
        fallback.cookingExperiencesSection.ctaHref
      ),
      cards: mapExperienceCards(
        pick(cookingRaw, "cards", "items"),
        fallback.cookingExperiencesSection.cards,
        directusUrl
      ),
    },
    chefsVideoSection: {
      title: asString(pick(chefsRaw, "title"), fallback.chefsVideoSection.title),
      subtitle: asString(pick(chefsRaw, "subtitle"), fallback.chefsVideoSection.subtitle),
      videoUrl: resolveMedia(
        pick(chefsRaw, "videoUrl", "video_url"),
        directusUrl,
        fallback.chefsVideoSection.videoUrl
      ),
      posterImage: resolveMedia(
        pick(chefsRaw, "posterImage", "poster_image"),
        directusUrl,
        fallback.chefsVideoSection.posterImage
      ),
    },
  };
}

async function fetchAseerCuisinePageData(): Promise<AseerCuisinePageData> {
  const t = await getTranslations("aseerCuisine");
  const tCommon = await getTranslations("common");
  const fallback = buildAseerCuisineFallback(t, tCommon("currencySar"));
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_APP_URL;
  if (!directusUrl) return fallback;

  try {
    /**
     * Directus contract:
     * - Collection: `aseer_cuisine_page`
     * - Return one item containing nested JSON section fields.
     * - If shape differs, update only `mapAseerCuisineDataFromDirectus`.
     */
    const response = await fetch(`${directusUrl}/items/aseer_cuisine_page?limit=1`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return fallback;

    const payload: unknown = await response.json();
    if (!isRecord(payload) || !Array.isArray(payload.data) || payload.data.length === 0) {
      return fallback;
    }

    const firstItem = payload.data[0];
    if (!isRecord(firstItem)) return fallback;
    return mapAseerCuisineDataFromDirectus(firstItem, directusUrl, fallback);
  } catch {
    return fallback;
  }
}

const AseerCuisinePage = async () => {
  const tCommon = await getTranslations("common");

  const [aseerCuisinePageData, restaurants, experiencesResult] = await Promise.all([
    fetchAseerCuisinePageData(),
    fetchRestaurants(),
    fetchExperiences(),
  ]);

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

  const mergedData: AseerCuisinePageData = {
    ...aseerCuisinePageData,
    restaurantsSection:
      cuisineRestaurants.length > 0
        ? {
          ...aseerCuisinePageData.restaurantsSection,
          cards: cuisineRestaurants,
          ctaHref: "/restaurants",
        }
        : aseerCuisinePageData.restaurantsSection,
    cookingExperiencesSection:
      cuisineExperiences.length > 0
        ? {
          ...aseerCuisinePageData.cookingExperiencesSection,
          cards: cuisineExperiences,
          ctaHref: "/experiences",
        }
        : aseerCuisinePageData.cookingExperiencesSection,
  };

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <AseerCuisineHero data={mergedData.hero} />
      <AseerCuisineDishesSection data={mergedData.dishesSection} />
      <AseerCuisineRestaurantsSection data={mergedData.restaurantsSection} />
      <AseerCuisineLocalFlavorsSection data={mergedData.localFlavorsSection} />
      <AseerCuisineCookingExperiencesSection data={mergedData.cookingExperiencesSection} />
      <RestaurantsCredibilitySection />
      <AseerCuisineChefsVideoSection data={mergedData.chefsVideoSection} />
    </div>
  );
};

export default AseerCuisinePage;
