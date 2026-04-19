import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/Footer/Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

export interface DestinationsIntroSectionProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  /** One or more paragraphs (RTL). Backend: map from rich text or joined blocks. */
  paragraphs: string[];
}

const DestinationsIntroSection = ({
  title,
  imageUrl,
  imageAlt,
  paragraphs,
}: DestinationsIntroSectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[62px]" dir="rtl">
      <div className="mx-auto flex w-full max-w-[1316px] flex-col-reverse justify-between gap-8 lg:h-[441px] lg:flex-row lg:items-start">
        <div className="flex h-full w-full max-w-[704px] flex-col gap-6 text-right">
          <h2
            className="w-full text-right text-[44px] font-bold leading-[180%] text-black"
            style={{ fontFamily: ara }}
          >
            {title}
          </h2>

          <div className="flex h-8 w-full max-w-[280px] items-center gap-[15px]" dir="rtl">
            <span
              className="shrink-0 text-[18px] font-bold leading-[180%] text-black"
              style={{ fontFamily: ara }}
            >
              شارك
            </span>
            <div className="flex items-center gap-2 text-black/70">
              <a href="#" aria-label="Instagram" className="hover:opacity-80">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="YouTube" className="hover:opacity-80">
                <YouTubeIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:opacity-80">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="Facebook" className="hover:opacity-80">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="X" className="hover:opacity-80">
                <XIcon />
              </a>
            </div>
          </div>

          <div
            className="w-full text-right text-[15px] font-light leading-[119%] text-[#252525]"
            style={{ fontFamily: ibm }}
          >
            {paragraphs.map((p, i) => (
              <p key={i} className={i > 0 ? "mt-4" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="h-[395px] w-full max-w-[559px] overflow-hidden rounded-[10px]">
          <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default DestinationsIntroSection;
