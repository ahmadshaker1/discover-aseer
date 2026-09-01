import { connection } from "next/server";
import { getLocale, getTranslations } from "next-intl/server";
import HeroSection from "@/components/Hero/HeroSection";
import LandingWelcomeSection from "@/components/landing/LandingWelcomeSection";
import AttractionsLandmarksSection from "@/components/attractions/AttractionsLandmarksSection";
import AseerExperiencesSection from "@/components/experiences/AseerExperiencesSection";
import LandingStoriesFromAseerSection from "@/components/landing/LandingStoriesFromAseerSection";
import EventsInfo from "@/components/EventsInfo/EventsInfo";
import { fetchLandmarks } from "@/components/landmarks/data";
import { fetchExperiences } from "@/components/experiences/data";
import PointsOfInterest from "@/components/PointsOfInterest/PointsOfInterest";
import FloatingAmbientSound from "@/components/FloatingAmbientSound/FloatingAmbientSound";
import type { AppLocale } from "@/i18n/routing";
import { shufflePick } from "@/lib/shufflePick";

const HOME_LANDMARK_COUNT = 4;
const HOME_EXPERIENCE_COUNT = 6;

export default async function LocalizedHomePage() {
  await connection();
  const locale = (await getLocale()) as AppLocale;
  const tHome = await getTranslations("home");
  const [landmarksResult, experiencesResult] = await Promise.all([
    fetchLandmarks(locale),
    fetchExperiences({ locale }),
  ]);
  const landmarks = shufflePick(landmarksResult.items, HOME_LANDMARK_COUNT);
  const homeExperiences = shufflePick(
    experiencesResult.experiences,
    HOME_EXPERIENCE_COUNT,
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <HeroSection />
      <LandingWelcomeSection />
      <PointsOfInterest />
      <AttractionsLandmarksSection
        landmarks={landmarks}
        featuredCount={HOME_LANDMARK_COUNT}
        title={tHome("landmarksTitle")}
        description={tHome("landmarksDescription")}
        decorationImageSrc="/assets/landing/landmarks-zigzag.png"
      />
      <AseerExperiencesSection
        decorationImageSrc="/assets/landing/landmarks-zigzag.png"
        data={{
          title: tHome("experiencesTitle"),
          description: tHome("experiencesDescription"),
          ctaLabel: tHome("experiencesCta"),
          ctaHref: "/experiences",
          cards: homeExperiences,
        }}
      />

      <LandingStoriesFromAseerSection />
      <EventsInfo />
      <FloatingAmbientSound locale={locale} />
    </div>
  );
}
