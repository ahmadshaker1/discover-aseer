"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const ara = "var(--font-ara-hamah-1964), sans-serif";

const OVERLAY_GRADIENT =
  "linear-gradient(179.52deg, rgba(0, 0, 0, 0) 5.53%, #000000 99.58%)";

type LocalizedLandingCard = {
  title: string;
  href: string;
  image: string;
};

interface LandingWelcomeSectionProps {
  title?: string;
  description?: string;
  cards?: LocalizedLandingCard[];
}

/**
 * Welcome block under the hero: centered title + subtitle, then six linked image cards (3×2).
 */
const LandingWelcomeSection = ({
  title,
  description,
  cards,
}: LandingWelcomeSectionProps) => {
  const tHome = useTranslations("home");
  const tCommon = useTranslations("common");

  const resolvedTitle = title ?? tHome("welcomeTitle");
  const resolvedDescription = description ?? tHome("welcomeDescription");

  const resolvedCards: LocalizedLandingCard[] = cards ?? [
    {
      title: tCommon("eventsSeasonsCard"),
      href: "/event-seasons",
      image: "/assets/landing/fireworks.png",
    },
    {
      title: tCommon("experiencesCard"),
      href: "/experiences",
      image: "/assets/activities/activities.jpg",
    },
    {
      title: tCommon("mainDestinationsCard"),
      href: "/destinations",
      image: "/assets/landing/city1.jpg",
    },
    {
      title: tCommon("stayInAseerCard"),
      href: "/accommodation",
      image: "/assets/landing/manwalking.jpg",
    },
    {
      title: tCommon("cuisineNavTitle"),
      href: "/aseer-cuisine",
      image: "/assets/activities/aseer-cuisine.jpg",
    },
    {
      title: tCommon("attractionsCard"),
      href: "/attractions",
      image: "/assets/experiences/experiences.png",
    },
  ];

  return (
    <section
      className="mx-auto w-full max-w-[1440px] bg-background px-4 py-12 text-foreground md:px-[130px] md:py-[86px]"
     
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-12 md:gap-[48px]">
        <div className="flex w-full flex-col items-center gap-[50px]">
          <h2
            className="w-full text-center text-[clamp(40px,5vw,64px)] font-bold leading-[119%] text-foreground"
            style={{ fontFamily: ara }}
          >
            {resolvedTitle}
          </h2>
          <p
            className="w-full max-w-[744px] text-center text-[clamp(18px,2vw,24px)] font-bold leading-[119%] text-muted-foreground"
            style={{ fontFamily: ara }}
          >
            {resolvedDescription}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 justify-items-center gap-[34px] sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3">
          {resolvedCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block h-[266px] w-full max-w-[382.67px] overflow-hidden rounded-lg outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:max-w-none"
              style={{ borderRadius: 8 }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) min(382px, 100vw), (max-width: 1024px) 45vw, 31vw"
              />
              <div
                className="absolute inset-x-0 bottom-0 flex h-[155px] flex-col justify-end gap-5"
                style={{
                  background: OVERLAY_GRADIENT,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  paddingTop: 32,
                  paddingBottom: 32,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <span
                  className={`block w-full text-start text-[22px] font-bold leading-[119%] text-white md:text-[24px]`}
                  style={{ fontFamily: ara }}
                >
                  {card.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingWelcomeSection;
