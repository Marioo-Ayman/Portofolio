import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont, hudFont, uiFont } from "./fonts";
import { canIndex, siteOrigin } from "@/lib/seo";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — Full-Stack Developer`,
  description: site.description,
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  alternates: siteOrigin ? { canonical: "/" } : undefined,
  openGraph: { title: site.name + " - " + site.role, description: site.description, type: "website", locale: "en_US", siteName: "NEON RONIN", ...(siteOrigin ? { url: siteOrigin } : {}) },
  twitter: { card: "summary_large_image" },
  robots: { index: canIndex, follow: canIndex },
};

export const viewport: Viewport = {
  themeColor: "#06060b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${uiFont.variable} ${bodyFont.variable} ${hudFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
