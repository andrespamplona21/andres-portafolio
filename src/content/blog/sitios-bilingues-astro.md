---
title: "Sitios bilingües en Astro sin perder la cabeza"
date: "2026-04-30"
excerpt: "ES/EN en proyectos de cliente reales: rutas, contenido y el switcher. Lo que funcionó y lo que evitaría."
---

Varios de mis proyectos de cliente atienden a público en español e inglés a la vez — clínicas y servicios en EE. UU. con audiencia latina. El bilingüe no es un extra: es el requisito.

## La decisión que importa: ¿una URL o dos?

Opté por **rutas separadas** (`/es/...` y `/en/...`) en lugar de cambiar el idioma con JavaScript en la misma URL. Razones:

- Cada idioma tiene su propia URL indexable. Google las trata como páginas distintas.
- Puedes poner `hreflang` y que cada versión apunte a su par.
- No hay parpadeo: el contenido correcto llega ya renderizado en el HTML.

## Contenido fuera del componente

El error que cometí al principio fue meter los textos dentro del JSX. Cuando el cliente pide cambiar una frase, tienes que ir a cazarla entre el markup.

Ahora el contenido vive en archivos de datos por idioma. El componente solo recibe el objeto del idioma activo y pinta. Cambiar una palabra es editar un dato, no tocar la vista.

## El switcher que no rompe

El detalle fácil de olvidar: al cambiar de idioma, el usuario espera quedarse en **la misma página**, no volver al inicio. El switcher tiene que mapear la ruta actual a su equivalente en el otro idioma, no apuntar siempre a `/en`.

## Lo que evitaría

- No traduzcas con un `if (lang === "es")` regado por todo el código. Centraliza.
- No dependas de la geolocalización para elegir idioma sin dar opción de cambiarlo. Adivinar molesta.

Astro hace esto cómodo porque las páginas son estáticas por defecto y el routing por carpetas calza natural con `/es` y `/en`.
