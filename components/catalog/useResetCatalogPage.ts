"use client";

import { usePathname, useRouter } from "@/i18n/navigation";

/** Drop `?page=` so filter changes start from the first page of results. */
export function useResetCatalogPage(currentPage: number) {
  const router = useRouter();
  const pathname = usePathname();

  return () => {
    if (currentPage <= 1) return;
    const params = new URLSearchParams(
      typeof window === "undefined" ? "" : window.location.search,
    );
    params.delete("page");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };
}
