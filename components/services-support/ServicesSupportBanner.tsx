import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

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
        d="M4.25184 0C4.35476 0 4.45767 0.0379143 4.53892 0.119164C4.69601 0.276247 4.69601 0.536248 4.53893 0.693332L1.00726 4.225C0.747259 4.485 0.747259 4.9075 1.00726 5.1675L4.53893 8.69916C4.69601 8.85625 4.69601 9.11625 4.53893 9.27333C4.38184 9.43041 4.12184 9.43041 3.96476 9.27333L0.433092 5.74167C0.156842 5.46542 -0.000241179 5.09166 -0.000241213 4.69625C-0.000241248 4.30083 0.151425 3.92708 0.433092 3.65083L3.96476 0.119165C4.04601 0.0433312 4.14893 0 4.25184 0Z"
        fill="white"
      />
    </svg>
  );
}

export default async function ServicesSupportBanner() {
  const t = await getTranslations("servicesSupport");
  const tCommon = await getTranslations("common");

  return (
    <section className="relative h-[100vh] w-full overflow-hidden">
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

        <div className="absolute inset-0 z-30 flex w-full items-center justify-center">
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 md:px-12">
            <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-8 text-center sm:gap-10">
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1.5 sm:gap-2">
                  <Link
                    href="/"
                    className="text-[14px] font-semibold leading-6 text-white/70 transition-opacity hover:opacity-85"
                  >
                    {tCommon("breadcrumbHome")}
                  </Link>
                  <BreadcrumbChevron />
                </span>
                <span className="inline-flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[14px] font-semibold leading-6 text-white">
                    {t("bannerCrumb")}
                  </span>
                </span>
              </div>

              <h1 className="w-full text-center text-[clamp(2.5rem,6vw,56px)] font-bold leading-[130%] text-white">
                {t("bannerCrumb")}
              </h1>

              <p className="w-full text-center text-[24px] font-semibold leading-8 text-white">
                {t("bannerDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
