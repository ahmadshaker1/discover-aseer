import RestaurantsHeader from "./RestaurantsHeader";
import RestaurantsFilters from "./RestaurantsFilters";
import RestaurantsCards from "./RestaurantsCards";
import RestaurantsShowMoreButton from "./RestaurantsShowMoreButton";
import { fetchRestaurants } from "./data";

const RestaurantsHighlight = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <section className="w-full flex flex-col items-center justify-center bg-white py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-12 lg:px-24 space-y-6 sm:space-y-8 md:space-y-10">
        <RestaurantsHeader />
        <RestaurantsFilters />
        <RestaurantsCards restaurants={restaurants.slice(0, 4)} />
      </div>

      <RestaurantsShowMoreButton />
    </section>
  );
};

export default RestaurantsHighlight;
