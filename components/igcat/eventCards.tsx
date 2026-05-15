"use client";
import React, { useState } from "react";

// ==========================================
// Dummy Data (بيانات وهمية للتجربة)
// ==========================================
const dummyEvents = [
  {
    id: 1,
    tabTopLine: "اليوم السابع",
    tabBottomLine: "18 ديسمبر",
    title: "اجتماع الخبراء العاشر في عسير",
    description:
      "استضافت منطقة عسير الاجتماع السابع والعشرين لمنصة مناطق فنون الطهي العالمية، حيث اجتمع 20 خبيراً دولياً من 11 منطقة حائزة على جوائز لتبادل أفضل الممارسات واستكشاف الثقافة المحلية. شهد هذا الحدث الفريد الذي عقد لأول مرة خارج أوروبا، مناقشات وورش عمل مميزة حول دور الطهي في التنمية المحلية وتعزيز الاستدامة.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    tabTopLine: "اليوم السادس",
    tabBottomLine: "18 ديسمبر",
    title: "مهرجان قمم الدولي للفنون الأدائية الجبلية",
    description:
      "انطلق مهرجان قمم الدولي في نسخته الجديدة بمشاركة فرق محلية ودولية تقدم عروضاً أدائية جبلية تعكس التراث الثقافي المتنوع. يتضمن المهرجان فعاليات مصاحبة مثل معارض الحرف اليدوية والطهي الحي للأطباق التقليدية.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    tabTopLine: "أبريل",
    tabBottomLine: "2026",
    title: "معرض عسير للثقافة والتراث",
    description:
      "معرض شامل يسلط الضوء على تاريخ منطقة عسير، هندستها المعمارية الفريدة (القط العسيري)، والمنتجات الزراعية المحلية. فرصة رائعة للزوار للتفاعل مع الحرفيين المحليين وتجربة صناعة التحف.",
    image:
      "https://images.unsplash.com/photo-1551556729-c8fea4384b07?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    tabTopLine: "أبريل",
    tabBottomLine: "2026",
    title: "بطولة الطيران الشراعي",
    description:
      "تستقطب سماء السودة محترفي الطيران الشراعي من مختلف أنحاء العالم في بطولة مليئة بالتشويق والمغامرة، مع إطلالات بانورامية خلابة على جبال السروات الشاهقة.",
    image:
      "https://images.unsplash.com/photo-1533587635639-6cb9d6ec11f7?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function IGCatEventCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  // الفعالية المحددة حالياً
  const activeEvent = dummyEvents[activeIndex];

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* 1. العنوان والتاق */}
        <div className="flex flex-col items-start   mb-10 text-start">
          <span className="mb-4 inline-block rounded-full border border-primary px-5 py-1 text-[14px] font-bold text-primary">
            ملتقى عالمي
          </span>
          <h2 className="text-[32px] font-bold text-foreground md:text-[40px]">
            أبرز الفعاليات
          </h2>
        </div>

        {/* 2. شريط التبويبات (الأزرار) */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 mb-8 hide-scrollbar justify-start"
          style={{ scrollbarWidth: "none" }}
        >
          {dummyEvents.map((event, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={event.id}
                onClick={() => setActiveIndex(index)}
                className={`flex shrink-0 flex-col items-center justify-center h-[90px] w-[90px] rounded-3xl border transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-foreground hover:border-muted-foreground"
                }`}
              >
                <span className="text-[14px] font-bold text-center leading-tight">
                  {event.tabTopLine}
                  <br />
                  <span className="text-[12px] font-normal">
                    {event.tabBottomLine}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* 3. بطاقة الفعالية الكبيرة (Hero Card) */}
        {activeEvent && (
          <div className="group relative h-[380px] w-full overflow-hidden rounded-4xl shadow-lg md:h-[380px]">
            {/* الصورة */}
            <img
              src={activeEvent.image}
              alt={activeEvent.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* تدرج لوني أسود من الأسفل عشان النص الأبيض يكون واضح */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

            {/* محتوى النص */}
            <div className="absolute bottom-0 end-0 p-6 md:p-10 text-start w-full md:w-3/4 lg:w-2/3 z-10">
              <h3 className="text-[24px] md:text-[32px] font-bold text-white mb-4">
                {activeEvent.title}
              </h3>
              <p className="text-[14px] md:text-[16px] text-gray-200 leading-[1.8] line-clamp-3 md:line-clamp-none">
                {activeEvent.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
