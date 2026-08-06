import { CheckCircle2, Sparkles, Video, Crown } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { getSubscription, getCredits } from "@/services/billing";
import { SubscribeButton, BuyCreditsButton, BuyVideoButton, ManageBillingButton } from "@/components/billing/billing-buttons";
import { getCurrency, getLocale } from "@/lib/locale-server";
import { formatPrice, formatPriceKey, priceAmount, PLAN_POST_CREDITS, PLAN_INCLUDED_VIDEOS, FREE_POST_CREDITS } from "@/lib/currency";
import type { Locale } from "@/lib/i18n";

// Prices/counts injected into the localized copy (currency-aware).
type P = { basic: string; pro: string; video: string; metaAds: string; basicN: number; proN: number; proVid: number; freeN: number };

type T = {
  topbarTitle: string; topbarDesc: string;
  currentPlan: string; activeSub: string; freePlan: string;
  expires: string; renews: string;
  freeDesc: (p: P) => string;
  badgeActive: string; badgeFree: string;
  perMonth: string;
  basicItems: (p: P) => string[]; proItems: (p: P) => string[];
  chooseBasic: string; choosePro: string; manageSub: string;
  creditsTitle: string; creditsLeft: string; creditsWord: string; buyWord: string;
  videoTitle: string; videoDesc: string; videoItems: string[]; orderVideo: string;
};

const STRINGS: Record<Locale, T> = {
  da: {
    topbarTitle: "Fakturering", topbarDesc: "Administrer dit abonnement og køb credits.",
    currentPlan: "Nuværende plan", activeSub: "Aktivt abonnement", freePlan: "Gratis plan",
    expires: "Udløber", renews: "Fornyes",
    freeDesc: (p) => `Din gratis testkonto inkluderer ${p.freeN} gratis SoMe-opslag. Opgradér for månedlige AI-opslag, direkte deling og automation.`,
    badgeActive: "Aktiv", badgeFree: "Gratis", perMonth: "/md",
    basicItems: (p) => [
      `${p.basicN} SoMe-opslag (tekst + billede) hver måned`,
      "Direkte deling til sociale medier",
      "Automation & planlægning",
      `Præsentationsvideoer for ${p.video}/stk.`,
      `Meta-annoncering som tilkøb (${p.metaAds}/md.)`,
    ],
    proItems: (p) => [
      `${p.proVid} præsentationsvideoer inkluderet hver måned`,
      `${p.proN} SoMe-opslag (tekst + billede) hver måned`,
      "Meta-annoncering inkluderet (Marketing API)",
      "Direkte deling til sociale medier",
      "Automation, planlægning & prioriteret support",
    ],
    chooseBasic: "Vælg Basic", choosePro: "Vælg Pro", manageSub: "Administrer abonnement",
    creditsTitle: "AI opslag credits", creditsLeft: "credits tilbage", creditsWord: "credits", buyWord: "Køb",
    videoTitle: "Bolig-fremvisningsvideo", videoDesc: "AI genererer en professionel præsentationsvideo",
    videoItems: [
      "Henter billeder fra Airbnb & Booking.com",
      "Eller upload dine egne billeder",
      "AI-genereret præsentationsvideo",
      "Klar til Instagram Reels og TikTok",
      "Leveret inden for 24 timer",
    ],
    orderVideo: "Bestil video",
  },
  en: {
    topbarTitle: "Billing", topbarDesc: "Manage your subscription and buy credits.",
    currentPlan: "Current plan", activeSub: "Active subscription", freePlan: "Free plan",
    expires: "Expires", renews: "Renews",
    freeDesc: (p) => `Your free test account includes ${p.freeN} free social posts. Upgrade for monthly AI posts, direct sharing and automation.`,
    badgeActive: "Active", badgeFree: "Free", perMonth: "/mo",
    basicItems: (p) => [
      `${p.basicN} social posts (text + image) every month`,
      "Direct sharing to social media",
      "Automation & scheduling",
      `Presentation videos for ${p.video} each`,
      `Meta advertising as an add-on (${p.metaAds}/mo)`,
    ],
    proItems: (p) => [
      `${p.proVid} presentation videos included every month`,
      `${p.proN} social posts (text + image) every month`,
      "Meta advertising included (Marketing API)",
      "Direct sharing to social media",
      "Automation, scheduling & priority support",
    ],
    chooseBasic: "Choose Basic", choosePro: "Choose Pro", manageSub: "Manage subscription",
    creditsTitle: "AI post credits", creditsLeft: "credits left", creditsWord: "credits", buyWord: "Buy",
    videoTitle: "Property showcase video", videoDesc: "AI generates a professional presentation video",
    videoItems: [
      "Fetches photos from Airbnb & Booking.com",
      "Or upload your own photos",
      "AI-generated presentation video",
      "Ready for Instagram Reels and TikTok",
      "Delivered within 24 hours",
    ],
    orderVideo: "Order video",
  },
  es: {
    topbarTitle: "Facturación", topbarDesc: "Gestiona tu suscripción y compra créditos.",
    currentPlan: "Plan actual", activeSub: "Suscripción activa", freePlan: "Plan gratuito",
    expires: "Caduca", renews: "Se renueva",
    freeDesc: (p) => `Tu cuenta de prueba gratis incluye ${p.freeN} publicaciones sociales gratis. Mejora para publicaciones IA mensuales, compartir directo y automatización.`,
    badgeActive: "Activa", badgeFree: "Gratis", perMonth: "/mes",
    basicItems: (p) => [
      `${p.basicN} publicaciones (texto + imagen) al mes`,
      "Compartir directo en redes sociales",
      "Automatización y programación",
      `Vídeos de presentación por ${p.video} c/u`,
      `Publicidad en Meta como extra (${p.metaAds}/mes)`,
    ],
    proItems: (p) => [
      `${p.proVid} vídeos de presentación incluidos cada mes`,
      `${p.proN} publicaciones (texto + imagen) al mes`,
      "Publicidad en Meta incluida (Marketing API)",
      "Compartir directo en redes sociales",
      "Automatización, programación y soporte prioritario",
    ],
    chooseBasic: "Elegir Basic", choosePro: "Elegir Pro", manageSub: "Gestionar suscripción",
    creditsTitle: "Créditos de publicaciones IA", creditsLeft: "créditos restantes", creditsWord: "créditos", buyWord: "Comprar",
    videoTitle: "Vídeo de presentación de la propiedad", videoDesc: "La IA genera un vídeo de presentación profesional",
    videoItems: [
      "Obtiene fotos de Airbnb y Booking.com",
      "O sube tus propias fotos",
      "Vídeo de presentación generado por IA",
      "Listo para Instagram Reels y TikTok",
      "Entregado en 24 horas",
    ],
    orderVideo: "Pedir vídeo",
  },
  de: {
    topbarTitle: "Abrechnung", topbarDesc: "Verwalte dein Abo und kaufe Credits.",
    currentPlan: "Aktueller Plan", activeSub: "Aktives Abo", freePlan: "Kostenloser Plan",
    expires: "Läuft ab", renews: "Verlängert sich",
    freeDesc: (p) => `Dein kostenloses Testkonto enthält ${p.freeN} kostenlose Social-Beiträge. Upgrade für monatliche KI-Beiträge, direktes Teilen und Automatisierung.`,
    badgeActive: "Aktiv", badgeFree: "Kostenlos", perMonth: "/Mon.",
    basicItems: (p) => [
      `${p.basicN} Social-Beiträge (Text + Bild) pro Monat`,
      "Direktes Teilen in sozialen Medien",
      "Automatisierung & Planung",
      `Präsentationsvideos für je ${p.video}`,
      `Meta-Werbung als Zusatz (${p.metaAds}/Mon.)`,
    ],
    proItems: (p) => [
      `${p.proVid} Präsentationsvideos jeden Monat inklusive`,
      `${p.proN} Social-Beiträge (Text + Bild) pro Monat`,
      "Meta-Werbung inklusive (Marketing API)",
      "Direktes Teilen in sozialen Medien",
      "Automatisierung, Planung & priorisierter Support",
    ],
    chooseBasic: "Basic wählen", choosePro: "Pro wählen", manageSub: "Abo verwalten",
    creditsTitle: "KI-Beitrag-Credits", creditsLeft: "Credits übrig", creditsWord: "Credits", buyWord: "Kaufen",
    videoTitle: "Immobilien-Präsentationsvideo", videoDesc: "Die KI erstellt ein professionelles Präsentationsvideo",
    videoItems: [
      "Holt Fotos von Airbnb & Booking.com",
      "Oder lade deine eigenen Fotos hoch",
      "KI-generiertes Präsentationsvideo",
      "Bereit für Instagram Reels und TikTok",
      "Innerhalb von 24 Stunden geliefert",
    ],
    orderVideo: "Video bestellen",
  },
};

const DATE_LOCALE: Record<Locale, string> = { da: "da-DK", en: "en-GB", es: "es-ES", de: "de-DE" };

export default async function BillingPage() {
  const [subscription, credits, currency, locale] = await Promise.all([
    getSubscription(), getCredits(), getCurrency(), getLocale(),
  ]);
  const isActive = subscription?.status === "active" || subscription?.status === "trialing";
  const t = STRINGS[locale] ?? STRINGS.da;

  const p: P = {
    basic: formatPriceKey("basic", currency),
    pro: formatPriceKey("pro", currency),
    video: formatPriceKey("video", currency),
    metaAds: formatPriceKey("metaAds", currency),
    basicN: PLAN_POST_CREDITS.basic,
    proN: PLAN_POST_CREDITS.pro,
    proVid: PLAN_INCLUDED_VIDEOS.pro,
    freeN: FREE_POST_CREDITS,
  };
  const aiPostPrice = formatPriceKey("aiPost", currency, { decimals: currency === "eur" });
  const perPostLabel = locale === "da" ? `${aiPostPrice} pr. AI-genereret opslag`
    : locale === "es" ? `${aiPostPrice} por publicación IA`
    : locale === "de" ? `${aiPostPrice} pro KI-Beitrag`
    : `${aiPostPrice} per AI-generated post`;
  const creditPacks = [10, 25, 50].map((c) => ({
    credits: c,
    price: formatPrice(priceAmount("aiPost", currency) * c, currency),
  }));

  return (
    <>
      <Topbar title={t.topbarTitle} description={t.topbarDesc} />

      <div className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-3xl flex flex-col gap-6">

          {/* Current plan */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{t.currentPlan}</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  {isActive ? t.activeSub : t.freePlan}
                </h2>
                {isActive ? (
                  <p className="mt-1 text-sm text-slate-500">
                    {subscription?.cancel_at_period_end ? t.expires : t.renews} {subscription?.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString(DATE_LOCALE[locale]) : ""}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-slate-500">
                    {t.freeDesc(p)}
                  </p>
                )}
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {isActive ? t.badgeActive : t.badgeFree}
              </span>
            </div>

            {!isActive && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Basic */}
                <div className="flex flex-col rounded-xl border-2 border-[#1B3F7A] bg-blue-50/50 p-5">
                  <p className="font-semibold text-[#1B3F7A]">Basic — {p.basic}{t.perMonth}</p>
                  <ul className="mt-3 flex flex-1 flex-col gap-1.5">
                    {t.basicItems(p).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={14} className="mt-0.5 text-[#1B3F7A] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <SubscribeButton plan="basic" price={p.basic} label={t.chooseBasic} perMonth={t.perMonth} />
                  </div>
                </div>

                {/* Pro */}
                <div className="flex flex-col rounded-xl border-2 border-[#FF6B4A] bg-orange-50/50 p-5">
                  <p className="flex items-center gap-1.5 font-semibold text-[#FF6B4A]">
                    <Crown size={15} /> Pro — {p.pro}{t.perMonth}
                  </p>
                  <ul className="mt-3 flex flex-1 flex-col gap-1.5">
                    {t.proItems(p).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={14} className="mt-0.5 text-[#FF6B4A] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <SubscribeButton plan="pro" price={p.pro} label={t.choosePro} perMonth={t.perMonth} variant="pro" />
                  </div>
                </div>
              </div>
            )}

            {isActive && (
              <div className="mt-4">
                <ManageBillingButton label={t.manageSub} />
              </div>
            )}
          </div>

          {/* AI Credits */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                <Sparkles size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{t.creditsTitle}</h3>
                <p className="text-sm text-slate-500">{perPostLabel}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold text-slate-900">{credits}</p>
                <p className="text-xs text-slate-400">{t.creditsLeft}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {creditPacks.map((pack) => (
                <div key={pack.credits} className="rounded-lg border border-slate-200 p-3 text-center">
                  <p className="font-semibold text-slate-900">{pack.credits} {t.creditsWord}</p>
                  <p className="text-sm text-slate-500">{pack.price}</p>
                  <div className="mt-2">
                    <BuyCreditsButton credits={pack.credits} label={t.buyWord} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video order */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                <Video size={20} className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{t.videoTitle}</h3>
                <p className="text-sm text-slate-500">{t.videoDesc}</p>
              </div>
              <div className="ml-auto">
                <p className="text-xl font-bold text-slate-900">{p.video}</p>
              </div>
            </div>
            <ul className="mb-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {t.videoItems.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <BuyVideoButton price={p.video} label={t.orderVideo} />
          </div>

        </div>
      </div>
    </>
  );
}
