import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import CuisineItemIntroSection from "@/components/aseer-cuisine/CuisineItemIntroSection";
import CuisineSlugHero from "@/components/aseer-cuisine/CuisineSlugHero";
import { fetchCuisineItems, getCuisineBySlug } from "@/components/aseer-cuisine/data";
import EventsInfo from "@/components/EventsInfo/EventsInfo";

export const revalidate = 300;

interface CuisineSlugPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const CuisineSlugPage = async ({ params }: CuisineSlugPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations();
  const tCuisine = await getTranslations("aseerCuisine");
  const { slug } = await params;
  const item = await getCuisineBySlug(slug, locale);

  if (!item) notFound();

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <CuisineSlugHero
        breadcrumbs={[
          { label: item.title },
          { label: tCuisine("breadcrumbCuisine"), href: "/aseer-cuisine" },
          { label: t("common.home"), href: "/" },
        ]}
        title={item.title}
        backgroundImage={item.heroImage}
      />

      <CuisineItemIntroSection
        subtitle={item.subtitle}
        subtitlePurple={item.subtitlePurple}
        heroContent={item.heroContent}
        imageUrl={item.heroImage}
        imageAlt={item.title}
        contentHtml={item.content}
        extraContentHtml={item.extraContent}
      />

      <EventsInfo />
    </div>
  );
};

export async function generateStaticParams() {
  const rows = await fetchCuisineItems({ locale: "ar" });
  return rows.map((item) => ({ slug: item.slug }));
}

export default CuisineSlugPage;
