# andres.dev — portafolio

Portafolio personal hecho con **Next.js 15** (App Router), **Tailwind**, **Motion** y **TypeScript**.

## Features

- **Bilingüe ES/EN** con rutas por idioma (`/es`, `/en`), detección automática por navegador, switcher y `hreflang`.
- **Páginas de caso de estudio** por proyecto (`/[lang]/trabajo/[slug]`) con galería de capturas.
- Dark/light mode con persistencia, respetando `prefers-reduced-motion`.
- Animaciones sutiles con Motion (revelado al scrollear, count-up en métricas con fallback SSR).
- Blog en markdown bilingüe (`src/content/blog/{es,en}/*.md`).
- Form de contacto con API route (Resend).
- CV descargable/visible en PDF (ES + EN).
- **SEO completo**: Open Graph + imagen 1200×630, Twitter `summary_large_image`, JSON-LD (Person + WebSite), `canonical` y `hreflang` por página.
- Lighthouse local: Performance 97 · Accesibilidad 100 · Best Practices 100 · SEO 100.

## Setup local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` (redirige a `/es`).

```bash
npm run build   # build de producción
npm start       # sirve el build
npm run lint
```

## Variables de entorno

Copia `.env.local.example` a `.env.local` y rellena:

| Variable | Requerida | Para qué sirve |
|---|---|---|
| `RESEND_API_KEY` | No | API key de [Resend](https://resend.com). Sin ella, el form solo loguea en consola (modo dev). |
| `CONTACT_TO` | Sí (en prod) | A dónde llegan los mensajes del formulario. |
| `CONTACT_FROM` | No | Remitente. Por defecto `onboarding@resend.dev` (solo entrega a tu propio correo hasta verificar dominio). |

> `.env.local` está en `.gitignore`: **nunca** se sube al repo. Configura estas variables en Vercel (ver abajo).

## Deploy en Vercel

1. **Sube el repo a GitHub** (ver más abajo si parte de un zip).
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo. Vercel detecta Next.js solo (build `next build`, output automático).
3. **Settings → Environment Variables** → añade, para *Production* (y *Preview* si quieres):
   - `RESEND_API_KEY`
   - `CONTACT_TO`
   - `CONTACT_FROM` (opcional)
4. **Deploy.** Cada `git push` a `main` redepliega automáticamente; cada PR genera un preview.

> El dominio del sitio (para OG, `canonical` y `hreflang`) está fijado en `src/app/[lang]/layout.tsx` como `metadataBase: new URL("https://andres.dev")`. Si despliegas en otro dominio, cámbialo ahí.

### Subir a GitHub por primera vez

```bash
git init
git add .
git commit -m "Portafolio: rediseño, i18n ES/EN, SEO y case studies"
git branch -M main
git remote add origin https://github.com/andrespamplona21/<tu-repo>.git
git push -u origin main
```

### Alternativas de hosting

- **Netlify** — con el adapter oficial de Next.js.
- **Cloudflare Pages** — con `@cloudflare/next-on-pages`.
- **Railway / Render** — si quieres todo en uno con DB.

## Dominio

1. Compra el dominio (Namecheap, Cloudflare Registrar, Porkbun).
2. En Vercel → **Settings → Domains** → añade tu dominio.
3. Apunta el DNS según los registros que te da Vercel.
4. Actualiza `metadataBase` en `src/app/[lang]/layout.tsx` con tu dominio final.

## Personalización rápida

| Qué cambiar | Archivo |
|---|---|
| Proyectos y case studies | `src/data/projects.ts` |
| Stack/tecnologías | `src/data/stack.ts` |
| Textos de la UI (ES/EN) | `src/i18n/dictionaries/es.ts` y `en.ts` |
| Posts del blog | `src/content/blog/{es,en}/*.md` |
| CV en PDF | `public/cv/andres-cv-es.pdf` y `andres-cv-en.pdf` |
| Imágenes de proyectos | `public/projects/` |
| Imagen Open Graph | `src/app/opengraph-image.png` (1200×630) |
| Favicon | `src/app/icon.svg` |
| Colores y tema (tokens OKLCH) | `src/app/globals.css` |
| Metadata, OG, JSON-LD | `src/app/[lang]/layout.tsx` |
| Idiomas soportados | `src/i18n/config.ts` |

## Estructura

```
src/
├── app/
│   ├── [lang]/                 → rutas por idioma (es | en)
│   │   ├── trabajo/[slug]/      → caso de estudio por proyecto
│   │   ├── trabajo/page.tsx     → lista de trabajo
│   │   ├── blog/[slug]/page.tsx → post individual
│   │   ├── blog/page.tsx        → lista de posts
│   │   ├── sobre-mi/page.tsx
│   │   ├── stack/page.tsx
│   │   ├── contacto/page.tsx
│   │   ├── layout.tsx           → layout localizado (nav/footer, metadata, JSON-LD)
│   │   └── page.tsx             → home
│   ├── api/contact/route.ts     → handler del formulario
│   ├── opengraph-image.png      → imagen OG global (1200×630)
│   ├── icon.svg                 → favicon
│   └── globals.css              → tokens OKLCH + estilos base
├── components/                  → nav, footer, project-card, browser-frame, etc.
├── content/blog/{es,en}/*.md    → posts por idioma
├── data/                        → projects.ts, stack.ts
├── i18n/                        → config, diccionarios, getDictionary
├── lib/blog.ts                  → lector de markdown
└── middleware.ts                → detección y redirección de idioma
```

## Licencia

Hazle lo que quieras.
