import Link from "next/link";

const ara = "var(--font-ara-hamah-1964), sans-serif";

function BreadcrumbChevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-white"
      aria-hidden
    >
      <g clipPath="url(#eventsBannerBreadcrumbClip)">
        <path
          d="M8.23902 7.50563L5.14275 4.4144L6.02578 3.52993L10.0065 7.50419L6.03227 11.4849L5.1478 10.6019L8.23902 7.50563Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="eventsBannerBreadcrumbClip">
          <rect width="15" height="15" fill="white" transform="translate(15.0127 15) rotate(179.953)" />
        </clipPath>
      </defs>
    </svg>
  );
}

const EventsBanner = () => {
  return (
    <div
      className="relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden md:min-h-[80vh]"
      style={{
        backgroundImage: `url('/assets/events/banner/image.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          )`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-3 py-8 sm:px-4 sm:py-10">
        <div className="mx-auto flex w-full max-w-[460px] flex-col items-center gap-6 text-center sm:gap-7">
          {/* Breadcrumb — RTL: الفعاليات ← chevron ← الصفحة الرئيسية (same treatment as hero title) */}
          <div
            className="flex flex-wrap items-center justify-center gap-[9px]"
            dir="rtl"
            style={{ fontFamily: ara }}
          >
            <span className="text-right text-[16px] font-bold leading-[119%] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
              الفعاليات
            </span>
            <BreadcrumbChevron />
            <Link
              href="/"
              className="text-right text-[16px] font-bold leading-[119%] text-white transition-opacity [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] hover:opacity-85"
            >
              الصفحة الرئيسية
            </Link>
          </div>

          <h1
            className="w-full text-[clamp(2rem,7vw,70px)] font-bold leading-[119%] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
            style={{ fontFamily: ara }}
          >
            الفعاليات
          </h1>

          <p
            className="w-full text-[clamp(0.9375rem,3.2vw,24px)] font-bold leading-[119%] text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]"
            style={{ fontFamily: ara }}
          >
            فعاليات فنية وثقافية وشعبية وتجارب بيئية ورياضية ضمن أنشطة وتجارب أخرى صممت لجميع
            الاهتمامات على مدار العام.
          </p>

          <button
            type="button"
            className="inline-flex h-12 min-w-[229px] items-center justify-center gap-[10px] rounded-[20px] bg-[#6C2BD9] px-16 py-2 text-[20px] font-bold leading-none text-white transition-colors hover:bg-[#5b24b8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ fontFamily: ara }}
          >
            أضف فعاليتك
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsBanner;
