"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "Home", icon: "📊" },
  { href: "/meal-planner", label: "Plan", icon: "📅" },
  { href: "/food-logger", label: "Log", icon: "📝" },
  { href: "/recipe-finder", label: "Recipes", icon: "🔍" },
  { href: "/insights", label: "Insights", icon: "💡" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-white/90 backdrop-blur-md pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-16 gap-1 p-1 rounded-xl transition-all ${
                isActive ? "text-primary" : "text-muted hover:bg-surface"
              }`}
            >
              <span className={`text-xl ${isActive ? "scale-110" : ""}`}>{link.icon}</span>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
