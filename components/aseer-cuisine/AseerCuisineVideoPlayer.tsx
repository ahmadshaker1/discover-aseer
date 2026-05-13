"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type AseerCuisineVideoPlayerProps = {
  src: string;
  poster: string;
  /** Root wrapper classes (e.g. absolute inset-0) */
  className?: string;
  /** Optional accessible label for the video */
  ariaLabel?: string;
  /** Rendered above the video, below controls (e.g. gradient); non-interactive */
  overlay?: ReactNode;
};

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function VolumeOnIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 3c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.5 12c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

/**
 * Autoplaying background-style video: click video to play/pause; mute control for sound.
 * Starts muted so autoplay works in browsers.
 */
const AseerCuisineVideoPlayer = ({
  src,
  poster,
  className = "",
  ariaLabel,
  overlay,
}: AseerCuisineVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) setPaused(v.paused);
  }, [src]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const handlePlayPauseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlay();
  }, [togglePlay]);

  return (
    <div className={`absolute inset-0 ${className}`.trim()}>
      <video
        ref={videoRef}
        key={src}
        className="absolute inset-0 z-0 h-full w-full cursor-pointer object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label={ariaLabel}
        onClick={togglePlay}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />

      {overlay ? (
        <div className="pointer-events-none absolute inset-0 z-1">{overlay}</div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-end p-3 sm:p-4">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handlePlayPauseClick}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={paused ? "Play" : "Pause"}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AseerCuisineVideoPlayer;
