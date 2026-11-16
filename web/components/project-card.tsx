"use client";

import Image from "next/image";
import type { Project } from "../lib/content";
import { Reveal } from "./reveal";
import { LiveWebsitePreview } from "./live-website-preview";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const isGraphicDesign = project.category.toLowerCase().includes("graphic design");
  const staticVisual = project.imageUrl
    ? <Image src={project.imageUrl} alt={project.title + (isGraphicDesign ? " graphic design sample" : " project image")} fill sizes="(max-width: 720px) 100vw, 50vw" unoptimized={project.imageUrl.endsWith(".svg") || (!project.imageUrl.startsWith("/") && !project.imageUrl.includes("cdn.sanity.io") && !project.imageUrl.includes("whiskerwise.com.co") && !project.imageUrl.includes("cdn.shopify.com"))} />
    : <div className="project-image-placeholder">Project preview</div>;

  return <Reveal className="project-card-wrap" delay={Math.min(index, 5) * 55}><article className="project-card">
    <div className={"project-visual" + (project.liveUrl ? " project-visual-live" : " project-visual-static")}>
      {project.liveUrl
        ? <LiveWebsitePreview url={project.liveUrl} title={project.title} poster={project.imageUrl} className="live-preview-project" />
        : staticVisual}
      <span className="project-open">{project.liveUrl ? "Hover to preview live site" : isGraphicDesign ? "Graphic design sample" : "Project image"}</span>
    </div>
    <div className="project-card-body">
      <div className="project-meta"><span>{project.category}</span></div>
      <h3>{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">{project.title}</a> : project.title}</h3>
      <p>{project.summary}</p>
      {project.liveUrl
        ? <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Open {project.title} <span>↗</span></a>
        : <span className="project-private-note">{isGraphicDesign ? "Selected design work" : "Project sample"}</span>}
    </div>
  </article></Reveal>;
}
