"use client";
import React, { useState } from "react";

// ==========================================
// بيانات الاقتباسات
// ==========================================
const quotesData = [
  {
    id: 0,
    name: "برفسورة ديان دود",
    role: "رئيس المعهد الدولي للطهي والثقافة والفنون والسياحة (IGCAT)",
    quote:
      "التعليم والتعاون الدولي هما المفتاح لتمكين المجتمعات، وضمان استدامة التراث الثقافي في فنون الطهي.",
  },
  {
    id: 1,
    name: "ميادة بدر",
    role: "الرئيس التنفيذي لهيئة فنون الطهي",
    quote:
      "نعمل بشغف لإبراز تراثنا الطهوي الأصيل وتقديمه للعالم كجزء لا يتجزأ من هويتنا الثقافية، وتمكين الأجيال القادمة.", // نص افتراضي للتجربة
  },
];

// ==========================================
// أيقونة الاقتباس (SVG)
// ==========================================

export default function QuotesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeQuote = quotesData[activeIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-secondary py-20 text-secondary-foreground dark:bg-muted dark:text-foreground"
    >
      {/* علامة التنصيص المائية الضخمة في الخلفية (يسار) */}

      {/* تدرج لوني خفيف لزيادة العمق (اختياري) */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent to-background/40 dark:to-background/60 opacity-50 pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 1. الكروت الجانبية (يمين الشاشة) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {quotesData.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full rounded-2xl p-6 text-start transition-all duration-300 ${
                    isActive
                      ? "scale-[1.02] bg-background text-foreground shadow-lg"
                      : "bg-black/20 text-inherit hover:bg-black/30 dark:bg-white/10 dark:hover:bg-white/15"
                  }`}
                >
                  <h3 className="text-[18px] font-bold mb-2">{item.name}</h3>
                  <p
                    className={`text-[13px] leading-relaxed ${isActive ? "text-muted-foreground" : "opacity-80"}`}
                  >
                    {item.role}
                  </p>
                </button>
              );
            })}
          </div>

          {/* 2. نص الاقتباس (يسار الشاشة) */}
          <div className="lg:col-span-8 flex flex-col items-start gap-6 lg:me-8">
            {/* أيقونة الاقتباس البنفسجية الفاقعة */}
            <img src="/assets/igcat/SVG.png" alt="quote" />
            {/* النص يتغير بتأثير انسيابي */}
            <p
              key={activeIndex} // الكي هنا عشان يسوي ريفريش للأنيميشن لما يتغير النص
              className="animate-fade-in-up text-[16px] font-medium leading-[1.8]"
            >
              {activeQuote.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
