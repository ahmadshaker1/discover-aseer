"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IGCAT_EVENT_IDS, IGCAT_EVENT_IMAGES } from "./eventMedia";

export default function IGCatEventCards() {
  const t = useTranslations("igcat.events");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeId = IGCAT_EVENT_IDS[activeIndex];
  const activeImage = IGCAT_EVENT_IMAGES[activeIndex];

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start text-start">
          <span className="mb-4 inline-block rounded-full border border-primary px-5 py-1 text-[14px] font-bold text-primary">
            {t("badge")}
          </span>
          <h2 className="text-[32px] font-bold text-foreground md:text-[40px]">
            {t("title")}
          </h2>
        </div>

        <div
          className="hide-scrollbar mb-8 flex justify-start gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {IGCAT_EVENT_IDS.map((id, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex h-[90px] w-[90px] shrink-0 flex-col items-center justify-center rounded-3xl border transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-foreground hover:border-muted-foreground"
                }`}
              >
                <span className="text-center text-[14px] font-bold leading-tight">
                  {t(`items.${id}.tabTop`)}
                  <br />
                  <span className="text-[12px] font-normal">
                    {t(`items.${id}.tabBottom`)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="group relative h-[380px] w-full overflow-hidden rounded-4xl shadow-lg">
          <img
            src={activeImage}
            alt={t(`items.${activeId}.title`)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute bottom-0 end-0 z-10 w-full p-6 text-start md:w-3/4 md:p-10 lg:w-2/3">
            <h3 className="mb-4 text-[24px] font-bold text-white md:text-[32px]">
              {t(`items.${activeId}.title`)}
            </h3>
            <p className="line-clamp-3 text-[14px] leading-[1.8] text-gray-200 md:line-clamp-none md:text-[16px]">
              {t(`items.${activeId}.description`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
