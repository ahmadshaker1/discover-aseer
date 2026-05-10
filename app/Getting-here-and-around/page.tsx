import GettingHereAndAroundBanner from "@/components/Getting-here-and-around/GettingHereAndAroundBanner";
import TravelSection from "@/components/Getting-here-and-around/travelSection";
import TravelLandSection from "@/components/Getting-here-and-around/travelLandSection";
import { getLocale } from "next-intl/server";

export default async function GettingHereAndAround() {
  const locale = await getLocale();
  const isRtl = locale === "ar";

  if (!isRtl) {
    return (
      <div className="flex flex-col" dir="ltr" lang="en">
        <GettingHereAndAroundBanner />
        <section className="container mx-auto px-6 py-12">
          <h2 className="mb-4 text-4xl font-bold text-black">Getting around Aseer</h2>
          <p className="mb-6 text-lg text-[#4B5563]">
            Use flights, inter-city buses, taxis, ride-hailing apps, or rental cars to move across
            Aseer. Airports and road links cover key destinations and towns.
          </p>
          <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8F8F8] p-6">
            <p className="text-base text-[#111827]">
              We are localizing the full detailed English sections for this page. For now, all key
              transport options are listed in English and the page direction is left-to-right.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <GettingHereAndAroundBanner />
      <TravelSection />
      <TravelLandSection />
    </div>
  );
}
