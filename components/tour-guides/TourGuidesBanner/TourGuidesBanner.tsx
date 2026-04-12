import Image from "next/image";
import Link from "next/link";

const TOUR_GUIDE_REGISTER_URL =
  process.env.NEXT_PUBLIC_TOUR_GUIDE_REGISTER_URL?.trim() || "";

const INTERNAL_REGISTER_PATH = "/tour-guides/register";

function resolveRegisterHref(): { href: string; external: boolean } {
  const raw = TOUR_GUIDE_REGISTER_URL;
  if (!raw) return { href: INTERNAL_REGISTER_PATH, external: false };
  if (raw.startsWith("http://") || raw.startsWith("https://"))
    return { href: raw, external: true };
  return { href: raw.startsWith("/") ? raw : `/${raw}`, external: false };
}

function CtaArrow() {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center"
      aria-hidden
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18l-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const TourGuidesBanner = () => {
  const { href: registerHref, external: registerExternal } = resolveRegisterHref();

  return (
    <section
      className="relative min-h-[calc(100dvh-5rem)] w-full overflow-hidden md:min-h-[calc(100dvh-6rem)]"
      dir="ltr"
    >
      {/* Background image — full hero */}
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

      {/* Light diagonal texture (same idea as original hero) */}
      <div
        className="absolute inset-0 z-1 opacity-10 pointer-events-none"
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

      {/* Diamond pattern — left edge, layered above the photo, below copy */}
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

      {/* Copy on top of the scene */}
      <div className="relative z-10 flex min-h-[calc(100dvh-5rem)] w-full flex-col items-center justify-center px-6 py-16 text-center sm:px-10 md:min-h-[calc(100dvh-6rem)] md:px-16 lg:px-24">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-base font-medium text-white">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            الصفحة الرئيسية
          </Link>
          <span aria-hidden className="opacity-80">
            {" > "}
          </span>
          <span>التجارب</span>
        </div>

        <h1 className="mb-4 max-w-2xl text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          المرشدون السياحيين
        </h1>

        <p className="mb-10 max-w-2xl text-lg font-medium leading-relaxed text-white sm:text-xl md:text-2xl">
          زيارة واحدة لا تكفي مع وفرة الخيارات من الأنشطة والتجارب.
        </p>

        <Link
          href={registerHref}
          {...(registerExternal
            ? { target: "_blank" as const, rel: "noopener noreferrer" }
            : {})}
          className="inline-flex items-center gap-2 rounded-full bg-[#280048] px-8 py-3.5 text-base font-medium text-white shadow-lg transition-colors hover:bg-[#4d2a75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CtaArrow />
          التسجيل كمرشد سياحي
        </Link>
      </div>
    </section>
  );
};

export default TourGuidesBanner;
