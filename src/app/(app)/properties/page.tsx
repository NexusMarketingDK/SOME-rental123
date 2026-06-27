import Link from "next/link";
import { Plus, MapPin, ExternalLink } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";
import { getProperties } from "@/services/properties";
import { DeletePropertyButton } from "@/components/properties/delete-button";

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <>
      <Topbar
        title="Properties"
        description="Manage your vacation rental properties."
        action={
          <Link
            href="/properties/new"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
          >
            <Plus size={16} />
            Add property
          </Link>
        }
      />

      <div className="flex-1 px-8 py-6">
        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-20 text-center">
            <p className="text-sm font-medium text-slate-900">No properties yet</p>
            <p className="mt-1 text-sm text-slate-500">Add your first vacation rental to get started.</p>
            <Link
              href="/properties/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)" }}
            >
              <Plus size={16} />
              Add property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <div key={p.id} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                {p.cover_url ? (
                  <img src={p.cover_url} alt={p.title} className="mb-4 h-36 w-full rounded-lg object-cover" />
                ) : (
                  <div className="mb-4 flex h-36 w-full items-center justify-center rounded-lg bg-slate-100 text-slate-400 text-xs">
                    No image
                  </div>
                )}
                <h3 className="font-semibold text-slate-900">{p.title}</h3>
                {p.location && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={12} /> {p.location}
                  </p>
                )}
                {p.description && (
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{p.description}</p>
                )}

                <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                  <Link
                    href={`/properties/${p.id}/edit`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </Link>
                  {p.booking_url && (
                    <a
                      href={p.booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <ExternalLink size={11} /> Booking
                    </a>
                  )}
                  <div className="ml-auto">
                    <DeletePropertyButton id={p.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
