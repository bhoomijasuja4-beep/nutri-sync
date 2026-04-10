import { create } from "zustand";
import type { MealPlan, DayPlan, MealSlot, Recipe, UserProfile } from "@/types";
import { generateDayPlan, getAlternatives } from "@/lib/meal-generator";

interface MealPlanState {
  currentPlan: MealPlan | null;
  savedPlans: MealPlan[];
  isWeekly: boolean;

  generatePlan: (profile: UserProfile, recipes: Recipe[]) => void;
  swapMeal: (dayIndex: number, mealType: string, newRecipe: Recipe) => void;
  savePlan: () => void;
  setWeekly: (weekly: boolean) => void;
  loadFromStorage: () => void;
}

function saveToStorage(plans: MealPlan[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("nutrisync_mealplans", JSON.stringify(plans));
}

export const useMealPlanStore = create<MealPlanState>((set, get) => ({
  currentPlan: null,
  savedPlans: [],
  isWeekly: false,

  generatePlan: (profile, recipes) => {
    const days: DayPlan[] = [];
    const numDays = get().isWeekly ? 7 : 1;

    for (let i = 0; i < numDays; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      days.push(generateDayPlan(dateStr, profile, recipes));
    }

    const plan: MealPlan = {
      id: crypto.randomUUID(),
      days,
      createdAt: new Date().toISOString(),
      profileSnapshot: {
        goal: profile.goal,
        calorieTarget: profile.dailyCalorieTarget,
        healthConditions: [...profile.healthConditions],
      },
    };

    set({ currentPlan: plan });
  },

  swapMeal: (dayIndex, mealType, newRecipe) => {
    set((state) => {
      if (!state.currentPlan) return state;
      const newDays = [...state.currentPlan.days];
      const day = { ...newDays[dayIndex] };
      day.meals = day.meals.map((slot) => {
        if (slot.mealType === mealType) {
          return { ...slot, recipe: newRecipe };
        }
        return slot;
      });

      // Recalculate day totals
      day.totalCalories = day.meals.reduce((s, m) => s + m.recipe.nutrition.calories, 0);
      day.totalProtein = day.meals.reduce((s, m) => s + m.recipe.nutrition.protein, 0);
      day.totalCarbs = day.meals.reduce((s, m) => s + m.recipe.nutrition.carbs, 0);
      day.totalFat = day.meals.reduce((s, m) => s + m.recipe.nutrition.fat, 0);

      newDays[dayIndex] = day;
      return { currentPlan: { ...state.currentPlan, days: newDays } };
    });
  },

  savePlan: () => {
    const state = get();
    if (!state.currentPlan) return;
    const newSaved = [state.currentPlan, ...state.savedPlans].slice(0, 10);
    saveToStorage(newSaved);
    set({ savedPlans: newSaved });
  },

  setWeekly: (weekly) => set({ isWeekly: weekly }),

  loadFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("nutrisync_mealplans");
      if (stored) set({ savedPlans: JSON.parse(stored) });
    } catch {
      /* ignore */
    }
  },
}));
