import GettingHereAndAroundBanner from "@/components/Getting-here-and-around/GettingHereAndAroundBanner";
import MapSection from "@/components/Getting-here-and-around/map";
import TravelSection from "@/components/Getting-here-and-around/travelSection";
import TravelLandSection from "@/components/Getting-here-and-around/travelLandSection";
import ExperiencesSection from "@/components/Getting-here-and-around/experiences-section";
import AttractionsSection from "@/components/Getting-here-and-around/attractions-section";
import { getLocale } from "next-intl/server";
import { fetchExperiences } from "@/components/experiences/data";
import { fetchAttractions } from "@/components/attractions/data";
import type { AppLocale } from "@/i18n/routing";

export default async function GettingHereAndAround() {
  const locale = (await getLocale()) as AppLocale;
  const [experiencesResult, attractions] = await Promise.all([
    fetchExperiences({ locale }),
    fetchAttractions(locale),
  ]);
  const experiences = experiencesResult?.experiences || [];

  return (
    <div className="flex flex-col">
      <GettingHereAndAroundBanner />
      <TravelSection />
      <TravelLandSection />
      <MapSection />
      <ExperiencesSection experiences={experiences} />
      <AttractionsSection attractions={attractions} />
    </div>
  );
}
