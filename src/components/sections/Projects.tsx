import Link from "next/link";
import { ArrowUpRight, CornerDownRight } from "lucide-react";
import { projects } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

export function Projects() {
  const featured = projects.filter(project => project.verified && project.featured);
  const more = projects.filter(project => project.verified && !project.featured);
  return <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
    <div className="shell">
      <SectionHeading index="04" eyebrow="SELECTED WORK" title={<>Work that <span>speaks.</span></>} description="Freelance applications and team contributions, from real-time support to business and AI workflows." />
      <div className="projects-list">
        {featured.map(project => <article className="project-row" key={project.slug}>
          <Link href={`/projects/${project.slug}`} className="project-art-link" aria-label={`View ${project.name} case study`}>
            <div className="project-visual-mask"><ProjectVisual project={project}/></div>
            <span className="project-art-cta"><ArrowUpRight size={22}/></span>
            <span className="project-image-note">{project.screenshot ? "PROJECT SCREENSHOT" : "ILLUSTRATIVE PREVIEW"}</span>
          </Link>
          <div className="project-details">
            <div className="project-topline"><span>PROJECT // {project.index}</span><span>{project.year}</span></div>
            <span className="project-category">{project.category}</span>
            <h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3>
            <p>{project.summary}</p>
            <div className="project-tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
            <Link href={`/projects/${project.slug}`} className="text-link">View case study <CornerDownRight size={17}/></Link>
          </div>
        </article>)}
      </div>
      <div className="project-library-heading"><span className="micro-label">MORE APPLICATIONS</span><h3>Built with a purpose.</h3></div>
      <div className="project-library">{more.map(project => <article className="project-library-card" key={project.slug} data-reveal>
        <span className="project-category">{project.category}</span><h4><Link href={`/projects/${project.slug}`}>{project.name}</Link></h4><p>{project.summary}</p>
        <div className="project-tags">{project.stack.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div>
        <Link href={`/projects/${project.slug}`} className="text-link">View case study <ArrowUpRight size={16}/></Link>
      </article>)}</div>
      <p className="projects-footnote">Selected work from freelance and team projects.<span>BUILT ACROSS THE STACK ↗</span></p>
    </div>
  </section>;
}
