"use client";

import { useTranslations } from "next-intl";
import type { EventInterestId } from "./types";
import {
  CalendarHeaderIcon,
  CalendarInputIcon,
  DownloadFileIcon,
  HeartIcon,
  NoMoneyIcon,
  PayingIcon,
  WalletIcon,
} from "./EventsFilter/Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

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
            className="w-full rounded-xl border border-border bg-surface py-3 ps-11 pe-4 text-start text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            style={{ fontFamily: ibm }}
          />
          <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2">
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
                <label className="flex cursor-pointer items-center gap-3 rounded-lg py-2 pe-1 transition-colors hover:bg-muted">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleInterest(row.id)}
                    className="h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="min-w-0 flex-1 text-start text-sm font-bold text-foreground" style={{ fontFamily: ara }}>
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
                ? "border-primary bg-primary/8 ring-2 ring-primary/25"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <NoMoneyIcon
              className={costFilter === "free" ? "text-foreground" : "text-muted-foreground"}
            />
            <span className="text-sm font-bold text-foreground" style={{ fontFamily: ara }}>
              {tCommon("free")}
            </span>
          </button>
          <button
            type="button"
            onClick={() => toggleCost("paid")}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-3 py-4 transition-all ${
              costFilter === "paid"
                ? "border-primary bg-primary/8 ring-2 ring-primary/25"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <PayingIcon
              className={costFilter === "paid" ? "text-foreground" : "text-muted-foreground"}
            />
            <span className="text-sm font-bold text-foreground" style={{ fontFamily: ara }}>
              {tCommon("paid")}
            </span>
          </button>
        </div>
      </section>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary/12 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-primary/18"
        style={{ fontFamily: ara }}
        onClick={() => {
          // TODO: export filtered events to PDF when backend is ready
        }}
      >
        <DownloadFileIcon className="text-primary" />
        {tCommon("downloadEventsPdf")}
      </button>
    </div>
  );
};

export default EventsFilterSidebar;
