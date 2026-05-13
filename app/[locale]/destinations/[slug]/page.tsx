import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import DestinationSlugCardsGrid from "@/components/destinations/DestinationSlugCardsGrid";
import {
  fetchDestinationsWithFallback,
  getDestinationBySlug,
} from "@/components/destinations/data";
import type { Destination } from "@/components/destinations/data";
import PageBanner from "@/components/PageBanner/PageBanner";

const TOUR_GUIDE_REGISTER_HREF = "/tour-guides/register";

const SLUG_HERO_IMAGE = "/assets/destinations/hero-destinations.png";

function cardsForSlugPage(destination: Destination, all: Destination[], slug: string): Destination[] {
  const related =
    destination.cityId != null && destination.cityId !== ""
      ? all.filter((d) => d.cityId === destination.cityId)
      : all.filter((d) => d.slug !== slug);

  const withoutSelf = related.filter((d) => d.slug !== slug);
  const list = withoutSelf.length > 0 ? withoutSelf : all.filter((d) => d.slug !== slug);
  return list.slice(0, 12);
}

interface DestinationSlugPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const DestinationSlugPage = async ({ params }: DestinationSlugPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const tCommon = await getTranslations("common");
  const tDest = await getTranslations("destinations");
  const tAttr = await getTranslations("attractionsPage");
  const { slug } = await params;
  const [destination, allDestinations] = await Promise.all([
    getDestinationBySlug(slug, locale),
    fetchDestinationsWithFallback(locale),
  ]);

  if (!destination) notFound();

  const gridDestinations = cardsForSlugPage(destination, allDestinations, slug);

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PageBanner
        breadcrumbs={[
          { label: destination.title },
          { label: tDest("breadcrumbDestinations"), href: "/destinations" },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={destination.title}
        subtitle={tCommon("subtitleOneVisit")}
        backgroundImage={SLUG_HERO_IMAGE}
        primaryCta={{
          href: TOUR_GUIDE_REGISTER_HREF,
          label: tAttr("contributeDestinations"),
        }}
      />

      <DestinationSlugCardsGrid destinations={gridDestinations} />
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
