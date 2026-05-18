"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const QUOTE_IDS = ["0", "1"] as const;

export default function QuotesSection() {
  const t = useTranslations("igcat.quotes");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeId = QUOTE_IDS[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-secondary py-20 text-secondary-foreground dark:bg-muted dark:text-foreground">
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-transparent to-background/40 opacity-50 dark:to-background/60" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-4">
            {QUOTE_IDS.map((id, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-full rounded-2xl p-3 text-start transition-all duration-300 ${
                    isActive
                      ? "scale-[1.02] bg-background text-foreground shadow-lg"
                      : "bg-black/20 text-inherit hover:bg-black/30 dark:bg-white/10 dark:hover:bg-white/15"
                  }`}
                >
                  <h3 className="mb-2 text-[24px]">{t(`items.${id}.name`)}</h3>
                  <p
                    className={`text-[18px] leading-relaxed ${isActive ? "text-muted-foreground" : "opacity-80"}`}
                  >
                    {t(`items.${id}.role`)}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-start gap-6 lg:col-span-8 lg:me-8">
            <img src="/assets/igcat/SVG.png" alt="" />
            <p key={activeId} className="animate-fade-in-up text-[22px]">
              {t(`items.${activeId}.quote`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
