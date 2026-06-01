"use client";

import { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";

type Lang = "es" | "en";

const files: Record<Lang, { label: string; href: string; file: string }> = {
  es: { label: "Español", href: "/cv/andres-cv-es.pdf", file: "andres-cv-es.pdf" },
  en: { label: "English", href: "/cv/andres-cv-en.pdf", file: "andres-cv-en.pdf" },
};

export function CvViewer({
  labels,
  initial = "es",
}: {
  labels: { open: string; download: string };
  initial?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initial);
  const active = files[lang];

  return (
    <div className="frame overflow-hidden border border-border">
      {/* Barra: pestañas de idioma + acciones */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-bg/60 px-3 py-2">
        <div className="flex rounded-md border border-border bg-surface p-0.5">
          {(Object.keys(files) as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
                lang === l
                  ? "bg-accent text-accent-fg"
                  : "text-muted hover:text-fg"
              }`}
            >
              {files[l].label}
            </button>
          ))}
        </div>

        <span className="ml-auto flex items-center gap-4 text-xs">
          <a
            href={active.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            {labels.open} <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href={active.href}
            download={active.file}
            className="inline-flex items-center gap-1 text-accent-strong underline-offset-4 hover:underline"
          >
            <Download className="h-3 w-3" /> {labels.download}
          </a>
        </span>
      </div>

      {/* Vista previa embebida del PDF */}
      <iframe
        key={lang}
        src={`${active.href}#view=FitH`}
        title={`CV de Andres Pamplona (${active.label})`}
        className="h-[560px] w-full bg-surface"
      />
    </div>
  );
}
