import { getLocale, getTranslations } from "next-intl/server";
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
  const locale = await getLocale();
  const tCommon = await getTranslations("common");
  const tDest = await getTranslations("destinations");
  const destinations = await fetchDestinationsWithFallback();

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <DestinationsHero
        breadcrumbs={[
          { label: tDest("breadcrumbDestinations") },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={tDest("heroTitleAbha")}
        subtitle={tDest("heroSubtitleAbha")}
        backgroundImage="/assets/destinations/hero-destinations.png"
        weatherArea={tDest("heroTitleAbha")}
        weatherLat={18.2164}
        weatherLon={42.5053}
      />

      <DestinationsIntroSection
        title={tDest("introTitle")}
        imageUrl="/assets/destinations/hero-destinations.png"
        imageAlt=""
        paragraphs={locale === "ar" ? DESTINATIONS_MAIN_INTRO_PARAGRAPHS : [tDest("introBody")]}
      />

      <DestinationsLandmarksSection destinations={destinations} />
      <DestinationsMapSection />
      <EventsInfo />
    </div>
  );
};

export default DestinationsPage;
