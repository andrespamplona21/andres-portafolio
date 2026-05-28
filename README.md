# andres.dev — portafolio

Portafolio personal hecho con Next.js 15 (App Router), Tailwind, Motion y TypeScript.

## Features

- Dark/light mode con persistencia
- Animaciones sutiles con Motion (revelado al scrollear)
- Blog en markdown (drop `.md` en `src/content/blog/` y aparece)
- Form de contacto con API route (Resend)
- CV descargable en PDF
- 100% responsive
- SEO básico (metadata, OpenGraph)

## Setup local

```bash
pnpm install      # o npm install
pnpm dev
```

Abre `http://localhost:3000`.

## Personalización rápida

Edita estos archivos:

| Qué cambiar | Archivo |
|---|---|
| Proyectos | `src/data/projects.ts` |
| Stack/tecnologías | `src/data/stack.ts` |
| Textos del hero | `src/app/page.tsx` |
| Posts del blog | `src/content/blog/*.md` |
| CV en PDF | `public/cv/andres-cv.pdf` |
| Colores y tema | `src/app/globals.css` (variables CSS) |
| Links sociales | `src/components/footer.tsx` |
| Metadata SEO | `src/app/layout.tsx` |

## Variables de entorno

Crea `.env.local`:

```
RESEND_API_KEY=re_xxxxx           # opcional, sin esto el form solo loguea
CONTACT_TO=hola@tucorreo.com      # a dónde llega el form
```

Sin `RESEND_API_KEY` el form sigue funcionando en dev — los mensajes se imprimen en consola.

## Deploy

### Vercel (recomendado)

1. Push del repo a GitHub
2. `vercel.com` → Import Project → conecta el repo
3. Añade las env vars en Settings → Environment Variables
4. Deploy automático en cada push

### Alternativas

- **Netlify** — soporta Next.js con su adapter oficial
- **Cloudflare Pages** — con `@cloudflare/next-on-pages`
- **Railway / Render** — si quieres todo en uno con DB

## Dominio

1. Compra el dominio (Namecheap, Cloudflare Registrar, Porkbun)
2. En Vercel → Settings → Domains → añade tu dominio
3. Apunta DNS según las instrucciones (Vercel te da los registros exactos)

## Estructura

```
src/
├── app/
│   ├── api/contact/route.ts    → form handler
│   ├── blog/[slug]/page.tsx    → post individual
│   ├── blog/page.tsx           → lista de posts
│   ├── contacto/page.tsx
│   ├── stack/page.tsx
│   ├── trabajo/page.tsx
│   ├── layout.tsx              → layout raíz con nav/footer
│   ├── page.tsx                → home
│   └── globals.css
├── components/
│   ├── contact-form.tsx
│   ├── footer.tsx
│   ├── nav.tsx
│   ├── project-card.tsx
│   ├── reveal.tsx              → animación de entrada
│   └── theme-provider.tsx      → dark/light sin librería
├── content/blog/*.md           → posts
├── data/
│   ├── projects.ts
│   └── stack.ts
└── lib/blog.ts                 → lector de markdown
```

## Licencia

Hazle lo que quieras.
