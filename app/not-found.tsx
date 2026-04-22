"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AseerLogo from "@/components/Logo/AseerLogo";

const ara = "var(--font-ara-hamah-1964), sans-serif";
const ibm = "var(--font-ibm-plex-sans-arabic), sans-serif";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#F7F3FC] px-4 py-10">
      <section
        className="w-full max-w-[640px] rounded-[18px] border border-[#E4D8F7] bg-white px-6 py-10 text-center shadow-[0_8px_24px_rgba(40,0,72,0.08)] sm:px-10"
        dir="rtl"
      >
        <div className="mb-8 flex justify-center filter-[brightness(0)]">
          <AseerLogo />
        </div>

        <h1
          className="text-[36px] font-bold leading-[1.2] text-[#280048]"
          style={{ fontFamily: ara }}
        >
          عذراً، الصفحة غير موجودة
        </h1>

        <p
          className="mx-auto mt-4 max-w-[520px] text-[18px] leading-normal text-[#4A405A]"
          style={{ fontFamily: ibm }}
        >
          يمكنك العودة إلى الصفحة السابقة التي كنت عليها، أو الرجوع إلى الصفحة
          الرئيسية.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full border border-[#280048] bg-white px-6 text-[16px] font-bold text-[#280048] transition-colors hover:bg-[#F2EAFF]"
            style={{ fontFamily: ara }}
          >
            الرجوع للصفحة السابقة
          </button>

          <Link
            href="/"
            className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full bg-[#7300CD] px-6 text-[16px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: ara }}
          >
            الذهاب للصفحة الرئيسية
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
