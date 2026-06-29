# Vakanza — Automated Social Media for Vacation Rental Hosts

> **Spar tid. Få flere bookinger. Præsenter din bolig professionelt — helt automatisk.**

Vakanza er en dansk SaaS-platform bygget til udlejere af feriehuse, sommerhuse og ferielejligheder. Platformen kombinerer AI-drevet indholdsproduktion, automatisk planlægning og social media-distribution i ét samlet værktøj — så udlejere kan fokusere på gæsterne frem for markedsføringen.

---

## Konceptet

De fleste udlejere ved godt, at synlighed på sociale medier driver bookinger. Problemet er tid og kompetencer: at producere professionelle opslag, holde kanalerne aktive og holde trit med algoritmer kræver ressourcer, som de fleste feriehusejere ikke har.

**Vakanza løser det i tre trin:**

1. **Tilslut** dine sociale kanaler (Facebook, Instagram, TikTok, LinkedIn, YouTube, Snapchat) og registrer din udlejningsbolig
2. **Generer** AI-producerede præsentationsvideoer og opslag direkte fra dine billeder og booking-link
3. **Publicer og planlæg** indhold automatisk på tværs af alle kanaler — med ét klik

Resultatet: Professionel, konsekvent tilstedeværelse på sociale medier uden daglig indsats.

---

## Nøglefunktioner

| Funktion | Beskrivelse |
|---|---|
| 🎬 **AI-præsentationsvideoer** | Cinematiske property-videoer genereret fra dine billeder på under 15 minutter |
| 📱 **Multi-kanal publicering** | Del på Facebook (side + grupper), Instagram, TikTok, LinkedIn og YouTube fra ét sted |
| 🏠 **Boligstyring** | Administrer flere udlejningsobjekter med billeder, beskrivelser og booking-links |
| 📅 **Indholdsplanlægning** | Planlæg og automatiser opslag på tværs af platforme |
| 🔗 **Booking-integration** | Hent billeder og beskrivelse direkte fra Airbnb, Booking.com og VRBO via URL |
| 📊 **Analytics** | Følg performance på tværs af kanaler og bookingforespørgsler |
| 🌍 **Dansk + Engelsk** | Fuld i18n med automatisk sprogdetektering baseret på browser-sprog |
| 👤 **Admin dashboard** | Realtidsoverblik over alle brugere, opslag og platformaktivitet |

---

## Tech stack

| Lag | Teknologi |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) App Router + TypeScript |
| Styling | TailwindCSS v4 |
| Database & Auth | [Supabase](https://supabase.com) (Postgres + Row Level Security) |
| AI Video | Higgsfield AI (v2 API) |
| Deployment | Vercel (Edge + Cron) |
| Storage | Supabase Storage + CloudFront CDN |

---

## Kom i gang

```bash
npm install
cp .env.example .env.local   # Udfyld dine miljøvariabler (se nedenfor)
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000).

### Påkrævede miljøvariabler

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=

# Facebook OAuth
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=

# Google Analytics OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Higgsfield AI (video generation)
HIGGSFIELD_API_KEY_ID=
HIGGSFIELD_API_SECRET=
```

---

## Projektstruktur

```
src/
  app/
    (app)/          Autentificeret app-shell (sidebar-layout)
      dashboard/    Brugerdashboard
      videos/       AI-video bestilling og visning
      properties/   Boligstyring
      posts/        Opslags-planlægger
      accounts/     Social media kanaltilslutning
      analytics/    Performance-oversigt
      billing/      Abonnementsstyring
    admin/          Admin-dashboard (kun for administratorer)
    en/             Engelsk landing page (/en)
    api/            Route handlers (OAuth, webhooks, video-status)
  components/
    layout/         Sidebar, Topbar (mobil + desktop)
  lib/
    supabase/       Browser / server / admin Supabase-klienter
    higgsfield.ts   AI video-generering og statushåndtering
  services/         Datahentning og forretningslogik
  types/            Delte TypeScript-typer
```

---

## Admin

Admin-dashboardet er tilgængeligt på `/admin` og kræver en godkendt admin-email. Det giver realtidsindsigt i:
- Antal brugere og nye tilmeldinger
- Opslag pr. bruger og platform
- Video- og boligstatistik
- Kanalfordeling pr. platform

---

*Vakanza — Gør din bolig uimodståelig.*
