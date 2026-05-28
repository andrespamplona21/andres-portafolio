import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  readingTime: number;
  content?: string;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
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

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
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
