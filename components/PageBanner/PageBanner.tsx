"use client";

import { Fragment } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageBannerProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  backgroundImage?: string;
  /** When true, hides the decorative diamond pattern overlay. */
  hidePattern?: boolean;
  /** Pill CTA rendered under the subtitle (e.g. destinations browse). */
  primaryCta?: {
    href: string;
    label: string;
  };
}

function BreadcrumbChevron({ isRtl }: { isRtl: boolean }) {
  return (
    <svg
      width="5"
      height="10"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`inline-block shrink-0 ${isRtl ? "" : "rotate-180"}`}
    >
      <path
        d="M4.25184 -1.87195e-06C4.35476 -1.88095e-06 4.45767 0.0379143 4.53892 0.119164C4.69601 0.276247 4.69601 0.536248 4.53893 0.693332L1.00726 4.225C0.747259 4.485 0.747259 4.9075 1.00726 5.1675L4.53893 8.69916C4.69601 8.85625 4.69601 9.11625 4.53893 9.27333C4.38184 9.43041 4.12184 9.43041 3.96476 9.27333L0.433092 5.74167C0.156842 5.46542 -0.000241179 5.09166 -0.000241213 4.69625C-0.000241248 4.30083 0.151425 3.92708 0.433092 3.65083L3.96476 0.119165C4.04601 0.0433312 4.14893 -1.86295e-06 4.25184 -1.87195e-06Z"
        fill="white"
      />
    </svg>
  );
}

const PageBanner = ({
  breadcrumbs,
  title,
  subtitle,
  backgroundImage = "/assets/experiences/experiences.png",
  hidePattern = false,
  primaryCta,
}: PageBannerProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div
      className="relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden md:min-h-[80vh]"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-black/35"
        aria-hidden
      />
      {/* <div
        className="pointer-events-none absolute inset-0 z-1 opacity-10"
        // style={{
        //   backgroundImage: `repeating-linear-gradient(
        //     45deg,
        //     transparent,
        //     transparent 10px,
        //     rgba(255, 255, 255, 0.1) 10px,
        //     rgba(255, 255, 255, 0.1) 20px
        //   )`,
        // }}
        aria-hidden
      /> */}

      {/* {!hidePattern ? (
        <div
          className="pointer-events-none absolute inset-y-0 start-0 z-2 w-[min(55%,20rem)] sm:w-[min(50%,24rem)] md:w-[min(45%,28rem)]"
          aria-hidden
        >
          <Image
            src="/hero-pattern/pattern-diamons.png"
            alt=""
            fill
            className="object-contain object-start ltr:scale-x-[-1]"
            sizes="(max-width: 768px) 55vw, 28rem"
          />
        </div>
      ) : null} */}

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 md:px-12">
        <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-5 text-center sm:gap-6">
          <nav
            aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
            style={{ fontFamily: ara }}
          >
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={`${crumb.label}-${index}`}>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[16px] font-normal leading-6 text-white/70 transition-opacity hover:opacity-85"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[16px] font-normal leading-6 text-white">
                    {crumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <BreadcrumbChevron isRtl={isRtl} />
                ) : null}
              </Fragment>
            ))}
          </nav>

          <h1
            className="w-full text-center text-[clamp(2rem,5vw,44px)] font-bold leading-[180%] text-white"
            style={{ fontFamily: ara }}
          >
            {title}
          </h1>

          <p
            className="w-full text-center text-[16px] font-normal leading-6 text-white/70"
            style={{ fontFamily: ara }}
          >
            {subtitle}
          </p>

          {primaryCta ? (
            <Link
              href={primaryCta.href}
              className="mt-2 inline-flex h-[42px] min-w-[185px] shrink-0 items-center justify-center rounded-[100px] bg-primary px-4 text-primary-foreground transition-opacity hover:opacity-90"
              style={{
                boxShadow: "inset 0px 4px 10px 0px rgba(255, 255, 255, 0.078)",
              }}
            >
              <span
                className="whitespace-nowrap text-[17px] font-bold leading-[100%]"
                style={{ fontFamily: ara }}
              >
                {primaryCta.label || t("pageBanner.browseMore")}
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
