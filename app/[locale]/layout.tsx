import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Script from "next/script";
import Navbar from "@/components/Navbar/Navbar";
import ConditionalFooter from "@/components/Footer/ConditionalFooter";

import { routing, type AppLocale } from "@/i18n/routing";
import { getThemeInitScript } from "@/lib/theme/runtime";

import "./globals.css";

const araHamah1964 = localFont({
  src: "../../public/fonts/Ara Hamah 1964 B Bold.ttf",
  variable: "--font-ara-hamah-1964",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-ibm-plex-sans-arabic",
});

const readexPro = Readex_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-readex-pro",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Discover Aseer",
  description: "Discover Aseer region — heritage, nature and hospitality.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const appLocale = locale as AppLocale;
  setRequestLocale(appLocale);
  const messages = await getMessages();

  return (
    <html
      lang={appLocale}
      dir={appLocale === "ar" ? "rtl" : "ltr"}
      data-theme="light"
      suppressHydrationWarning
    >
      <head suppressHydrationWarning>
        <Script
          id="discover-aseer-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: getThemeInitScript().trim() }}
        />
      </head>
      <body
        className={`${araHamah1964.variable} ${ibmPlexSansArabic.variable} ${readexPro.variable} antialiased`}
      >
        <NextIntlClientProvider locale={appLocale} messages={messages}>
          <Navbar />
          {children}
          <ConditionalFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
