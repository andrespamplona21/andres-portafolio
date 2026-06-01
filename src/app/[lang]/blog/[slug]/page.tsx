import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/blog";
import { Reveal } from "@/components/reveal";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllPosts(lang).map((p) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const post = await getPost(locale, slug);
  return {
    title: post?.title ?? "Post",
    description: post?.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: { es: `/es/blog/${slug}`, en: `/en/blog/${slug}` },
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const post = await getPost(lang, slug);
  if (!post) notFound();

  const dateLocale = lang === "es" ? "es-MX" : "en-US";

  return (
    <article className="space-y-8">
      <Reveal>
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-fg"
        >
          <ArrowLeft className="h-3 w-3" /> {dict.post.back}
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-medium tracking-tightest sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 flex gap-3 text-xs text-muted">
            <time>
              {new Date(post.date).toLocaleDateString(dateLocale, {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </time>
            <span>·</span>
            <span>
              {post.readingTime} {dict.post.readingSuffix}
            </span>
          </div>
        </header>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />
      </Reveal>
    </article>
  );
}
