import type { FilmServiceCard } from "@/components/film/data";
import { useTranslations } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

interface FilmServicesSectionProps {
  cards: FilmServiceCard[];
}

function CrewIcon() {
  return (
    <svg
      width="74"
      height="78"
      viewBox="0 0 74 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1844_13450)">
        <path
          d="M73.8466 39C73.8466 18.8343 57.4991 2.48682 37.3335 2.48682C17.1678 2.48682 0.820312 18.8343 0.820312 39C0.820312 59.1656 17.1678 75.5131 37.3335 75.5131C57.4991 75.5131 73.8466 59.1656 73.8466 39Z"
          fill="white"
        />
        <path
          d="M73.8466 39C73.8466 18.8343 57.4991 2.48682 37.3335 2.48682C17.1678 2.48682 0.820312 18.8343 0.820312 39C0.820312 59.1656 17.1678 75.5131 37.3335 75.5131C57.4991 75.5131 73.8466 59.1656 73.8466 39Z"
          stroke="#E8E8E8"
          strokeWidth="0.973684"
        />
        <path
          d="M49.0169 38.7566V32.1842L42.4445 24.8816H27.109C26.3024 24.8816 25.6484 25.5355 25.6484 26.3421V52.6316C25.6484 53.4382 26.3024 54.0921 27.109 54.0921H34.4116"
          stroke="#1E1E1E"
          strokeWidth="1.94737"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44.6359 48.2501C46.2492 48.2501 47.5569 46.9423 47.5569 45.329C47.5569 43.7157 46.2492 42.408 44.6359 42.408C43.0226 42.408 41.7148 43.7157 41.7148 45.329C41.7148 46.9423 43.0226 48.2501 44.6359 48.2501Z"
          stroke="#1E1E1E"
          strokeWidth="1.94737"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50.4772 54.0921C50.4772 50.8656 47.8616 48.25 44.6351 48.25C41.4086 48.25 38.793 50.8656 38.793 54.0921"
          stroke="#1E1E1E"
          strokeWidth="1.94737"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M41.7148 24.8816V32.1842H49.0175"
          stroke="#1E1E1E"
          strokeWidth="1.94737"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1844_13450">
          <rect width="74" height="78" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function LocationsIcon() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0.730469 7.39354H29.6628M27.4372 0.730225H2.95602C2.36577 0.730225 1.79967 0.964689 1.38225 1.38201C0.964931 1.79943 0.730469 2.36553 0.730469 2.95578V27.4369C0.730469 28.0273 0.964931 28.5933 1.38225 29.0107C1.79967 29.428 2.36577 29.6626 2.95602 29.6626H27.4372C28.0274 29.6626 28.5935 29.428 29.0109 29.0107C29.4283 28.5933 29.6628 28.0273 29.6628 27.4369V2.95578C29.6628 2.36553 29.4283 1.79943 29.0109 1.38201C28.5935 0.964689 28.0274 0.730225 27.4372 0.730225Z"
        stroke="currentColor"
        strokeWidth="1.46053"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PermitsIcon() {
  return (
    <svg
      width="24"
      height="31"
      viewBox="0 0 24 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.35424 7.546H9.73581M5.35424 15.2138H18.499M5.35424 19.5953H18.499M5.35424 23.9769H9.73581M3.16345 29.4539H20.6898C21.2708 29.4539 21.828 29.223 22.2389 28.8122C22.6497 28.4013 22.8806 27.8441 22.8806 27.2631V3.16442C22.8806 2.58342 22.6497 2.02619 22.2389 1.61529C21.828 1.20449 21.2708 0.973633 20.6898 0.973633H3.16345C2.58245 0.973633 2.02521 1.20449 1.61431 1.61529C1.20352 2.02619 0.972656 2.58342 0.972656 3.16442V27.2631C0.972656 27.8441 1.20352 28.4013 1.61431 28.8122C2.02521 29.223 2.58245 29.4539 3.16345 29.4539Z"
        stroke="currentColor"
        strokeWidth="1.94737"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconByKey = {
  crew: <CrewIcon />,
  locations: <LocationsIcon />,
  permits: <PermitsIcon />,
};

const SERVICE_KEYS = {
  crew: { title: "serviceCrewTitle", description: "serviceCrewDesc" },
  locations: {
    title: "serviceLocationsTitle",
    description: "serviceLocationsDesc",
  },
  permits: { title: "servicePermitsTitle", description: "servicePermitsDesc" },
} as const;

const FilmServicesSection = ({ cards }: FilmServicesSectionProps) => {
  const t = useTranslations("film");
  return (
    <section className="mx-auto h-auto w-full max-w-[1442px] bg-background p-[60px] text-foreground">
      <div className="mx-auto flex w-full max-w-[1322px] flex-col gap-16">
        <div className="h-[22px] w-full">
          <h2
            className={`text-start text-[48px] font-bold leading-[38px] text-foreground`}
            style={{ fontFamily: ara }}
          >
            {t("services")}
          </h2>
        </div>

        <div className="flex h-auto w-full flex-col justify-between gap-4 lg:h-[290px] lg:flex-row">
          {cards.slice(0, 3).map((card) => {
            const keys = SERVICE_KEYS[card.iconKey];
            return (
              <article
                key={card.id}
                className={`flex h-[290px] w-full max-w-[434.666687px] flex-col gap-6 rounded-[13px] border border-border bg-surface px-8 py-[50px] items-start`}
              >
                <div
                  className={`flex h-[73.026314px] w-[73.026314px] items-center justify-center rounded-full border border-border bg-muted text-foreground self-start`}
                >
                  {iconByKey[card.iconKey]}
                </div>

                <div
                  className={`flex w-full max-w-[370.666687px] flex-col gap-3 text-start`}
                >
                  <h3
                    className={`text-[32px] font-bold leading-[30px] text-foreground text-start`}
                    style={{ fontFamily: ara }}
                  >
                    {card.title || t(keys.title)}
                  </h3>
                  <p
                    className={`text-[15px] font-light leading-[119%] text-muted-foreground text-start`}
                    style={{ fontFamily: ibm }}
                  >
                    {card.description || t(keys.description)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FilmServicesSection;
