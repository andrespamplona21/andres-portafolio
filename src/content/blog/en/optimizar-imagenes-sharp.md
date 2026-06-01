---
title: "A 4.7 MB image doesn't have to weigh 4.7 MB"
date: "2026-05-22"
excerpt: "Dropping a hero from 4.7 MB to 116 KB without anyone noticing. Notes on sharp and why you resize at the source."
---

It happened again: a gorgeous stock photo, 5472×3648 px, 4.7 MB, dropped straight into a landing page `hero`. It looked just as good at 1200 px wide and weighed **116 KB**. The difference is ridiculous.

## The problem isn't quality, it's the size on disk

Build-time optimizers (like `next/image`) serve the right version to the browser, but the original file still lives in your repo. Committing 5 MB images to version control is debt you pay forever.

The rule I follow now: **resize at the source**, before you commit the image.

## sharp in four lines

```js
import sharp from "sharp";

await sharp("hero-original.jpg")
  .resize({ width: 1200, height: 750, fit: "cover", position: "centre" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile("hero.jpg");
```

`fit: "cover"` crops to the frame you asked for instead of distorting. `mozjpeg: true` squeezes out a few extra KB with no visible loss. Quality 80 is the sweet spot: above it you barely notice, below it the artifacts start.

## What I learned

- Set a max width based on where the image is shown. A card thumbnail doesn't need 4K.
- 16:10 or 16:9 with `cover` saves you from fighting different aspect ratios across photos.
- A one-file script that walks your assets is faster than opening Photoshop even once.

It's not glamorous, but it's one of the things that improves a Lighthouse score the most without touching a line of logic.
