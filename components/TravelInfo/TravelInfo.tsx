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
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.66667 6.66675H38.3333V10.0001H1.66667V6.66675ZM1.66667 30.0001H38.3333V33.3334H1.66667V30.0001ZM32.7033 24.8567L32.4133 23.4067H29.165L28.6483 24.8451L26.045 24.8517C27.72 20.8401 28.9617 17.8684 29.7717 15.9351C29.9833 15.4317 30.36 15.1751 30.9133 15.1784C31.3367 15.1817 32.0283 15.1817 32.9883 15.1784L35 24.8534L32.7033 24.8584V24.8567ZM29.8967 21.4201H31.99L31.2067 17.7867L29.8967 21.4201ZM13.12 15.1767L15.7367 15.1801L11.6917 24.8567L9.04167 24.8551C8.14667 21.4051 7.48834 18.8451 7.06834 17.1801C6.94001 16.6684 6.68501 16.3117 6.19167 16.1434C5.75334 15.9934 5.02334 15.7601 4.00001 15.4451V15.1784H8.18167C8.90501 15.1784 9.32667 15.5284 9.46334 16.2451L10.4967 21.7267L13.12 15.1767ZM19.3317 15.1801L17.265 24.8551L14.7733 24.8517L16.84 15.1767L19.3317 15.1801ZM24.385 15.0001C25.1283 15.0001 26.0683 15.2301 26.6083 15.4451L26.1717 17.4517C25.6833 17.2551 24.88 16.9901 24.205 17.0017C23.2217 17.0167 22.615 17.4284 22.615 17.8234C22.615 18.4634 23.6683 18.7867 24.755 19.4884C25.9933 20.2884 26.155 21.0051 26.1417 21.7851C26.1233 23.4034 24.755 25.0001 21.8667 25.0001C20.5483 24.9801 20.0733 24.8701 19 24.4901L19.4533 22.3967C20.5467 22.8534 21.0117 22.9984 21.945 22.9984C22.8033 22.9984 23.5383 22.6534 23.545 22.0517C23.5483 21.6234 23.2867 21.4117 22.325 20.8817C21.3633 20.3534 20.015 19.6217 20.0333 18.1484C20.055 16.2651 21.8467 15.0001 24.385 15.0001Z"
          fill="currentColor"
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
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 3V13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 7L12 3L16 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 16H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="6" cy="19" r="1.5" fill="currentColor" />
        <circle cx="18" cy="19" r="1.5" fill="currentColor" />
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
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 21V7C5 6.44772 5.44772 6 6 6H10C10.5523 6 11 6.44772 11 7V21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 21V11C13 10.4477 13.4477 10 14 10H18C18.5523 10 19 10.4477 19 11V21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 7H22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 4H8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 4H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="7" y="13" width="2" height="2" rx="0.5" fill="currentColor" />
        <rect x="15" y="15" width="2" height="2" rx="0.5" fill="currentColor" />
      </svg>
    ),
    title: "Plan & Book Your Accommodation",
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
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M2 2L4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 2L22 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2 22L4 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 22L22 20"
          stroke="currentColor"
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
      stroke="currentColor"
      strokeWidth="1.07527"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.06451 3.36011L12.7688 8.06441L8.06451 12.7687"
      stroke="currentColor"
      strokeWidth="1.07527"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TravelInfo = () => {
  return (
    <div className="mx-auto w-full max-w-screen-2xl bg-background px-12 py-16 text-foreground md:px-24 md:py-24">
      {/* Section Title */}
      <div className="flex justify-end mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-right w-full">
          معلومات <span className=" text-primary"> السفر</span>
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {travelInfoCards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col space-y-4 rounded-lg bg-surface p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl md:p-8"
          >
            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-foreground md:text-xl">
              {card.title}
            </h3>

            {/* Description */}
            <p className="grow text-sm text-muted-foreground md:text-base">
              {card.description}
            </p>

            {/* CTA Button */}
            <button className="mt-2 flex h-10 w-10 items-center justify-center self-start rounded-full bg-primary text-primary-foreground transition-colors duration-200 hover:opacity-90">
              <ChevronIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelInfo;
