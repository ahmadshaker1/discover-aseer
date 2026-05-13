import Image from "next/image";

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
  const videoSrc = data.videoUrl?.trim() ?? "";

  return (
    <section className="relative h-[420px] w-full overflow-hidden md:h-[812px]">
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={data.posterImage}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0">
          <Image
            src={data.posterImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

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
