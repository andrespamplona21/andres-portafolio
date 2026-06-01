"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Smartphone } from "lucide-react";
import { Metric } from "@/components/metric";
import { BrowserFrame } from "@/components/browser-frame";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";

type StatusLabels = Record<Project["status"], string>;

const statusDot: Record<Project["status"], string> = {
  live: "bg-accent",
  wip: "bg-warning",
  archived: "bg-subtle",
};

export function ProjectCard({
  project,
  lang,
  statusLabels,
  index,
}: {
  project: Project;
  lang: Locale;
  statusLabels: StatusLabels;
  index?: number;
}) {
  const title = project.title[lang];
  const detailHref = `/${lang}/trabajo/${project.slug}`;

  const preview = project.image ? (
    <BrowserFrame
      src={project.image}
      alt={`${title}`}
      url={project.links.demo}
    />
  ) : (
    <div className="frame flex aspect-[16/10] flex-col items-center justify-center gap-3 border border-border text-muted">
      <Smartphone className="h-8 w-8 opacity-50" strokeWidth={1.5} />
      <span className="font-mono text-[11px] uppercase tracking-widest">
        {statusLabels[project.status]}
      </span>
    </div>
  );

  return (
    <article className="group relative flex h-full flex-col">
      <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
        {preview}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            {typeof index === "number" && (
              <span className="tabular-nums text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`} />
            {statusLabels[project.status]}
          </span>
          <span className="tabular-nums">{project.year}</span>
        </div>

        {/* El título es el único enlace de la tarjeta; cubre toda el área con after:inset-0 */}
        <h3 className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent-strong">
          <Link href={detailHref} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description[lang]}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
            {project.metrics.map((m) => (
              <Metric key={m.label[lang]} value={m.value} label={m.label[lang]} />
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.links.demo || project.links.repo) && (
          <div className="relative z-10 mt-4 flex gap-4 text-xs">
            {project.links.demo && (
              <Link
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 py-1 text-accent-strong underline-offset-4 hover:underline"
              >
                demo <ArrowUpRight className="h-3 w-3" />
              </Link>
            )}
            {project.links.repo && (
              <Link
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 py-1 text-muted underline-offset-4 hover:text-fg hover:underline"
              >
                <Github className="h-3 w-3" /> código
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
