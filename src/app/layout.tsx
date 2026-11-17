import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont, hudFont, uiFont } from "./fonts";
import { canIndex, siteOrigin } from "@/lib/seo";
import "./globals.css";
import "./awakening.css";
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
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} ${uiFont.variable} ${bodyFont.variable} ${hudFont.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(location.pathname==='/'&&!location.hash&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('neon-ronin-intro-seen')){document.documentElement.dataset.intro='pending';setTimeout(function(){var h=document.documentElement;if(h.dataset.intro==='pending'||h.dataset.intro==='playing'){h.dataset.intro='expired';dispatchEvent(new Event('mario:intro-timeout'));dispatchEvent(new Event('mario:hero-reveal'));}},6500);}}catch(e){}})();` }} />
        {["m","a","r","i","o","seal","circle"].map(name => <link key={name} rel="preload" as="image" href={`/images/brand/${name}.png`} />)}
      </head>
      <body>{children}</body>
    </html>
  );
}
