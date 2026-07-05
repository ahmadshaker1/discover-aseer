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
    >
      <path
        d="M4.25184 0C4.35476 0 4.45767 0.0379143 4.53892 0.119164C4.69601 0.276247 4.69601 0.536248 4.53893 0.693332L1.00726 4.225C0.747259 4.485 0.747259 4.9075 1.00726 5.1675L4.53893 8.69916C4.69601 8.85625 4.69601 9.11625 4.53893 9.27333C4.38184 9.43041 4.12184 9.43041 3.96476 9.27333L0.433092 5.74167C0.156842 5.46542 -0.000241179 5.09166 -0.000241213 4.69625C-0.000241248 4.30083 0.151425 3.92708 0.433092 3.65083L3.96476 0.119165C4.04601 0.0433312 4.14893 0 4.25184 0Z"
        fill="white"
      />
    </svg>
  );
}

/**
 * Restaurants hero — full-bleed photo with diagonal wash.
 */
export default async function RestaurantsBanner() {
  const t = await getTranslations("restaurantsPage");
  const tCommon = await getTranslations("common");

  return (
    <section className="relative min-h-[calc(100dvh-5rem)] w-full overflow-hidden md:min-h-[calc(100dvh-6rem)]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/restaurant/restaurant-banner.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-1 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          )`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[calc(100dvh-5rem)] w-full flex-col items-center justify-center md:min-h-[calc(100dvh-6rem)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 text-center sm:px-10 md:px-16 lg:px-24">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-base font-medium text-white">
            <Link href="/" className="transition-opacity hover:opacity-80">
              {tCommon("breadcrumbHome")}
            </Link>
            <span aria-hidden className="opacity-80">
              <BreadcrumbChevron />
            </span>
            <span>{t("breadcrumb")}</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>

          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white sm:text-xl md:text-2xl">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
