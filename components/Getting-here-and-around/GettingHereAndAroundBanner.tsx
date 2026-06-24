import Image from "next/image";
import { getTranslations } from "next-intl/server";

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

      <div className="absolute inset-0 z-10 flex items-end md:items-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 text-white md:px-10 md:pb-0 text-start">
          <div className="mb-4 flex items-center gap-2 text-sm md:text-base justify-center">
            <a href="/" className="hover:underline">
              {t("home")}
            </a>
            <span>/</span>
            <p>{t("crumbGettingHere")}</p>
          </div>

          <h1 className="mb-3 flex items-center justify-center text-3xl font-bold leading-tight md:text-5xl">
            {t("title")}
          </h1>

          <p className="mb-3 flex items-center justify-center text-md font-bold leading-tight text-gray-300 md:text-1xl">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
