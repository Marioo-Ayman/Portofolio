"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function ScrollAtmosphere() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".hero-animate", { opacity: 0, y: 22 }, { opacity: 1, y: 0, stagger: .09, duration: .8, ease: "power3.out", delay: .15 });
      gsap.fromTo(".site-header", { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: .6 });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: .7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        });
      });
    });
    media.add("(min-width: 1051px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(".hero-image-drift", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .6 } });
      const scene = document.querySelector<HTMLElement>(".hero-scene");
      const hero = document.querySelector<HTMLElement>(".hero");
      const x = gsap.quickTo(scene, "x", { duration: 1, ease: "power2.out" });
      const y = gsap.quickTo(scene, "y", { duration: 1, ease: "power2.out" });
      const move = (event: PointerEvent) => { x((event.clientX / innerWidth - .5) * 14); y((event.clientY / innerHeight - .5) * 10); };
      const leave = () => { x(0); y(0); };
      hero?.addEventListener("pointermove", move);
      hero?.addEventListener("pointerleave", leave);
      // Pin only artwork: the case-study copy and links retain normal document flow.
      gsap.utils.toArray<HTMLElement>(".project-row").forEach(row => {
        const art = row.querySelector<HTMLElement>(".project-art-link");
        if (art) ScrollTrigger.create({
          trigger: row,
          start: "top 115px",
          end: "+=110",
          pin: art,
          pinSpacing: false,
          // The row's reveal transform creates a containing block for fixed
          // children. Transform pinning preserves the artwork's grid position.
          pinType: "transform",
        });
      });
      return () => { hero?.removeEventListener("pointermove", move); hero?.removeEventListener("pointerleave", leave); };
    });
    return () => media.revert();
  }, []);
  return null;
}
