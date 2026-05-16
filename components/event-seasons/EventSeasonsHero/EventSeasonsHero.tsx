import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const ara = "var(--font-ara-hamah-1964), sans-serif";

function BreadcrumbChevron() {
  return (
    <svg
      width="5"
      height="8"
      viewBox="0 0 5 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 rtl:rotate-180"
      aria-hidden
    >
      <path
        d="M3.09645 3.9756L0.000174802 0.884375L0.883204 -9.49246e-05L4.86395 3.97416L0.889689 7.9549L0.00521888 7.07187L3.09645 3.9756Z"
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
              {t("breadcrumb")}
            </span>
            <BreadcrumbChevron />
            <Link
              href="/"
              className="text-[16px] font-bold leading-[119%] text-white transition-opacity [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] hover:opacity-85"
            >
              {tCommon("breadcrumbHome")}
            </Link>
          </nav>

          <div className="flex w-full flex-col items-center gap-6 sm:gap-8 md:gap-10">
            <h1
              className="w-full text-[clamp(2rem,7vw,70px)] font-bold leading-[119%] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
              style={{ fontFamily: ara }}
            >
              {t("heroTitle")}
            </h1>

            <p
              className="w-full text-[clamp(1rem,3.2vw,24px)] font-bold leading-[119%] text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]"
              style={{ fontFamily: ara }}
            >
              {t("heroSubtitle")}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-12 min-w-[229px] items-center justify-center gap-[10px] rounded-[20px] bg-primary px-16 py-2 text-[20px] font-bold leading-none text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            style={{ fontFamily: ara }}
          >
            {t("addYourEvent")}
          </button>
        </div>
      </div>
    </section>
  );
}
