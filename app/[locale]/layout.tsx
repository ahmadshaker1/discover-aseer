import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import ConditionalFooter from "@/components/Footer/ConditionalFooter";
import ThemeInitScript from "@/components/theme/ThemeInitScript";
import TikTokPixel from "@/components/analytics/TikTokPixel";
import MetaPixel from "@/components/analytics/MetaPixel";

import { routing, type AppLocale } from "@/i18n/routing";

import "./globals.css";

const araHamah1964 = localFont({
  src: "../../public/fonts/Ara Hamah 1964 B Bold.ttf",
  variable: "--font-ara-hamah-1964",
  display: "swap",
});

const brando = localFont({
  src: [
    {
      path: "../../public/fonts/Brando/Brando-Arabic-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Brando/Brando-Arabic-Text.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Brando/Brando-Arabic-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Brando/Brando-Arabic-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Brando/Brando-Arabic-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-brando",
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
  // UserWay: 3 = bottom right, 5 = bottom left
  const userwayPosition = appLocale === "ar" ? "3" : "5";

  return (
    <html
      lang={appLocale}
      dir={appLocale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${araHamah1964.variable} ${brando.variable} ${ibmPlexSansArabic.variable} ${readexPro.variable} antialiased`}
      >
        <ThemeInitScript />
        <Script
          id="userway-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(d){
  var s = d.createElement("script");
  s.setAttribute("data-position", "${userwayPosition}");
  s.setAttribute("data-widget_layout", "full");
  s.setAttribute("data-account", "YyYRLMuqhD");
  s.setAttribute("src", "https://cdn.userway.org/widget.js");
  (d.body || d.head).appendChild(s);
})(document);
            `.trim(),
          }}
        />
        <noscript>
          Please ensure Javascript is enabled for purposes of{" "}
          <a href="https://userway.org">website accessibility</a>
        </noscript>
        <Suspense fallback={null}>
          <TikTokPixel />
          <MetaPixel />
        </Suspense>
        <NextIntlClientProvider locale={appLocale} messages={messages}>
          <Navbar />
          {children}
          <ConditionalFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
