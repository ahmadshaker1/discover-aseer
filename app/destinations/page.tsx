import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationsIntroSection from "@/components/destinations/DestinationsIntroSection";
import DestinationsLandmarksSection from "@/components/destinations/DestinationsLandmarksSection";
import DestinationsMapSection from "@/components/destinations/DestinationsMapSection";
import {
  DESTINATIONS_MAIN_INTRO_PARAGRAPHS,
  DESTINATIONS_MAIN_INTRO_TITLE,
} from "@/components/destinations/destinationsMainIntro";
import { fetchDestinationsWithFallback } from "@/components/destinations/data";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";

const DestinationsPage = async () => {
  const destinations = await fetchDestinationsWithFallback();

  return (
    <div className="flex w-full flex-col bg-white">
      <DestinationsHero
        breadcrumbs={[
          { label: "التجارب" },
          { label: "الصفحة الرئيسية", href: "/" },
        ]}
        title="أبها"
        subtitle="زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب."
        backgroundImage="/assets/destinations/hero-destinations.png"
        weatherArea="أبها"
        weatherLat={18.2164}
        weatherLon={42.5053}
      />

      <DestinationsIntroSection
        title={DESTINATIONS_MAIN_INTRO_TITLE}
        imageUrl="/assets/destinations/hero-destinations.png"
        imageAlt=""
        paragraphs={DESTINATIONS_MAIN_INTRO_PARAGRAPHS}
      />

      <DestinationsLandmarksSection destinations={destinations} />
      <DestinationsMapSection />
      <EventsInfo />
    </div>
  );
};

export default DestinationsPage;
