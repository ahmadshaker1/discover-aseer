import TourismCompaniesHero from "@/components/tourism-companies/hero";
import TourismCompaniesCardSection from "@/components/tourism-companies/card";
import { parseCatalogPage } from "@/lib/directus/collectionCache";

interface TourismCompaniesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TourismCompaniesPage({
  searchParams,
}: TourismCompaniesPageProps) {
  const { page: pageParam } = await searchParams;
  const page = parseCatalogPage(pageParam);

  return (
    <div className="flex w-full flex-col">
      <TourismCompaniesHero />
      <TourismCompaniesCardSection page={page} />
    </div>
  );
}
