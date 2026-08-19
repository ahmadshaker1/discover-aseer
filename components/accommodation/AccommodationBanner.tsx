import { getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import { fetchSiteAssets, getAssetUrl } from "@/lib/siteAssets";

export default async function AccommodationBanner() {
  const t = await getTranslations("accommodationPage");
  const tCommon = await getTranslations("common");
  const assets = await fetchSiteAssets("accommodation");
  const bannerUrl = getAssetUrl(
    assets,
    "Banner",
    "/assets/accommodation/accomodation-banner.webp",
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
      hidePattern
    />
  );
}
