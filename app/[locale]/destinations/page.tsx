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
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations();
  const destinations = await fetchDestinationsWithFallback(locale);

  return (
    <div className="flex w-full flex-col bg-white">
      <DestinationsHero
        breadcrumbs={[
          { label: locale === "ar" ? "الوجهات" : "Destinations" },
          { label: t("common.home"), href: "/" },
        ]}
        title={locale === "ar" ? "أبها" : "Abha"}
        subtitle={
          locale === "ar"
            ? "زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب."
            : "One visit is never enough with all the activities and experiences."
        }
        backgroundImage="/assets/destinations/hero-destinations.png"
        weatherArea={locale === "ar" ? "أبها" : "Abha"}
        weatherLat={18.2164}
        weatherLon={42.5053}
      />

      <DestinationsIntroSection
        title={locale === "ar" ? DESTINATIONS_MAIN_INTRO_TITLE : "City of fog"}
        imageUrl="/assets/destinations/hero-destinations.png"
        imageAlt=""
        paragraphs={
          locale === "ar"
            ? DESTINATIONS_MAIN_INTRO_PARAGRAPHS
            : ["Aseer offers mountain landscapes, temperate weather and rich cultural depth."]
        }
      />

      <DestinationsLandmarksSection destinations={destinations} />
      <DestinationsMapSection areaLabel={locale === "ar" ? "أبها" : "Abha"} />
      <EventsInfo />
    </div>
  );
};

export default DestinationsPage;

