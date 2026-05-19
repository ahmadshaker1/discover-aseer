import ExperiencesBanner from "@/components/experiences/ExperiencesBanner/ExperiencesBanner";
import ExperiencesWithFilter from "@/components/experiences/ExperiencesWithFilter";
import { fetchExperiences } from "@/components/experiences/data";
import type { AppLocale } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

const ExperiencesPage = async () => {
  const locale = (await getLocale()) as AppLocale;
  const { experiences, filterOptions } = await fetchExperiences({ locale });

  return (
    <div className="flex flex-col w-full">
      <ExperiencesBanner />
      <div className="container mx-auto py-12">
        <ExperiencesWithFilter
          experiences={experiences}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  );
};

export default ExperiencesPage;
