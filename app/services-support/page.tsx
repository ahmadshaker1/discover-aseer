import ServicesSupportBanner from "@/components/services-support/ServicesSupportBanner";
import ServicesSupportCatalog from "@/components/services-support/ServicesSupportCatalog";
import { fetchSupportServices } from "@/components/services-support/data";

const ServicesSupportPage = async () => {
  const services = await fetchSupportServices();

  return (
    <div className="flex w-full flex-col">
      <ServicesSupportBanner />
      <ServicesSupportCatalog services={services} />
    </div>
  );
};

export default ServicesSupportPage;
