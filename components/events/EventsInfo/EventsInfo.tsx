import { VisaIcon, AirplaneIcon, HotelIcon, BinocularsIcon } from "./Icons";

export interface EventsInfoCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  link?: string;
}

/**
 * Backend handoff shape:
 * - `icon_key` can be one of: visa | airplane | hotel | binoculars
 * - `title_ar` should be Arabic text shown on card
 * - `link` is optional destination route/url
 */
export interface EventsInfoBackendCard {
  id: number;
  icon_key?: "visa" | "airplane" | "hotel" | "binoculars" | string | null;
  title_ar?: string | null;
  link?: string | null;
}

interface EventsInfoProps {
  cards?: EventsInfoCard[];
  backendCards?: EventsInfoBackendCard[];
}

const defaultCards: EventsInfoCard[] = [
  {
    id: 1,
    icon: <VisaIcon />,
    title: "متطلبات التأشيرة والدخول",
    link: "https://www.visitsaudi.com/ar/plan-your-trip/visa-regulations",
  },
  {
    id: 2,
    icon: <AirplaneIcon />,
    title: "السفر إلى عسير",
    link: "/Getting-here-and-around",
  },
  {
    id: 3,
    icon: <HotelIcon />,
    title: "خطط إقامتك",
    link: "/planner",
  },
  {
    id: 4,
    icon: <BinocularsIcon />,
    title: "اختر وجهتك",
    link: "/destinations",
  },
];

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

const linkFallbackByIconKey = (iconKey?: string | null): string | undefined => {
  switch ((iconKey || "").toLowerCase()) {
    case "visa":
      return "https://www.visitsaudi.com/ar/plan-your-trip/visa-regulations";
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

const mapBackendCards = (rows: EventsInfoBackendCard[]): EventsInfoCard[] =>
  rows.map((row, index) => ({
    id: row.id ?? index + 1,
    icon: iconFromKey(row.icon_key),
    title: row.title_ar?.trim() || "عنوان البطاقة",
    link: row.link?.trim() || linkFallbackByIconKey(row.icon_key),
  }));

const EventsInfo = ({ cards = defaultCards, backendCards }: EventsInfoProps) => {
  const displayCards =
    backendCards && backendCards.length > 0 ? mapBackendCards(backendCards) : cards;

  return (
    <section
      className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-white px-4 py-12 sm:px-8 md:px-[58px]"
      dir="rtl"
    >
      <img
        src="/assets/travel-essentials/angledsquarepattern.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[-12px] top-[18px] z-0 h-[240px] w-[240px] object-contain opacity-95 md:right-6 md:top-[-2px] md:h-[320px] md:w-[320px]"
      />

      <div className="relative z-10 mb-10 border-b border-[#E4E4E4] pb-4 md:mb-12">
        <h2 className="text-right text-[32px] font-bold text-black sm:text-[40px]" style={{ fontFamily: ara }}>
          <span className="text-black">ابدأ </span>
          <span className="text-[#7300CD]">رحلتك</span>
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" dir="rtl">
        {displayCards.map((card) => (
          <div
            key={card.id}
            className="mx-auto flex h-[250px] w-full max-w-[320px] flex-col justify-between rounded-4xl border border-[#E4E4E4] bg-white p-8 transition-shadow hover:shadow-lg"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center self-start text-[#7300CD]">
              {card.icon}
            </div>

            <h3
              className="w-full text-right text-[20px] font-bold leading-[130%] text-black"
              style={{ fontFamily: ara }}
            >
              {card.title}
            </h3>

            {card.link ? (
              <a
                href={card.link}
                className="inline-flex h-12 w-12 items-center justify-center self-start rounded-full bg-[#7300CD] text-white transition hover:bg-[#6027D2]"
                aria-label={card.title}
              >
                <ChevronIcon />
              </a>
            ) : (
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center self-start rounded-full bg-[#7300CD] text-white transition hover:bg-[#6027D2]"
                aria-label={card.title}
              >
                <ChevronIcon />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Left arrow for RTL
const ChevronIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 12H5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 19L5 12L12 5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EventsInfo;
