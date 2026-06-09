import {
  inferCityIdFromLocation,
  locationMatchesCityId,
} from "@/components/landmarks/filterOptions";
import type { Restaurant } from "./types";

export interface RestaurantFilterState {
  city: string | null;
  cuisineTypes: string[];
}

export const CUISINE_FILTER_IDS = [
  "asian",
  "american",
  "saudi",
  "middle-eastern",
  "popular",
] as const;

export type CuisineFilterId = (typeof CUISINE_FILTER_IDS)[number];

export function restaurantMatchesCuisine(r: Restaurant, id: string): boolean {
  const hay =
    `${r.name} ${r.category} ${r.nationality} ${r.cuisineType ?? ""}`.toLowerCase();
  switch (id) {
    case "asian":
      return /asian|آسيوي|سوشي|صيني|ياباني|تايلاند|sushi/.test(hay);
    case "american":
      return /american|أمريكي|burger|برجر|steak/.test(hay);
    case "saudi":
      return /saudi|سعودي|تقليدي|تراثي|عسيري|مشويات|حنيذ|traditional|مطعم|مطاعم|عسير|المطبخ/.test(
        hay,
      );
    case "middle-eastern":
      return /عربي|شرق|levant|turkish|تركي|لبناني|middle|arabic|كافيه|قهوة/.test(
        hay,
      );
    case "popular":
      return r.reviewsCount >= 50;
    default:
      return false;
  }
}

function restaurantMatchesCity(r: Restaurant, cityId: string): boolean {
  if (r.cityId) return r.cityId === cityId;
  return locationMatchesCityId(r.location, cityId);
}

export function countRestaurantsForCuisine(
  restaurants: Restaurant[],
  cuisineId: string,
): number {
  return restaurants.filter((r) => restaurantMatchesCuisine(r, cuisineId))
    .length;
}

export function applyRestaurantFilters(
  restaurants: Restaurant[],
  f: RestaurantFilterState,
): Restaurant[] {
  return restaurants.filter((r) => {
    if (f.city && !restaurantMatchesCity(r, f.city)) return false;
    if (
      f.cuisineTypes.length > 0 &&
      !f.cuisineTypes.some((id) => restaurantMatchesCuisine(r, id))
    ) {
      return false;
    }
    return true;
  });
}

/** Attach cityId when missing (e.g. dummy data). */
export function withInferredCityIds(restaurants: Restaurant[]): Restaurant[] {
  return restaurants.map((r) =>
    r.cityId
      ? r
      : {
          ...r,
          cityId: inferCityIdFromLocation(r.location),
        },
  );
}
