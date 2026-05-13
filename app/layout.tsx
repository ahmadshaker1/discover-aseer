import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discover Aseer",
  description: "Discover Aseer region — heritage, nature and hospitality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
