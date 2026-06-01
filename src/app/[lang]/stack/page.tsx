import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stack, type Level } from "@/data/stack";
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
    title: getDictionary(locale).meta.stack.title,
    alternates: {
      canonical: `/${locale}/stack`,
      languages: { es: "/es/stack", en: "/en/stack" },
    },
  };
}

const levelClass: Record<Level, string> = {
  daily: "text-accent-strong",
  comfortable: "text-fg",
  exploring: "text-muted",
};

export default async function StackPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.stack;

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

      {stack.map((group, gi) => (
        <Reveal key={group.category.en} delay={0.05 * gi}>
          <section>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              {group.category[lang]}
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              {group.items.map((tech) => (
                <li
                  key={tech.name}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-3 sm:grid-cols-[180px_1fr_auto]"
                >
                  <span className="text-sm font-medium">{tech.name}</span>
                  <span className="col-span-2 text-xs text-muted sm:col-span-1 sm:order-2">
                    {tech.note[lang]}
                  </span>
                  <span
                    className={`order-1 font-mono text-[10px] uppercase tracking-wider sm:order-3 ${levelClass[tech.level]}`}
                  >
                    {t.levels[tech.level]}
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
