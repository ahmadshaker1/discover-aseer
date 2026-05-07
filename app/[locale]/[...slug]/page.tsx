import { notFound } from "next/navigation";

import AboutAseerPage from "@/app/about-aseer/page";
import AccommodationPage from "@/app/accommodation/page";
import AseerCommunityPage from "@/app/aseer-community/page";
import AseerCuisinePage from "@/app/aseer-cuisine/page";
import AttractionsInnerPage from "@/app/attractions/inner/page";
import AttractionsPage from "@/app/attractions/page";
import DestinationsBrowsePage from "@/app/destinations/browse/page";
import EventSeasonsPage from "@/app/event-seasons/page";
import EventsPage from "@/app/events/page";
import ExperiencesInnerPage from "@/app/experiences/[id]/page";
import ExperiencesPage from "@/app/experiences/page";
import FilmPage from "@/app/film/page";
import GettingHereAndAroundPage from "@/app/Getting-here-and-around/page";
import InteractiveMapPage from "@/app/interactive-map/page";
import LandmarksPage from "@/app/landmarks/page";
import PlannerPage from "@/app/planner/page";
import RestaurantsPage from "@/app/restaurants/page";
import ServicesSupportPage from "@/app/services-support/page";
import TourGuidesPage from "@/app/tour-guides/page";
import TourGuideRegisterPage from "@/app/tour-guides/register/page";
import TravelTipsPage from "@/app/travel-tips/page";

interface LocalizedCatchAllPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function LocalizedCatchAllPage({
  params,
}: LocalizedCatchAllPageProps) {
  const { slug } = await params;
  const key = slug.join("/");

  switch (key) {
    case "about-aseer":
      return <AboutAseerPage />;
    case "accommodation":
      return <AccommodationPage />;
    case "aseer-community":
      return <AseerCommunityPage />;
    case "aseer-cuisine":
      return <AseerCuisinePage />;
    case "attractions":
      return <AttractionsPage />;
    case "attractions/inner":
      return <AttractionsInnerPage />;
    case "destinations/browse":
      return <DestinationsBrowsePage />;
    case "event-seasons":
      return <EventSeasonsPage />;
    case "events":
      return <EventsPage />;
    case "experiences":
      return <ExperiencesPage />;
    case "film":
      return <FilmPage />;
    case "Getting-here-and-around":
      return <GettingHereAndAroundPage />;
    case "interactive-map":
      return <InteractiveMapPage />;
    case "landmarks":
      return <LandmarksPage />;
    case "planner":
      return <PlannerPage />;
    case "restaurants":
      return <RestaurantsPage />;
    case "services-support":
      return <ServicesSupportPage />;
    case "tour-guides":
      return <TourGuidesPage />;
    case "tour-guides/register":
      return <TourGuideRegisterPage />;
    case "travel-tips":
      return <TravelTipsPage />;
    default:
      break;
  }

  if (slug.length === 2 && slug[0] === "experiences") {
    return <ExperiencesInnerPage params={Promise.resolve({ id: slug[1] })} />;
  }

  notFound();
}

