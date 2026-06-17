"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { winnersMedia, videoSectionData } from "./data";
import { PlayIcon } from "./Icons";

function useDraggableScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return {
    ref,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  };
}

export default function WinnersSection() {
  const t = useTranslations("igcat.winners");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeYear, setActiveYear] = useState<string | null>(null);

  const tabsDragProps = useDraggableScroll();
  const cardsDragProps = useDraggableScroll();

  const itemsWithYear = winnersMedia.map((winner) => ({
    ...winner,
    year: t(`items.${winner.id}.year`),
  }));

  const uniqueYears = Array.from(
    new Set(itemsWithYear.map((item) => item.year)),
  ).sort((a, b) => Number(b) - Number(a));

  const currentYear = activeYear || uniqueYears[0];
  const activeItems = itemsWithYear.filter((item) => item.year === currentYear);

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-[24px] font-bold text-foreground md:text-[32px]">
          {t("title")}
        </h2>

        <div
          className="hide-scrollbar mb-8 flex justify-center md:justify-start gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none" }}
          {...tabsDragProps}
        >
          {uniqueYears.map((year) => {
            const isActive = year === currentYear;

            return (
              <button
                key={year}
                type="button"
                onClick={() => setActiveYear(year)}
                className={`flex h-[40px] px-6 shrink-0 flex-col items-center justify-center rounded-[999px] border transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-foreground hover:border-muted-foreground"
                }`}
              >
                <span className="text-center text-[14px] font-bold leading-tight whitespace-nowrap">
                  {year}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-6 md:gap-6 cursor-grab active:cursor-grabbing select-none"
          {...cardsDragProps}
        >
          {activeItems.map((winner) => (
            <div
              key={winner.id}
              className="group relative h-[350px] w-[280px] shrink-0 overflow-hidden rounded-2xl shadow-md md:w-[320px]"
            >
              <img
                src={t(`items.${winner.id}.image`)}
                alt={t(`items.${winner.id}.title`)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute top-4 start-4 rounded-full border border-primary/20 bg-background/90 px-3 py-1 backdrop-blur-sm">
                <span className="text-[13px] font-bold text-primary">
                  {winner.year}
                </span>
              </div>

              <div className="absolute bottom-0 start-0 end-0 z-10 p-5 text-start">
                <h3 className="mb-2 text-[16px] font-bold leading-tight text-white md:text-[18px]">
                  {t(`items.${winner.id}.title`)}
                </h3>
                <p className="line-clamp-2 text-[13px] leading-relaxed text-gray-300">
                  {t(`items.${winner.id}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 w-full">
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl bg-black shadow-xl sm:h-[400px] md:h-[600px]">
            {!isVideoPlaying ? (
              <div
                className="group absolute inset-0 h-full w-full cursor-pointer"
                onClick={() => setIsVideoPlaying(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setIsVideoPlaying(true);
                }}
                role="button"
                tabIndex={0}
              >
                <img
                  src="/assets/igcat/winners/1.1.png"
                  alt={t("videoAlt")}
                  className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <PlayIcon />
                </div>
              </div>
            ) : (
              <iframe
                src={`${videoSectionData.youtubeUrl}?autoplay=1&rel=0`}
                title={t("videoAlt")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
