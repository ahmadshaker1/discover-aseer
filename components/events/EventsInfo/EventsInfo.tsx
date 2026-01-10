import { VisaIcon, AirplaneIcon, HotelIcon, BinocularsIcon } from "./Icons";

export interface EventsInfoCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  link?: string;
}

interface EventsInfoProps {
  cards?: EventsInfoCard[];
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

const EventsInfo = ({ cards = defaultCards }: EventsInfoProps) => {
  return (
    <div className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            #6027D2 20px,
            #6027D2 40px
          )`,
          transform: "rotate(45deg)",
          transformOrigin: "top right",
        }}
      />

      {/* Section Title */}
      <div className="relative flex justify-start mb-6 sm:mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#6027D2]">
          ابدأ رحلتك
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-start space-y-3 sm:space-y-4 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#6027D2] flex items-center justify-center flex-shrink-0">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 text-right w-full">
              {card.title}
            </h3>

            {/* CTA Button */}
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#6027D2] flex items-center justify-center hover:bg-[#5022B8] transition-colors duration-200 mt-auto">
              <ChevronIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
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
