"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

import Image from "next/image";

const NotFoundPage = () => {
  const router = useRouter();
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-10 text-foreground">
      <section className="w-full max-w-[640px] rounded-[18px] border border-border bg-surface px-6 py-10 text-center shadow-[0_8px_24px_rgba(40,0,72,0.08)] sm:px-10">
        <div className="mb-8 flex justify-center filter-[brightness(0)] dark:filter-none">
          <Image
            src="https://dmmo-website-asda.oss-me-central-1.aliyuncs.com/assets/global/aseer_logo.svg"
            alt="footer:aseer_logo673"
            width={120}
            height={55}
          />
        </div>

        <h1 className="text-[36px] font-bold leading-[1.2] text-secondary">
          {t("title")}
        </h1>

        <p className="mx-auto mt-4 max-w-[520px] text-[18px] leading-normal text-muted-foreground">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full border border-secondary bg-surface px-6 text-[16px] font-bold text-secondary transition-colors hover:bg-muted"
          >
            {t("goBack")}
          </button>

          <Link
            href="/"
            className="inline-flex h-[48px] min-w-[190px] items-center justify-center rounded-full bg-primary px-6 text-[16px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("goHome")}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
