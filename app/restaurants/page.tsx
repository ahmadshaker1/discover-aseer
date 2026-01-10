import RestaurantsGrid from "@/components/restaurants/RestaurantsGrid";
import { fetchRestaurants } from "@/components/restaurants/data";

const RestaurantsPage = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <div className="flex flex-col w-full">
      <RestaurantsGrid restaurants={restaurants} />
    </div>
  );
};

export default RestaurantsPage;


