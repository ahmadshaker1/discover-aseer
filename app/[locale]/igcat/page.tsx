import IGCatBannerSection from "@/components/igcat/bannerSection";
import IGCatBackgroundSection from "@/components/igcat/backgroundSection";
import IGCatEventCards from "@/components/igcat/eventCards";
import QuotesSection from "@/components/igcat/quotesSection";
import WinnersSection from "@/components/igcat/WinnersSection";
import FoodFilmSection from "@/components/igcat/FoodFilmSection";
import InitiativesSection from "@/components/igcat/InitiativesSection";
import FoodAndDiningSection from "@/components/igcat/FoodAndDiningSection";
import { getLocale } from "next-intl/server";

export const revalidate = 300;

export default async function IGCatPage() {
  await getLocale();

  return (
    <main className="flex w-full flex-col bg-background text-foreground">
      <IGCatBannerSection />
      <IGCatBackgroundSection />
      <IGCatEventCards />
      <QuotesSection />
      <InitiativesSection />
      <WinnersSection />
      <FoodFilmSection />
      <FoodAndDiningSection />
    </main>
  );
}
