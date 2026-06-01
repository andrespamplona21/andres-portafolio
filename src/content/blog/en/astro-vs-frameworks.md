---
title: "Why Astro ruined me for heavy frameworks"
date: "2026-05-10"
excerpt: "Three projects in, here's my take on why I bring Astro everywhere."
---

I've used Astro on three projects in a row and I notice a pattern: when a site doesn't need client-side state on every page, everything else feels like overkill.

## What won me over

The islands model is exactly the right default. By default, **zero JavaScript**. If a section needs interactivity, you add `client:load` or `client:visible` and only that part hydrates.

In Next.js I end up fighting over what is a server component and what is a client component. In Astro the boundary is explicit and lives in the HTML.

## Where I still prefer Next

When the product is an **app**, auth, complex forms, dashboards with shared state, Next.js is still more comfortable. App Router, server actions, and the full ecosystem.

## The quick verdict

- **Content site or portfolio**: Astro.
- **App with sessions and serious forms**: Next.
- **One-page landing with no build**: vanilla HTML/CSS/JS and off to bed.

And that's it. There's no silver bullet.
