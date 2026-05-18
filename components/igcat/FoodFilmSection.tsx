"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { foodFilmMedia } from "./data";
import { PlayIcon } from "./Icons";

const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function FoodFilmSection() {
  const t = useTranslations("igcat.foodFilm");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between  lg:flex-row lg:items-center">
          <div className="flex w-full flex-col items-start text-start">
            <span className="mb-4 inline-block rounded-full border border-primary bg-primary/10 px-5 py-1 text-[13px] font-bold text-primary">
              {t("badge")}
            </span>
            <h2 className="text-[28px] font-bold text-foreground md:text-[36px]">
              {t("title")}
            </h2>
          </div>
          <div className="mt-4 w-full text-start">
            <p className="ms-auto max-w-xl text-[18px] text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {foodFilmMedia.map((video) => (
            <div key={video.id} className="flex flex-col gap-4">
              <div className="group relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-lg">
                {playingVideoId !== video.id ? (
                  <div
                    className="absolute inset-0 h-full w-full cursor-pointer"
                    onClick={() => setPlayingVideoId(video.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setPlayingVideoId(video.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={video.image}
                      alt={t(`items.${video.id}.title`)}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

                    <div className="absolute top-4 start-4 z-10 rounded-full bg-background px-3 py-1 shadow-sm">
                      <span className="text-[14px] font-bold text-primary">
                        {video.year}
                      </span>
                    </div>

                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <PlayIcon className="drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(video.youtubeUrl)}?autoplay=1&rel=0`}
                    title={t(`items.${video.id}.title`)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                )}
              </div>

              <h3 className="line-clamp-2 px-4 text-center text-[15px] font-bold leading-relaxed text-foreground md:text-[16px]">
                {t(`items.${video.id}.title`)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
