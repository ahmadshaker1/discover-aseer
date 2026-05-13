"use client";
import React, { useState } from "react";
// استيراد البيانات
import { foodFilmData } from "./data";

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
    className="drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="12" fill="white" />
    <path
      d="M16.5 11.134C17.1667 11.5189 17.1667 12.4811 16.5 12.866L9.75 16.7631C9.08333 17.148 8.25 16.6669 8.25 15.8971L8.25 8.10288C8.25 7.33308 9.08333 6.85198 9.75 7.23686L16.5 11.134Z"
      fill="#240B48"
    />
  </svg>
);

// دالة استخراج الـ ID من رابط اليوتيوب
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function FoodFilmSection() {
  // State لحفظ ID الفيديو اللي شغال حالياً (null يعني ولا فيديو شغال)
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* 1. قسم العنوان والوصف (الهيدر) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          {/* الوصف (يسار) */}
          <div
            className="order-2 lg:order-1 w-full lg:w-1/2 text-start lg:text-start mt-4 lg:mt-0"
          >
            <p
              className="text-[#333] leading-relaxed text-[15px] max-w-xl ms-auto font-bold"
            >
              تقام المسابقة سنوياً لعرض مقاطع فيديو تروج للمعالم الثقافية
              والطبيعية حول العالم. فازت عسير بالجائزة مرتين في 2022 و2024،
              بمقاطع تُبرز جمال طبيعة المنطقة، كرم ضيافتها، وأطباقها التقليدية.
            </p>
          </div>
          {/* العنوان (يمين) */}
          <div className="flex flex-col items-start lg:items-end order-1 lg:order-2 w-full lg:w-1/2 text-start">
            <span className="inline-block px-5 py-1 border border-[#7300CD] text-[#7300CD] rounded-full text-[13px] font-bold mb-4">
              المسابقات
            </span>
            <h2
              className="text-[28px] md:text-[36px] font-bold text-black"
            >
              مسابقة Food Film Menu
            </h2>
          </div>
        </div>

        {/* 2. قسم الفيديوهات (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {foodFilmData.map((video) => (
            <div key={video.id} className="flex flex-col gap-4">
              {/* حاوية الفيديو / الصورة */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg bg-black group">
                {playingVideoId !== video.id ? (
                  // الغلاف قبل التشغيل
                  <div
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={() => setPlayingVideoId(video.id)}
                  >
                    {/* الصورة المحلية */}
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                    />

                    {/* تدرج لوني خفيف */}
                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30"></div>

                    {/* شارة السنة */}
                    <div className="absolute top-4 start-4 bg-white px-3 py-1 rounded-full shadow-sm z-10">
                      <span className="text-[#7300CD] font-bold text-[14px]">
                        {video.year}
                      </span>
                    </div>

                    {/* زر التشغيل في المنتصف */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <PlayIcon />
                    </div>
                  </div>
                ) : (
                  // الفيديو يشتغل بعد الضغط
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(video.youtubeUrl)}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  ></iframe>
                )}
              </div>

              {/* عنوان الفيديو تحت الكرت */}
              <h3 className="text-black font-bold text-[15px] md:text-[16px] text-center px-4 leading-relaxed line-clamp-2">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
