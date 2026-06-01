---
title: "Una imagen de 4.7 MB no tiene por qué pesar 4.7 MB"
date: "2026-05-22"
excerpt: "Bajar un hero de 4.7 MB a 116 KB sin que se note. Notas sobre sharp y por qué redimensionar en el origen."
---

Me pasó otra vez: una foto de stock preciosa, 5472×3648 px, 4.7 MB, metida tal cual en el `hero` de una landing. Se veía igual de bien a 1200 px de ancho y pesaba **116 KB**. La diferencia es ridícula.

## El problema no es la calidad, es el tamaño en disco

Los optimizadores en tiempo de build (como `next/image`) sirven la versión correcta al navegador, pero el archivo original sigue viviendo en tu repo. Subir imágenes de 5 MB al control de versiones es deuda que pagas para siempre.

La regla que sigo ahora: **redimensiona en el origen**, antes de comprometer la imagen.

## sharp en cuatro líneas

```js
import sharp from "sharp";

await sharp("hero-original.jpg")
  .resize({ width: 1200, height: 750, fit: "cover", position: "centre" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile("hero.jpg");
```

`fit: "cover"` recorta al encuadre que pediste en lugar de deformar. `mozjpeg: true` exprime unos KB extra sin pérdida visible. Calidad 80 es el punto dulce: por encima casi no se nota, por debajo empiezan los artefactos.

## Lo que aprendí

- Define un ancho máximo según dónde se muestra la imagen. Un thumbnail de tarjeta no necesita 4K.
- 16:10 o 16:9 con `cover` te ahorra pelearte con aspect ratios distintos entre fotos.
- Un script de un archivo que recorre tus assets es más rápido que abrir Photoshop una vez.

No es glamoroso, pero es de las cosas que más mejoran un Lighthouse sin tocar una línea de lógica.
