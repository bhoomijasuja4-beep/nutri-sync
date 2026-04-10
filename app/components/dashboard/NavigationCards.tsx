"use client";

import Link from "next/link";

const cards = [
  {
    title: "Food Logger",
    desc: "Log your meals & track nutrition",
    icon: "📝",
    href: "/food-logger",
    color: "from-blue-50 to-indigo-50 border-blue-100",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    title: "Meal Planner",
    desc: "Generate AI weekly meal plans",
    icon: "📅",
    href: "/meal-planner",
    color: "from-primary-50 to-primary-100/50 border-primary-100",
    iconBg: "bg-primary-100 text-primary-600",
  },
  {
    title: "Recipe Finder",
    desc: "Find recipes by ingredients",
    icon: "🔍",
    href: "/recipe-finder",
    color: "from-orange-50 to-amber-50 border-orange-100",
    iconBg: "bg-orange-100 text-orange-600",
  },
  {
    title: "Health Insights",
    desc: "View trends & health alerts",
    icon: "💡",
    href: "/insights",
    color: "from-purple-50 to-fuchsia-50 border-purple-100",
    iconBg: "bg-purple-100 text-purple-600",
  },
];

export default function NavigationCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className={`group flex items-center p-5 rounded-3xl border bg-gradient-to-br ${card.color} transition-all hover:shadow-md hover:-translate-y-0.5`}
        >
          <div className={`flex items-center justify-center w-12 h-12 rounded-2xl text-xl mr-4 ${card.iconBg} transition-transform group-hover:scale-110`}>
            {card.icon}
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base">{card.title}</h3>
            <p className="text-xs text-muted/80">{card.desc}</p>
          </div>
          <div className="ml-auto text-muted/50 group-hover:text-foreground/50 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
