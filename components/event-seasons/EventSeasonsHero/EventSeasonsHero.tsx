import { getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";

export default async function EventSeasonsHero() {
  const t = await getTranslations("eventSeasons");
  const tCommon = await getTranslations("common");

  return (
    <PageBanner
      breadcrumbs={[
        { label: tCommon("breadcrumbHome"), href: "/" },
        { label: t("breadcrumb") },
      ]}
      title={t("heroTitle")}
      subtitle={t("heroSubtitle")}
      backgroundImage="/assets/event-seasons/hero.png"
      primaryCta={{
        href: "/experiences/submit",
        label: t("addYourEvent"),
      }}
    />
  );
}
