import { getTranslations } from "next-intl/server";
import { initiativesMedia } from "./data";
import Image from "next/image";

export default async function InitiativesSection() {
  const t = await getTranslations("igcat.initiatives");

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-center">
          <h2 className="text-[32px] font-bold text-foreground md:text-[24px]">
            {t("title")}
          </h2>
          <Image
            src="/assets/igcat/dark-theme/kku-logo.svg"
            alt={t("universityAlt")}
            className="h-32 w-32 object-contain md:h-45 md:w-45"
            width={100}
            height={100}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {initiativesMedia.map((item) => (
            <div
              key={item.id}
              className="group relative h-[350px] w-full overflow-hidden rounded-2xl shadow-md md:h-[450px]"
            >
              <img
                src={t(`items.${item.id}.image`)}
                alt={t(`items.${item.id}.title`)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute bottom-0 start-0 end-0 z-10 flex h-1/2 items-end justify-center p-6 text-center md:p-8">
                <h3 className="text-[18px] font-bold leading-snug text-white drop-shadow-lg md:text-[22px]">
                  {t(`items.${item.id}.title`)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
