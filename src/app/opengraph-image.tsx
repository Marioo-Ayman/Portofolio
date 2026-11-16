import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const alt = "NEON RONIN — Full-stack developer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: 72, background: "#06060b", color: "#f6f4fb", borderBottom: "12px solid #ff1744" }}><div style={{ display: "flex", fontSize: 24, color: "#a098ff", letterSpacing: 8 }}>NEON / RONIN</div><div style={{ display: "flex", marginTop: 60, fontSize: 90, fontWeight: 700 }}>CODE MEETS</div><div style={{ display: "flex", fontSize: 90, color: "#ff1744", fontWeight: 700 }}>CULTURE.</div><div style={{ display: "flex", marginTop: 38, fontSize: 28 }}>{site.name} · {site.role}</div></div>, size);
}
