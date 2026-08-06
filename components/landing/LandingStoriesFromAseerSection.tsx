"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { LandingStoryFromAseer } from "@/components/landing/storiesFromAseerTypes";
import {
  getYouTubeEmbedSrc,
  LANDING_STORY_YOUTUBE_URLS,
} from "@/components/landing/youtubeStoryEmbed";


const STORY_CAPTION_KEYS = ["storyVideo2Title", "storyVideo1Title"] as const;

function PlayIcon43() {
  return (
    <svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M42.5 21.5C42.5 9.90202 33.098 0.5 21.5 0.5C9.90202 0.5 0.5 9.90202 0.5 21.5C0.5 33.098 9.90202 42.5 21.5 42.5C33.098 42.5 42.5 33.098 42.5 21.5Z"
        fill="white"
      />
      <path
        d="M16.6667 20.9998V18.6264C16.6667 15.6798 18.7533 14.4731 21.3067 15.9464L23.3667 17.1331L25.4267 18.3198C27.98 19.7931 27.98 22.2064 25.4267 23.6798L23.3667 24.8664L21.3067 26.0531C18.7533 27.5264 16.6667 26.3198 16.6667 23.3731V20.9998Z"
        fill="#280048"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface LandingStoriesFromAseerSectionProps {
  /** Pass loaded CMS items; falls back to translated placeholders when omitted or empty */
  stories?: LandingStoryFromAseer[] | null;
  /** Optional override for the section heading */
  title?: string;
  playVideoLabelPrefix?: string;
}

function defaultLandingStories(): LandingStoryFromAseer[] {
  return [
    {
      id: "story-1",
      year: "2024",
      posterSrc: "/assets/landing/videoPlaceholder.png",
      videoUrl: LANDING_STORY_YOUTUBE_URLS[0],
      description: "",
    },
    {
      id: "story-2",
      year: "2023",
      posterSrc: "/assets/landing/videoPlaceholder.png",
      videoUrl: LANDING_STORY_YOUTUBE_URLS[1],
      description: "",
    },
  ];
}

export default function LandingStoriesFromAseerSection({
  stories,
  title,
  playVideoLabelPrefix,
}: LandingStoriesFromAseerSectionProps) {
  const tHome = useTranslations("home");
  const resolvedTitle = title ?? tHome("storiesTitle");
  const resolvedPlayPrefix = playVideoLabelPrefix ?? tHome("playVideoPrefix");
  const fallbackStories = defaultLandingStories();
  const items =
    stories && stories.length > 0 ? stories.slice(0, 2) : fallbackStories;

  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 bg-background px-4 py-10 text-foreground md:px-[120px] md:pb-14 md:pt-10">
      <div
        className={`mx-auto flex w-full max-w-screen-2xl min-h-[94px] flex-col items-start justify-center`}
      >
        <div className="flex w-fit max-w-full flex-col gap-[10px] border-b border-border pb-[10px] pt-[7px]">
          <h2
            className={`whitespace-nowrap text-start text-[clamp(36px,5vw,64px)] font-bold leading-[119%] text-foreground`}
          >
            {resolvedTitle}
          </h2>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
        {items.map((story, index) => {
          const youtubeEmbedSrc = getYouTubeEmbedSrc(story.videoUrl);
          const captionKey = STORY_CAPTION_KEYS[index];
          const caption = captionKey ? tHome(captionKey) : "";
          const iframeTitle = caption
            ? `${resolvedTitle} — ${caption}`
            : `${resolvedTitle} — ${index + 1}`;

          return (
            <article key={story.id} className="min-w-0">
              <div className="relative h-[422px] w-full max-w-[584px] overflow-hidden rounded-[12px] bg-black md:max-w-none">
                {youtubeEmbedSrc ? (
                  <iframe
                    title={iframeTitle}
                    src={`${youtubeEmbedSrc}?rel=0`}
                    className="absolute inset-0 z-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <Image
                    src={story.posterSrc}
                    alt={iframeTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 584px"
                    priority={false}
                  />
                )}

                {!youtubeEmbedSrc ? (
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                    {story.videoUrl ? (
                      <a
                        href={story.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto inline-flex cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                        aria-label={
                          caption
                            ? `${resolvedPlayPrefix}: ${caption}`
                            : resolvedPlayPrefix
                        }
                      >
                        <PlayIcon43 />
                      </a>
                    ) : (
                      <span
                        className="pointer-events-none inline-flex"
                        aria-hidden
                      >
                        <PlayIcon43 />
                      </span>
                    )}
                  </div>
                ) : null}
              </div>
              {caption ? (
                <p
                  className="mt-4 text-start text-[clamp(18px,2.2vw,24px)] font-bold leading-[130%] text-foreground"
                >
                  {caption}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
