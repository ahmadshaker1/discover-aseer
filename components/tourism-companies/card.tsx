import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import CatalogPagination from "@/components/catalog/CatalogPagination";
import { getTourismProviders } from "./data";

function formatPhoneLink(phone: string) {
  const digits = phone.replace(/\D+/g, "");
  return digits ? `tel:+966${digits}` : "#";
}

function formatWebsiteLink(website: string) {
  if (!website || website === "NA") {
    return null;
  }

  return website;
}

export default async function TourismCompaniesCardSection({
  page = 1,
}: {
  page?: number;
}) {
  const t = await getTranslations("tourismCompanies");
  const locale = await getLocale();
  const { items: providers, totalPages } = await getTourismProviders({ page });

  const companies = providers.map((provider) => ({
    name: locale === "ar" ? provider.title_ar : provider.title_en,
    phone: provider.phone || "",
    email: provider.email || "",
    website: provider.website || "",
    logo: provider.logo_url,
  }));

  return (
    <section className="w-full bg-background py-12 text-foreground sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl text-foreground">
              {t("title")}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:gap-12">
          {companies.map((company) => {
            const website = formatWebsiteLink(company.website);
            const hasEmail =
              company.email &&
              company.email !== "NA" &&
              company.email !== "null";
            const hasPhone =
              company.phone &&
              company.phone !== "NA" &&
              company.phone !== "null";

            return (
              <article
                key={company.name}
                className="group flex flex-col-reverse overflow-hidden rounded-2xl border border-border dark:border-border/60 bg-surface shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-300 lg:flex-row rtl:lg:flex-row-reverse lg:items-stretch w-full justify-between gap-0"
              >
                <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 lg:p-12 text-start space-y-5">
                  <h3 className="text-2xl font-bold leading-tight text-[#262626] dark:text-white sm:text-[28px] text-start">
                    {company.name}
                  </h3>

                  <div className="space-y-4 text-start text-[15px] font-semibold leading-6">
                    {website && (
                      <div className="flex items-center justify-start gap-3 text-[#6A6A6A] dark:text-neutral-400">
                        <div className="relative h-5 w-5 shrink-0">
                          <Image
                            src="/assets/tourism-companies/website.svg"
                            alt=""
                            fill
                            className="object-contain dark:invert"
                            sizes="20px"
                          />
                        </div>
                        <a
                          href={website}
                          target="_blank"
                          rel="noreferrer"
                          className="break-all text-[#6A06F1] dark:text-purple-400 underline decoration-2 underline-offset-4 transition-opacity hover:opacity-75"
                        >
                          {website}
                        </a>
                      </div>
                    )}

                    {hasEmail && (
                      <div className="flex items-center justify-start gap-3 text-[#5F5F5F] dark:text-neutral-300">
                        <div className="relative h-5 w-5 shrink-0">
                          <Image
                            src="/assets/tourism-companies/email.svg"
                            alt=""
                            fill
                            className="object-contain dark:invert"
                            sizes="20px"
                          />
                        </div>
                        <a
                          href={`mailto:${company.email}`}
                          className="break-all text-[#262626] dark:text-white transition-opacity hover:opacity-75"
                        >
                          {company.email}
                        </a>
                      </div>
                    )}

                    {hasPhone && (
                      <div className="flex items-center justify-start gap-3 text-[#5F5F5F] dark:text-neutral-300">
                        <div className="relative h-5 w-5 shrink-0">
                          <Image
                            src="/assets/tourism-companies/phone.svg"
                            alt=""
                            fill
                            className="object-contain dark:invert"
                            sizes="20px"
                          />
                        </div>
                        <a
                          href={formatPhoneLink(company.phone)}
                          className="break-all text-[#262626] dark:text-white transition-opacity hover:opacity-75"
                        >
                          {company.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex h-[240px] sm:h-[280px] lg:h-auto lg:w-1/2 items-center justify-center bg-white dark:bg-[#14091F] p-6 sm:p-8 shrink-0">
                  <div className="relative h-[150px] w-[280px] sm:h-[180px] sm:w-[360px]">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 280px, 360px"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <CatalogPagination currentPage={page} totalPages={totalPages} />
      </div>
    </section>
  );
}
