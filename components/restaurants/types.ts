/**
 * UI model for restaurant cards (`RestaurantsGrid`, `RestaurantsCards`) and filters.
 * Populated from `transformLocationToRestaurant()` in `data.ts`.
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
 * | category         | category_ar, category_en            | fallback "مطعم" (not on card)  |
 * | cuisineTypes     | cuisine_type                        | slug array, e.g. ["lebanese"]  |
 * | image            | image_new, then image               | Drive → /api/image-proxy       |
 * | cityId           | inferred from location text         | used by sidebar city filter      |
 * | mapsUrl          | google_maps_url                     | fallback Google search by name |
 */
export interface Restaurant {
  id: string;
  name: string;
  location: string;
  /** Inferred from location for filter sidebar (`CITY_DEFS` ids). */
  cityId?: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  nationality: string;
  category: string;
  /** CMS `cuisine_type` slugs — shown on cards and used by cuisine filters. */
  cuisineTypes?: string[];
  /** Price band for card footer, e.g. "100-50" — optional on API (`price_band`). */
  priceBand?: string;
  image: string;
  mapsUrl: string;
}
