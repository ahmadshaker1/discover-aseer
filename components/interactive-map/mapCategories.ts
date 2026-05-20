import type { ComponentType } from "react";
import {
  MapCategoryAccommodationIcon,
  MapCategoryAttractionsIcon,
  MapCategoryCampingIcon,
  MapCategoryEventsIcon,
  MapCategoryExperiencesIcon,
  MapCategoryRestaurantsIcon,
} from "./MapCategoryIcons";

export type MapCategoryKey =
  | "events"
  | "experiences"
  | "attractions"
  | "camping"
  | "restaurants"
  | "accommodation";

export const MAP_CATEGORY_KEYS: MapCategoryKey[] = [
  "events",
  "experiences",
  "attractions",
  "camping",
  "restaurants",
  "accommodation",
];

type MapCategoryIconProps = { className?: string };

export const MAP_CATEGORY_ICONS: Record<
  MapCategoryKey,
  ComponentType<MapCategoryIconProps>
> = {
  events: MapCategoryEventsIcon,
  experiences: MapCategoryExperiencesIcon,
  attractions: MapCategoryAttractionsIcon,
  camping: MapCategoryCampingIcon,
  restaurants: MapCategoryRestaurantsIcon,
  accommodation: MapCategoryAccommodationIcon,
};

export const resolvePlaceCategoryKey = (place: {
  categoryKey?: MapCategoryKey | null;
  category?: string;
  categoryAr?: string;
  categoryEn?: string;
}): MapCategoryKey | null => {
  if (place.categoryKey != null) {
    return place.categoryKey;
  }

  const label = `${place.categoryAr ?? ""} ${place.categoryEn ?? ""} ${place.category ?? ""}`;
  if (/تجارب|experience/i.test(label)) return "experiences";
  if (/تخييم|كرفان|camping|caravan/i.test(label)) return "camping";
  if (/فعاليات|event/i.test(label)) return "events";
  if (/معالم|attraction/i.test(label)) return "attractions";
  if (/مطعم|مقهى|restaurant|cafe|food/i.test(label)) return "restaurants";
  if (/إقامة|فندق|accommodation|hotel/i.test(label)) return "accommodation";

  return null;
};
