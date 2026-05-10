import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function ServicesSupportBanner() {
  const t = await getTranslations("servicesSupport");
  const tCommon = await getTranslations("common");

  return (
    <section className="relative h-[600px] w-full overflow-hidden" dir="ltr" style={{ fontFamily: "Ara Hamah 1964 R" }}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/services-support/f125fee16e0267a3d14ee285efd5f272ad21108c.png"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 z-10 bg-black/40" aria-hidden />

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[min(52%,20rem)] sm:w-[min(48%,24rem)] md:w-[min(44%,28rem)]"
          aria-hidden
        >
          <Image
            src="/hero-pattern/pattern-diamons.png"
            alt=""
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 52vw, 28rem"
          />
        </div>

        <div className="absolute inset-0 z-30 flex w-full items-center justify-center">
          <div className="mx-auto w-full max-w-[1440px] px-6 text-center text-white sm:px-10 md:px-16">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-sm font-medium sm:text-base">
              <span>{t("bannerCrumb")}</span>
              <span aria-hidden className="opacity-80">
                <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.25135 -1.87195e-06C4.35427 -1.88095e-06 4.45719 0.0379143 4.53844 0.119164C4.69552 0.276247 4.69552 0.536248 4.53844 0.693332L1.00677 4.225C0.74677 4.485 0.74677 4.9075 1.00677 5.1675L4.53844 8.69916C4.69552 8.85625 4.69552 9.11625 4.53844 9.27333C4.38135 9.43041 4.12135 9.43041 3.96427 9.27333L0.432604 5.74167C0.156354 5.46542 -0.00072946 5.09166 -0.000729494 4.69625C-0.000729529 4.30083 0.150937 3.92708 0.432603 3.65083L3.96427 0.119165C4.04552 0.0433312 4.14844 -1.86295e-06 4.25135 -1.87195e-06Z" fill="white" />
                </svg>
              </span>

              <Link href="/" className="cursor-pointer text-gray-400 transition-opacity hover:opacity-80">
                {tCommon("home")}
              </Link>
            </div>

            <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              {t("bannerCrumb")}
            </h1>
            <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg">
              {t("bannerDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
