"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Property } from "@/types/database";

export async function getProperties(): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  if (error) throw error;
  return data ?? [];
}

export async function getProperty(id: string): Promise<Property | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function createPropertyAction(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const imageUrls = formData.getAll("image_urls[]").map(String).filter((u) => u.startsWith("http"));

  const { error } = await supabase.from("properties").insert({
    user_id: user.id,
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    location: String(formData.get("location") ?? "").trim() || null,
    booking_url: String(formData.get("booking_url") ?? "").trim() || null,
    image_urls: imageUrls.length > 0 ? imageUrls : null,
  });

  if (error) redirect("/properties/new?error=db");
  revalidatePath("/properties");
  redirect("/properties");
}

export async function updatePropertyAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();

  const { error } = await supabase
    .from("properties")
    .update({
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim() || null,
      location: String(formData.get("location") ?? "").trim() || null,
      booking_url: String(formData.get("booking_url") ?? "").trim() || null,
    })
    .eq("id", id);

  if (error) redirect("/properties?error=db");
  revalidatePath("/properties");
  redirect("/properties");
}

export async function deletePropertyAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();

  const { error } = await supabase.from("properties").delete().eq("id", id);
  revalidatePath("/properties");
}
