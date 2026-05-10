"use client";

import { useCallback, useState } from "react";
import { useLocale } from "next-intl";

const ara = "var(--font-ara-hamah-1964), sans-serif";


// Backend: GET FAQ list → map each row to { id, question, answer }. Pass the array as `items`.
// `id` must be stable (API id or slug) for React keys and open-state tracking.
export interface TravelFaqItem {
  id: string;
  question: string;
  answer: string;
}

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M4 4V0H5.33333V4H9.33333V5.33333H5.33333V9.33333H4V5.33333H0V4H4Z" fill="#37342F" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0 0H9.33333V1.33333H0V0Z" fill="#37342F" />
    </svg>
  );
}

// Backend: in page (or parent), `const data = await fetch(...);` then `<TravelTipsFaq items={data.faqs} />`.
interface TravelTipsFaqProps {
  items: TravelFaqItem[];
}

const TravelTipsFaq = ({ items }: TravelTipsFaqProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      className="w-full max-w-[1440px] mx-auto px-4 py-10 sm:px-8 md:px-[60px] md:py-12"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex w-full max-w-[1320px] mx-auto flex-col gap-8">
        <h2
          className={`min-h-[47px] w-full text-[44px] font-bold leading-[180%] text-black ${isRtl ? "text-right" : "text-left"}`}
          style={{ fontFamily: ara }}
        >
          {isRtl ? "الأسئلة الشائعة" : "Frequently asked questions"}
        </h2>

        <div className="flex w-full flex-col gap-2">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="w-full">
                {isOpen ? (
                  <div className="flex w-full flex-col gap-2">
                    <button
                      type="button"
                      aria-expanded
                      onClick={() => toggle(item.id)}
                      className={`flex w-full items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7300CD] ${isRtl ? "text-right" : "flex-row-reverse text-left"}`}
                    >
                      <span
                        className="min-w-0 flex-1 text-[29px] font-bold leading-none text-black"
                        style={{ fontFamily: ara }}
                      >
                        {item.question}
                      </span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden>
                        <MinusIcon />
                      </span>
                    </button>
                    <div
                      className={`ms-0 me-auto w-full max-w-[1264px] bg-transparent text-[20px] font-bold leading-none text-[#838383] ${isRtl ? "pl-3 text-right" : "pr-3 text-left"}`}
                      style={{ fontFamily: ara }}
                    >
                      <p className={`py-3 ${isRtl ? "pr-3" : "pl-3"}`} style={{ fontFamily: ara }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-expanded={false}
                    onClick={() => toggle(item.id)}
                    className={`flex min-h-[67px] w-full items-center justify-between gap-3 rounded-lg border border-solid border-[#e0e0e0] bg-[#F8F8F8] p-4 transition-colors hover:bg-[#efefef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7300CD] ${isRtl ? "text-right" : "flex-row-reverse text-left"}`}
                  >
                    <span
                      className="min-w-0 flex-1 text-[29px] font-bold leading-none text-black"
                      style={{ fontFamily: ara }}
                    >
                      {item.question}
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden>
                      <PlusIcon />
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TravelTipsFaq;
