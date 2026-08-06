"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ABOUT_ASEER_HIGHLIGHT_DESTINATION_FILTERS,
  LANDSCAPE_HIGHLIGHT_IMAGES,
} from "@/components/destinations/filterOptions";

const TITLE_KEYS = [
  "story.highlights.h1",
  "story.highlights.h2",
  "story.highlights.h3",
  "story.highlights.h4",
] as const;

/**
 * Landscape destination cards on the home page — same assets/labels as About Aseer + Film.
 */
export default function LandingLandscapesSection() {
  const t = useTranslations("aboutAseer");

  const cards = TITLE_KEYS.map((titleKey, index) => ({
    id: `landing-landscape-${index + 1}`,
    title: t(titleKey),
    image: LANDSCAPE_HIGHLIGHT_IMAGES[index],
    href: {
      pathname: "/destinations" as const,
      query: { filter: ABOUT_ASEER_HIGHLIGHT_DESTINATION_FILTERS[index] },
    },
  }));

  return (
    <section className="mx-auto w-full max-w-[1440px] bg-background px-4 py-12 text-foreground md:px-[64px] md:py-16">
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="group relative block h-[305px] w-full max-w-[310px] justify-self-center overflow-hidden rounded-[10px] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 310px"
            />
            <div className="absolute inset-x-0 bottom-0 flex h-[91px] items-end justify-center rounded-b-[10px] bg-linear-to-b from-transparent to-black p-5">
              <p className="line-clamp-2 w-full text-center text-[16px] font-bold leading-[120%] text-white">
                {card.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
