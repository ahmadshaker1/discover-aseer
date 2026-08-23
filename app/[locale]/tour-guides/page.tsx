import TourGuidesBanner from "@/components/tour-guides/TourGuidesBanner/TourGuidesBanner";
import TourGuidesPageContent from "@/components/tour-guides/TourGuidesPageContent/TourGuidesPageContent";
import { fetchTourGuides } from "@/components/tour-guides/data";
import { parseCatalogPage } from "@/lib/directus/collectionCache";
import { getLocale } from "next-intl/server";

/** Data: `components/tour-guides/data.ts`. Env: `.env.example`. */
interface TourGuidesPageProps {
  searchParams: Promise<{ page?: string }>;
}

const TourGuidesPage = async ({ searchParams }: TourGuidesPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const { page: pageParam } = await searchParams;
  const page = parseCatalogPage(pageParam);
  const { guides, filterOptions, totalPages } = await fetchTourGuides(locale, {
    page,
  });

  return (
    <div className="flex flex-col w-full">
      <TourGuidesBanner />
      <TourGuidesPageContent
        guides={guides}
        filterOptions={filterOptions}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TourGuidesPage;
