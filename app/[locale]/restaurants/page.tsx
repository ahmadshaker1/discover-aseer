import RestaurantsBanner from "@/components/restaurants/RestaurantsBanner";
import RestaurantsCredibilitySection from "@/components/restaurants/RestaurantsCredibilitySection";
import RestaurantsListing from "@/components/restaurants/RestaurantsListing";
import { fetchRestaurants } from "@/components/restaurants/data";
import { parseCatalogPage } from "@/lib/directus/collectionCache";
import { getLocale } from "next-intl/server";

/**
 * Data: `components/restaurants/data.ts` (endpoint, env flags, `ApiLocation` → `Restaurant`).
 * Env template: repo root `.env.example`.
 */
interface RestaurantsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const RestaurantsPage = async ({ searchParams }: RestaurantsPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const { page: pageParam } = await searchParams;
  const page = parseCatalogPage(pageParam);
  const { items: restaurants, totalPages } = await fetchRestaurants(locale, {
    page,
  });

  return (
    <div className="flex w-full flex-col">
      <RestaurantsBanner />
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <RestaurantsListing
          restaurants={restaurants}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>

      <RestaurantsCredibilitySection />
    </div>
  );
};

export default RestaurantsPage;
