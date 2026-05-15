import React from "react";

// ==========================================
// بيانات الكروت (تقدر تغير مسارات الصور من هنا مباشرة)
// ==========================================
const initiativesData = [
  {
    id: 1,
    title: "سوق السفر العربي (ATM)",
    // حط مسار صورتك هنا، أو سوي لها import فوق وحط المتغير هنا
    image: "/assets/igcat/asf-atm.jpg",
  },
  {
    id: 2,
    title: "المنتدى السعودي للسياحة (STF)",
    // حط مسار صورتك هنا
    image: "/assets/igcat/asf-atm.jpg",
  },
  {
    id: 3,
    title: "رالي دكار",
    // حط مسار صورتك هنا
    image: "/assets/igcat/ralydakar.jpg",
  },
];

export default function InitiativesSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* 1. قسم الشعار والعنوان */}
        <div className="flex flex-col items-center justify-center mb-12">
          {/* استبدل الرابط بمسار شعار جامعة الملك خالد */}
          <img
            src="/assets/igcat/image8.png"
            alt="جامعة الملك خالد"
            className="h-24 md:h-32 object-contain mb-6"
          />
          <h2 className="text-[20px] font-bold text-foreground md:text-[24px]">
            مبادرات جامعة الملك خالد
          </h2>
        </div>

        {/* 2. شبكة الكروت (3 كروت) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {initiativesData.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden group shadow-md"
            >
              {/* الصورة الخلفية للكرت */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* تدرج لوني أسود من الأسفل عشان النص الأبيض يكون مقروء */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90"></div>

              {/* عنوان الكرت بالأسفل */}
              <div className="absolute bottom-0 start-0 end-0 p-6 md:p-8 flex items-end justify-center text-center z-10 h-1/2">
                <h3 className="text-white font-bold text-[18px] md:text-[22px] leading-snug drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
