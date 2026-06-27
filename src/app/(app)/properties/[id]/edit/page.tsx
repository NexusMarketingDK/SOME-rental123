import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { FormField } from "@/components/ui/form-field";
import { getProperty, updatePropertyAction } from "@/services/properties";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  return (
    <>
      <Topbar title="Edit property" description={property.title} />
      <div className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-xl">
          <Link href="/properties" className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
            <ArrowLeft size={14} /> Back to properties
          </Link>

          <form action={updatePropertyAction} className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <input type="hidden" name="id" value={property.id} />
            <FormField label="Title" name="title" defaultValue={property.title ?? ""} required />
            <FormField label="Location" name="location" defaultValue={property.location ?? ""} />
            <FormField label="Description" name="description" defaultValue={property.description ?? ""} textarea />
            <FormField label="Booking URL" name="booking_url" type="url" defaultValue={property.booking_url ?? ""} />

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Link href="/properties" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
