import { useState, useRef, useEffect, Fragment } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Listbox, Transition } from "@headlessui/react";

function CalendarChevron({ direction }: { direction: "prev" | "next" }) {
  const rotationClass =
    direction === "next"
      ? "rtl:rotate-0 rotate-180"
      : "rtl:rotate-180 rotate-0";
  return (
    <svg
      width="6"
      height="12"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={rotationClass}
    >
      <path
        d="M4.25135 -1.87195e-06C4.35427 -1.88095e-06 4.45719 0.0379143 4.53844 0.119164C4.69552 0.276247 4.69552 0.536248 4.53844 0.693332L1.00677 4.225C0.74677 4.485 0.74677 4.9075 1.00677 5.1675L4.53844 8.69916C4.69552 8.85625 4.69552 9.11625 4.53844 9.27333C4.38135 9.43041 4.12135 9.43041 3.96427 9.27333L0.432604 5.74167C0.156354 5.46542 -0.00072946 5.09166 -0.000729494 4.69625C-0.000729529 4.30083 0.150937 3.92708 0.432603 3.65083L3.96427 0.119165C4.04552 0.0433312 4.14844 -1.86295e-06 4.25135 -1.87195e-06Z"
        fill="currentColor"
      />
    </svg>
  );
}

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month: number, year: number) =>
  new Date(year, month, 1).getDay();
const years = Array.from(
  { length: 15 },
  (_, i) => new Date().getFullYear() + i,
);

const locales = {
  ar: {
    days: ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
    months: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
  },
  en: {
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
};

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function Calendar({
  selectedDate,
  onSelectDate,
}: CalendarProps) {
  const t = useTranslations("Planner");
  const locale = useLocale() as "ar" | "en";
  const currentLocale = locales[locale] || locales.en; // Fallback to en if unexpected locale

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div
      className="w-full flex flex-col items-start text-start mb-16 max-w-[600px] relative"
      ref={calendarRef}
    >
      <h2
        className="mb-4 text-black dark:text-white"
        style={{
          fontSize: "26px",
          fontStyle: "normal",
          fontWeight: 700,
        }}
      >
        {t("arrivalDateTitle")}
      </h2>
      <div
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer bg-white dark:bg-[#1C0F2A] transition-colors"
        style={{
          borderRadius: "55px",
          border: "1px solid rgba(0, 0, 0, 0.10)",
        }}
      >
        <span
          className="text-gray-800 dark:text-white font-medium"
          style={{
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            fontSize: "20px",
            letterSpacing: "-0.32px",
          }}
        >
          {selectedDate
            ? selectedDate.toLocaleDateString(
                locale === "ar" ? "ar-SA" : "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )
            : t("selectArrivalDate")}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-500"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      </div>

      {/* Calendar Popup */}
      {isCalendarOpen && (
        <div
          className="absolute top-[100%] mt-2 right-0 md:left-0 z-[999] w-[340px] select-none bg-white dark:bg-[#1C0F2A] border border-black/10 dark:border-white/20"
          style={{
            display: "inline-flex",
            padding: "20px 16px",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "16px",
            borderRadius: "24px",
            boxShadow:
              "0 49px 129px 0 rgba(0, 0, 0, 0.13), 0 18.874px 41.089px 0 rgba(0, 0, 0, 0.07), 0 1.99px 10.511px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full px-2">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevMonth}
                className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-black dark:text-white"
              >
                <CalendarChevron direction="prev" />
              </button>
              <span
                className="text-lg font-bold text-gray-800 dark:text-white"
                style={{
                  fontFamily:
                    locale === "ar" ? '"29LT Bukra", sans-serif' : "inherit",
                }}
              >
                {currentLocale.months[currentMonth]}
              </span>
              <button
                onClick={handleNextMonth}
                className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-black dark:text-white"
              >
                <CalendarChevron direction="next" />
              </button>
            </div>

            {/* Year Select */}
            <div className="w-[100px]">
              <Listbox value={currentYear} onChange={setCurrentYear}>
                <div className="relative">
                  <Listbox.Button
                    className="relative flex items-center justify-between gap-2 w-full cursor-pointer py-1.5 px-3 text-sm bg-white dark:bg-[#1C0F2A] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    style={{
                      borderRadius: "86px",
                      border: "1px solid #E5E5E5",
                    }}
                  >
                    <span
                      className="block truncate font-medium text-gray-800 dark:text-white"
                      style={{
                        fontFamily:
                          locale === "ar"
                            ? '"29LT Bukra", sans-serif'
                            : "inherit",
                      }}
                    >
                      {currentYear}
                    </span>
                    <span className="pointer-events-none flex items-center">
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        stroke="#535353"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 1L5 5L9 1" />
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-[#1C0F2A] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {years.map((year) => (
                        <Listbox.Option
                          key={year}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 px-4 ${
                              active
                                ? "bg-purple-50 dark:bg-white/10 text-[#7300CD] dark:text-[#E2C3FF]"
                                : "text-gray-900 dark:text-white"
                            }`
                          }
                          value={year}
                        >
                          {({ selected }) => (
                            <span
                              className={`block truncate ${
                                selected
                                  ? "font-bold text-[#7300CD]"
                                  : "font-normal"
                              }`}
                              style={{
                                fontFamily:
                                  locale === "ar"
                                    ? '"29LT Bukra", sans-serif'
                                    : "inherit",
                              }}
                            >
                              {year}
                            </span>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-4 gap-x-1 mt-2">
            {currentLocale.days.map((d) => (
              <div
                key={d}
                className="text-[#535353] dark:text-gray-300"
                style={{
                  textAlign: "center",
                  fontFamily: "IBM Plex Sans Arabic",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                {d}
              </div>
            ))}
            {blanks.map((b) => (
              <div key={`blank-${b}`} />
            ))}
            {monthDays.map((d) => {
              const isSelected =
                selectedDate?.getDate() === d &&
                selectedDate?.getMonth() === currentMonth &&
                selectedDate?.getFullYear() === currentYear;
              return (
                <div
                  key={d}
                  onClick={() => {
                    onSelectDate(new Date(currentYear, currentMonth, d));
                  }}
                  className={`flex justify-center items-center h-8 w-8 mx-auto cursor-pointer transition-colors rounded-[4px] ${
                    isSelected
                      ? "bg-[#00BBB4] text-white"
                      : "text-[#1D1F1F] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                  style={{
                    fontFamily: "29LT Bukra",
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                >
                  {d}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
