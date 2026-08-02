import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const brando = "var(--font-brando), sans-serif";

function BreadcrumbChevron() {
  return (
    <svg
      width="5"
      height="10"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="rotate-180 rtl:rotate-0"
    >
      <path
        d="M4.25135 -1.87195e-06C4.35427 -1.88095e-06 4.45719 0.0379143 4.53844 0.119164C4.69552 0.276247 4.69552 0.536248 4.53844 0.693332L1.00677 4.225C0.74677 4.485 0.74677 4.9075 1.00677 5.1675L4.53844 8.69916C4.69552 8.85625 4.69552 9.11625 4.53844 9.27333C4.38135 9.43041 4.12135 9.43041 3.96427 9.27333L0.432604 5.74167C0.156354 5.46542 -0.00072946 5.09166 -0.000729494 4.69625C-0.000729529 4.30083 0.150937 3.92708 0.432603 3.65083L3.96427 0.119165C4.04552 0.0433312 4.14844 -1.86295e-06 4.25135 -1.87195e-06Z"
        fill="white"
      />
    </svg>
  );
}

export default async function EventSeasonsHero() {
  const t = await getTranslations("eventSeasons");
  const tCommon = await getTranslations("common");

  return (
    <section
      className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16 sm:py-20 md:min-h-[755px] md:py-[268px]"
      style={{
        backgroundImage: "url('/assets/event-seasons/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-black/25 dark:bg-black/40"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 sm:px-8 md:px-[454px]">
        <div className="flex w-full max-w-[509px] flex-col items-center gap-8 text-center sm:gap-10 md:gap-[41px]">
          <nav
            aria-label={tCommon("breadcrumbHome")}
            className="flex flex-wrap items-center justify-center gap-[9px]"
            style={{ fontFamily: ara }}
          >
            <span className="text-[16px] font-bold leading-[119%] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
              {tCommon("breadcrumbHome")}
            </span>
            <BreadcrumbChevron />
            <Link
              href="/"
              className="text-[16px] font-bold leading-[119%] text-white transition-opacity [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] hover:opacity-85"
            >
              {t("breadcrumb")}
            </Link>
          </nav>

          <div className="flex w-full flex-col items-center gap-6 sm:gap-8 md:gap-10">
            <h1
              className="w-full text-[clamp(2rem,7vw,70px)] font-bold leading-[119%] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
              style={{ fontFamily: brando }}
            >
              {t("heroTitle")}
            </h1>

            <p
              className="w-full text-[clamp(1rem,3.2vw,24px)] font-bold leading-[119%] text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]"
              style={{ fontFamily: brando }}
            >
              {t("heroSubtitle")}
            </p>
          </div>

          <Link
            href="/experiences/submit"
            className="inline-flex h-12 min-w-[229px] items-center justify-center gap-[10px] rounded-[20px] bg-primary px-16 py-2 text-[20px] font-bold leading-none text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            style={{ fontFamily: ara }}
          >
            {t("addYourEvent")}
          </Link>
        </div>
      </div>
    </section>
  );
}
