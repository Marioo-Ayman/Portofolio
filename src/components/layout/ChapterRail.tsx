"use client";
import { useEffect, useState } from "react";
import { navigation } from "@/content/site";
export function ChapterRail() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-20% 0px -65% 0px" });
    navigation.forEach(({href}) => { const section = document.querySelector(href); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  return <nav className="hero-chapters" aria-label="Chapters">{navigation.map(({ number, label, href }) => <a key={href} href={href} aria-current={active === href.slice(1) ? "location" : undefined} className={active === href.slice(1) ? "selected" : ""}><i/><span>CH. {number}<strong>{label.toUpperCase()}</strong></span></a>)}</nav>;
}
