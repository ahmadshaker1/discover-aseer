import type { Metadata } from "next";
import ExperienceSubmitFlow from "@/components/experiences/submit/ExperienceSubmitFlow";
import { isExperiencesHiddenForLocale } from "@/lib/experiencesAvailability";
import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("experienceSubmit");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
};

const ExperienceSubmitPage = async () => {
  const locale = await getLocale();
  if (isExperiencesHiddenForLocale(locale)) {
    redirect("/zh");
  }
  return <ExperienceSubmitFlow />;
};

export default ExperienceSubmitPage;
