export function BreadcrumbChevron() {
  return (
    <svg
      width="6"
      height="8"
      viewBox="0 0 6 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 rtl:rotate-180"
      aria-hidden
    >
      <path
        d="M2.03163 3.97959L5.58573 0.882936L4.56904 1.50824e-05L-0.000312787 3.98124L4.57552 7.95501L5.59077 7.07043L2.03163 3.97959Z"
        fill="white"
      />
    </svg>
  );
}

/** Points to earlier week / previous */
export function CalendarArrowPrev({ className }: { className?: string }) {
  return (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M0.75 6.77442L15.75 6.77441"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.79981 12.799L0.749805 6.775L6.7998 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Points to later week / next */
export function CalendarArrowNext({ className }: { className?: string }) {
  return (
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M15.75 6.77441L0.75 6.77441"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.7002 0.749828L15.7502 6.77383L9.7002 12.7988"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
