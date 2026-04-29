import Link from "next/link";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DestinationsHeroProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  backgroundImage: string;
}

function BreadcrumbChevron() {
  return (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M4.25184 0C4.35476 0 4.45767 0.0379143 4.53892 0.119164C4.69601 0.276247 4.69601 0.536248 4.53893 0.693332L1.00726 4.225C0.747259 4.485 0.747259 4.9075 1.00726 5.1675L4.53893 8.69916C4.69601 8.85625 4.69601 9.11625 4.53893 9.27333C4.38184 9.43041 4.12184 9.43041 3.96476 9.27333L0.433092 5.74167C0.156842 5.46542 -0.000241179 5.09166 -0.000241213 4.69625C-0.000241248 4.30083 0.151425 3.92708 0.433092 3.65083L3.96476 0.119165C4.04601 0.0433312 4.14893 0 4.25184 0Z"
        fill="white"
      />
    </svg>
  );
}

function WeatherIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#clip_dest_hero_weather)">
        <path
          d="M16.9998 18V16H17.4998C18.0768 15.9999 18.6449 15.8572 19.1534 15.5844C19.662 15.3117 20.0952 14.9175 20.4145 14.4369C20.7338 13.9563 20.9294 13.4041 20.9837 12.8297C21.0381 12.2552 20.9496 11.6762 20.726 11.1442C20.5025 10.6122 20.1509 10.1438 19.7026 9.78051C19.2542 9.41726 18.723 9.1705 18.1562 9.06219C17.5894 8.95388 17.0047 8.98739 16.454 9.15973C15.9033 9.33207 15.4037 9.6379 14.9998 10.05V9.99999C14.9994 8.90009 14.6967 7.82146 14.1247 6.88197C13.5527 5.94249 12.7335 5.17831 11.7566 4.67295C10.7796 4.16759 9.68259 3.94049 8.58532 4.01647C7.48804 4.09245 6.43277 4.46858 5.53482 5.10377C4.63686 5.73896 3.93079 6.60876 3.49376 7.61811C3.05673 8.62746 2.90555 9.73752 3.05676 10.827C3.20797 11.9164 3.65574 12.9434 4.35113 13.7955C5.04653 14.6477 5.9628 15.2924 6.99979 15.659V17.748C5.6735 17.4048 4.45757 16.7267 3.46849 15.7788C2.47941 14.8309 1.75034 13.6449 1.35112 12.3343C0.951895 11.0238 0.895905 9.63275 1.18851 8.29439C1.48112 6.95603 2.11252 5.71524 3.02222 4.69089C3.93191 3.66655 5.08942 2.89298 6.38384 2.4443C7.67825 1.99562 9.06621 1.88687 10.4147 2.12846C11.7632 2.37006 13.0271 2.95391 14.0852 3.82406C15.1434 4.69422 15.9603 5.82153 16.4578 7.09799C17.2098 6.95409 17.9836 6.96881 18.7297 7.1412C19.4757 7.31359 20.1775 7.63985 20.7902 8.09909C21.4029 8.55834 21.9129 9.14045 22.2876 9.80816C22.6624 10.4759 22.8936 11.2145 22.9664 11.9767C23.0393 12.7389 22.9522 13.5079 22.7107 14.2345C22.4692 14.9612 22.0787 15.6293 21.5641 16.1963C21.0495 16.7633 20.4222 17.2166 19.7224 17.5272C19.0225 17.8378 18.2655 17.9988 17.4998 18L16.9998 18.001V18ZM8.99979 16H10.9998V20H8.99979V16ZM12.9998 19H14.9998V23H12.9998V19Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip_dest_hero_weather">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const DestinationsHero = ({ breadcrumbs, title, subtitle, backgroundImage }: DestinationsHeroProps) => {
  return (
    <section
      className="relative flex h-[687px] w-full flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-4 lg:px-12">
        <div className="flex w-full max-w-[610px] flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-[31px] text-center" dir="rtl">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2" style={{ fontFamily: ara }}>
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5 sm:gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-[16px] font-normal leading-6 text-white/70 transition-opacity hover:opacity-85"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[16px] font-normal leading-6 text-white">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? <BreadcrumbChevron /> : null}
                </span>
              ))}
            </div>

            <h1 className="w-full text-[clamp(2rem,5vw,44px)] font-bold leading-[180%] text-white" style={{ fontFamily: ara }}>
              {title}
            </h1>

            <p className="w-full text-[16px] font-normal leading-6 text-white/80" style={{ fontFamily: ara }}>
              {subtitle}
            </p>
          </div>

          <div
            className="flex h-[118px] w-[142px] shrink-0 flex-col items-center justify-center rounded-[20px] border border-solid border-[#FFFFFF54]"
            dir="rtl"
            style={{
              paddingTop: 16,
              paddingRight: 12,
              paddingBottom: 16,
              paddingLeft: 12,
              gap: 8,
            }}
          >
            <WeatherIcon />
            <div className="flex flex-col items-center gap-0.5 text-center">
              <span
                className="whitespace-nowrap text-[35px] font-bold leading-[100%] tracking-normal text-white"
                style={{ fontFamily: ara }}
              >
                ١٨–٢١
                <span className="align-super text-[0.55em]">°</span>
                <span className="text-[0.5em]">م</span>
              </span>
              <span
                className="text-center text-[14px] font-normal leading-[100%] tracking-normal text-white"
                style={{ fontFamily: ibm }}
              >
                أمطار
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsHero;
