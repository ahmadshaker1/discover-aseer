import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/PageBanner/PageBanner";
import { isExperiencesHiddenForLocale } from "@/lib/experiencesAvailability";

export default async function EventSeasonsHero() {
  const t = await getTranslations("eventSeasons");
  const tCommon = await getTranslations("common");
  const locale = await getLocale();
  const hideExperiences = isExperiencesHiddenForLocale(locale);

  return (
    <PageBanner
      breadcrumbs={[
        { label: tCommon("breadcrumbHome"), href: "/" },
        { label: t("breadcrumb") },
      ]}
      title={t("heroTitle")}
      subtitle={t("heroSubtitle")}
      backgroundImage="/assets/event-seasons/hero.png"
      primaryCta={
        hideExperiences
          ? undefined
          : {
              href: "/experiences/submit",
              label: t("addYourEvent"),
            }
      }
    />
  );
}
