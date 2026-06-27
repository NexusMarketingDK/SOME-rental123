import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Share2,
  SendHorizontal,
  Settings,
  CreditCard,
  Video,
} from "lucide-react";
import type { NavItem } from "@/types/navigation";

export const primaryNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Boliger", href: "/properties", icon: Home },
  { label: "Opslag", href: "/posts", icon: SendHorizontal },
  { label: "Sociale konti", href: "/accounts", icon: Share2 },
  { label: "Kalender", href: "/calendar", icon: CalendarDays },
  { label: "Videoer", href: "/videos", icon: Video },
];

export const secondaryNav: NavItem[] = [
  { label: "Fakturering", href: "/billing", icon: CreditCard },
  { label: "Indstillinger", href: "/settings", icon: Settings },
];
