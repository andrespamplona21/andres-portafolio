---
title: "Bilingual sites in Astro without losing your mind"
date: "2026-04-30"
excerpt: "ES/EN on real client projects: routes, content, and the switcher. What worked and what I'd avoid."
---

Several of my client projects serve a Spanish and English audience at the same time, US clinics and services with a Latino audience. Bilingual isn't an extra: it's the requirement.

## The decision that matters: one URL or two?

I went with **separate routes** (`/es/...` and `/en/...`) instead of switching the language with JavaScript on the same URL. Reasons:

- Each language has its own indexable URL. Google treats them as distinct pages.
- You can add `hreflang` so each version points to its pair.
- No flicker: the right content arrives already rendered in the HTML.

## Content outside the component

The mistake I made early on was putting the copy inside the JSX. When the client asks to change a sentence, you have to go hunt it down in the markup.

Now the content lives in per-language data files. The component just receives the active language object and renders. Changing a word is editing data, not touching the view.

## The switcher that doesn't break

The easy-to-forget detail: when switching language, the user expects to stay on **the same page**, not get sent back home. The switcher has to map the current route to its equivalent in the other language, not always point at `/en`.

## What I'd avoid

- Don't translate with an `if (lang === "es")` sprinkled across the code. Centralize it.
- Don't rely on geolocation to pick the language without offering a way to change it. Guessing annoys people.

Astro makes this comfortable because pages are static by default and folder-based routing maps naturally to `/es` and `/en`.
