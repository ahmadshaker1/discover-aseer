import { locationMatchesCityId } from "@/components/landmarks/filterOptions";
import type { Restaurant } from "./types";

export interface RestaurantFilterState {
  city: string | null;
  restaurantType: string[];
  cuisineTypes: string[];
}

function matchesCuisine(r: Restaurant, id: string): boolean {
  const hay = `${r.name} ${r.category} ${r.nationality}`.toLowerCase();
  switch (id) {
    case "asian":
      return /asian|آسيوي|سوشي|صيني|ياباني|تايلاند|sushi/.test(hay);
    case "american":
      return /american|أمريكي|burger|برجر|steak/.test(hay);
    case "saudi":
      return /saudi|سعودي|تقليدي|تراثي|عسيري|مشويات|حنيذ|traditional/.test(hay);
    case "middle-eastern":
      return /عربي|شرق|levant|turkish|تركي|لبناني|middle|arabic/.test(hay);
    default:
      return false;
  }
}

function matchesRestaurantType(r: Restaurant, ids: string[]): boolean {
  if (ids.length === 0) return true;
  return ids.some((id) => {
    if (id === "featured") return r.rating >= 4.5;
    if (id === "popular") return r.reviewsCount >= 100;
    if (id === "luxury") {
      if (/\$\$\$\$|\$\$\$/.test(r.priceRange)) return true;
      const parts = r.priceBand?.split("-").map((s) => Number(String(s).trim())) ?? [];
      if (parts.length === 2 && parts.every((n) => Number.isFinite(n))) {
        return Math.max(parts[0], parts[1]) >= 150;
      }
      return false;
    }
    return false;
  });
}

export function applyRestaurantFilters(
  restaurants: Restaurant[],
  f: RestaurantFilterState
): Restaurant[] {
  return restaurants.filter((r) => {
    if (f.city && !locationMatchesCityId(r.location, f.city)) return false;
    if (
      f.cuisineTypes.length > 0 &&
      !f.cuisineTypes.some((id) => matchesCuisine(r, id))
    ) {
      return false;
    }
    if (!matchesRestaurantType(r, f.restaurantType)) return false;
    return true;
  });
}
