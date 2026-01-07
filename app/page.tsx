import Hero from "@/components/Hero/Hero";
import LandmarksHighlight from "@/components/landmarks/LandmarksHighlight";
import RestaurantsHighlight from "@/components/restaurants/RestaurantsHighlight";
import PointsOfInterest from "@/components/PointsOfInterest/PointsOfInterest";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";
import RecipesSection from "@/components/recipes/RecipesSection";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Hero />
        <LandmarksHighlight />
        <RestaurantsHighlight />
        <PointsOfInterest />
        <RecipesSection />
        <EventsInfo />
      </div>
    </>
  );
}
