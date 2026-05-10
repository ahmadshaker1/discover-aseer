"use client";

import { Button } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";

interface NavigationControlsProps {
  onNext: () => void;
  onPrev: () => void;
}

export const NavigationControls = ({ onNext, onPrev }: NavigationControlsProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("common");

  return (
    <div className="flex flex-row gap-1.5 sm:gap-2">
      <Button
        onClick={onNext}
        className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 ${isRtl ? "rotate-180" : ""}`}
        aria-label={t("next")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.25 12.2744L19.25 12.2744"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.2998 18.2988L4.24981 12.2748L10.2998 6.24976"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <Button
        onClick={onPrev}
        className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 ${isRtl ? "" : "rotate-180"}`}
        aria-label={t("previous")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.25 12.2744L19.25 12.2744"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.2998 18.2988L4.24981 12.2748L10.2998 6.24976"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
};
