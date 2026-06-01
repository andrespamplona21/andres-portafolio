import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "es";
  return {
    title: getDictionary(locale).meta.work.title,
    alternates: {
      canonical: `/${locale}/trabajo`,
      languages: { es: "/es/trabajo", en: "/en/trabajo" },
    },
  };
}

export default async function TrabajoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.work;

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
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tightest sm:text-4xl">
            {t.titlePre}
            <span className="text-accent">{t.titleAccent}</span>
            {t.titlePost}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {t.intro}
          </p>
        </header>
      </Reveal>

      {years.map((year) => (
        <section key={year}>
          <Reveal>
            <div className="mb-6 flex items-baseline gap-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
                {year}
              </h2>
              <span className="rule-tick h-px flex-1 translate-y-[-2px]" />
            </div>
          </Reveal>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {grouped[year].map((p, i) => (
              <Reveal key={p.slug} delay={0.05 * i}>
                <ProjectCard
                  project={p}
                  lang={lang}
                  statusLabels={dict.project.status}
                />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
