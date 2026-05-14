"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Landmark } from "@/components/landmarks/data";
import SafeHtml from "@/components/common/SafeHtml";

const ara = "var(--font-ara-hamah-1964), sans-serif";

interface AttractionsLandmarkCardProps {
  landmark: Landmark;
  categoryLabel?: string;
  className?: string;
  /** Full-card tap target; share control stays above this layer. */
  cardHref?: string;
}

function LocationIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8.5 14.8042L12.0063 11.2979C12.6996 10.6045 13.1718 9.72099 13.3631 8.75919C13.5544 7.79738 13.4562 6.80045 13.0809 5.89446C12.7056 4.98847 12.07 4.21412 11.2547 3.66931C10.4393 3.12451 9.48065 2.83372 8.5 2.83372C7.51936 2.83372 6.56074 3.12451 5.74535 3.66931C4.92997 4.21412 4.29445 4.98847 3.91915 5.89446C3.54385 6.80045 3.44563 7.79738 3.63691 8.75919C3.82818 9.72099 4.30037 10.6045 4.99375 11.2979L8.5 14.8042ZM8.5 16.8074L3.99217 12.2995C3.10062 11.408 2.49347 10.272 2.24749 9.03542C2.00152 7.79879 2.12777 6.517 2.61028 5.35212C3.09279 4.18725 3.90989 3.19161 4.95825 2.49112C6.00661 1.79063 7.23915 1.41675 8.5 1.41675C9.76086 1.41675 10.9934 1.79063 12.0418 2.49112C13.0901 3.19161 13.9072 4.18725 14.3897 5.35212C14.8722 6.517 14.9985 7.79879 14.7525 9.03542C14.5065 10.272 13.8994 11.408 13.0078 12.2995L8.5 16.8074ZM8.5 9.20836C8.87573 9.20836 9.23606 9.0591 9.50174 8.79343C9.76741 8.52775 9.91667 8.16742 9.91667 7.79169C9.91667 7.41597 9.76741 7.05563 9.50174 6.78996C9.23606 6.52428 8.87573 6.37503 8.5 6.37503C8.12428 6.37503 7.76395 6.52428 7.49827 6.78996C7.23259 7.05563 7.08334 7.41597 7.08334 7.79169C7.08334 8.16742 7.23259 8.52775 7.49827 8.79343C7.76395 9.0591 8.12428 9.20836 8.5 9.20836Z"
        fill="currentColor"
      />
    </svg>
  );
}

const AttractionsLandmarkCard = ({
  landmark,
  className = "",
  cardHref,
}: AttractionsLandmarkCardProps) => {
  const tCommon = useTranslations("common");
  const [failedForUrl, setFailedForUrl] = useState<string | null>(null);
  const imageFailed = failedForUrl === landmark.image;

  /** One grid cell: stack background image, overlays, and link. */
  const layer = "col-start-1 row-start-1";

  const showImage = !imageFailed && Boolean(landmark.image);

  return (
    <article
      className={`relative isolate grid h-[420px] w-full max-w-[320px] grid-cols-1 grid-rows-1 overflow-hidden rounded-xl bg-black text-primary-foreground shadow-[0_4.28px_3.37px_0_rgba(41,72,152,0.01),0_8.72px_6.97px_0_rgba(41,72,152,0.02),0_21.4px_13.91px_0_rgba(41,72,152,0.02)] ${className}`}
    >
      {/* Hidden probe so we can clear a broken URL without relying on onError on the bg layer */}
      {landmark.image ? (
        <Image
          src={landmark.image}
          alt=""
          width={1}
          height={1}
          className="pointer-events-none absolute opacity-0"
          aria-hidden
          onError={() => setFailedForUrl(landmark.image)}
        />
      ) : null}
      <div
        aria-hidden
        className={`${layer} size-full bg-cover bg-center bg-no-repeat`}
        style={
          showImage
            ? { backgroundImage: `url(${JSON.stringify(landmark.image)})` }
            : undefined
        }
      />
      {imageFailed ? (
        <div
          className={`${layer} pointer-events-none z-1 size-full bg-black/45`}
          aria-hidden
        />
      ) : null}

      <div
        className={`${layer} z-2 flex size-full min-h-0 flex-col items-start justify-end gap-3 bg-linear-to-b from-transparent to-black px-5 py-6 pb-7 text-white ${
          cardHref ? "pointer-events-none" : ""
        }`}
      >
        <div className="inline-flex w-fit flex-row items-center gap-1.5 rounded-[24.51px] text-start text-[#EAD0FF]">
          <LocationIcon />
          <span
            className="text-[18px] font-bold leading-[100%]"
            style={{ fontFamily: ara }}
          >
            {landmark.location || tCommon("landmarkDefaultLocation")}
          </span>
        </div>

        <div
          className={`flex w-full max-w-[251px] flex-col gap-2 self-start text-start`}
        >
          <h3
            className={`text-[24px] font-bold leading-[115%] text-start`}
            style={{ fontFamily: ara }}
          >
            {landmark.title}
          </h3>
          <SafeHtml
            html={landmark.description}
            className={`line-clamp-2 text-[18px] leading-[125%] text-white/80 text-start`}
          />
        </div>
      </div>

      {cardHref ? (
        <Link
          href={cardHref}
          className={`${layer} z-10 h-full w-full min-h-0`}
          aria-label={tCommon("goToLandmark", { title: landmark.title })}
        />
      ) : null}
    </article>
  );
};

export default AttractionsLandmarkCard;
