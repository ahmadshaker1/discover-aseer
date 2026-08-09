import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const TOUR_GUIDE_PORTAL_URL =
  process.env.NEXT_PUBLIC_TOUR_GUIDE_REGISTER_URL?.trim() || "";

const INTERNAL_PORTAL_PATH = "/tour-guides/portal";

function resolvePortalHref(): { href: string; external: boolean } {
  const raw = TOUR_GUIDE_PORTAL_URL;
  if (!raw) return { href: INTERNAL_PORTAL_PATH, external: false };
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
        className="rtl:rotate-180"
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

const TourGuidesBanner = async () => {
  const tGuides = await getTranslations("tourGuides");
  const tCommon = await getTranslations("common");
  const { href: portalHref, external: portalExternal } = resolvePortalHref();

  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden md:min-h-[100vh]">
      {/* Background image — full hero */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/tourist-guides/DSC00988.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Copy on top of the scene */}
      <div className="relative z-10 flex min-h-[calc(100dvh-5rem)] w-full flex-col items-center justify-center md:min-h-[calc(100dvh-6rem)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 md:px-12">
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
                  {tGuides("title")}
                </span>
              </span>
            </div>

            <h1 className="w-full text-center text-[clamp(2.5rem,6vw,56px)] font-bold leading-[130%] text-white">
              {tGuides("title")}
            </h1>

            <p className="w-full text-center text-[24px] font-semibold leading-8 text-white">
              {tGuides("subtitle")}
            </p>

            <Link
              href={portalHref}
              {...(portalExternal
                ? { target: "_blank" as const, rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground shadow-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {tGuides("registerAsGuide")}
              <BreadcrumbChevron />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourGuidesBanner;
