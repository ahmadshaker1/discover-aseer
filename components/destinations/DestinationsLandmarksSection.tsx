import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import DestinationsGridCard from "@/components/destinations/DestinationsGridCard";
import type { Destination } from "@/components/destinations/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface DestinationsLandmarksSectionProps {
  destinations: Destination[];
}

function LeftArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <path
        d="M3.01172 8.69438L13.6367 8.69438"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.29688 12.9616L3.01146 8.69459L7.29688 4.42688"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DestinationsLandmarksSection = async ({ destinations }: DestinationsLandmarksSectionProps) => {
  const t = await getTranslations("destinations");
  const tCommon = await getTranslations("common");

  return (
    <section className="w-full bg-background py-12 text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div className="mx-auto mb-8 flex h-[58px] w-full max-w-[1320px] items-center justify-between">
          <h2
            className="h-[58px] w-full max-w-[498px] text-start text-[48px] font-bold leading-[100%] text-secondary"
            style={{ fontFamily: ara }}
          >
            {t("landmarksSectionTitle")}
          </h2>

          <Link
            href="/destinations/browse"
            className="inline-flex h-6 shrink-0 items-center gap-2 text-secondary hover:opacity-80"
            style={{ fontFamily: ara }}
          >
            <span className="whitespace-nowrap text-start text-[20px] font-bold leading-[100%] text-secondary">
              {tCommon("browseMore")}
            </span>
            <LeftArrowIcon className="shrink-0 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {destinations.slice(0, 8).map((d) => (
            <DestinationsGridCard key={d.id} destination={d} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsLandmarksSection;
