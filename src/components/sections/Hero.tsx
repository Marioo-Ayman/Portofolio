import Image from "next/image";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { ArrowDown, ArrowUpRight, Code2, Gamepad2 } from "lucide-react";
import { site } from "@/content/site";
import { ResumeLink } from "@/components/ui/ResumeLink";

export function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <div className="hero-scene" aria-hidden="true">
      <div className="hero-image-wrap"><div className="hero-image-drift" data-drift><Image src="/images/neo-tokyo-hero.webp" alt="" fill priority sizes="(max-width: 800px) 100vw, 68vw" className="hero-image"/></div></div>
      <div className="hero-scene-overlay"/><div className="hero-stars"/>
    </div>
    <div className="hero-vertical" aria-hidden="true"><span lang="ja">フルスタック開発者</span><i/></div>
    <div className="hero-container shell">
      <div className="hero-content">
        <div className="hero-status hero-animate"><span className="status-pulse"/> {site.status}</div>
        <p className="hero-overline hero-animate"><span>{"//"}</span> FULL-STACK DEVELOPER <span className="overline-dot">◆</span> CREATIVE ENGINEER</p>
        <h1 id="hero-title" className="hero-title hero-animate">CODE<br/><span>MEETS</span><br/><em>CULTURE<span className="hero-period">.</span></em></h1>
        <p className="hero-description hero-animate">{site.description} Inspired by Japanese culture, anime storytelling and immersive game worlds.</p>
        <div className="hero-actions hero-animate">
          <MagneticLink href="#projects" className="button button-red"><Code2 size={17}/> Explore my work <ArrowUpRight size={17}/></MagneticLink>
          <MagneticLink href="#about" className="button button-ghost"><Gamepad2 size={18}/> The developer</MagneticLink>
        </div>
        <div className="hero-proof hero-animate"><span>DESIGNED WITH INTENTION</span><i/><span>BUILT WITH CODE</span><i/><span>INSPIRED BY JAPAN</span></div>
        <ResumeLink />
      </div>
    </div>
    <a href="#about" className="hero-scroll" aria-label="Scroll to About"><span className="mouse-icon"><i/></span> SCROLL TO EXPLORE <ArrowDown size={14}/></a>
    <div className="hero-bottomline" aria-hidden="true"><span>35° 39&apos; N / 139° 42&apos; E</span><span>INITIALIZING NEW WORLDS / 001</span></div>
  </section>;
}
