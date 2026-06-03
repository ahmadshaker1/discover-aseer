import { getLocale, getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { fetchPointsOfInterest } from "./data";
import { PointsOfInterestCarousel } from "./PointsOfInterestCarousel";

export const PointsOfInterest = async () => {
  const locale = (await getLocale()) as AppLocale;
  const tHome = await getTranslations("home");
  const points = await fetchPointsOfInterest(locale);

  return (
    <PointsOfInterestCarousel
      points={points}
      sectionTitle={tHome("featuredDestinationsTitle")}
    />
  );
};

export default PointsOfInterest;
