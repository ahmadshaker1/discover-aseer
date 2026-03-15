import ExperiencesBanner from "@/components/experiences/ExperiencesBanner/ExperiencesBanner";
import ExperiencesFilter from "@/components/experiences/ExperiencesFilter/ExperiencesFilter";
import ExperienceCard from "@/components/experiences/ExperienceCard/ExperienceCard";
import { fetchExperiences } from "@/components/experiences/data";

const ExperiencesPage = async () => {
  const experiences = await fetchExperiences();

  return (
    <div className="flex flex-col w-full">
      <ExperiencesBanner />
      <div className="container mx-auto  py-12">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="flex-shrink-0">
            <ExperiencesFilter />
          </aside>

          {/* Experiences Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-6">
              {experiences.map((experience) => (
                <ExperienceCard key={experience.id} {...experience} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesPage;
