"use server";

import { createClient } from "@/lib/supabase/server";

type Ga4Connection = {
  ga4_property_id: string;
  property_name: string | null;
  access_token: string;
  refresh_token: string | null;
  token_expiry: string | null;
};

async function refreshTokenIfNeeded(conn: Ga4Connection): Promise<string> {
  const expiry = conn.token_expiry ? new Date(conn.token_expiry) : null;
  const needsRefresh = !expiry || expiry.getTime() - Date.now() < 60_000;

  if (!needsRefresh || !conn.refresh_token) return conn.access_token;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: conn.refresh_token,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) return conn.access_token;

  const tokens = await res.json();
  const newExpiry = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

  const supabase = await createClient();
  await supabase.from("ga4_connections").update({
    access_token: tokens.access_token,
    token_expiry: newExpiry,
  }).eq("ga4_property_id", conn.ga4_property_id);

  return tokens.access_token;
}

export type Ga4Stats = {
  sessions: number;
  pageViews: number;
  activeUsers: number;
  avgSessionDuration: number;
  dailySessions: { date: string; sessions: number }[];
  topPages: { page: string; views: number }[];
  propertyName: string;
};

export async function getGa4Stats(days = 28): Promise<{ data?: Ga4Stats; error?: string; notConnected?: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Ikke logget ind" };

  const { data: conn } = await supabase
    .from("ga4_connections")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!conn) return { notConnected: true };

  const accessToken = await refreshTokenIfNeeded(conn as Ga4Connection);
  const propertyId = conn.ga4_property_id;
  const endDate = "today";
  const startDate = `${days}daysAgo`;

  const body = {
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
    ],
    dimensions: [],
  };

  const [summaryRes, dailyRes, pagesRes] = await Promise.all([
    fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: "sessions" }],
        dimensions: [{ name: "date" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
    }),
    fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: "screenPageViews" }],
        dimensions: [{ name: "pagePath" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 5,
      }),
    }),
  ]);

  if (!summaryRes.ok) {
    const err = await summaryRes.json();
    if (err.error?.status === "PERMISSION_DENIED") return { error: "Ingen adgang til denne GA4 property. Tilslut igen." };
    return { error: "Kunne ikke hente data fra Google Analytics." };
  }

  const summary = await summaryRes.json();
  const row = summary.rows?.[0]?.metricValues ?? [];
  const sessions = parseInt(row[0]?.value ?? "0");
  const pageViews = parseInt(row[1]?.value ?? "0");
  const activeUsers = parseInt(row[2]?.value ?? "0");
  const avgSessionDuration = parseFloat(row[3]?.value ?? "0");

  const dailySessions: { date: string; sessions: number }[] = [];
  if (dailyRes.ok) {
    const dailyData = await dailyRes.json();
    for (const r of dailyData.rows ?? []) {
      const raw = r.dimensionValues[0].value as string; // "20260601"
      const d = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
      dailySessions.push({ date: d, sessions: parseInt(r.metricValues[0].value) });
    }
  }

  const topPages: { page: string; views: number }[] = [];
  if (pagesRes.ok) {
    const pagesData = await pagesRes.json();
    for (const r of pagesData.rows ?? []) {
      topPages.push({ page: r.dimensionValues[0].value, views: parseInt(r.metricValues[0].value) });
    }
  }

  return {
    data: {
      sessions,
      pageViews,
      activeUsers,
      avgSessionDuration,
      dailySessions,
      topPages,
      propertyName: conn.property_name ?? propertyId,
    },
  };
}

export async function disconnectGa4(): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("ga4_connections").delete().eq("user_id", user.id);
}

export async function updateGa4PropertyId(propertyId: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Ikke logget ind" };
  const { error } = await supabase.from("ga4_connections").update({ ga4_property_id: propertyId }).eq("user_id", user.id);
  if (error) return { error: error.message };
  return {};
}
