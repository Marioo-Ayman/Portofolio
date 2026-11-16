"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/content/site";
import Link from "next/link";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-20% 0px -65% 0px" });
    navigation.forEach(({href}) => { const el = document.querySelector(href); if (el) observer.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("mobile-menu-open");
    const main = document.querySelector("main");
    if (main) main.inert = true;
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("#mobile-nav a"));
    links[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key === "Tab") {
        const targets = [toggle.current, ...links].filter(Boolean) as HTMLElement[];
        const index = targets.indexOf(document.activeElement as HTMLElement);
        event.preventDefault();
        targets[(index + (event.shiftKey ? -1 : 1) + targets.length) % targets.length]?.focus();
      }
    };
    const desktop = matchMedia("(min-width: 1051px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", resize); window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("mobile-menu-open"); if (main) main.inert = false; window.removeEventListener("keydown", onKey); desktop.removeEventListener("change", resize); };
  }, [open]);
  return <>
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <Link className="brand" href="/#home" onClick={() => setOpen(false)} aria-label="Return to home"><span className="brand-mark" aria-hidden="true">忍</span><span className="brand-separator"/><span className="brand-label">{site.name}</span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{navigation.map(({number,label,href}) =>
        <Link href={`/${href}`} key={href} aria-current={pathname === "/" && active === href.slice(1) ? "location" : undefined} className={`nav-link ${pathname === "/" && active === href.slice(1) ? "active" : ""}`}><span>{number}</span>{label}</Link>
      )}</nav>
      <Link className="header-cta" href="/#contact" onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={15}/></Link>
      <button ref={toggle} className="mobile-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav">{open ? <X size={22}/> : <Menu size={22}/>}</button>
    </header>
    <nav id="mobile-nav" aria-label="Mobile navigation" className={`mobile-nav ${open ? "open" : ""}`} inert={!open}>
      <span className="eyebrow">{"// NAVIGATION SYSTEM"}</span>
      {navigation.map(({number,label,href}) => <Link href={`/${href}`} key={href} aria-current={pathname === "/" && active === href.slice(1) ? "location" : undefined} onClick={() => { setOpen(false); toggle.current?.focus(); }}><span>{number}</span>{label}<ArrowUpRight size={19}/></Link>)}
      <p>CODE / CULTURE / CRAFT</p>
    </nav>
  </>;
}
