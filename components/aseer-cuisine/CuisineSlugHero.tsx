"use client";

import { Link } from "@/i18n/navigation";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const brando = "var(--font-brando), sans-serif";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CuisineSlugHeroProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  backgroundImage: string;
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
      className="shrink-0 rotate-180 rtl:rotate-0"
    >
      <path
        d="M4.25184 0C4.35476 0 4.45767 0.0379143 4.53892 0.119164C4.69601 0.276247 4.69601 0.536248 4.53893 0.693332L1.00726 4.225C0.747259 4.485 0.747259 4.9075 1.00726 5.1675L4.53893 8.69916C4.69601 8.85625 4.69601 9.11625 4.53893 9.27333C4.38184 9.43041 4.12184 9.43041 3.96476 9.27333L0.433092 5.74167C0.156842 5.46542 -0.000241179 5.09166 -0.000241213 4.69625C-0.000241248 4.30083 0.151425 3.92708 0.433092 3.65083L3.96476 0.119165C4.04601 0.0433312 4.14893 0 4.25184 0Z"
        fill="white"
      />
    </svg>
  );
}

const CuisineSlugHero = ({ breadcrumbs, title, backgroundImage }: CuisineSlugHeroProps) => {
  return (
    <section
      className="relative flex h-[687px] w-full flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 lg:px-12">
        <div className="flex w-full max-w-[610px] flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-[31px] text-center">
            <div
              className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
              style={{ fontFamily: ara }}
            >
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5 sm:gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-[16px] font-normal leading-6 text-white/70 transition-opacity hover:opacity-85"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[16px] font-normal leading-6 text-white">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? <BreadcrumbChevron /> : null}
                </span>
              ))}
            </div>

            <h1
              className="w-full text-[clamp(2rem,5vw,44px)] font-bold leading-[180%] text-white"
              style={{ fontFamily: brando }}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuisineSlugHero;
