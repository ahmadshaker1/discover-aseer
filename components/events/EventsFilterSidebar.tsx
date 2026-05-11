"use client";

import { useTranslations } from "next-intl";
import type { EventInterestId } from "./types";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

function CalendarHeaderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M15 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V3C0 2.73478 0.105357 2.48043 0.292893 2.29289C0.48043 2.10536 0.734784 2 1 2H5V0H7V2H13V0H15V2ZM13 4H7V6H5V4H2V8H18V4H15V6H13V4ZM18 10H2V18H18V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CalendarInputIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M15 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V3C0 2.73478 0.105357 2.48043 0.292893 2.29289C0.48043 2.10536 0.734784 2 1 2H5V0H7V2H13V0H15V2ZM13 4H7V6H5V4H2V8H18V4H15V6H13V4ZM18 10H2V18H18V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" aria-hidden>
      <path
        d="M10.001 1.52898C12.35 -0.58002 15.98 -0.51002 18.243 1.75698C20.505 4.02498 20.583 7.63698 18.479 9.99298L9.99901 18.485L1.52101 9.99298C-0.582994 7.63698 -0.503994 4.01898 1.75701 1.75698C4.02201 -0.50702 7.64501 -0.58302 10.001 1.52898ZM16.827 3.16998C15.327 1.66798 12.907 1.60698 11.337 3.01698L10.002 4.21498L8.66601 3.01798C7.09101 1.60598 4.67601 1.66798 3.17201 3.17198C1.68201 4.66198 1.60701 7.04698 2.98001 8.62298L10 15.654L17.02 8.62398C18.394 7.04698 18.319 4.66498 16.827 3.16998Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden>
      <path
        d="M16 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H16V4ZM2 6V16H18V6H2ZM2 2V4H14V2H2ZM13 10H16V12H13V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NoMoneyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path
        d="M7.5 0C11.6422 0 15 3.35775 15 7.5C15 9.3 14.3655 10.953 13.308 12.246L13.3335 12.273L12.273 13.3335L12.246 13.308C10.9077 14.4047 9.23022 15.0027 7.5 15C3.35775 15 0 11.6422 0 7.5C0 3.35775 3.35775 0 7.5 0ZM1.5 7.5C1.49998 8.62269 1.81496 9.72287 2.40912 10.6755C3.00329 11.628 3.85279 12.3948 4.86107 12.8886C5.86935 13.3824 6.99594 13.5834 8.11276 13.4687C9.22958 13.3541 10.2918 12.9284 11.1788 12.24L9.3975 10.458C9.26687 10.4861 9.13362 10.5001 9 10.5H8.25V12H6.75V10.5H4.875V9H9C9.09371 9.00017 9.18409 8.96525 9.25334 8.90212C9.32259 8.83898 9.36569 8.75221 9.37416 8.65888C9.38262 8.56556 9.35584 8.47244 9.29908 8.39788C9.24233 8.32331 9.15971 8.2727 9.0675 8.256L9 8.25H6C5.67087 8.24999 5.34755 8.16335 5.06252 7.99878C4.77749 7.83421 4.5408 7.59751 4.37624 7.31248C4.21168 7.02744 4.12505 6.70412 4.12505 6.37499C4.12505 6.04586 4.21169 5.72253 4.37625 5.4375L2.75925 3.8205C1.94084 4.87221 1.49759 6.16738 1.5 7.5V7.5ZM7.5 1.5C6.114 1.5 4.8375 1.97025 3.82125 2.76L5.6025 4.54125C5.73316 4.51344 5.86641 4.49961 6 4.5H6.75V3H8.25V4.5H10.125V6H6C5.90629 5.99983 5.81591 6.03475 5.74666 6.09788C5.67741 6.16102 5.63431 6.24779 5.62584 6.34112C5.61738 6.43444 5.64416 6.52756 5.70092 6.60212C5.75767 6.67669 5.84029 6.7273 5.9325 6.744L6 6.75H9C9.32913 6.75001 9.65245 6.83665 9.93748 7.00122C10.2225 7.16579 10.4592 7.40249 10.6238 7.68752C10.7883 7.97256 10.875 8.29588 10.875 8.62501C10.875 8.95414 10.7883 9.27747 10.6238 9.5625L12.2407 11.1788C12.9291 10.2918 13.3549 9.22947 13.4695 8.11257C13.5841 6.99568 13.3831 5.86904 12.8892 4.86073C12.3953 3.85243 11.6284 3.00293 10.6757 2.40883C9.72304 1.81472 8.62276 1.49984 7.5 1.5V1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PayingIcon() {
  return (
    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" aria-hidden>
      <path
        d="M3 5.25C3.19891 5.25 3.38968 5.32902 3.53033 5.46967C3.67098 5.61032 3.75 5.80109 3.75 6C4.92836 5.99826 6.07274 6.3947 6.9975 7.125H8.625C9.62475 7.125 10.5225 7.56 11.1405 8.25H13.5C14.2089 8.2498 14.9034 8.45058 15.5029 8.82903C16.1024 9.20749 16.5823 9.74813 16.887 10.3882C15.1133 12.729 12.2415 14.25 9 14.25C6.9075 14.25 5.1375 13.7977 3.705 13.0065C3.65253 13.1513 3.55668 13.2764 3.43051 13.3647C3.30435 13.453 3.15401 13.5003 3 13.5H0.75C0.551088 13.5 0.360322 13.421 0.21967 13.2803C0.0790176 13.1397 0 12.9489 0 12.75V6C0 5.80109 0.0790176 5.61032 0.21967 5.46967C0.360322 5.32902 0.551088 5.25 0.75 5.25H3ZM3.75075 7.5L3.75 11.2665L3.78375 11.2905C5.13 12.2355 6.8835 12.75 9 12.75C11.253 12.75 13.3492 11.883 14.8762 10.4025L14.976 10.3028L14.886 10.2278C14.5319 9.95038 14.1026 9.78577 13.6537 9.75525L13.5 9.75H11.9167C11.9707 9.9915 12 10.242 12 10.5V11.25H5.25V9.75L10.3425 9.74925L10.317 9.69075C10.1733 9.39041 9.95218 9.13373 9.67644 8.9471C9.4007 8.76046 9.08025 8.65058 8.748 8.62875L8.625 8.625H6.4275C6.07899 8.26854 5.6627 7.98539 5.20314 7.79219C4.74358 7.59898 4.25002 7.49964 3.7515 7.5H3.75075ZM2.25 6.75H1.5V12H2.25V6.75ZM12.75 2.25C13.3467 2.25 13.919 2.48705 14.341 2.90901C14.7629 3.33097 15 3.90326 15 4.5C15 5.09674 14.7629 5.66903 14.341 6.09099C13.919 6.51295 13.3467 6.75 12.75 6.75C12.1533 6.75 11.581 6.51295 11.159 6.09099C10.7371 5.66903 10.5 5.09674 10.5 4.5C10.5 3.90326 10.7371 3.33097 11.159 2.90901C11.581 2.48705 12.1533 2.25 12.75 2.25ZM12.75 3.75C12.5511 3.75 12.3603 3.82902 12.2197 3.96967C12.079 4.11032 12 4.30109 12 4.5C12 4.69891 12.079 4.88968 12.2197 5.03033C12.3603 5.17098 12.5511 5.25 12.75 5.25C12.9489 5.25 13.1397 5.17098 13.2803 5.03033C13.421 4.88968 13.5 4.69891 13.5 4.5C13.5 4.30109 13.421 4.11032 13.2803 3.96967C13.1397 3.82902 12.9489 3.75 12.75 3.75ZM7.5 0C8.09674 0 8.66903 0.237053 9.09099 0.65901C9.51295 1.08097 9.75 1.65326 9.75 2.25C9.75 2.84674 9.51295 3.41903 9.09099 3.84099C8.66903 4.26295 8.09674 4.5 7.5 4.5C6.90326 4.5 6.33097 4.26295 5.90901 3.84099C5.48705 3.41903 5.25 2.84674 5.25 2.25C5.25 1.65326 5.48705 1.08097 5.90901 0.65901C6.33097 0.237053 6.90326 0 7.5 0V0ZM7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25C6.75 2.44891 6.82902 2.63968 6.96967 2.78033C7.11032 2.92098 7.30109 3 7.5 3C7.69891 3 7.88968 2.92098 8.03033 2.78033C8.17098 2.63968 8.25 2.44891 8.25 2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5V1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DownloadFileIcon() {
  return (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden>
      <path
        d="M6.25 6.25H8.125L5.625 8.75L3.125 6.25H5V3.75H6.25V6.25ZM7.5 1.25H1.25V11.25H10V3.75H7.5V1.25ZM0 0.62C0 0.2775 0.279375 0 0.624375 0H8.125L11.25 3.125V11.8706C11.2506 11.9527 11.235 12.0341 11.2041 12.1101C11.1732 12.1862 11.1277 12.2554 11.07 12.3139C11.0124 12.3723 10.9438 12.4188 10.8682 12.4508C10.7926 12.4827 10.7115 12.4994 10.6294 12.5H0.620625C0.456486 12.4989 0.299386 12.4332 0.183261 12.3172C0.0671362 12.2012 0.00130916 12.0441 0 11.88V0.62Z"
        fill="currentColor"
      />
    </svg>
  );
}

const EVENT_INTEREST_ROWS = [
  { id: "adventure" as const, labelKey: "interestAdventure" as const },
  { id: "heritage" as const, labelKey: "interestHeritage" as const },
  { id: "culinary" as const, labelKey: "interestCulinary" as const },
  { id: "nature" as const, labelKey: "interestNature" as const },
];

export interface EventsFilterSidebarProps {
  interestCounts: Record<EventInterestId, number>;
  selectedInterests: EventInterestId[];
  onToggleInterest: (id: EventInterestId) => void;
  costFilter: "free" | "paid" | null;
  onCostChange: (value: "free" | "paid" | null) => void;
  dateText: string;
  onDateTextChange: (value: string) => void;
  onReset: () => void;
}

const EventsFilterSidebar = ({
  interestCounts,
  selectedInterests,
  onToggleInterest,
  costFilter,
  onCostChange,
  dateText,
  onDateTextChange,
  onReset,
}: EventsFilterSidebarProps) => {
  const tEvents = useTranslations("events");
  const tCommon = useTranslations("common");

  const toggleCost = (next: "free" | "paid") => {
    onCostChange(costFilter === next ? null : next);
  };

  return (
    <div
      className="w-full min-w-[min(100%,280px)] rounded-2xl border border-border bg-surface p-4 text-foreground sm:p-6 lg:min-w-[300px]"
      dir="rtl"
    >
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-6">
        <h2 className="text-lg font-bold text-foreground sm:text-xl" style={{ fontFamily: ara }}>
          {tCommon("filterEvents")}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:text-sm"
          style={{ fontFamily: ibm }}
        >
          {tCommon("resetFilters")}
        </button>
      </div>

      <section className="mb-6 border-b border-border pb-6">
        <div className="mb-3 flex items-center gap-2">
          <CalendarHeaderIcon />
          <h3 className="text-base font-bold text-foreground" style={{ fontFamily: ara }}>
            {tCommon("date")}
          </h3>
        </div>
        <div className="relative">
          <input
            type="text"
            value={dateText}
            onChange={(e) => onDateTextChange(e.target.value)}
            placeholder={tCommon("datePlaceholder")}
            className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-right text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            style={{ fontFamily: ibm }}
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <CalendarInputIcon />
          </span>
        </div>
      </section>

      <section className="mb-6 border-b border-border pb-6">
        <div className="mb-3 flex items-center gap-2">
          <HeartIcon />
          <h3 className="text-base font-bold text-foreground" style={{ fontFamily: ara }}>
            {tCommon("interests")}
          </h3>
        </div>
        <ul className="flex flex-col gap-1">
          {EVENT_INTEREST_ROWS.map((row) => {
            const checked = selectedInterests.includes(row.id);
            return (
              <li key={row.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg py-2 pr-1 transition-colors hover:bg-muted">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleInterest(row.id)}
                    className="h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="min-w-0 flex-1 text-right text-sm font-bold text-foreground" style={{ fontFamily: ara }}>
                    {tEvents(row.labelKey)}
                  </span>
                  <span
                    className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    style={{ fontFamily: ibm }}
                  >
                    {interestCounts[row.id]}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <WalletIcon />
          <h3 className="text-base font-bold text-foreground" style={{ fontFamily: ara }}>
            {tCommon("cost")}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => toggleCost("free")}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-3 py-4 transition-all ${
              costFilter === "free"
                ? "border-[#7300CD] bg-[#7300CD]/8 ring-2 ring-[#7300CD]/25"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <NoMoneyIcon />
            <span className="text-sm font-bold text-foreground" style={{ fontFamily: ara }}>
              {tCommon("free")}
            </span>
          </button>
          <button
            type="button"
            onClick={() => toggleCost("paid")}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-3 py-4 transition-all ${
              costFilter === "paid"
                ? "border-[#7300CD] bg-[#7300CD]/8 ring-2 ring-[#7300CD]/25"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <PayingIcon />
            <span className="text-sm font-bold text-foreground" style={{ fontFamily: ara }}>
              {tCommon("paid")}
            </span>
          </button>
        </div>
      </section>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#7300CD]/12 py-3.5 text-sm font-bold text-[#7300CD] transition-colors hover:bg-[#7300CD]/18"
        style={{ fontFamily: ara }}
        onClick={() => {
          // TODO: export filtered events to PDF when backend is ready
        }}
      >
        <DownloadFileIcon />
        {tCommon("downloadEventsPdf")}
      </button>
    </div>
  );
};

export default EventsFilterSidebar;
