import { getLocale } from "next-intl/server";

type IdentityFile = {
  id: string;
  title_en: string | null;
  title_ar: string | null;
  cover_url: string | null;
  zip_file_url: string | null;
  status?: string | null;
};

type IdentityFilesResponse = {
  data?: IdentityFile[];
};

const IDENTITY_FILES_URL =
  "https://tool-portal.discoveraseer.com/items/aseer_identites";

function getLocalizedTitle(file: IdentityFile, locale: string) {
  if (locale === "ar") {
    return file.title_ar || file.title_en || "";
  }

  return file.title_en || file.title_ar || "";
}

async function fetchIdentityFiles(): Promise<IdentityFile[]> {
  const response = await fetch(IDENTITY_FILES_URL, {
    next: { revalidate: 0 }, // TODO: restore 3600 collection cache
  });

  if (!response.ok) {
    throw new Error("Failed to fetch identity files");
  }

  const payload = (await response.json()) as
    | IdentityFilesResponse
    | IdentityFile[];
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];

  return items.filter((file) => file.status === "published");
}

export default async function AseerIdentityFiles() {
  const locale = await getLocale();
  const files = await fetchIdentityFiles();

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {files.map((file) => {
            const title = getLocalizedTitle(file, locale);

            return (
              <div
                key={file.id}
                className="bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.04)]"
              >
                <div className="bg-[#D1D3D4] w-full h-[260px] relative flex items-center justify-center">
                  {file.cover_url ? (
                    <img
                      src={file.cover_url}
                      alt={title}
                      className="w-full h-full "
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      {locale === "ar" ? "صورة الملف" : "File image"}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between p-6">
                  <h3 className="text-lg md:text-xl font-bold text-black">
                    {title}
                  </h3>

                  {file.zip_file_url ? (
                    <a
                      className="flex items-center gap-2 rounded-full border border-[#7300CD] px-5 py-2 text-[#7300CD] transition-colors hover:bg-[#F3EFFF]"
                      href={file.zip_file_url}
                      target="_self"
                      rel="noreferrer"
                      download
                      aria-label={
                        locale === "ar" ? `تحميل ${title}` : `Download ${title}`
                      }
                    >
                      <span className="mt-1 text-sm font-bold">
                        {locale === "ar" ? "تحميل" : "Download"}
                      </span>
                    </a>
                  ) : (
                    <span className="rounded-full border border-gray-200 px-5 py-2 text-sm font-bold text-gray-400">
                      {locale === "ar" ? "غير متوفر" : "Unavailable"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
