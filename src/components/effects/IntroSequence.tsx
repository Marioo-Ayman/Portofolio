"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { AnimatedLogoIntro } from "@/components/brand/AnimatedLogoIntro";
import { KatanaTransition } from "./KatanaTransition";

const seenKey = "neon-ronin-intro-seen";
gsap.registerPlugin(MotionPathPlugin);
let seenInMemory = false;

export function IntroSequence() {
  // Server and first client render agree; the pre-paint bootstrap gates visibility.
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const dismiss = useRef<() => void>(() => {});
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const html = document.documentElement;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let seen = seenInMemory;
    try { seen ||= !!sessionStorage.getItem(seenKey); } catch { /* Storage is optional. */ }
    let disposed = false, finished = false;
    let timeline: gsap.core.Timeline | undefined;
    const context = gsap.context(() => {}, element);
    const previousFocus = document.activeElement as HTMLElement | null;
    const inertTargets = [...document.querySelectorAll<HTMLElement>("main, .site-header, .hero-chapters, .skip-link")];
    const originalInert = inertTargets.map(node => node.inert);
    const reveal = () => window.dispatchEvent(new Event("mario:hero-reveal"));
    const finish = () => {
      if (finished || disposed) return;
      finished = true;
      timeline?.kill();
      if (html.dataset.intro === "playing" || html.dataset.intro === "pending") {
        seenInMemory = true;
        try { sessionStorage.setItem(seenKey,"true"); } catch { /* Storage is optional. */ }
      }
      delete html.dataset.intro;
      inertTargets.forEach((node,i) => { node.inert = originalInert[i]; });
      reveal();
      if (element.contains(document.activeElement)) previousFocus?.focus({ preventScroll: true });
      setVisible(false);
    };
    dismiss.current = finish;
    const safety = window.setTimeout(finish, 6500);
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); finish(); }
      if (event.key === "Tab" && !finished) { event.preventDefault(); element.querySelector<HTMLButtonElement>("button")?.focus(); }
    };
    const motionChange = () => { if (media.matches) finish(); };
    window.addEventListener("keydown", keydown);
    window.addEventListener("mario:intro-timeout", finish);
    media.addEventListener("change", motionChange);
    if (seen || media.matches || location.hash || html.dataset.intro === "expired") {
      finish();
    } else {
      html.dataset.intro = "pending";
      inertTargets.forEach(node => { node.inert = true; });
      element.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
      const preload = ["m","a","r","i","o","seal","circle"].map(name => {
        const img = new Image(); img.src = `/images/brand/${name}.png`; return img.decode();
      });
      Promise.all(preload).then(() => {
        if (disposed || finished) return;
        seenInMemory = true;
        try { sessionStorage.setItem(seenKey,"true"); } catch { /* In-memory fallback. */ }
        html.dataset.intro = "playing";
        context.add(() => {
          const find = gsap.utils.selector(element);
          const stage = (name: string) => { element.dataset.stage = name; };
          timeline = gsap.timeline({ onComplete: finish });
          timeline.call(() => stage("ink"), [], 0);
          ["M","A","R","I","O"].forEach((name,i) => {
            timeline!.to(find(`[data-brush="${name}"]`), { strokeDashoffset:0, autoRound:false, duration:[.14,.2,.16,.14,.26][i], stagger:[.05,.08,.07,0,0][i], ease:"power2.inOut" }, [.04,.25,.47,.79,.91][i]);
            // Restore every detached fleck and edge as the final brush pass lands.
            timeline!.to(find(`[data-ink-complete="${name}"]`),{opacity:1,duration:.035},[.295,.495,.735,.895,1.135][i]);
          });
          timeline.to(find("[data-ink-dust]"), { opacity:.65, duration:.09, stagger:.055 }, .12)
            .to(find("[data-ink-dust]"), { opacity:0, x:9, y:20, duration:.25, stagger:.055 }, .23)
            .call(() => stage("seal"), [], 1.27)
            .to(find("[data-seal-brush]"), { attr:{d:"M -15 1210 L 405 1210 L 405 -20 L 335 -44 L 277 -15 L 217 -33 L 150 -10 L 82 -39 L -15 -25 Z"}, duration:.24, ease:"power3.out" },1.27)
            .fromTo(find("[data-seal]"), { scale:1.025, svgOrigin:"194 605" }, { scale:1, duration:.22, ease:"power2.out" },1.27)
            .to(find("[data-halo]"), { opacity:.32, duration:.12 },1.29)
            .to(find("[data-halo]"), { opacity:.12, duration:.22 },1.41)
            .call(() => stage("collapse"), [],1.78);
          ["M","A","R"].forEach((name,i) => {
            const centerY=[155,405,715][i];
            timeline!.to(find(`[data-letter="${name}"]`), {
              svgOrigin:`194 ${centerY}`, motionPath:{path:[{x:0,y:0},{x:[-130,110,-85][i],y:150},{x:0,y:1035-centerY}],curviness:1.4},
              rotation:[30,-24,20][i],scale:.04,duration:.65,ease:"power2.in",
            },1.79+i*.045).to(find(`[data-letter="${name}"]`),{opacity:0,duration:.13},2.3+i*.045);
          });
          timeline.to(find("[data-seal]"),{svgOrigin:"194 1035",scaleX:.6,scaleY:.02,y:0,duration:.65,ease:"power3.in"},1.8)
            .to(find("[data-seal]"),{opacity:0,duration:.16},2.28)
            .fromTo(find("[data-circle]"),{scale:.12,svgOrigin:"194 1035"},{scale:1,opacity:1,duration:.42,ease:"power2.out"},2.09)
            .to(find("[data-energy]"),{opacity:.55,strokeDashoffset:0,autoRound:false,duration:.4,stagger:.035},1.85)
            .to(find("[data-energy]"),{opacity:0,strokeDashoffset:-1,autoRound:false,duration:.3},2.2)
            // One camera move recenters the entire world; I/O never separates.
            .to(find("[data-camera]"),{y:-435,duration:.5,ease:"power2.inOut"},2.13);
          find("[data-fragment]").forEach((node: Element,i: number)=>{
            timeline!.fromTo(node,{x:(i%2?1:-1)*(80+i*11),y:-230-(i%3)*130,opacity:0},
              {x:0,y:0,opacity:.85,duration:.25,ease:"power2.in"},2.16+(i%5)*.025)
              .to(node,{opacity:0,duration:.1},2.43+(i%5)*.025);
          });
          timeline.call(()=>stage("power"),[],2.54)
            .to(find("[data-power]"),{opacity:.55,duration:.12},2.54)
            .to(find("[data-power]"),{opacity:1,duration:.13},2.69)
            .to(find("[data-power]"),{filter:"drop-shadow(0 0 5px #fff2ed) drop-shadow(0 0 18px #b50929)",duration:.13},2.69)
            .to(find("[data-power]"),{filter:"drop-shadow(0 0 0px transparent)",duration:.35},2.82)
            .to(find("[data-halo]"),{opacity:1,duration:.13},2.69)
            .to(find("[data-halo]"),{opacity:.3,duration:.38},2.82)
            .fromTo(find("[data-wave]"),{scale:.95,svgOrigin:"194 1035",opacity:.85},{scale:3.4,opacity:0,duration:.52,ease:"power2.out",immediateRender:false},2.72)
            .fromTo(find("[data-refraction]"),{scale:1,svgOrigin:"194 1035",opacity:.1},{scale:2.5,opacity:0,strokeWidth:1,duration:.4,ease:"power2.out",immediateRender:false},2.72);
          find("[data-spark]").forEach((node:Element,i:number)=>{
            const angle=i*Math.PI/6;
            timeline!.fromTo(node,{opacity:.9},{x:Math.cos(angle)*(300+i*9),y:Math.sin(angle)*(300+i*9),opacity:0,duration:.5,ease:"power2.out",immediateRender:false},2.73);
          });
          timeline.call(()=>stage("katana"),[],3.02)
            .to(find("[data-katana]"),{scaleX:1,opacity:1,duration:.17,ease:"power4.in"},3.02)
            .to(find("[data-katana-reflection]"),{scaleX:1,opacity:.6,duration:.2,ease:"power3.in"},3.07)
            .call(reveal,[],3.18)
            .to(find(".awakening-panel-upper, .awakening-art-upper"),{x:()=>-innerWidth*.3,y:()=>-innerHeight*1.05,duration:.65,ease:"power3.inOut"},3.18)
            .to(find(".awakening-panel-lower, .awakening-art-lower"),{x:()=>innerWidth*.3,y:()=>innerHeight*1.05,duration:.65,ease:"power3.inOut"},3.18)
            .to(find("[data-katana], [data-katana-reflection]"),{opacity:0,duration:.3},3.3)
            .to(find(".awakening-skip"),{opacity:0,duration:.12},3.55)
            .call(()=>stage("revealed"),[],3.85);
        });
      }).catch(finish);
    }
    return () => {
      disposed = true;
      window.clearTimeout(safety);
      window.removeEventListener("keydown",keydown);
      window.removeEventListener("mario:intro-timeout",finish);
      media.removeEventListener("change",motionChange);
      context.revert();
      inertTargets.forEach((node,i)=>{node.inert=originalInert[i];});
      delete html.dataset.intro;
    };
  }, [visible]);
  if (!visible) return null;
  return <div ref={root} className="awakening" role="dialog" aria-modal="true" aria-label="MARIO Awakening introduction" data-stage="preparing">
    <div className="awakening-panel awakening-panel-upper" aria-hidden="true" />
    <div className="awakening-panel awakening-panel-lower" aria-hidden="true" />
    <AnimatedLogoIntro />
    <KatanaTransition />
    <button className="awakening-skip" type="button" onClick={()=>dismiss.current()}>Skip intro <span aria-hidden="true">↗</span></button>
  </div>;
}
