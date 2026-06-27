import type { StatTile } from "@/types/navigation";

export function StatCard({ label, value, hint }: StatTile) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#E7E2D9] bg-white p-5">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background: "linear-gradient(90deg, #FFB36B 0%, #FF6B4A 100%)",
        }}
      />
      <p className="text-sm font-medium text-[#6B6B76]">{label}</p>
      <p
        className="mt-2 text-3xl text-[#1B1B1F]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-[#6B6B76]">{hint}</p>}
    </div>
  );
}
