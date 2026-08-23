import ServicesSupportBanner from "@/components/services-support/ServicesSupportBanner";
import ServicesSupportCatalog from "@/components/services-support/ServicesSupportCatalog";
import { fetchSupportServices } from "@/components/services-support/data";
import { parseCatalogPage } from "@/lib/directus/collectionCache";
import { getLocale } from "next-intl/server";

interface ServicesSupportPageProps {
  searchParams: Promise<{ page?: string }>;
}

const ServicesSupportPage = async ({
  searchParams,
}: ServicesSupportPageProps) => {
  const locale = (await getLocale()) as "ar" | "en";
  const { page: pageParam } = await searchParams;
  const page = parseCatalogPage(pageParam);
  const { items: services, totalPages } = await fetchSupportServices(locale, {
    page,
  });

  return (
    <div className="flex w-full flex-col">
      <ServicesSupportBanner />
      <ServicesSupportCatalog
        services={services}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ServicesSupportPage;
