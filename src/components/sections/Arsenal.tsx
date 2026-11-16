"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, Cpu, Database, PanelsTopLeft, Wrench } from "lucide-react";
import { techGroups } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
const icons = [PanelsTopLeft, Cpu, Database, Wrench];
export function Arsenal() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = techGroups[selected];
  const Icon = icons[selected];
  return <section className="section arsenal-section" id="arsenal" aria-labelledby="arsenal-heading">
    <div className="section-ambient ambient-indigo" aria-hidden="true"/>
    <div className="shell">
      <SectionHeading index="03" eyebrow="TOOLS OF THE TRADE" title={<>My <span>arsenal.</span></>} description="From the first interaction to the data behind it. Explore each layer of the stack." />
      <div className="arsenal-console" data-reveal>
        <div className="arsenal-tabs" role="tablist" aria-label="Technology categories">
          {techGroups.map((item, index) => <button key={item.index} ref={el => { tabs.current[index] = el; }} type="button" role="tab" id={`skill-tab-${index}`} aria-controls="skill-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
            let next = index;
            if (event.key === "ArrowRight") next = (index + 1) % techGroups.length;
            else if (event.key === "ArrowLeft") next = (index + techGroups.length - 1) % techGroups.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = techGroups.length - 1;
            else return;
            event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
          }}><span>{item.index}</span>{item.label}</button>)}
        </div>
        <div className="arsenal-card arsenal-panel" role="tabpanel" id="skill-panel" aria-labelledby={`skill-tab-${selected}`} tabIndex={0} key={selected}>
          <div><div className="arsenal-card-top"><span>LAYER / {group.index}</span><ArrowUpRight size={16}/></div><div className="arsenal-icon"><Icon size={30} strokeWidth={1.4}/></div><h3>{group.label}</h3><p>{group.detail}</p></div>
          <div className="arsenal-tags">{group.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
          <span className="arsenal-watermark" aria-hidden="true">{group.index}</span>
        </div>
      </div>
      <div className="arsenal-footer"><span><i/> NO FINAL BUILD. ALWAYS UPGRADING.</span><span>TECHNOLOGY IS THE TOOL. EXPERIENCE IS THE GOAL.</span></div>
    </div>
  </section>;
}
