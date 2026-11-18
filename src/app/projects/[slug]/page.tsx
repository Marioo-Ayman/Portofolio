import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { projects, site } from "@/content/site";
import { isExternalUrl } from "@/lib/utils";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { canIndex, siteOrigin } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollProgress } from "@/components/effects/ScrollProgress";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(entry => entry.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${site.displayName}`, description: project.summary,
    alternates: { canonical: siteOrigin ? `/projects/${project.slug}` : null },
    openGraph: {
      title: project.name,
      description: project.summary,
      url: siteOrigin ? `/projects/${project.slug}` : undefined,
      images: [{ url: `${site.url}/og-preview.png`, width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
    },
    robots: { index: canIndex && Boolean(project.verified), follow: canIndex },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(entry => entry.slug === slug);
  if (!project) notFound();
  const publicProjects = projects.filter(entry => entry.verified);
  const next = publicProjects[(publicProjects.findIndex(entry => entry.slug === slug) + 1) % publicProjects.length];
  return <>
    <a className="skip-link" href="#case-study">Skip to case study</a>
    <ScrollProgress /><SiteHeader />
    <main className="detail-page shell" id="case-study" tabIndex={-1}>
      <Link href="/#projects" className="detail-back"><ArrowLeft size={17}/> BACK TO SELECTED WORK</Link>
      <div className="detail-heading"><span className="eyebrow">CASE STUDY / {project.index}</span><h1>{project.name}<span>.</span></h1><div className="detail-intro"><p>{project.summary}</p><span>{project.category}</span></div></div>
      {!project.verified && <p className="content-note">Unverified portfolio draft — this project is not documented in the supplied CV.</p>}
      <div className="detail-art"><ProjectVisual project={project}/><span className="detail-art-caption">{project.screenshot ? "PROJECT SCREENSHOT" : "ILLUSTRATIVE ARTWORK — NOT A PRODUCT SCREENSHOT"}</span></div>
      <div className="detail-content">
        <aside className="detail-side">
          <div className="detail-fact"><span className="micro-label">CONTEXT</span><p>{project.year}</p></div>
          <div className="detail-fact"><span className="micro-label">MY ROLE</span><p>{project.role ?? "Role awaiting verification."}</p></div>
          <span className="micro-label">TECH STACK</span>{project.stack.map(tech => <span key={tech}>{tech}</span>)}
        </aside>
        <div className="detail-copy">
          <section className="detail-block"><span className="micro-label">01 / OVERVIEW</span><h2>The application</h2><p>{project.description}</p></section>
          <section className="detail-block"><span className="micro-label">02 / THE PROBLEM</span><h2>What it addresses</h2><p>{project.focus}</p></section>
          <section className="detail-block"><span className="micro-label">03 / RESPONSIBILITIES</span><h2>My contribution</h2><p>{project.role ?? "A detailed role breakdown has not been supplied."}</p><ul>{project.features.map(feature => <li key={feature}><span aria-hidden="true">↗</span>{feature}</li>)}</ul></section>
          {(project.frontend || project.backend) && <section className="detail-block"><span className="micro-label">04 / IMPLEMENTATION</span><h2>Across the stack</h2><div className="detail-stack-grid">
            {project.frontend && <div><h3>Frontend</h3><p>{project.frontend.join(" · ")}</p></div>}
            {project.backend && <div><h3>Backend &amp; data</h3><p>{project.backend.join(" · ")}</p></div>}
          </div></section>}
          {project.architecture && <section className="detail-block"><span className="micro-label">05 / ARCHITECTURE</span><h2>Technical approach</h2><ul>{project.architecture.map(item => <li key={item}>{item}</li>)}</ul></section>}
          {project.challenges && <section className="detail-block"><h2>Engineering challenges</h2>{project.challenges.map(item => <p key={item}>{item}</p>)}</section>}
          {project.outcome && <section className="detail-block"><span className="micro-label">DELIVERY</span><h2>The result</h2><p>{project.outcome}</p></section>}
          <div className="detail-links">
            {isExternalUrl(project.liveUrl) && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-red"><ExternalLink size={18}/> Live project <ArrowUpRight size={18}/></a>}
            {isExternalUrl(project.repoUrl) && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="button button-ghost"><Github size={18}/> Source code <ArrowUpRight size={18}/></a>}
            <Link href="/#contact" className="button button-red">Discuss a similar project <ArrowUpRight size={18}/></Link>
          </div>
        </div>
      </div>
      {next && <Link href={`/projects/${next.slug}`} className="detail-next">NEXT CASE STUDY <span>{next.name} ↗</span></Link>}
    </main>
  </>;
}
