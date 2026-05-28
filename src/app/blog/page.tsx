import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <Reveal>
        <header>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Blog
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tightest sm:text-4xl">
            Lo que <span className="font-display italic">estoy aprendiendo</span>.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Notas cortas, no ensayos. Cosas que descubrí, fallé, o quiero
            recordar para mí en seis meses.
          </p>
        </header>
      </Reveal>

      <ul className="divide-y divide-border border-y border-border">
        {posts.length === 0 && (
          <li className="py-6 text-sm text-muted">
            Aún no hay posts. Crea archivos `.md` en `src/content/blog/`.
          </li>
        )}
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={0.03 * i}>
            <li>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[80px_1fr] items-baseline gap-4 py-5 sm:grid-cols-[100px_1fr_auto]"
              >
                <time className="font-mono text-xs text-muted">
                  {new Date(post.date).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </time>
                <h2 className="text-base font-medium tracking-tight transition-colors group-hover:text-muted sm:order-2">
                  {post.title}
                </h2>
                <span className="col-span-2 text-xs text-muted sm:col-span-1 sm:order-3">
                  {post.readingTime} min
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
