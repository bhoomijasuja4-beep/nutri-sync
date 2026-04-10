"use client";

import { useFoodLogStore } from "@/stores/useFoodLogStore";

const mealTypes = [
  { id: "breakfast", label: "Breakfast", icon: "🌅" },
  { id: "lunch", label: "Lunch", icon: "☀️" },
  { id: "dinner", label: "Dinner", icon: "🌙" },
  { id: "snack", label: "Snack", icon: "🍎" },
] as const;

export default function MealTypeSelector() {
  const currentType = useFoodLogStore((s) => s.currentMealType);
  const setType = useFoodLogStore((s) => s.setMealType);

  return (
    <div className="flex gap-2 p-1 bg-surface rounded-2xl mb-6 overflow-x-auto no-scrollbar">
      {mealTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => setType(type.id)}
          className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
            currentType === type.id
              ? "bg-white text-foreground shadow-sm ring-1 ring-border/50"
              : "text-muted hover:text-foreground hover:bg-white/50"
          }`}
        >
          <span>{type.icon}</span>
          {type.label}
        </button>
      ))}
    </div>
  );
}
