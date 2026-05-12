"use client";
import React, { useState } from "react";
// تأكد من تعديل مسار الاستيراد بناءً على مكان ملف Data.ts عندك
import { winnersData, videoSectionData } from "./data";

// ==========================================
// أيقونة زر التشغيل (Play Button)
// ==========================================
const PlayIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="white" />
    <path
      d="M16.5 11.134C17.1667 11.5189 17.1667 12.4811 16.5 12.866L9.75 16.7631C9.08333 17.148 8.25 16.6669 8.25 15.8971L8.25 8.10288C8.25 7.33308 9.08333 6.85198 9.75 7.23686L16.5 11.134Z"
      fill="#240B48"
    />
  </svg>
);

export default function WinnersSection() {
  // State للتحكم بتشغيل الفيديو
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* 1. عنوان القسم */}
        <h2 className="text-center text-[24px] md:text-[32px] font-bold text-black mb-12">
          الفائزون بتحدي هدايا الطعام العالمية 2023 - 2024
        </h2>

        {/* 2. شريط كروت الفائزين (Horizontal Scroll) */}
        <div
          className="flex gap-4 md:gap-6 overflow-x-auto pb-6 hide-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {winnersData.map((winner) => (
            <div
              key={winner.id}
              className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[350px] rounded-2xl overflow-hidden group shadow-md"
            >
              {/* صورة الكرت */}
              <img
                src={winner.image}
                alt={winner.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* تدرج لوني أسود من الأسفل للنص */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>

              {/* شارة السنة (مثلاً 2024) في الزاوية اليسرى العلوية */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-200">
                <span className="text-[#7300CD] font-bold text-[13px]">
                  {winner.year}
                </span>
              </div>

              {/* محتوى النص بالأسفل */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-right z-10">
                <h3 className="text-white font-bold text-[16px] md:text-[18px] mb-2 leading-tight">
                  {winner.title}
                </h3>
                <p className="text-gray-300 text-[13px] line-clamp-2 leading-relaxed">
                  {winner.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. قسم الفيديو */}
        <div className="mt-12 w-full">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl bg-black">
            {!isVideoPlaying ? (
              // الغلاف وزر التشغيل (يظهر قبل الضغط)
              <div
                className="absolute inset-0 w-full h-full cursor-pointer group"
                onClick={() => setIsVideoPlaying(true)}
              >
                <img
                  src="./assets/igcat/Screenshot 2026-05-04 112415.png"
                  alt="فيديو عن الفائزين"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
                {/* تدرج خفيف فوق صورة الفيديو */}
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40"></div>

                {/* زر التشغيل في المنتصف */}
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <PlayIcon />
                </div>
              </div>
            ) : (
              // الـ iframe الخاص باليوتيوب (يظهر بعد الضغط ويشتغل تلقائياً)
              <iframe
                src={`${videoSectionData.youtubeUrl}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
