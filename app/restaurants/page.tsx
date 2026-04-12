import RestaurantsBanner from "@/components/restaurants/RestaurantsBanner";
import RestaurantsCredibilitySection from "@/components/restaurants/RestaurantsCredibilitySection";
import RestaurantsGrid from "@/components/restaurants/RestaurantsGrid";
import RestaurantsFilterSidebar from "@/components/restaurants/RestaurantsFilterSidebar";
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
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="w-full flex-1">
            <RestaurantsGrid restaurants={restaurants} />
          </div>

          <aside className="w-full shrink-0 lg:w-auto">
            <RestaurantsFilterSidebar />
          </aside>
        </div>
      </div>

      <RestaurantsCredibilitySection />
    </div>
  );
};

export default RestaurantsPage;
