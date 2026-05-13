import { getLocale, getTranslations } from "next-intl/server";
import Hero from "@/components/Hero/Hero";
import LandingWelcomeSection from "@/components/landing/LandingWelcomeSection";
import AttractionsLandmarksSection from "@/components/attractions/AttractionsLandmarksSection";
import AseerExperiencesSection from "@/components/experiences/AseerExperiencesSection";
import LandingStoriesFromAseerSection from "@/components/landing/LandingStoriesFromAseerSection";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
import { fetchLandmarks } from "@/components/landmarks/data";
import { fetchExperiences } from "@/components/experiences/data";
import PointsOfInterest from "@/components/PointsOfInterest/PointsOfInterest";
import FloatingAmbientSound from "@/components/FloatingAmbientSound/FloatingAmbientSound";
import type { AppLocale } from "@/i18n/routing";

export default async function LocalizedHomePage() {
  const locale = (await getLocale()) as AppLocale;
  const tHome = await getTranslations("home");
  const [landmarks, experiencesResult] = await Promise.all([
    fetchLandmarks(locale),
    fetchExperiences(),
  ]);

  const homeExperiences = experiencesResult.experiences.slice(0, 6);

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden">
      <Hero />
      <LandingWelcomeSection />
      <PointsOfInterest />
      <AttractionsLandmarksSection
        landmarks={landmarks}
        featuredCount={4}
        title={tHome("landmarksTitle")}
        description={tHome("landmarksDescription")}
        decorationImageSrc="/assets/landing/landmarks-zigzag.png"
        landmarkCardHref="/attractions"
      />
      <div
        className="w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(21, 21, 131, 0.25) 100%)",
        }}
      >
        <AseerExperiencesSection
          data={{
            title: tHome("experiencesTitle"),
            description: tHome("experiencesDescription"),
            ctaLabel: tHome("experiencesCta"),
            ctaHref: "/experiences",
            cards: homeExperiences,
          }}
        />
      </div>

      <LandingStoriesFromAseerSection />
      <EventsInfo />
      <FloatingAmbientSound locale={locale} />
    </div>
  );
}
