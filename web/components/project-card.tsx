import Image from "next/image";
import type { Project } from "../lib/content";
import { Reveal } from "./reveal";
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <Reveal className="project-card-wrap" delay={index * 75}><article className="project-card">
    <a className="project-visual" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={"Visit " + project.title + " website"}>
      {project.imageUrl ? <Image src={project.imageUrl} alt={project.title + " storefront or product imagery"} fill sizes="(max-width: 720px) 100vw, 50vw" /> : <div className="project-image-placeholder">PLUSWRLD / PROJECT</div>}
      <span className="project-open">View live site ↗</span>
    </a>
    <div className="project-card-body"><div className="project-meta"><span>{project.category}</span><span>0{index + 1}</span></div><h3><a href={project.liveUrl} target="_blank" rel="noreferrer">{project.title}</a></h3><p>{project.summary}</p><a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live website <span>↗</span></a></div>
  </article></Reveal>;
}