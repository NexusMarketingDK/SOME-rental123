# Vakanza — Social media platform for vacation rentals

A Buffer-like SaaS for vacation rental hosts: connect social accounts,
manage properties, generate AI posts, and schedule them — all in one
place.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- TailwindCSS v4
- [Supabase](https://supabase.com) (Auth, Postgres, Storage)
- Vercel (deployment + cron)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/            App Router routes
    (app)/        Authenticated app shell (sidebar layout)
      dashboard/
  components/
    layout/        Sidebar, Topbar
    ui/             Reusable UI primitives (StatCard, EmptyState, ...)
  lib/
    supabase/       Browser / server / middleware Supabase clients
  modules/          Feature config (e.g. navigation.ts)
  services/         Data-access / business logic (populated in later steps)
  types/            Shared TypeScript types
```

## Build status

- [x] **Step 1** — Project setup, Tailwind, Supabase clients, folder
      structure, sidebar app shell, dashboard placeholder
- [x] **Step 2** — Auth system (signup, login, logout, session handling, protected routes)
- [x] **Step 3** — Database schema (properties, property_images, social_accounts, posts, post_distributions, calendar_integrations, calendar_events)
- [x] **Step 4** — Properties module (list, create, edit, delete)
- [ ] Step 5 — Image upload
- [x] **Step 6** — Social accounts (Facebook + LinkedIn, connected accounts model)
- [x] **Step 7** — Posts system (list, create, schedule, distribute to accounts)
- [ ] Step 8 — AI content generation
- [ ] Step 9 — Calendar sync (read-only)
- [ ] Step 10 — Scheduler system
- [ ] Step 11 — Auto repost system
- [ ] Step 12 — Dashboard
- [ ] Step 13 — Architecture cleanup
