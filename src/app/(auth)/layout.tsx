import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FAF7F2] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#E7E2D9] bg-white p-8">
        <div className="mb-6 flex items-center gap-2">
          <span
            aria-hidden
            className="h-7 w-7 rounded-md"
            style={{
              background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)",
            }}
          />
          <span className="text-lg font-bold uppercase leading-none tracking-tight text-[#1B1B1F]">
            SOME VIDEO POST
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
