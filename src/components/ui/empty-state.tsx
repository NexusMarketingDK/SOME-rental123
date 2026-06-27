import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E7E2D9] bg-white/60 px-6 py-16 text-center">
      <h3 className="text-base font-semibold text-[#1B1B1F]">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-[#6B6B76]">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
