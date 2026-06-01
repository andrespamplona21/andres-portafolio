import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Locale } from "@/i18n/config";

const BLOG_ROOT = path.join(process.cwd(), "src/content/blog");
const dirFor = (lang: Locale) => path.join(BLOG_ROOT, lang);

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  readingTime: number;
  content?: string;
};

export function getAllPosts(lang: Locale): Post[] {
  const dir = dirFor(lang);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const words = content.split(/\s+/).length;
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      excerpt: data.excerpt,
      readingTime: Math.max(1, Math.round(words / 220)),
    } as Post;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(lang: Locale, slug: string): Promise<Post | null> {
  const filePath = path.join(dirFor(lang), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  const words = content.split(/\s+/).length;
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? new Date().toISOString(),
    excerpt: data.excerpt,
    readingTime: Math.max(1, Math.round(words / 220)),
    content: processed.toString(),
  };
}
