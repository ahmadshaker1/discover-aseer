import Image from "next/image";
import AseerCuisineVideoPlayer from "./AseerCuisineVideoPlayer";

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
        <AseerCuisineVideoPlayer
          src={videoSrc}
          poster={data.posterImage}
          overlay={
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(359.49deg, rgba(0, 0, 0, 0) 27.9%, rgba(0, 0, 0, 0.5) 76.91%)",
              }}
            />
          }
        />
      ) : (
        <>
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
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(359.49deg, rgba(0, 0, 0, 0) 27.9%, rgba(0, 0, 0, 0.5) 76.91%)",
            }}
          />
        </>
      )}
    </section>
  );
};

export default AseerCuisineHero;
