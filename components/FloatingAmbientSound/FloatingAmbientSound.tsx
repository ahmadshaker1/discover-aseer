"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";

const DEFAULT_AUDIO_SRC = "/music/aseer.wav";

type Props = {
  locale: AppLocale;
  /** Public URL path, e.g. `/music/your-file.wav` */
  src?: string;
};

export default function FloatingAmbientSound({
  locale,
  src = DEFAULT_AUDIO_SRC,
}: Props) {
  const t = useTranslations("common");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const cornerClass =
    locale === "ar" ? "left-6 bottom-6" : "right-6 bottom-6";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <div className={`fixed z-9998 ${cornerClass}`}>
      <audio ref={audioRef} src={src} preload="none" loop playsInline />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? t("ambientSoundPause") : t("ambientSoundPlay")}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(115,0,205,0.35)] transition-transform hover:scale-105 active:scale-95"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
          aria-hidden
        >
          {isPlaying ? (
            <g fill="currentColor">
              {[0, 1, 2, 3, 4].map((i) => (
                <rect
                  key={i}
                  x={4 + i * 5}
                  y="6"
                  width="3"
                  height="16"
                  rx="1.5"
                  className="ambient-sound-wave-bar"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animationDelay: `${i * 0.09}s`,
                    animationDuration: `${0.42 + i * 0.05}s`,
                  }}
                />
              ))}
            </g>
          ) : (
            <line
              x1="5"
              y1="14"
              x2="23"
              y2="14"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>
    </div>
  );
}
