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
  },
  {
    id: 2,
    icon: <AirplaneIcon />,
    title: "السفر إلى عسير",
  },
  {
    id: 3,
    icon: <HotelIcon />,
    title: "خطط إقامتك",
  },
  {
    id: 4,
    icon: <BinocularsIcon />,
    title: "اختر وجهتك",
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

const mapBackendCards = (rows: EventsInfoBackendCard[]): EventsInfoCard[] =>
  rows.map((row, index) => ({
    id: row.id ?? index + 1,
    icon: iconFromKey(row.icon_key),
    title: row.title_ar?.trim() || "عنوان البطاقة",
    link: row.link?.trim() || undefined,
  }));

const EventsInfo = ({ cards = defaultCards, backendCards }: EventsInfoProps) => {
  const displayCards =
    backendCards && backendCards.length > 0 ? mapBackendCards(backendCards) : cards;

  return (
    <section className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-white px-4 py-12 sm:px-8 md:min-h-[533px] md:px-[58px]">
      <img
        src="/hero-pattern/pattern-diamons.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[130px] w-[220px] object-cover opacity-10"
      />

      <div className="mb-10 flex items-center justify-end gap-8 md:mb-14" dir="rtl">
        <h2
          className="shrink-0 text-right text-[40px] font-bold leading-[100%] md:text-[48px]"
          style={{ fontFamily: ara }}
        >
          <span className="text-[#1A1127]">ابدأ </span>
          <span className="text-[#6027D2]">رحلتك</span>
        </h2>
        <div className="hidden h-px w-[380px] bg-[#ECE8F2] md:block" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" dir="rtl">
        {displayCards.map((card) => (
          <div
            key={card.id}
            className="mx-auto flex h-[196px] w-full max-w-[295px] flex-col items-end justify-between rounded-[10px] border border-[#EEEAF3] bg-white px-5 py-6 shadow-[0_6px_16px_rgba(41,72,152,0.06)]"
          >
            <div className="mt-1 inline-flex h-8 w-8 items-center justify-center self-end text-[#6027D2]">
              {card.icon}
            </div>

            <h3
              className="w-full text-right text-[30px] font-bold leading-[100%] text-[#1A1127]"
              style={{ fontFamily: ara }}
            >
              {card.title}
            </h3>

            {card.link ? (
              <a
                href={card.link}
                className="inline-flex h-[30px] w-[30px] items-center justify-center self-end rounded-full bg-[#6027D2] shadow-[0_2px_6px_rgba(0,0,0,0.18)] hover:opacity-90"
                aria-label={card.title}
              >
                <ChevronIcon />
              </a>
            ) : (
              <button
                type="button"
                className="inline-flex h-[30px] w-[30px] items-center justify-center self-end rounded-full bg-[#6027D2] shadow-[0_2px_6px_rgba(0,0,0,0.18)] hover:opacity-90"
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
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.7688 8.06445H3.36021"
      stroke="white"
      strokeWidth="1.07527"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.06451 3.36011L3.36021 8.06441L8.06451 12.7687"
      stroke="white"
      strokeWidth="1.07527"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EventsInfo;
