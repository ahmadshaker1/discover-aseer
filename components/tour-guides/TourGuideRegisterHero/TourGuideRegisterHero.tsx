"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

const araBold = "var(--font-ara-hamah-1964), sans-serif";

interface TourGuideRegisterHeroProps {
  /** Progress block rendered at end of header (inside gradient section). */
  bottomSlot?: ReactNode;
}

function BackChevronIcon() {
  return (
    <svg
      width="7"
      height="11"
      viewBox="0 0 7 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M0.75 0.750011L5.41667 5.41668L0.75 10.0833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BreadcrumbChevronLarge() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 opacity-50"
      aria-hidden
    >
      <g opacity="0.5">
        <path
          d="M8.17323 1.80368C8.27615 1.80368 8.37906 1.84159 8.46031 1.92284C8.6174 2.07993 8.6174 2.33993 8.46031 2.49701L4.92865 6.02868C4.66865 6.28868 4.66865 6.71118 4.92865 6.97118L8.46031 10.5028C8.6174 10.6599 8.6174 10.9199 8.46031 11.077C8.30323 11.2341 8.04323 11.2341 7.88615 11.077L4.35448 7.54535C4.07823 7.2691 3.92115 6.89535 3.92115 6.49993C3.92115 6.10451 4.07281 5.73076 4.35448 5.45451L7.88615 1.92284C7.9674 1.84701 8.07031 1.80368 8.17323 1.80368Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function BreadcrumbChevronSmall() {
  return (
    <svg
      width="5"
      height="10"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M4.25233 -1.87195e-06C4.35525 -1.88095e-06 4.45816 0.0379143 4.53941 0.119164C4.6965 0.276247 4.6965 0.536248 4.53941 0.693332L1.00775 4.225C0.747747 4.485 0.747747 4.9075 1.00775 5.1675L4.53941 8.69916C4.6965 8.85625 4.6965 9.11625 4.53941 9.27333C4.38233 9.43041 4.12233 9.43041 3.96525 9.27333L0.43358 5.74167C0.15733 5.46542 0.000247103 5.09166 0.000247068 4.69625C0.000247033 4.30083 0.151913 3.92708 0.43358 3.65083L3.96525 0.119165C4.0465 0.0433312 4.14941 -1.86295e-06 4.25233 -1.87195e-06Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Hero for `/tour-guides/register` — gradient shell, back control, title, breadcrumb (Figma 1440×644, −139px offset).
 */
const TourGuideRegisterHero = ({ bottomSlot }: TourGuideRegisterHeroProps) => {
  const t = useTranslations("tourGuidesRegister");
  return (
    <section
      className="relative z-0 w-full min-h-[644px] -mt-[139px] pb-10"
      style={{
        background:
          "linear-gradient(180deg, rgba(117, 32, 185, 0.24) 10.42%, rgba(117, 32, 185, 0) 100%)",
      }}
      aria-labelledby="tour-guide-register-hero-title"
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-4 pt-[calc(139px+5rem)] sm:px-6 md:px-10 lg:px-8 lg:pt-[200px]">
        <Link
          href="/tour-guides"
          className="mb-10 inline-flex h-[42px] min-w-[98px] items-center justify-center gap-[10px] self-end rounded-[43px] bg-background px-[10px] py-[10px] text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:absolute lg:mb-0 lg:top-[291px] lg:end-[68px]"
          style={{ fontFamily: araBold }}
          prefetch={false}
        >
          <span className="text-base font-bold leading-none">{t("back")}</span>
          <BackChevronIcon />
        </Link>

        <div className="mx-auto mt-20 flex max-w-[590px] flex-col items-center gap-[33px] text-center sm:mt-24 lg:mt-30 xl:mt-32">
          <h1
            id="tour-guide-register-hero-title"
            className={`w-full text-[clamp(2rem,6vw,55px)] font-bold leading-[1.1] text-secondary text-start`}
            style={{ fontFamily: araBold }}
          >
            {t("formTitle")}
          </h1>

          <nav
            className="flex w-full max-w-[543px] flex-wrap items-center justify-center gap-1.5 text-secondary"
            aria-label={t("breadcrumbLabel")}
          >
            <Link
              href="/"
              className="text-[24px] font-normal leading-[180%] opacity-50 transition-opacity hover:opacity-70"
              style={{ fontFamily: araBold }}
            >
              {t("home")}
            </Link>
            <BreadcrumbChevronLarge />
            <Link
              href="/tour-guides"
              className="text-[24px] font-bold leading-[180%] text-secondary"
              style={{ fontFamily: araBold }}
            >
              {t("tourGuides")}
            </Link>
            <BreadcrumbChevronSmall />
            <span
              className="text-center text-[24px] font-normal leading-[180%] text-secondary"
              style={{ fontFamily: araBold }}
              aria-current="page"
            >
              {t("formTitle")}
            </span>
          </nav>
        </div>

        {bottomSlot ? (
          <div className="mx-auto mt-12 w-full max-w-[1026px] sm:mt-14 lg:mt-16">{bottomSlot}</div>
        ) : null}
      </div>
    </section>
  );
};

export default TourGuideRegisterHero;
