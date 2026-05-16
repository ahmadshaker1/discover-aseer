export function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M15 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19L0 3C0 2.73478 0.105357 2.48043 0.292893 2.29289C0.48043 2.10536 0.734784 2 1 2L5 2V0L7 0V2L13 2V0L15 0V2ZM13 4L7 4V6H5V4H2L2 8L18 8V4H15V6H13V4ZM18 10L2 10L2 18H18V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DetailsArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.18665 1.06694C4.43096 0.822864 4.43096 0.427136 4.18665 0.183058C3.94235 -0.0610194 3.54625 -0.0610194 3.30195 0.183058L0.183229 3.29834C-0.0610763 3.54242 -0.0610763 3.93815 0.183229 4.18223L3.31163 7.31596C3.55594 7.56004 3.95203 7.56004 4.19634 7.31596C4.44064 7.07188 4.44064 6.67615 4.19634 6.43207L2.13588 4.36529L10.6592 4.36529C10.9855 4.36529 11.25 4.08546 11.25 3.74029C11.25 3.39511 10.9855 3.11529 10.6592 3.11529L2.13588 3.11529L4.18665 1.06694Z" fill="white" />
    </svg>

  );
}

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
