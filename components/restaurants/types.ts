/**
 * UI model for restaurant cards (`RestaurantsGrid`, `RestaurantsCards`) and filters.
 * Populated from `transformLocationToRestaurant()` in `data.ts` or from `dummyRestaurants.ts`.
 *
 * API alignment (Directus `locations` collection — add fields as needed):
 * | Restaurant (UI)   | Suggested API field(s)              | Notes                          |
 * |------------------|-------------------------------------|--------------------------------|
 * | id               | id                                  | string UUID                    |
 * | name             | name_ar, name_en                    | prefer Arabic                  |
 * | location         | city_ar, city_en                    | UI adds "، عسير" when city set |
 * | distanceKm       | distance_km                         | optional; 0 if unknown         |
 * | rating           | rating                              | optional; 0–5                  |
 * | reviewsCount     | reviews_count                       | optional                       |
 * | priceRange       | price_range                         | e.g. "$$" or copy; fallback AR |
 * | priceBand        | price_band                          | optional; e.g. "100-50"        |
 * | nationality      | nationality_ar, nationality_en      | optional; default "سعودي"      |
 * | category         | category_ar, category_en            | fallback "مطعم"                |
 * | image            | picture_url_new, picture_url        | Drive URLs proxied in data.ts  |
 * | mapsUrl          | google_maps_url                     | fallback Google search by name |
 */
export interface Restaurant {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  nationality: string;
  category: string;
  /** Price band for card footer, e.g. "100-50" — optional on API (`price_band`). */
  priceBand?: string;
  image: string;
  mapsUrl: string;
}
