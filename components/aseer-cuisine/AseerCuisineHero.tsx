export interface AseerCuisineHeroData {
  // Backend (Directus): video file URL.
  videoUrl: string;
  // Backend (Directus): fallback image URL shown while video loads/fails.
  posterImage: string;
}

interface AseerCuisineHeroProps {
  data: AseerCuisineHeroData;
}

const AseerCuisineHero = ({ data }: AseerCuisineHeroProps) => {
  return (
    <section className="relative h-[420px] w-full overflow-hidden md:h-[812px]">
      {/* Backend (Directus): replace data.videoUrl with actual uploaded video URL. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={data.posterImage}
      >
        <source src={data.videoUrl} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(359.49deg, rgba(0, 0, 0, 0) 27.9%, rgba(0, 0, 0, 0.5) 76.91%)",
        }}
      />
    </section>
  );
};

export default AseerCuisineHero;
