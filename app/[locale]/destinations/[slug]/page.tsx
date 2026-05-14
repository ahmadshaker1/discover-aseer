import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationsIntroSection from "@/components/destinations/DestinationsIntroSection";
import DestinationsLandmarksSection from "@/components/destinations/DestinationsLandmarksSection";
import DestinationsMapSection from "@/components/destinations/DestinationsMapSection";
import {
  fetchDestinations,
  filterDestinationsByArea,
  getDestinationBySlug,
  resolveDestinationMapCenter,
} from "@/components/destinations/data";
import type { Destination } from "@/components/destinations/data";
import EventsInfo from "@/components/events/EventsInfo/EventsInfo";

const ABHA_SLUG = "abha";

const INTRO_PARAGRAPH_KEYS = [
  "introP1",
  "introP2",
  "introP3",
  "introP4",
  "introP5",
  "introP6",
] as const;

/** Intro column image (heritage / city atmosphere) — Abha long copy uses curated art. */
const ABHA_INTRO_IMAGE = "/assets/destinations/hero-destinations.png";

function relatedLandmarkDestinations(
  destination: Destination,
  all: Destination[],
  slug: string,
): Destination[] {
  const related =
    destination.cityId != null && destination.cityId !== ""
      ? all.filter((d) => d.cityId === destination.cityId)
      : all.filter((d) => d.slug !== slug);

  const withoutSelf = related.filter((d) => d.slug !== slug);
  const list =
    withoutSelf.length > 0 ? withoutSelf : all.filter((d) => d.slug !== slug);
  return list.slice(0, 8);
}

interface DestinationSlugPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const DestinationSlugPage = async ({ params }: DestinationSlugPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const tCommon = await getTranslations("common");
  const tDest = await getTranslations("destinations");
  const { slug } = await params;
  const [destination, allDestinations] = await Promise.all([
    getDestinationBySlug(slug, locale),
    fetchDestinations(locale),
  ]);

  if (!destination) notFound();

  const areaDestinations = filterDestinationsByArea(
    allDestinations,
    destination.destinationFilter,
    destination.slug,
  );
  const mapCenter = resolveDestinationMapCenter(destination);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <DestinationsHero
        breadcrumbs={[
          { label: destination.title },
          { label: tDest("breadcrumbDestinations"), href: "/destinations" },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={destination.title}
        subtitle={destination.subtitle}
        backgroundImage={destination.image}
        weatherArea={destination.title}
        weatherLat={mapCenter.lat}
        weatherLon={mapCenter.lon}
      />

      <DestinationsIntroSection
        title={destination.city || destination.title}
        imageUrl={destination.introImage || destination.image}
        imageAlt={destination.title}
        paragraphs={[]}
        descriptionHtml={destination.description}
      />

      <DestinationsLandmarksSection
        destinations={areaDestinations}
        sectionTitle={destination.sectionTitle || destination.title}
        excludeSlug={destination.slug}
      />

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
