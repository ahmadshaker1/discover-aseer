import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AttractionsLandmarkCard from "@/components/attractions/AttractionsLandmarkCard";
import type { ExperienceCardProps } from "@/components/experiences/ExperienceCard/ExperienceCard";
import type { Landmark } from "@/components/landmarks/data";

const ara = "var(--font-ara-hamah-1964), sans-serif";

export interface AseerCuisineCookingExperiencesSectionData {
  // Backend (Directus): right panel heading.
  title: string;
  // Backend (Directus): right panel description.
  description: string;
  // Backend (Directus): CTA text + target route.
  ctaLabel: string;
  ctaHref: string;
  // Backend (Directus): cards mapped 1:1 to ExperienceCardProps.
  cards: ExperienceCardProps[];
}

interface AseerCuisineCookingExperiencesSectionProps {
  data: AseerCuisineCookingExperiencesSectionData;
  /** When set, only this many cards are shown. */
  featuredCount?: number;
  decorationImageSrc?: string;
}

function experienceToLandmark(card: ExperienceCardProps): Landmark {
  return {
    id: String(card.id),
    slug: String(card.id),
    title: card.title,
    subtitle: card.duration || card.category || "",
    location: card.category || card.provider || "",
    area: "",
    city: "",
    description: card.description,
    contentHtml: "",
    guideName: card.provider || "",
    image: card.imageUrl,
    galleryImages: [],
    categoryLabel: card.category || "",
  };
}

const AseerCuisineCookingExperiencesSection = async ({
  data,
  featuredCount,
  decorationImageSrc,
}: AseerCuisineCookingExperiencesSectionProps) => {
  const t = await getTranslations("common");
  const displayCards =
    featuredCount == null ? data.cards : data.cards.slice(0, featuredCount);

  return (
    <section className="relative w-full overflow-hidden bg-background py-12 text-foreground">
      {decorationImageSrc ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute top-1/2 z-1 h-[450px] w-[750px] -translate-y-1/2 bg-primary opacity-40 start-0`}
          style={{
            WebkitMaskImage: `url(${decorationImageSrc})`,
            maskImage: `url(${decorationImageSrc})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "start center",
            maskPosition: "start center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 sm:px-8 md:px-[60px]">
        <div className="mx-auto mb-8 flex w-full max-w-[1320px] items-start justify-between gap-4">
          <div className={`min-w-0 flex-1 space-y-2 text-start pe-4`}>
            <h2
              className={`w-full max-w-[620px] text-[48px] font-bold leading-[100%] text-secondary text-start`}
              style={{ fontFamily: ara }}
            >
              {data.title}
            </h2>
            {data.description ? (
              <p
                className={`w-full max-w-[620px] text-[18px] font-normal leading-[140%] text-muted-foreground text-start`}
                style={{ fontFamily: ara }}
              >
                {data.description}
              </p>
            ) : null}
          </div>
          <Link
            href={data.ctaHref}
            className="inline-flex h-[52px] min-w-[161px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[55px] border border-primary/30 bg-primary px-8 text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90"
            style={{ fontFamily: ara }}
          >
            <span
              className={`whitespace-nowrap text-[20px] font-bold leading-[100%] text-start`}
            >
              {t("browseMore")}
            </span>
          </Link>
        </div>

        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 justify-items-center gap-6 pb-2 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4">
          {displayCards.map((card) => (
            <AttractionsLandmarkCard
              key={card.id}
              landmark={experienceToLandmark(card)}
              className="max-w-none"
              cardHref={`/experiences/${card.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineCookingExperiencesSection;
