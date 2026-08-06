import type { Metadata } from "next";
import Link from "next/link";
import {
  Link2, Sparkles, Share2, Clock, TrendingUp, Search, CheckCircle2,
  ArrowRight, Play, Video, Rocket, Globe, Hash, MousePointerClick,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { WorkflowDemo } from "@/components/workflow-demo";
import { DemoVideoPhone } from "@/components/demo-video-phone";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LANDING, type Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";
const PAGE_URL = `${BASE}/blog/praesentationsvideo`;
const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

// The same AI-generated sample clip shown across the site, used here as the
// subject the whole article is built around.
const DEMO_VIDEO_URL =
  "https://acwfpiyswezwecemnndw.supabase.co/storage/v1/object/public/videos/38fe7fda-f755-4942-aba2-17642e3774e1/upload-1785073692222.mp4";

export const metadata: Metadata = {
  title:
    "Præsentationsvideo til din bolig — fra link til færdig AI-video på minutter | SOME VIDEO POST",
  description:
    "Se hvordan en AI-præsentationsvideo bliver til: indsæt et boliglink, og AI skaber en cinematisk video klar til Reels, TikTok og Facebook. Enkelt at bruge, flere bookinger og bedre SEO — hele brugerflowet forklaret trin for trin.",
  keywords:
    "præsentationsvideo bolig, AI video feriebolig, boliglink til video, video marketing udlejning, SEO video bolig, del video Facebook Instagram TikTok, cinematisk boligvideo, somevideopost",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Præsentationsvideo til din bolig — fra link til færdig AI-video på minutter",
    description:
      "Indsæt et boliglink, og AI skaber en cinematisk præsentationsvideo klar til sociale medier. Se brugerflowet, fordelene og hvordan video løfter din SEO.",
    type: "article",
    siteName: "somevideopost.com",
    url: PAGE_URL,
  },
};

type CardT = { title: string; text: string };

type BlogT = {
  // hero
  heroBadge: string;
  heroH1a: string; heroAccent: string;
  heroSub: string;
  heroCtaVideo: string; heroCtaSignup: string;
  demoPhoneLabel: string;
  // flow section
  flowKicker: string; flowH2: string; flowSub: string;
  steps: CardT[];
  // simplicity
  simpleKicker: string; simpleH2: string; simpleP: string;
  simplePoints: string[];
  simpleStat1: string; simpleStat1Sub: string;
  simpleStat2: string; simpleStat2Sub: string;
  // benefits
  benefitsKicker: string; benefitsH2: string;
  benefits: CardT[];
  // seo
  seoKicker: string; seoH2: string; seoP: string;
  seoPoints: CardT[];
  seoLinkPre: string; seoLinkWhy: string; seoLinkMid: string; seoLinkPricing: string; seoLinkPost: string;
  // cta
  ctaH2: string; ctaP: string; ctaVideo: string; ctaMore: string;
};

const STRINGS: Record<Locale, BlogT> = {
  da: {
    heroBadge: "Guide · Video Marketing",
    heroH1a: "Præsentationsvideo til din bolig — fra link til færdig video på",
    heroAccent: "minutter",
    heroSub: "Indsæt et boliglink, og AI skaber automatisk en cinematisk præsentationsvideo af din bolig — klar til at dele på sociale medier. Her ser du hele brugerflowet, fordelene og hvordan video løfter din synlighed i søgemaskinerne.",
    heroCtaVideo: "Lav din video nu",
    heroCtaSignup: "Opret gratis konto",
    demoPhoneLabel: "AI-præsentationsvideo",
    flowKicker: "Sådan fungerer det",
    flowH2: "Se brugerflowet — trin for trin",
    flowSub: "Prøv den interaktive simulering nedenfor: fra du indsætter et link, til AI'en genererer opslag og video, og du deler det med ét klik.",
    steps: [
      { title: "1 · Indsæt dit boliglink", text: "Kopiér linket til din annonce fra Airbnb, Booking.com eller Novasol — eller upload dine egne fotos. Ingen teknisk opsætning." },
      { title: "2 · AI producerer videoen", text: "AI henter billederne, bygger en cinematisk fotorute med kamerabevægelser, overgange og musik — og du følger fremdriften live." },
      { title: "3 · Videoen er klar", text: "På under 5 minutter har du en færdig præsentationsvideo i 9:16 — klar til Reels, TikTok og Facebook Stories." },
      { title: "4 · Del og få flere bookinger", text: "Del direkte på Facebook, Instagram, TikTok, LinkedIn og YouTube — eller download i alle formater fra ét dashboard." },
    ],
    simpleKicker: "Enkelthed",
    simpleH2: "Så enkelt er det — ingen teknisk viden",
    simpleP: "Du behøver hverken videoudstyr, redigeringsprogrammer eller erfaring. Hele processen foregår i ét brugervenligt dashboard: indsæt et link eller upload dine fotos, og AI klarer resten — billedvalg, kamerabevægelser, musik og undertekster.",
    simplePoints: [
      "Indsæt boliglink eller upload egne billeder — intet setup",
      "AI vælger de bedste billeder og bygger fotoruten automatisk",
      "Følg fremdriften live og få besked, når videoen er klar",
      "Alt samlet ét sted — opret, se, download og del",
    ],
    simpleStat1: "1 link", simpleStat1Sub: "er alt, hvad der skal til",
    simpleStat2: "~5 min", simpleStat2Sub: "til færdig, delbar video",
    benefitsKicker: "Fordele",
    benefitsH2: "Derfor virker præsentationsvideoer",
    benefits: [
      { title: "Cinematisk kvalitet", text: "Professionelle kamerabevægelser og overgange gennem hvert rum — samme udtryk som dyre videoproduktioner, uden den store pris." },
      { title: "Klar på 5 minutter", text: "Din færdige video leveres på under 5 minutter. Du får besked i appen, så snart den er klar til download og deling." },
      { title: "3× flere forespørgsler", text: "Video skiller sig markant ud i feedet og driver op til 3× flere klik og bookingforespørgsler end stillbilleder." },
      { title: "Del på alle platforme", text: "9:16 til Reels og TikTok, 1:1 til feed og 16:9 til YouTube og din hjemmeside — download eller del med ét klik." },
    ],
    seoKicker: "SEO-optimering",
    seoH2: "Bliv fundet af flere lejere",
    seoP: "En præsentationsvideo er ikke kun pæn at se på — den arbejder for din synlighed. Video løfter både din placering i søgemaskinerne og din rækkevidde på sociale medier på flere måder samtidig.",
    seoPoints: [
      { title: "Længere besøgstid", text: "Video holder besøgende på siden længere. Den øgede dwell-time er et positivt signal til Google og hjælper din annonce med at rangere højere." },
      { title: "Flere formater, flere kanaler", text: "Samme video eksporteres til Reels, TikTok, YouTube og din hjemmeside. Flere kanaler betyder flere backlinks og bredere rækkevidde." },
      { title: "Sociale signaler", text: "Likes, delinger og kommentarer på dine videoopslag skaber sociale signaler, der styrker din synlighed og trafik til dine annoncer." },
      { title: "Struktureret data", text: "Hver video kan mærkes op med VideoObject-skema, så søgemaskiner viser den som et rigt resultat med thumbnail — direkte i søgeresultaterne." },
    ],
    seoLinkPre: "Vil du dykke ned i strategien bag? ",
    seoLinkWhy: "Læs hvorfor udlejere vælger somevideopost.com",
    seoLinkMid: " eller se ",
    seoLinkPricing: "priser og pakker",
    seoLinkPost: ".",
    ctaH2: "Klar til at gøre din bolig uimodståelig?",
    ctaP: "Gå fra boliglink til færdig præsentationsvideo på minutter. Intet kreditkort påkrævet for at komme i gang.",
    ctaVideo: "Lav din video nu",
    ctaMore: "Flere guides",
  },
  en: {
    heroBadge: "Guide · Video Marketing",
    heroH1a: "A presentation video for your property — from link to finished video in",
    heroAccent: "minutes",
    heroSub: "Paste a property link, and AI automatically creates a cinematic presentation video of your property — ready to share on social media. Here you'll see the whole user flow, the benefits and how video lifts your visibility in search engines.",
    heroCtaVideo: "Make your video now",
    heroCtaSignup: "Create a free account",
    demoPhoneLabel: "AI presentation video",
    flowKicker: "How it works",
    flowH2: "See the user flow — step by step",
    flowSub: "Try the interactive simulation below: from pasting a link, to AI generating the post and video, to sharing it with one click.",
    steps: [
      { title: "1 · Paste your property link", text: "Copy the link to your listing from Airbnb, Booking.com or Novasol — or upload your own photos. No technical setup." },
      { title: "2 · AI produces the video", text: "AI fetches the photos, builds a cinematic photo tour with camera movements, transitions and music — and you follow the progress live." },
      { title: "3 · The video is ready", text: "In under 5 minutes you have a finished presentation video in 9:16 — ready for Reels, TikTok and Facebook Stories." },
      { title: "4 · Share and get more bookings", text: "Share directly to Facebook, Instagram, TikTok, LinkedIn and YouTube — or download in every format from one dashboard." },
    ],
    simpleKicker: "Simplicity",
    simpleH2: "It's this simple — no technical knowledge",
    simpleP: "You need neither video equipment, editing software nor experience. The whole process happens in one user-friendly dashboard: paste a link or upload your photos, and AI handles the rest — image selection, camera movements, music and captions.",
    simplePoints: [
      "Paste a property link or upload your own photos — no setup",
      "AI picks the best images and builds the photo tour automatically",
      "Follow the progress live and get notified when the video is ready",
      "Everything in one place — create, view, download and share",
    ],
    simpleStat1: "1 link", simpleStat1Sub: "is all it takes",
    simpleStat2: "~5 min", simpleStat2Sub: "to a finished, shareable video",
    benefitsKicker: "Benefits",
    benefitsH2: "Why presentation videos work",
    benefits: [
      { title: "Cinematic quality", text: "Professional camera movements and transitions through every room — the same look as expensive video productions, without the big price." },
      { title: "Ready in 5 minutes", text: "Your finished video is delivered in under 5 minutes. You get notified in the app as soon as it's ready to download and share." },
      { title: "3× more enquiries", text: "Video stands out markedly in the feed and drives up to 3× more clicks and booking enquiries than still images." },
      { title: "Share on every platform", text: "9:16 for Reels and TikTok, 1:1 for feed and 16:9 for YouTube and your website — download or share with one click." },
    ],
    seoKicker: "SEO optimisation",
    seoH2: "Get found by more renters",
    seoP: "A presentation video isn't just nice to look at — it works for your visibility. Video lifts both your ranking in search engines and your reach on social media in several ways at once.",
    seoPoints: [
      { title: "Longer time on page", text: "Video keeps visitors on the page longer. The increased dwell time is a positive signal to Google and helps your listing rank higher." },
      { title: "More formats, more channels", text: "The same video is exported to Reels, TikTok, YouTube and your website. More channels means more backlinks and broader reach." },
      { title: "Social signals", text: "Likes, shares and comments on your video posts create social signals that strengthen your visibility and traffic to your listings." },
      { title: "Structured data", text: "Each video can be marked up with VideoObject schema, so search engines show it as a rich result with a thumbnail — right in the search results." },
    ],
    seoLinkPre: "Want to dive into the strategy behind it? ",
    seoLinkWhy: "Read why hosts choose somevideopost.com",
    seoLinkMid: " or see ",
    seoLinkPricing: "pricing and plans",
    seoLinkPost: ".",
    ctaH2: "Ready to make your property irresistible?",
    ctaP: "Go from property link to finished presentation video in minutes. No credit card required to get started.",
    ctaVideo: "Make your video now",
    ctaMore: "More guides",
  },
  es: {
    heroBadge: "Guía · Vídeo Marketing",
    heroH1a: "Un vídeo de presentación para tu propiedad — del enlace al vídeo terminado en",
    heroAccent: "minutos",
    heroSub: "Pega un enlace de propiedad, y la IA crea automáticamente un vídeo de presentación cinematográfico de tu propiedad — listo para compartir en redes sociales. Aquí verás todo el flujo de uso, las ventajas y cómo el vídeo mejora tu visibilidad en los buscadores.",
    heroCtaVideo: "Crea tu vídeo ahora",
    heroCtaSignup: "Crear una cuenta gratis",
    demoPhoneLabel: "Vídeo de presentación IA",
    flowKicker: "Cómo funciona",
    flowH2: "Mira el flujo de uso — paso a paso",
    flowSub: "Prueba la simulación interactiva de abajo: desde que pegas un enlace, hasta que la IA genera la publicación y el vídeo, y lo compartes con un clic.",
    steps: [
      { title: "1 · Pega el enlace de tu propiedad", text: "Copia el enlace de tu anuncio de Airbnb, Booking.com o Novasol — o sube tus propias fotos. Sin configuración técnica." },
      { title: "2 · La IA produce el vídeo", text: "La IA descarga las imágenes, crea un recorrido fotográfico cinematográfico con movimientos de cámara, transiciones y música — y sigues el progreso en directo." },
      { title: "3 · El vídeo está listo", text: "En menos de 5 minutos tienes un vídeo de presentación terminado en 9:16 — listo para Reels, TikTok y Facebook Stories." },
      { title: "4 · Comparte y consigue más reservas", text: "Comparte directamente en Facebook, Instagram, TikTok, LinkedIn y YouTube — o descarga en todos los formatos desde un solo panel." },
    ],
    simpleKicker: "Sencillez",
    simpleH2: "Así de sencillo es — sin conocimientos técnicos",
    simpleP: "No necesitas equipo de vídeo, programas de edición ni experiencia. Todo el proceso ocurre en un panel fácil de usar: pega un enlace o sube tus fotos, y la IA se encarga del resto — selección de imágenes, movimientos de cámara, música y subtítulos.",
    simplePoints: [
      "Pega el enlace de la propiedad o sube tus propias fotos — sin configuración",
      "La IA elige las mejores imágenes y crea el recorrido fotográfico automáticamente",
      "Sigue el progreso en directo y recibe aviso cuando el vídeo esté listo",
      "Todo en un solo lugar — crea, mira, descarga y comparte",
    ],
    simpleStat1: "1 enlace", simpleStat1Sub: "es todo lo que hace falta",
    simpleStat2: "~5 min", simpleStat2Sub: "hasta un vídeo terminado y compartible",
    benefitsKicker: "Ventajas",
    benefitsH2: "Por qué funcionan los vídeos de presentación",
    benefits: [
      { title: "Calidad cinematográfica", text: "Movimientos de cámara y transiciones profesionales por cada habitación — el mismo aspecto que las producciones de vídeo caras, sin el gran precio." },
      { title: "Listo en 5 minutos", text: "Tu vídeo terminado se entrega en menos de 5 minutos. Recibes aviso en la app en cuanto está listo para descargar y compartir." },
      { title: "3× más solicitudes", text: "El vídeo destaca notablemente en el feed y genera hasta 3× más clics y solicitudes de reserva que las imágenes fijas." },
      { title: "Comparte en todas las plataformas", text: "9:16 para Reels y TikTok, 1:1 para feed y 16:9 para YouTube y tu web — descarga o comparte con un clic." },
    ],
    seoKicker: "Optimización SEO",
    seoH2: "Que te encuentren más inquilinos",
    seoP: "Un vídeo de presentación no es solo bonito de ver — trabaja para tu visibilidad. El vídeo mejora tanto tu posición en los buscadores como tu alcance en redes sociales de varias formas a la vez.",
    seoPoints: [
      { title: "Más tiempo en la página", text: "El vídeo mantiene a los visitantes más tiempo en la página. El mayor tiempo de permanencia es una señal positiva para Google y ayuda a tu anuncio a posicionarse mejor." },
      { title: "Más formatos, más canales", text: "El mismo vídeo se exporta a Reels, TikTok, YouTube y tu web. Más canales significa más backlinks y mayor alcance." },
      { title: "Señales sociales", text: "Los me gusta, las veces compartidas y los comentarios en tus publicaciones de vídeo crean señales sociales que refuerzan tu visibilidad y el tráfico a tus anuncios." },
      { title: "Datos estructurados", text: "Cada vídeo se puede marcar con el esquema VideoObject, para que los buscadores lo muestren como un resultado enriquecido con miniatura — directamente en los resultados de búsqueda." },
    ],
    seoLinkPre: "¿Quieres profundizar en la estrategia? ",
    seoLinkWhy: "Lee por qué los anfitriones eligen somevideopost.com",
    seoLinkMid: " o mira ",
    seoLinkPricing: "precios y planes",
    seoLinkPost: ".",
    ctaH2: "¿Listo para hacer tu propiedad irresistible?",
    ctaP: "Pasa del enlace de la propiedad al vídeo de presentación terminado en minutos. Sin tarjeta de crédito para empezar.",
    ctaVideo: "Crea tu vídeo ahora",
    ctaMore: "Más guías",
  },
  de: {
    heroBadge: "Guide · Video-Marketing",
    heroH1a: "Ein Präsentationsvideo für deine Immobilie — vom Link zum fertigen Video in",
    heroAccent: "Minuten",
    heroSub: "Füge einen Immobilienlink ein, und die KI erstellt automatisch ein kinematisches Präsentationsvideo deiner Immobilie — bereit zum Teilen in sozialen Medien. Hier siehst du den gesamten Ablauf, die Vorteile und wie Video deine Sichtbarkeit in Suchmaschinen steigert.",
    heroCtaVideo: "Erstelle jetzt dein Video",
    heroCtaSignup: "Kostenloses Konto erstellen",
    demoPhoneLabel: "KI-Präsentationsvideo",
    flowKicker: "So funktioniert es",
    flowH2: "Sieh dir den Ablauf an — Schritt für Schritt",
    flowSub: "Probiere die interaktive Simulation unten aus: vom Einfügen eines Links, über die KI, die Beitrag und Video generiert, bis zum Teilen mit einem Klick.",
    steps: [
      { title: "1 · Immobilienlink einfügen", text: "Kopiere den Link zu deinem Inserat von Airbnb, Booking.com oder Novasol — oder lade deine eigenen Fotos hoch. Keine technische Einrichtung." },
      { title: "2 · KI produziert das Video", text: "Die KI holt die Bilder, baut eine kinematische Fototour mit Kamerabewegungen, Übergängen und Musik — und du verfolgst den Fortschritt live." },
      { title: "3 · Das Video ist fertig", text: "In unter 5 Minuten hast du ein fertiges Präsentationsvideo in 9:16 — bereit für Reels, TikTok und Facebook Stories." },
      { title: "4 · Teilen und mehr Buchungen erhalten", text: "Teile direkt auf Facebook, Instagram, TikTok, LinkedIn und YouTube — oder lade in allen Formaten aus einem Dashboard herunter." },
    ],
    simpleKicker: "Einfachheit",
    simpleH2: "So einfach ist das — keine technischen Kenntnisse",
    simpleP: "Du brauchst weder Videoausrüstung, Schnittsoftware noch Erfahrung. Der gesamte Prozess läuft in einem benutzerfreundlichen Dashboard: Link einfügen oder Fotos hochladen, und die KI erledigt den Rest — Bildauswahl, Kamerabewegungen, Musik und Untertitel.",
    simplePoints: [
      "Immobilienlink einfügen oder eigene Fotos hochladen — keine Einrichtung",
      "KI wählt die besten Bilder und baut die Fototour automatisch",
      "Verfolge den Fortschritt live und werde benachrichtigt, wenn das Video fertig ist",
      "Alles an einem Ort — erstellen, ansehen, herunterladen und teilen",
    ],
    simpleStat1: "1 Link", simpleStat1Sub: "ist alles, was du brauchst",
    simpleStat2: "~5 Min", simpleStat2Sub: "bis zum fertigen, teilbaren Video",
    benefitsKicker: "Vorteile",
    benefitsH2: "Darum funktionieren Präsentationsvideos",
    benefits: [
      { title: "Kinematische Qualität", text: "Professionelle Kamerabewegungen und Übergänge durch jeden Raum — der gleiche Look wie teure Videoproduktionen, ohne den hohen Preis." },
      { title: "Fertig in 5 Minuten", text: "Dein fertiges Video wird in unter 5 Minuten geliefert. Du wirst in der App benachrichtigt, sobald es zum Herunterladen und Teilen bereit ist." },
      { title: "3× mehr Anfragen", text: "Video hebt sich im Feed deutlich ab und treibt bis zu 3× mehr Klicks und Buchungsanfragen als Standbilder." },
      { title: "Auf jeder Plattform teilen", text: "9:16 für Reels und TikTok, 1:1 für Feed und 16:9 für YouTube und deine Website — herunterladen oder mit einem Klick teilen." },
    ],
    seoKicker: "SEO-Optimierung",
    seoH2: "Werde von mehr Mietern gefunden",
    seoP: "Ein Präsentationsvideo ist nicht nur schön anzusehen — es arbeitet für deine Sichtbarkeit. Video steigert sowohl deine Platzierung in Suchmaschinen als auch deine Reichweite in sozialen Medien auf mehrere Arten gleichzeitig.",
    seoPoints: [
      { title: "Längere Verweildauer", text: "Video hält Besucher länger auf der Seite. Die erhöhte Verweildauer ist ein positives Signal an Google und hilft deinem Inserat, höher zu ranken." },
      { title: "Mehr Formate, mehr Kanäle", text: "Das gleiche Video wird für Reels, TikTok, YouTube und deine Website exportiert. Mehr Kanäle bedeuten mehr Backlinks und größere Reichweite." },
      { title: "Soziale Signale", text: "Likes, Shares und Kommentare zu deinen Videobeiträgen erzeugen soziale Signale, die deine Sichtbarkeit und den Traffic zu deinen Inseraten stärken." },
      { title: "Strukturierte Daten", text: "Jedes Video kann mit VideoObject-Schema ausgezeichnet werden, sodass Suchmaschinen es als Rich Result mit Thumbnail anzeigen — direkt in den Suchergebnissen." },
    ],
    seoLinkPre: "Willst du tiefer in die Strategie einsteigen? ",
    seoLinkWhy: "Lies, warum Vermieter somevideopost.com wählen",
    seoLinkMid: " oder sieh dir die ",
    seoLinkPricing: "Preise und Pakete",
    seoLinkPost: " an.",
    ctaH2: "Bereit, deine Immobilie unwiderstehlich zu machen?",
    ctaP: "Gelange vom Immobilienlink zum fertigen Präsentationsvideo in Minuten. Keine Kreditkarte nötig, um loszulegen.",
    ctaVideo: "Erstelle jetzt dein Video",
    ctaMore: "Mehr Guides",
  },
};

const STEP_STYLES = [
  { color: "#1B3F7A", bg: "#EEF3FB", icon: Link2 },
  { color: "#FF6B4A", bg: "#FFF4F1", icon: Sparkles },
  { color: "#059669", bg: "#ECFDF5", icon: Play },
  { color: "#7C3AED", bg: "#F5F3FF", icon: Share2 },
];

const BENEFIT_STYLES = [
  { color: "#1B3F7A", bg: "#EEF3FB", icon: Video },
  { color: "#FF6B4A", bg: "#FFF4F1", icon: Clock },
  { color: "#059669", bg: "#ECFDF5", icon: TrendingUp },
  { color: "#7C3AED", bg: "#F5F3FF", icon: Share2 },
];

const SEO_ICONS = [Clock, Globe, Hash, Search];

export default async function PresentationVideoBlogPage() {
  const locale = await getLocale();
  const s = STRINGS[locale];
  const t = LANDING[locale];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline:
        "Præsentationsvideo til din bolig — fra link til færdig AI-video på minutter",
      description:
        "Sådan bliver en AI-præsentationsvideo til: indsæt et boliglink, og AI skaber en cinematisk video klar til sociale medier. Enkelt, effektivt og godt for din SEO.",
      datePublished: "2026-08-04",
      dateModified: "2026-08-04",
      articleSection: "Video Marketing",
      author: { "@type": "Organization", name: "somevideopost.com", url: BASE },
      publisher: { "@type": "Organization", name: "somevideopost.com", url: BASE },
      mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
      url: PAGE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "AI-genereret præsentationsvideo af en feriebolig",
      description:
        "En cinematisk præsentationsvideo skabt automatisk af AI ud fra en boligannonce — klar til Reels, TikTok og Facebook.",
      thumbnailUrl: [`${BASE}/walkthrough/01-facade.svg`],
      contentUrl: DEMO_VIDEO_URL,
      uploadDate: "2026-07-26",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: BASE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
        { "@type": "ListItem", position: 3, name: "Præsentationsvideo", item: PAGE_URL },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd data={jsonLd} />
      <SiteHeader active="blog" locale={locale} />

      {/* ── Hero ── */}
      <section
        className="overflow-hidden border-b border-slate-200 text-white"
        style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 55%, #0f2347 100%)" }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:py-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-xs font-semibold text-orange-300">
              <Video size={13} /> {s.heroBadge}
            </div>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              {s.heroH1a}{" "}
              <span style={{ background: ORANGE_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.heroAccent}
              </span>
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-blue-200">
              {s.heroSub}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/videos/new"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: ORANGE_GRADIENT }}
              >
                <Sparkles size={15} /> {s.heroCtaVideo}
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                {s.heroCtaSignup} <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* The video the whole article is built around */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[280px]">
              <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: ORANGE_GRADIENT }} />
              <div className="relative">
                <DemoVideoPhone label={s.demoPhoneLabel} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14 space-y-16">
        {/* ── User-flow simulation ── */}
        <section>
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B4A]">{s.flowKicker}</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{s.flowH2}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              {s.flowSub}
            </p>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* Interactive simulation of the flow */}
            <div className="flex justify-center">
              <div className="w-full max-w-[320px]">
                <WorkflowDemo t={t} />
              </div>
            </div>

            {/* Step descriptions */}
            <ol className="flex flex-col gap-4">
              {s.steps.map((step, i) => {
                const st = STEP_STYLES[i];
                return (
                  <li key={step.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: st.bg }}>
                      <st.icon size={20} style={{ color: st.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ── Enkelthed (simplicity) ── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B3F7A]">{s.simpleKicker}</span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{s.simpleH2}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                {s.simpleP}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {s.simplePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-600" />
                    <span className="text-sm leading-relaxed text-slate-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-8 text-center">
              <MousePointerClick size={28} className="text-[#FF6B4A]" />
              <p className="mt-3 text-4xl font-black text-slate-900">{s.simpleStat1}</p>
              <p className="mt-1 text-sm text-slate-500">{s.simpleStat1Sub}</p>
              <div className="mt-5 h-px w-full bg-slate-200" />
              <p className="mt-5 text-4xl font-black text-slate-900">{s.simpleStat2}</p>
              <p className="mt-1 text-sm text-slate-500">{s.simpleStat2Sub}</p>
            </div>
          </div>
        </section>

        {/* ── Fordele (benefits) ── */}
        <section>
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B4A]">{s.benefitsKicker}</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{s.benefitsH2}</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {s.benefits.map((f, i) => {
              const st = BENEFIT_STYLES[i];
              return (
                <div key={f.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: st.bg }}>
                    <st.icon size={20} style={{ color: st.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SEO-optimering ── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-10">
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669]">{s.seoKicker}</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{s.seoH2}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              {s.seoP}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {s.seoPoints.map((point, i) => {
              const Icon = SEO_ICONS[i];
              return (
                <div key={point.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Icon size={18} className="text-[#059669]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{point.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-slate-500">
            {s.seoLinkPre}
            <Link href="/hvorfor-somevideopost" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800">
              {s.seoLinkWhy}
            </Link>
            {s.seoLinkMid}
            <Link href="/priser" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800">
              {s.seoLinkPricing}
            </Link>
            {s.seoLinkPost}
          </p>
        </section>

        {/* ── CTA ── */}
        <section
          className="overflow-hidden rounded-2xl p-8 text-center text-white md:p-12"
          style={{ background: "linear-gradient(135deg, #1B3F7A 0%, #14306b 100%)" }}
        >
          <Rocket size={26} className="mx-auto text-orange-300" />
          <h2 className="mt-3 text-2xl font-bold">{s.ctaH2}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-blue-200">
            {s.ctaP}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/videos/new"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1B3F7A] transition hover:bg-slate-100"
            >
              <Sparkles size={15} /> {s.ctaVideo}
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              {s.ctaMore} <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter locale={locale} />
    </div>
  );
}
