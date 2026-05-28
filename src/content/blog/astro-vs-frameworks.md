---
title: "Por qué Astro me arruinó para los frameworks pesados"
date: "2026-05-10"
excerpt: "Tres proyectos después, este es mi take sobre por qué cargo Astro a todos lados."
---

Llevo tres proyectos seguidos usando Astro y noto un patrón: cuando el sitio no necesita estado del lado del cliente en cada página, todo lo demás se siente exagerado.

## Lo que me ganó

El modelo de islas es exactamente el default correcto. Por defecto, **cero JavaScript**. Si una sección necesita interactividad, le pones `client:load` o `client:visible` y solo esa parte se hidrata.

En Next.js termino peleándome con qué es server component y qué es client component. En Astro la frontera es explícita y vive en el HTML.

## Donde sigo prefiriendo Next

Cuando el producto es una **app** — auth, formularios complejos, dashboards con estado compartido — Next.js sigue siendo más cómodo. App Router, server actions, y el ecosistema completo.

## El veredicto rápido

- **Sitio de contenido o portafolio**: Astro.
- **App con sesiones y formularios serios**: Next.
- **Landing one-page sin build**: HTML/CSS/JS vanilla y a la cama.

Y eso es todo. No hay bala de plata.
