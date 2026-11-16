import { ArrowUpRight, Code2, Gamepad2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import { about, site } from "@/content/site";

function ToriiIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 5c4 2.5 16 2.5 20 0M3 3c4 2.4 14 2.4 18 0M5 7h14M7 7v14M17 7v14M4 12h16M6 21h3m6 0h3" />
  </svg>;
}

export function About() {
  return <section className="section about-section" id="about" aria-labelledby="about-heading">
    <div className="shell">
      <SectionHeading index="02" eyebrow="THE PERSON BEHIND THE PIXELS" title={<>The developer behind <span>the code.</span></>} />
      <div className="about-grid">
        <div className="about-frame" data-reveal>
          <div className="about-viewport">
            <div className="about-scene">
              {site.portrait ? <Image src={site.portrait.src} alt={site.portrait.alt} fill sizes="(max-width: 800px) 100vw, 45vw" className="about-portrait" style={{ objectPosition: site.portrait.position ?? "center" }} /> : <>
              <div className="about-gridlines"/><div className="about-sun"/><div className="about-floor"/>
              <div className="about-codebox"><div><span>01</span> const developer = {'{'}</div><div><span>02</span> &nbsp; passion: <em>&quot;building&quot;</em>,</div><div><span>03</span> &nbsp; inspiration: <em>&quot;Japan&quot;</em>,</div><div><span>04</span> &nbsp; mindset: <em>&quot;always learning&quot;</em>,</div><div><span>05</span> {'}'}</div><div className="about-cursor">▌</div></div>
              <div className="about-square"><span>侍</span></div>
              <p className="about-caption">FIG. 01 / BETWEEN WORLDS</p>
              </>}
            </div>
          </div>
        </div>
        <div className="about-copy" data-reveal>
          <span className="micro-label">{"// A LITTLE ABOUT ME"}</span>
          <h3>{about.heading}</h3>
          {about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <div className="about-pillar-grid">
            <div><Code2 size={22}/><strong>BUILD</strong><span>Full-stack development</span></div>
            <div><Gamepad2 size={22}/><strong>PLAY</strong><span>Games &amp; immersive worlds</span></div>
            <div><ToriiIcon/><strong>EXPLORE</strong><span>Japan &amp; anime</span></div>
          </div>
          <a href="#arsenal" className="text-link">See my technical arsenal <ArrowUpRight size={16}/></a>
        </div>
      </div>
    </div>
  </section>;
}
