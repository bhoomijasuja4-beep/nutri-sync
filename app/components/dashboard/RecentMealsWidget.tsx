"use client";

import { useFoodLogStore } from "@/stores/useFoodLogStore";
import Link from "next/link";

export default function RecentMealsWidget() {
  const meals = useFoodLogStore((s) => s.meals);
  const recentMeals = meals.slice(0, 3);

  if (recentMeals.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-border/60 shadow-sm mb-6 text-center">
        <div className="text-3xl mb-2">🍽️</div>
        <h3 className="text-sm font-bold text-foreground">No meals logged yet</h3>
        <p className="text-xs text-muted mb-4 mt-1">Start tracking to see your recent meals here.</p>
        <Link 
          href="/food-logger"
          className="inline-flex items-center justify-center rounded-xl bg-primary/10 text-primary px-4 py-2 text-xs font-semibold hover:bg-primary/20 transition-colors"
        >
          Log a meal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-border/60 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-foreground">Recent Meals</h3>
        <Link href="/food-logger" className="text-xs text-primary font-semibold hover:underline">
          View all
        </Link>
      </div>
      
      <div className="space-y-3">
        {recentMeals.map((meal) => (
          <div key={meal.id} className="flex items-center justify-between p-3 rounded-2xl bg-surface/50 border border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-border/60 flex items-center justify-center text-lg shadow-sm">
                {meal.mealType === "breakfast" ? "🍳" : meal.mealType === "lunch" ? "🥗" : meal.mealType === "dinner" ? "🍲" : "🍎"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground capitalize">{meal.mealType}</p>
                <p className="text-[10px] text-muted truncate max-w-[120px] sm:max-w-[200px]">
                  {meal.items.map(i => i.foodItem.name).join(", ")}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-foreground">{meal.totalCalories}</p>
              <p className="text-[10px] text-muted uppercase">kcal</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
