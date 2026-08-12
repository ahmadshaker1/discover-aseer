import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

/** Legacy registration URL — public signup is closed. */
const TourGuideRegisterRedirectPage = async () => {
  const locale = await getLocale();
  redirect(`/${locale}/tour-guides`);
};

export default TourGuideRegisterRedirectPage;
