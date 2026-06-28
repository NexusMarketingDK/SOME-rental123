import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Sidebar } from "@/components/layout/sidebar";
import { createClient } from "@/lib/supabase/server";
import type { SocialAccount } from "@/types/database";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value === "en" ? "en" : "da";

  const { data: accounts } = await supabase
    .from("social_accounts")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar
        accounts={(accounts ?? []) as SocialAccount[]}
        userEmail={data.user.email}
        locale={locale}
      />
      <div className="flex flex-1 flex-col overflow-y-auto bg-[#FAF7F2] pt-14 pb-16 md:pt-0 md:pb-0">
        {children}
      </div>
    </div>
  );
}
