import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import AttractionsMainPageContent from "@/components/attractions/AttractionsMainPageContent";
import { fetchLandmarks } from "@/components/landmarks/data";
import { FALLBACK_ATTRACTIONS } from "@/components/landmarks/fallbackAttractions";
import { isValidAttractionsCityId } from "@/components/landmarks/filterOptions";
import type { LocaleCode } from "@/lib/i18n/localized";

function firstQueryValue(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

type AttractionsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const AttractionsPage = async ({ searchParams }: AttractionsPageProps) => {
  const locale = (await getLocale()) as LocaleCode;
  const t = await getTranslations("attractionsPage");
  const tCommon = await getTranslations("common");

  const sp = (await Promise.resolve(searchParams ?? {})) as Record<
    string,
    string | string[] | undefined
  >;
  const cityParam = firstQueryValue(sp.city);
  const initialCityId =
    cityParam && isValidAttractionsCityId(cityParam) ? cityParam : null;

  /**
   * Backend handoff:
   * - This is the main attractions listing page opened from the navbar.
   * - Main attractions list uses Directus data from `fetchLandmarks()`.
   * - `FALLBACK_ATTRACTIONS` keeps the UI available when API is empty.
   * - Optional `?city=` matches filter city ids (`filterOptions` CITY_DEFS).
   */
  const landmarks = await fetchLandmarks(locale);
  const displayLandmarks = landmarks.length > 0 ? landmarks : FALLBACK_ATTRACTIONS;

  return (
    <div className="flex w-full flex-col bg-background text-foreground">
      <PageBanner
        breadcrumbs={[
          { label: t("breadcrumb") },
          { label: tCommon("breadcrumbHome"), href: "/" },
        ]}
        title={t("title")}
        subtitle={tCommon("subtitleOneVisit")}
        backgroundImage="/assets/attractions/attractions-hero.png"
      />

      <AttractionsMainPageContent
        landmarks={displayLandmarks}
        initialCityId={initialCityId}
      />
    </div>
  );
};

export default AttractionsPage;
