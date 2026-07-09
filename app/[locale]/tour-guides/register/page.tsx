import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

/** Legacy public registration URL — guides now use the authenticated portal. */
const TourGuideRegisterRedirectPage = async () => {
  const locale = await getLocale();
  redirect(`/${locale}/tour-guides/portal`);
};

export default TourGuideRegisterRedirectPage;
