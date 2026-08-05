import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, CreditCard, Video, Wand2, Share2, Crown, Gift } from "lucide-react";
import { getCurrency, getLocale } from "@/lib/locale-server";
import { formatPrice, formatPriceKey, PLAN_POST_CREDITS, PLAN_INCLUDED_VIDEOS } from "@/lib/currency";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DemoVideoPhone } from "@/components/demo-video-phone";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Priser — SOME VIDEO POST | Gratis, Basic & Pro plan",
  description:
    "Gratis at oprette konto. Basic for €20/md. giver 10 AI-opslag med direkte deling og automation. Pro for €99/md. inkluderer 2 videoer og 20 opslag. Præsentationsvideoer koster €20 pr. styk. Ingen binding.",
  keywords:
    "somevideopost priser, AI video pris, gratis plan, basic plan, pro plan, sociale medier udlejning, præsentationsvideo pris",
  alternates: { canonical: "https://www.somevideopost.com/priser" },
  openGraph: {
    title: "Priser — SOME VIDEO POST | Gratis, Basic & Pro",
    description:
      "Gratis at oprette konto. Basic €20/md. (10 opslag), Pro €99/md. (2 videoer + 20 opslag), og €20 pr. præsentationsvideo. Ingen binding.",
    type: "website",
    siteName: "somevideopost.com",
    url: "https://www.somevideopost.com/priser",
  },
};

const ORANGE_GRADIENT = "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)";

// Prices passed into the localized copy (currency-aware).
type P = { basic: string; pro: string; video: string; post: string; metaAds: string; basicN: number; proN: number; proVid: number };

type Faq = { q: string; a: string };
type Strings = {
  heroBadge: string; heroTitle: string; heroSub: (p: P) => React.ReactNode;
  perMonth: string; billedNote: string; mostPopular: string;
  freeBadge: string; freeNote: string; freeDesc: string; freeItems: (p: P) => string[]; freeBtn: string;
  basicDesc: string; basicItems: (p: P) => React.ReactNode[]; basicBtn: string;
  proDesc: string; proItems: (p: P) => React.ReactNode[]; proBtn: string;
  videoBannerTitle: (p: P) => string; videoBannerBody: (p: P) => string; videoBannerBtn: string;
  howTitle: string; how: (p: P) => { title: string; desc: string }[];
  faqTitle: string; faq: (p: P) => Faq[];
  demoBadge: string; demoTitle: string; demoBody: string; demoItems: string[];
  ctaTitle: string; ctaBody: string; ctaBtn: string; ctaContact: string;
};

const bold = (s: React.ReactNode) => <strong className="text-white">{s}</strong>;

const STRINGS: Record<Locale, Strings> = {
  da: {
    heroBadge: "Enkel, gennemsigtig pris", heroTitle: "Gratis at starte — betal, når du vokser",
    heroSub: (p) => <>Opret konto gratis. Vælg {bold("Basic")} for {p.basic}/md. med {p.basicN} AI-opslag, direkte deling og automation — eller {bold("Pro")} for {p.pro}/md. med {p.proVid} videoer og {p.proN} opslag. Ekstra præsentationsvideoer koster {p.video}/stk. Ingen binding.</>,
    perMonth: "/md.", billedNote: "Faktureres månedligt · ingen binding", mostPopular: "Mest populær",
    freeBadge: "Gratis", freeNote: "Gratis at oprette konto", freeDesc: "Kom i gang uden kort. Udforsk studiet og se, hvordan AI laver opslag og videoer.",
    freeItems: (p) => ["Opret konto og udforsk dashboardet", "Se demoer af opslag og præsentationsvideo", `Køb enkelte AI-opslag (${p.post}/opslag) eller videoer (${p.video}/stk.)`, "Opgradér til Basic eller Pro når som helst"], freeBtn: "Opret gratis konto",
    basicDesc: "Til dig, der laver opslag jævnligt og vil dele og automatisere direkte.",
    basicItems: (p) => [<>{bold(`${p.basicN} SoMe-opslag`)} (tekst + billede) hver måned</>, "Del direkte på Facebook & Instagram", "Automation & planlægning af opslag", `Præsentationsvideoer for ${p.video}/stk.`, `Meta-annoncering som tilkøb (${p.metaAds}/md.)`, "Alle studie-værktøjer og downloads"], basicBtn: "Vælg Basic",
    proDesc: "Til dig, der vil have videoer inkluderet og maksimal rækkevidde hver måned.",
    proItems: (p) => [<>{bold(`${p.proVid} præsentationsvideoer`)} inkluderet hver måned</>, <>{bold(`${p.proN} SoMe-opslag`)} (tekst + billede) hver måned</>, <>{bold("Meta-annoncering inkluderet")} (Marketing API)</>, "Del direkte på alle sociale medier", "Automation, planlægning & prioriteret support", `Ekstra videoer for ${p.video}/stk.`], proBtn: "Vælg Pro",
    videoBannerTitle: (p) => `Præsentationsvideo — ${p.video}/stk.`, videoBannerBody: (p) => `Betal pr. brug på Free & Basic. Inkluderet på Pro (${p.proVid}/md.). Se forhåndsvisning, betal først når du er tilfreds.`, videoBannerBtn: "Opret en video",
    howTitle: "Sådan fungerer det",
    how: (p) => [{ title: "1 · Opret konto & vælg plan", desc: `Opret gratis. Vælg Basic (${p.basic}/md., ${p.basicN} opslag) eller Pro (${p.pro}/md., ${p.proVid} videoer + ${p.proN} opslag).` }, { title: "2 · Lav opslag og videoer", desc: `Generér opslag inkluderet i din plan, og lav ekstra præsentationsvideoer for ${p.video}/stk. efter behov.` }, { title: "3 · Del direkte", desc: "Del opslag og videoer direkte på Facebook og Instagram fra dashboardet." }],
    faqTitle: "Ofte stillede spørgsmål",
    faq: (p) => [
      { q: "Hvad er forskellen på Free, Basic og Pro?", a: `Det er gratis at oprette konto (Free). Basic koster ${p.basic}/md. og giver ${p.basicN} AI-opslag om måneden med direkte deling og automation. Pro koster ${p.pro}/md. og inkluderer ${p.proVid} præsentationsvideoer og ${p.proN} opslag om måneden.` },
      { q: "Hvad koster en præsentationsvideo?", a: `En præsentationsvideo koster ${p.video} pr. styk på Free og Basic. På Pro er ${p.proVid} videoer inkluderet hver måned, og ekstra videoer koster ${p.video}/stk.` },
      { q: "Hvornår betaler jeg for en video?", a: "Du kan se en forhåndsvisning, mens videoen bygges, og betaler først, når du vil låse den fulde video op til download og deling. Uploadede videoer koster ingenting." },
      { q: "Kan jeg dele direkte på sociale medier?", a: "Ja. Med Basic og Pro deler du opslag og videoer direkte på Facebook og Instagram fra dashboardet — og automatiserer opslag på det bedste tidspunkt." },
      { q: "Hvad sker der, når mine månedlige opslag er brugt?", a: `Basic giver ${p.basicN} og Pro ${p.proN} AI-opslag om måneden. Saldoen fyldes automatisk op hver måned, så længe dit abonnement er aktivt — og du kan altid tilkøbe ekstra opslag.` },
      { q: "Er der binding?", a: "Nej. Basic og Pro er månedlige uden binding, og du kan opsige når som helst. Videoer på Free og Basic betaler du kun for, når du bruger dem." },
    ],
    demoBadge: "Live demo", demoTitle: "Se hvad en præsentationsvideo indeholder", demoBody: "Sådan ser en AI-genereret præsentationsvideo ud. Indsæt et link til din annonce — AI'en henter billederne, bygger fotoruten og leverer en cinematisk video i 9:16 til Reels & TikTok.", demoItems: ["Cinematiske kamerabevægelser gennem hvert rum", "Musik, overgange og undertekster tilføjes automatisk", "Klar på under 5 minutter"],
    ctaTitle: "Klar til at komme i gang?", ctaBody: "Kom i gang med somevideopost.com i dag. Ingen binding.", ctaBtn: "Opret konto", ctaContact: "Kontakt salg",
  },
  en: {
    heroBadge: "Simple, transparent pricing", heroTitle: "Free to start — pay as you grow",
    heroSub: (p) => <>Create an account for free. Choose {bold("Basic")} for {p.basic}/mo with {p.basicN} AI posts, direct sharing and automation — or {bold("Pro")} for {p.pro}/mo with {p.proVid} videos and {p.proN} posts. Extra presentation videos cost {p.video} each. No commitment.</>,
    perMonth: "/mo", billedNote: "Billed monthly · no commitment", mostPopular: "Most popular",
    freeBadge: "Free", freeNote: "Free to create an account", freeDesc: "Get started without a card. Explore the studio and see how AI makes posts and videos.",
    freeItems: (p) => ["Create an account and explore the dashboard", "See demos of posts and a presentation video", `Buy individual AI posts (${p.post}/post) or videos (${p.video} each)`, "Upgrade to Basic or Pro anytime"], freeBtn: "Create free account",
    basicDesc: "For you who post regularly and want to share and automate directly.",
    basicItems: (p) => [<>{bold(`${p.basicN} social posts`)} (text + image) every month</>, "Share directly to Facebook & Instagram", "Automation & scheduling of posts", `Presentation videos for ${p.video} each`, `Meta advertising as an add-on (${p.metaAds}/mo)`, "All studio tools and downloads"], basicBtn: "Choose Basic",
    proDesc: "For you who want videos included and maximum reach every month.",
    proItems: (p) => [<>{bold(`${p.proVid} presentation videos`)} included every month</>, <>{bold(`${p.proN} social posts`)} (text + image) every month</>, <>{bold("Meta advertising included")} (Marketing API)</>, "Share directly to all social media", "Automation, scheduling & priority support", `Extra videos for ${p.video} each`], proBtn: "Choose Pro",
    videoBannerTitle: (p) => `Presentation video — ${p.video} each`, videoBannerBody: (p) => `Pay per use on Free & Basic. Included on Pro (${p.proVid}/mo). Preview it, pay only when you're happy.`, videoBannerBtn: "Create a video",
    howTitle: "How it works",
    how: (p) => [{ title: "1 · Create account & choose plan", desc: `Sign up free. Choose Basic (${p.basic}/mo, ${p.basicN} posts) or Pro (${p.pro}/mo, ${p.proVid} videos + ${p.proN} posts).` }, { title: "2 · Make posts and videos", desc: `Generate posts included in your plan, and make extra presentation videos for ${p.video} each as needed.` }, { title: "3 · Share directly", desc: "Share posts and videos directly to Facebook and Instagram from the dashboard." }],
    faqTitle: "Frequently asked questions",
    faq: (p) => [
      { q: "What's the difference between Free, Basic and Pro?", a: `Creating an account is free (Free). Basic costs ${p.basic}/mo and gives ${p.basicN} AI posts a month with direct sharing and automation. Pro costs ${p.pro}/mo and includes ${p.proVid} presentation videos and ${p.proN} posts a month.` },
      { q: "What does a presentation video cost?", a: `A presentation video costs ${p.video} each on Free and Basic. On Pro, ${p.proVid} videos are included every month, and extra videos cost ${p.video} each.` },
      { q: "When do I pay for a video?", a: "You can preview the video while it's being built and only pay when you want to unlock the full video for download and sharing. Uploaded videos are free." },
      { q: "Can I share directly to social media?", a: "Yes. With Basic and Pro you share posts and videos directly to Facebook and Instagram from the dashboard — and automate posting at the best time." },
      { q: "What happens when my monthly posts run out?", a: `Basic gives ${p.basicN} and Pro ${p.proN} AI posts a month. The balance tops up automatically each month while your subscription is active — and you can always buy extra posts.` },
      { q: "Is there a commitment?", a: "No. Basic and Pro are monthly with no commitment, and you can cancel anytime. Videos on Free and Basic you only pay for when you use them." },
    ],
    demoBadge: "Live demo", demoTitle: "See what a presentation video contains", demoBody: "This is what an AI-generated presentation video looks like. Paste a link to your listing — AI fetches the photos, builds the photo route and delivers a cinematic 9:16 video for Reels & TikTok.", demoItems: ["Cinematic camera moves through every room", "Music, transitions and subtitles added automatically", "Ready in under 5 minutes"],
    ctaTitle: "Ready to get started?", ctaBody: "Get started with somevideopost.com today. No commitment.", ctaBtn: "Create account", ctaContact: "Contact sales",
  },
  es: {
    heroBadge: "Precios simples y transparentes", heroTitle: "Gratis para empezar — paga a medida que creces",
    heroSub: (p) => <>Crea una cuenta gratis. Elige {bold("Basic")} por {p.basic}/mes con {p.basicN} publicaciones IA, compartir directo y automatización — o {bold("Pro")} por {p.pro}/mes con {p.proVid} vídeos y {p.proN} publicaciones. Los vídeos de presentación extra cuestan {p.video} cada uno. Sin compromiso.</>,
    perMonth: "/mes", billedNote: "Facturación mensual · sin compromiso", mostPopular: "Más popular",
    freeBadge: "Gratis", freeNote: "Crear una cuenta es gratis", freeDesc: "Empieza sin tarjeta. Explora el estudio y ve cómo la IA crea publicaciones y vídeos.",
    freeItems: (p) => ["Crea una cuenta y explora el panel", "Ve demos de publicaciones y un vídeo de presentación", `Compra publicaciones IA sueltas (${p.post}/publicación) o vídeos (${p.video} c/u)`, "Mejora a Basic o Pro cuando quieras"], freeBtn: "Crear cuenta gratis",
    basicDesc: "Para ti, que publicas con regularidad y quieres compartir y automatizar directamente.",
    basicItems: (p) => [<>{bold(`${p.basicN} publicaciones`)} (texto + imagen) al mes</>, "Comparte directo en Facebook e Instagram", "Automatización y programación de publicaciones", `Vídeos de presentación por ${p.video} c/u`, `Publicidad en Meta como extra (${p.metaAds}/mes)`, "Todas las herramientas y descargas"], basicBtn: "Elegir Basic",
    proDesc: "Para ti, que quieres vídeos incluidos y máximo alcance cada mes.",
    proItems: (p) => [<>{bold(`${p.proVid} vídeos de presentación`)} incluidos cada mes</>, <>{bold(`${p.proN} publicaciones`)} (texto + imagen) al mes</>, <>{bold("Publicidad en Meta incluida")} (Marketing API)</>, "Comparte directo en todas las redes", "Automatización, programación y soporte prioritario", `Vídeos extra por ${p.video} c/u`], proBtn: "Elegir Pro",
    videoBannerTitle: (p) => `Vídeo de presentación — ${p.video} c/u`, videoBannerBody: (p) => `Pago por uso en Free y Basic. Incluido en Pro (${p.proVid}/mes). Míralo en vista previa y paga solo cuando estés satisfecho.`, videoBannerBtn: "Crear un vídeo",
    howTitle: "Cómo funciona",
    how: (p) => [{ title: "1 · Crea cuenta y elige plan", desc: `Regístrate gratis. Elige Basic (${p.basic}/mes, ${p.basicN} publicaciones) o Pro (${p.pro}/mes, ${p.proVid} vídeos + ${p.proN} publicaciones).` }, { title: "2 · Crea publicaciones y vídeos", desc: `Genera las publicaciones incluidas en tu plan y crea vídeos de presentación extra por ${p.video} c/u según necesites.` }, { title: "3 · Comparte directo", desc: "Comparte publicaciones y vídeos directamente en Facebook e Instagram desde el panel." }],
    faqTitle: "Preguntas frecuentes",
    faq: (p) => [
      { q: "¿Cuál es la diferencia entre Free, Basic y Pro?", a: `Crear una cuenta es gratis (Free). Basic cuesta ${p.basic}/mes y da ${p.basicN} publicaciones IA al mes con compartir directo y automatización. Pro cuesta ${p.pro}/mes e incluye ${p.proVid} vídeos de presentación y ${p.proN} publicaciones al mes.` },
      { q: "¿Cuánto cuesta un vídeo de presentación?", a: `Un vídeo de presentación cuesta ${p.video} c/u en Free y Basic. En Pro se incluyen ${p.proVid} vídeos al mes, y los extra cuestan ${p.video} c/u.` },
      { q: "¿Cuándo pago por un vídeo?", a: "Puedes ver una vista previa mientras se crea y solo pagas cuando quieres desbloquear el vídeo completo para descargar y compartir. Los vídeos subidos son gratis." },
      { q: "¿Puedo compartir directamente en redes sociales?", a: "Sí. Con Basic y Pro compartes publicaciones y vídeos directamente en Facebook e Instagram desde el panel — y automatizas la publicación en el mejor momento." },
      { q: "¿Qué pasa cuando se acaban mis publicaciones del mes?", a: `Basic da ${p.basicN} y Pro ${p.proN} publicaciones IA al mes. El saldo se recarga automáticamente cada mes mientras tu suscripción esté activa — y siempre puedes comprar publicaciones extra.` },
      { q: "¿Hay permanencia?", a: "No. Basic y Pro son mensuales sin permanencia, y puedes cancelar cuando quieras. Los vídeos en Free y Basic solo los pagas cuando los usas." },
    ],
    demoBadge: "Demo en vivo", demoTitle: "Mira qué incluye un vídeo de presentación", demoBody: "Así se ve un vídeo de presentación generado por IA. Pega un enlace de tu anuncio — la IA obtiene las fotos, crea la ruta y entrega un vídeo cinematográfico 9:16 para Reels y TikTok.", demoItems: ["Movimientos de cámara cinematográficos por cada habitación", "Música, transiciones y subtítulos añadidos automáticamente", "Listo en menos de 5 minutos"],
    ctaTitle: "¿Listo para empezar?", ctaBody: "Empieza con somevideopost.com hoy. Sin compromiso.", ctaBtn: "Crear cuenta", ctaContact: "Contactar ventas",
  },
  de: {
    heroBadge: "Einfache, transparente Preise", heroTitle: "Kostenlos starten — bezahle, wenn du wächst",
    heroSub: (p) => <>Erstelle kostenlos ein Konto. Wähle {bold("Basic")} für {p.basic}/Mon. mit {p.basicN} KI-Beiträgen, direktem Teilen und Automatisierung — oder {bold("Pro")} für {p.pro}/Mon. mit {p.proVid} Videos und {p.proN} Beiträgen. Zusätzliche Präsentationsvideos kosten je {p.video}. Keine Bindung.</>,
    perMonth: "/Mon.", billedNote: "Monatliche Abrechnung · keine Bindung", mostPopular: "Am beliebtesten",
    freeBadge: "Kostenlos", freeNote: "Kostenlos ein Konto erstellen", freeDesc: "Ohne Karte loslegen. Erkunde das Studio und sieh, wie die KI Beiträge und Videos erstellt.",
    freeItems: (p) => ["Konto erstellen und Dashboard erkunden", "Demos von Beiträgen und einem Präsentationsvideo ansehen", `Einzelne KI-Beiträge (${p.post}/Beitrag) oder Videos (je ${p.video}) kaufen`, "Jederzeit auf Basic oder Pro upgraden"], freeBtn: "Kostenloses Konto erstellen",
    basicDesc: "Für dich, der regelmäßig postet und direkt teilen und automatisieren will.",
    basicItems: (p) => [<>{bold(`${p.basicN} Social-Beiträge`)} (Text + Bild) pro Monat</>, "Direkt auf Facebook & Instagram teilen", "Automatisierung & Planung von Beiträgen", `Präsentationsvideos für je ${p.video}`, `Meta-Werbung als Zusatz (${p.metaAds}/Mon.)`, "Alle Studio-Tools und Downloads"], basicBtn: "Basic wählen",
    proDesc: "Für dich, der Videos inklusive und maximale Reichweite jeden Monat will.",
    proItems: (p) => [<>{bold(`${p.proVid} Präsentationsvideos`)} jeden Monat inklusive</>, <>{bold(`${p.proN} Social-Beiträge`)} (Text + Bild) pro Monat</>, <>{bold("Meta-Werbung inklusive")} (Marketing API)</>, "Direkt auf allen sozialen Medien teilen", "Automatisierung, Planung & priorisierter Support", `Zusätzliche Videos für je ${p.video}`], proBtn: "Pro wählen",
    videoBannerTitle: (p) => `Präsentationsvideo — je ${p.video}`, videoBannerBody: (p) => `Bezahlung pro Nutzung bei Free & Basic. Inklusive bei Pro (${p.proVid}/Mon.). Vorschau ansehen, erst zahlen, wenn du zufrieden bist.`, videoBannerBtn: "Video erstellen",
    howTitle: "So funktioniert es",
    how: (p) => [{ title: "1 · Konto erstellen & Plan wählen", desc: `Kostenlos registrieren. Wähle Basic (${p.basic}/Mon., ${p.basicN} Beiträge) oder Pro (${p.pro}/Mon., ${p.proVid} Videos + ${p.proN} Beiträge).` }, { title: "2 · Beiträge und Videos erstellen", desc: `Erstelle die in deinem Plan enthaltenen Beiträge und zusätzliche Präsentationsvideos für je ${p.video} nach Bedarf.` }, { title: "3 · Direkt teilen", desc: "Teile Beiträge und Videos direkt auf Facebook und Instagram über das Dashboard." }],
    faqTitle: "Häufige Fragen",
    faq: (p) => [
      { q: "Was ist der Unterschied zwischen Free, Basic und Pro?", a: `Ein Konto zu erstellen ist kostenlos (Free). Basic kostet ${p.basic}/Mon. und bietet ${p.basicN} KI-Beiträge pro Monat mit direktem Teilen und Automatisierung. Pro kostet ${p.pro}/Mon. und enthält ${p.proVid} Präsentationsvideos und ${p.proN} Beiträge pro Monat.` },
      { q: "Was kostet ein Präsentationsvideo?", a: `Ein Präsentationsvideo kostet bei Free und Basic je ${p.video}. Bei Pro sind ${p.proVid} Videos pro Monat inklusive, zusätzliche kosten je ${p.video}.` },
      { q: "Wann zahle ich für ein Video?", a: "Du kannst das Video während der Erstellung als Vorschau ansehen und zahlst erst, wenn du das vollständige Video zum Herunterladen und Teilen freischalten möchtest. Hochgeladene Videos sind kostenlos." },
      { q: "Kann ich direkt in sozialen Medien teilen?", a: "Ja. Mit Basic und Pro teilst du Beiträge und Videos direkt auf Facebook und Instagram über das Dashboard — und automatisierst das Posten zur besten Zeit." },
      { q: "Was passiert, wenn meine monatlichen Beiträge aufgebraucht sind?", a: `Basic bietet ${p.basicN} und Pro ${p.proN} KI-Beiträge pro Monat. Das Guthaben wird automatisch jeden Monat aufgefüllt, solange dein Abo aktiv ist — und du kannst jederzeit zusätzliche Beiträge kaufen.` },
      { q: "Gibt es eine Bindung?", a: "Nein. Basic und Pro sind monatlich ohne Bindung, und du kannst jederzeit kündigen. Videos bei Free und Basic zahlst du nur, wenn du sie nutzt." },
    ],
    demoBadge: "Live-Demo", demoTitle: "Sieh, was ein Präsentationsvideo enthält", demoBody: "So sieht ein KI-generiertes Präsentationsvideo aus. Füge einen Link zu deiner Anzeige ein — die KI holt die Fotos, baut die Fotoroute und liefert ein kinematisches 9:16-Video für Reels & TikTok.", demoItems: ["Kinematische Kamerabewegungen durch jeden Raum", "Musik, Übergänge und Untertitel automatisch hinzugefügt", "Fertig in unter 5 Minuten"],
    ctaTitle: "Bereit loszulegen?", ctaBody: "Starte noch heute mit somevideopost.com. Keine Bindung.", ctaBtn: "Konto erstellen", ctaContact: "Vertrieb kontaktieren",
  },
};

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-slate-300">
      <Check size={14} className="mt-0.5 shrink-0 text-emerald-400" strokeWidth={2.5} />
      <span>{children}</span>
    </li>
  );
}

export default async function PriserPage() {
  const [currency, locale] = await Promise.all([getCurrency(), getLocale()]);
  const t = STRINGS[locale] ?? STRINGS.da;
  const p: P = {
    basic: formatPriceKey("basic", currency),
    pro: formatPriceKey("pro", currency),
    video: formatPriceKey("video", currency),
    post: formatPriceKey("aiPost", currency, { decimals: true }),
    metaAds: formatPriceKey("metaAds", currency),
    basicN: PLAN_POST_CREDITS.basic,
    proN: PLAN_POST_CREDITS.pro,
    proVid: PLAN_INCLUDED_VIDEOS.pro,
  };

  return (
    <div className="min-h-screen text-slate-100" style={{ background: "#050d24" }}>
      <SiteHeader active="pricing" locale={locale} />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5" style={{ background: "linear-gradient(135deg, #040a1c 0%, #071233 55%, #0a1f4d 100%)" }}>
        <div className="absolute left-0 top-0 h-64 w-64 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #4d8dff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-blue-400/20" style={{ boxShadow: "0 0 80px rgba(59,130,246,0.2)" }} />
        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-200">
            <CreditCard size={13} /> {t.heroBadge}
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">{t.heroTitle}</h1>
          <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">{t.heroSub(p)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 space-y-16">

        {/* Pricing cards — Free / Basic / Pro */}
        <div className="grid items-stretch gap-6 md:grid-cols-3">

          {/* Free */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-300">
              <Gift size={12} /> {t.freeBadge}
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{formatPrice(0, currency)}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{t.freeNote}</p>
            <p className="mt-3 text-sm text-slate-300">{t.freeDesc}</p>
            <ul className="my-6 flex flex-1 flex-col gap-2.5">
              {t.freeItems(p).map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
            </ul>
            <div className="mt-auto">
              <Link href="/signup" className="block w-full rounded-xl border border-white/20 py-3 text-center text-sm font-bold text-white transition hover:bg-white/10">
                {t.freeBtn}
              </Link>
            </div>
          </div>

          {/* Basic — most popular */}
          <div className="relative flex flex-col rounded-2xl border border-blue-400/50 bg-white/[0.05] p-8 shadow-[0_0_45px_rgba(59,130,246,0.25)] backdrop-blur-sm">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">{t.mostPopular}</span>
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
              <Sparkles size={12} /> Basic
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{p.basic}</span>
              <span className="text-slate-400 text-sm">{t.perMonth}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{t.billedNote}</p>
            <p className="mt-3 text-sm text-slate-300">{t.basicDesc}</p>
            <ul className="my-6 flex flex-1 flex-col gap-2.5">
              {t.basicItems(p).map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
            </ul>
            <div className="mt-auto">
              <Link href="/signup" className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, #1e4f9a, #4d8dff)" }}>
                {t.basicBtn}
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="flex flex-col rounded-2xl border border-orange-500/40 bg-orange-500/[0.06] p-8 backdrop-blur-sm">
            <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-500/15 px-2.5 py-1 text-xs font-semibold text-orange-400">
              <Crown size={12} /> Pro
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">{p.pro}</span>
              <span className="text-slate-400 text-sm">{t.perMonth}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{t.billedNote}</p>
            <p className="mt-3 text-sm text-slate-300">{t.proDesc}</p>
            <ul className="my-6 flex flex-1 flex-col gap-2.5">
              {t.proItems(p).map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
            </ul>
            <div className="mt-auto">
              <Link href="/signup" className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: ORANGE_GRADIENT }}>
                {t.proBtn}
              </Link>
            </div>
          </div>
        </div>

        {/* Pay-per-use video banner */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-orange-500/25 bg-orange-500/[0.06] p-6 backdrop-blur-sm sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
              <Video size={22} className="text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-white">{t.videoBannerTitle(p)}</p>
              <p className="text-sm text-slate-400">{t.videoBannerBody(p)}</p>
            </div>
          </div>
          <Link href="/videos/new" className="whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: ORANGE_GRADIENT }}>
            {t.videoBannerBtn}
          </Link>
        </div>

        {/* How it works */}
        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-6 md:p-8 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-6">{t.howTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {t.how(p).map((step, i) => {
              const Icon = [Sparkles, Wand2, Share2][i];
              return (
                <div key={step.title} className="flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                    <Icon size={20} className="text-blue-300" />
                  </div>
                  <p className="text-sm font-bold text-white">{step.title}</p>
                  <p className="text-sm leading-relaxed text-slate-400">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white mb-6">{t.faqTitle}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {t.faq(p).map((item) => (
              <div key={item.q}>
                <p className="font-semibold text-white mb-1">{item.q}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live video demo */}
        <div className="overflow-hidden rounded-2xl border border-white/10 p-8 md:p-12 text-white" style={{ background: "linear-gradient(160deg, #040a1c 0%, #0a1f4d 50%, #040a1c 100%)" }}>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-400">{t.demoBadge}</span>
              <h2 className="text-2xl font-bold mb-3">{t.demoTitle}</h2>
              <p className="text-sm leading-relaxed text-slate-300 mb-5 max-w-md">{t.demoBody}</p>
              <ul className="flex flex-col gap-2 text-sm text-slate-300">
                {t.demoItems.map((d) => <CheckItem key={d}><span className="text-slate-300">{d}</span></CheckItem>)}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[300px]">
                <div className="absolute inset-0 scale-90 rounded-[2.5rem] opacity-40 blur-2xl" style={{ background: ORANGE_GRADIENT }} />
                <div className="relative">
                  <DemoVideoPhone />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 text-white text-center" style={{ background: "linear-gradient(135deg, #040a1c 0%, #0a1f4d 100%)" }}>
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-blue-400/20" style={{ boxShadow: "0 0 60px rgba(59,130,246,0.2)" }} />
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2">{t.ctaTitle}</h2>
            <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">{t.ctaBody}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup" className="rounded-xl px-6 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(255,107,74,0.35)] transition-opacity hover:opacity-90" style={{ background: ORANGE_GRADIENT }}>
                {t.ctaBtn}
              </Link>
              <a href="mailto:mail@somevideopost.com" className="rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition">
                {t.ctaContact}
              </a>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter locale={locale} />
    </div>
  );
}
