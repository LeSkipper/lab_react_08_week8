# Lab 8.1: Next.js Blog with SSR and SSG

**Student:** LeSkipper  
**Date:** 2026-04-17

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
pages/
  index.tsx          # SSG home page with ISR (revalidate: 60s)
  posts/[id].tsx     # Dynamic SSG post pages with ISR
  _app.tsx           # Pages Router app wrapper
types/
  index.ts           # Post and Author TypeScript interfaces
lib/
  api.ts             # Mock data and async fetch functions
```

## SSR vs SSG Differences

| Feature | SSR (getServerSideProps) | SSG (getStaticProps) |
|---------|--------------------------|----------------------|
| When renders | Every request | Build time |
| Data freshness | Always fresh | Stale until rebuild (or ISR interval) |
| TTFB | Slower (server work per request) | Fastest (pre-rendered HTML) |
| Server load | High (every request hits server) | Low (CDN serves static files) |
| Use case | User dashboards, auth pages | Blog posts, docs, marketing |

## Rendering Strategy Used

- **`/` (Home page):** `getStaticProps` with `revalidate: 60` — SSG + ISR.  
  Pre-built at build time, regenerates in background every 60 seconds on new request.

- **`/posts/[id]` (Post pages):** `getStaticPaths` + `getStaticProps` with `revalidate: 60` — dynamic SSG + ISR.  
  All 3 post paths pre-built at build time. `fallback: "blocking"` handles new posts added later.

## Why ISR Here

Blog posts don't change per-user (no SSR needed), but should stay reasonably fresh. ISR gives static performance with periodic refresh — best fit for blog content.
