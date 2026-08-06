import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";


function BreadcrumbChevron() {
  return (
    <svg
      width="5"
      height="10"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="ltr:rotate-180"
    >
      <path
        d="M4.25135 -1.87195e-06C4.35427 -1.88095e-06 4.45719 0.0379143 4.53844 0.119164C4.69552 0.276247 4.69552 0.536248 4.53844 0.693332L1.00677 4.225C0.74677 4.485 0.74677 4.9075 1.00677 5.1675L4.53844 8.69916C4.69552 8.85625 4.69552 9.11625 4.53844 9.27333C4.38135 9.43041 4.12135 9.43041 3.96427 9.27333L0.432604 5.74167C0.156354 5.46542 -0.00072946 5.09166 -0.000729494 4.69625C-0.000729529 4.30083 0.150937 3.92708 0.432603 3.65083L3.96427 0.119165C4.04552 0.0433312 4.14844 -1.86295e-06 4.25135 -1.87195e-06Z"
        fill="white"
      />
    </svg>
  );
}

export default async function IdentityFilesHero() {
  const t = await getTranslations("identityfiles");
  const tCommon = await getTranslations("common");

  return (
    <section className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/identityfiles/hero.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 text-center sm:px-10 md:px-16">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-sm font-medium sm:text-base">
          <Link href="/" className="transition-opacity hover:opacity-80">
            {tCommon("home")}
          </Link>
          <span aria-hidden>
            <BreadcrumbChevron />
          </span>
          <span className="text-white/75">{t("navigation.companies")}</span>
        </div>

        <h1
          className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
        >
          {t("title")}
        </h1>
      </div>
    </section>
  );
}
