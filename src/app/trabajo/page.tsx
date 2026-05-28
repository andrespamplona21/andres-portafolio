import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Trabajo" };

export default function TrabajoPage() {
  const grouped = projects.reduce<Record<number, typeof projects>>((acc, p) => {
    acc[p.year] = acc[p.year] ?? [];
    acc[p.year].push(p);
    return acc;
  }, {});
  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  return (
    <div className="space-y-12">
      <Reveal>
        <header>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Trabajo
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tightest sm:text-4xl">
            Cosas que <span className="font-display italic">he construido</span>.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Una mezcla de proyectos de cliente, plantillas y experimentos
            personales. Los más recientes arriba.
          </p>
        </header>
      </Reveal>

      {years.map((year) => (
        <section key={year}>
          <Reveal>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              {year}
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {grouped[year].map((p, i) => (
              <Reveal key={p.slug} delay={0.05 * i}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
