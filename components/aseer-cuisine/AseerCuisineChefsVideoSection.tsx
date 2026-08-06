"use client";

import Image from "next/image";
import AseerCuisineVideoPlayer from "./AseerCuisineVideoPlayer";

export interface AseerCuisineChefsVideoSectionData {
  // Backend (Directus): section title text.
  title: string;
  // Backend (Directus): section subtitle text.
  subtitle: string;
  // Backend (Directus): hosted video URL for this section.
  videoUrl: string;
  // Backend (Directus): poster/fallback image URL.
  posterImage: string;
}

interface AseerCuisineChefsVideoSectionProps {
  data: AseerCuisineChefsVideoSectionData;
}

const AseerCuisineChefsVideoSection = ({
  data,
}: AseerCuisineChefsVideoSectionProps) => {
  const videoSrc = data.videoUrl?.trim() ?? "";

  return (
    <section className="mx-auto w-full max-w-[1440px] bg-background py-8 text-foreground">
      <div className="flex w-full flex-col gap-8">
        <div className="px-4 sm:px-8 xl:px-[120px]">
          <div className="mx-auto flex w-full max-w-[704px] flex-col items-center gap-3 text-center">
            <h2
              className="w-full text-center text-[48px] font-bold leading-[100%] text-secondary"
            >
              {data.title}
            </h2>
            {/*  //! no need for now
            <p
              className="w-full text-center text-[15px] font-light leading-[119%] text-muted-foreground"
            >
              {data.subtitle}
            </p> 
            */}
          </div>
        </div>

        <div className="relative h-[811px] w-full overflow-hidden">
          {videoSrc ? (
            <AseerCuisineVideoPlayer
              src={videoSrc}
              poster={data.posterImage}
              ariaLabel={data.title}
            />
          ) : (
            <Image
              src={data.posterImage}
              alt={data.title}
              width={1440}
              height={811}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AseerCuisineChefsVideoSection;
