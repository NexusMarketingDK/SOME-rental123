import type { Metadata } from "next";
import Link from "next/link";
import {
  Link2, Sparkles, Video, Share2, Download, LayoutDashboard,
  CheckCircle2, ArrowRight, Clock, TrendingUp, Wand2, CalendarDays,
  Play, MonitorSmartphone, Rocket,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { WorkflowDemo } from "@/components/workflow-demo";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LANDING, type Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";
import { currencyForLocale, formatPriceKey } from "@/lib/currency";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.somevideopost.com";
const PAGE_URL = `${BASE}/hvorfor-somevideopost`;
const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

export const metadata: Metadata = {
  title: "Hvorfor somevideopost.com? AI-video & automatisk deling på sociale medier",
  description:
    "somevideopost.com er dashboardet, hvor udlejere går fra boliglink til færdig AI-video og sælgende opslag på minutter — og deler automatisk på Facebook, Instagram, TikTok og LinkedIn eller downloader i alle formater. Se hvorfor tusindvis vælger somevideopost.com.",
  keywords:
    "hvorfor somevideopost, somevideopost.com, AI video feriebolig, automatisk deling sociale medier, del video Facebook Instagram TikTok, download boligvideo, præsentationsvideo AI, dashboard sociale medier udlejning, boliglink til video, SOME opslag AI",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Hvorfor somevideopost.com? AI-video & automatisk deling på sociale medier",
    description:
      "Fra boliglink til færdig AI-video og opslag på minutter. Del automatisk på Facebook, Instagram, TikTok og LinkedIn — eller download i alle formater. Ét brugervenligt dashboard.",
    type: "website",
    siteName: "somevideopost.com",
    url: PAGE_URL,
  },
};

type StepT = { title: string; desc: string };
type BenefitT = { title: string; desc: string };
type FaqT = { q: string; a: string };
/** Formatted, currency-aware price strings (DKK for Danish, EUR otherwise). */
type Prices = { basic: string; pro: string; video: string };

type WhyT = {
  heroBadge: string;
  heroH1a: string;
  heroAccent: string;
  heroSub: string;
  ctaStart: string;
  ctaPricing: string;
  ctaStartShort: string;
  stat1Val: string; stat1Label: string;
  stat2Val: string; stat2Label: string;
  stat3Val: string; stat3Label: string;
  // how it works
  howBadge: string; howH2: string; howSub: string;
  howStepLabel: (n: number) => string;
  steps: StepT[];
  // ai video
  aiBadge: string; aiH2: string; aiP: string;
  aiList: string[];
  aiPanelTitle: string;
  aiPanelSteps: [string, string, string];
  aiPanelCreating: string; aiPanelProcessing: string;
  // dashboard
  dashBadge: string; dashH2: string; dashSub: string;
  dashCards: BenefitT[];
  // socials
  socialsBadge: string; socialsH2: string; socialsSub: string;
  // downloads
  dlBadge: string; dlH2: string; dlP: string;
  dlFormats: [string, string, string];
  // why choose
  whyH2: string; whySub: string;
  whyCards: BenefitT[];
  // faq
  faqH2: string; faqSub: string;
  faq: FaqT[];
  // cost faq (currency-aware — DKK for Danish, EUR otherwise)
  costQ: string; costA: (p: Prices) => string;
  // final cta
  finalH2: string; finalSub: (p: Prices) => string;
  finalReadMorePre: string; finalBlog: string; finalMid: string; finalPricing: string;
};

const STRINGS: Record<Locale, WhyT> = {
  da: {
    heroBadge: "Hvorfor somevideopost.com?",
    heroH1a: "AI skaber betagende videoer",
    heroAccent: "på få minutter",
    heroSub: "somevideopost.com er ét brugervenligt dashboard, hvor du går fra boliglink til færdig præsentationsvideo og sælgende opslag — og deler automatisk på alle sociale medier eller downloader i det format, du har brug for. Ingen videoredigering, ingen teknisk viden.",
    ctaStart: "Kom i gang i dag",
    ctaPricing: "Se priser",
    ctaStartShort: "Kom i gang",
    stat1Val: "< 5 min", stat1Label: "Video leveret",
    stat2Val: "op til 80 %", stat2Label: "Flere bookinger med video",
    stat3Val: "5 kanaler", stat3Label: "Del med ét klik",
    howBadge: "Sådan virker det",
    howH2: "Indsæt et boliglink eller upload billeder",
    howSub: "Start hvor du er. Indsæt linket til din annonce fra Airbnb, Booking.com eller Novasol — eller upload dine egne fotos. Resten klarer AI, mens du følger med i dashboardet.",
    howStepLabel: (n) => `Trin ${n}`,
    steps: [
      { title: "Indsæt link eller upload", desc: "AI henter automatisk billeder, titel, pris, størrelse og beliggenhed fra din eksisterende annonce — eller brug dine egne fotos." },
      { title: "AI genererer video & opslag", desc: "En cinematisk præsentationsvideo og et sælgende opslag skabes automatisk, tilpasset hver platform i den rette tone og længde." },
      { title: "Del eller download", desc: "Del med ét klik til alle dine kanaler, planlæg til det bedste tidspunkt — eller download videoen i fuld opløsning." },
    ],
    aiBadge: "AI-videogenerering",
    aiH2: "Professionelle boligvideoer — uden en fotograf",
    aiP: "AI tilføjer flydende kamerabevægelser, cinematiske overgange og baggrundsmusik til dine billeder og skaber en betagende præsentationsvideo på minutter. Du følger fremdriften live i dashboardet — fra “AI genererer” til “Klar”.",
    aiList: [
      "Cinematiske kamerabevægelser og overgange automatisk",
      "9:16 optimeret til Reels, TikTok og Shorts",
      "Baggrundsmusik og tekst tilpasset boligen",
      "Leveret direkte i appen, klar til deling",
    ],
    aiPanelTitle: "Videogenerering",
    aiPanelSteps: ["Indsæt link", "AI genererer", "Klar!"],
    aiPanelCreating: "AI-video oprettes",
    aiPanelProcessing: "Behandler billeder … 75 %",
    dashBadge: "Ét dashboard til det hele",
    dashH2: "Et brugervenligt dashboard til at dele alt ét sted",
    dashSub: "Opret, planlæg, del og download — uden at hoppe mellem apps. Dashboardet samler dine boliger, videoer, opslag og kanaler ét sted, så du har fuldt overblik og styrer alt med få klik.",
    dashCards: [
      { title: "Alt samlet ét sted", desc: "Boliger, videoer, opslag og forbundne kanaler i ét overskueligt dashboard — også på mobil." },
      { title: "Planlæg til det rette tidspunkt", desc: "Planlæg opslag og videoer, så de rammer det tidspunkt, hvor din målgruppe er mest aktiv." },
      { title: "Bygget til fart", desc: "Fra boliglink til delt indhold på minutter. Ingen læringskurve — designet til travle udlejere." },
    ],
    socialsBadge: "Automatisk deling",
    socialsH2: "Del automatisk på alle sociale medier",
    socialsSub: "Forbind dine kanaler én gang og del derefter opslag og videoer til alle platforme med ét klik — eller lad planlæggeren gøre det for dig.",
    dlBadge: "Download & ejerskab",
    dlH2: "Download i alle formater — indholdet er dit",
    dlP: "Vil du bruge videoen i en e-mail, på din hjemmeside eller i en annonce? Download den i høj opløsning i lige præcis det format, du har brug for. Du ejer materialet fuldt ud og kan bruge det, hvor du vil.",
    dlFormats: ["Reels & TikTok", "Feed", "YouTube & web"],
    whyH2: "Derfor vælger udlejere somevideopost.com",
    whySub: "Alt du behøver for at markedsføre din bolig professionelt — samlet i ét værktøj.",
    whyCards: [
      { title: "Spar timer hver uge", desc: "Automatisering betyder, at du går fra idé til delt indhold på minutter i stedet for timer." },
      { title: "Professionel kvalitet", desc: "Cinematiske videoer og skarpe opslag, der får din bolig til at skille sig ud — uden bureau." },
      { title: "Vær til stede overalt", desc: "Én bolig, alle kanaler. Facebook, Instagram, TikTok, LinkedIn og YouTube på én gang." },
      { title: "AI der forstår boliger", desc: "Tekst og video optimeres til udlejningsbranchen — med den rette tone for hver platform." },
      { title: "Flere bookinger", desc: "Boliger med video ses længere og konverterer bedre. Giv din annonce det format, der sælger." },
      { title: "Fuldt ejerskab", desc: "Download alt i høj opløsning og brug det, hvor du vil — indholdet er dit." },
    ],
    faqH2: "Ofte stillede spørgsmål",
    faqSub: "Alt du behøver at vide om somevideopost.com.",
    faq: [
      { q: "Hvad er somevideopost.com?", a: "somevideopost.com er en AI-platform til udlejere af ferieboliger, private lejligheder og hoteller. Du indsætter et link til din annonce eller uploader billeder, og AI skaber automatisk en professionel præsentationsvideo og et sælgende opslag — klar til at dele på sociale medier eller downloade." },
      { q: "Hvor hurtigt er en AI-video klar?", a: "De fleste præsentationsvideoer er færdige på under 5 minutter. Du indsætter blot et boliglink eller uploader dine fotos, vælger stil, og AI genererer video med kamerabevægelser, overgange og musik, mens du følger fremdriften live i dashboardet." },
      { q: "Kan jeg dele direkte på Facebook, Instagram, TikTok og LinkedIn?", a: "Ja. Fra dashboardet forbinder du dine kanaler én gang og deler derefter opslag og videoer til Facebook, Instagram, TikTok, LinkedIn og YouTube med ét klik — eller planlægger dem til det bedste tidspunkt. Du kan altid også downloade videoen og bruge den, hvor du vil." },
      { q: "Kan jeg downloade videoen?", a: "Ja. Alle videoer kan downloades i høj opløsning og i de rette formater — 9:16 til Reels og TikTok, 1:1 til feed og 16:9 til YouTube og hjemmesider — så du ejer materialet fuldt ud." },
      { q: "Skal jeg kunne redigere video for at bruge det?", a: "Nej. Hele pointen med somevideopost.com er, at du ikke behøver teknisk viden eller videoredigering. AI klarer det tunge arbejde, og det brugervenlige dashboard gør resten til få klik." },
    ],
    costQ: "Hvad koster det?",
    costA: (p) => `Det er gratis at oprette konto. Basic koster ${p.basic}/md. og giver 10 AI-opslag om måneden med direkte deling og automation. Pro koster ${p.pro}/md. og inkluderer 2 præsentationsvideoer og 20 opslag om måneden samt prioriteret support. Ekstra præsentationsvideoer koster ${p.video}/stk. Se detaljerne på prissiden.`,
    finalH2: "Klar til at markedsføre din bolig på autopilot?",
    finalSub: (p) => `Gå fra boliglink til færdig video og opslag på minutter. Gratis at starte — Basic fra ${p.basic}/md., eller Pro ${p.pro}/md. med præsentationsvideoer inkluderet.`,
    finalReadMorePre: "Vil du læse mere? Se vores ",
    finalBlog: "blog & guides",
    finalMid: " eller ",
    finalPricing: "priser",
  },
  en: {
    heroBadge: "Why somevideopost.com?",
    heroH1a: "AI creates stunning videos",
    heroAccent: "in minutes",
    heroSub: "somevideopost.com is one user-friendly dashboard where you go from a property link to a finished presentation video and a compelling post — and share automatically to every social channel or download in the format you need. No video editing, no technical knowledge.",
    ctaStart: "Get started today",
    ctaPricing: "See pricing",
    ctaStartShort: "Get started",
    stat1Val: "< 5 min", stat1Label: "Video delivered",
    stat2Val: "up to 80%", stat2Label: "More bookings with video",
    stat3Val: "5 channels", stat3Label: "Share with one click",
    howBadge: "How it works",
    howH2: "Paste a property link or upload photos",
    howSub: "Start where you are. Paste the link to your listing from Airbnb, Booking.com or Novasol — or upload your own photos. AI handles the rest while you follow along in the dashboard.",
    howStepLabel: (n) => `Step ${n}`,
    steps: [
      { title: "Paste link or upload", desc: "AI automatically fetches photos, title, price, size and location from your existing listing — or use your own photos." },
      { title: "AI generates video & post", desc: "A cinematic presentation video and a compelling post are created automatically, tailored to each platform in the right tone and length." },
      { title: "Share or download", desc: "Share to all your channels with one click, schedule for the best time — or download the video in full resolution." },
    ],
    aiBadge: "AI video generation",
    aiH2: "Professional property videos — without a photographer",
    aiP: "AI adds smooth camera movements, cinematic transitions and background music to your photos and creates a stunning presentation video in minutes. You follow the progress live in the dashboard — from “AI generating” to “Ready”.",
    aiList: [
      "Cinematic camera movements and transitions automatically",
      "9:16 optimised for Reels, TikTok and Shorts",
      "Background music and text tailored to the property",
      "Delivered right in the app, ready to share",
    ],
    aiPanelTitle: "Video generation",
    aiPanelSteps: ["Paste link", "AI generates", "Ready!"],
    aiPanelCreating: "AI video being created",
    aiPanelProcessing: "Processing images … 75%",
    dashBadge: "One dashboard for everything",
    dashH2: "A user-friendly dashboard to share everything in one place",
    dashSub: "Create, schedule, share and download — without jumping between apps. The dashboard brings your properties, videos, posts and channels together in one place, so you have full overview and control everything with a few clicks.",
    dashCards: [
      { title: "Everything in one place", desc: "Properties, videos, posts and connected channels in one clear dashboard — on mobile too." },
      { title: "Schedule for the right moment", desc: "Schedule posts and videos so they hit the moment when your audience is most active." },
      { title: "Built for speed", desc: "From property link to shared content in minutes. No learning curve — designed for busy hosts." },
    ],
    socialsBadge: "Automatic sharing",
    socialsH2: "Share automatically to all social media",
    socialsSub: "Connect your channels once, then share posts and videos to every platform with one click — or let the scheduler do it for you.",
    dlBadge: "Download & ownership",
    dlH2: "Download in every format — the content is yours",
    dlP: "Want to use the video in an email, on your website or in an ad? Download it in high resolution in exactly the format you need. You own the material fully and can use it wherever you like.",
    dlFormats: ["Reels & TikTok", "Feed", "YouTube & web"],
    whyH2: "Why hosts choose somevideopost.com",
    whySub: "Everything you need to market your property professionally — in one tool.",
    whyCards: [
      { title: "Save hours every week", desc: "Automation means you go from idea to shared content in minutes instead of hours." },
      { title: "Professional quality", desc: "Cinematic videos and sharp posts that make your property stand out — without an agency." },
      { title: "Be everywhere", desc: "One property, all channels. Facebook, Instagram, TikTok, LinkedIn and YouTube at once." },
      { title: "AI that understands properties", desc: "Text and video optimised for the rental industry — with the right tone for each platform." },
      { title: "More bookings", desc: "Properties with video are viewed longer and convert better. Give your listing the format that sells." },
      { title: "Full ownership", desc: "Download everything in high resolution and use it wherever you like — the content is yours." },
    ],
    faqH2: "Frequently asked questions",
    faqSub: "Everything you need to know about somevideopost.com.",
    faq: [
      { q: "What is somevideopost.com?", a: "somevideopost.com is an AI platform for hosts of vacation rentals, private apartments and hotels. You paste a link to your listing or upload photos, and AI automatically creates a professional presentation video and a compelling post — ready to share on social media or download." },
      { q: "How fast is an AI video ready?", a: "Most presentation videos are finished in under 5 minutes. You simply paste a property link or upload your photos, choose a style, and AI generates the video with camera movements, transitions and music while you follow the progress live in the dashboard." },
      { q: "Can I share directly to Facebook, Instagram, TikTok and LinkedIn?", a: "Yes. From the dashboard you connect your channels once, then share posts and videos to Facebook, Instagram, TikTok, LinkedIn and YouTube with one click — or schedule them for the best time. You can always download the video too and use it wherever you like." },
      { q: "Can I download the video?", a: "Yes. All videos can be downloaded in high resolution and in the right formats — 9:16 for Reels and TikTok, 1:1 for feed and 16:9 for YouTube and websites — so you own the material fully." },
      { q: "Do I need to know how to edit video to use it?", a: "No. The whole point of somevideopost.com is that you don't need technical knowledge or video editing. AI does the heavy lifting, and the user-friendly dashboard makes the rest a few clicks." },
    ],
    costQ: "What does it cost?",
    costA: (p) => `Creating an account is free. Basic costs ${p.basic}/mo and gives you 10 AI posts a month with direct sharing and automation. Pro costs ${p.pro}/mo and includes 2 presentation videos and 20 posts a month plus priority support. Extra presentation videos cost ${p.video} each. See the details on the pricing page.`,
    finalH2: "Ready to market your property on autopilot?",
    finalSub: (p) => `Go from property link to finished video and post in minutes. Free to start — Basic from ${p.basic}/mo, or Pro ${p.pro}/mo with presentation videos included.`,
    finalReadMorePre: "Want to read more? See our ",
    finalBlog: "blog & guides",
    finalMid: " or ",
    finalPricing: "pricing",
  },
  es: {
    heroBadge: "¿Por qué somevideopost.com?",
    heroH1a: "La IA crea vídeos impresionantes",
    heroAccent: "en minutos",
    heroSub: "somevideopost.com es un único panel fácil de usar donde pasas de un enlace de propiedad a un vídeo de presentación terminado y una publicación atractiva — y compartes automáticamente en todas las redes sociales o descargas en el formato que necesites. Sin edición de vídeo, sin conocimientos técnicos.",
    ctaStart: "Empieza hoy",
    ctaPricing: "Ver precios",
    ctaStartShort: "Comenzar",
    stat1Val: "< 5 min", stat1Label: "Vídeo entregado",
    stat2Val: "hasta 80 %", stat2Label: "Más reservas con vídeo",
    stat3Val: "5 canales", stat3Label: "Comparte con un clic",
    howBadge: "Cómo funciona",
    howH2: "Pega un enlace de propiedad o sube fotos",
    howSub: "Empieza donde estés. Pega el enlace de tu anuncio de Airbnb, Booking.com o Novasol — o sube tus propias fotos. La IA se encarga del resto mientras lo sigues en el panel.",
    howStepLabel: (n) => `Paso ${n}`,
    steps: [
      { title: "Pega el enlace o sube fotos", desc: "La IA obtiene automáticamente fotos, título, precio, tamaño y ubicación de tu anuncio existente — o usa tus propias fotos." },
      { title: "La IA genera vídeo y publicación", desc: "Se crean automáticamente un vídeo de presentación cinematográfico y una publicación atractiva, adaptados a cada plataforma con el tono y la longitud adecuados." },
      { title: "Comparte o descarga", desc: "Comparte en todos tus canales con un clic, programa para el mejor momento — o descarga el vídeo en resolución completa." },
    ],
    aiBadge: "Generación de vídeo con IA",
    aiH2: "Vídeos profesionales de propiedades — sin fotógrafo",
    aiP: "La IA añade movimientos de cámara fluidos, transiciones cinematográficas y música de fondo a tus fotos y crea un vídeo de presentación impresionante en minutos. Sigues el progreso en directo en el panel — de “IA generando” a “Listo”.",
    aiList: [
      "Movimientos de cámara y transiciones cinematográficas automáticos",
      "9:16 optimizado para Reels, TikTok y Shorts",
      "Música de fondo y texto adaptados a la propiedad",
      "Entregado directamente en la app, listo para compartir",
    ],
    aiPanelTitle: "Generación de vídeo",
    aiPanelSteps: ["Pegar enlace", "IA genera", "¡Listo!"],
    aiPanelCreating: "Creando vídeo con IA",
    aiPanelProcessing: "Procesando imágenes … 75 %",
    dashBadge: "Un panel para todo",
    dashH2: "Un panel fácil de usar para compartirlo todo en un solo lugar",
    dashSub: "Crea, programa, comparte y descarga — sin saltar entre apps. El panel reúne tus propiedades, vídeos, publicaciones y canales en un solo lugar, para que tengas control total con unos pocos clics.",
    dashCards: [
      { title: "Todo en un solo lugar", desc: "Propiedades, vídeos, publicaciones y canales conectados en un panel claro — también en el móvil." },
      { title: "Programa en el momento justo", desc: "Programa publicaciones y vídeos para que lleguen cuando tu público está más activo." },
      { title: "Diseñado para la velocidad", desc: "Del enlace de la propiedad al contenido compartido en minutos. Sin curva de aprendizaje — diseñado para anfitriones ocupados." },
    ],
    socialsBadge: "Compartir automático",
    socialsH2: "Comparte automáticamente en todas las redes sociales",
    socialsSub: "Conecta tus canales una vez y comparte publicaciones y vídeos en todas las plataformas con un clic — o deja que el planificador lo haga por ti.",
    dlBadge: "Descarga y propiedad",
    dlH2: "Descarga en todos los formatos — el contenido es tuyo",
    dlP: "¿Quieres usar el vídeo en un correo, en tu web o en un anuncio? Descárgalo en alta resolución exactamente en el formato que necesites. Eres dueño del material por completo y puedes usarlo donde quieras.",
    dlFormats: ["Reels y TikTok", "Feed", "YouTube y web"],
    whyH2: "Por qué los anfitriones eligen somevideopost.com",
    whySub: "Todo lo que necesitas para comercializar tu propiedad profesionalmente — en una sola herramienta.",
    whyCards: [
      { title: "Ahorra horas cada semana", desc: "La automatización significa pasar de la idea al contenido compartido en minutos en lugar de horas." },
      { title: "Calidad profesional", desc: "Vídeos cinematográficos y publicaciones nítidas que hacen destacar tu propiedad — sin agencia." },
      { title: "Está presente en todas partes", desc: "Una propiedad, todos los canales. Facebook, Instagram, TikTok, LinkedIn y YouTube a la vez." },
      { title: "IA que entiende de propiedades", desc: "Texto y vídeo optimizados para el sector del alquiler — con el tono adecuado para cada plataforma." },
      { title: "Más reservas", desc: "Las propiedades con vídeo se ven más tiempo y convierten mejor. Dale a tu anuncio el formato que vende." },
      { title: "Propiedad total", desc: "Descarga todo en alta resolución y úsalo donde quieras — el contenido es tuyo." },
    ],
    faqH2: "Preguntas frecuentes",
    faqSub: "Todo lo que necesitas saber sobre somevideopost.com.",
    faq: [
      { q: "¿Qué es somevideopost.com?", a: "somevideopost.com es una plataforma de IA para anfitriones de alquileres vacacionales, apartamentos privados y hoteles. Pegas un enlace a tu anuncio o subes fotos, y la IA crea automáticamente un vídeo de presentación profesional y una publicación atractiva — listos para compartir en redes sociales o descargar." },
      { q: "¿Cómo de rápido está listo un vídeo con IA?", a: "La mayoría de los vídeos de presentación están terminados en menos de 5 minutos. Simplemente pegas un enlace de propiedad o subes tus fotos, eliges un estilo, y la IA genera el vídeo con movimientos de cámara, transiciones y música mientras sigues el progreso en directo en el panel." },
      { q: "¿Puedo compartir directamente en Facebook, Instagram, TikTok y LinkedIn?", a: "Sí. Desde el panel conectas tus canales una vez y luego compartes publicaciones y vídeos en Facebook, Instagram, TikTok, LinkedIn y YouTube con un clic — o los programas para el mejor momento. Siempre puedes descargar el vídeo también y usarlo donde quieras." },
      { q: "¿Puedo descargar el vídeo?", a: "Sí. Todos los vídeos se pueden descargar en alta resolución y en los formatos adecuados — 9:16 para Reels y TikTok, 1:1 para feed y 16:9 para YouTube y webs — para que seas dueño del material por completo." },
      { q: "¿Necesito saber editar vídeo para usarlo?", a: "No. Toda la idea de somevideopost.com es que no necesitas conocimientos técnicos ni edición de vídeo. La IA hace el trabajo pesado, y el panel fácil de usar reduce el resto a unos pocos clics." },
    ],
    costQ: "¿Cuánto cuesta?",
    costA: (p) => `Crear una cuenta es gratis. Basic cuesta ${p.basic}/mes y ofrece 10 publicaciones IA al mes con compartir directo y automatización. Pro cuesta ${p.pro}/mes e incluye 2 vídeos de presentación y 20 publicaciones al mes además de soporte prioritario. Los vídeos de presentación adicionales cuestan ${p.video} cada uno. Consulta los detalles en la página de precios.`,
    finalH2: "¿Listo para comercializar tu propiedad en piloto automático?",
    finalSub: (p) => `Pasa del enlace de la propiedad al vídeo y la publicación terminados en minutos. Gratis para empezar — Basic desde ${p.basic}/mes, o Pro ${p.pro}/mes con vídeos de presentación incluidos.`,
    finalReadMorePre: "¿Quieres leer más? Consulta nuestro ",
    finalBlog: "blog y guías",
    finalMid: " o los ",
    finalPricing: "precios",
  },
  de: {
    heroBadge: "Warum somevideopost.com?",
    heroH1a: "KI erstellt beeindruckende Videos",
    heroAccent: "in wenigen Minuten",
    heroSub: "somevideopost.com ist ein benutzerfreundliches Dashboard, in dem du von einem Immobilienlink zu einem fertigen Präsentationsvideo und einem überzeugenden Beitrag gelangst — und automatisch auf allen sozialen Kanälen teilst oder im gewünschten Format herunterlädst. Kein Videoschnitt, keine technischen Kenntnisse.",
    ctaStart: "Jetzt starten",
    ctaPricing: "Preise ansehen",
    ctaStartShort: "Loslegen",
    stat1Val: "< 5 Min", stat1Label: "Video geliefert",
    stat2Val: "bis zu 80 %", stat2Label: "Mehr Buchungen mit Video",
    stat3Val: "5 Kanäle", stat3Label: "Mit einem Klick teilen",
    howBadge: "So funktioniert es",
    howH2: "Immobilienlink einfügen oder Fotos hochladen",
    howSub: "Starte, wo du bist. Füge den Link zu deinem Inserat von Airbnb, Booking.com oder Novasol ein — oder lade deine eigenen Fotos hoch. Den Rest erledigt die KI, während du im Dashboard mitverfolgst.",
    howStepLabel: (n) => `Schritt ${n}`,
    steps: [
      { title: "Link einfügen oder hochladen", desc: "KI holt automatisch Fotos, Titel, Preis, Größe und Lage aus deinem bestehenden Inserat — oder nutze deine eigenen Fotos." },
      { title: "KI generiert Video & Beitrag", desc: "Ein kinematisches Präsentationsvideo und ein überzeugender Beitrag werden automatisch erstellt, angepasst an jede Plattform im richtigen Ton und in der richtigen Länge." },
      { title: "Teilen oder herunterladen", desc: "Teile mit einem Klick auf allen Kanälen, plane für die beste Zeit — oder lade das Video in voller Auflösung herunter." },
    ],
    aiBadge: "KI-Videogenerierung",
    aiH2: "Professionelle Immobilienvideos — ohne Fotograf",
    aiP: "KI fügt deinen Fotos flüssige Kamerabewegungen, kinematische Übergänge und Hintergrundmusik hinzu und erstellt ein beeindruckendes Präsentationsvideo in Minuten. Du verfolgst den Fortschritt live im Dashboard — von „KI generiert“ bis „Fertig“.",
    aiList: [
      "Kinematische Kamerabewegungen und Übergänge automatisch",
      "9:16 optimiert für Reels, TikTok und Shorts",
      "Hintergrundmusik und Text auf die Immobilie abgestimmt",
      "Direkt in der App geliefert, bereit zum Teilen",
    ],
    aiPanelTitle: "Videogenerierung",
    aiPanelSteps: ["Link einfügen", "KI generiert", "Fertig!"],
    aiPanelCreating: "KI-Video wird erstellt",
    aiPanelProcessing: "Bilder werden verarbeitet … 75 %",
    dashBadge: "Ein Dashboard für alles",
    dashH2: "Ein benutzerfreundliches Dashboard, um alles an einem Ort zu teilen",
    dashSub: "Erstellen, planen, teilen und herunterladen — ohne zwischen Apps zu wechseln. Das Dashboard bündelt deine Immobilien, Videos, Beiträge und Kanäle an einem Ort, sodass du mit wenigen Klicks alles im Blick hast und steuerst.",
    dashCards: [
      { title: "Alles an einem Ort", desc: "Immobilien, Videos, Beiträge und verbundene Kanäle in einem übersichtlichen Dashboard — auch mobil." },
      { title: "Zum richtigen Zeitpunkt planen", desc: "Plane Beiträge und Videos so, dass sie den Moment treffen, in dem deine Zielgruppe am aktivsten ist." },
      { title: "Auf Tempo gebaut", desc: "Vom Immobilienlink zum geteilten Inhalt in Minuten. Keine Lernkurve — für vielbeschäftigte Vermieter entwickelt." },
    ],
    socialsBadge: "Automatisches Teilen",
    socialsH2: "Automatisch auf allen sozialen Medien teilen",
    socialsSub: "Verbinde deine Kanäle einmal und teile dann Beiträge und Videos mit einem Klick auf allen Plattformen — oder lass den Planer es für dich erledigen.",
    dlBadge: "Download & Eigentum",
    dlH2: "In jedem Format herunterladen — die Inhalte gehören dir",
    dlP: "Willst du das Video in einer E-Mail, auf deiner Website oder in einer Anzeige nutzen? Lade es in hoher Auflösung genau im gewünschten Format herunter. Du besitzt das Material vollständig und kannst es überall verwenden.",
    dlFormats: ["Reels & TikTok", "Feed", "YouTube & Web"],
    whyH2: "Darum wählen Vermieter somevideopost.com",
    whySub: "Alles, was du brauchst, um deine Immobilie professionell zu vermarkten — in einem Werkzeug.",
    whyCards: [
      { title: "Spare Stunden jede Woche", desc: "Automatisierung bedeutet, dass du von der Idee zum geteilten Inhalt in Minuten statt Stunden gelangst." },
      { title: "Professionelle Qualität", desc: "Kinematische Videos und pointierte Beiträge, die deine Immobilie hervorstechen lassen — ohne Agentur." },
      { title: "Sei überall präsent", desc: "Eine Immobilie, alle Kanäle. Facebook, Instagram, TikTok, LinkedIn und YouTube auf einmal." },
      { title: "KI, die Immobilien versteht", desc: "Text und Video sind auf die Vermietungsbranche optimiert — mit dem richtigen Ton für jede Plattform." },
      { title: "Mehr Buchungen", desc: "Immobilien mit Video werden länger angesehen und konvertieren besser. Gib deinem Inserat das Format, das verkauft." },
      { title: "Volles Eigentum", desc: "Lade alles in hoher Auflösung herunter und nutze es überall — die Inhalte gehören dir." },
    ],
    faqH2: "Häufig gestellte Fragen",
    faqSub: "Alles, was du über somevideopost.com wissen musst.",
    faq: [
      { q: "Was ist somevideopost.com?", a: "somevideopost.com ist eine KI-Plattform für Vermieter von Ferienimmobilien, privaten Wohnungen und Hotels. Du fügst einen Link zu deinem Inserat ein oder lädst Fotos hoch, und die KI erstellt automatisch ein professionelles Präsentationsvideo und einen überzeugenden Beitrag — bereit zum Teilen in sozialen Medien oder zum Download." },
      { q: "Wie schnell ist ein KI-Video fertig?", a: "Die meisten Präsentationsvideos sind in unter 5 Minuten fertig. Du fügst einfach einen Immobilienlink ein oder lädst deine Fotos hoch, wählst einen Stil, und die KI generiert das Video mit Kamerabewegungen, Übergängen und Musik, während du den Fortschritt live im Dashboard verfolgst." },
      { q: "Kann ich direkt auf Facebook, Instagram, TikTok und LinkedIn teilen?", a: "Ja. Im Dashboard verbindest du deine Kanäle einmal und teilst dann Beiträge und Videos mit einem Klick auf Facebook, Instagram, TikTok, LinkedIn und YouTube — oder planst sie für die beste Zeit. Du kannst das Video auch jederzeit herunterladen und überall verwenden." },
      { q: "Kann ich das Video herunterladen?", a: "Ja. Alle Videos können in hoher Auflösung und in den richtigen Formaten heruntergeladen werden — 9:16 für Reels und TikTok, 1:1 für Feed und 16:9 für YouTube und Websites — sodass du das Material vollständig besitzt." },
      { q: "Muss ich Video schneiden können, um es zu nutzen?", a: "Nein. Der ganze Sinn von somevideopost.com ist, dass du keine technischen Kenntnisse oder Videoschnitt brauchst. Die KI übernimmt die schwere Arbeit, und das benutzerfreundliche Dashboard macht den Rest zu wenigen Klicks." },
    ],
    costQ: "Was kostet es?",
    costA: (p) => `Ein Konto zu erstellen ist kostenlos. Basic kostet ${p.basic}/Mon. und bietet 10 KI-Beiträge pro Monat mit direktem Teilen und Automatisierung. Pro kostet ${p.pro}/Mon. und beinhaltet 2 Präsentationsvideos und 20 Beiträge pro Monat sowie priorisierten Support. Zusätzliche Präsentationsvideos kosten ${p.video} pro Stück. Siehe die Details auf der Preisseite.`,
    finalH2: "Bereit, deine Immobilie auf Autopilot zu vermarkten?",
    finalSub: (p) => `Gelange vom Immobilienlink zum fertigen Video und Beitrag in Minuten. Kostenlos starten — Basic ab ${p.basic}/Mon. oder Pro ${p.pro}/Mon. mit inbegriffenen Präsentationsvideos.`,
    finalReadMorePre: "Willst du mehr lesen? Sieh dir unseren ",
    finalBlog: "Blog & Guides",
    finalMid: " oder die ",
    finalPricing: "Preise",
  },
};

const SOCIALS = [
  { name: "Facebook", color: "#1877F2", letter: "f" },
  { name: "Instagram", color: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)", letter: "IG" },
  { name: "TikTok", color: "#010101", letter: "TT" },
  { name: "LinkedIn", color: "#0A66C2", letter: "in" },
  { name: "YouTube", color: "#FF0000", letter: "YT" },
];

const CARD_ACCENTS = [
  "bg-blue-500/15 text-blue-400",
  "bg-emerald-500/15 text-emerald-400",
  "bg-orange-500/15 text-orange-400",
];

const WHY_ACCENTS = [
  "bg-orange-500/15 text-orange-400",
  "bg-emerald-500/15 text-emerald-400",
  "bg-blue-500/15 text-blue-400",
  "bg-violet-500/15 text-violet-400",
  "bg-pink-500/15 text-pink-400",
  "bg-yellow-500/15 text-yellow-400",
];

const DASH_ICONS = [MonitorSmartphone, CalendarDays, Rocket];
const WHY_ICONS = [Clock, Video, Share2, Wand2, TrendingUp, Download];

function Step({ n, icon: Icon, title, desc }: { n: string; icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="relative flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_0_18px_rgba(59,130,246,0.35)]" style={{ background: "linear-gradient(135deg, #1e4f9a, #4d8dff)" }}>
        <Icon size={20} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-300">{n}</span>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, desc, accent }: { icon: React.ElementType; title: string; desc: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)]">
      <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
        <Icon size={20} />
      </div>
      <h3 className="mb-2 font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
    </div>
  );
}

export default async function WhySomeVideoPostPage() {
  const locale = await getLocale();
  const s = STRINGS[locale];
  const t = LANDING[locale];

  // Currency follows the displayed language: Danish → DKK, everyone else → EUR.
  // (Same rule as the landing page, so switching language always converts.)
  const currency = currencyForLocale(locale);
  const prices: Prices = {
    basic: formatPriceKey("basic", currency),
    pro: formatPriceKey("pro", currency),
    video: formatPriceKey("video", currency),
  };
  const faqItems = [...s.faq, { q: s.costQ, a: s.costA(prices) }];

  const stepIcons = [Link2, Wand2, Share2];
  const heroStats = [
    { icon: Clock, val: s.stat1Val, label: s.stat1Label },
    { icon: TrendingUp, val: s.stat2Val, label: s.stat2Label },
    { icon: Share2, val: s.stat3Val, label: s.stat3Label },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "somevideopost.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: BASE,
      description:
        "AI-platform der laver præsentationsvideoer og sælgende opslag til udlejere og deler dem automatisk på sociale medier.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: "50",
        highPrice: "299",
        offerCount: "3",
      },
      featureList: [
        "AI-genererede præsentationsvideoer",
        "Automatisk deling på Facebook, Instagram, TikTok, LinkedIn og YouTube",
        "Sælgende opslag genereret fra boliglink",
        "Download i 9:16, 1:1 og 16:9",
        "Brugervenligt dashboard til planlægning og deling",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: BASE },
        { "@type": "ListItem", position: 2, name: "Hvorfor somevideopost.com", item: PAGE_URL },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col text-slate-100" style={{ background: "#050d24" }}>
      <JsonLd data={jsonLd} />

      {/* ── Nav ── */}
      <SiteHeader active="why" locale={locale} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "linear-gradient(135deg, #040a1c 0%, #071233 55%, #0a1f4d 100%)" }}>
        <div className="absolute left-0 top-0 h-64 w-64 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #4d8dff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full border border-blue-400/25" style={{ boxShadow: "0 0 80px rgba(59,130,246,0.25), inset 0 0 80px rgba(59,130,246,0.1)" }} />
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-100">
                <Sparkles size={11} className="text-orange-300" /> {s.heroBadge}
              </div>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                {s.heroH1a}<br />
                <span style={{ background: ORANGE_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.heroAccent}</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
                {s.heroSub}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(255,107,74,0.35)] transition-opacity hover:opacity-90" style={{ background: ORANGE_GRADIENT }}>
                  {s.ctaStart} <ArrowRight size={16} />
                </Link>
                <Link href="/priser" className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400/40 px-7 py-3.5 text-sm font-medium text-white hover:bg-blue-500/10 transition-colors">
                  {s.ctaPricing}
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6">
                {heroStats.map((st) => (
                  <div key={st.label} className="flex items-center gap-2">
                    <st.icon size={15} className="text-orange-300" />
                    <div>
                      <p className="text-sm font-bold text-white">{st.val}</p>
                      <p className="text-[11px] text-slate-400">{st.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-6 rounded-[2rem] bg-blue-500/20 blur-3xl" />
                <div className="relative">
                  <WorkflowDemo t={t} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 1: Paste a property link or upload photos ── */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
              <Link2 size={12} /> {s.howBadge}
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">{s.howH2}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              {s.howSub}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {s.steps.map((step, i) => (
              <Step key={i} n={s.howStepLabel(i + 1)} icon={stepIcons[i]} title={step.title} desc={step.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── AI creates stunning videos ── */}
      <section className="relative overflow-hidden py-24" style={{ background: "linear-gradient(160deg, #040a1c 0%, #0a1f4d 50%, #040a1c 100%)" }}>
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: "radial-gradient(circle, #FF6B4A, transparent 70%)" }} />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-400">
                <Video size={12} /> {s.aiBadge}
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">{s.aiH2}</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                {s.aiP}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {s.aiList.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-orange-500/10 blur-3xl" />
              {/* Video generation panel mirroring the product dashboard */}
              <div className="relative rounded-2xl border border-blue-400/30 p-5" style={{ background: "#0a1430", boxShadow: "0 0 50px rgba(59,130,246,0.2)" }}>
                <div className="mb-4 flex items-center gap-2">
                  <Video size={16} className="text-orange-400" />
                  <span className="font-semibold text-white">{s.aiPanelTitle}</span>
                </div>
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {[
                    { icon: Link2, label: s.aiPanelSteps[0], done: true },
                    { icon: Sparkles, label: s.aiPanelSteps[1], done: true, active: true },
                    { icon: CheckCircle2, label: s.aiPanelSteps[2], done: false },
                  ].map((st) => (
                    <div key={st.label} className="flex flex-col items-center gap-1.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ background: st.active ? ORANGE_GRADIENT : st.done ? "#2563eb" : "rgba(255,255,255,0.08)" }}>
                        <st.icon size={15} />
                      </div>
                      <span className="text-[10px] text-slate-400">{st.label}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-300">{s.aiPanelCreating}</p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: "75%", background: "linear-gradient(90deg, #4d8dff, #22d3ee)" }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{s.aiPanelProcessing}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── User-friendly dashboard ── */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
            <LayoutDashboard size={12} /> {s.dashBadge}
          </span>
          <h2 className="text-3xl font-bold text-white md:text-4xl">{s.dashH2}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            {s.dashSub}
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {s.dashCards.map((c, i) => (
              <BenefitCard key={i} icon={DASH_ICONS[i]} title={c.title} desc={c.desc} accent={CARD_ACCENTS[i]} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Automatic sharing to socials ── */}
      <section className="relative overflow-hidden py-24" style={{ background: "#071130" }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300">
              <Share2 size={12} /> {s.socialsBadge}
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">{s.socialsH2}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              {s.socialsSub}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SOCIALS.map((soc) => (
              <div key={soc.name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: soc.color }}>
                  {soc.letter}
                </div>
                <span className="flex-1 text-sm font-medium text-white">{soc.name}</span>
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Downloads ── */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
                <Download size={12} /> {s.dlBadge}
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">{s.dlH2}</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                {s.dlP}
              </p>
              <Link href="/signup" className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #1e4f9a, #4d8dff)" }}>
                {s.ctaStartShort} <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { ratio: "9:16", use: s.dlFormats[0], box: "aspect-[9/16]" },
                { ratio: "1:1", use: s.dlFormats[1], box: "aspect-square" },
                { ratio: "16:9", use: s.dlFormats[2], box: "aspect-video" },
              ].map((f) => (
                <div key={f.ratio} className="flex flex-col items-center gap-2">
                  <div className={`w-full ${f.box} flex items-center justify-center rounded-xl border border-blue-400/30 bg-white/[0.04]`} style={{ boxShadow: "0 0 18px rgba(59,130,246,0.12)" }}>
                    <Play size={18} className="text-blue-300" fill="currentColor" />
                  </div>
                  <p className="text-sm font-bold text-white">{f.ratio}</p>
                  <p className="text-[11px] text-slate-400">{f.use}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why choose (benefits) ── */}
      <section className="py-24" style={{ background: "#071130" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">{s.whyH2}</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">{s.whySub}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {s.whyCards.map((c, i) => (
              <BenefitCard key={i} icon={WHY_ICONS[i]} title={c.title} desc={c.desc} accent={WHY_ACCENTS[i]} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">{s.faqH2}</h2>
            <p className="mt-3 text-slate-400">{s.faqSub}</p>
          </div>
          <div className="flex flex-col gap-3">
            {faqItems.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-white marker:content-none">
                  {f.q}
                  <span className="shrink-0 text-blue-300 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-20 text-white" style={{ background: "linear-gradient(135deg, #040a1c 0%, #0a1f4d 100%)" }}>
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-blue-400/20" style={{ boxShadow: "0 0 60px rgba(59,130,246,0.2)" }} />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{s.finalH2}</h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-300">
            {s.finalSub(prices)}
          </p>
          <Link href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-[0_0_35px_rgba(255,107,74,0.4)] transition-opacity hover:opacity-90" style={{ background: ORANGE_GRADIENT }}>
            {s.ctaStart} <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            {s.finalReadMorePre}<Link href="/blog" className="text-blue-300 underline-offset-2 hover:underline">{s.finalBlog}</Link>{s.finalMid}<Link href="/priser" className="text-blue-300 underline-offset-2 hover:underline">{s.finalPricing}</Link>.
          </p>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </div>
  );
}
