import Link from "next/link";
import type { ExperienceCardProps } from "@/components/experiences/ExperienceCard/ExperienceCard";
import AseerExperiencesCardsCarousel from "@/components/experiences/AseerExperiencesCardsCarousel";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

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
}

const AseerCuisineCookingExperiencesSection = ({
  data,
}: AseerCuisineCookingExperiencesSectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] py-4 text-foreground sm:py-8 md:py-[60px]">
      <div className="flex w-full flex-col gap-8 lg:gap-12">
        {/* Intro column */}
        <div className="flex w-full flex-col gap-12 px-4 sm:px-8 md:px-[60px]">
          <div className="flex flex-col gap-5 text-start">
            <h2
              className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-bold text-secondary"
              style={{ fontFamily: ara }}
            >
              {data.title}
            </h2>
            <p
              className="max-w-[800px] text-[15px] font-light text-muted-foreground"
              style={{ fontFamily: ibm }}
            >
              {data.description}
            </p>
          </div>

          {/*
            //! no need for now 
            <Link
              href={data.ctaHref}
              className="flex h-[52px] w-[161px] items-center justify-center rounded-[55px] border border-primary/40 bg-primary p-[10px] text-[20px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90"
              style={{ fontFamily: ara }}
            >
              {data.ctaLabel}
            </Link> */}
        </div>

        {/* Carousel */}
        <div className="w-full">
          <AseerExperiencesCardsCarousel cards={data.cards} />
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineCookingExperiencesSection;
