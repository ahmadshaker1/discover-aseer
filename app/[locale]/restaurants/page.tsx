import RestaurantsBanner from "@/components/restaurants/RestaurantsBanner";
import RestaurantsCredibilitySection from "@/components/restaurants/RestaurantsCredibilitySection";
import RestaurantsListing from "@/components/restaurants/RestaurantsListing";
import { fetchRestaurants } from "@/components/restaurants/data";

/**
 * Data: `components/restaurants/data.ts` (endpoint, env flags, `ApiLocation` → `Restaurant`).
 * Env template: repo root `.env.example`.
 */
const RestaurantsPage = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <div className="flex w-full flex-col">
      <RestaurantsBanner />
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <RestaurantsListing restaurants={restaurants} />
      </div>

      <RestaurantsCredibilitySection />
    </div>
  );
};

export default RestaurantsPage;
