"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/app/components/layout/AppLayout";
import PlannerHeader from "@/app/components/meal-planner/PlannerHeader";
import ProfileSummaryChip from "@/app/components/meal-planner/ProfileSummaryChip";
import MealPlanGrid from "@/app/components/meal-planner/MealPlanGrid";
import DailyNutritionSummary from "@/app/components/meal-planner/DailyNutritionSummary";
import SwapMealModal from "@/app/components/meal-planner/SwapMealModal";

import { useUserStore } from "@/stores/useUserStore";
import { useMealPlanStore } from "@/stores/useMealPlanStore";
import recipesData from "@/data/recipes.json";
import type { Recipe } from "@/types";

export default function MealPlannerPage() {
  const profile = useUserStore((s) => s.profile);
  const { currentPlan, isWeekly, setWeekly, generatePlan, swapMeal, savePlan } = useMealPlanStore();
  
  const [swapState, setSwapState] = useState<{ isOpen: boolean; dayIndex: number; mealType: string; alternatives: Recipe[] }>({
    isOpen: false,
    dayIndex: 0,
    mealType: "",
    alternatives: []
  });

  const recipes = recipesData as Recipe[];

  useEffect(() => {
    // Generate initial plan if none exists
    if (profile && !currentPlan) {
      generatePlan(profile, recipes);
    }
  }, [profile, currentPlan, generatePlan, recipes]);

  if (!profile || !currentPlan) return null;

  const handleRegenerate = () => {
    generatePlan(profile, recipes);
  };

  const handleSwapRequest = (dayIndex: number, mealType: string) => {
    const day = currentPlan.days[dayIndex];
    const meal = day.meals.find(m => m.mealType === mealType);
    if (meal) {
      setSwapState({
        isOpen: true,
        dayIndex,
        mealType,
        alternatives: meal.alternatives
      });
    }
  };

  const executeSwap = (newRecipe: Recipe) => {
    swapMeal(swapState.dayIndex, swapState.mealType, newRecipe);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <PlannerHeader 
          isWeekly={isWeekly}
          onSetWeekly={(v) => { setWeekly(v); generatePlan(profile, recipes); }}
          onRegenerate={handleRegenerate}
          onSave={savePlan}
        />
        
        <ProfileSummaryChip />

        {currentPlan.days.map((day, i) => (
          <div key={day.date} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <DailyNutritionSummary 
              plan={day}
              targetProtein={profile.macroTargets.proteinG}
              targetCarbs={profile.macroTargets.carbsG}
              targetFat={profile.macroTargets.fatG}
            />
            <MealPlanGrid 
              plan={day} 
              dayIndex={i}
              onSwapRequest={handleSwapRequest} 
            />
          </div>
        ))}

        <SwapMealModal 
          isOpen={swapState.isOpen}
          onClose={() => setSwapState(s => ({ ...s, isOpen: false }))}
          onSelect={executeSwap}
          alternatives={swapState.alternatives}
          mealType={swapState.mealType}
        />
      </div>
    </AppLayout>
  );
}
