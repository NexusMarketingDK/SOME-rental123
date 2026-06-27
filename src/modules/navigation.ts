import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Share2,
  SendHorizontal,
  Settings,
} from "lucide-react";
import type { NavItem } from "@/types/navigation";

export const primaryNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: Home },
  { label: "Posts", href: "/posts", icon: SendHorizontal },
  { label: "Social accounts", href: "/accounts", icon: Share2 },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
];

export const secondaryNav: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
];
