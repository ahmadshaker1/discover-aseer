const GlobeIcon = () => (
  <svg
    width="39"
    height="39"
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="38"
      height="38"
      rx="19"
      stroke="white"
      strokeOpacity="0.21"
    />
    <path
      d="M11.625 19.5C11.625 23.8494 15.1506 27.375 19.5 27.375C23.8494 27.375 27.375 23.8494 27.375 19.5C27.375 15.1506 23.8494 11.625 19.5 11.625C15.1506 11.625 11.625 15.1506 11.625 19.5Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.2471 11.625C20.2471 11.625 22.4883 14.7513 22.4883 19.5C22.4883 24.2487 20.2471 27.375 20.2471 27.375M18.7529 27.375C18.7529 27.375 16.5117 24.2487 16.5117 19.5C16.5117 14.7513 18.7529 11.625 18.7529 11.625M12.5 22.2701H26.5M12.5 16.7299H26.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrescentMoonIcon = () => (
  <svg
    width="39"
    height="39"
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="38"
      height="38"
      rx="19"
      stroke="white"
      strokeOpacity="0.21"
    />
    <path
      d="M19.5 27C17.4167 27 15.6458 26.2708 14.1875 24.8125C12.7292 23.3542 12 21.5833 12 19.5C12 17.4167 12.7292 15.6458 14.1875 14.1875C15.6458 12.7292 17.4167 12 19.5 12C19.6944 12 19.8856 12.0069 20.0733 12.0208C20.2611 12.0347 20.445 12.0556 20.625 12.0833C20.0556 12.4861 19.6006 13.0106 19.26 13.6567C18.9194 14.3028 18.7494 15.0006 18.75 15.75C18.75 17 19.1875 18.0625 20.0625 18.9375C20.9375 19.8125 22 20.25 23.25 20.25C24.0139 20.25 24.7153 20.0797 25.3542 19.7392C25.9931 19.3986 26.5139 18.9439 26.9167 18.375C26.9444 18.5556 26.9653 18.7394 26.9792 18.9267C26.9931 19.1139 27 19.305 27 19.5C27 21.5833 26.2708 23.3542 24.8125 24.8125C23.3542 26.2708 21.5833 27 19.5 27ZM19.5 25.3333C20.7222 25.3333 21.8194 24.9964 22.7917 24.3225C23.7639 23.6486 24.4722 22.7703 24.9167 21.6875C24.6389 21.7569 24.3611 21.8125 24.0833 21.8542C23.8056 21.8958 23.5278 21.9167 23.25 21.9167C21.5417 21.9167 20.0867 21.3158 18.885 20.1142C17.6833 18.9125 17.0828 17.4578 17.0833 15.75C17.0833 15.4722 17.1042 15.1944 17.1458 14.9167C17.1875 14.6389 17.2431 14.3611 17.3125 14.0833C16.2292 14.5278 15.3506 15.2361 14.6767 16.2083C14.0028 17.1806 13.6661 18.2778 13.6667 19.5C13.6667 21.1111 14.2361 22.4861 15.375 23.625C16.5139 24.7639 17.8889 25.3333 19.5 25.3333Z"
      fill="white"
    />
  </svg>
);

const BookletIcon = () => (
  <svg
    width="39"
    height="39"
    viewBox="0 0 39 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="38"
      height="38"
      rx="19"
      stroke="white"
      strokeOpacity="0.21"
    />
    <path
      d="M13 11.5H21.5C23.9853 11.5 26 13.5147 26 16V27.5C26 25.567 24.433 24 22.5 24H13V11.5Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M13 11.5H20.5C22.433 11.5 24 13.067 24 15V26.5C24 24.567 22.433 23 20.5 23H13V11.5Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M16 15.5H21M16 18.5H21"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300"
  >
    {!isOpen ? (
      <>
        <path
          d="M3 12H21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 6H21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 18H21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <>
        <path
          d="M18 6L6 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
);
const LocationPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">

  </svg>
);

export { GlobeIcon, CrescentMoonIcon, BookletIcon, HamburgerIcon, LocationPinIcon };
