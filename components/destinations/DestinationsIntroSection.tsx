import {
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/Footer/Icons";
import SafeHtml from "@/components/common/SafeHtml";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 6.75C3 5.92157 3.67157 5.25 4.5 5.25H19.5C20.3284 5.25 21 5.92157 21 6.75V17.25C21 18.0784 20.3284 18.75 19.5 18.75H4.5C3.67157 18.75 3 18.0784 3 17.25V6.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 7L11.0222 12.2667C11.6206 12.6855 12.4194 12.6855 13.0178 12.2667L20.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}




export interface DestinationsIntroSectionProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  /** One or more paragraphs (RTL). Backend: map from rich text or joined blocks. */
  paragraphs: string[];
  /** Optional rich text body for destination slug pages. */
  descriptionHtml?: string;
  hideImage?: boolean;
  centerContent?: boolean;
}

const DestinationsIntroSection = ({
  title,
  imageUrl,
  imageAlt,
  paragraphs,
  descriptionHtml,
  hideImage = false,
  centerContent = false,
}: DestinationsIntroSectionProps) => {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-8 md:px-[62px]" dir="rtl">
      <div className="mx-auto flex w-full max-w-[1316px] flex-col-reverse justify-between gap-8 lg:flex-row lg:items-start">
        <div
          className={`flex w-full flex-col gap-6 ${
            hideImage ? "max-w-[900px]" : "max-w-[704px]"
          } ${centerContent ? "mx-auto items-center text-center" : "text-right"}`}
        >
          <h2
            className={`w-full text-[44px] font-bold leading-[180%] text-black ${
              centerContent ? "text-center" : "text-right"
            }`}
            style={{ fontFamily: ara }}
          >
            {title}
          </h2>

          <div className="flex h-8 w-full max-w-[360px] items-center gap-[15px]" dir="rtl">
            <span
              className="shrink-0 text-[18px] font-bold leading-[180%] text-black"
              style={{ fontFamily: ara }}
            >
              شارك
            </span>
            <div className="flex items-center gap-2 text-black/70" dir="ltr">
              <a href="#" aria-label="WhatsApp" className="hover:opacity-80">
                <WhatsAppIcon />
              </a>
              <a href="mailto:info@discoveraseer.com" aria-label="Mail" className="hover:opacity-80">
                <MailIcon />
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
            className={`w-full text-[15px] font-light leading-[130%] text-[#252525] ${
              centerContent ? "text-center" : "text-right"
            }`}
            style={{ fontFamily: ibm }}
          >
            {descriptionHtml ? (
              <SafeHtml html={descriptionHtml} className="space-y-4" />
            ) : (
              paragraphs.map((p, i) => (
                <p key={i} className={i > 0 ? "mt-4" : ""}>
                  {p}
                </p>
              ))
            )}
          </div>
        </div>

        {!hideImage ? (
          <div className="h-[395px] w-full max-w-[559px] overflow-hidden rounded-[10px]">
            <div className="relative h-full w-full">
              <img src="/assets/attractions/attractions-hero.png" alt={imageAlt} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-black/15" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default DestinationsIntroSection;
