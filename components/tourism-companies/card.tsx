import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface TourismCompanyCardData {
  name: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
}

function getCompanyKeys() {
  return ["campany1", "campany2", "campany3", "campany4"] as const;
}

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

export default async function TourismCompaniesCardSection() {
  const t = await getTranslations("tourismCompanies");

  const companies: TourismCompanyCardData[] = getCompanyKeys().map((key) => ({
    name: t(`${key}.name`),
    phone: t(`${key}.phone`),
    email: t(`${key}.email`),
    website: t(`${key}.website`),
    logo: t(`${key}.logo`),
  }));

  return (
    <section className="w-full bg-white py-12 text-foreground sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/50">
              {t("navigation.companies")}
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              {t("title")}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {companies.map((company) => {
            const website = formatWebsiteLink(company.website);

            return (
              <article
                key={company.name}
                className="overflow-hidden rounded-2xl border border-black/10 bg-[#F7F7F6] shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex h-[150px] items-center justify-center bg-white p-8 sm:h-[200px]">
                  <div className="relative h-full w-full">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 80vw, 320px"
                    />
                  </div>
                </div>

                <div className="space-y-5 p-6 sm:p-7">
                  <h3 className=" text-2xl font-bold leading-tight text-[#262626] sm:text-[28px]">
                    {company.name}
                  </h3>

                  <div className="space-y-4 text-right text-[15px] font-semibold leading-6">
                    <div className="flex items-center justify-start gap-3 text-[#6A6A6A]">
                      <div className="relative h-5 w-5 shrink-0">
                        <Image
                          src="/assets/tourism-companies/website.svg"
                          alt=""
                          fill
                          className="object-contain"
                          sizes="20px"
                        />
                      </div>
                      {website ? (
                        <a
                          href={website}
                          target="_blank"
                          rel="noreferrer"
                          className="break-all text-[#6A06F1] underline decoration-2 underline-offset-4 transition-opacity hover:opacity-75"
                        >
                          {website}
                        </a>
                      ) : (
                        <span className="text-[#6A06F1]">
                          {t("navigation.companies")}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-start gap-3 text-[#5F5F5F]">
                      <div className="relative h-5 w-5 shrink-0">
                        <Image
                          src="/assets/tourism-companies/email.svg"
                          alt=""
                          fill
                          className="object-contain"
                          sizes="20px"
                        />
                      </div>
                      <a
                        href={`mailto:${company.email}`}
                        className="break-all transition-opacity hover:opacity-75"
                      >
                        {company.email}
                      </a>
                    </div>

                    <div className="flex items-center justify-start gap-3 text-[#5F5F5F]">
                      <div className="relative h-5 w-5 shrink-0">
                        <Image
                          src="/assets/tourism-companies/phone.svg"
                          alt=""
                          fill
                          className="object-contain"
                          sizes="20px"
                        />
                      </div>
                      <a
                        href={formatPhoneLink(company.phone)}
                        className="transition-opacity hover:opacity-75"
                      >
                        {company.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
