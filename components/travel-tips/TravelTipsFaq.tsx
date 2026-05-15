"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { MinusIcon, PlusIcon } from "./Icons";

const ara = "var(--font-ara-hamah-1964), sans-serif";


// Backend: GET FAQ list → map each row to { id, question, answer }. Pass the array as `items`.
// `id` must be stable (API id or slug) for React keys and open-state tracking.
export interface TravelFaqItem {
  id: string;
  question: string;
  answer: string;
}

// Backend: in page (or parent), `const data = await fetch(...);` then `<TravelTipsFaq items={data.faqs} />`.
interface TravelTipsFaqProps {
  items: TravelFaqItem[];
}

const TravelTipsFaq = ({ items }: TravelTipsFaqProps) => {
  const t = useTranslations("travelTips");
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      className="w-full max-w-[1440px] mx-auto px-4 py-10 sm:px-8 md:px-[60px] md:py-12"
     
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 text-foreground">
        <h2
          className={`min-h-[47px] w-full text-[44px] font-bold leading-[180%] text-foreground text-start`}
          style={{ fontFamily: ara }}
        >
          {t("faqTitle")}
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
                      className={`flex w-full items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-start`}
                    >
                      <span
                        className="min-w-0 flex-1 text-[29px] font-bold leading-none text-foreground"
                        style={{ fontFamily: ara }}
                      >
                        {item.question}
                      </span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-foreground" aria-hidden>
                        <MinusIcon />
                      </span>
                    </button>
                    <div
                      className={`ms-0 me-auto w-full max-w-[1264px] bg-transparent text-[20px] font-bold leading-none text-muted-foreground ps-3 text-start`}
                      style={{ fontFamily: ara }}
                    >
                      <p className={`py-3 ps-3`} style={{ fontFamily: ara }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-expanded={false}
                    onClick={() => toggle(item.id)}
                    className={`flex min-h-[67px] w-full items-center justify-between gap-3 rounded-lg border border-solid border-border bg-surface p-4 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-start`}
                  >
                    <span
                      className="min-w-0 flex-1 text-[29px] font-bold leading-none text-foreground"
                      style={{ fontFamily: ara }}
                    >
                      {item.question}
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-foreground" aria-hidden>
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
