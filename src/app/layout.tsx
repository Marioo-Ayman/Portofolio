import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont, hudFont, uiFont } from "./fonts";
import { canIndex, siteOrigin } from "@/lib/seo";
import "./globals.css";
import "./awakening.css";
import { site } from "@/content/site";

const socialImageUrl = `${site.url}/og-preview.png`;

export const metadata: Metadata = {
  title: `${site.displayName} | Full-Stack Developer`,
  description: site.description,
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  alternates: siteOrigin ? { canonical: "/" } : undefined,
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.description,
    type: "website",
    url: site.url,
    locale: "en_US",
    siteName: "NEON RONIN",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: [socialImageUrl],
  },
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
