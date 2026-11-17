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
      gsap.fromTo("[data-hero-line]", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: .12, duration: .95, ease: "power3.out", delay: .2 });
      gsap.fromTo(".site-header", { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: .6 });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el => {
        if (el.closest(".about-grid")) return;
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: .7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        });
      });
      gsap.fromTo(".about-grid > [data-reveal]", { opacity: 0, y: 22 }, {
        opacity: 1, y: 0, duration: .8, stagger: .15, ease: "power2.out",
        scrollTrigger: { trigger: ".about-grid", start: "top 85%", once: true },
      });
      gsap.utils.toArray<HTMLElement>(".project-row").forEach(row => {
        gsap.fromTo(row.querySelectorAll(".project-details > *"), { opacity: 0, y: 15 }, {
          opacity: 1, y: 0, stagger: .06, duration: .6, ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 87%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-journey]").forEach(item => {
        gsap.fromTo(item.querySelector(".journey-copy"), { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: .65,
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
        ScrollTrigger.create({ trigger: item, start: "top 65%", end: "bottom 25%", toggleClass: "is-current" });
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
      gsap.utils.toArray<HTMLElement>(".project-row").forEach(row => {
        gsap.fromTo(row.querySelector(".project-visual-mask"), { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)", duration: .9, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
        const grid = row.querySelector(".art-grid");
        if (grid) gsap.to(grid, { yPercent: -10, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } });
      });
      return () => { hero?.removeEventListener("pointermove", move); hero?.removeEventListener("pointerleave", leave); };
    });
    return () => media.revert();
  }, []);
  return null;
}
