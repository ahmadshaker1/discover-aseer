import Hero from "@/components/Hero/Hero";
import LandingWelcomeSection from "@/components/landing/LandingWelcomeSection";
import AttractionsLandmarksSection from "@/components/attractions/AttractionsLandmarksSection";
import AseerExperiencesSection from "@/components/experiences/AseerExperiencesSection";
import LandingStoriesFromAseerSection from "@/components/landing/LandingStoriesFromAseerSection";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
import { fetchLandmarks } from "@/components/landmarks/data";
import { fetchRestaurants } from "@/components/restaurants/data";
import { fetchExperiences } from "@/components/experiences/data";
import PointsOfInterest from "@/components/PointsOfInterest/PointsOfInterest";

export default async function Home() {
  const [landmarks, restaurants, experiencesResult] = await Promise.all([
    fetchLandmarks(),
    fetchRestaurants(),
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
        title="أشهر المعالم في عسير"
        description="عسير.. ثروةٌ من المعالم والتجارب"
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
            title: "تجارب في عسير",
            description:
              "في المطبخ العسيري ستكتفي بكل ما يُشبع حواسك من منطقة واحدة، ستبدأ بشرب فنجان قهوتك من البن العسيري من أشجارها المعمرة على سفوح الجبال والمحمص بعناية ليأسر برائحته وطعمه ذائقتك مع حبات من تمر الصفري من نخيل بيشة الباسق. ثم جرب أطباقا من قمح جبالها",
            ctaLabel: "عرض الكل",
            ctaHref: "/experiences",
            cards: homeExperiences,
          }}
        />
      </div>

      <LandingStoriesFromAseerSection />

      <EventsInfo />
    </div>
  );
}
