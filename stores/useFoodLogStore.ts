import { create } from "zustand";
import type { LoggedMeal, LoggedFoodItem, FoodItem } from "@/types";

interface FoodLogState {
  meals: LoggedMeal[];
  currentMealItems: LoggedFoodItem[];
  currentMealType: "breakfast" | "lunch" | "dinner" | "snack";
  waterGlasses: number;
  waterTarget: number;

  // Current meal building
  setMealType: (type: "breakfast" | "lunch" | "dinner" | "snack") => void;
  addItem: (food: FoodItem, quantity: number, unit: string) => void;
  removeItem: (index: number) => void;
  adjustQuantity: (index: number, quantity: number) => void;
  clearCurrentMeal: () => void;

  // Meal logging
  logMeal: () => void;
  deleteMeal: (mealId: string) => void;
  relogMeal: (mealId: string) => void;

  // Water
  addWater: () => void;
  removeWater: () => void;

  // Persistence
  loadFromStorage: () => void;

  // Computed helpers
  getTodaysMeals: () => LoggedMeal[];
  getMealsByDate: (date: string) => LoggedMeal[];
  getCurrentMealTotals: () => {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    totalFiber: number;
    totalSugar: number;
    totalSodium: number;
  };
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function calculateTotals(items: LoggedFoodItem[]) {
  return items.reduce(
    (acc, item) => {
      const mult = item.quantity;
      return {
        totalCalories: acc.totalCalories + Math.round(item.foodItem.calories * mult),
        totalProtein: acc.totalProtein + Math.round(item.foodItem.protein * mult * 10) / 10,
        totalCarbs: acc.totalCarbs + Math.round(item.foodItem.carbs * mult * 10) / 10,
        totalFat: acc.totalFat + Math.round(item.foodItem.fat * mult * 10) / 10,
        totalFiber: acc.totalFiber + Math.round(item.foodItem.fiber * mult * 10) / 10,
        totalSugar: acc.totalSugar + Math.round(item.foodItem.sugar * mult * 10) / 10,
        totalSodium: acc.totalSodium + Math.round(item.foodItem.sodium * mult),
      };
    },
    { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0, totalFiber: 0, totalSugar: 0, totalSodium: 0 }
  );
}

function saveToStorage(meals: LoggedMeal[], waterGlasses: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem("nutrisync_meals", JSON.stringify(meals));
  localStorage.setItem("nutrisync_water_" + getToday(), String(waterGlasses));
}

export const useFoodLogStore = create<FoodLogState>((set, get) => ({
  meals: [],
  currentMealItems: [],
  currentMealType: "breakfast",
  waterGlasses: 0,
  waterTarget: 8,

  setMealType: (type) => set({ currentMealType: type }),

  addItem: (food, quantity, unit) => {
    set((state) => ({
      currentMealItems: [...state.currentMealItems, { foodItem: food, quantity, unit }],
    }));
  },

  removeItem: (index) => {
    set((state) => ({
      currentMealItems: state.currentMealItems.filter((_, i) => i !== index),
    }));
  },

  adjustQuantity: (index, quantity) => {
    set((state) => ({
      currentMealItems: state.currentMealItems.map((item, i) =>
        i === index ? { ...item, quantity } : item
      ),
    }));
  },

  clearCurrentMeal: () => set({ currentMealItems: [] }),

  logMeal: () => {
    const state = get();
    if (state.currentMealItems.length === 0) return;

    const totals = calculateTotals(state.currentMealItems);
    const meal: LoggedMeal = {
      id: crypto.randomUUID(),
      date: getToday(),
      mealType: state.currentMealType,
      items: [...state.currentMealItems],
      ...totals,
      loggedAt: new Date().toISOString(),
    };

    const newMeals = [meal, ...state.meals];
    saveToStorage(newMeals, state.waterGlasses);
    set({ meals: newMeals, currentMealItems: [] });
  },

  deleteMeal: (mealId) => {
    set((state) => {
      const newMeals = state.meals.filter((m) => m.id !== mealId);
      saveToStorage(newMeals, state.waterGlasses);
      return { meals: newMeals };
    });
  },

  relogMeal: (mealId) => {
    const state = get();
    const meal = state.meals.find((m) => m.id === mealId);
    if (!meal) return;
    set({
      currentMealItems: [...meal.items],
      currentMealType: meal.mealType,
    });
  },

  addWater: () => {
    set((state) => {
      const newCount = state.waterGlasses + 1;
      if (typeof window !== "undefined") {
        localStorage.setItem("nutrisync_water_" + getToday(), String(newCount));
      }
      return { waterGlasses: newCount };
    });
  },

  removeWater: () => {
    set((state) => {
      const newCount = Math.max(0, state.waterGlasses - 1);
      if (typeof window !== "undefined") {
        localStorage.setItem("nutrisync_water_" + getToday(), String(newCount));
      }
      return { waterGlasses: newCount };
    });
  },

  loadFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("nutrisync_meals");
      const meals = stored ? JSON.parse(stored) : [];
      const water = parseInt(localStorage.getItem("nutrisync_water_" + getToday()) || "0", 10);
      set({ meals, waterGlasses: water });
    } catch {
      set({ meals: [], waterGlasses: 0 });
    }
  },

  getTodaysMeals: () => {
    const today = getToday();
    return get().meals.filter((m) => m.date === today);
  },

  getMealsByDate: (date) => {
    return get().meals.filter((m) => m.date === date);
  },

  getCurrentMealTotals: () => {
    return calculateTotals(get().currentMealItems);
  },
}));
