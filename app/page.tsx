import Hero from "@/components/Hero/Hero";
import DiscoverAseer from "@/components/DiscoverAseer/DiscoverAseer";
import PointsOfInterest from "@/components/PointsOfInterest/PointsOfInterest";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <DiscoverAseer />
      <PointsOfInterest />
    </div>
  );
}
