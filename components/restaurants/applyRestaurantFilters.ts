import {
  inferCityIdFromLocation,
  locationMatchesCityId,
} from "@/components/landmarks/filterOptions";
import type { Restaurant } from "./types";

export interface RestaurantFilterState {
  city: string | null;
  cuisineTypes: string[];
}

/** Fixed filter order — ids match CMS `cuisine_type` slugs. */
export const CUISINE_FILTER_IDS = [
  "aseeri_cuisine",
  "khaleeji",
  "lebanese",
  "italian",
  "indian",
  "international_cuisine",
  "american",
  "cafe",
] as const;

export type CuisineFilterId = (typeof CUISINE_FILTER_IDS)[number];

function restaurantCuisineSlugs(r: Restaurant): string[] {
  return (r.cuisineTypes ?? []).map((slug) => slug.toLowerCase());
}

export function restaurantMatchesCuisine(r: Restaurant, id: string): boolean {
  return restaurantCuisineSlugs(r).includes(id.toLowerCase());
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

export function countRestaurantsForCity(
  restaurants: Restaurant[],
  cityId: string,
): number {
  return restaurants.filter((r) => restaurantMatchesCity(r, cityId)).length;
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
