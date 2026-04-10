"use client";

import type { DayPlan } from "@/types";

interface Props {
  plan: DayPlan;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
}

export default function DailyNutritionSummary({ plan, targetProtein, targetCarbs, targetFat }: Props) {
  return (
    <div className="bg-white rounded-3xl p-5 border border-border/60 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6">
      <div className="shrink-0 text-center md:text-left">
        <p className="text-sm font-medium text-muted mb-1">Daily Total</p>
        <div className="flex items-baseline gap-1 justify-center md:justify-start">
          <span className="text-3xl font-bold text-primary">{plan.totalCalories}</span>
          <span className="text-sm text-muted font-medium">kcal</span>
        </div>
      </div>
      
      <div className="flex-1 w-full grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0 md:pl-6">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-blue-600">Protein</span>
            <span className="text-foreground">{Math.round(plan.totalProtein)}g</span>
          </div>
          <div className="h-1.5 w-full bg-blue-50 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((plan.totalProtein / targetProtein) * 100, 100)}%` }} />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-orange-600">Carbs</span>
            <span className="text-foreground">{Math.round(plan.totalCarbs)}g</span>
          </div>
          <div className="h-1.5 w-full bg-orange-50 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min((plan.totalCarbs / targetCarbs) * 100, 100)}%` }} />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-yellow-600">Fat</span>
            <span className="text-foreground">{Math.round(plan.totalFat)}g</span>
          </div>
          <div className="h-1.5 w-full bg-yellow-50 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${Math.min((plan.totalFat / targetFat) * 100, 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
