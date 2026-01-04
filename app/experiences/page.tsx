import ExperiencesBanner from "@/components/ExperiencesBanner/ExperiencesBanner";
import ExperiencesFilter from "@/components/ExperiencesFilter/ExperiencesFilter";

const ExperiencesPage = () => {
  // Placeholder data - will be replaced with actual experiences data
  const experiences = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `تجربة ${i + 1}`,
  }));

  return (
    <div className="flex flex-col w-full">
      <ExperiencesBanner />
      <div className="container mx-auto px-48 py-12">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className="flex-shrink-0">
            <ExperiencesFilter />
          </aside>

          {/* Experiences Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-6">
              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="bg-gray-100 rounded-lg p-6 min-h-[300px] flex items-center justify-center"
                >
                  <span className="text-gray-500">{experience.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesPage;
