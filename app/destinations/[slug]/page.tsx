import { notFound } from "next/navigation";

import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationsIntroSection from "@/components/destinations/DestinationsIntroSection";
import DestinationsMapSection from "@/components/destinations/DestinationsMapSection";
import {
  fetchDestinationsWithFallback,
  getDestinationBySlug,
} from "@/components/destinations/data";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";

interface DestinationSlugPageProps {
  params: Promise<{ slug: string }>;
}

const DestinationSlugPage = async ({ params }: DestinationSlugPageProps) => {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) notFound();

  return (
    <div className="flex w-full flex-col bg-white">
      <DestinationsHero
        breadcrumbs={[
          { label: destination.title },
          { label: "الوجهات", href: "/destinations" },
          { label: "الصفحة الرئيسية", href: "/" },
        ]}
        title={destination.area || destination.title}
        subtitle=""
        backgroundImage={destination.image}
        weatherArea={destination.title}
        weatherLat={destination.lat}
        weatherLon={destination.lon}
      />

      <DestinationsIntroSection
        title={destination.area || destination.title}
        imageUrl={destination.image}
        imageAlt={destination.title}
        paragraphs={[]}
        descriptionHtml={destination.description}
        hideImage
        centerContent
      />

      <DestinationsMapSection
        areaLabel={destination.title}
        lat={destination.lat}
        lon={destination.lon}
      />

      <EventsInfo />
    </div>
  );
};

export async function generateStaticParams() {
  const rows = await fetchDestinationsWithFallback();
  return rows.map((d) => ({ slug: d.slug }));
}

export default DestinationSlugPage;

