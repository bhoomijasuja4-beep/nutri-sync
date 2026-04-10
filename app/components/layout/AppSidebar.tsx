"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/meal-planner", label: "Meal Planner", icon: "📅" },
  { href: "/recipe-finder", label: "Recipe Finder", icon: "🔍" },
  { href: "/food-logger", label: "Food Logger", icon: "📝" },
  { href: "/insights", label: "Insights", icon: "💡" },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const profile = useUserStore((s) => s.profile);

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen border-r border-border/60 bg-white sticky top-0">
      {/* Brand */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-md shadow-primary/25">N</div>
          <span className="text-xl font-bold text-foreground">Nutri<span className="text-primary">Sync</span></span>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-border/60">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {profile?.name.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{profile?.name || "User"}</p>
            <p className="text-xs text-muted truncate">{profile?.goal.replace("_", " ")}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
