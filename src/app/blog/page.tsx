import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Video, Home, Building, Hotel, Megaphone } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CinematicWalkthrough } from "@/components/walkthrough/cinematic-walkthrough";

export const metadata: Metadata = {
  title: "Blog & guides — SOME VIDEO POST | AI-video og sociale medier til udlejere",
  description:
    "Guides om AI-genererede præsentationsvideoer, sociale medier og markedsføring af ferieboliger. Lær hvordan somevideopost.com hjælper udlejere med at få flere bookinger.",
  keywords:
    "feriebolig markedsføring, AI video guide, sociale medier udlejning, præsentationsvideo bolig, somevideopost blog",
  alternates: { canonical: "https://www.somevideopost.com/blog" },
  openGraph: {
    title: "Blog & guides — SOME VIDEO POST",
    description:
      "Guides om AI-genererede præsentationsvideoer, sociale medier og markedsføring af ferieboliger.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com/blog",
  },
};

// ── Blog data ──────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "feriebolig",
    label: "Feriebolig",
    icon: Home,
    color: "#FF6B4A",
    bg: "bg-orange-50",
    border: "border-orange-200",
    iconBg: "bg-orange-100",
    description: "Tips og tricks til din feriebolig",
  },
  {
    id: "privat-udlejning",
    label: "Privat udlejning",
    icon: Building,
    color: "#1B3F7A",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    description: "Råd til private udlejere",
  },
  {
    id: "hotel",
    label: "Hotel & Overnatning",
    icon: Hotel,
    color: "#0A66C2",
    bg: "bg-sky-50",
    border: "border-sky-200",
    iconBg: "bg-sky-100",
    description: "Marketing for hoteller og B&B",
  },
  {
    id: "some-opslag",
    label: "SOME Opslag",
    icon: Megaphone,
    color: "#7C3AED",
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
    description: "AI-genererede sociale medie-opslag",
    tag: "SOME POST",
  },
  {
    id: "video-marketing",
    label: "Video Marketing",
    icon: Video,
    color: "#059669",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    description: "Præsentationsvideoer med AI",
    tag: "VIDEO GEN",
  },
];

const POSTS = [
  // ── Feriebolig ──
  {
    id: 1,
    category: "feriebolig",
    title: "5 ting gæster kigger efter i en feriebolig-annonce",
    excerpt: "Billeder, beliggenhed, anmeldelser og pris er de fire første ting en potentiel gæst vurderer. Den femte overrasker de fleste udlejere.",
    readTime: "4 min",
    date: "2026-05-18",
  },
  {
    id: 2,
    category: "feriebolig",
    title: "Sådan prissætter du din feriebolig til højsæson",
    excerpt: "Dynamisk prissætning kan øge din omsætning med op til 40 %. Her er en simpel model du kan implementere uden dyrt software.",
    readTime: "6 min",
    date: "2025-07-03",
  },
  {
    id: 3,
    category: "feriebolig",
    title: "De bedste platforme til udlejning af feriebolig i 2024",
    excerpt: "Airbnb, Booking.com, VRBO eller Novasol — vi gennemgår fordele og ulemper ved hver platform og hvilke typer boliger de egner sig til.",
    readTime: "8 min",
    date: "2024-04-11",
  },
  {
    id: 4,
    category: "feriebolig",
    title: "Hvad du skal vide om skat ved udlejning af din feriebolig",
    excerpt: "Bundfradrag, lejeindtægt og hvornår du skal momsregistreres. En praktisk guide til ferieboligudlejers skatteregler i Danmark.",
    readTime: "7 min",
    date: "2023-09-28",
  },

  // ── Privat udlejning ──
  {
    id: 5,
    category: "privat-udlejning",
    title: "Lejekontrakt til privat udlejning: hvad skal den indeholde?",
    excerpt: "En gyldig lejekontrakt beskytter både dig og din lejer. Her er de 8 punkter der altid skal med — og de 3 fejl de fleste laver.",
    readTime: "5 min",
    date: "2026-03-14",
  },
  {
    id: 6,
    category: "privat-udlejning",
    title: "Sådan finder du de rigtige lejere til din bolig",
    excerpt: "Fra opslag til fremvisning og screening — en trin-for-trin guide til at finde pålidelige lejere der passer på din bolig.",
    readTime: "6 min",
    date: "2025-02-20",
  },
  {
    id: 7,
    category: "privat-udlejning",
    title: "Huslejens størrelse: hvad må du opkræve?",
    excerpt: "Lejeloven sætter grænser for huslejen i visse ejendomme. Lær forskellen på fri lejefastsættelse og omkostningsbestemt leje.",
    readTime: "5 min",
    date: "2024-08-07",
  },
  {
    id: 8,
    category: "privat-udlejning",
    title: "Vedligeholdelse af udlejningsbolig: udlejerens pligter",
    excerpt: "Hvem betaler hvad? En klar opdeling af udlejers og lejers vedligeholdelsespligt — og hvad du risikerer hvis du forsømmer den.",
    readTime: "4 min",
    date: "2023-11-15",
  },

  // ── Hotel ──
  {
    id: 9,
    category: "hotel",
    title: "Direkte bookinger vs. OTA: sådan vinder du som lille hotel",
    excerpt: "Booking.com og Expedia tager 15-25 % i provision. Her er strategierne der hjælper uafhængige hoteller med at vinde direkte bookinger.",
    readTime: "7 min",
    date: "2026-04-02",
  },
  {
    id: 10,
    category: "hotel",
    title: "Social proof der virker: anmeldelser og UGC for hotellet",
    excerpt: "Gæsters billeder og anmeldelser er det mest effektive marketingmateriale du har. Sådan indsamler og bruger du dem strategisk.",
    readTime: "5 min",
    date: "2025-10-22",
  },
  {
    id: 11,
    category: "hotel",
    title: "Sæsonudjævning: sådan fylder du hotellet i lavsæson",
    excerpt: "Pakketilbud, lokale partnerskaber og målrettet annoncering er nøglerne til at skabe omsætning hele året — ikke kun i højsæson.",
    readTime: "6 min",
    date: "2024-12-05",
  },
  {
    id: 12,
    category: "hotel",
    title: "Instagram og Facebook for hoteller: hvad virker i dag?",
    excerpt: "Algoritmerne ændrer sig konstant. Vi dykker ned i hvad der faktisk skaber organisk rækkevidde og bookinger fra sociale medier i dag.",
    readTime: "6 min",
    date: "2023-06-19",
  },

  // ── SOME Opslag ──
  {
    id: 13,
    category: "some-opslag",
    title: "Hvorfor AI-genererede opslag konverterer bedre end manuelt skrevne",
    excerpt: "AI analyserer annoncens data og skriver tekst der er optimeret til platformen — med den rette tone, længde og hashtags. Her er tallene der beviser det.",
    readTime: "4 min",
    date: "2026-06-10",
    type: "SOME POST",
  },
  {
    id: 14,
    category: "some-opslag",
    title: "Facebook vs. LinkedIn vs. Instagram: hvilken platform til din bolig?",
    excerpt: "Hver platform har sin tone. Facebook elsker emojis og lokal stemning. LinkedIn vil have professionel investorhistorie. Instagram kræver visuelt fokus og hashtags.",
    readTime: "5 min",
    date: "2025-05-08",
    type: "SOME POST",
  },
  {
    id: 15,
    category: "some-opslag",
    title: "Fra boliglink til færdigt opslag på 30 sekunder",
    excerpt: "Indsæt linket til din Airbnb- eller Booking.com-annonce — AI henter billeder, pris, placering og størrelse og skriver et sælgende opslag til alle platforme.",
    readTime: "3 min",
    date: "2024-11-17",
    type: "SOME POST",
  },
  {
    id: 16,
    category: "some-opslag",
    title: "Hvornår på dagen skal du poste din boligannonce?",
    excerpt: "Tidspunktet kan betyde op til 3x mere rækkevidde. Vi gennemgår de bedste tidspunkter for Facebook, Instagram og LinkedIn baseret på aktuelle data.",
    readTime: "4 min",
    date: "2023-08-30",
    type: "SOME POST",
  },

  // ── Video Marketing ──
  {
    id: 17,
    category: "video-marketing",
    title: "Præsentationsvideoer øger bookinger med op til 80 %",
    excerpt: "Boliger med video i annoncen ses markant længere og har højere klikrate. AI-genererede præsentationsvideoer giver nu alle udlejere adgang til dette format.",
    readTime: "5 min",
    date: "2026-06-25",
    type: "VIDEO GEN",
  },
  {
    id: 18,
    category: "video-marketing",
    title: "Cinematisk video af din bolig: fra billeder til færdig film på 15 min",
    excerpt: "Upload dine boligfotos — AI tilføjer professionelle kamerabevægelser, flydende overgange og musik. Videoen leveres direkte i appen klar til deling.",
    readTime: "4 min",
    date: "2025-09-01",
    type: "VIDEO GEN",
  },
  {
    id: 19,
    category: "video-marketing",
    title: "Del din boligvideo på Facebook, Instagram og YouTube",
    excerpt: "Ét klik deler din præsentationsvideo til alle platforme. Vi viser dig hvordan du optimerer videoen til hvert format og maksimerer din organiske rækkevidde.",
    readTime: "5 min",
    date: "2024-03-14",
    type: "VIDEO GEN",
  },
  {
    id: 20,
    category: "video-marketing",
    title: "Fotoruten der sælger: hvilke rum skal med i din boligvideo?",
    excerpt: "Rækkefølgen af rum i din præsentationsvideo har stor indflydelse på seernes engagement. Her er den optimale fotorute baseret på data fra hundredvis af udlejere.",
    readTime: "4 min",
    date: "2023-04-06",
    type: "VIDEO GEN",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm text-white" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>S</span>
            <span className="text-lg font-bold uppercase tracking-tight text-[#1B3F7A]">SOME VIDEO <span className="text-orange-500">POST</span></span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="/" className="hover:text-[#1B3F7A] transition-colors">Forside</Link>
            <Link href="/#features" className="hover:text-[#1B3F7A] transition-colors">Funktioner</Link>
            <Link href="/blog" className="text-[#1B3F7A] font-semibold">Blog</Link>
            <Link href="/priser" className="hover:text-[#1B3F7A] transition-colors">Priser</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-[#1B3F7A] transition-colors">Log ind</Link>
            <Link href="/signup" className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}>
              Kom i gang gratis
            </Link>
            <MobileNav links={[
              { href: "/", label: "Forside" },
              { href: "/#features", label: "Funktioner", external: true },
              { href: "/blog", label: "Blog" },
              { href: "/priser", label: "Priser" },
              { href: "/login", label: "Log ind" },
            ]} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600">
            <BookOpen size={13} /> Videnscenter
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Blog & Guides
          </h1>
          <p className="mt-3 text-base text-slate-500 max-w-xl mx-auto">
            Tips, strategier og indsigt til udlejere af ferieboliger, private lejligheder og hoteller — samt guides til AI-drevet SOME marketing.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 space-y-16">
        {CATEGORIES.map((cat) => {
          const catPosts = POSTS.filter((p) => p.category === cat.id);
          const Icon = cat.icon;
          return (
            <section key={cat.id}>
              {/* Category header */}
              <div className="mb-6 flex items-center gap-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cat.iconBg}`}>
                  <Icon size={20} style={{ color: cat.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">{cat.label}</h2>
                    {cat.tag && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                        style={{ background: cat.color }}
                      >
                        {cat.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{cat.description}</p>
                </div>
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">{catPosts.length} artikler</span>
              </div>

              {/* Posts grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {catPosts.map((post) => (
                  <article
                    key={post.id}
                    className={`group flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${cat.border}`}
                  >
                    <div className="flex-1">
                      {post.type && (
                        <span
                          className="mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                          style={{ background: cat.color }}
                        >
                          {post.type}
                        </span>
                      )}
                      <h3 className="text-sm font-bold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readTime} læsning</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA with live video demo */}
        <div
          className="overflow-hidden rounded-2xl p-8 md:p-12 text-white"
          style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 100%)" }}
        >
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="text-center md:text-left">
              <span className="mb-3 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-300">Live demo</span>
              <h2 className="text-xl font-bold mb-2">Klar til at gøre din bolig uimodståelig?</h2>
              <p className="text-blue-200 text-sm mb-6 max-w-md mx-auto md:mx-0">
                AI genererer sælgende SOME-opslag og professionelle præsentationsvideoer direkte fra din annonce — klar på minutter. Prøv demoen her: scroll i videoen for at gå rundt i boligen.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link
                  href="/posts/new"
                  className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition"
                >
                  Generer SOME opslag
                </Link>
                <Link
                  href="/videos/new"
                  className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  Opret præsentationsvideo
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[280px]">
                <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: "linear-gradient(135deg, #FFB36B, #FF6B4A)" }} />
                <div className="relative">
                  <CinematicWalkthrough locale="da" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
