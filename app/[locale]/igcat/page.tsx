import React from "react";
import IGCatBannerSection from "@/components/igcat/bannerSection";
import IGCatBackgroundSection from "@/components/igcat/backgroundSection";
import IGCatEventCards from "@/components/igcat/eventCards";
import QuotesSection from "@/components/igcat/quotesSection";
import WinnersSection from "@/components/igcat/WinnersSection";
import FoodFilmSection from "@/components/igcat/FoodFilmSection";
import InitiativesSection from "@/components/igcat/InitiativesSection";
import FoodAndDiningSection from "@/components/igcat/FoodAndDiningSection";
export default function IGCatPage() {
  return (
    <main className="flex flex-col w-full">
      <IGCatBannerSection />
      <IGCatBackgroundSection />
      <IGCatEventCards />
      <QuotesSection />
      <WinnersSection />
      <FoodFilmSection />
      <InitiativesSection />
      <FoodAndDiningSection />
    </main>
  );
}
