import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import TourGuideResetPasswordConfirm from "@/components/tour-guides/TourGuidePortal/TourGuideResetPasswordConfirm";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("tourGuidePortal");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
};

export default function TourGuideResetPasswordConfirmPage() {
  return (
    <div className="w-full px-4 pb-24 pt-50 sm:px-6 sm:pb-28 md:px-10 lg:px-8 lg:pb-32">
      <Suspense fallback={null}>
        <TourGuideResetPasswordConfirm />
      </Suspense>
    </div>
  );
}
