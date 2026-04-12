import type { Restaurant } from "./types";

/**
 * Preview-only rows for `/restaurants` when dummy mode is on.
 * Field names match `Restaurant` in `types.ts` (same shape the live API mapper produces).
 *
 * To use real API data only:
 *   1. Remove or set NEXT_PUBLIC_RESTAURANTS_USE_DUMMY=false in `.env.local`.
 *   2. Optionally delete this file and remove its import + branch from `data.ts`.
 */
export const DUMMY_RESTAURANTS: Restaurant[] = [
  {
    id: "dummy-r1",
    name: "مطعم أبها التراثي",
    location: "أبها، عسير",
    distanceKm: 2,
    rating: 4.6,
    reviewsCount: 128,
    priceRange: "$$",
    priceBand: "80-120",
    nationality: "سعودي",
    category: "مأكولات تقليدية",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Abha+restaurant",
  },
  {
    id: "dummy-r2",
    name: "شواية الجبل",
    location: "خميس مشيط، عسير",
    distanceKm: 5,
    rating: 4.4,
    reviewsCount: 89,
    priceRange: "$",
    priceBand: "35-70",
    nationality: "سعودي",
    category: "مشويات",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Khamis+Mushait+grill",
  },
  {
    id: "dummy-r3",
    name: "كوفي السحاب",
    location: "أبها، عسير",
    distanceKm: 1,
    rating: 4.8,
    reviewsCount: 256,
    priceRange: "$$",
    priceBand: "25-55",
    nationality: "عالمي",
    category: "قهوة ومخبوزات",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Abha+cafe",
  },
  {
    id: "dummy-r4",
    name: "بيت السمك",
    location: "جازان",
    distanceKm: 0,
    rating: 4.2,
    reviewsCount: 64,
    priceRange: "$$$",
    priceBand: "120-200",
    nationality: "بحري",
    category: "مأكولات بحرية",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=seafood+Jazan",
  },
  {
    id: "dummy-r5",
    name: "فطور عسير",
    location: "النماص، عسير",
    distanceKm: 12,
    rating: 4.7,
    reviewsCount: 42,
    priceRange: "$",
    priceBand: "20-45",
    nationality: "سعودي",
    category: "فطور",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=breakfast+Asir",
  },
  {
    id: "dummy-r6",
    name: "مطعم الحديقة",
    location: "بيشة، عسير",
    distanceKm: 8,
    rating: 4.3,
    reviewsCount: 95,
    priceRange: "$$",
    priceBand: "60-100",
    nationality: "عالمي",
    category: "عائلي",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bisha+restaurant",
  },
];
