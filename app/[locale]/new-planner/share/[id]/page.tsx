import React from "react";
import PlanItinerary from "@/components/new-planner/results/PlanItinerary";
import { getTranslations } from "next-intl/server";
import { directusCollectionFetch } from "@/lib/directus/collectionCache";

// Fetch data from Directus
async function getSavedPlan(id: string) {
  try {
    const response = await fetch(
      `https://tool-portal.discoveraseer.com/items/saved_plans/${id}?fields=id,plan_data`,
      directusCollectionFetch,
    );
    if (!response.ok) return null;
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching saved plan:", error);
    return null;
  }
}

export default async function SharedPlanPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolvedParams = await params;
  const planItem = await getSavedPlan(resolvedParams.id);

  if (!planItem) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#14091F]"
        dir={resolvedParams.locale === "ar" ? "rtl" : "ltr"}
      >
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          {resolvedParams.locale === "ar"
            ? "عذراً، هذه الخطة غير موجودة!"
            : "Sorry, this plan does not exist!"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {resolvedParams.locale === "ar"
            ? "قد يكون الرابط خاطئاً أو تم حذف الخطة."
            : "The link might be broken or the plan was deleted."}
        </p>
        <a
          href={`/${resolvedParams.locale}`}
          className="mt-8 px-6 py-2 bg-[#7300CD] text-white rounded-full font-bold"
        >
          {resolvedParams.locale === "ar"
            ? "العودة للصفحة الرئيسية"
            : "Return to Home Page"}
        </a>
      </div>
    );
  }

  const planData = planItem.plan_data;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: "Planner",
  });

  return (
    <div
      className="min-h-screen mt-20 bg-white dark:bg-[#14091F] py-16"
      dir={resolvedParams.locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 max-w-[800px]">
        <div className="mb-10 text-center">
          <span className="text-sm px-4 py-1 rounded-full bg-purple-50 text-[#7300CD] font-bold">
            {resolvedParams.locale === "ar"
              ? "خطة سفر مقترحة"
              : "Suggested Trip Plan"}
          </span>
          <h1 className="text-4xl font-bold mt-4 text-black dark:text-white">
            {resolvedParams.locale === "ar"
              ? "مرحباً بك في رحلتك إلى عسير"
              : "Welcome to your trip to Aseer"}
          </h1>
        </div>

        <PlanItinerary data={planData} />
      </div>
    </div>
  );
}
