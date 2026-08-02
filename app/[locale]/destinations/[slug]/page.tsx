import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationsIntroSection from "@/components/destinations/DestinationsIntroSection";
import DestinationsLandmarksSection from "@/components/destinations/DestinationsLandmarksSection";
import DestinationsMapSection from "@/components/destinations/DestinationsMapSection";
import {
  fetchDestinations,
  getDestinationBySlug,
  resolveDestinationMapCenter,
} from "@/components/destinations/data";
import EventsInfo from "@/components/EventsInfo/EventsInfo";
import AttractionsLandmarksSection from "@/components/attractions/AttractionsLandmarksSection";
import { fetchAttractions } from "@/components/attractions/data";

interface DestinationSlugPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const DestinationSlugPage = async ({ params }: DestinationSlugPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const tCommon = await getTranslations("common");
  const tDest = await getTranslations("destinations");
  const { slug } = await params;
  const [destination, allDestinations, allAttractions] = await Promise.all([
    getDestinationBySlug(slug, locale),
    fetchDestinations(locale),
    fetchAttractions(locale as any),
  ]);

  if (!destination) notFound();

  const areaDestinations = allDestinations.filter(
    (d) => d.city === destination.city && d.slug !== destination.slug,
  );
  const cityAttractions = allAttractions.filter(
    (a) => a.city === destination.city,
  );
  const mapCenter = resolveDestinationMapCenter(destination);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <DestinationsHero
        breadcrumbs={[
          { label: tCommon("breadcrumbHome"), href: "/" },
          { label: tDest("breadcrumbDestinations"), href: "/destinations" },
          { label: destination.title },
        ]}
        title={destination.title}
        subtitle={destination.subtitle}
        backgroundImage={destination.image || "/assets/destinations/hero.jpeg"}
        weatherArea={destination.title}
        weatherLat={mapCenter.lat}
        weatherLon={mapCenter.lon}
      />

      <DestinationsIntroSection
        title={destination.displayCity}
        imageUrl={destination.introImage || destination.image}
        imageAlt={destination.title}
        paragraphs={[]}
        descriptionHtml={destination.description}
      />

      <DestinationsLandmarksSection
        destinations={areaDestinations}
        sectionTitle={tDest("landmarksSectionTitle", {
          area: destination.displayCity,
        })}
        excludeSlug={destination.slug}
      />

      {cityAttractions.length > 0 ? (
        <AttractionsLandmarksSection
          landmarks={cityAttractions}
          title={tDest("famousLandmarksTitle", {
            area: destination.displayCity,
          })}
          showFilters={false}
          featuredCount={4}
        />
      ) : null}

      <DestinationsMapSection
        areaLabel={destination.title}
        lat={mapCenter.lat}
        lon={mapCenter.lon}
      />

      <EventsInfo />
    </div>
  );
};

export async function generateStaticParams() {
  const rows = await fetchDestinations("ar");
  return rows.map((d) => ({ slug: d.slug }));
}

export default DestinationSlugPage;
