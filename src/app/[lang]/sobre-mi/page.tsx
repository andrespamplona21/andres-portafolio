import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { CvViewer } from "@/components/cv-viewer";
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
    title: getDictionary(locale).meta.about.title,
    alternates: {
      canonical: `/${locale}/sobre-mi`,
      languages: { es: "/es/sobre-mi", en: "/en/sobre-mi" },
    },
  };
}

function SectionTitle({ index, children }: { index: string; children: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      <span className="font-mono text-xs tabular-nums text-accent-strong">{index}</span>
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
        {children}
      </h2>
      <span className="rule-tick h-px flex-1 translate-y-[-2px]" />
    </div>
  );
}

export default async function SobreMiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.about;

  return (
    <div className="space-y-20">
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
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {t.bio}
          </p>
        </header>
      </Reveal>

      {/* Experiencia */}
      <Reveal>
        <section>
          <SectionTitle index="01">{t.sections.experience}</SectionTitle>
          <div className="divide-y divide-border border-y border-border">
            {t.experience.map((job) => (
              <article
                key={job.org}
                className="grid gap-x-8 gap-y-3 py-6 sm:grid-cols-[160px_1fr]"
              >
                <div>
                  <p className="font-mono text-xs tabular-nums text-muted">
                    {job.period}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">
                    {job.place}
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-medium tracking-tight">
                    {job.role}
                  </h3>
                  <p className="text-sm text-accent-strong">{job.org}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Educación + idiomas */}
      <Reveal>
        <section className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          <div>
            <SectionTitle index="02">{t.sections.education}</SectionTitle>
            <h3 className="text-base font-medium tracking-tight">
              {t.education.degree}
            </h3>
            <p className="text-sm text-muted">{t.education.school}</p>
            <p className="mt-1 font-mono text-xs tabular-nums text-muted">
              {t.education.period}
            </p>
          </div>
          <div>
            <SectionTitle index="03">{t.sections.languages}</SectionTitle>
            <ul className="space-y-3 text-sm">
              <li className="flex items-baseline justify-between gap-4">
                <span className="font-medium">{t.languages.spanish}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  {t.languages.spanishLevel}
                </span>
              </li>
              <li className="flex items-baseline justify-between gap-4">
                <span className="font-medium">{t.languages.english}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-accent-strong">
                  {t.languages.englishLevel}
                </span>
              </li>
            </ul>
          </div>
        </section>
      </Reveal>

      {/* CV */}
      <Reveal>
        <section id="cv">
          <SectionTitle index="04">{t.sections.resume}</SectionTitle>
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted">
            {t.resume.note}
          </p>
          <CvViewer labels={dict.cv} initial={lang} />
        </section>
      </Reveal>
    </div>
  );
}
