import Hero from "@/components/Hero/Hero";
import LandmarksHighlight from "@/components/landmarks/LandmarksHighlight";
import RestaurantsHighlight from "@/components/restaurants/RestaurantsHighlight";
import PointsOfInterest from "@/components/PointsOfInterest/PointsOfInterest";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Hero />
        <LandmarksHighlight />
        <RestaurantsHighlight />
        <PointsOfInterest />
        <EventsInfo />
      </div>
    </>
  );
}
