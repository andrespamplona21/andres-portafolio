"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "motion/react";
import { Metric } from "@/components/metric";
import type { Project } from "@/data/projects";

const statusLabel: Record<Project["status"], string> = {
  live: "en vivo",
  wip: "en proceso",
  archived: "archivado",
};

const statusDot: Record<Project["status"], string> = {
  live: "bg-emerald-500",
  wip: "bg-amber-500",
  archived: "bg-neutral-400",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-fg/30 hover:shadow-lg hover:shadow-fg/5"
    >
      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
          <Image
            src={project.image}
            alt={`Vista previa de ${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
      <div className="mb-4 flex items-center justify-between text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`} />
          {statusLabel[project.status]}
        </span>
        <span className="font-mono">{project.year}</span>
      </div>

      <h3 className="mb-2 text-base font-medium tracking-tight">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      {project.metrics && project.metrics.length > 0 && (
        <div className="mb-4 grid grid-cols-3 gap-2 border-y border-border py-3">
          {project.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3 text-xs">
        {project.links.demo && (
          <Link
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
          >
            demo <ArrowUpRight className="h-3 w-3" />
          </Link>
        )}
        {project.links.repo && (
          <Link
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            <Github className="h-3 w-3" /> código
          </Link>
        )}
      </div>
      </div>
    </motion.article>
  );
}
