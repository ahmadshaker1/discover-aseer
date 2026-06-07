"use client";

import type { FilmLandscape } from "@/components/film/data";
import { landscapeKeyToDestinationFilter } from "@/components/destinations/filterOptions";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface FilmLandscapesSectionProps {
  landscapes: FilmLandscape[];
  introTitle: string;
  introBody: string;
}

const FilmLandscapesSection = ({
  landscapes,
  introTitle,
  introBody,
}: FilmLandscapesSectionProps) => {
  const t = useTranslations("film");

  return (
    <section className="mx-auto h-auto w-full max-w-[1442px] bg-background px-4 py-[60px] sm:px-8 md:px-[62px]">
      <div className="mx-auto flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
        <div className="hide-scrollbar w-full flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex min-w-max items-start gap-6 pb-2">
            <div className="flex h-auto w-full max-w-[350px] flex-col gap-8 text-start lg:h-[265px]">
              <h2
                className="text-[44px] font-bold leading-[38px] text-foreground"
                style={{ fontFamily: ara }}
              >
                {introTitle}
              </h2>
              <p
                className="text-[15px] font-light leading-[119%] text-muted-foreground"
                style={{ fontFamily: ibm }}
              >
                {introBody}
              </p>
            </div>
            {landscapes.slice(0, 4).map((item) => {
              const label = item.labelKey ? t(item.labelKey) : "";
              const destinationFilter = landscapeKeyToDestinationFilter(
                item.filterId,
              );
              return (
                <Link
                  key={item.id}
                  href={
                    destinationFilter
                      ? {
                          pathname: "/destinations",
                          query: { filter: destinationFilter },
                        }
                      : "/destinations"
                  }
                  className="group relative block h-[305px] w-[282px] shrink-0 overflow-hidden rounded-[10px] shadow-[0px_4.28px_3.37px_0px_rgba(41,72,152,0.01),0px_8.72px_6.97px_0px_rgba(41,72,152,0.02),0px_21.4px_13.91px_0px_rgba(41,72,152,0.02)] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label={t("landscapes.viewDestinations", { label })}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-opacity group-hover:opacity-90"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[91px] rounded-b-[10px] bg-linear-to-b from-transparent to-black p-5">
                    <h3
                      className="text-start text-[24px] font-bold leading-[119%] text-white"
                      style={{ fontFamily: ara }}
                    >
                      {label}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmLandscapesSection;
