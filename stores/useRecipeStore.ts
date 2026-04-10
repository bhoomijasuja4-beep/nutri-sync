import { create } from "zustand";
import type { Recipe, RecipeFilters } from "@/types";

interface RecipeState {
  allRecipes: Recipe[];
  searchResults: Recipe[];
  savedRecipeIds: string[];
  filters: RecipeFilters;

  setRecipes: (recipes: Recipe[]) => void;
  search: (recipes: Recipe[]) => void;
  toggleSave: (recipeId: string) => void;
  setFilters: (filters: Partial<RecipeFilters>) => void;
  resetFilters: () => void;
  loadFromStorage: () => void;
}

const defaultFilters: RecipeFilters = {
  mealType: null,
  diet: null,
  maxCookTime: null,
  maxCalories: null,
  searchIngredients: [],
};

function matchesFilters(recipe: Recipe, filters: RecipeFilters): boolean {
  if (filters.mealType && recipe.mealType !== filters.mealType) return false;
  if (filters.diet && !recipe.dietaryLabels.includes(filters.diet)) return false;
  if (filters.maxCookTime && recipe.cookTimeMinutes > filters.maxCookTime) return false;
  if (filters.maxCalories && recipe.nutrition.calories > filters.maxCalories) return false;
  return true;
}

function ingredientMatchScore(recipe: Recipe, ingredients: string[]): number {
  if (ingredients.length === 0) return 1;
  const recipeIngredients = recipe.ingredients.map((i) => i.name.toLowerCase());
  const matched = ingredients.filter((ing) =>
    recipeIngredients.some((ri) => ri.includes(ing.toLowerCase()))
  );
  return matched.length / ingredients.length;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  allRecipes: [],
  searchResults: [],
  savedRecipeIds: [],
  filters: { ...defaultFilters },

  setRecipes: (recipes) => set({ allRecipes: recipes, searchResults: recipes }),

  search: (recipes) => {
    const { filters } = get();
    let results = recipes.filter((r) => matchesFilters(r, filters));

    // If searching by ingredients, sort by match score
    if (filters.searchIngredients.length > 0) {
      results = results
        .map((r) => ({
          recipe: r,
          score: ingredientMatchScore(r, filters.searchIngredients),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.recipe);
    }

    set({ searchResults: results });
  },

  toggleSave: (recipeId) => {
    set((state) => {
      const newSaved = state.savedRecipeIds.includes(recipeId)
        ? state.savedRecipeIds.filter((id) => id !== recipeId)
        : [...state.savedRecipeIds, recipeId];
      if (typeof window !== "undefined") {
        localStorage.setItem("nutrisync_saved_recipes", JSON.stringify(newSaved));
      }
      return { savedRecipeIds: newSaved };
    });
  },

  setFilters: (updates) => {
    set((state) => ({
      filters: { ...state.filters, ...updates },
    }));
  },

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  loadFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("nutrisync_saved_recipes");
      if (stored) set({ savedRecipeIds: JSON.parse(stored) });
    } catch {
      /* ignore */
    }
  },
}));
