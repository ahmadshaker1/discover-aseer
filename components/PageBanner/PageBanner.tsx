import Link from "next/link";
import Image from "next/image";

const ara = "var(--font-ara-hamah-1964), sans-serif";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageBannerProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  backgroundImage?: string;
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
      className="shrink-0"
    >
      <path
        d="M4.25184 -1.87195e-06C4.35476 -1.88095e-06 4.45767 0.0379143 4.53892 0.119164C4.69601 0.276247 4.69601 0.536248 4.53893 0.693332L1.00726 4.225C0.747259 4.485 0.747259 4.9075 1.00726 5.1675L4.53893 8.69916C4.69601 8.85625 4.69601 9.11625 4.53893 9.27333C4.38184 9.43041 4.12184 9.43041 3.96476 9.27333L0.433092 5.74167C0.156842 5.46542 -0.000241179 5.09166 -0.000241213 4.69625C-0.000241248 4.30083 0.151425 3.92708 0.433092 3.65083L3.96476 0.119165C4.04601 0.0433312 4.14893 -1.86295e-06 4.25184 -1.87195e-06Z"
        fill="white"
      />
    </svg>
  );
}

const PageBanner = ({
  breadcrumbs,
  title,
  subtitle,
  backgroundImage = "/assets/experiences/experiences.png",
}: PageBannerProps) => {
  return (
    <div
      className="relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden md:min-h-[80vh]"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay pattern - similar to the geometric pattern in the image */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          )`,
        }}
      ></div>

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

      <div className="relative z-10 flex w-full max-w-[min(100%,680px)] flex-col items-center gap-5 px-6 py-10 text-center sm:gap-6 sm:px-10 md:px-12">
        <div
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
          dir="ltr"
          style={{ fontFamily: ara }}
        >
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-[16px] font-normal leading-6 text-white/70 transition-opacity hover:opacity-85"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[16px] font-normal leading-6 text-white">
                  {crumb.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 ? <BreadcrumbChevron /> : null}
            </span>
          ))}
        </div>

        <h1
          className="w-full text-center text-[clamp(2rem,5vw,44px)] font-bold leading-[180%] text-white"
          style={{ fontFamily: ara }}
        >
          {title}
        </h1>

        <p
          className="w-full text-center text-[16px] font-normal leading-6 text-white/70"
          style={{ fontFamily: ara }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default PageBanner;
