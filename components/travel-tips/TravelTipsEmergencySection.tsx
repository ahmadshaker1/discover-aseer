 "use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import {
  IconArrow,
  IconBell,
  IconCone,
  IconFire,
  IconHospital,
  IconPhone,
  IconPolice,
  IconWarning,
} from "./EmergencyNumbersIcons";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

// Backend: GET rows as { id?, title, number }. Order in the array is only display order; icon is chosen from `title` (see emergencyIconForTitle).
export interface EmergencyContact {
  id?: string;
  title: string;
  number: string;
}

/** Match more specific phrases before shorter ones (e.g. أمن الطرق before أمن). */
function emergencyIconForTitle(title: string): ReactNode {
  const t = title.trim();
  if (t.includes("أمن الطرق")) return <IconArrow />;
  if (t.includes("الدفاع المدني")) return <IconWarning />;
  if (t.includes("الإسعاف")) return <IconHospital />;
  if (t.includes("المرور")) return <IconCone />;
  if (t.includes("السياحة")) return <IconPhone />;
  if (t.includes("الإطفاء")) return <IconFire />;
  if (t.includes("الأمن العام")) return <IconBell />;
  if (t.includes("شرطة")) return <IconPolice />;
  return <IconBell />;
}

// Backend: `<TravelTipsEmergencySection contacts={data.emergencyContacts} />` from fetch in `app/travel-tips/page.tsx` (Server Component).
interface TravelTipsEmergencySectionProps {
  contacts: EmergencyContact[];
}

const TravelTipsEmergencySection = ({ contacts }: TravelTipsEmergencySectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  return (
    <section
      className="mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-8 md:px-[60px]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
        <h2
          className={`min-h-[47px] w-full text-[44px] font-bold leading-[180%] text-black ${isRtl ? "text-right" : "text-left"}`}
          style={{ fontFamily: ara }}
        >
          {isRtl ? "أرقام تهمك" : "Emergency contacts"}
        </h2>

        <div
          className="grid w-full grid-cols-2 gap-8 md:grid-cols-4"
          style={{ gridAutoRows: "minmax(155px, auto)" }}
        >
          {contacts.map((item, index) => (
            <article
              key={item.id ?? `${item.title}-${item.number}-${index}`}
              className="flex h-[155px] w-full max-w-[306px] flex-col items-start justify-start justify-self-start gap-2 rounded-[12px] border border-solid border-[#CCCCCC5E] bg-[#F8F8F8] px-4 py-3 md:justify-center"
            >
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#7300CD]"
                aria-hidden
              >
                <span className="flex items-center justify-center [&_svg]:block">
                  {emergencyIconForTitle(item.title)}
                </span>
              </div>
              <p
                className="w-full text-right text-[24px] font-bold leading-[119%] text-black"
                style={{ fontFamily: ara }}
              >
                {item.title}
              </p>
              <p
                className="w-full text-right text-[32px] font-bold leading-none text-black"
                style={{ fontFamily: ibm }}
              >
                {item.number}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelTipsEmergencySection;
