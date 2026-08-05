import { Video, Home, Building, Hotel, Megaphone, type LucideIcon } from "lucide-react";
import type { Locale } from "./i18n";

/** A string translated into every supported language. */
export type Loc = Record<Locale, string>;

export function tr(loc: Loc, locale: Locale): string {
  return loc[locale] ?? loc.da;
}

export type BlogCategory = {
  id: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  iconBg: string;
  label: Loc;
  description: Loc;
  tag?: string;
};

export type BlogPost = {
  id: number;
  category: string;
  readTime: string;
  date: string;
  type?: string;
  title: Loc;
  excerpt: Loc;
};

export const CATEGORIES: BlogCategory[] = [
  {
    id: "feriebolig",
    icon: Home,
    color: "#FF6B4A",
    bg: "bg-orange-50",
    border: "border-orange-200",
    iconBg: "bg-orange-100",
    label: { da: "Feriebolig", en: "Holiday home", es: "Casa vacacional", de: "Ferienhaus" },
    description: {
      da: "Tips og tricks til din feriebolig",
      en: "Tips and tricks for your holiday home",
      es: "Consejos y trucos para tu casa vacacional",
      de: "Tipps und Tricks für dein Ferienhaus",
    },
  },
  {
    id: "privat-udlejning",
    icon: Building,
    color: "#1B3F7A",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    label: { da: "Privat udlejning", en: "Private rental", es: "Alquiler privado", de: "Privatvermietung" },
    description: {
      da: "Råd til private udlejere",
      en: "Advice for private landlords",
      es: "Consejos para arrendadores particulares",
      de: "Ratschläge für private Vermieter",
    },
  },
  {
    id: "hotel",
    icon: Hotel,
    color: "#0A66C2",
    bg: "bg-sky-50",
    border: "border-sky-200",
    iconBg: "bg-sky-100",
    label: { da: "Hotel & Overnatning", en: "Hotels & Stays", es: "Hoteles y alojamiento", de: "Hotels & Unterkünfte" },
    description: {
      da: "Marketing for hoteller og B&B",
      en: "Marketing for hotels and B&Bs",
      es: "Marketing para hoteles y B&B",
      de: "Marketing für Hotels und B&Bs",
    },
  },
  {
    id: "some-opslag",
    icon: Megaphone,
    color: "#7C3AED",
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
    label: { da: "SOME Opslag", en: "Social posts", es: "Publicaciones", de: "Social-Media-Beiträge" },
    description: {
      da: "AI-genererede sociale medie-opslag",
      en: "AI-generated social media posts",
      es: "Publicaciones en redes generadas por IA",
      de: "KI-generierte Social-Media-Beiträge",
    },
    tag: "SOME POST",
  },
  {
    id: "video-marketing",
    icon: Video,
    color: "#059669",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    label: { da: "Video Marketing", en: "Video marketing", es: "Marketing de vídeo", de: "Video-Marketing" },
    description: {
      da: "Præsentationsvideoer med AI",
      en: "AI presentation videos",
      es: "Vídeos de presentación con IA",
      de: "Präsentationsvideos mit KI",
    },
    tag: "VIDEO GEN",
  },
];

export const POSTS: BlogPost[] = [
  // ── Feriebolig ──
  {
    id: 1, category: "feriebolig", readTime: "4 min", date: "2026-05-18",
    title: {
      da: "5 ting gæster kigger efter i en feriebolig-annonce",
      en: "5 things guests look for in a holiday-home listing",
      es: "5 cosas que buscan los huéspedes en un anuncio vacacional",
      de: "5 Dinge, auf die Gäste bei einer Ferienhaus-Anzeige achten",
    },
    excerpt: {
      da: "Billeder, beliggenhed, anmeldelser og pris er de fire første ting en potentiel gæst vurderer. Den femte overrasker de fleste udlejere.",
      en: "Photos, location, reviews and price are the first four things a potential guest judges. The fifth surprises most hosts.",
      es: "Fotos, ubicación, reseñas y precio son las cuatro primeras cosas que valora un huésped. La quinta sorprende a la mayoría.",
      de: "Fotos, Lage, Bewertungen und Preis sind die ersten vier Dinge, die ein Gast bewertet. Das fünfte überrascht die meisten Vermieter.",
    },
  },
  {
    id: 2, category: "feriebolig", readTime: "6 min", date: "2025-07-03",
    title: {
      da: "Sådan prissætter du din feriebolig til højsæson",
      en: "How to price your holiday home for peak season",
      es: "Cómo fijar el precio de tu casa vacacional en temporada alta",
      de: "So legst du den Preis deines Ferienhauses für die Hochsaison fest",
    },
    excerpt: {
      da: "Dynamisk prissætning kan øge din omsætning med op til 40 %. Her er en simpel model du kan implementere uden dyrt software.",
      en: "Dynamic pricing can boost your revenue by up to 40%. Here's a simple model you can implement without expensive software.",
      es: "Los precios dinámicos pueden aumentar tus ingresos hasta un 40 %. Aquí tienes un modelo sencillo sin software caro.",
      de: "Dynamische Preise können deinen Umsatz um bis zu 40 % steigern. Hier ist ein einfaches Modell ohne teure Software.",
    },
  },
  {
    id: 3, category: "feriebolig", readTime: "8 min", date: "2024-04-11",
    title: {
      da: "De bedste platforme til udlejning af feriebolig i 2024",
      en: "The best platforms for holiday-home rental in 2024",
      es: "Las mejores plataformas para alquiler vacacional en 2024",
      de: "Die besten Plattformen für Ferienhaus-Vermietung 2024",
    },
    excerpt: {
      da: "Airbnb, Booking.com, VRBO eller Novasol — vi gennemgår fordele og ulemper ved hver platform og hvilke typer boliger de egner sig til.",
      en: "Airbnb, Booking.com, VRBO or Novasol — we review the pros and cons of each platform and the property types they suit.",
      es: "Airbnb, Booking.com, VRBO o Novasol — analizamos las ventajas y desventajas de cada plataforma y para qué propiedades sirven.",
      de: "Airbnb, Booking.com, VRBO oder Novasol — wir vergleichen die Vor- und Nachteile jeder Plattform und für welche Objekte sie passen.",
    },
  },
  {
    id: 4, category: "feriebolig", readTime: "7 min", date: "2023-09-28",
    title: {
      da: "Hvad du skal vide om skat ved udlejning af din feriebolig",
      en: "What to know about tax when renting out your holiday home",
      es: "Lo que debes saber sobre impuestos al alquilar tu casa vacacional",
      de: "Was du über Steuern bei der Vermietung deines Ferienhauses wissen musst",
    },
    excerpt: {
      da: "Bundfradrag, lejeindtægt og hvornår du skal momsregistreres. En praktisk guide til ferieboligudlejers skatteregler i Danmark.",
      en: "Allowances, rental income and when to register for VAT. A practical guide to tax rules for holiday-home hosts.",
      es: "Deducciones, ingresos por alquiler y cuándo darte de alta en el IVA. Una guía práctica de las reglas fiscales para anfitriones.",
      de: "Freibeträge, Mieteinnahmen und wann du dich umsatzsteuerlich registrieren musst. Ein praktischer Leitfaden zu den Steuerregeln.",
    },
  },

  // ── Privat udlejning ──
  {
    id: 5, category: "privat-udlejning", readTime: "5 min", date: "2026-03-14",
    title: {
      da: "Lejekontrakt til privat udlejning: hvad skal den indeholde?",
      en: "Private rental agreement: what should it contain?",
      es: "Contrato de alquiler privado: ¿qué debe incluir?",
      de: "Mietvertrag für Privatvermietung: was muss enthalten sein?",
    },
    excerpt: {
      da: "En gyldig lejekontrakt beskytter både dig og din lejer. Her er de 8 punkter der altid skal med — og de 3 fejl de fleste laver.",
      en: "A valid rental agreement protects both you and your tenant. Here are the 8 points that must always be included — and the 3 mistakes most people make.",
      es: "Un contrato válido os protege a ti y al inquilino. Aquí están los 8 puntos imprescindibles — y los 3 errores más comunes.",
      de: "Ein gültiger Mietvertrag schützt dich und deinen Mieter. Hier sind die 8 Punkte, die immer enthalten sein müssen — und die 3 häufigsten Fehler.",
    },
  },
  {
    id: 6, category: "privat-udlejning", readTime: "6 min", date: "2025-02-20",
    title: {
      da: "Sådan finder du de rigtige lejere til din bolig",
      en: "How to find the right tenants for your property",
      es: "Cómo encontrar a los inquilinos adecuados para tu vivienda",
      de: "So findest du die richtigen Mieter für deine Immobilie",
    },
    excerpt: {
      da: "Fra opslag til fremvisning og screening — en trin-for-trin guide til at finde pålidelige lejere der passer på din bolig.",
      en: "From listing to viewing and screening — a step-by-step guide to finding reliable tenants who care for your property.",
      es: "Del anuncio a la visita y la selección — una guía paso a paso para encontrar inquilinos fiables que cuiden tu vivienda.",
      de: "Von der Anzeige über die Besichtigung bis zur Prüfung — eine Schritt-für-Schritt-Anleitung für zuverlässige Mieter.",
    },
  },
  {
    id: 7, category: "privat-udlejning", readTime: "5 min", date: "2024-08-07",
    title: {
      da: "Huslejens størrelse: hvad må du opkræve?",
      en: "How much rent can you charge?",
      es: "El importe del alquiler: ¿cuánto puedes cobrar?",
      de: "Die Höhe der Miete: was darfst du verlangen?",
    },
    excerpt: {
      da: "Lejeloven sætter grænser for huslejen i visse ejendomme. Lær forskellen på fri lejefastsættelse og omkostningsbestemt leje.",
      en: "Tenancy law caps the rent for certain properties. Learn the difference between free and cost-based rent setting.",
      es: "La ley limita el alquiler en ciertas propiedades. Aprende la diferencia entre renta libre y renta según costes.",
      de: "Das Mietrecht begrenzt die Miete bei bestimmten Objekten. Lerne den Unterschied zwischen freier und kostenbasierter Miete.",
    },
  },
  {
    id: 8, category: "privat-udlejning", readTime: "4 min", date: "2023-11-15",
    title: {
      da: "Vedligeholdelse af udlejningsbolig: udlejerens pligter",
      en: "Maintaining a rental property: the landlord's duties",
      es: "Mantenimiento de la vivienda en alquiler: deberes del arrendador",
      de: "Instandhaltung der Mietwohnung: die Pflichten des Vermieters",
    },
    excerpt: {
      da: "Hvem betaler hvad? En klar opdeling af udlejers og lejers vedligeholdelsespligt — og hvad du risikerer hvis du forsømmer den.",
      en: "Who pays for what? A clear split of the landlord's and tenant's maintenance duties — and what you risk if you neglect them.",
      es: "¿Quién paga qué? Un reparto claro de las obligaciones de mantenimiento — y qué arriesgas si las descuidas.",
      de: "Wer zahlt was? Eine klare Aufteilung der Instandhaltungspflichten von Vermieter und Mieter — und was du riskierst, wenn du sie vernachlässigst.",
    },
  },

  // ── Hotel ──
  {
    id: 9, category: "hotel", readTime: "7 min", date: "2026-04-02",
    title: {
      da: "Direkte bookinger vs. OTA: sådan vinder du som lille hotel",
      en: "Direct bookings vs. OTAs: how small hotels win",
      es: "Reservas directas vs. OTA: cómo ganar como hotel pequeño",
      de: "Direktbuchungen vs. OTAs: so gewinnst du als kleines Hotel",
    },
    excerpt: {
      da: "Booking.com og Expedia tager 15-25 % i provision. Her er strategierne der hjælper uafhængige hoteller med at vinde direkte bookinger.",
      en: "Booking.com and Expedia take 15-25% commission. Here are the strategies that help independent hotels win direct bookings.",
      es: "Booking.com y Expedia cobran un 15-25 % de comisión. Estas son las estrategias para ganar reservas directas.",
      de: "Booking.com und Expedia nehmen 15-25 % Provision. Hier sind die Strategien für mehr Direktbuchungen.",
    },
  },
  {
    id: 10, category: "hotel", readTime: "5 min", date: "2025-10-22",
    title: {
      da: "Social proof der virker: anmeldelser og UGC for hotellet",
      en: "Social proof that works: reviews and UGC for your hotel",
      es: "Prueba social que funciona: reseñas y UGC para tu hotel",
      de: "Social Proof, der wirkt: Bewertungen und UGC für dein Hotel",
    },
    excerpt: {
      da: "Gæsters billeder og anmeldelser er det mest effektive marketingmateriale du har. Sådan indsamler og bruger du dem strategisk.",
      en: "Guest photos and reviews are the most effective marketing material you have. Here's how to collect and use them strategically.",
      es: "Las fotos y reseñas de los huéspedes son tu material de marketing más eficaz. Así los recoges y usas estratégicamente.",
      de: "Gästefotos und -bewertungen sind dein wirksamstes Marketingmaterial. So sammelst und nutzt du sie strategisch.",
    },
  },
  {
    id: 11, category: "hotel", readTime: "6 min", date: "2024-12-05",
    title: {
      da: "Sæsonudjævning: sådan fylder du hotellet i lavsæson",
      en: "Beating seasonality: how to fill your hotel in the low season",
      es: "Nivelar la estacionalidad: cómo llenar tu hotel en temporada baja",
      de: "Saisonausgleich: so füllst du dein Hotel in der Nebensaison",
    },
    excerpt: {
      da: "Pakketilbud, lokale partnerskaber og målrettet annoncering er nøglerne til at skabe omsætning hele året — ikke kun i højsæson.",
      en: "Package deals, local partnerships and targeted advertising are the keys to revenue all year — not just in peak season.",
      es: "Paquetes, alianzas locales y publicidad segmentada son la clave para ingresos todo el año — no solo en temporada alta.",
      de: "Pauschalangebote, lokale Partnerschaften und gezielte Werbung sind der Schlüssel zu Umsatz das ganze Jahr — nicht nur in der Hochsaison.",
    },
  },
  {
    id: 12, category: "hotel", readTime: "6 min", date: "2023-06-19",
    title: {
      da: "Instagram og Facebook for hoteller: hvad virker i dag?",
      en: "Instagram and Facebook for hotels: what works today?",
      es: "Instagram y Facebook para hoteles: ¿qué funciona hoy?",
      de: "Instagram und Facebook für Hotels: was funktioniert heute?",
    },
    excerpt: {
      da: "Algoritmerne ændrer sig konstant. Vi dykker ned i hvad der faktisk skaber organisk rækkevidde og bookinger fra sociale medier i dag.",
      en: "The algorithms change constantly. We dig into what actually drives organic reach and bookings from social media today.",
      es: "Los algoritmos cambian constantemente. Analizamos qué genera hoy alcance orgánico y reservas desde las redes.",
      de: "Die Algorithmen ändern sich ständig. Wir zeigen, was heute wirklich organische Reichweite und Buchungen bringt.",
    },
  },

  // ── SOME Opslag ──
  {
    id: 13, category: "some-opslag", readTime: "4 min", date: "2026-06-10", type: "SOME POST",
    title: {
      da: "Hvorfor AI-genererede opslag konverterer bedre end manuelt skrevne",
      en: "Why AI-generated posts convert better than hand-written ones",
      es: "Por qué las publicaciones con IA convierten mejor que las escritas a mano",
      de: "Warum KI-generierte Beiträge besser konvertieren als handgeschriebene",
    },
    excerpt: {
      da: "AI analyserer annoncens data og skriver tekst der er optimeret til platformen — med den rette tone, længde og hashtags. Her er tallene der beviser det.",
      en: "AI analyses your listing data and writes copy optimised for the platform — with the right tone, length and hashtags. Here are the numbers that prove it.",
      es: "La IA analiza los datos del anuncio y escribe textos optimizados para la plataforma — con el tono, la longitud y los hashtags adecuados. Estos son los datos.",
      de: "Die KI analysiert deine Anzeigendaten und schreibt für die Plattform optimierten Text — mit dem richtigen Ton, der richtigen Länge und Hashtags. Hier sind die Zahlen.",
    },
  },
  {
    id: 14, category: "some-opslag", readTime: "5 min", date: "2025-05-08", type: "SOME POST",
    title: {
      da: "Facebook vs. LinkedIn vs. Instagram: hvilken platform til din bolig?",
      en: "Facebook vs. LinkedIn vs. Instagram: which platform for your property?",
      es: "Facebook vs. LinkedIn vs. Instagram: ¿qué plataforma para tu vivienda?",
      de: "Facebook vs. LinkedIn vs. Instagram: welche Plattform für deine Immobilie?",
    },
    excerpt: {
      da: "Hver platform har sin tone. Facebook elsker emojis og lokal stemning. LinkedIn vil have professionel investorhistorie. Instagram kræver visuelt fokus og hashtags.",
      en: "Each platform has its tone. Facebook loves emojis and local vibe. LinkedIn wants a professional investor story. Instagram needs visual focus and hashtags.",
      es: "Cada plataforma tiene su tono. Facebook adora los emojis y el ambiente local. LinkedIn quiere una historia profesional. Instagram exige foco visual y hashtags.",
      de: "Jede Plattform hat ihren Ton. Facebook liebt Emojis und lokale Stimmung. LinkedIn will eine professionelle Investoren-Story. Instagram braucht visuellen Fokus und Hashtags.",
    },
  },
  {
    id: 15, category: "some-opslag", readTime: "3 min", date: "2024-11-17", type: "SOME POST",
    title: {
      da: "Fra boliglink til færdigt opslag på 30 sekunder",
      en: "From property link to finished post in 30 seconds",
      es: "Del enlace del anuncio a la publicación en 30 segundos",
      de: "Vom Immobilienlink zum fertigen Beitrag in 30 Sekunden",
    },
    excerpt: {
      da: "Indsæt linket til din Airbnb- eller Booking.com-annonce — AI henter billeder, pris, placering og størrelse og skriver et sælgende opslag til alle platforme.",
      en: "Paste your Airbnb or Booking.com listing link — AI fetches photos, price, location and size and writes a selling post for every platform.",
      es: "Pega el enlace de tu anuncio de Airbnb o Booking.com — la IA obtiene fotos, precio, ubicación y tamaño y escribe una publicación para cada plataforma.",
      de: "Füge den Link deiner Airbnb- oder Booking.com-Anzeige ein — die KI holt Fotos, Preis, Lage und Größe und schreibt einen verkaufsstarken Beitrag für jede Plattform.",
    },
  },
  {
    id: 16, category: "some-opslag", readTime: "4 min", date: "2023-08-30", type: "SOME POST",
    title: {
      da: "Hvornår på dagen skal du poste din boligannonce?",
      en: "What time of day should you post your property listing?",
      es: "¿A qué hora del día deberías publicar tu anuncio?",
      de: "Zu welcher Tageszeit solltest du deine Anzeige posten?",
    },
    excerpt: {
      da: "Tidspunktet kan betyde op til 3x mere rækkevidde. Vi gennemgår de bedste tidspunkter for Facebook, Instagram og LinkedIn baseret på aktuelle data.",
      en: "Timing can mean up to 3x more reach. We cover the best times for Facebook, Instagram and LinkedIn based on current data.",
      es: "El momento puede suponer hasta 3 veces más alcance. Repasamos las mejores horas para Facebook, Instagram y LinkedIn según datos actuales.",
      de: "Das Timing kann bis zu 3x mehr Reichweite bedeuten. Wir zeigen die besten Zeiten für Facebook, Instagram und LinkedIn nach aktuellen Daten.",
    },
  },

  // ── Video Marketing ──
  {
    id: 17, category: "video-marketing", readTime: "5 min", date: "2026-06-25", type: "VIDEO GEN",
    title: {
      da: "Præsentationsvideoer øger bookinger med op til 80 %",
      en: "Presentation videos boost bookings by up to 80%",
      es: "Los vídeos de presentación aumentan las reservas hasta un 80 %",
      de: "Präsentationsvideos steigern Buchungen um bis zu 80 %",
    },
    excerpt: {
      da: "Boliger med video i annoncen ses markant længere og har højere klikrate. AI-genererede præsentationsvideoer giver nu alle udlejere adgang til dette format.",
      en: "Listings with video are viewed noticeably longer and have a higher click rate. AI-generated presentation videos now give every host access to this format.",
      es: "Los anuncios con vídeo se ven mucho más tiempo y tienen más clics. Los vídeos con IA dan ahora acceso a este formato a todos los anfitriones.",
      de: "Anzeigen mit Video werden deutlich länger angesehen und haben eine höhere Klickrate. KI-Videos geben jetzt jedem Vermieter Zugang zu diesem Format.",
    },
  },
  {
    id: 18, category: "video-marketing", readTime: "4 min", date: "2025-09-01", type: "VIDEO GEN",
    title: {
      da: "Cinematisk video af din bolig: fra billeder til færdig film på 5 min",
      en: "Cinematic video of your property: from photos to finished film in 5 min",
      es: "Vídeo cinematográfico de tu vivienda: de fotos a película en 5 min",
      de: "Kinematisches Video deiner Immobilie: von Fotos zum fertigen Film in 5 Min",
    },
    excerpt: {
      da: "Upload dine boligfotos — AI tilføjer professionelle kamerabevægelser, flydende overgange og musik. Videoen leveres direkte i appen klar til deling.",
      en: "Upload your property photos — AI adds professional camera moves, smooth transitions and music. The video is delivered right in the app, ready to share.",
      es: "Sube las fotos de tu vivienda — la IA añade movimientos de cámara, transiciones y música. El vídeo se entrega en la app, listo para compartir.",
      de: "Lade deine Fotos hoch — die KI fügt professionelle Kamerabewegungen, Übergänge und Musik hinzu. Das Video kommt direkt in der App, bereit zum Teilen.",
    },
  },
  {
    id: 19, category: "video-marketing", readTime: "5 min", date: "2024-03-14", type: "VIDEO GEN",
    title: {
      da: "Del din boligvideo på Facebook, Instagram og YouTube",
      en: "Share your property video on Facebook, Instagram and YouTube",
      es: "Comparte el vídeo de tu vivienda en Facebook, Instagram y YouTube",
      de: "Teile dein Immobilienvideo auf Facebook, Instagram und YouTube",
    },
    excerpt: {
      da: "Ét klik deler din præsentationsvideo til alle platforme. Vi viser dig hvordan du optimerer videoen til hvert format og maksimerer din organiske rækkevidde.",
      en: "One click shares your presentation video to every platform. We show you how to optimise the video for each format and maximise your organic reach.",
      es: "Un clic comparte tu vídeo en todas las plataformas. Te mostramos cómo optimizarlo para cada formato y maximizar tu alcance orgánico.",
      de: "Ein Klick teilt dein Video auf allen Plattformen. Wir zeigen dir, wie du das Video für jedes Format optimierst und deine organische Reichweite maximierst.",
    },
  },
  {
    id: 20, category: "video-marketing", readTime: "4 min", date: "2023-04-06", type: "VIDEO GEN",
    title: {
      da: "Fotoruten der sælger: hvilke rum skal med i din boligvideo?",
      en: "The photo route that sells: which rooms belong in your property video?",
      es: "La ruta de fotos que vende: ¿qué habitaciones incluir en tu vídeo?",
      de: "Die Fotoroute, die verkauft: welche Räume gehören in dein Immobilienvideo?",
    },
    excerpt: {
      da: "Rækkefølgen af rum i din præsentationsvideo har stor indflydelse på seernes engagement. Her er den optimale fotorute baseret på data fra hundredvis af udlejere.",
      en: "The order of rooms in your presentation video greatly affects viewer engagement. Here's the optimal photo route based on data from hundreds of hosts.",
      es: "El orden de las habitaciones influye mucho en el interés del espectador. Esta es la ruta óptima según datos de cientos de anfitriones.",
      de: "Die Reihenfolge der Räume beeinflusst das Engagement stark. Hier ist die optimale Fotoroute nach Daten von Hunderten Vermietern.",
    },
  },
];

const INTL_LOCALE: Record<Locale, string> = { da: "da-DK", en: "en-GB", es: "es-ES", de: "de-DE" };

export function formatDate(dateStr: string, locale: Locale = "da") {
  return new Date(dateStr).toLocaleDateString(INTL_LOCALE[locale] ?? "da-DK", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export function getPost(id: number): BlogPost | undefined {
  return POSTS.find((p) => p.id === id);
}

export function getCategory(id: string): BlogCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

// ── Article body template (shared, localized) ───────────────────────────────
// The content is generated deterministically so every post has a full-length,
// on-brand article without hand-authoring 20 separate texts — in every language.
const BODY: Record<Locale, (excerpt: string, topic: string) => { heading: string; paragraphs: string[] }[]> = {
  da: (excerpt, topic) => [
    { heading: "Introduktion", paragraphs: [excerpt, `I denne guide dykker vi ned i emnet og giver dig konkrete, handlingsrettede råd du kan bruge med det samme. Uanset om du er ny udlejer eller har årelang erfaring inden for ${topic}, finder du indsigt der kan gøre en målbar forskel for dine bookinger.`] },
    { heading: "Hvorfor det betyder noget", paragraphs: ["Markedet for udlejning er mere konkurrencepræget end nogensinde. Gæster og lejere sammenligner mange annoncer, før de træffer en beslutning — og de bruger i gennemsnit kun få sekunder på hver enkelt. Det gør førstehåndsindtrykket afgørende.", "De udlejere der skiller sig ud, er dem der kombinerer stærkt visuelt materiale med en tydelig, sælgende beskrivelse og en professionel tilstedeværelse på de rette platforme. Netop her kan de rigtige værktøjer spare dig for timer af manuelt arbejde."] },
    { heading: "Sådan gør du i praksis", paragraphs: ["Start med at samle dit materiale ét sted: gode billeder, nøgleinformation om boligen og din prissætning. Jo mere komplet dit udgangspunkt er, desto bedre bliver resultatet — både i din annoncetekst og i dine præsentationsvideoer.", "Med SOME VIDEO POST kan du indsætte et link til din eksisterende annonce fra Airbnb, Booking.com eller Novasol. AI henter automatisk billeder og information og skaber både et sælgende opslag og en cinematisk præsentationsvideo på under 5 minutter — klar til at dele på Facebook, Instagram og TikTok."] },
    { heading: "Kom godt videre", paragraphs: ["Konsistens er nøglen. De bedste resultater kommer, når du poster regelmæssigt og tilpasser dit indhold til hver platform. Automatisering gør det realistisk at holde et højt niveau uden at det tager al din tid.", "Er du klar til at komme i gang? Opret en gratis konto og prøv selv, hvor hurtigt du kan gå fra boliglink til færdigt opslag og video."] },
  ],
  en: (excerpt, topic) => [
    { heading: "Introduction", paragraphs: [excerpt, `In this guide we dive into the topic and give you concrete, actionable advice you can use right away. Whether you're a new host or have years of experience in ${topic}, you'll find insights that can make a measurable difference to your bookings.`] },
    { heading: "Why it matters", paragraphs: ["The rental market is more competitive than ever. Guests and tenants compare many listings before deciding — and on average they spend only a few seconds on each one. That makes the first impression decisive.", "The hosts who stand out are those who combine strong visuals with a clear, selling description and a professional presence on the right platforms. This is exactly where the right tools can save you hours of manual work."] },
    { heading: "How to do it in practice", paragraphs: ["Start by gathering your material in one place: good photos, key information about the property and your pricing. The more complete your starting point, the better the result — both in your listing copy and in your presentation videos.", "With SOME VIDEO POST you can paste a link to your existing listing from Airbnb, Booking.com or Novasol. AI automatically fetches photos and information and creates both a selling post and a cinematic presentation video in under 5 minutes — ready to share on Facebook, Instagram and TikTok."] },
    { heading: "Getting further", paragraphs: ["Consistency is key. The best results come when you post regularly and adapt your content to each platform. Automation makes it realistic to keep a high standard without it taking all your time.", "Ready to get started? Create a free account and see for yourself how fast you can go from a property link to a finished post and video."] },
  ],
  es: (excerpt, topic) => [
    { heading: "Introducción", paragraphs: [excerpt, `En esta guía profundizamos en el tema y te damos consejos concretos y prácticos que puedes usar de inmediato. Tanto si eres nuevo como si tienes años de experiencia en ${topic}, encontrarás ideas que marcan una diferencia medible en tus reservas.`] },
    { heading: "Por qué importa", paragraphs: ["El mercado del alquiler es más competitivo que nunca. Los huéspedes comparan muchos anuncios antes de decidir — y de media dedican solo unos segundos a cada uno. Eso hace que la primera impresión sea decisiva.", "Los anfitriones que destacan son los que combinan un material visual potente con una descripción clara y vendedora y una presencia profesional en las plataformas adecuadas. Aquí es donde las herramientas correctas te ahorran horas de trabajo manual."] },
    { heading: "Cómo hacerlo en la práctica", paragraphs: ["Empieza reuniendo tu material en un solo lugar: buenas fotos, información clave de la vivienda y tu precio. Cuanto más completo sea tu punto de partida, mejor será el resultado — tanto en el texto del anuncio como en tus vídeos.", "Con SOME VIDEO POST puedes pegar un enlace a tu anuncio existente de Airbnb, Booking.com o Novasol. La IA obtiene automáticamente fotos e información y crea una publicación vendedora y un vídeo cinematográfico en menos de 5 minutos — listo para compartir en Facebook, Instagram y TikTok."] },
    { heading: "Cómo seguir avanzando", paragraphs: ["La constancia es clave. Los mejores resultados llegan cuando publicas con regularidad y adaptas tu contenido a cada plataforma. La automatización hace realista mantener un alto nivel sin que te ocupe todo el tiempo.", "¿Listo para empezar? Crea una cuenta gratis y comprueba tú mismo lo rápido que vas del enlace del anuncio a una publicación y un vídeo terminados."] },
  ],
  de: (excerpt, topic) => [
    { heading: "Einführung", paragraphs: [excerpt, `In diesem Leitfaden tauchen wir in das Thema ein und geben dir konkrete, umsetzbare Ratschläge, die du sofort nutzen kannst. Ob neuer Vermieter oder mit jahrelanger Erfahrung in ${topic} — du findest Einsichten, die einen messbaren Unterschied für deine Buchungen machen.`] },
    { heading: "Warum es wichtig ist", paragraphs: ["Der Vermietungsmarkt ist umkämpfter denn je. Gäste und Mieter vergleichen viele Anzeigen, bevor sie entscheiden — und verbringen im Schnitt nur wenige Sekunden mit jeder. Das macht den ersten Eindruck entscheidend.", "Die Vermieter, die herausstechen, kombinieren starkes Bildmaterial mit einer klaren, verkaufsstarken Beschreibung und einer professionellen Präsenz auf den richtigen Plattformen. Genau hier sparen dir die richtigen Werkzeuge Stunden manueller Arbeit."] },
    { heading: "So gehst du praktisch vor", paragraphs: ["Sammle zuerst dein Material an einem Ort: gute Fotos, wichtige Infos zur Immobilie und deine Preise. Je vollständiger dein Ausgangspunkt, desto besser das Ergebnis — sowohl im Anzeigentext als auch in deinen Videos.", "Mit SOME VIDEO POST fügst du einfach einen Link zu deiner bestehenden Anzeige von Airbnb, Booking.com oder Novasol ein. Die KI holt automatisch Fotos und Informationen und erstellt sowohl einen verkaufsstarken Beitrag als auch ein kinematisches Präsentationsvideo in unter 5 Minuten — bereit zum Teilen auf Facebook, Instagram und TikTok."] },
    { heading: "So kommst du weiter", paragraphs: ["Konsistenz ist entscheidend. Die besten Ergebnisse entstehen, wenn du regelmäßig postest und deine Inhalte an jede Plattform anpasst. Automatisierung macht ein hohes Niveau realistisch, ohne deine ganze Zeit zu kosten.", "Bereit loszulegen? Erstelle ein kostenloses Konto und sieh selbst, wie schnell du vom Immobilienlink zu einem fertigen Beitrag und Video kommst."] },
  ],
};

/**
 * Build a readable, localized article body from the post metadata.
 */
export function articleBody(post: BlogPost, locale: Locale = "da"): { heading: string; paragraphs: string[] }[] {
  const cat = getCategory(post.category);
  const topicRaw = cat ? tr(cat.label, locale) : "";
  const topic = topicRaw.toLowerCase();
  const excerpt = tr(post.excerpt, locale);
  const build = BODY[locale] ?? BODY.da;
  return build(excerpt, topic);
}
