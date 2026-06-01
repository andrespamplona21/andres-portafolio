import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL("https://andres.dev"),
    title: {
      default: dict.meta.home.title,
      template: "%s · Andres Pamplona",
    },
    description: dict.meta.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "Andres Pamplona",
      url: `/${locale}`,
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      locale: locale === "es" ? "es_MX" : "en_US",
      // og:image lo aporta automáticamente src/app/opengraph-image.png (1200x630)
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const site = "https://andres.dev";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site}/#person`,
        name: "Andres Pamplona",
        url: `${site}/${lang}`,
        jobTitle: lang === "es" ? "Desarrollador de software" : "Software developer",
        email: "andrespamplonao@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Guadalajara",
          addressRegion: "Jalisco",
          addressCountry: "MX",
        },
        knowsLanguage: ["es", "en"],
        sameAs: [
          "https://github.com/andrespamplona21",
          "https://linkedin.com/in/andrespamplona",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: `${site}/${lang}`,
        name: "Andres Pamplona",
        description: dict.meta.home.description,
        inLanguage: lang === "es" ? "es-MX" : "en-US",
        author: { "@id": `${site}/#person` },
        publisher: { "@id": `${site}/#person` },
      },
    ],
  };

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Nav lang={lang} dict={dict} />
          <main className="mx-auto w-full max-w-3xl px-6 pt-24 pb-16 sm:pt-32">
            {children}
          </main>
          <Footer dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
