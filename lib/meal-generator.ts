// ============================================
// NutriSync — Meal Plan Generator
// Rule-based meal plan creation from recipe data
// ============================================

import type { Recipe, UserProfile, DayPlan, MealSlot } from "@/types";

// Calorie distribution per meal type
const MEAL_CALORIE_SPLIT = {
  breakfast: 0.25,
  lunch: 0.35,
  dinner: 0.30,
  snack: 0.10,
};

// --- Filter recipes for user profile ---
function filterRecipesForProfile(recipes: Recipe[], profile: UserProfile): Recipe[] {
  return recipes.filter((recipe) => {
    // Exclude recipes that conflict with health conditions
    const conditions = profile.healthConditions;

    // Diabetic: prefer low-gi, avoid high-sugar
    if (conditions.includes("diabetes") && recipe.nutrition.sugar > 20) {
      return false;
    }

    // Hypertension: avoid high-sodium
    if (conditions.includes("hypertension") && recipe.nutrition.sodium > 500) {
      return false;
    }

    // Lactose intolerance: check for dairy-free label
    if (conditions.includes("lactose_intolerance")) {
      const hasDairy = recipe.ingredients.some((i) => {
        const name = i.name.toLowerCase();
        return name.includes("milk") || name.includes("cheese") || name.includes("yogurt") || name.includes("cream") || name.includes("butter");
      });
      if (hasDairy && !recipe.dietaryLabels.includes("dairy-free")) return false;
    }

    // Gluten intolerance
    if (conditions.includes("gluten_intolerance")) {
      const hasGluten = recipe.ingredients.some((i) => {
        const name = i.name.toLowerCase();
        return name.includes("bread") || name.includes("pasta") || name.includes("tortilla") || name.includes("flour") || name.includes("bagel");
      });
      if (hasGluten && !recipe.dietaryLabels.includes("gluten-free")) return false;
    }

    // Vegan
    if (conditions.includes("vegan") && !recipe.dietaryLabels.includes("vegan")) {
      return false;
    }

    // Vegetarian
    if (conditions.includes("vegetarian")) {
      if (!recipe.dietaryLabels.includes("vegetarian") && !recipe.dietaryLabels.includes("vegan")) {
        return false;
      }
    }

    return true;
  });
}

// --- Pick best recipe for a meal slot ---
function pickRecipeForSlot(
  mealType: string,
  targetCalories: number,
  available: Recipe[],
  usedIds: Set<string>
): Recipe | null {
  // Filter by meal type
  const candidates = available.filter(
    (r) => r.mealType === mealType && !usedIds.has(r.id)
  );

  if (candidates.length === 0) {
    // Fallback: any unused recipe
    const fallback = available.filter((r) => !usedIds.has(r.id));
    if (fallback.length === 0) return available[0] || null;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  // Sort by how close the recipe's calories are to the target
  const sorted = candidates.sort(
    (a, b) =>
      Math.abs(a.nutrition.calories - targetCalories) -
      Math.abs(b.nutrition.calories - targetCalories)
  );

  // Pick from top 3 closest (add some variety)
  const topN = sorted.slice(0, Math.min(3, sorted.length));
  return topN[Math.floor(Math.random() * topN.length)];
}

// --- Get alternatives for a meal slot ---
export function getAlternatives(
  mealType: string,
  currentRecipeId: string,
  recipes: Recipe[],
  profile: UserProfile,
  count: number = 3
): Recipe[] {
  const filtered = filterRecipesForProfile(recipes, profile);
  const candidates = filtered.filter(
    (r) => r.mealType === mealType && r.id !== currentRecipeId
  );

  // Shuffle and take top N
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// --- Generate a day plan ---
export function generateDayPlan(
  date: string,
  profile: UserProfile,
  recipes: Recipe[]
): DayPlan {
  const filtered = filterRecipesForProfile(recipes, profile);
  const usedIds = new Set<string>();
  const meals: MealSlot[] = [];

  const mealTypes = ["breakfast", "lunch", "dinner", "snack"] as const;

  for (const mealType of mealTypes) {
    const targetCals = Math.round(
      profile.dailyCalorieTarget * MEAL_CALORIE_SPLIT[mealType]
    );

    const recipe = pickRecipeForSlot(mealType, targetCals, filtered, usedIds);
    if (recipe) {
      usedIds.add(recipe.id);

      const alternatives = getAlternatives(
        mealType,
        recipe.id,
        recipes,
        profile,
        3
      );

      meals.push({
        mealType,
        recipe,
        alternatives,
      });
    }
  }

  return {
    date,
    meals,
    totalCalories: meals.reduce((s, m) => s + m.recipe.nutrition.calories, 0),
    totalProtein: meals.reduce((s, m) => s + m.recipe.nutrition.protein, 0),
    totalCarbs: meals.reduce((s, m) => s + m.recipe.nutrition.carbs, 0),
    totalFat: meals.reduce((s, m) => s + m.recipe.nutrition.fat, 0),
  };
}
