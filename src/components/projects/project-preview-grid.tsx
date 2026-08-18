import Link from "next/link";

import { StatusPill } from "@/components/ui/status-pill";
import { projects } from "@/data/projects";

const stageLabels = {
  foundation: "Foundation",
  building: "Building",
  planned: "Planned",
  published: "Published"
} as const;

export function ProjectPreviewGrid() {
  return (
    <div className="grid gap-px border border-border bg-border md:grid-cols-2">
      {projects.map((project) => (
        <article key={project.id} className="bg-surface p-4 sm:p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <StatusPill tone={project.stage === "foundation" ? "accent" : "muted"}>
              {stageLabels[project.stage]}
            </StatusPill>
            {project.placeholder ? (
              <span className="font-mono text-[0.68rem] uppercase tracking-normal text-muted-foreground">
                Placeholder
              </span>
            ) : null}
          </div>
          <h2 className="text-lg font-semibold text-foreground">{project.title}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border bg-background px-2 py-1 font-mono text-[0.68rem] uppercase tracking-normal text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.href ? (
            <Link
              href={project.href}
              className="mt-6 inline-flex font-mono text-xs uppercase tracking-normal text-accent underline-offset-4 hover:underline"
            >
              Open record
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}
