"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

export function ContactForm() {
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
        throw new Error(data.error ?? "Error enviando el mensaje.");
      }
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
            Nombre
          </span>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            placeholder="Cómo te llamas"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors placeholder:text-subtle focus:border-fg focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder="tu@correo.com"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors placeholder:text-subtle focus:border-fg focus:outline-none"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted">
          Mensaje
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder="Cuéntame qué tienes en mente..."
          className="w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors placeholder:text-subtle focus:border-fg focus:outline-none"
        />
      </label>

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-shine inline-flex items-center gap-1.5 rounded-md bg-fg px-4 py-2 text-sm text-bg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        >
          {status === "loading" ? (
            "Enviando..."
          ) : status === "ok" ? (
            <>
              <Check className="h-4 w-4" /> Enviado
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" /> Enviar
            </>
          )}
        </button>

        {status === "error" && (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
        {status === "ok" && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Gracias, te contesto pronto.
          </p>
        )}
      </div>
    </form>
  );
}
