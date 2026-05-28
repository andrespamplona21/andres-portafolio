import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { projects } from "@/data/projects";
import { stack } from "@/data/stack";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { MotionButton } from "@/components/motion-button";

export default function Home() {
  const highlights = projects.filter((p) => p.highlight);
  const allTags = Array.from(
    new Set(stack.flatMap((g) => g.items.map((i) => i.name)))
  ).slice(0, 12);

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section>
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>disponible para proyectos</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-4xl font-medium tracking-tightest sm:text-5xl">
            Andres Pamplona,{" "}
            <span className="font-display italic font-normal text-muted">
              desarrollador
            </span>{" "}
            de software.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Construyo interfaces web rápidas y APIs limpias. Me obsesiona el
            detalle, los tiempos de carga y que las cosas se sientan bien al
            usarlas. Actualmente trabajando con Astro, Next.js, Supabase y todo
            lo que tenga buenos defaults.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-2">
            {allTags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionButton href="/trabajo" variant="primary">
              Ver trabajo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MotionButton>
            <MotionButton href="/cv/andres-cv.pdf" variant="ghost" download>
              <Download className="h-4 w-4" />
              CV
            </MotionButton>
          </div>
        </Reveal>
      </section>

      {/* Trabajo destacado */}
      <section>
        <Reveal>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
              Trabajo destacado
            </h2>
            <Link
              href="/trabajo"
              className="text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
            >
              ver todo →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 * i}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cita / intro corta */}
      <section>
        <Reveal>
          <blockquote className="border-l-2 border-fg pl-6">
            <p className="font-display text-2xl italic leading-snug">
              &ldquo;Lo simple, bien hecho, gana casi siempre.&rdquo;
            </p>
            <p className="mt-3 text-xs text-muted">— filosofía personal</p>
          </blockquote>
        </Reveal>
      </section>

      {/* CTA de cierre */}
      <section>
        <Reveal>
          <div className="rounded-xl border border-border bg-surface p-8 text-center sm:p-12">
            <h2 className="text-2xl font-medium tracking-tightest sm:text-3xl">
              ¿Tienes un proyecto{" "}
              <span className="font-display italic font-normal">en mente</span>?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Estoy disponible para nuevos proyectos. Cuéntame qué necesitas y
              te respondo en menos de 24 horas.
            </p>
            <div className="mt-6 flex justify-center">
              <MotionButton href="/contacto" variant="gradient">
                Hablemos
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MotionButton>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
