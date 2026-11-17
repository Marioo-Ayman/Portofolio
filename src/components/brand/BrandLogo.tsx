import Image from "next/image";

export function BrandLogo({ variant }: { variant: "vertical" | "compact" }) {
  return <Image src={`/images/brand/${variant}.png`} width={variant === "vertical" ? 390 : 610}
    height={variant === "vertical" ? 1210 : 1295} alt="" aria-hidden="true" preload unoptimized />;
}

export function NavbarLogo({ compact }: { compact: boolean }) {
  return <span className="navbar-logo" data-variant={compact ? "compact" : "vertical"} aria-hidden="true">
    <span className="navbar-logo-vertical"><BrandLogo variant="vertical" /></span>
    <span className="navbar-logo-compact"><BrandLogo variant="compact" /></span>
    <span className="navbar-logo-sweep" />
  </span>;
}
