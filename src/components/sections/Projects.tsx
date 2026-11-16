import Link from "next/link";
import { ArrowUpRight, CornerDownRight } from "lucide-react";
import { projects } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

export function Projects() {
  return <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
    <div className="shell">
      <SectionHeading index="04" eyebrow="SELECTED MISSIONS" title={<>Work that <span>speaks.</span></>} description="A few examples of the products and problems I love working on." />
      <div className="projects-list">
        {projects.map((project) => <article className="project-row" key={project.slug} data-reveal>
          <Link href={`/projects/${project.slug}`} className="project-art-link" aria-label={`View ${project.name} case study`}>
            <ProjectVisual project={project}/>
            <span className="project-art-cta"><ArrowUpRight size={22}/></span>
            <span className="project-image-note">{project.screenshot ? "PROJECT SCREENSHOT" : "ILLUSTRATIVE PREVIEW"}</span>
          </Link>
          <div className="project-details"><div className="project-topline"><span>PROJECT // {project.index}</span><span>{project.verified ? project.year : "DRAFT / TO VERIFY"}</span></div>
            <span className="project-category">{project.category}</span>
            <h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3>
            <p>{project.summary}</p>
            <div className="project-tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
            <Link href={`/projects/${project.slug}`} className="text-link">View case study <CornerDownRight size={17}/></Link>
          </div>
        </article>)}
      </div>
      <p className="projects-footnote" data-reveal>Every build is a chance to learn something new. <span>MORE WORK IN PROGRESS ↗</span></p>
    </div>
  </section>;
}
