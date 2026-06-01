import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
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
    title: getDictionary(locale).meta.blog.title,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { es: "/es/blog", en: "/en/blog" },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.blog;
  const posts = getAllPosts(lang);
  const dateLocale = lang === "es" ? "es-MX" : "en-US";

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

      <ul className="divide-y divide-border border-y border-border">
        {posts.length === 0 && (
          <li className="py-6 text-sm text-muted">{t.empty}</li>
        )}
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={0.03 * i}>
            <li>
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="group grid grid-cols-[80px_1fr] items-baseline gap-4 py-5 sm:grid-cols-[100px_1fr_auto]"
              >
                <time className="font-mono text-xs text-muted">
                  {new Date(post.date).toLocaleDateString(dateLocale, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </time>
                <h2 className="text-base font-medium tracking-tight transition-colors group-hover:text-accent-strong sm:order-2">
                  {post.title}
                </h2>
                <span className="col-span-2 text-xs text-muted sm:col-span-1 sm:order-3">
                  {post.readingTime} {t.min}
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
