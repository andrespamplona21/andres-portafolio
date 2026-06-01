"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/es";

export function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? t.errMsg);
      }
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.errMsg);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.name}
          </span>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            placeholder={t.namePh}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors placeholder:text-muted focus:border-fg focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.email}
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder={t.emailPh}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors placeholder:text-muted focus:border-fg focus:outline-none"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
          {t.message}
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder={t.messagePh}
          className="w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors placeholder:text-muted focus:border-fg focus:outline-none"
        />
      </label>

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-shine inline-flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm text-bg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        >
          {status === "loading" ? (
            t.sending
          ) : status === "ok" ? (
            <>
              <Check className="h-4 w-4" /> {t.sent}
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" /> {t.send}
            </>
          )}
        </button>

        {status === "error" && (
          <p className="text-xs text-danger">{error}</p>
        )}
        {status === "ok" && (
          <p className="text-xs text-success">{t.okMsg}</p>
        )}
      </div>
    </form>
  );
}
