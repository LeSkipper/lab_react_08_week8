# Lab 8.2: SSR User Dashboard

**Student:** LeSkipper  
**Date:** 2026-04-17

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

## Project Structure

```
pages/
  dashboard.tsx      # SSR user dashboard (getServerSideProps)
  about.tsx          # SSG about page (getStaticProps)
  about-ssr.tsx      # SSR about page — for direct SSG vs SSR comparison
  _app.tsx           # Pages Router app wrapper
lib/
  api.ts             # User, Notification types + mock data functions
```

## SSR vs SSG Performance Comparison

| Feature | SSG (`/about`) | SSR (`/about-ssr`, `/dashboard`) |
|---------|----------------|----------------------------------|
| When renders | Build time (once) | Every request |
| Data freshness | Fixed at build | Always fresh |
| TTFB | Fastest — served from CDN | Slower — server must render first |
| Server load | Near zero | Scales with traffic |
| Use case | Docs, blog, marketing | Dashboards, auth, real-time |

### How to observe the difference

1. Go to `/about` — note the **build time** timestamp. Refresh 10 times — it never changes. ✅ SSG
2. Go to `/about-ssr` — note the **request time** timestamp. Refresh — it updates every time. ✅ SSR
3. Go to `/dashboard` — analytics numbers randomize each refresh (fresh server data per request).

## Why SSR for the Dashboard

The dashboard displays user-specific data (notifications, analytics) that:
- Differs per user → cannot be shared as static HTML
- Should reflect latest state on every load → `revalidate` ISR is not enough
- Requires server context (session, cookies) → `getServerSideProps` has access to `req`/`res`

SSG would serve the same pre-built page to every user — wrong for personalized content.
