import type { Metadata } from "next";
import { stack } from "@/data/stack";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Stack" };

const levelClass: Record<string, string> = {
  diario: "text-emerald-600 dark:text-emerald-400",
  cómodo: "text-fg",
  explorando: "text-muted",
};

export default function StackPage() {
  return (
    <div className="space-y-12">
      <Reveal>
        <header>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Stack
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tightest sm:text-4xl">
            Herramientas que <span className="font-display italic">uso</span>.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            No es una lista de logos por inflar el CV — solo lo que toco con
            frecuencia. Cada cosa tiene una nota corta de cómo la uso.
          </p>
        </header>
      </Reveal>

      {stack.map((group, gi) => (
        <Reveal key={group.category} delay={0.05 * gi}>
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              {group.category}
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3 sm:grid-cols-[180px_1fr_auto]"
                >
                  <span className="text-sm font-medium">{tech.name}</span>
                  <span className="col-span-2 text-xs text-muted sm:col-span-1 sm:order-2">
                    {tech.note}
                  </span>
                  <span
                    className={`order-1 font-mono text-[10px] uppercase tracking-wider sm:order-3 ${levelClass[tech.level]}`}
                  >
                    {tech.level}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
