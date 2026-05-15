import {
  filterSectionIconClass,
  type FilterIconProps,
} from "@/components/icons/filter-icon-types";

const HeartIcon = ({ className = filterSectionIconClass }: FilterIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <g clipPath="url(#tg_filter_heart)">
      <path
        d="M12.001 4.52898C14.35 2.41998 17.98 2.48998 20.243 4.75698C22.505 7.02498 22.583 10.637 20.479 12.993L11.999 21.485L3.52101 12.993C1.41701 10.637 1.49601 7.01898 3.75701 4.75698C6.02201 2.49298 9.64501 2.41698 12.001 4.52898ZM18.827 6.16998C17.327 4.66798 14.907 4.60698 13.337 6.01698L12.002 7.21498L10.666 6.01798C9.09101 4.60598 6.67601 4.66798 5.17201 6.17198C3.68201 7.66198 3.60701 10.047 4.98001 11.623L12 18.654L19.02 11.624C20.394 10.047 20.319 7.66498 18.827 6.16998Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="tg_filter_heart">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WalletIcon = ({ className = filterSectionIconClass }: FilterIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <g clipPath="url(#tg_filter_wallet)">
      <path
        d="M18 7H21C21.2652 7 21.5196 7.10536 21.7071 7.29289C21.8946 7.48043 22 7.73478 22 8V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H18V7ZM4 9V19H20V9H4ZM4 5V7H16V5H4ZM15 13H18V15H15V13Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="tg_filter_wallet">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export { HeartIcon, WalletIcon };
