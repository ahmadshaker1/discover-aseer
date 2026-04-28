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
      className="relative w-full py-20 overflow-hidden bg-[#240B48]"
      dir="rtl"
    >
      {/* علامة التنصيص المائية الضخمة في الخلفية (يسار) */}

      {/* تدرج لوني خفيف لزيادة العمق (اختياري) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a0835] opacity-50 pointer-events-none"></div>

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
                  className={`text-right p-6 rounded-2xl transition-all duration-300 w-full ${
                    isActive
                      ? "bg-white text-black shadow-lg scale-[1.02]"
                      : "bg-[#492965]/40 text-white hover:bg-[#3A1B6B]/60"
                  }`}
                >
                  <h3 className="text-[18px] font-bold mb-2">{item.name}</h3>
                  <p
                    className={`text-[13px] leading-relaxed ${isActive ? "text-gray-600" : "text-gray-300"}`}
                  >
                    {item.role}
                  </p>
                </button>
              );
            })}
          </div>

          {/* 2. نص الاقتباس (يسار الشاشة) */}
          <div className="lg:col-span-8 flex flex-col items-start gap-6 lg:mr-8">
            {/* أيقونة الاقتباس البنفسجية الفاقعة */}
            <img src="assets/igcat/SVG.png" alt="quote" />
            {/* النص يتغير بتأثير انسيابي */}
            <p
              key={activeIndex} // الكي هنا عشان يسوي ريفريش للأنيميشن لما يتغير النص
              className="text-white  text-[16px] leading-[1.8] font-medium animate-fade-in-up"
            >
              {activeQuote.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
