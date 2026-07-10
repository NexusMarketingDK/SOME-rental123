import { Topbar } from "@/components/layout/topbar";
import { createClient } from "@/lib/supabase/server";
import { Mail, User } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col">
      <Topbar title="Indstillinger" description="Administrer din konto" />
      <div className="mx-auto w-full max-w-2xl px-6 py-8 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">Konto</h2>
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B3F7A]/10">
              <User size={16} className="text-[#1B3F7A]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{data.user?.email}</p>
              <p className="text-xs text-slate-500">Logget ind</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-1 text-sm font-semibold text-slate-900">Support</h2>
          <p className="mb-3 text-sm text-slate-500">Har du spørgsmål? Skriv til os.</p>
          <a
            href="mailto:kontakt@somevideopost.com"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1B3F7A] hover:underline"
          >
            <Mail size={14} />
            kontakt@somevideopost.com
          </a>
        </div>
      </div>
    </div>
  );
}
