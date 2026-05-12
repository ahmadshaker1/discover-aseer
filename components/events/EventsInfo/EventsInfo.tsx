import { getLocale, getTranslations } from "next-intl/server";
import { VisaIcon, AirplaneIcon, HotelIcon, BinocularsIcon } from "./Icons";

export interface EventsInfoCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  link?: string;
}

export interface EventsInfoBackendCard {
  id: number;
  icon_key?: "visa" | "airplane" | "hotel" | "binoculars" | string | null;
  title_ar?: string | null;
  title_en?: string | null;
  link?: string | null;
}

interface EventsInfoProps {
  cards?: EventsInfoCard[];
  backendCards?: EventsInfoBackendCard[];
}

const ara = "var(--font-ara-hamah-1964), sans-serif";

const iconFromKey = (iconKey?: string | null): React.ReactNode => {
  switch ((iconKey || "").toLowerCase()) {
    case "visa":
      return <VisaIcon />;
    case "airplane":
      return <AirplaneIcon />;
    case "hotel":
      return <HotelIcon />;
    case "binoculars":
      return <BinocularsIcon />;
    default:
      return <BinocularsIcon />;
  }
};

const linkFallbackByIconKey = (
  iconKey?: string | null,
  locale?: string,
): string | undefined => {
  const visa =
    locale === "en"
      ? "https://www.visitsaudi.com/en/plan-your-trip/visa-regulations"
      : "https://www.visitsaudi.com/ar/plan-your-trip/visa-regulations";
  switch ((iconKey || "").toLowerCase()) {
    case "visa":
      return visa;
    case "airplane":
      return "/Getting-here-and-around";
    case "hotel":
      return "/planner";
    case "binoculars":
      return "/destinations";
    default:
      return undefined;
  }
};

function mapBackendCards(
  rows: EventsInfoBackendCard[],
  locale: string,
  fallbackTitle: string,
): EventsInfoCard[] {
  return rows.map((row, index) => {
    const ar = row.title_ar?.trim();
    const en = row.title_en?.trim();
    const title =
      locale === "en"
        ? en || ar || fallbackTitle
        : ar || en || fallbackTitle;
    return {
      id: row.id ?? index + 1,
      icon: iconFromKey(row.icon_key),
      title,
      link: row.link?.trim() || linkFallbackByIconKey(row.icon_key, locale),
    };
  });
}

export default async function EventsInfo({ cards, backendCards }: EventsInfoProps) {
  const locale = await getLocale();
  const t = await getTranslations("eventsInfo");
  const tCommon = await getTranslations("common");

  const fallbackTitle = tCommon("fallbackCardTitle");

  const defaultCards: EventsInfoCard[] = [
    {
      id: 1,
      icon: <VisaIcon />,
      title: t("cardVisa"),
      link: linkFallbackByIconKey("visa", locale),
    },
    {
      id: 2,
      icon: <AirplaneIcon />,
      title: t("cardTravel"),
      link: linkFallbackByIconKey("airplane", locale),
    },
    {
      id: 3,
      icon: <HotelIcon />,
      title: t("cardStay"),
      link: linkFallbackByIconKey("hotel", locale),
    },
    {
      id: 4,
      icon: <BinocularsIcon />,
      title: t("cardDestination"),
      link: linkFallbackByIconKey("binoculars", locale),
    },
  ];

  const displayCards =
    backendCards && backendCards.length > 0
      ? mapBackendCards(backendCards, locale, fallbackTitle)
      : cards ?? defaultCards;

  const isRtl = locale === "ar";

  return (
    <section
      className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-background px-4 py-12 text-foreground sm:px-8 md:px-[58px]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <img
        src="/assets/travel-essentials/angledsquarepattern.png"
        alt=""
        aria-hidden
        className={`pointer-events-none absolute top-[18px] z-0 h-[240px] w-[240px] object-contain opacity-95 md:top-[-2px] md:h-[320px] md:w-[320px] ${isRtl ? "right-[-12px] md:right-6" : "left-[-12px] md:left-6"}`}
      />

      <div className="relative z-10 mb-10 border-b border-border pb-4 md:mb-12">
        <h2
          className={`text-[32px] font-bold text-foreground sm:text-[40px] ${isRtl ? "text-right" : "text-left"}`}
          style={{ fontFamily: ara }}
        >
          <span className="text-foreground">{t("headingStart")}</span>
          <span className="text-primary">{t("headingTrip")}</span>
        </h2>
      </div>

      <div
        className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {displayCards.map((card) => (
          <div
            key={card.id}
            className="mx-auto flex h-[250px] w-full max-w-[320px] flex-col justify-between rounded-4xl border border-border bg-surface p-8 transition-shadow hover:shadow-lg"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center self-start text-primary">
              {card.icon}
            </div>

            <h3
              className={`w-full text-[20px] font-bold leading-[130%] text-foreground ${isRtl ? "text-right" : "text-left"}`}
              style={{ fontFamily: ara }}
            >
              {card.title}
            </h3>

            {card.link ? (
              <a
                href={card.link}
                className="inline-flex h-12 w-12 items-center justify-center self-start rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
                aria-label={card.title}
              >
                <ChevronIcon mirror={!isRtl} />
              </a>
            ) : (
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center self-start rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
                aria-label={card.title}
              >
                <ChevronIcon mirror={!isRtl} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const ChevronIcon = ({ mirror }: { mirror?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={mirror ? "scale-x-[-1]" : undefined}
  >
    <path d="M19 12H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
