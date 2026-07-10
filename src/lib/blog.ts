import { Video, Home, Building, Hotel, Megaphone, type LucideIcon } from "lucide-react";

export type BlogCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  iconBg: string;
  description: string;
  tag?: string;
};

export type BlogPost = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  type?: string;
};

export const CATEGORIES: BlogCategory[] = [
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

export const POSTS: BlogPost[] = [
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

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" });
}

export function getPost(id: number): BlogPost | undefined {
  return POSTS.find((p) => p.id === id);
}

export function getCategory(id: string): BlogCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/**
 * Build a readable article body from the post metadata. The content is
 * generated deterministically so every post has a full-length, on-brand
 * article without hand-authoring 20 separate texts.
 */
export function articleBody(post: BlogPost): { heading: string; paragraphs: string[] }[] {
  const cat = getCategory(post.category);
  const topic = cat?.label ?? "udlejning";

  return [
    {
      heading: "Introduktion",
      paragraphs: [
        post.excerpt,
        `I denne guide dykker vi ned i emnet og giver dig konkrete, handlingsrettede råd du kan bruge med det samme. Uanset om du er ny udlejer eller har årelang erfaring inden for ${topic.toLowerCase()}, finder du indsigt der kan gøre en målbar forskel for dine bookinger.`,
      ],
    },
    {
      heading: "Hvorfor det betyder noget",
      paragraphs: [
        "Markedet for udlejning er mere konkurrencepræget end nogensinde. Gæster og lejere sammenligner mange annoncer, før de træffer en beslutning — og de bruger i gennemsnit kun få sekunder på hver enkelt. Det gør førstehåndsindtrykket afgørende.",
        "De udlejere der skiller sig ud, er dem der kombinerer stærkt visuelt materiale med en tydelig, sælgende beskrivelse og en professionel tilstedeværelse på de rette platforme. Netop her kan de rigtige værktøjer spare dig for timer af manuelt arbejde.",
      ],
    },
    {
      heading: "Sådan gør du i praksis",
      paragraphs: [
        "Start med at samle dit materiale ét sted: gode billeder, nøgleinformation om boligen og din prissætning. Jo mere komplet dit udgangspunkt er, desto bedre bliver resultatet — både i din annoncetekst og i dine præsentationsvideoer.",
        "Med SOME VIDEO POST kan du indsætte et link til din eksisterende annonce fra Airbnb, Booking.com eller Novasol. AI henter automatisk billeder og information og skaber både et sælgende opslag og en cinematisk præsentationsvideo på under 15 minutter — klar til at dele på Facebook, Instagram og TikTok.",
      ],
    },
    {
      heading: "Kom godt videre",
      paragraphs: [
        "Konsistens er nøglen. De bedste resultater kommer, når du poster regelmæssigt og tilpasser dit indhold til hver platform. Automatisering gør det realistisk at holde et højt niveau uden at det tager al din tid.",
        "Er du klar til at komme i gang? Opret en gratis konto og prøv selv, hvor hurtigt du kan gå fra boliglink til færdigt opslag og video.",
      ],
    },
  ];
}
