import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import DestinationsGridCard from "@/components/destinations/DestinationsGridCard";
import type { Destination } from "@/components/destinations/data";
import { LeftPointerIcon } from "@/components/shared/icons";


interface DestinationsLandmarksSectionProps {
  destinations: Destination[];
  sectionTitle: string;
  excludeSlug?: string;
}

const DestinationsLandmarksSection = async ({
  destinations,
  sectionTitle,
  excludeSlug,
}: DestinationsLandmarksSectionProps) => {
  const tCommon = await getTranslations("common");

  const visible = destinations
    .filter((d) => !excludeSlug || d.slug !== excludeSlug)
    .slice(0, 4);

  if (visible.length === 0) return null;

  return (
    <section className="w-full bg-background py-12 text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
        <div
          className={`mx-auto mb-8 flex h-[58px] w-full max-w-[1320px] items-center ${
            true ? "justify-between" : "justify-start"
          }`}
        >
          <h2
            className="min-w-0 flex-1 whitespace-nowrap text-start text-[48px] font-bold leading-[100%] text-secondary"
          >
            {sectionTitle}
          </h2>

          <Link
            href="/destinations"
            className="inline-flex h-6 shrink-0 items-center gap-2 text-secondary hover:opacity-80"
          >
            <span className="whitespace-nowrap text-start text-[20px] font-bold leading-[100%] text-secondary">
              {tCommon("browseMore")}
            </span>
            <LeftPointerIcon className="shrink-0 ltr:rotate-180" />
          </Link>
        </div>

        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((d) => (
            <DestinationsGridCard key={d.id} destination={d} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsLandmarksSection;
