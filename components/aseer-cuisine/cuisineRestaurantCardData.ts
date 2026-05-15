import type { Restaurant } from "@/components/restaurants/types";

export interface CuisineRestaurantCardData {
  id: string;
  image: string;
  title: string;
  location: string;
  cuisineType: string;
  priceRange: string;
  priceBand?: string;
  rating: number;
  reviewsCount: number;
}

export function mapRestaurantToCuisineCard(
  restaurant: Restaurant,
  options: { cuisineTypeFallback: string; priceFallback: string },
): CuisineRestaurantCardData {
  return {
    id: restaurant.id,
    image: restaurant.image,
    title: restaurant.name,
    location: restaurant.location,
    cuisineType: restaurant.category || options.cuisineTypeFallback,
    priceRange:
      restaurant.priceBand || restaurant.priceRange || options.priceFallback,
    priceBand: restaurant.priceBand,
    rating: restaurant.rating > 0 ? restaurant.rating : 4.5,
    reviewsCount: restaurant.reviewsCount ?? 0,
  };
}
