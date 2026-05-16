"use client";

import { useState } from "react";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface AttractionsGallerySectionProps {
  title: string;
  images: string[];
}

const AttractionsGallerySection = ({ title, images }: AttractionsGallerySectionProps) => {
  const uniqueImages = [...new Set(images.filter(Boolean))];
  const [activeIndex, setActiveIndex] = useState(0);

  if (uniqueImages.length <= 1) {
    return null;
  }

  const safeIndex = Math.min(activeIndex, uniqueImages.length - 1);
  const activeImage = uniqueImages[safeIndex];

  return (
    <section className="w-full bg-background py-10 text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[62px]">
        <h2
          className="mb-6 text-start text-[32px] font-bold leading-[119%] text-foreground"
          style={{ fontFamily: ara }}
        >
          {title}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="relative h-[360px] w-full overflow-hidden rounded-[10px] sm:h-[420px]">
            <img
              src={activeImage}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {uniqueImages.length > 1 ? (
            <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2">
              {uniqueImages.map((src, index) => {
                const isActive = index === safeIndex;
                return (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-[88px] w-[132px] shrink-0 overflow-hidden rounded-[8px] border-2 transition ${
                      isActive ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Gallery image ${index + 1}`}
                    aria-pressed={isActive}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AttractionsGallerySection;
