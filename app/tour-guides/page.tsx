import TourGuidesBanner from "@/components/tour-guides/TourGuidesBanner/TourGuidesBanner";
import TourGuidesPageContent from "@/components/tour-guides/TourGuidesPageContent/TourGuidesPageContent";
import { fetchTourGuides } from "@/components/tour-guides/data";

const TourGuidesPage = async () => {
  const { guides, filterOptions } = await fetchTourGuides();

  return (
    <div className="flex flex-col w-full">
      <TourGuidesBanner />
      <TourGuidesPageContent guides={guides} filterOptions={filterOptions} />
    </div>
  );
};

export default TourGuidesPage;
