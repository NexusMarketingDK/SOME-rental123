import { CalendarDays } from "lucide-react";
import { Topbar } from "@/components/layout/topbar";

export default function CalendarPage() {
  return (
    <>
      <Topbar
        title="Kalender"
        description="Se og synkroniser bookingkalendere fra Airbnb, Booking.com og Google."
      />
      <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <CalendarDays size={40} className="mb-4 text-slate-200" />
        <p className="text-sm font-medium text-slate-900">Kalender-sync kommer snart</p>
        <p className="mt-1 text-sm text-slate-500">
          Import af ICS-feeds fra Airbnb og Booking.com er under udvikling.
        </p>
      </div>
    </>
  );
}
