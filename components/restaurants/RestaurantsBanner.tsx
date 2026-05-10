import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/**
 * Restaurants hero — full-bleed photo, diagonal wash, diamond pattern.
 */
export default async function RestaurantsBanner() {
  const t = await getTranslations("restaurantsPage");
  const tCommon = await getTranslations("common");

  return (
    <section
      className="relative min-h-[calc(100dvh-5rem)] w-full overflow-hidden md:min-h-[calc(100dvh-6rem)]"
      dir="ltr"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/experiences/experiences.png"
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

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-2 w-[min(55%,20rem)] sm:w-[min(50%,24rem)] md:w-[min(45%,28rem)]"
        aria-hidden
      >
        <Image
          src="/hero-pattern/pattern-diamons.png"
          alt=""
          fill
          className="object-contain object-left"
          sizes="(max-width: 768px) 55vw, 28rem"
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100dvh-5rem)] w-full flex-col items-center justify-center md:min-h-[calc(100dvh-6rem)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 text-center sm:px-10 md:px-16 lg:px-24">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-base font-medium text-white">
            <Link href="/" className="transition-opacity hover:opacity-80">
              {tCommon("breadcrumbHome")}
            </Link>
            <span aria-hidden className="opacity-80">
              {" > "}
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
