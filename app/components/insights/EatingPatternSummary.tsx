"use client";

import type { DailyNutritionSummary, MacroTargets } from "@/types";

interface Props {
  summaries: DailyNutritionSummary[];
  targetCals: number;
}

export default function EatingPatternSummary({ summaries, targetCals }: Props) {
  const loggedDays = summaries.filter(s => s.mealCount > 0);
  
  if (loggedDays.length === 0) {
    return (
      <div className="bg-surface/50 rounded-2xl p-6 text-center border border-border/40">
        <p className="text-muted text-sm">Not enough data to analyze eating patterns yet.</p>
      </div>
    );
  }

  // Generate pattern sentences
  const patterns = [];
  
  const overDays = loggedDays.filter(d => d.totalCalories > targetCals * 1.1).length;
  if (overDays > 0) {
    patterns.push(`You've exceeded your calorie goal on ${overDays} of the last ${loggedDays.length} logged days.`);
  }

  const avgSugar = loggedDays.reduce((s, d) => s + d.totalSugar, 0) / loggedDays.length;
  if (avgSugar > 35) {
    patterns.push(`Your average sugar intake (${Math.round(avgSugar)}g) is higher than recommended.`);
  } else {
    patterns.push(`Great job keeping your average sugar intake low (${Math.round(avgSugar)}g).`);
  }

  const breakfastSkipped = loggedDays.filter(d => !d.mealsLogged.includes('breakfast')).length;
  if (breakfastSkipped > 0) {
    patterns.push(`You skipped breakfast on ${breakfastSkipped} days in this period.`);
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-border/60 shadow-sm h-full">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
         Brain Analysis 🧠
      </h3>
      <ul className="space-y-4">
        {patterns.map((pattern, i) => (
          <li key={i} className="flex gap-3 text-sm text-foreground">
            <span className="text-primary mt-0.5">•</span>
            <span className="leading-relaxed">{pattern}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
