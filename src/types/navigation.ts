import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface StatTile {
  label: string;
  value: string | number;
  hint?: string;
}
