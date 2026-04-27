import React from "react";
import IGCatBannerSection from "@/components/igcat/bannerSection";
import IGCatBackgroundSection from "@/components/igcat/backgroundSection";
export default function IGCatPage() {
  return (
    <main className="flex flex-col w-full">
      <IGCatBannerSection />
      <IGCatBackgroundSection />
    </main>
  );
}
