import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Routes outside `[locale]` fall back to the default locale home. */
export default function RootNotFound() {
  redirect(`/${routing.defaultLocale}`);
}
