import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/blog";
import { Reveal } from "@/components/reveal";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post?.title ?? "Post" };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="space-y-8">
      <Reveal>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-fg"
        >
          <ArrowLeft className="h-3 w-3" /> volver al blog
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-medium tracking-tightest sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 flex gap-3 text-xs text-muted">
            <time>
              {new Date(post.date).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime} min de lectura</span>
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
