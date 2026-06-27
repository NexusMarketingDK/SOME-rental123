import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { FormField } from "@/components/ui/form-field";
import { createPropertyAction } from "@/services/properties";

export default function NewPropertyPage() {
  return (
    <>
      <Topbar title="Add property" description="Fill in your rental property details." />
      <div className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-xl">
          <Link href="/properties" className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={14} /> Back to properties
          </Link>

          <form action={createPropertyAction} className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <FormField label="Title" name="title" placeholder="Beachfront villa, Copenhagen apartment…" required />
            <FormField label="Location" name="location" placeholder="City, Country" />
            <FormField label="Description" name="description" placeholder="Describe your property…" textarea />
            <FormField label="Booking URL" name="booking_url" type="url" placeholder="https://airbnb.com/…" />

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Link href="/properties" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                Add property
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
