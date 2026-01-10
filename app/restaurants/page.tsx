import RestaurantsBanner from "@/components/restaurants/RestaurantsBanner";
import RestaurantsGrid from "@/components/restaurants/RestaurantsGrid";
import RestaurantsFilterSidebar from "@/components/restaurants/RestaurantsFilterSidebar";
import { fetchRestaurants } from "@/components/restaurants/data";

const RestaurantsPage = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <div className="flex flex-col w-full">
      <RestaurantsBanner />
      <div className="container mx-auto py-12">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="flex-shrink-0">
            <RestaurantsFilterSidebar />
          </aside>

          {/* Restaurants Grid */}
          <div className="flex-1">
            <RestaurantsGrid restaurants={restaurants} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
