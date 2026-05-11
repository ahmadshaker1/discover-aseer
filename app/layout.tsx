import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { getThemeInitScript } from "@/lib/theme/runtime";

const araHamah1964 = localFont({
  src: "../public/fonts/Ara Hamah 1964 B Bold.ttf",
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutContent>{children}</RootLayoutContent>;
}

async function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${araHamah1964.variable} ${ibmPlexSansArabic.variable} ${readexPro.variable} bg-background text-foreground antialiased transition-colors duration-300`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeInitScript(),
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
