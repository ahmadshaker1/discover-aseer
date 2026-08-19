"use client";

import AseerCuisineVideoPlayer from "@/components/aseer-cuisine/AseerCuisineVideoPlayer";

interface FilmHeroProps {
  videoUrl?: string;
  posterUrl?: string;
}

const FALLBACK_FILM_HERO_VIDEO = "/assets/film/hero-film.mp4";
const FALLBACK_FILM_HERO_POSTER = "/assets/film/film-hero.png";

const HERO_GRADIENT =
  "linear-gradient(359.49deg, rgba(0, 0, 0, 0) 27.9%, rgba(0, 0, 0, 0.5) 76.91%)";

export default function FilmHero({ videoUrl, posterUrl }: FilmHeroProps = {}) {
  return (
    <section className="relative h-[420px] w-full overflow-hidden sm:h-[560px] md:h-[809px]">
      <AseerCuisineVideoPlayer
        src={videoUrl || FALLBACK_FILM_HERO_VIDEO}
        poster={posterUrl || FALLBACK_FILM_HERO_POSTER}
        ariaLabel="Film in Aseer"
        overlay={
          <div
            className="absolute inset-0"
            style={{ background: HERO_GRADIENT }}
          />
        }
      />
    </section>
  );
}
