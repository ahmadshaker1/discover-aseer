"use client"; // ضروري في Next.js لأننا نستخدم State و useEffect
import React, { useState, useEffect } from "react";

// أيقونة سهولة الوصول (Accessibility)
const AccessibilityIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="4" r="2"></circle>
    <path d="m18 19-3-9-3 2-3-2-3 9"></path>
    <path d="M5 8h14"></path>
    <path d="m10 22-2-5-2 5"></path>
    <path d="m14 22 2-5 2 5"></path>
  </svg>
);

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // الحجم الطبيعي للخط هو 100%
  const [fontScale, setFontScale] = useState(100);

  // تحديث حجم الخط في كامل الموقع عند تغيير fontScale
  useEffect(() => {
    // نغير الـ fontSize في الـ html tag
    document.documentElement.style.fontSize = `${fontScale}%`;

    // اختياري: تقدر تحفظ القيمة في localStorage عشان لو حدث الصفحة يبقى الخط كبير
    // localStorage.setItem('a11y-font-scale', fontScale.toString());
  }, [fontScale]);

  // دوال التحكم بالخط (حطينا حدود عشان ما يصير الخط عملاق أو صغير جداً ويخرب الموقع)
  const increaseFont = () => setFontScale((prev) => Math.min(prev + 10, 140)); // الحد الأقصى 140%
  const decreaseFont = () => setFontScale((prev) => Math.max(prev - 10, 80)); // الحد الأدنى 80%
  const resetFont = () => setFontScale(100);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" dir="rtl">
      {/* اللوحة (تظهر فقط إذا كان isOpen true) */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-5 mb-2 w-[260px] border border-gray-100 animate-fade-in-up">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h3 className="font-bold text-[16px] text-gray-800">
              سهولة الوصول
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-red-500 text-lg"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[14px] text-gray-600 font-medium">
              حجم النص
            </span>

            {/* أزرار التحكم */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2 border border-gray-100">
              <button
                onClick={increaseFont}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-xl text-[#7300CD] hover:bg-[#F3EFFF] transition-colors"
                aria-label="تكبير الخط"
              >
                +
              </button>

              <span className="font-bold text-gray-700 select-none">
                {fontScale}%
              </span>

              <button
                onClick={decreaseFont}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-xl text-[#7300CD] hover:bg-[#F3EFFF] transition-colors"
                aria-label="تصغير الخط"
              >
                -
              </button>
            </div>

            {/* زر إعادة الضبط */}
            {fontScale !== 100 && (
              <button
                onClick={resetFont}
                className="text-[13px] text-[#7300CD] hover:underline mt-1 self-start"
              >
                إعادة الضبط
              </button>
            )}
          </div>
        </div>
      )}

      {/* الزر العائم الأساسي */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#7300CD] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#6027D2] transition-transform hover:scale-105"
        aria-label="خيارات سهولة الوصول"
      >
        <AccessibilityIcon />
      </button>
    </div>
  );
}
