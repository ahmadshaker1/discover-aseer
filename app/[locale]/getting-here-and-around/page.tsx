import GettingHereAndAroundBanner from "@/components/Getting-here-and-around/GettingHereAndAroundBanner";
import TravelSection from "@/components/Getting-here-and-around/travelSection";
import TravelLandSection from "@/components/Getting-here-and-around/travelLandSection";

export default function GettingHereAndAround() {
  return (
    <div className="flex flex-col">
      <GettingHereAndAroundBanner />
      <TravelSection />
      <TravelLandSection />
    </div>
  );
}
