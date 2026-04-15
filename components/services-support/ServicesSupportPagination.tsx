"use client";

interface ServicesSupportPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonBase =
  "flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm transition";

const ServicesSupportPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ServicesSupportPaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" dir="rtl" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBase} border-gray-300 text-gray-700 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        السابق
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
                ? "border-[#5A2BB9] bg-[#5A2BB9] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-[#5A2BB9]"
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
        className={`${buttonBase} border-gray-300 text-gray-700 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        التالي
      </button>
    </nav>
  );
};

export default ServicesSupportPagination;
