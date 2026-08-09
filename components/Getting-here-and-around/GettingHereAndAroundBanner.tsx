import Image from "next/image";
import { getTranslations } from "next-intl/server";

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

export default async function GettingHereAndAroundBanner() {
  const t = await getTranslations("gettingHere.banner");

  return (
    <section className="relative w-full min-h-[420px] h-[100vh] overflow-hidden">
      <Image
        src="/assets/Getting-here-and-around/hero.JPG"
        alt="Getting Here and Around"
        sizes="100vw"
        fill
        className="object-cover overflow-hidden"
        priority
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 md:px-12">
          <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-8 text-center sm:gap-10">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1.5 sm:gap-2">
                <a
                  href="/"
                  className="text-[14px] font-semibold leading-6 text-white/70 transition-opacity hover:opacity-85"
                >
                  {t("home")}
                </a>
                <BreadcrumbChevron />
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2">
                <span className="text-[14px] font-semibold leading-6 text-white">
                  {t("crumbGettingHere")}
                </span>
              </span>
            </div>

            <h1 className="w-full text-center text-[clamp(2.5rem,6vw,56px)] font-bold leading-[130%] text-white">
              {t("title")}
            </h1>

            <p className="w-full text-center text-[24px] font-semibold leading-8 text-white">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
