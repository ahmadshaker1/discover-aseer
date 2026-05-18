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

const COLLECTION_CATEGORY: Record<string, MapCategoryKey> = {
  events: "events",
  attractions: "attractions",
  restaurants: "restaurants",
  accomodation: "accommodation",
};

const EXPERIENCES_PATTERN = /تجارب|experience/i;
const CAMPING_PATTERN = /تخييم|كرفان|camping|caravan/i;

export const resolvePlaceCategoryKey = (place: {
  id: string;
  category: string;
}): MapCategoryKey | null => {
  const source = place.id.split(":")[0];
  const fromCollection = COLLECTION_CATEGORY[source];
  if (fromCollection) return fromCollection;

  const category = place.category.trim();
  if (!category) return null;
  if (EXPERIENCES_PATTERN.test(category)) return "experiences";
  if (CAMPING_PATTERN.test(category)) return "camping";

  return null;
};
