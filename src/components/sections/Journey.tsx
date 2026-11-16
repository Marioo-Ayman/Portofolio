import { GraduationCap, ArrowUpRight } from "lucide-react";
import { education, journey, training } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Journey() {
  return <section className="section journey-section" id="journey" aria-labelledby="journey-heading">
    <div className="shell">
      <SectionHeading index="05" eyebrow="THE PATH SO FAR" title={<>Always <span>leveling up.</span></>} description="Business systems, team-built products, and the foundations behind the work." />
      <ol className="journey-list">
        {journey.map(item => <li className="journey-item" key={item.index} data-journey>
          <span className="journey-number" aria-hidden="true">{item.index}</span>
          <div className="journey-copy"><span className="micro-label">{item.organization || "ERP / INTERNSHIP"}</span><h3>{item.title}</h3><p>{item.description}</p>
            {item.responsibilities.length > 0 && <ul>{item.responsibilities.map(responsibility => <li key={responsibility}>{responsibility}</li>)}</ul>}
            <p className="journey-stack">{item.stack}</p>
          </div>
          <div className="journey-right"><span className="journey-dates">{item.dates}<small>{item.location}</small></span><ArrowUpRight size={18} aria-hidden="true"/></div>
        </li>)}
      </ol>
      <div className="journey-foundations">
        <article className="education-card" data-reveal>
          <GraduationCap size={28} aria-hidden="true"/><span className="micro-label">ACADEMIC FOUNDATION</span>
          <h3>{education.degree}</h3><p>{education.organization}</p><p>{education.department}</p><span className="education-dates">{education.dates}</span>
        </article>
        <div className="training-block" data-reveal><span className="micro-label">CONTINUOUS LEARNING</span><h3>Training &amp; certifications</h3>
          <ul className="training-list">{training.map(item => <li key={item.title}><div><h4>{item.title}</h4>{item.provider && <p>{item.provider}</p>}</div><span>{item.date}<small>{item.format}</small></span></li>)}</ul>
        </div>
      </div>
    </div>
  </section>;
}
