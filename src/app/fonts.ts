import { Dela_Gothic_One, DotGothic16, Inter, Zen_Kaku_Gothic_New } from "next/font/google";

// Preload only the Latin display/body faces. Japanese unicode-range files stay
// on demand; next/font self-hosts every face instead of contacting Google at runtime.
export const displayFont = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela",
  display: "swap",
});

export const uiFont = Zen_Kaku_Gothic_New({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-zen",
  display: "swap",
  preload: false,
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const hudFont = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dot",
  display: "swap",
  preload: false,
});
