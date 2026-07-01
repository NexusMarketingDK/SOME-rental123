export type Locale = "da" | "en" | "es" | "de";

export const LOCALES: Locale[] = ["da", "en", "es", "de"];

export const LOCALE_LABELS: Record<Locale, string> = {
  da: "Dansk",
  en: "English",
  es: "Español",
  de: "Deutsch",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  da: "🇩🇰",
  en: "🇬🇧",
  es: "🇪🇸",
  de: "🇩🇪",
};

export const LOCALE_PATHS: Record<Locale, string> = {
  da: "/",
  en: "/en",
  es: "/es",
  de: "/de",
};

// ── App UI (sidebar & common) ──────────────────────────────────────────────
export const APP_LABELS: Record<Locale, {
  home: string; create: string; schedule: string; channels: string;
  videos: string; properties: string; analytics: string; billing: string;
  settings: string; newPost: string; connectChannel: string; freePlan: string;
  logOut: string; language: string;
}> = {
  da: {
    home: "Hjem", create: "Opret", schedule: "Planlæg", channels: "Kanaler",
    videos: "Videoer", properties: "Boliger", analytics: "Analytics",
    billing: "Fakturering", settings: "Indstillinger", newPost: "Nyt opslag",
    connectChannel: "Tilslut kanal", freePlan: "Free Plan", logOut: "Log ud",
    language: "Sprog",
  },
  en: {
    home: "Home", create: "Create", schedule: "Schedule", channels: "Channels",
    videos: "Videos", properties: "Properties", analytics: "Analytics",
    billing: "Billing", settings: "Settings", newPost: "New post",
    connectChannel: "Connect channel", freePlan: "Free Plan", logOut: "Log out",
    language: "Language",
  },
  es: {
    home: "Inicio", create: "Crear", schedule: "Planificar", channels: "Canales",
    videos: "Vídeos", properties: "Propiedades", analytics: "Analíticas",
    billing: "Facturación", settings: "Ajustes", newPost: "Nueva publicación",
    connectChannel: "Conectar canal", freePlan: "Plan gratuito", logOut: "Cerrar sesión",
    language: "Idioma",
  },
  de: {
    home: "Startseite", create: "Erstellen", schedule: "Planen", channels: "Kanäle",
    videos: "Videos", properties: "Immobilien", analytics: "Analytik",
    billing: "Abrechnung", settings: "Einstellungen", newPost: "Neuer Beitrag",
    connectChannel: "Kanal verbinden", freePlan: "Kostenloser Plan", logOut: "Abmelden",
    language: "Sprache",
  },
};

// ── Landing page translations ──────────────────────────────────────────────
export type LandingT = {
  // nav
  navHome: string; navFeatures: string; navVideo: string; navPricing: string;
  navLogin: string; navStart: string;
  // hero
  heroLine1: string; heroLine2: string; heroLine3: string; heroAccent: string;
  heroSub: string; heroCta: string; heroCta2: string; heroNoCard: string;
  stat1Val: string; stat1Label: string;
  stat2Val: string; stat2Label: string;
  stat3Val: string; stat3Label: string;
  // logo bar
  worksWith: string;
  // features
  featTitle: string; featSub: string;
  feat1Title: string; feat1Desc: string;
  feat2Title: string; feat2Desc: string;
  feat3Title: string; feat3Desc: string;
  feat4Title: string; feat4Desc: string;
  feat5Title: string; feat5Desc: string;
  feat6Title: string; feat6Desc: string;
  // AI video
  aiTitle1: string; aiTitle2: string; aiSub: string;
  step1Title: string; step1Desc: string;
  step2Title: string; step2Desc: string;
  step3Title: string; step3Desc: string;
  aiStat1: string; aiStat2: string; aiStat3: string;
  aiFeats: string[];
  aiOnetimeLabel: string; aiOrderBtn: string;
  // how it works
  howTitle: string; howSub: string;
  how1Title: string; how1Desc: string;
  how2Title: string; how2Desc: string;
  how3Title: string; how3Desc: string;
  // testimonials
  testTitle: string; testSub: string;
  test1Name: string; test1Role: string; test1Quote: string;
  test2Name: string; test2Role: string; test2Quote: string;
  test3Name: string; test3Role: string; test3Quote: string;
  // pricing
  priceTitle: string; priceSub: string;
  mostPopular: string;
  plan1Name: string; plan1Items: string[];
  plan2Name: string; plan2Items: string[]; plan2PayLabel: string; plan2StartBtn: string;
  plan3Name: string; plan3Items: string[]; plan3OnetimeLabel: string; plan3OrderBtn: string;
  startFreeBtn: string;
  // cta
  ctaBadge: string; ctaTitle1: string; ctaTitle2: string; ctaSub: string;
  ctaBtn: string; ctaNoCard: string;
  // footer
  footerDesc: string;
  footerProduct: string; footerIntegrations: string; footerSupport: string;
  footerFeatures: string; footerAiVideo: string; footerPricing: string;
  footerCreateAccount: string; footerLogin: string;
  footerTryFree: string; footerNoCard: string; footerStartBtn: string;
  footerPrivacy: string; footerCookies: string; footerTerms: string;
  footerCopyright: string;
  // phone mockup
  mockupLabel: string; mockupSub: string;
};

export const LANDING: Record<Locale, LandingT> = {
  da: {
    navHome: "Hjem", navFeatures: "Funktioner", navVideo: "Video", navPricing: "Priser",
    navLogin: "Log ind", navStart: "Start gratis",
    heroLine1: "Udlej dit", heroLine2: "privatbolig", heroLine3: "", heroAccent: "smartere",
    heroSub: "Vakanza hjælper private udlejere med at markedsføre deres feriebolig — automatisk. AI skaber præsentationsvideoer fra dine billeder, poster til sociale medier og synkroniserer din bookingkalender.",
    heroCta: "Start gratis i dag", heroCta2: "Se priser", heroNoCard: "Intet kreditkort · Gratis at starte",
    stat1Val: "500+", stat1Label: "Aktive udlejere",
    stat2Val: "3×", stat2Label: "Mere engagement",
    stat3Val: "< 15 min", stat3Label: "Video leveret",
    worksWith: "Fungerer med",
    featTitle: "Alt du behøver — samlet ét sted",
    featSub: "Fra Airbnb til TikTok. Vakanza samler det hele, så du kan fokusere på dine gæster.",
    feat1Title: "Virtuel fremvisning via video", feat1Desc: "Upload billeder af din bolig — eller indsæt dit Novasol, Airbnb eller Booking.com link. AI skaber en professionel præsentationsvideo med musik og cinematiske kamerabevægelser på under 15 minutter.",
    feat2Title: "Automatisk opslag på sociale medier", feat2Desc: "Ét klik sender dit indhold til Facebook, Instagram, TikTok og LinkedIn. Vakanza planlægger og poster automatisk på dine valgte tidspunkter.",
    feat3Title: "Synkroniser din bookingkalender", feat3Desc: "Importer din eksisterende kalender fra Airbnb, Booking.com, Novasol eller Google Kalender. Alle bookinger ét sted — altid opdateret.",
    feat4Title: "AI skriver dine opslag", feat4Desc: "Lad AI generere professionelle, engagerende opslag baseret på din bolig og sæson. Vælg tone: familiemæssig, luksus eller last-minute tilbud.",
    feat5Title: "Privatbolig eller feriehus", feat5Desc: "Vakanza er bygget til private udlejere — sommerhus, lejlighed, villa eller studie. Ingen bureaugebyrer, ingen forpligtelser.",
    feat6Title: "Fuldt automatisk autopilot", feat6Desc: "Sæt Vakanza på autopilot og lad AI tage sig af al markedsføring. Du fokuserer på dine gæster — Vakanza tager sig af resten.",
    aiTitle1: "Virtuel fremvisning", aiTitle2: "skabt fra dine billeder",
    aiSub: "Upload billeder af din bolig — eller indsæt et link fra Novasol, Airbnb eller Booking.com. Vakanza henter billederne og skaber en professionel præsentationsvideo med musik og cinematiske bevægelser på under 15 minutter.",
    step1Title: "Indsæt et link eller upload billeder", step1Desc: "Vi henter automatisk billeder og ejendomsinfo fra Novasol, Airbnb, Booking.com — eller upload dine egne billeder direkte.",
    step2Title: "AI skaber din video", step2Desc: "Higgsfield AI sammensætter en smooth præsentationsvideo med cinematiske overgange og stemningsfuld musik.",
    step3Title: "Del på alle platforme", step3Desc: "Download videoen og del den direkte til Instagram Reels, TikTok og Facebook — alt fra én app.",
    aiStat1: "mere engagement", aiStat2: "genereringstid", aiStat3: "Reels & TikTok",
    aiFeats: ["Novasol, Airbnb & Booking.com integration","Upload dine egne billeder","Cinematiske kamerabevægelser","Automatisk baggrundsmusik","Leveret på under 15 minutter","9:16 optimeret til Reels & TikTok"],
    aiOnetimeLabel: "Engangspris", aiOrderBtn: "Bestil video →",
    howTitle: "Klar til brug på 3 minutter", howSub: "Ingen teknisk viden påkrævet",
    how1Title: "Tilføj din bolig", how1Desc: "Upload billeder eller indsæt dit Novasol, Airbnb eller Booking.com link. Synkroniser din eksisterende bookingkalender automatisk.",
    how2Title: "AI laver din præsentationsvideo", how2Desc: "Vakanza laver en professionel virtuel fremvisning med musik og cinematiske kamerabevægelser — klar på under 15 minutter.",
    how3Title: "Del automatisk på sociale medier", how3Desc: "Vakanza poster din video og indhold til Facebook, Instagram, TikTok og LinkedIn — automatisk og på det rigtige tidspunkt.",
    testTitle: "Hvad udlejere siger", testSub: "Brugt af hundredvis af udlejere i Danmark",
    test1Name: "Mette K.", test1Role: "Airbnb-vært, Skagen", test1Quote: "Jeg sparer mindst 5 timer om ugen. Vakanza poster automatisk mens jeg fokuserer på mine gæster. Videoerne er imponerende professionelle!",
    test2Name: "Thomas B.", test2Role: "3 sommerhuse, Bornholm", test2Quote: "AI-videoerne har øget mine bookinger med 40 %. Det tog bogstaveligt talt 2 minutter at bestille — videoen var klar inden frokost.",
    test3Name: "Louise M.", test3Role: "Ferielejlighed, København", test3Quote: "Endelig kan jeg nå alle platforme uden at bruge timevis på det. AI-genererede opslag er bedre end det, jeg selv ville skrive!",
    priceTitle: "Enkel, transparent prissætning", priceSub: "Ingen skjulte gebyrer · Ingen forpligtelse",
    mostPopular: "Mest populær",
    plan1Name: "Social Media Plan",
    plan1Items: ["4 sociale medieplatforme","Ubegrænsede opslag","Automatisk posting med eget skema","Kalendersynk (Airbnb & Booking.com)","Op til 5 boliger","AI opslag — 5 kr/opslag","AI billeder — 5 kr/billede"],
    plan2Name: "AI billeder & opslag", plan2PayLabel: "Betal per brug",
    plan2Items: ["AI-genererede professionelle opslag","AI-genererede markedsføringsbilleder","Vælg tone og stil","Optimeret til alle platforme","Intet abonnement påkrævet","Køb credits efter behov"],
    plan2StartBtn: "Kom i gang",
    plan3Name: "Præsentationsvideo", plan3OnetimeLabel: "Engangspris pr. video",
    plan3Items: ["Henter billeder fra Airbnb & Booking.com","Eller upload dine egne billeder","Professionel video med musik","9:16 format til Reels & TikTok","Leveret inden for 15 minutter","Download direkte i appen"],
    plan3OrderBtn: "Bestil video",
    startFreeBtn: "Start gratis i dag",
    ctaBadge: "Spar tid fra dag 1", ctaTitle1: "Klar til at markedsføre din", ctaTitle2: "bolig på autopilot?",
    ctaSub: "Bliv en del af hundredvis af udlejere, der allerede bruger Vakanza til at nå ud til flere gæster — professionelt og automatisk.",
    ctaBtn: "Start gratis i dag", ctaNoCard: "Intet kreditkort · Afmeld når som helst",
    footerDesc: "AI-drevet markedsføring til udlejere af feriebolig. Spar tid og nå ud til flere gæster automatisk.",
    footerProduct: "Produkt", footerIntegrations: "Integrationer", footerSupport: "Support",
    footerFeatures: "Funktioner", footerAiVideo: "AI Video", footerPricing: "Priser",
    footerCreateAccount: "Opret gratis konto", footerLogin: "Log ind",
    footerTryFree: "Prøv gratis i dag", footerNoCard: "Intet kreditkort påkrævet", footerStartBtn: "Start nu →",
    footerPrivacy: "Privatlivspolitik", footerCookies: "Cookiepolitik", footerTerms: "Servicevilkår",
    footerCopyright: "© 2026 Vakanza. Alle rettigheder forbeholdes.",
    mockupLabel: "Sommerhus, Skagen", mockupSub: "AI-genereret præsentationsvideo",
  },
  en: {
    navHome: "Home", navFeatures: "Features", navVideo: "Video", navPricing: "Pricing",
    navLogin: "Log in", navStart: "Start free",
    heroLine1: "Rent out your", heroLine2: "private home", heroLine3: "", heroAccent: "smarter",
    heroSub: "Vakanza helps private landlords market their vacation property — automatically. AI creates presentation videos from your photos, posts to social media and syncs your booking calendar.",
    heroCta: "Start free today", heroCta2: "See pricing", heroNoCard: "No credit card required · Free to start",
    stat1Val: "500+", stat1Label: "Active hosts",
    stat2Val: "3×", stat2Label: "More engagement",
    stat3Val: "< 15 min", stat3Label: "Video delivered",
    worksWith: "Works with",
    featTitle: "Everything you need — in one place",
    featSub: "From Airbnb to TikTok. Vakanza brings it all together so you can focus on your guests.",
    feat1Title: "Virtual showing via video", feat1Desc: "Upload photos of your property — or paste your Novasol, Airbnb or Booking.com link. AI creates a professional presentation video with music and cinematic camera movements in under 15 minutes.",
    feat2Title: "Automatic social media posting", feat2Desc: "One click sends your content to Facebook, Instagram, TikTok and LinkedIn. Vakanza schedules and posts automatically at your chosen times.",
    feat3Title: "Sync your booking calendar", feat3Desc: "Import your existing calendar from Airbnb, Booking.com, Novasol or Google Calendar. All bookings in one place — always up to date.",
    feat4Title: "AI writes your posts", feat4Desc: "Let AI generate professional, engaging posts based on your property and season. Choose tone: family-friendly, luxury or last-minute offer.",
    feat5Title: "Private home or holiday house", feat5Desc: "Vakanza is built for private landlords — summer house, apartment, villa or studio. No agency fees, no commitments.",
    feat6Title: "Fully automatic autopilot", feat6Desc: "Set Vakanza on autopilot and let AI handle all marketing. You focus on your guests — Vakanza handles the rest.",
    aiTitle1: "Virtual showing", aiTitle2: "created from your photos",
    aiSub: "Upload photos of your property — or paste a link from Novasol, Airbnb or Booking.com. Vakanza fetches the images and creates a professional presentation video with music and cinematic movements in under 15 minutes.",
    step1Title: "Paste a link or upload photos", step1Desc: "We automatically fetch photos and property info from Novasol, Airbnb, Booking.com — or upload your own images directly.",
    step2Title: "AI creates your video", step2Desc: "Higgsfield AI composes a smooth presentation video with cinematic transitions and atmospheric music.",
    step3Title: "Share on all platforms", step3Desc: "Download the video and share it directly to Instagram Reels, TikTok and Facebook — all from one app.",
    aiStat1: "more engagement", aiStat2: "generation time", aiStat3: "Reels & TikTok",
    aiFeats: ["Novasol, Airbnb & Booking.com integration","Upload your own photos","Cinematic camera transitions","Automatic background music","Delivered in under 15 minutes","9:16 optimised for Reels & TikTok"],
    aiOnetimeLabel: "One-time price", aiOrderBtn: "Order video →",
    howTitle: "Up and running in 3 minutes", howSub: "No technical knowledge required",
    how1Title: "Add your property", how1Desc: "Upload photos or paste your Novasol, Airbnb or Booking.com link. Sync your existing booking calendar automatically.",
    how2Title: "AI creates your presentation video", how2Desc: "Vakanza creates a professional virtual showing with music and cinematic camera movements — ready in under 15 minutes.",
    how3Title: "Share automatically on social media", how3Desc: "Vakanza posts your video and content to Facebook, Instagram, TikTok and LinkedIn — automatically and at the right time.",
    testTitle: "What hosts say", testSub: "Used by hundreds of hosts across Denmark",
    test1Name: "Mette K.", test1Role: "Airbnb host, Skagen", test1Quote: "I save at least 5 hours a week. Vakanza posts automatically while I focus on my guests. The videos are impressively professional!",
    test2Name: "Thomas B.", test2Role: "3 summer houses, Bornholm", test2Quote: "The AI videos have increased my bookings by 40%. It literally took 2 minutes to order — the video was ready before lunch.",
    test3Name: "Louise M.", test3Role: "Holiday apartment, Copenhagen", test3Quote: "Finally I can reach all platforms without spending hours on it. AI-generated posts are better than what I'd write myself!",
    priceTitle: "Simple, transparent pricing", priceSub: "No hidden fees · No commitment",
    mostPopular: "Most popular",
    plan1Name: "Social Media Plan",
    plan1Items: ["4 social media platforms","Unlimited posts","Automatic posting with custom schedule","Calendar sync (Airbnb & Booking.com)","Up to 5 properties","AI posts — €0.67/post","AI images — €0.67/image"],
    plan2Name: "AI images & posts", plan2PayLabel: "Pay-as-you-go",
    plan2Items: ["AI-generated professional posts","AI-generated marketing images","Choose tone and style","Optimised for all platforms","No subscription required","Buy credits as needed"],
    plan2StartBtn: "Get started",
    plan3Name: "Presentation video", plan3OnetimeLabel: "One-time price per video",
    plan3Items: ["Fetches photos from Airbnb & Booking.com","Or upload your own photos","Professional video with music","9:16 format for Reels & TikTok","Delivered within 15 minutes","Download directly in the app"],
    plan3OrderBtn: "Order video",
    startFreeBtn: "Start free today",
    ctaBadge: "Save time from day 1", ctaTitle1: "Ready to market your", ctaTitle2: "property on autopilot?",
    ctaSub: "Join hundreds of hosts already using Vakanza to reach more guests — professionally and automatically.",
    ctaBtn: "Start free today", ctaNoCard: "No credit card · Cancel anytime",
    footerDesc: "AI-powered marketing for vacation rental hosts. Save time and reach more guests automatically.",
    footerProduct: "Product", footerIntegrations: "Integrations", footerSupport: "Support",
    footerFeatures: "Features", footerAiVideo: "AI Video", footerPricing: "Pricing",
    footerCreateAccount: "Create free account", footerLogin: "Log in",
    footerTryFree: "Try free today", footerNoCard: "No credit card required", footerStartBtn: "Start now →",
    footerPrivacy: "Privacy policy", footerCookies: "Cookie policy", footerTerms: "Terms of service",
    footerCopyright: "© 2026 Vakanza. All rights reserved.",
    mockupLabel: "Seaside cottage, Skagen", mockupSub: "AI-generated presentation video",
  },
  es: {
    navHome: "Inicio", navFeatures: "Características", navVideo: "Vídeo", navPricing: "Precios",
    navLogin: "Iniciar sesión", navStart: "Empezar gratis",
    heroLine1: "Alquila tu", heroLine2: "casa privada", heroLine3: "", heroAccent: "más inteligente",
    heroSub: "Vakanza ayuda a los propietarios privados a comercializar su propiedad de vacaciones — automáticamente. La IA crea vídeos de presentación desde tus fotos, publica en redes sociales y sincroniza tu calendario de reservas.",
    heroCta: "Empezar gratis hoy", heroCta2: "Ver precios", heroNoCard: "Sin tarjeta de crédito · Gratis para empezar",
    stat1Val: "500+", stat1Label: "Anfitriones activos",
    stat2Val: "3×", stat2Label: "Más engagement",
    stat3Val: "< 15 min", stat3Label: "Vídeo entregado",
    worksWith: "Compatible con",
    featTitle: "Todo lo que necesitas — en un solo lugar",
    featSub: "De Airbnb a TikTok. Vakanza lo reúne todo para que puedas centrarte en tus huéspedes.",
    feat1Title: "Visita virtual en vídeo", feat1Desc: "Sube fotos de tu propiedad — o pega tu enlace de Novasol, Airbnb o Booking.com. La IA crea un vídeo de presentación profesional con música y movimientos de cámara cinematográficos en menos de 15 minutos.",
    feat2Title: "Publicación automática en redes sociales", feat2Desc: "Un clic envía tu contenido a Facebook, Instagram, TikTok y LinkedIn. Vakanza programa y publica automáticamente en los horarios que elijas.",
    feat3Title: "Sincroniza tu calendario de reservas", feat3Desc: "Importa tu calendario existente de Airbnb, Booking.com, Novasol o Google Calendar. Todas las reservas en un solo lugar — siempre actualizado.",
    feat4Title: "La IA escribe tus publicaciones", feat4Desc: "Deja que la IA genere publicaciones profesionales y atractivas basadas en tu propiedad y temporada. Elige el tono: familiar, lujo o oferta de última hora.",
    feat5Title: "Casa privada o de vacaciones", feat5Desc: "Vakanza está diseñado para propietarios privados — casa de verano, apartamento, villa o estudio. Sin tarifas de agencia, sin compromisos.",
    feat6Title: "Piloto automático completo", feat6Desc: "Pon Vakanza en piloto automático y deja que la IA se encargue de todo el marketing. Tú te centras en tus huéspedes — Vakanza se encarga del resto.",
    aiTitle1: "Visita virtual", aiTitle2: "creada desde tus fotos",
    aiSub: "Sube fotos de tu propiedad — o pega un enlace de Novasol, Airbnb o Booking.com. Vakanza descarga las imágenes y crea un vídeo de presentación profesional con música y movimientos cinematográficos en menos de 15 minutos.",
    step1Title: "Pega un enlace o sube fotos", step1Desc: "Obtenemos automáticamente fotos e información de la propiedad de Novasol, Airbnb, Booking.com — o sube tus propias imágenes directamente.",
    step2Title: "La IA crea tu vídeo", step2Desc: "Higgsfield IA compone un vídeo de presentación suave con transiciones cinematográficas y música ambiental.",
    step3Title: "Comparte en todas las plataformas", step3Desc: "Descarga el vídeo y compártelo directamente en Instagram Reels, TikTok y Facebook — todo desde una app.",
    aiStat1: "más engagement", aiStat2: "tiempo de generación", aiStat3: "Reels & TikTok",
    aiFeats: ["Integración con Novasol, Airbnb & Booking.com","Sube tus propias fotos","Transiciones de cámara cinematográficas","Música de fondo automática","Entregado en menos de 15 minutos","9:16 optimizado para Reels & TikTok"],
    aiOnetimeLabel: "Precio único", aiOrderBtn: "Pedir vídeo →",
    howTitle: "Listo en 3 minutos", howSub: "Sin conocimientos técnicos necesarios",
    how1Title: "Añade tu propiedad", how1Desc: "Sube fotos o pega tu enlace de Novasol, Airbnb o Booking.com. Sincroniza tu calendario de reservas existente automáticamente.",
    how2Title: "La IA crea tu vídeo de presentación", how2Desc: "Vakanza crea una visita virtual profesional con música y movimientos de cámara cinematográficos — lista en menos de 15 minutos.",
    how3Title: "Comparte automáticamente en redes sociales", how3Desc: "Vakanza publica tu vídeo y contenido en Facebook, Instagram, TikTok y LinkedIn — automáticamente y en el momento adecuado.",
    testTitle: "Lo que dicen los anfitriones", testSub: "Usado por cientos de anfitriones en toda Dinamarca",
    test1Name: "Mette K.", test1Role: "Anfitriona Airbnb, Skagen", test1Quote: "Ahorro al menos 5 horas a la semana. Vakanza publica automáticamente mientras me centro en mis huéspedes. ¡Los vídeos son impresionantemente profesionales!",
    test2Name: "Thomas B.", test2Role: "3 casas de verano, Bornholm", test2Quote: "Los vídeos de IA han aumentado mis reservas un 40 %. Literalmente tardé 2 minutos en pedirlo — el vídeo estaba listo antes del almuerzo.",
    test3Name: "Louise M.", test3Role: "Apartamento vacacional, Copenhague", test3Quote: "Por fin puedo llegar a todas las plataformas sin pasar horas en ello. ¡Las publicaciones generadas por IA son mejores que las que yo escribiría!",
    priceTitle: "Precios simples y transparentes", priceSub: "Sin tarifas ocultas · Sin compromiso",
    mostPopular: "Más popular",
    plan1Name: "Plan Redes Sociales",
    plan1Items: ["4 plataformas de redes sociales","Publicaciones ilimitadas","Publicación automática con horario personalizado","Sincronización de calendario (Airbnb & Booking.com)","Hasta 5 propiedades","Publicaciones IA — €0,67/publicación","Imágenes IA — €0,67/imagen"],
    plan2Name: "Imágenes y publicaciones IA", plan2PayLabel: "Pago por uso",
    plan2Items: ["Publicaciones profesionales generadas por IA","Imágenes de marketing generadas por IA","Elige tono y estilo","Optimizado para todas las plataformas","Sin suscripción requerida","Compra créditos según necesites"],
    plan2StartBtn: "Comenzar",
    plan3Name: "Vídeo de presentación", plan3OnetimeLabel: "Precio único por vídeo",
    plan3Items: ["Descarga fotos de Airbnb & Booking.com","O sube tus propias fotos","Vídeo profesional con música","Formato 9:16 para Reels & TikTok","Entregado en 15 minutos","Descarga directamente en la app"],
    plan3OrderBtn: "Pedir vídeo",
    startFreeBtn: "Empezar gratis hoy",
    ctaBadge: "Ahorra tiempo desde el día 1", ctaTitle1: "¿Listo para comercializar tu", ctaTitle2: "propiedad en piloto automático?",
    ctaSub: "Únete a cientos de anfitriones que ya usan Vakanza para llegar a más huéspedes — de forma profesional y automática.",
    ctaBtn: "Empezar gratis hoy", ctaNoCard: "Sin tarjeta de crédito · Cancela cuando quieras",
    footerDesc: "Marketing impulsado por IA para anfitriones de alquiler vacacional. Ahorra tiempo y llega a más huéspedes automáticamente.",
    footerProduct: "Producto", footerIntegrations: "Integraciones", footerSupport: "Soporte",
    footerFeatures: "Características", footerAiVideo: "Vídeo IA", footerPricing: "Precios",
    footerCreateAccount: "Crear cuenta gratis", footerLogin: "Iniciar sesión",
    footerTryFree: "Prueba gratis hoy", footerNoCard: "Sin tarjeta de crédito", footerStartBtn: "Empezar ahora →",
    footerPrivacy: "Política de privacidad", footerCookies: "Política de cookies", footerTerms: "Términos de servicio",
    footerCopyright: "© 2026 Vakanza. Todos los derechos reservados.",
    mockupLabel: "Casa junto al mar, Skagen", mockupSub: "Vídeo de presentación generado por IA",
  },
  de: {
    navHome: "Startseite", navFeatures: "Funktionen", navVideo: "Video", navPricing: "Preise",
    navLogin: "Anmelden", navStart: "Kostenlos starten",
    heroLine1: "Vermiete dein", heroLine2: "privates Zuhause", heroLine3: "", heroAccent: "klüger",
    heroSub: "Vakanza hilft privaten Vermietern, ihre Ferienimmobilie zu vermarkten — automatisch. KI erstellt Präsentationsvideos aus Ihren Fotos, postet in sozialen Medien und synchronisiert Ihren Buchungskalender.",
    heroCta: "Heute kostenlos starten", heroCta2: "Preise ansehen", heroNoCard: "Keine Kreditkarte · Kostenlos starten",
    stat1Val: "500+", stat1Label: "Aktive Gastgeber",
    stat2Val: "3×", stat2Label: "Mehr Engagement",
    stat3Val: "< 15 min", stat3Label: "Video geliefert",
    worksWith: "Funktioniert mit",
    featTitle: "Alles, was du brauchst — an einem Ort",
    featSub: "Von Airbnb bis TikTok. Vakanza bringt alles zusammen, damit du dich auf deine Gäste konzentrieren kannst.",
    feat1Title: "Virtuelle Besichtigung per Video", feat1Desc: "Fotos hochladen — oder deinen Novasol, Airbnb oder Booking.com Link einfügen. KI erstellt ein professionelles Präsentationsvideo mit Musik und kinematischen Kamerabewegungen in unter 15 Minuten.",
    feat2Title: "Automatische Social-Media-Beiträge", feat2Desc: "Ein Klick sendet deine Inhalte an Facebook, Instagram, TikTok und LinkedIn. Vakanza plant und postet automatisch zu deinen gewählten Zeiten.",
    feat3Title: "Buchungskalender synchronisieren", feat3Desc: "Importiere deinen bestehenden Kalender von Airbnb, Booking.com, Novasol oder Google Kalender. Alle Buchungen an einem Ort — immer aktuell.",
    feat4Title: "KI schreibt deine Beiträge", feat4Desc: "Lass die KI professionelle, ansprechende Beiträge basierend auf deiner Immobilie und Saison erstellen. Wähle den Ton: familienfreundlich, luxuriös oder Last-Minute-Angebot.",
    feat5Title: "Privathaus oder Ferienhaus", feat5Desc: "Vakanza ist für private Vermieter gebaut — Sommerhaus, Wohnung, Villa oder Studio. Keine Agenturgebühren, keine Verpflichtungen.",
    feat6Title: "Vollautomatischer Autopilot", feat6Desc: "Stelle Vakanza auf Autopilot und lass die KI das gesamte Marketing übernehmen. Du konzentrierst dich auf deine Gäste — Vakanza erledigt den Rest.",
    aiTitle1: "Virtuelle Besichtigung", aiTitle2: "aus deinen Fotos erstellt",
    aiSub: "Fotos hochladen — oder einen Link von Novasol, Airbnb oder Booking.com einfügen. Vakanza lädt die Bilder herunter und erstellt ein professionelles Präsentationsvideo mit Musik und kinematischen Bewegungen in unter 15 Minuten.",
    step1Title: "Link einfügen oder Fotos hochladen", step1Desc: "Wir holen automatisch Fotos und Immobilieninfos von Novasol, Airbnb, Booking.com — oder lade deine eigenen Bilder direkt hoch.",
    step2Title: "KI erstellt dein Video", step2Desc: "Higgsfield KI erstellt ein flüssiges Präsentationsvideo mit kinematischen Übergängen und atmosphärischer Musik.",
    step3Title: "Auf allen Plattformen teilen", step3Desc: "Video herunterladen und direkt auf Instagram Reels, TikTok und Facebook teilen — alles aus einer App.",
    aiStat1: "mehr Engagement", aiStat2: "Generierungszeit", aiStat3: "Reels & TikTok",
    aiFeats: ["Novasol, Airbnb & Booking.com Integration","Eigene Fotos hochladen","Kinematische Kameraübergänge","Automatische Hintergrundmusik","In unter 15 Minuten geliefert","9:16 für Reels & TikTok optimiert"],
    aiOnetimeLabel: "Einmalpreis", aiOrderBtn: "Video bestellen →",
    howTitle: "In 3 Minuten einsatzbereit", howSub: "Keine technischen Kenntnisse erforderlich",
    how1Title: "Deine Immobilie hinzufügen", how1Desc: "Fotos hochladen oder deinen Novasol, Airbnb oder Booking.com Link einfügen. Deinen bestehenden Buchungskalender automatisch synchronisieren.",
    how2Title: "KI erstellt dein Präsentationsvideo", how2Desc: "Vakanza erstellt eine professionelle virtuelle Besichtigung mit Musik und kinematischen Kamerabewegungen — fertig in unter 15 Minuten.",
    how3Title: "Automatisch in sozialen Medien teilen", how3Desc: "Vakanza postet dein Video und deine Inhalte auf Facebook, Instagram, TikTok und LinkedIn — automatisch und zur richtigen Zeit.",
    testTitle: "Was Gastgeber sagen", testSub: "Von Hunderten von Gastgebern in ganz Dänemark genutzt",
    test1Name: "Mette K.", test1Role: "Airbnb-Gastgeberin, Skagen", test1Quote: "Ich spare mindestens 5 Stunden pro Woche. Vakanza postet automatisch, während ich mich auf meine Gäste konzentriere. Die Videos sind beeindruckend professionell!",
    test2Name: "Thomas B.", test2Role: "3 Ferienhäuser, Bornholm", test2Quote: "Die KI-Videos haben meine Buchungen um 40 % erhöht. Ich habe buchstäblich 2 Minuten gebraucht, um zu bestellen — das Video war vor dem Mittagessen fertig.",
    test3Name: "Louise M.", test3Role: "Ferienwohnung, Kopenhagen", test3Quote: "Endlich kann ich alle Plattformen erreichen, ohne stundenlang daran zu arbeiten. KI-generierte Beiträge sind besser als das, was ich selbst schreiben würde!",
    priceTitle: "Einfache, transparente Preise", priceSub: "Keine versteckten Gebühren · Keine Verpflichtung",
    mostPopular: "Am beliebtesten",
    plan1Name: "Social-Media-Plan",
    plan1Items: ["4 Social-Media-Plattformen","Unbegrenzte Beiträge","Automatisches Posten mit eigenem Zeitplan","Kalendersynchronisation (Airbnb & Booking.com)","Bis zu 5 Immobilien","KI-Beiträge — 0,67 €/Beitrag","KI-Bilder — 0,67 €/Bild"],
    plan2Name: "KI-Bilder & Beiträge", plan2PayLabel: "Pay-as-you-go",
    plan2Items: ["KI-generierte professionelle Beiträge","KI-generierte Marketingbilder","Ton und Stil wählen","Für alle Plattformen optimiert","Kein Abonnement erforderlich","Guthaben nach Bedarf kaufen"],
    plan2StartBtn: "Loslegen",
    plan3Name: "Präsentationsvideo", plan3OnetimeLabel: "Einmalpreis pro Video",
    plan3Items: ["Lädt Fotos von Airbnb & Booking.com","Oder eigene Fotos hochladen","Professionelles Video mit Musik","9:16 Format für Reels & TikTok","In 15 Minuten geliefert","Direkt in der App herunterladen"],
    plan3OrderBtn: "Video bestellen",
    startFreeBtn: "Heute kostenlos starten",
    ctaBadge: "Zeit sparen ab Tag 1", ctaTitle1: "Bereit, deine Immobilie auf", ctaTitle2: "Autopilot zu vermarkten?",
    ctaSub: "Schließe dich Hunderten von Gastgebern an, die Vakanza bereits nutzen, um mehr Gäste zu erreichen — professionell und automatisch.",
    ctaBtn: "Heute kostenlos starten", ctaNoCard: "Keine Kreditkarte · Jederzeit kündigen",
    footerDesc: "KI-gesteuertes Marketing für Ferienvermieter. Spar Zeit und erreiche mehr Gäste automatisch.",
    footerProduct: "Produkt", footerIntegrations: "Integrationen", footerSupport: "Support",
    footerFeatures: "Funktionen", footerAiVideo: "KI-Video", footerPricing: "Preise",
    footerCreateAccount: "Kostenloses Konto erstellen", footerLogin: "Anmelden",
    footerTryFree: "Heute kostenlos testen", footerNoCard: "Keine Kreditkarte erforderlich", footerStartBtn: "Jetzt starten →",
    footerPrivacy: "Datenschutzrichtlinie", footerCookies: "Cookie-Richtlinie", footerTerms: "Nutzungsbedingungen",
    footerCopyright: "© 2026 Vakanza. Alle Rechte vorbehalten.",
    mockupLabel: "Ferienhaus am Meer, Skagen", mockupSub: "KI-generiertes Präsentationsvideo",
  },
};
