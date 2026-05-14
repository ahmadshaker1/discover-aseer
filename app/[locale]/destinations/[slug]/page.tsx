import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import DestinationsIntroSection from "@/components/destinations/DestinationsIntroSection";
import DestinationsLandmarksSection from "@/components/destinations/DestinationsLandmarksSection";
import DestinationsMapSection from "@/components/destinations/DestinationsMapSection";
import {
  fetchDestinationsWithFallback,
  getDestinationBySlug,
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
  const list = withoutSelf.length > 0 ? withoutSelf : all.filter((d) => d.slug !== slug);
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
    fetchDestinationsWithFallback(locale),
  ]);

  if (!destination) notFound();

  const isAbha = slug === ABHA_SLUG;
  const introTitle = isAbha ? tDest("introTitle") : destination.location.trim() || destination.area || destination.title;
  const introParagraphs = isAbha ? INTRO_PARAGRAPH_KEYS.map((key) => tDest(key)) : [];
  const landmarksHeading = isAbha
    ? tDest("landmarksSectionTitle")
    : tDest("landmarksSectionCityTitle", { city: destination.title });

  const landmarkCards = relatedLandmarkDestinations(destination, allDestinations, slug);

  const defaultAbhaLat = 18.2164;
  const defaultAbhaLon = 42.5053;

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <DestinationsHero
        breadcrumbs={[
          { label: destination.title },
          { label: tDest("breadcrumbDestinations"), href: "/destinations" },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={destination.title}
        subtitle=""
        backgroundImage={destination.image}
        weatherArea={destination.title}
        weatherLat={destination.lat ?? defaultAbhaLat}
        weatherLon={destination.lon ?? defaultAbhaLon}
      />

      <DestinationsIntroSection
        title={introTitle}
        imageUrl={isAbha ? ABHA_INTRO_IMAGE : destination.image}
        imageAlt={destination.title}
        paragraphs={introParagraphs}
        descriptionHtml={isAbha ? undefined : destination.description}
        hideImage={!isAbha && !destination.image}
        centerContent={!isAbha && !destination.image}
      />

      <DestinationsLandmarksSection
        destinations={landmarkCards}
        sectionHeading={landmarksHeading}
        showBrowseMoreLink={false}
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
  const [ar, en] = await Promise.all([
    fetchDestinationsWithFallback("ar"),
    fetchDestinationsWithFallback("en"),
  ]);
  const slugs = new Set([...ar, ...en].map((d) => d.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default DestinationSlugPage;
