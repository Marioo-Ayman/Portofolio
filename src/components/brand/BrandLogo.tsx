"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addCollapseIntoPower } from "@/lib/collapseIntoPower";

gsap.registerPlugin(ScrollTrigger);

export function NavbarLogo({ home }: { home: boolean }) {
  const root = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};

    const setup = () => {
      cleanup();
      const context = gsap.context(() => {
        const find = gsap.utils.selector(element);
        const timeline = gsap.timeline({ paused: true });
        addCollapseIntoPower(timeline, find);

        if (!home) {
          timeline.progress(1);
          return;
        }
        if (media.matches) {
          const update = () => timeline.progress(window.scrollY >= 120 ? 1 : 0);
          update();
          window.addEventListener("scroll", update, { passive: true });
          cleanup = () => { window.removeEventListener("scroll", update); context.revert(); };
          return;
        }
        ScrollTrigger.create({
          animation: timeline,
          trigger: document.body,
          start: 40,
          end: 200,
          scrub: true,
          invalidateOnRefresh: true,
        });
      }, element);
      if (!media.matches || !home) cleanup = () => context.revert();
    };

    setup();
    media.addEventListener("change", setup);
    return () => { media.removeEventListener("change", setup); cleanup(); };
  }, [home]);

  return <span ref={root} className="navbar-logo" aria-hidden="true">
    <svg className="navbar-logo-art" viewBox="0 0 390 1210" preserveAspectRatio="xMidYMid meet" focusable="false">
      <g data-camera>
        <g data-seal><image href="/images/brand/seal.png" width="390" height="1210" /></g>
        <image data-circle href="/images/brand/circle.png" x="-111" y="740" width="610" height="590" opacity="0" />
        {["M", "A", "R"].map(name => <g key={name} data-letter={name}>
          <image href={`/images/brand/${name.toLowerCase()}.png`} width="390" height="1210" />
        </g>)}
        <g data-power>
          {["I", "O"].map(name => <image key={name} href={`/images/brand/${name.toLowerCase()}.png`} width="390" height="1210" />)}
        </g>
      </g>
    </svg>
  </span>;
}
