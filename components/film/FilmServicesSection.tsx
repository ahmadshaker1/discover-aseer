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
      xmlns="http://www.w3.org/2000/svg"
      width="74"
      height="78"
      viewBox="0 0 74 78"
      fill="none"
      className="text-foreground"
      aria-hidden
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
      xmlns="http://www.w3.org/2000/svg"
      width="74"
      height="144"
      viewBox="0 0 74 144"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#clip0_1844_13436)">
        <path
          d="M73.5146 72C73.5146 51.8343 57.1671 35.4868 37.0014 35.4868C16.8358 35.4868 0.488281 51.8343 0.488281 72C0.488281 92.1656 16.8358 108.513 37.0014 108.513C57.1671 108.513 73.5146 92.1656 73.5146 72Z"
          fill="white"
        />
        <path
          d="M73.5146 72C73.5146 51.8343 57.1671 35.4868 37.0014 35.4868C16.8358 35.4868 0.488281 51.8343 0.488281 72C0.488281 92.1656 16.8358 108.513 37.0014 108.513C57.1671 108.513 73.5146 92.1656 73.5146 72Z"
          stroke="#E8E8E8"
          strokeWidth="0.973684"
        />
        <mask
          id="mask0_1844_13436"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="21"
          y="56"
          width="32"
          height="32"
        >
          <path
            d="M52.5798 56.4211H21.4219V87.579H52.5798V56.4211Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_1844_13436)">
          <path
            d="M22.5352 64.197H51.4675M49.2419 57.5337H24.7607C24.1705 57.5337 23.6044 57.7682 23.1869 58.1855C22.7696 58.6029 22.5352 59.169 22.5352 59.7592V84.2404C22.5352 84.8307 22.7696 85.3967 23.1869 85.8142C23.6044 86.2315 24.1705 86.466 24.7607 86.466H49.2419C49.8321 86.466 50.3982 86.2315 50.8156 85.8142C51.2329 85.3967 51.4675 84.8307 51.4675 84.2404V59.7592C51.4675 59.169 51.2329 58.6029 50.8156 58.1855C50.3982 57.7682 49.8321 57.5337 49.2419 57.5337Z"
            stroke="#1E1E1E"
            strokeWidth="1.46053"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1844_13436">
          <rect width="74" height="144" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PermitsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="74"
      height="144"
      viewBox="0 0 74 144"
      fill="none"
      aria-hidden
    >
      <g clipPath="url(#clip0_1844_13425)">
        <path
          d="M73.5146 72C73.5146 51.8343 57.1671 35.4868 37.0014 35.4868C16.8358 35.4868 0.488281 51.8343 0.488281 72C0.488281 92.1656 16.8358 108.513 37.0014 108.513C57.1671 108.513 73.5146 92.1656 73.5146 72Z"
          fill="white"
        />
        <path
          d="M73.5146 72C73.5146 51.8343 57.1671 35.4868 37.0014 35.4868C16.8358 35.4868 0.488281 51.8343 0.488281 72C0.488281 92.1656 16.8358 108.513 37.0014 108.513C57.1671 108.513 73.5146 92.1656 73.5146 72Z"
          stroke="#E8E8E8"
          strokeWidth="0.973684"
        />
        <path
          d="M30.4285 64.3321H34.81M30.4285 71.9999H43.5732M30.4285 76.3815H43.5732M30.4285 80.7631H34.81M28.2377 86.24H45.764C46.345 86.24 46.9022 86.0092 47.3131 85.5984C47.7239 85.1875 47.9548 84.6302 47.9548 84.0492V59.9506C47.9548 59.3696 47.7239 58.8123 47.3131 58.4014C46.9022 57.9906 46.345 57.7598 45.764 57.7598H28.2377C27.6567 57.7598 27.0994 57.9906 26.6885 58.4014C26.2777 58.8123 26.0469 59.3696 26.0469 59.9506V84.0492C26.0469 84.6302 26.2777 85.1875 26.6885 85.5984C27.0994 86.0092 27.6567 86.24 28.2377 86.24Z"
          stroke="#1E1E1E"
          strokeWidth="1.94737"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M43.5711 64.8798C43.8737 64.8798 44.1188 64.6346 44.1188 64.3321C44.1188 64.0296 43.8737 63.7844 43.5711 63.7844C43.2686 63.7844 43.0234 64.0296 43.0234 64.3321C43.0234 64.6346 43.2686 64.8798 43.5711 64.8798Z"
          fill="#1E1E1E"
          stroke="#1E1E1E"
          strokeWidth="0.973684"
        />
      </g>
      <defs>
        <clipPath id="clip0_1844_13425">
          <rect width="74" height="144" fill="white" />
        </clipPath>
      </defs>
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
                    {t(keys.title)}
                  </h3>
                  <p
                    className={`text-[15px] font-light leading-10 text-muted-foreground text-start`}
                    style={{ fontFamily: ibm }}
                  >
                    {t(keys.description)}
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
