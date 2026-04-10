"use client";

import { useFoodLogStore } from "@/stores/useFoodLogStore";
import { useUserStore } from "@/stores/useUserStore";

export default function NutritionTotalsPanel() {
  const profile = useUserStore((s) => s.profile);
  const items = useFoodLogStore((s) => s.currentMealItems);
  const logMeal = useFoodLogStore((s) => s.logMeal);
  const currentType = useFoodLogStore((s) => s.currentMealType);
  const totals = useFoodLogStore((s) => s.getCurrentMealTotals());

  if (!profile) return null;

  const target = profile.dailyCalorieTarget;
  const m = profile.macroTargets;

  return (
    <div className="bg-white rounded-3xl p-6 border border-border/60 shadow-sm sticky top-6">
      <h3 className="text-lg font-bold text-foreground mb-4 capitalize">
        {currentType} Summary
      </h3>

      <div className="flex items-end justify-between mb-6 pb-6 border-b border-border/40">
        <div>
          <p className="text-sm font-medium text-muted mb-1">Total Calories</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-primary">{totals.totalCalories}</span>
            <span className="text-sm text-muted font-medium">kcal</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-blue-600">Protein</span>
            <span className="text-foreground">{totals.totalProtein}g <span className="text-muted font-normal">/ {m.proteinG}g</span></span>
          </div>
          <div className="h-2 w-full bg-blue-50 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((totals.totalProtein / m.proteinG) * 100, 100)}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-orange-600">Carbs</span>
            <span className="text-foreground">{totals.totalCarbs}g <span className="text-muted font-normal">/ {m.carbsG}g</span></span>
          </div>
          <div className="h-2 w-full bg-orange-50 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min((totals.totalCarbs / m.carbsG) * 100, 100)}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-yellow-600">Fat</span>
            <span className="text-foreground">{totals.totalFat}g <span className="text-muted font-normal">/ {m.fatG}g</span></span>
          </div>
          <div className="h-2 w-full bg-yellow-50 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${Math.min((totals.totalFat / m.fatG) * 100, 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8 bg-surface/50 p-3 rounded-2xl border border-border/40">
        <div className="text-center p-2">
          <p className="text-[10px] text-muted uppercase tracking-wider font-semibold mb-1">Fiber</p>
          <p className="text-xs font-bold text-foreground">{totals.totalFiber}g</p>
        </div>
        <div className="text-center p-2 border-l border-border/40">
          <p className="text-[10px] text-muted uppercase tracking-wider font-semibold mb-1">Sugar</p>
          <p className={`text-xs font-bold ${totals.totalSugar > 20 ? 'text-red-500' : 'text-foreground'}`}>{totals.totalSugar}g</p>
        </div>
        <div className="text-center p-2 border-l border-border/40">
          <p className="text-[10px] text-muted uppercase tracking-wider font-semibold mb-1">Sodium</p>
          <p className={`text-xs font-bold ${totals.totalSodium > 800 ? 'text-red-500' : 'text-foreground'}`}>{totals.totalSodium}mg</p>
        </div>
      </div>

      <button
        onClick={logMeal}
        disabled={items.length === 0}
        className="w-full flex items-center justify-center rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        Log {currentType}
      </button>
    </div>
  );
}
