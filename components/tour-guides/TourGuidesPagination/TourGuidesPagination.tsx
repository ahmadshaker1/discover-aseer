"use client";

import { useTranslations } from "next-intl";

interface TourGuidesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


const navButtonClass =
  "flex h-8 min-w-[50px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[8px] px-3 text-center text-[18px] font-bold leading-5 tracking-[-0.15px] text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:text-muted-foreground";

const buttonBase =
  "flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm transition";

const TourGuidesPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: TourGuidesPaginationProps) => {
  const t = useTranslations("common");
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={t("previous")}
        className={navButtonClass}
      >
        <span className="inline-flex rtl:rotate-180" aria-hidden>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.7541 0.241064C9.05216 0.533264 9.07926 0.990508 8.83539 1.31272L8.7541 1.40503L2.02658 8L8.7541 14.595C9.05216 14.8872 9.07926 15.3444 8.83539 15.6666L8.7541 15.7589C8.45604 16.0511 7.98963 16.0777 7.66096 15.8386L7.56679 15.7589L0.245899 8.58198C-0.0521604 8.28978 -0.0792568 7.83254 0.16461 7.51033L0.245899 7.41802L7.56679 0.241064C7.89466 -0.0803548 8.42624 -0.0803548 8.7541 0.241064Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span>{t("previous")}</span>
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`${buttonBase} ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "cursor-pointer border-border bg-surface text-foreground hover:border-primary hover:text-primary"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={t("next")}
        className={navButtonClass}
      >
        <span>{t("next")}</span>
        <span className="inline-flex rtl:rotate-180" aria-hidden>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.245899 15.7589C-0.0521604 15.4667 -0.0792571 15.0095 0.16461 14.6873L0.245899 14.595L6.97342 8L0.245898 1.40503C-0.0521617 1.11283 -0.0792584 0.655583 0.164609 0.333376L0.245898 0.241065C0.543957 -0.0511344 1.01037 -0.0776973 1.33904 0.161375L1.4332 0.241065L8.7541 7.41802C9.05216 7.71022 9.07926 8.16746 8.83539 8.48967L8.7541 8.58198L1.43321 15.7589C1.10534 16.0804 0.573765 16.0804 0.245899 15.7589Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    </nav>
  );
};

export default TourGuidesPagination;
