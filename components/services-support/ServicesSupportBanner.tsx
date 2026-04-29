import Image from "next/image";
import Link from "next/link";

const ServicesSupportBanner = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden" dir="ltr">
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
              <Link href="/" className="transition-opacity hover:opacity-80">
                الرئيسية
              </Link>
              <span aria-hidden className="opacity-80">
                /
              </span>
              <span>الخدمات المساندة</span>
            </div>

            <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              الخدمات المساندة
            </h1>
            <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg">
              خدمات الأمن والسلامة والمساندة في مدن ومحافظات عسير
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSupportBanner;
