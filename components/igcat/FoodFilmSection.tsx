"use client";
import React, { useState } from "react";
// استيراد البيانات
import { foodFilmData } from "./data";
import { PlayIcon } from "./Icons";

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
    <section className="bg-surface py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* 1. قسم العنوان والوصف (الهيدر) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          {/* الوصف (يسار) */}
          <div
            className="order-2 lg:order-1 w-full lg:w-1/2 text-start lg:text-start mt-4 lg:mt-0"
          >
            <p
              className="ms-auto max-w-xl text-[15px] font-bold leading-relaxed text-muted-foreground"
            >
              تقام المسابقة سنوياً لعرض مقاطع فيديو تروج للمعالم الثقافية
              والطبيعية حول العالم. فازت عسير بالجائزة مرتين في 2022 و2024،
              بمقاطع تُبرز جمال طبيعة المنطقة، كرم ضيافتها، وأطباقها التقليدية.
            </p>
          </div>
          {/* العنوان (يمين) */}
          <div className="flex flex-col items-start lg:items-end order-1 lg:order-2 w-full lg:w-1/2 text-start">
            <span className="mb-4 inline-block rounded-full border border-primary bg-primary/10 px-5 py-1 text-[13px] font-bold text-primary">
              المسابقات
            </span>
            <h2
              className="text-[28px] font-bold text-foreground md:text-[36px]"
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
                    <div className="absolute top-4 start-4 z-10 rounded-full bg-background px-3 py-1 shadow-sm">
                      <span className="text-[14px] font-bold text-primary">
                        {video.year}
                      </span>
                    </div>

                    {/* زر التشغيل في المنتصف */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <PlayIcon className="drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
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
              <h3 className="line-clamp-2 px-4 text-center text-[15px] font-bold leading-relaxed text-foreground md:text-[16px]">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
