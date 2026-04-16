import Image from "next/image";

export default function GettingHereAndAroundBanner() {
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

      <div className="absolute inset-0 z-10 flex items-end md:items-center">
        <div className="mx-auto w-full max-w-7xl px-6 pb-10 text-right text-white md:px-10 md:pb-0">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm md:text-base">
            <a href="/" className="hover:underline">
              الصفحة الرئيسية
            </a>
            <span>/</span>
            <p>التجارب</p>
          </div>

          <h1 className="flex mb-3 text-3xl font-bold leading-tight md:text-5xl items-center justify-center">
            الوصول والتجول
          </h1>

          <p className="flex mb-3 text-md font-bold leading-tight md:text-1xl items-center justify-center color-text-gray-300">
            زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب.
          </p>
        </div>
      </div>
    </section>
  );
}
