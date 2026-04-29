"use client";

import type { Landmark } from "@/components/landmarks/data";
import SafeHtml from "@/components/common/SafeHtml";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface AttractionsLandmarkCardProps {
  landmark: Landmark;
  categoryLabel?: string;
  className?: string;
}

function ShareIcon() {
  return (
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.6" />
      <path
        d="M16.7455 19.3487L13.9462 17.8221C13.5807 18.2128 13.1062 18.4845 12.5842 18.602C12.0623 18.7194 11.5171 18.6772 11.0194 18.4807C10.5218 18.2843 10.0948 17.9427 9.79388 17.5003C9.49295 17.058 9.33203 16.5354 9.33203 16.0004C9.33203 15.4654 9.49295 14.9428 9.79388 14.5004C10.0948 14.0581 10.5218 13.7165 11.0194 13.52C11.5171 13.3236 12.0623 13.2813 12.5842 13.3988C13.1062 13.5163 13.5807 13.788 13.9462 14.1787L16.7462 12.6521C16.5872 12.0228 16.6632 11.3571 16.9599 10.7799C17.2566 10.2026 17.7537 9.75337 18.3579 9.51639C18.9622 9.2794 19.6321 9.27092 20.2422 9.49254C20.8522 9.71416 21.3605 10.1507 21.6717 10.7202C21.9829 11.2898 22.0758 11.9533 21.9328 12.5864C21.7898 13.2195 21.4208 13.7787 20.895 14.1593C20.3692 14.5398 19.7226 14.7155 19.0766 14.6534C18.4305 14.5913 17.8292 14.2957 17.3855 13.8221L14.5855 15.3487C14.693 15.7763 14.693 16.2238 14.5855 16.6514L17.3848 18.1781C17.8286 17.7044 18.4298 17.4088 19.0759 17.3467C19.722 17.2846 20.3685 17.4603 20.8943 17.8408C21.4201 18.2214 21.7891 18.7806 21.9321 19.4137C22.0751 20.0468 21.9823 20.7103 21.671 21.2799C21.3598 21.8494 20.8515 22.2859 20.2415 22.5076C19.6314 22.7292 18.9615 22.7207 18.3573 22.4837C17.753 22.2467 17.256 21.7975 16.9593 21.2203C16.6625 20.643 16.5865 19.9773 16.7455 19.3481V19.3487Z"
        fill="#09121F"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M8.5 14.8042L12.0063 11.2979C12.6996 10.6045 13.1718 9.72099 13.3631 8.75919C13.5544 7.79738 13.4562 6.80045 13.0809 5.89446C12.7056 4.98847 12.07 4.21412 11.2547 3.66931C10.4393 3.12451 9.48065 2.83372 8.5 2.83372C7.51936 2.83372 6.56074 3.12451 5.74535 3.66931C4.92997 4.21412 4.29445 4.98847 3.91915 5.89446C3.54385 6.80045 3.44563 7.79738 3.63691 8.75919C3.82818 9.72099 4.30037 10.6045 4.99375 11.2979L8.5 14.8042ZM8.5 16.8074L3.99217 12.2995C3.10062 11.408 2.49347 10.272 2.24749 9.03542C2.00152 7.79879 2.12777 6.517 2.61028 5.35212C3.09279 4.18725 3.90989 3.19161 4.95825 2.49112C6.00661 1.79063 7.23915 1.41675 8.5 1.41675C9.76086 1.41675 10.9934 1.79063 12.0418 2.49112C13.0901 3.19161 13.9072 4.18725 14.3897 5.35212C14.8722 6.517 14.9985 7.79879 14.7525 9.03542C14.5065 10.272 13.8994 11.408 13.0078 12.2995L8.5 16.8074ZM8.5 9.20836C8.87573 9.20836 9.23606 9.0591 9.50174 8.79343C9.76741 8.52775 9.91667 8.16742 9.91667 7.79169C9.91667 7.41597 9.76741 7.05563 9.50174 6.78996C9.23606 6.52428 8.87573 6.37503 8.5 6.37503C8.12428 6.37503 7.76395 6.52428 7.49827 6.78996C7.23259 7.05563 7.08334 7.41597 7.08334 7.79169C7.08334 8.16742 7.23259 8.52775 7.49827 8.79343C7.76395 9.0591 8.12428 9.20836 8.5 9.20836Z"
        fill="#EAD0FF"
      />
    </svg>
  );
}

const AttractionsLandmarkCard = ({
  landmark,
  categoryLabel = "منتزهات طبيعية",
  className = "",
}: AttractionsLandmarkCardProps) => {
  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?landmark=${encodeURIComponent(
      landmark.id
    )}`;
    const shareData = {
      title: landmark.title,
      text: `${landmark.title} - ${landmark.description}`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(
        `${shareData.title}\n${shareData.text}\n${shareData.url}`
      );
    } catch {
      // Silently ignore when share/copy is canceled.
    }
  };

  return (
    <article
      dir="rtl"
      className={`relative h-[419px] w-full max-w-[326px] overflow-hidden rounded-[10px] bg-black shadow-[0_4.28px_3.37px_0_rgba(41,72,152,0.01),0_8.72px_6.97px_0_rgba(41,72,152,0.02),0_21.4px_13.91px_0_rgba(41,72,152,0.02)] ${className}`}
    >
      <img src={landmark.image} alt={landmark.title} className="h-full w-full object-cover" />

      <button
        type="button"
        aria-label={`مشاركة ${landmark.title}`}
        onClick={handleShare}
        className="absolute top-3 end-3 z-20 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full backdrop-blur-[3.5px]"
      >
        <ShareIcon />
      </button>

      <div className="absolute top-3 start-3 inline-flex h-7 items-center justify-center rounded-[20px] bg-[#000000AD] px-3 py-1">
        <span className="text-right text-[12px] font-medium leading-[100%] text-white" style={{ fontFamily: ibm }}>
          {categoryLabel}
        </span>
      </div>

      <div className="absolute end-0 start-0 bottom-0 flex h-[155px] flex-col items-start gap-5 bg-linear-to-b from-transparent to-black p-5 text-white">
        <div className="inline-flex w-fit flex-row items-center gap-1 rounded-[24.51px] text-right">
          <span className="text-[18px] font-bold leading-[100%]" style={{ fontFamily: ara }}>
            {landmark.location || "حديقة السودة ، أبها"}
          </span>
          <LocationIcon />
        </div>

        <div className="flex w-full max-w-[251px] flex-col gap-[18px] self-start text-right">
          <h3 className="text-right text-[24px] font-bold leading-[119%]" style={{ fontFamily: ara }}>
            {landmark.title}
          </h3>
          <SafeHtml
            html={landmark.description}
            className="line-clamp-2 text-right text-[18px] font-bold leading-[130%] text-white/80"
          />
        </div>
      </div>
    </article>
  );
};

export default AttractionsLandmarkCard;
