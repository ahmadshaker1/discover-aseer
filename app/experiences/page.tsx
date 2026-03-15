import ExperiencesBanner from "@/components/experiences/ExperiencesBanner/ExperiencesBanner";
import ExperiencesWithFilter from "@/components/experiences/ExperiencesWithFilter";
import { fetchExperiences } from "@/components/experiences/data";

const ExperiencesPage = async () => {
  const { experiences, filterOptions } = await fetchExperiences();

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
