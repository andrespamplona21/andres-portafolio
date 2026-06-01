import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/es";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mx-auto w-full max-w-3xl border-t border-border/60 px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Andres Pamplona. {dict.footer.madeWith}
        </p>
        <div className="flex gap-1">
          <Link
            href="https://github.com/andrespamplona21"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-fg"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href="https://linkedin.com/in/andrespamplona"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-fg"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href="mailto:andrespamplonao@gmail.com"
            className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-fg"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
