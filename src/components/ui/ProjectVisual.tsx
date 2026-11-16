import Image from "next/image";
import type { Project } from "@/content/site";
import { ProjectArtwork } from "./ProjectArtwork";
export function ProjectVisual({ project }: { project: Project }) {
  return project.screenshot ? <div className="project-screenshot"><Image src={project.screenshot.src} alt={project.screenshot.alt} fill sizes="(max-width: 800px) 100vw, 65vw" /></div> : <ProjectArtwork art={project.art}/>;
}
