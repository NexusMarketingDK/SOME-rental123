import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto bg-[#FAF7F2]">
        {children}
      </div>
    </div>
  );
}
