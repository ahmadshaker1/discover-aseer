import type { Metadata } from "next";
import ExperienceSubmitFlow from "@/components/experiences/submit/ExperienceSubmitFlow";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("experienceSubmit");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
};

const ExperienceSubmitPage = () => {
  return <ExperienceSubmitFlow />;
};

export default ExperienceSubmitPage;
