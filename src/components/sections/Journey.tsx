import { ArrowUpRight } from "lucide-react";
import { journey, journeyVerified } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Journey() {
  return <section className="section journey-section" id="journey" aria-labelledby="journey-heading">
    <div className="shell">
      <SectionHeading index="05" eyebrow="THE PATH SO FAR" title={<>Always <span>leveling up.</span></>} description="Experiences that have shaped how I design, collaborate and build." />
      <p className="content-note">{!journeyVerified && "Draft experience: roles and descriptions await confirmation."}</p><div className="journey-list">
        {journey.map((item) => <div className="journey-item" key={item.index} data-reveal>
          <span className="journey-number">{item.index}</span>
          <div><span className="micro-label">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.description}</p></div>
          <div className="journey-right"><span>{item.stack}</span><ArrowUpRight size={18}/></div>
        </div>)}
      </div>
    </div>
  </section>;
}
