// ============================================
// NutriSync — Nutrition Calculation Engine
// Mifflin-St Jeor BMR, TDEE, Macro Targets
// ============================================

import type { UserProfile, MacroTargets, HealthCondition } from "@/types";

// --- BMI ---
export function calculateBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number): {
  label: string;
  color: string;
  emoji: string;
} {
  if (bmi < 18.5) return { label: "Underweight", color: "#3b82f6", emoji: "🔵" };
  if (bmi < 25) return { label: "Normal", color: "#22c55e", emoji: "🟢" };
  if (bmi < 30) return { label: "Overweight", color: "#f59e0b", emoji: "🟡" };
  return { label: "Obese", color: "#ef4444", emoji: "🔴" };
}

// --- BMR (Mifflin-St Jeor) ---
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: "male" | "female" | "other"
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === "male") return Math.round(base + 5);
  if (gender === "female") return Math.round(base - 161);
  // "other" — use average of male/female
  return Math.round(base - 78);
}

// --- TDEE ---
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
};

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
}

// --- Daily Calorie Target ---
export function calculateDailyTarget(
  tdee: number,
  goal: string
): number {
  switch (goal) {
    case "lose_weight":
      return Math.round(tdee - 500);
    case "gain_muscle":
      return Math.round(tdee + 300);
    case "maintain":
    case "improve_energy":
    default:
      return tdee;
  }
}

// --- Macro Targets ---
type MacroSplit = { protein: number; carbs: number; fat: number };

const MACRO_SPLITS: Record<string, MacroSplit> = {
  default: { protein: 0.25, carbs: 0.5, fat: 0.25 },
  diabetic: { protein: 0.3, carbs: 0.35, fat: 0.35 },
  gain_muscle: { protein: 0.35, carbs: 0.45, fat: 0.2 },
  lose_weight: { protein: 0.35, carbs: 0.4, fat: 0.25 },
};

export function calculateMacroTargets(
  dailyCalories: number,
  goal: string,
  healthConditions: HealthCondition[]
): MacroTargets {
  // Pick macro split based on conditions → goal → default
  let split: MacroSplit;
  if (healthConditions.includes("diabetes")) {
    split = MACRO_SPLITS.diabetic;
  } else if (goal === "gain_muscle") {
    split = MACRO_SPLITS.gain_muscle;
  } else if (goal === "lose_weight") {
    split = MACRO_SPLITS.lose_weight;
  } else {
    split = MACRO_SPLITS.default;
  }

  // Convert % to grams (protein & carbs = 4 cal/g, fat = 9 cal/g)
  const proteinG = Math.round((dailyCalories * split.protein) / 4);
  const carbsG = Math.round((dailyCalories * split.carbs) / 4);
  const fatG = Math.round((dailyCalories * split.fat) / 9);

  return {
    proteinG,
    carbsG,
    fatG,
    fiberG: 30, // WHO recommended minimum
    sugarG: 25, // WHO free sugar limit
    sodiumMg: healthConditions.includes("hypertension") ? 1500 : 2300,
  };
}

// --- Full Profile Calculation ---
export function calculateFullProfile(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: "male" | "female" | "other",
  activityLevel: string,
  goal: string,
  healthConditions: HealthCondition[]
): {
  bmi: number;
  bmr: number;
  tdee: number;
  dailyCalorieTarget: number;
  macroTargets: MacroTargets;
} {
  const bmi = calculateBMI(weightKg, heightCm);
  const bmr = calculateBMR(weightKg, heightCm, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const dailyCalorieTarget = calculateDailyTarget(tdee, goal);
  const macroTargets = calculateMacroTargets(dailyCalorieTarget, goal, healthConditions);

  return { bmi, bmr, tdee, dailyCalorieTarget, macroTargets };
}

// --- Utility: Nutrient totals from food items ---
export function calculateMealTotals(
  items: { calories: number; protein: number; carbs: number; fat: number; fiber: number; sugar: number; sodium: number; quantity: number }[]
) {
  return items.reduce(
    (acc, item) => ({
      totalCalories: acc.totalCalories + Math.round(item.calories * item.quantity),
      totalProtein: acc.totalProtein + Math.round(item.protein * item.quantity * 10) / 10,
      totalCarbs: acc.totalCarbs + Math.round(item.carbs * item.quantity * 10) / 10,
      totalFat: acc.totalFat + Math.round(item.fat * item.quantity * 10) / 10,
      totalFiber: acc.totalFiber + Math.round(item.fiber * item.quantity * 10) / 10,
      totalSugar: acc.totalSugar + Math.round(item.sugar * item.quantity * 10) / 10,
      totalSodium: acc.totalSodium + Math.round(item.sodium * item.quantity),
    }),
    {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
      totalSugar: 0,
      totalSodium: 0,
    }
  );
}

// --- Percentage helpers ---
export function nutrientPercentage(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

export function calorieStatus(
  consumed: number,
  target: number
): { label: string; color: string } {
  const pct = (consumed / target) * 100;
  if (pct < 80) return { label: "Under target", color: "#3b82f6" };
  if (pct <= 110) return { label: "On track", color: "#22c55e" };
  if (pct <= 120) return { label: "Slightly over", color: "#f59e0b" };
  return { label: "Over target", color: "#ef4444" };
}
