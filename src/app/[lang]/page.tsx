import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { projects } from "@/data/projects";
import { stack } from "@/data/stack";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { MotionButton } from "@/components/motion-button";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.home;

  const highlights = projects.filter((p) => p.highlight);
  const allTags = Array.from(
    new Set(stack.flatMap((g) => g.items.map((i) => i.name)))
  ).slice(0, 12);

  return (
    <div className="space-y-28">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute -inset-x-6 -top-28 -bottom-10 -z-10 paper-grid" />

        <Reveal>
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>{t.status}</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tightest sm:text-6xl">
            {t.name}
            <br />
            <span className="text-accent">{t.h1Accent}</span>
            {t.h1Post}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
            {t.intro}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionButton href={`/${lang}/trabajo`} variant="primary">
              {t.viewWork}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MotionButton>
            <MotionButton href={`/${lang}/sobre-mi#cv`} variant="ghost">
              <FileText className="h-4 w-4" />
              {t.cv}
            </MotionButton>
          </div>
        </Reveal>
      </section>

      {/* Trabajo destacado */}
      <section>
        <Reveal>
          <div className="mb-6 flex items-baseline gap-3">
            <span className="font-mono text-xs tabular-nums text-accent-strong">01</span>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
              {t.work.title}
            </h2>
            <span className="rule-tick h-px flex-1 translate-y-[-2px]" />
            <Link
              href={`/${lang}/trabajo`}
              className="font-mono text-xs text-muted underline-offset-4 hover:text-accent-strong hover:underline"
            >
              {t.work.viewAll}
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {highlights.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={0.05 * i}
              className={i === 0 ? "sm:col-span-2" : ""}
            >
              <ProjectCard
                project={p}
                lang={lang}
                statusLabels={dict.project.status}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cita / filosofía */}
      <section>
        <Reveal>
          <figure className="relative mx-auto max-w-2xl text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none font-mono text-7xl leading-none text-accent/15"
            >
              &ldquo;
            </span>
            <blockquote className="text-2xl font-medium leading-snug tracking-tight sm:text-[1.7rem]">
              {t.quote.pre}
              <span className="text-accent">{t.quote.accent}</span>
              {t.quote.post}
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
              {t.quote.attribution}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* CTA de cierre — panel bermellón */}
      <section>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-accent px-8 py-14 text-center text-accent-fg sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
            <h2 className="relative text-2xl font-medium tracking-tight sm:text-3xl">
              {t.cta.title}
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-accent-fg">
              {t.cta.body}
            </p>
            <div className="relative mt-7 flex justify-center">
              <MotionButton href={`/${lang}/contacto`} variant="inverse">
                {t.cta.button}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MotionButton>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
