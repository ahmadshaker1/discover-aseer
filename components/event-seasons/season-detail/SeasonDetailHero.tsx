import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SeasonDetail } from "../types";
import { BreadcrumbChevron } from "./icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface SeasonDetailHeroProps {
  season: SeasonDetail;
}

export default async function SeasonDetailHero({ season }: SeasonDetailHeroProps) {
  const t = await getTranslations("eventSeasons");
  const tCommon = await getTranslations("common");

  return (
    <section
      className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden sm:min-h-[560px] lg:min-h-[721px]"
      style={{
        backgroundImage: `url('${season.imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/35 to-black/20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-4 py-16 text-center sm:px-8 sm:py-20 lg:px-12">
        <nav
          className="flex flex-wrap items-center justify-center gap-[9px]"
          style={{ fontFamily: ara }}
          aria-label={t("breadcrumb")}
        >
          <span className="text-[16px] font-bold leading-[119%] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
            {season.title}
          </span>
          <BreadcrumbChevron />
          <Link
            href="/event-seasons"
            className="text-[16px] font-bold leading-[119%] text-white transition-opacity [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] hover:opacity-85"
          >
            {t("breadcrumb")}
          </Link>
          <BreadcrumbChevron />
          <Link
            href="/"
            className="text-[16px] font-bold leading-[119%] text-white transition-opacity [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] hover:opacity-85"
          >
            {tCommon("breadcrumbHome")}
          </Link>
        </nav>

        <h1
          className="mx-auto max-w-[900px] text-center text-[clamp(2rem,6vw,70px)] font-bold leading-[119%] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
          style={{ fontFamily: ara }}
        >
          {season.title}
        </h1>
      </div>
    </section>
  );
}
