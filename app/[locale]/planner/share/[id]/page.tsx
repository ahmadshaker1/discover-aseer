import React from "react";
import ScheduleDisplay from "@/components/planner/ScheduleDisplay";
import { directusCollectionFetch } from "@/lib/directus/collectionCache";

// دالة جلب البيانات من دايركتس
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
    console.error("خطأ في جلب الخطة:", error);
    return null;
  }
}

// 🌟 التعديل هنا: عرفنا params كـ Promise
export default async function SharedPlanPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  // 🌟 التعديل السحري: نفك الـ Promise أولاً
  const resolvedParams = await params;

  // الآن نقدر نستخدم resolvedParams.id و resolvedParams.locale بأمان
  const planItem = await getSavedPlan(resolvedParams.id);

  if (!planItem) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
        dir="rtl"
      >
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          عذراً، هذه الخطة غير موجودة!
        </h1>
        <p className="text-gray-600 text-lg">
          قد يكون الرابط خاطئاً أو تم حذف الخطة.
        </p>
        <a
          href={`/${resolvedParams.locale}`}
          className="mt-8 px-6 py-2 bg-[#7300CD] text-white rounded-full font-bold"
        >
          العودة للصفحة الرئيسية
        </a>
      </div>
    );
  }

  const planData = planItem.plan_data;

  return (
    <div className="min-h-screen bg-white py-16" dir="rtl">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-10 text-center">
          <span className="text-sm px-4 py-1 rounded-full bg-purple-50 text-[#7300CD] font-bold">
            خطة سفر مقترحة
          </span>
          <h1 className="text-4xl font-bold mt-4 text-black">
            مرحباً بك في رحلتك إلى عسير
          </h1>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <ScheduleDisplay schedule={planData} />
        </div>
      </div>
    </div>
  );
}
