import RestaurantsBanner from "@/components/restaurants/RestaurantsBanner";
import RestaurantsGrid from "@/components/restaurants/RestaurantsGrid";
import RestaurantsFilterSidebar from "@/components/restaurants/RestaurantsFilterSidebar";
import { fetchRestaurants } from "@/components/restaurants/data";

const RestaurantsPage = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <div className="flex flex-col w-full">
      <RestaurantsBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-auto lg:flex-shrink-0">
            <RestaurantsFilterSidebar />
          </aside>

          {/* Restaurants Grid */}
          <div className="flex-1 w-full">
            <RestaurantsGrid restaurants={restaurants} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
