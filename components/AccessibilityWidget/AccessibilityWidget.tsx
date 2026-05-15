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
    <div className="fixed bottom-6 end-6 z-9999">
      {/* اللوحة (تظهر فقط إذا كان isOpen true) */}
      {isOpen && (
        <div className="absolute bottom-16 end-0 bg-surface rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-5 mb-2 w-[260px] border border-border animate-fade-in-up">
          <div className="flex justify-between items-center border-b border-border pb-3 mb-4">
            <h3 className="font-bold text-[16px] text-foreground">
              سهولة الوصول
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-red-500 text-lg"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[14px] text-muted-foreground font-medium">
              حجم النص
            </span>

            {/* أزرار التحكم */}
            <div className="flex items-center justify-between bg-muted rounded-xl p-2 border border-border">
              <button
                onClick={increaseFont}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-xl text-primary shadow-sm transition-colors hover:bg-primary/10"
                aria-label="تكبير الخط"
              >
                +
              </button>

              <span className="font-bold text-foreground select-none">
                {fontScale}%
              </span>

              <button
                onClick={decreaseFont}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-xl text-primary shadow-sm transition-colors hover:bg-primary/10"
                aria-label="تصغير الخط"
              >
                -
              </button>
            </div>

            {/* زر إعادة الضبط */}
            {fontScale !== 100 && (
              <button
                onClick={resetFont}
                className="mt-1 self-start text-[13px] text-primary hover:underline"
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
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:opacity-90"
        aria-label="خيارات سهولة الوصول"
      >
        <AccessibilityIcon />
      </button>
    </div>
  );
}
