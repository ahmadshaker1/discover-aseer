"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PointOfInterest } from "./data";
import { TextOverlay } from "./TextOverlay";

import { PreviewImages } from "./PreviewImages";

const AUTO_ADVANCE_MS = 5000;

interface PointsOfInterestCarouselProps {
  points: PointOfInterest[];
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export const PointsOfInterestCarousel = ({
  points,
}: PointsOfInterestCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [incomingOpaque, setIncomingOpaque] = useState(false);

  const activeRef = useRef(activeIndex);
  const incomingRef = useRef<number | null>(null);
  const timerBlockedRef = useRef(false);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    incomingRef.current = incomingIndex;
  }, [incomingIndex]);

  const activePoint = points[activeIndex];
  const incomingPoint = incomingIndex !== null ? points[incomingIndex] : null;

  const displayIndex = incomingIndex ?? activeIndex;
  const displayPoint =
    incomingIndex !== null ? points[incomingIndex] : activePoint;

  const commitIncoming = useCallback(() => {
    const inc = incomingRef.current;
    if (inc === null) return;
    activeRef.current = inc;
    incomingRef.current = null;
    setActiveIndex(inc);
    setIncomingIndex(null);
    setIncomingOpaque(false);
    timerBlockedRef.current = false;
  }, []);

  const beginCrossfadeTo = useCallback(
    (target: number) => {
      if (points.length === 0) return;
      const i = mod(target, points.length);
      if (incomingRef.current === i) return;
      if (i === activeRef.current && incomingRef.current === null) return;

      timerBlockedRef.current = true;
      incomingRef.current = i;
      setIncomingOpaque(false);
      setIncomingIndex(i);
    },
    [points.length],
  );

  const onIncomingLoadingComplete = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIncomingOpaque(true));
    });
  }, []);

  const onIncomingTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "opacity") return;
      if (!incomingOpaque) return;
      commitIncoming();
    },
    [incomingOpaque, commitIncoming],
  );

  useEffect(() => {
    if (points.length <= 1) return;
    const id = window.setInterval(() => {
      if (timerBlockedRef.current) return;
      const base = activeRef.current;
      beginCrossfadeTo(base + 1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [points.length, beginCrossfadeTo]);

  const selectImage = (index: number) => beginCrossfadeTo(index);

  return (
    <div className="relative mx-auto min-h-screen w-full bg-black">
      {/* Clip only the full-bleed images — root must not use overflow-hidden or horizontal
          swipe/scroll on the preview strip breaks on some browsers (nested overflow). */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={activePoint.image}
          alt={activePoint.title}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={activeIndex === 0 && incomingIndex === null}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-black/50"
          aria-hidden
        />
      </div>

      {incomingPoint && incomingIndex !== null ? (
        <div
          key={incomingIndex}
          className="absolute inset-0 z-10 overflow-hidden transition-opacity duration-700 ease-in-out"
          style={{ opacity: incomingOpaque ? 1 : 0 }}
          onTransitionEnd={onIncomingTransitionEnd}
        >
          <Image
            src={incomingPoint.image}
            alt={incomingPoint.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            onLoad={onIncomingLoadingComplete}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/50"
            aria-hidden
          />
        </div>
      ) : null}

      <TextOverlay
        point={displayPoint}
        carouselSlot={
          <div className="w-full min-w-0">
            <PreviewImages
              points={points}
              currentIndex={displayIndex}
              onSelect={selectImage}
            />
          </div>
        }
      />
    </div>
  );
};
