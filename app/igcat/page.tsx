import React from "react";
import IGCatBannerSection from "@/components/igcat/bannerSection";
import IGCatBackgroundSection from "@/components/igcat/backgroundSection";
import IGCatEventCards from "@/components/igcat/eventCards";
import QuotesSection from "@/components/igcat/quotesSection";
export default function IGCatPage() {
  return (
    <main className="flex flex-col w-full">
      <IGCatBannerSection />
      <IGCatBackgroundSection />
      <IGCatEventCards />
      <QuotesSection />
    </main>
  );
}
