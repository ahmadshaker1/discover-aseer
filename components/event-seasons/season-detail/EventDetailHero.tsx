import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SeasonDetail } from "../types";
import { BreadcrumbChevron } from "./icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface EventDetailHeroProps {
  season: SeasonDetail;
  title: string;
  imageUrl: string;
  categoryLabels: string[];
  isOver?: boolean;
}

export default async function EventDetailHero({
  season,
  title,
  imageUrl,
  categoryLabels,
  isOver = false,
}: EventDetailHeroProps) {
  const t = await getTranslations("eventSeasons");
  const tCommon = await getTranslations("common");

  return (
    <section
      className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden sm:min-h-[560px] lg:min-h-[721px]"
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/35 to-black/20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:gap-8 sm:px-8 sm:py-20 lg:px-12">
        <nav
          className="flex flex-wrap items-center justify-center gap-[9px]"
          style={{ fontFamily: ara }}
          aria-label={t("breadcrumb")}
        >
          <Link
            href="/"
            className="text-[16px] font-bold leading-[119%] text-white transition-opacity [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] hover:opacity-85"
          >
            {tCommon("breadcrumbHome")}
          </Link>
          <BreadcrumbChevron />
          <Link
            href="/event-seasons"
            className="text-[16px] font-bold leading-[119%] text-white transition-opacity [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] hover:opacity-85"
          >
            {t("breadcrumb")}
          </Link>
          <BreadcrumbChevron />
          <Link
            href={`/event-seasons/${season.id}`}
            className="text-[16px] font-bold leading-[119%] text-white transition-opacity [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] hover:opacity-85"
          >
            {season.title}
          </Link>
          <BreadcrumbChevron />
          <span className="max-w-[240px] truncate text-[16px] font-bold leading-[119%] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] sm:max-w-[360px]">
            {title}
          </span>
        </nav>

        {categoryLabels.length > 0 || isOver ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categoryLabels.map((label) => (
              <span
                key={label}
                className="inline-flex h-[33px] items-center justify-center rounded-[20px] border border-white/40 bg-white/15 px-[18px] text-[16px] font-bold leading-none text-white backdrop-blur-sm"
                style={{ fontFamily: ara }}
              >
                {label}
              </span>
            ))}
            {isOver ? (
              <span
                className="inline-flex h-[33px] items-center justify-center rounded-[20px] bg-black/50 px-[18px] text-[16px] font-bold leading-none text-white"
                style={{ fontFamily: ara }}
              >
                {t("eventOver")}
              </span>
            ) : null}
          </div>
        ) : null}

        <h1
          className="mx-auto max-w-[900px] text-center text-[clamp(2rem,6vw,70px)] font-bold leading-[119%] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
          style={{ fontFamily: ara }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
