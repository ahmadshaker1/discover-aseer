import Image from "next/image";
import { getLocale } from "next-intl/server";

import { resolveGettingHereContent } from "./gettingHerePageContent";

export default async function GettingHereAndAroundBanner() {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const { banner } = resolveGettingHereContent(locale);

  return (
    <section className="relative w-full min-h-[420px] h-[60vh] max-h-[720px] overflow-hidden">
      <Image
        src="/assets/Getting-here-and-around/9efd1fa0605341d5cfc51dc56250c71b01ebc083.png"
        alt="Getting Here and Around"
        sizes="100vw"
        fill
        className="object-top object-cover overflow-hidden"
        priority
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <div
        className="absolute inset-0 z-10 flex items-end md:items-center"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div
          className={`mx-auto w-full max-w-[1440px] px-6 pb-10 text-white md:px-10 md:pb-0 ${isRtl ? "text-right" : "text-left"}`}
        >
          <div
            className={`mb-4 flex items-center gap-2 text-sm md:text-base ${isRtl ? "justify-center" : "justify-center"}`}
          >
            <a href="/" className="hover:underline">
              {banner.home}
            </a>
            <span>/</span>
            <p>{banner.crumbExperiences}</p>
          </div>

          <h1 className="mb-3 flex items-center justify-center text-3xl font-bold leading-tight md:text-5xl">
            {banner.title}
          </h1>

          <p className="mb-3 flex items-center justify-center text-md font-bold leading-tight text-gray-300 md:text-1xl">
            {banner.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
