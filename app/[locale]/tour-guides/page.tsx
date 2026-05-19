import TourGuidesBanner from "@/components/tour-guides/TourGuidesBanner/TourGuidesBanner";
import TourGuidesPageContent from "@/components/tour-guides/TourGuidesPageContent/TourGuidesPageContent";
import { fetchTourGuides } from "@/components/tour-guides/data";
import { getLocale } from "next-intl/server";

/** Data: `components/tour-guides/data.ts`. Env: `.env.example`. */
const TourGuidesPage = async () => {
  const locale = (await getLocale()) as "ar" | "en";
  const { guides, filterOptions } = await fetchTourGuides(locale);

  return (
    <div className="flex flex-col w-full">
      <TourGuidesBanner />
      <TourGuidesPageContent guides={guides} filterOptions={filterOptions} />
    </div>
  );
};

export default TourGuidesPage;
