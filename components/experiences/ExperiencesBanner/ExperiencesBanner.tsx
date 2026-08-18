import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import { fetchSiteAssets, getAssetUrl } from "@/lib/siteAssets";

export default async function ExperiencesBanner() {
  const locale = await getLocale();
  const t = await getTranslations("experiencesPage");
  const tCommon = await getTranslations("common");

  const assets = await fetchSiteAssets("experiences");
  const bannerUrl = getAssetUrl(
    assets,
    "Banner",
    "/assets/experiences/experiences.png",
  );

  return (
    <PageBanner
      breadcrumbs={[
        { label: tCommon("breadcrumbHome"), href: "/" },
        { label: t("breadcrumb") },
      ]}
      title={t("title")}
      subtitle={t("subtitle")}
      backgroundImage={bannerUrl}
    />
  );
}
