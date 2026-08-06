import { Link } from "@/i18n/navigation";

import { AseerPlatform } from "@/lib/discoverAseerLinks";
import { AseerSocialIcon } from "@/components/social/AseerSocialIcon";

export interface CommunityHeroSocialLink {
  platform: AseerPlatform;
  url: string;
}

export interface CommunityHeroData {
  // Breadcrumb labels/links in top center of hero.
  breadcrumbs: { label: string; href?: string }[];
  // Main hero heading text.
  title: string;
  // Subtitle text under heading.
  subtitle?: string;
  // Full-bleed hero background image URL/path.
  backgroundImage: string;
  // Social icons + destination URLs.
  socialLinks: CommunityHeroSocialLink[];
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
      className="rotate-180 rtl:rotate-0"
    >
      <path
        d="M4.25184 0C4.35476 0 4.45767 0.0379143 4.53892 0.119164C4.69601 0.276247 4.69601 0.536248 4.53893 0.693332L1.00726 4.225C0.747259 4.485 0.747259 4.9075 1.00726 5.1675L4.53893 8.69916C4.69601 8.85625 4.69601 9.11625 4.53893 9.27333C4.38184 9.43041 4.12184 9.43041 3.96476 9.27333L0.433092 5.74167C0.156842 5.46542 -0.000241179 5.09166 -0.000241213 4.69625C-0.000241248 4.30083 0.151425 3.92708 0.433092 3.65083L3.96476 0.119165C4.04601 0.0433312 4.14893 0 4.25184 0Z"
        fill="white"
      />
    </svg>
  );
}

interface CommunityHeroProps {
  data: CommunityHeroData;
}

const CommunityHero = ({ data }: CommunityHeroProps) => {
  return (
    <section
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${data.backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div
        className={`absolute top-1/2 z-20 hidden h-[460px] w-10 -translate-y-1/2 flex-col items-center justify-center gap-[15px] md:flex start-8`}
      >
        {data.socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-[100px] border border-solid border-[#FFFFFF1A] text-white transition-colors hover:bg-white/10 [&_path]:fill-white"
            aria-label={social.platform}
          >
            <AseerSocialIcon platform={social.platform} />
          </a>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-10 md:px-12">
        <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-5 text-center sm:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {data.breadcrumbs.map((crumb, index) => (
              <span
                key={`${crumb.label}-${index}`}
                className="inline-flex items-center gap-1.5 sm:gap-2"
              >
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[14px] font-normal leading-6 text-white/70 transition-opacity hover:opacity-85"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[14px] font-normal leading-6 text-white">
                    {crumb.label}
                  </span>
                )}
                {index < data.breadcrumbs.length - 1 ? (
                  <BreadcrumbChevron />
                ) : null}
              </span>
            ))}
          </div>

          <h1 className="w-full text-center text-[clamp(2rem,5vw,44px)] font-[900] leading-[180%] text-primary-foreground">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="w-full text-center text-base leading-[1.33] text-primary-foreground md:text-[clamp(18px,1.9vw,24px)] font-bold">
              {data.subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;
