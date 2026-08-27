import ExperiencesBanner from "@/components/experiences/ExperiencesBanner/ExperiencesBanner";
import ExperiencesWithFilter from "@/components/experiences/ExperiencesWithFilter";
import { fetchExperiences } from "@/components/experiences/data";
import type { AppLocale } from "@/i18n/routing";
import { parseCatalogPage } from "@/lib/directus/collectionCache";
import { getLocale } from "next-intl/server";

interface ExperiencesPageProps {
  searchParams: Promise<{ page?: string }>;
}

const ExperiencesPage = async ({ searchParams }: ExperiencesPageProps) => {
  const locale = (await getLocale()) as AppLocale;
  const { page: pageParam } = await searchParams;
  const page = parseCatalogPage(pageParam);
  const { experiences, filterOptions } = await fetchExperiences({
    locale,
  });

  return (
    <div className="flex flex-col w-full">
      <ExperiencesBanner />
      <div className="container mx-auto py-12">
        <ExperiencesWithFilter
          experiences={experiences}
          filterOptions={filterOptions}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default ExperiencesPage;
