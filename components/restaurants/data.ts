export interface Restaurant {
  id: number;
  name: string;
  location: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  nationality: string;
  category: string;
  image: string;
  mapsUrl: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "مطعم ليالي أبها",
    location: "أبها، عسير",
    distanceKm: 12,
    rating: 4.8,
    reviewsCount: 233,
    priceRange: "50-100",
    nationality: "سعودي",
    category: "مطبخ محلي",
    image:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=%D9%84%D9%8A%D8%A7%D9%84%D9%8A+%D8%A3%D8%A8%D9%87%D8%A7+%D9%85%D8%B7%D8%B9%D9%85",
  },
  {
    id: 2,
    name: "مطعم القرية الجنوبية",
    location: "خميس مشيط، عسير",
    distanceKm: 18,
    rating: 4.7,
    reviewsCount: 189,
    priceRange: "40-90",
    nationality: "سعودي",
    category: "مأكولات شعبية",
    image:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=%D8%A7%D9%84%D9%82%D8%B1%D9%8A%D8%A9+%D8%A7%D9%84%D8%AC%D9%86%D9%88%D8%A8%D9%8A%D8%A9+%D9%85%D8%B7%D8%B9%D9%85",
  },
  {
    id: 3,
    name: "مطعم السودة البانورامي",
    location: "السودة، عسير",
    distanceKm: 25,
    rating: 4.9,
    reviewsCount: 310,
    priceRange: "80-150",
    nationality: "سعودي",
    category: "إطلالة جبلية",
    image:
      "https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B7%D8%B9%D9%85+%D8%A7%D9%84%D8%B3%D9%88%D8%AF%D8%A9",
  },
  {
    id: 4,
    name: "مطعم المزرعة",
    location: "محايل عسير",
    distanceKm: 30,
    rating: 4.6,
    reviewsCount: 145,
    priceRange: "60-120",
    nationality: "سعودي",
    category: "أجواء عائلية",
    image:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B7%D8%B9%D9%85+%D8%A7%D9%84%D9%85%D8%B2%D8%B1%D8%B9%D8%A9+%D9%85%D8%AD%D8%A7%D9%8A%D9%84",
  },
];


