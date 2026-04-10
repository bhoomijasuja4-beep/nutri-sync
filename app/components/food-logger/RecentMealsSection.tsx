"use client";

import { useFoodLogStore } from "@/stores/useFoodLogStore";
import { useState } from "react";

export default function RecentMealsSection() {
  const meals = useFoodLogStore((s) => s.meals);
  const deleteMeal = useFoodLogStore((s) => s.deleteMeal);
  const relogMeal = useFoodLogStore((s) => s.relogMeal);
  
  const [expandedDate, setExpandedDate] = useState<string | null>(meals[0]?.date || null);

  if (meals.length === 0) return null;

  // Group by date
  const grouped = meals.reduce((acc, meal) => {
    if (!acc[meal.date]) acc[meal.date] = [];
    acc[meal.date].push(meal);
    return acc;
  }, {} as Record<string, typeof meals>);

  const dates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-foreground mb-6">Meal History</h2>
      
      <div className="space-y-4">
        {dates.map((date) => {
          const dayMeals = grouped[date];
          const isExpanded = expandedDate === date;
          
          let dateTitle = date;
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          if (date === today) dateTitle = "Today";
          else if (date === yesterday) dateTitle = "Yesterday";
          else {
            dateTitle = new Date(date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
          }

          const dayCals = dayMeals.reduce((s, m) => s + m.totalCalories, 0);

          return (
            <div key={date} className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm">
              <button 
                onClick={() => setExpandedDate(isExpanded ? null : date)}
                className="w-full flex items-center justify-between p-4 bg-surface/30 hover:bg-surface/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                    ▶
                  </div>
                  <h3 className="font-bold text-foreground">{dateTitle}</h3>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary">{dayCals}</span>
                  <span className="text-xs text-muted ml-1">kcal total</span>
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 border-t border-border/40 space-y-3">
                  {dayMeals.map((meal) => (
                    <div key={meal.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface/50 rounded-xl border border-border/40 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">
                            {meal.mealType === "breakfast" ? "🍳" : meal.mealType === "lunch" ? "🥗" : meal.mealType === "dinner" ? "🍲" : "🍎"}
                          </span>
                          <span className="font-bold text-sm text-foreground capitalize">{meal.mealType}</span>
                          <span className="text-xs text-muted">• {meal.totalCalories} kcal</span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">
                          {meal.items.map(i => `${i.foodItem.name} (${i.quantity}x)`).join(", ")}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <button 
                          onClick={() => {
                            if (confirm("Delete this logged meal?")) {
                              deleteMeal(meal.id);
                            }
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                        >
                          Delete
                        </button>
                        <button 
                          onClick={() => {
                            relogMeal(meal.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                          Re-log
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
