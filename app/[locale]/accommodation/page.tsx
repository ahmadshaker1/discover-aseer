import AccommodationBanner from "@/components/accommodation/AccommodationBanner";
import AccommodationGrid from "@/components/accommodation/AccommodationGrid";
import { fetchAccommodations } from "@/components/accommodation/data";
import { parseCatalogPage } from "@/lib/directus/collectionCache";

import { getLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

interface AccommodationPageProps {
  searchParams: Promise<{ page?: string }>;
}

const AccommodationPage = async ({ searchParams }: AccommodationPageProps) => {
  const locale = (await getLocale()) as AppLocale;
  const { page: pageParam } = await searchParams;
  const page = parseCatalogPage(pageParam);
  const { items: accommodations } = await fetchAccommodations(locale);

  return (
    <div className="flex flex-col w-full">
      <AccommodationBanner />
      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <AccommodationGrid
          accommodations={accommodations}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default AccommodationPage;
