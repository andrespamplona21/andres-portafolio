import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Smartphone } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/reveal";
import { Metric } from "@/components/metric";
import { BrowserFrame } from "@/components/browser-frame";
import { ProjectGallery } from "@/components/project-gallery";
import { MotionButton } from "@/components/motion-button";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "404" };

  const title = project.title[locale];
  const description = project.detail.overview[locale];
  // Override por página: usa el screenshot del proyecto; si no hay, cae al OG global.
  const image = project.image ?? "/opengraph-image.png";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/trabajo/${slug}`,
      languages: {
        es: `/es/trabajo/${slug}`,
        en: `/en/trabajo/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      siteName: "Andres Pamplona",
      url: `/${locale}/trabajo/${slug}`,
      title,
      description,
      locale: locale === "es" ? "es_MX" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.projectDetail;

  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const d = project.detail;

  return (
    <div className="space-y-16">
      <Reveal>
        <Link
          href={`/${lang}/trabajo`}
          className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-fg"
        >
          <ArrowLeft className="h-3 w-3" /> {t.backToWork}
        </Link>
      </Reveal>

      {/* Encabezado */}
      <Reveal delay={0.05}>
        <header>
          <div className="mb-3 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {dict.project.status[project.status]}
            <span className="text-muted">·</span>
            <span className="tabular-nums">{project.year}</span>
          </div>
          <h1 className="text-3xl font-medium tracking-tightest sm:text-4xl">
            {project.title[lang]}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {project.description[lang]}
          </p>

          <div className="mt-6">
            {project.links.demo ? (
              <MotionButton href={project.links.demo} variant="primary" external>
                {t.visit}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MotionButton>
            ) : (
              <p className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                {t.inDevelopment}
              </p>
            )}
          </div>
        </header>
      </Reveal>

      {/* Imagen principal */}
      <Reveal delay={0.1}>
        {project.image ? (
          <BrowserFrame
            src={project.image}
            alt={project.title[lang]}
            url={project.links.demo}
          />
        ) : (
          <div className="frame flex aspect-[16/9] flex-col items-center justify-center gap-3 border border-border text-muted">
            <Smartphone className="h-10 w-10 opacity-50" strokeWidth={1.5} />
            <span className="font-mono text-[11px] uppercase tracking-widest">
              {dict.project.status[project.status]}
            </span>
          </div>
        )}
      </Reveal>

      {/* Métricas */}
      {project.metrics && project.metrics.length > 0 && (
        <Reveal>
          <div className="grid grid-cols-3 gap-4 border-y border-border py-6">
            {project.metrics.map((m) => (
              <Metric key={m.label[lang]} value={m.value} label={m.label[lang]} />
            ))}
          </div>
        </Reveal>
      )}

      {/* Contenido + ficha */}
      <Reveal>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-[1fr_220px]">
          <div className="space-y-8">
            <section>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
                {t.overview}
              </h2>
              <p className="text-sm leading-relaxed">{d.overview[lang]}</p>
            </section>
            <section>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
                {t.purpose}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{d.purpose[lang]}</p>
            </section>
            <section>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
                {t.built}
              </h2>
              <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
                {d.built[lang].map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Ficha técnica */}
          <aside className="sm:border-l sm:border-border sm:pl-8">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
              {t.stack}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {d.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </Reveal>

      {/* Galería */}
      {d.gallery && d.gallery.length > 0 && (
        <Reveal>
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              {t.gallery}
            </h2>
            <ProjectGallery
              label={t.fullPage}
              items={d.gallery.map((src) => ({ src, url: project.links.demo }))}
            />
          </section>
        </Reveal>
      )}

      {/* Siguiente proyecto */}
      <Reveal>
        <Link
          href={`/${lang}/trabajo/${next.slug}`}
          className="group flex items-center justify-between gap-4 border-t border-border pt-6"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {t.next}
            </p>
            <p className="mt-1 text-base font-medium tracking-tight transition-colors group-hover:text-accent-strong">
              {next.title[lang]}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent-strong" />
        </Link>
      </Reveal>
    </div>
  );
}
