import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";

export default async function ExperiencesBanner() {
  const locale = await getLocale();
  const t = await getTranslations("experiencesPage");
  const tCommon = await getTranslations("common");

  let bannerUrl = "/assets/experiences/experiences.png";
  try {
    const res = await fetch(
      "https://tool-portal.discoveraseer.com/items/site_assets?filter[page][_eq]=experiences",
      { cache: "no-store" },
    );
    if (res.ok) {
      const data = await res.json();
      const assets = data.data || [];
      const bannerAsset = assets.find(
        (a: any) => a.key && a.key.toLowerCase().trim() === "banner",
      );
      if (bannerAsset) {
        bannerUrl = `https://tool-portal.discoveraseer.com/assets/${bannerAsset.file}`;
      }
    }
  } catch (error) {
    console.error("Failed to fetch experiences banner", error);
  }

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
