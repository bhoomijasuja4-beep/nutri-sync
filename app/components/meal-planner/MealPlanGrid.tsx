"use client";

import type { DayPlan } from "@/types";
import MealCard from "../shared/MealCard";

interface Props {
  plan: DayPlan;
  onSwapRequest: (dayIndex: number, mealType: string) => void;
  dayIndex: number;
}

export default function MealPlanGrid({ plan, onSwapRequest, dayIndex }: Props) {
  const dateStr = new Date(plan.date).toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' });
  const isToday = plan.date === new Date().toISOString().split('T')[0];

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4 pl-2">
        <h2 className="text-xl font-bold text-foreground">
          {isToday ? "Today's Plan" : dateStr}
        </h2>
        {isToday && (
          <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Current
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plan.meals.map((meal) => (
          <MealCard 
            key={`${plan.date}-${meal.mealType}`}
            mealType={meal.mealType}
            recipe={meal.recipe}
            onSwapClick={() => onSwapRequest(dayIndex, meal.mealType)}
          />
        ))}
      </div>
    </div>
  );
}
