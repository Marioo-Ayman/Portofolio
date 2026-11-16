import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { projects } from "@/content/site";
import { isExternalUrl } from "@/lib/utils";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { canIndex, siteOrigin } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollProgress } from "@/components/effects/ScrollProgress";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Case Study`, description: project.summary,
    alternates: { canonical: siteOrigin ? `/projects/${project.slug}` : null },
    openGraph: { title: project.name, description: project.summary, url: siteOrigin ? `/projects/${project.slug}` : undefined },
    robots: { index: canIndex && Boolean(project.verified), follow: canIndex } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return <>
    <ScrollProgress /><SiteHeader />
    <main className="detail-page shell">
      <Link href="/#projects" className="detail-back"><ArrowLeft size={17}/> BACK TO SELECTED WORK</Link>
      <div className="detail-heading"><span className="eyebrow"><span className="eyebrow-slashes">{"//"}</span> CASE STUDY / {project.index}</span><h1>{project.name}<span>.</span></h1><div className="detail-intro"><p>{project.summary}</p><span>{project.category}</span></div></div>
      {!project.verified && <p className="content-note">Draft case study — project details await owner verification.</p>}<div className="detail-art"><ProjectVisual project={project}/><span className="detail-art-caption">{project.screenshot ? "PROJECT SCREENSHOT" : "ILLUSTRATIVE UI ARTWORK — NOT A PRODUCT SCREENSHOT"}</span></div>
      <div className="detail-content"><div className="detail-side"><span className="micro-label">{"// TECH STACK"}</span>{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="detail-copy"><div className="detail-block"><span className="micro-label">01 / THE IDEA</span><h2>What it&apos;s about</h2><p>{project.description}</p></div><div className="detail-block"><span className="micro-label">02 / THE FOCUS</span><h2>Built for a reason</h2><p>{project.focus}</p></div><div className="detail-block"><span className="micro-label">03 / KEY FEATURES</span><h2>Under the hood</h2><ul>{project.features.map((feature) => <li key={feature}><span>↗</span> {feature}</li>)}</ul></div><div className="detail-links">{isExternalUrl(project.liveUrl) && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-red"><ExternalLink size={18}/> Live project <ArrowUpRight size={18}/></a>}{isExternalUrl(project.repoUrl) && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="button button-ghost"><Github size={18}/> Source code <ArrowUpRight size={18}/></a>}</div></div></div>
      <Link href="/#projects" className="detail-next">← EXPLORE MORE WORK</Link>
    </main>
  </>;
}
