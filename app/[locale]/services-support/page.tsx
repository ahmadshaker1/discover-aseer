import ServicesSupportBanner from "@/components/services-support/ServicesSupportBanner";
import ServicesSupportCatalog from "@/components/services-support/ServicesSupportCatalog";
import { fetchSupportServices } from "@/components/services-support/data";
import { getLocale } from "next-intl/server";

const ServicesSupportPage = async () => {
  const locale = (await getLocale()) as "ar" | "en";
  const services = await fetchSupportServices(locale);

  return (
    <div className="flex w-full flex-col">
      <ServicesSupportBanner />
      <ServicesSupportCatalog services={services} />
    </div>
  );
};

export default ServicesSupportPage;
