import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { canIndex, siteOrigin } from "@/lib/seo";
import "./globals.css";
const display = localFont({ src: [
{ path: "../../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff2", weight: "400" },
{ path: "../../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2", weight: "500" },
{ path: "../../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2", weight: "600" },
{ path: "../../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2", weight: "700" }
], variable: "--font-space", display: "swap", preload: true });
const body = localFont({ src: [
{ path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2", weight: "400" },
{ path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2", weight: "500" }
], variable: "--font-dm", display: "swap" });
const mono = localFont({ src: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", variable: "--font-mono", display: "swap", preload: false });
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
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
