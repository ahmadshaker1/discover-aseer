"use client";
import React, { useState } from "react";

// تأكد إنك تمرر الأوبجكت حق الخطة (اللي يطلعه الذكاء الاصطناعي) لهذا المكون
export default function SaveAndSharePlan({
  currentPlan,
}: {
  currentPlan: any;
}) {
  const [shareUrl, setShareUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSavePlan = async () => {
    // إذا مافي خطة، لا تسوي شيء
    if (!currentPlan) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/planner/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_data: currentPlan }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "حدث خطأ أثناء الحفظ");
      }

      const generatedLink = `${window.location.origin}/planner/share/${result.id}`;
      setShareUrl(generatedLink);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("تم نسخ الرابط بنجاح! 📋");
  };

  return (
    <div className="">
      <button
        onClick={handleSavePlan}
        disabled={isLoading || !currentPlan}
        className="px-8 py-3 bg-[#7300CD] text-white rounded-full font-bold hover:bg-[#6027D2] transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {isLoading ? (
          "جاري حفظ الخطة..."
        ) : (
          <>
            {/* أيقونة مشاركة */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              ></path>
            </svg>
            حفظ ومشاركة الخطة
          </>
        )}
      </button>

      {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

      {/* يظهر الرابط فقط بعد الحفظ بنجاح */}
      {shareUrl && (
        <div className="w-full max-w-md p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-3">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="bg-transparent text-sm w-full outline-none text-left font-mono text-gray-600"
            dir="ltr"
          />
          <button
            onClick={copyToClipboard}
            className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-lg text-[#7300CD] font-bold whitespace-nowrap hover:bg-gray-100 transition-colors shadow-sm"
          >
            نسخ الرابط
          </button>
        </div>
      )}
    </div>
  );
}
