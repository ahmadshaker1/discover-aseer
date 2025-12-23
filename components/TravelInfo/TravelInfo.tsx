"use client";

interface TravelInfoCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const travelInfoCards: TravelInfoCard[] = [
  {
    id: 1,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M3 9H21"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 13H10"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 13H15"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 16H10"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Visa & Entry Requirments",
    description:
      "Eget duis at tellus at urna condimentum mattis. Porttitor rhoncus dolor purus non.",
  },
  {
    id: 2,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 16V14.5C21 13.6716 20.3284 13 19.5 13H4.5C3.67157 13 3 13.6716 3 14.5V16"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 3V13"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 7L12 3L16 7"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 16H21"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="6" cy="19" r="1.5" fill="white" />
        <circle cx="18" cy="19" r="1.5" fill="white" />
      </svg>
    ),
    title: "Book Your Flights To Aseer",
    description:
      "Aliquet lectus proin nibh nisl condimentum id venenatis a condimentum.",
  },
  {
    id: 3,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 21H21"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 21V7C5 6.44772 5.44772 6 6 6H10C10.5523 6 11 6.44772 11 7V21"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 21V11C13 10.4477 13.4477 10 14 10H18C18.5523 10 19 10.4477 19 11V21"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 7H22"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 4H8"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 4H20"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="7" y="13" width="2" height="2" rx="0.5" fill="white" />
        <rect x="15" y="15" width="2" height="2" rx="0.5" fill="white" />
      </svg>
    ),
    title: "Plan & Book Your Accomodation",
    description:
      "Diam ut venenatis tellus in metus vulputate eu scelerisque felis.",
  },
  {
    id: 4,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4C8.68629 4 6 6.68629 6 10C6 13.3137 12 20 12 20C12 20 18 13.3137 18 10C18 6.68629 15.3137 4 12 4Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2" stroke="white" strokeWidth="1.5" />
        <path
          d="M2 2L4 4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 2L22 4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2 22L4 20"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 22L22 20"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Book Your Experiences",
    description:
      "Tincidunt augue interdum velit euismod in pellentesque massa placerat duis.",
  },
];

const ChevronIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.36021 8.06445H12.7688"
      stroke="white"
      strokeWidth="1.07527"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.06451 3.36011L12.7688 8.06441L8.06451 12.7687"
      stroke="white"
      strokeWidth="1.07527"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TravelInfo = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-12 md:px-24 py-16 md:py-24 bg-white">
      {/* Section Title */}
      <div className="flex justify-end mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#6027D2]">
          معلومات السفر
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {travelInfoCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-lg p-6 md:p-8 flex flex-col space-y-4 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-[#6027D2] flex items-center justify-center">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 grow">
              {card.description}
            </p>

            {/* CTA Button */}
            <button className="w-10 h-10 rounded-full bg-[#6027D2] flex items-center justify-center hover:bg-[#5022B8] transition-colors duration-200 self-start mt-2">
              <ChevronIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelInfo;
