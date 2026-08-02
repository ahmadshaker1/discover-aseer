"use client";

import { Link } from "@/i18n/navigation";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const brando = "var(--font-brando), sans-serif";

interface CuisineBrowseHeaderProps {
  title: string;
  backHref: string;
  backLabel: string;
}

const CuisineBrowseHeader = ({ title, backHref, backLabel }: CuisineBrowseHeaderProps) => {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 md:px-[62px]">
      <div className="mx-auto flex w-full max-w-[1316px] items-center justify-between gap-6">
        <h1
          className="text-[clamp(2rem,4vw,48px)] font-bold leading-[119%] text-foreground"
          style={{ fontFamily: brando }}
        >
          {title}
        </h1>
        <Link
          href={backHref}
          className="flex h-[52px] shrink-0 items-center justify-center rounded-[55px] border border-primary/40 bg-primary px-6 text-[18px] font-bold leading-[119%] text-primary-foreground transition-opacity hover:opacity-90"
          style={{ fontFamily: ara }}
        >
          {backLabel}
        </Link>
      </div>
    </div>
  );
};

export default CuisineBrowseHeader;
