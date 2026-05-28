import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <div className="space-y-12">
      <Reveal>
        <header>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Contacto
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tightest sm:text-4xl">
            Hablemos de <span className="font-display italic">tu proyecto</span>.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Respondo en menos de 24 horas. Si es un freelance, te pido
            contexto rápido del proyecto, presupuesto y deadline. Si es por
            curiosidad, también está bien.
          </p>
        </header>
      </Reveal>

      <div className="grid gap-10 sm:grid-cols-[1fr_auto]">
        <Reveal delay={0.05}>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-4 border-t border-border pt-6 text-sm sm:w-48 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                Email
              </p>
              <a
                href="mailto:andrespamplonao@gmail.com"
                className="inline-flex items-center gap-1 hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                andrespamplonao@gmail.com
              </a>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                Zona horaria
              </p>
              <p className="inline-flex items-center gap-1 text-muted">
                <MapPin className="h-3.5 w-3.5" />
                Ciudad de México (GMT-6)
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
