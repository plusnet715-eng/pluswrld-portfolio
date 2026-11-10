import Image from "next/image";
import type { Project } from "../lib/content";
import { Reveal } from "./reveal";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const visual = project.imageUrl
    ? <Image src={project.imageUrl} alt={project.title + " storefront or product imagery"} fill sizes="(max-width: 720px) 100vw, 50vw" unoptimized={project.imageUrl.endsWith(".svg") || (!project.imageUrl.startsWith("/") && !project.imageUrl.includes("cdn.sanity.io"))} />
    : <div className="project-image-placeholder">PLUSWRLD / PROJECT</div>;

  return <Reveal className="project-card-wrap" delay={Math.min(index, 5) * 55}><article className="project-card">
    {project.liveUrl
      ? <a className="project-visual" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={"Visit " + project.title + " website"}>
          {visual}<span className="project-open">View live site ↗</span>
        </a>
      : <div className="project-visual project-visual-unavailable" aria-label={project.title + " project preview"}>
          {visual}<span className="project-open">Preview not public</span>
        </div>}
    <div className="project-card-body">
      <div className="project-meta">
        <span>{project.category}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">{project.title}</a> : project.title}</h3>
      <p>{project.summary}</p>
      {project.liveUrl
        ? <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live website <span>↗</span></a>
        : <span className="project-private-note">Public preview unavailable</span>}
    </div>
  </article></Reveal>;
}
