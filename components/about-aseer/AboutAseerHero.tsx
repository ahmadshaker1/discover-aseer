"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";

const ara = "var(--font-ara-hamah-1964), sans-serif";

export interface AboutHeroSocialLink {
  platform: "linkedin" | "x" | "youtube" | "instagram" | "facebook";
  url: string;
}

export interface AboutAseerHeroData {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  subtitle: string;
  backgroundImage: string;
  socialLinks: AboutHeroSocialLink[];
}

function BreadcrumbChevron() {
  return (
    <svg
      width="5"
      height="10"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="rtl:rotate-180"
    >
      <path
        d="M4.25184 0C4.35476 0 4.45767 0.0379143 4.53892 0.119164C4.69601 0.276247 4.69601 0.536248 4.53893 0.693332L1.00726 4.225C0.747259 4.485 0.747259 4.9075 1.00726 5.1675L4.53893 8.69916C4.69601 8.85625 4.69601 9.11625 4.53893 9.27333C4.38184 9.43041 4.12184 9.43041 3.96476 9.27333L0.433092 5.74167C0.156842 5.46542 -0.000241179 5.09166 -0.000241213 4.69625C-0.000241248 4.30083 0.151425 3.92708 0.433092 3.65083L3.96476 0.119165C4.04601 0.0433312 4.14893 0 4.25184 0Z"
        fill="white"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3.514 2.245C3.514 2.955 2.96 3.53 2.247 3.53C1.534 3.53 0.98 2.955 0.98 2.245C0.98 1.536 1.534 0.96 2.247 0.96C2.96 0.96 3.514 1.536 3.514 2.245ZM3.478 4.562H1.017V15.04H3.478V4.562ZM7.375 4.562H5.031V15.04H7.456V9.542C7.456 6.48 11.451 6.194 11.451 9.542V15.04H13.904V8.698C13.904 3.764 8.23 3.948 7.456 6.369V4.562H7.375Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9.515 6.773L15.392 0H13.999L8.896 5.882L4.819 0H0.117L6.28 8.889L0.117 15.993H1.51L6.898 9.781L11.181 15.993H15.883L9.514 6.773H9.515ZM7.604 8.978L6.98 8.083L2.014 0.978H4.154L8.164 6.719L8.787 7.613L13.999 15.069H11.859L7.604 8.979V8.978Z"
        fill="currentColor"
      />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M17.625 2.187C17.429 1.455 16.856 0.882 16.124 0.686C14.802 0.333 9.5 0.333 9.5 0.333C9.5 0.333 4.198 0.333 2.876 0.686C2.144 0.882 1.571 1.455 1.375 2.187C1.021 3.509 1.021 7 1.021 7C1.021 7 1.021 10.491 1.375 11.813C1.571 12.545 2.144 13.118 2.876 13.314C4.198 13.667 9.5 13.667 9.5 13.667C9.5 13.667 14.802 13.667 16.124 13.314C16.856 13.118 17.429 12.545 17.625 11.813C17.979 10.491 17.979 7 17.979 7C17.979 7 17.979 3.509 17.625 2.187ZM7.802 9.905V4.095L12.83 7L7.802 9.905Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4.67 0.667H11.33C13.54 0.667 15.333 2.46 15.333 4.67V11.33C15.333 13.54 13.54 15.333 11.33 15.333H4.67C2.46 15.333 0.667 13.54 0.667 11.33V4.67C0.667 2.46 2.46 0.667 4.67 0.667ZM4.54 2C3.136 2 2 3.136 2 4.54V11.46C2 12.864 3.136 14 4.54 14H11.46C12.864 14 14 12.864 14 11.46V4.54C14 3.136 12.864 2 11.46 2H4.54ZM12.03 3C12.3615 3 12.6795 3.1317 12.9139 3.36612C13.1483 3.60054 13.28 3.91848 13.28 4.25C13.28 4.58152 13.1483 4.89946 12.9139 5.13388C12.6795 5.3683 12.3615 5.5 12.03 5.5C11.6985 5.5 11.3805 5.3683 11.1461 5.13388C10.9117 4.89946 10.78 4.58152 10.78 4.25C10.78 3.91848 10.9117 3.60054 11.1461 3.36612C11.3805 3.1317 11.6985 3 12.03 3ZM8 4C10.21 4 12 5.79 12 8C12 10.21 10.21 12 8 12C5.79 12 4 10.21 4 8C4 5.79 5.79 4 8 4ZM8 5.333C7.293 5.333 6.615 5.614 6.115 6.115C5.614 6.615 5.333 7.293 5.333 8C5.333 8.707 5.614 9.385 6.115 9.885C6.615 10.386 7.293 10.667 8 10.667C8.707 10.667 9.385 10.386 9.885 9.885C10.386 9.385 10.667 8.707 10.667 8C10.667 7.293 10.386 6.615 9.885 6.115C9.385 5.614 8.707 5.333 8 5.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
    >
      <g clip-path="url(#clip0_17_61)">
        <path
          d="M24 0C10.7453 0 0 10.7453 0 24C0 35.255 7.74912 44.6995 18.2026 47.2934V31.3344H13.2538V24H18.2026V20.8397C18.2026 12.671 21.8995 8.8848 29.9194 8.8848C31.44 8.8848 34.0637 9.18336 35.137 9.48096V16.129C34.5706 16.0694 33.5866 16.0397 32.3645 16.0397C28.4294 16.0397 26.9088 17.5306 26.9088 21.4061V24H34.7482L33.4013 31.3344H26.9088V47.8243C38.7926 46.3891 48.001 36.2707 48.001 24C48 10.7453 37.2547 0 24 0Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_17_61">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SocialIcon({
  platform,
}: {
  platform: AboutHeroSocialLink["platform"];
}) {
  if (platform === "linkedin") return <LinkedinIcon />;
  if (platform === "x") return <XIcon />;
  if (platform === "youtube") return <YoutubeIcon />;
  if (platform === "instagram") return <InstagramIcon />;
  return <FacebookIcon />;
}

interface AboutAseerHeroProps {
  data: AboutAseerHeroData;
}

const AboutAseerHero = ({ data }: AboutAseerHeroProps) => {
  return (
    <section
      className="relative flex min-h-[50vh]  max-w-full flex-col items-center justify-center overflow-hidden md:min-h-[80vh]"
      style={{
        backgroundImage: `url('${data.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Backend: make `backgroundImage` come from CMS/API (hero image URL). */}
      <div className="absolute inset-0 bg-black/25" />

      <div
        className={`pointer-events-none absolute inset-y-0 z-2 w-[min(55%,20rem)] sm:w-[min(50%,24rem)] md:w-[min(45%,28rem)] end-0`}
        aria-hidden
      >
        <Image
          src="/hero-pattern/pattern-diamons.png"
          alt=""
          fill
          className="object-contain object-start ltr:scale-x-[-1]"
          sizes="(max-width: 768px) 55vw, 28rem"
        />
      </div>

      <div
        className={`absolute top-1/2 z-20 hidden h-[400px] w-[40px] -translate-y-1/2 flex-col items-center justify-center gap-[15px] md:flex start-8`}
      >
        {data.socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-[100px] border border-solid border-[#FFFFFF1A] text-white transition-colors hover:bg-white/10"
            aria-label={social.platform}
          >
            <SocialIcon platform={social.platform} />
          </a>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 md:px-12">
        <div className="mx-auto flex w-full max-w-[680px] flex-col items-center text-center ">
          <div
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 "
            style={{ fontFamily: ara }}
          >
            {data.breadcrumbs.map((crumb, index) => (
              <span
                key={`${crumb.label}-${index}`}
                className="inline-flex items-center gap-1.5 sm:gap-2"
              >
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[16px] font-normal leading-6 text-white/70 transition-opacity hover:opacity-85"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[16px] font-normal leading-6 text-white">
                    {crumb.label}
                  </span>
                )}
                {index < data.breadcrumbs.length - 1 ? (
                  <BreadcrumbChevron />
                ) : null}
              </span>
            ))}
          </div>

          <h1
            className="w-full text-center text-[clamp(2rem,5vw,44px)] font-bold leading-[180%] text-white"
            style={{ fontFamily: ara }}
          >
            {data.title}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default AboutAseerHero;
