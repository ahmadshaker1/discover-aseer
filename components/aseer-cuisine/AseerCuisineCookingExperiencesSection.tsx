import Link from "next/link";
import ExperienceCard, {
  type ExperienceCardProps,
} from "@/components/experiences/ExperienceCard/ExperienceCard";

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
    <section className="mx-auto w-full max-w-[1441px] p-4 sm:p-8 md:p-[60px]" dir="rtl">
      <div className="flex h-full w-full flex-col gap-[50px]">
        <div className="flex w-full flex-col gap-6 lg:h-[520px] lg:flex-row lg:items-start lg:justify-between lg:gap-[114px]">
          {/* Right panel */}
          <div className="flex w-full max-w-[337px] flex-col gap-12 lg:h-[284px]">
            <div className="flex flex-col gap-5 text-right">
              <h2
                className="text-[68px] font-bold leading-[100%] text-[#280048]"
                style={{ fontFamily: ara }}
              >
                {data.title}
              </h2>
              <p
                className="text-[15px] font-light leading-[119%] text-[#252525]/80"
                style={{ fontFamily: ibm }}
              >
                {data.description}
              </p>
            </div>

            <Link
              href={data.ctaHref}
              className="flex h-[52px] w-[161px] items-center justify-center rounded-[55px] border border-[#FFFFFF54] bg-[#6027D2] p-[10px] text-[20px] font-bold leading-[119%] text-white transition-opacity hover:opacity-90"
              style={{ fontFamily: ara }}
            >
              {data.ctaLabel}
            </Link>
          </div>

          {/* Left panel: exact experiences cards, horizontally scrollable */}
          <div className="w-full max-w-[875px] overflow-x-auto">
            {/* Backend (Directus): provide `cards` with ExperienceCard fields; no component/style changes needed. */}
            <div className="flex min-w-max gap-8 pb-2">
              {data.cards.map((card) => (
                <div key={card.id} className="w-[300px] shrink-0">
                  <ExperienceCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineCookingExperiencesSection;
