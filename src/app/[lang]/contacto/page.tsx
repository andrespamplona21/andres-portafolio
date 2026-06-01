import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Mail, MapPin } from "lucide-react";
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
    title: getDictionary(locale).meta.contact.title,
    alternates: {
      canonical: `/${locale}/contacto`,
      languages: { es: "/es/contacto", en: "/en/contacto" },
    },
  };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.contact;

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

      <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
        <Reveal delay={0.05}>
          <ContactForm t={t.form} />
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-4 border-t border-border pt-6 text-sm sm:w-48 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                {t.aside.emailLabel}
              </p>
              <a
                href="mailto:andrespamplonao@gmail.com"
                className="inline-flex items-center gap-1 hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                andrespamplonao@gmail.com
              </a>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                {t.aside.tzLabel}
              </p>
              <p className="inline-flex items-center gap-1 text-muted">
                <MapPin className="h-3.5 w-3.5" />
                {t.aside.tzValue}
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
