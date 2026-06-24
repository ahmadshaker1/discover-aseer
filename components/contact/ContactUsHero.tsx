"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

const araBold = "var(--font-ara-hamah-1964), sans-serif";

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

const ContactUsHero = () => {
  const t = useTranslations("contactUs");
  const locale = useLocale();
  const backAlignClass = locale === "ar" ? "self-start" : "self-end";

  return (
    <section
      className="relative z-0 w-full min-h-[520px] -mt-[139px] pb-10"
      style={{
        background:
          "linear-gradient(180deg, rgba(117, 32, 185, 0.24) 10.42%, rgba(117, 32, 185, 0) 100%)",
      }}
      aria-labelledby="contact-us-hero-title"
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-4 pt-[calc(139px+5rem)] sm:px-6 md:px-10 lg:px-8 lg:pt-[200px]">
        <div className="relative mx-auto w-full max-w-[1026px]">
          <Link
            href="/"
            className={`mb-10 inline-flex h-[42px] min-w-[98px] items-center justify-center gap-[10px] ${backAlignClass} rounded-[43px] bg-background px-[10px] py-[10px] text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:absolute lg:mb-0 lg:top-[91px]`}
            style={{ fontFamily: araBold }}
            prefetch={false}
          >
            <span className="text-base font-bold leading-none">{t("back")}</span>
            <BackChevronIcon />
          </Link>
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-[590px] flex-col items-stretch gap-6 text-center sm:mt-20 lg:mt-24">
          <nav
            className="mx-auto flex w-full max-w-[543px] flex-wrap items-center justify-center gap-1.5 text-secondary"
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
            <span
              className="text-center text-[24px] font-normal leading-[180%] text-secondary"
              style={{ fontFamily: araBold }}
              aria-current="page"
            >
              {t("breadcrumb")}
            </span>
          </nav>
          <h1
            id="contact-us-hero-title"
            className="w-full text-center text-[clamp(2rem,6vw,55px)] font-bold leading-[1.1] text-secondary"
            style={{ fontFamily: araBold }}
          >
            {t("title")}
          </h1>
          <p
            className="mx-auto max-w-[590px] text-center text-lg font-normal leading-relaxed text-secondary opacity-80 md:text-xl"
            style={{ fontFamily: araBold }}
          >
            {t("formSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUsHero;
