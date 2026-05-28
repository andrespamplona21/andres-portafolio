import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andres.dev"),
  title: {
    default: "Andres Pamplona — Desarrollador de software",
    template: "%s · Andres Pamplona",
  },
  description:
    "Portafolio de Andres Pamplona. Construyo interfaces web rápidas y APIs limpias con Astro, Next.js, Supabase y Tailwind.",
  openGraph: {
    title: "Andres Pamplona — Desarrollador de software",
    description:
      "Portafolio de Andres Pamplona. Interfaces web rápidas y APIs limpias.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <Nav />
          <main className="mx-auto w-full max-w-3xl px-6 pt-24 pb-16 sm:pt-32">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
