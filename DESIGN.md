# DESIGN.md — andres.dev

Sistema de diseño del portafolio. Registro **brand** (el diseño *es* el producto).

## Identidad

**"Cuaderno de ingeniería en papel cálido."** Le da la vuelta a los dos clichés del
portafolio de dev (terminal oscura / serif en itálica) hacia algo cálido y propio:
papel + tinta + un bermellón como color de firma, y la monoespaciada como motivo
estructural (índices `01`, números, barras de URL, etiquetas).

## Color (OKLCH, estrategia comprometida)

El bermellón `--accent` es estructural, no decorativo: vive en el acento del titular,
los marcadores de sección, los estados activos, los enlaces y el panel de cierre
(bloque de color completo). Neutros tintados hacia un hue cálido (~55-75).

Tokens en `src/app/globals.css` (`:root` claro / `.dark` oscuro). Se consumen en
Tailwind como `bg`, `surface`, `fg`, `muted`, `subtle`, `border`, `accent`,
`accent-strong` (texto pequeño sobre papel), `accent-fg` (texto sobre relleno).

- Claro: papel `oklch(0.98 0.006 75)`, tinta `0.23 0.018 55`, bermellón `0.58 0.176 33`.
- Oscuro: tinta cálida `0.185 0.01 55`, bermellón `0.67 0.17 35`.

Nunca `#000`/`#fff`. Selección y foco usan el acento.

## Tema

Claro por defecto: el portafolio se evalúa de día, en 20 segundos, decidiendo si Andres
es confiable. El papel cálido transmite calidez y separa del cliché dark-mode. Oscuro
como alterno respetuoso (toggle con persistencia + `prefers-color-scheme`).

## Tipografía

- Geist Sans: cuerpo, UI y titulares (peso/escala para jerarquía, `tracking-tightest`).
- Geist Mono: motivo estructural (índices, métricas, niveles, barras de URL, firma).
- Sin fuente serif: la itálica de acento era el cliché; el énfasis ahora es por color.

## Motion (refinado y sutil)

- `Reveal`: entrada al scroll con `ease-out` exponencial `[0.22, 1, 0.36, 1]`.
- `Metric`: count-up al entrar en viewport.
- Marco de navegador: profundidad en capas + lift y zoom suave de la captura al hover
  (solo `transform`/`box-shadow`, nunca propiedades de layout).
- `prefers-reduced-motion` desactiva transiciones y scroll suave.

## Componentes clave

- `browser-frame.tsx`: monta un screenshot en una ventana con semáforo y URL real.
- `project-card.tsx`: marco + meta en mono (índice, estado, año), métricas, tags, enlaces.
- `motion-button.tsx`: `primary` (relleno bermellón), `ghost`, `inverse` (sobre color).
- `nav.tsx`: indicador activo = línea bermellón animada con `layoutId`.

## Bans respetados

Sin gradient-text, sin glassmorphism por defecto, sin franjas laterales de color en
tarjetas, sin em dashes en el copy.
