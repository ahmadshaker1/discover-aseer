import ContactUsFlow from "@/components/contact/ContactUsFlow";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("contactUs");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
};

const ContactUsPage = () => {
  return <ContactUsFlow />;
};

export default ContactUsPage;
