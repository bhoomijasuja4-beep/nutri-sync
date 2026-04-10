"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/app/components/layout/AppLayout";
import IngredientSearchBar from "@/app/components/recipe-finder/IngredientSearchBar";
import FilterPanel from "@/app/components/recipe-finder/FilterPanel";
import RecipeGrid from "@/app/components/recipe-finder/RecipeGrid";
import RecipeDetailModal from "@/app/components/recipe-finder/RecipeDetailModal";

import { useRecipeStore } from "@/stores/useRecipeStore";
import recipesData from "@/data/recipes.json";
import type { Recipe } from "@/types";

export default function RecipeFinderPage() {
  const { searchResults, search, filters } = useRecipeStore();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  useEffect(() => {
    // Perform search whenever filters change
    search(recipesData as Recipe[]);
  }, [filters, search]);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Recipe Finder</h1>
          <p className="text-sm text-muted mt-2">Discover healthy recipes based on what you have in your fridge.</p>
        </div>

        <IngredientSearchBar />
        <FilterPanel />
        
        <div className="mb-4">
          <p className="text-sm font-semibold text-muted">Found {searchResults.length} {searchResults.length === 1 ? 'recipe' : 'recipes'}</p>
        </div>

        <RecipeGrid 
          recipes={searchResults}
          onRecipeClick={setSelectedRecipe}
          searchedIngredients={filters.searchIngredients}
        />

        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          searchedIngredients={filters.searchIngredients}
        />
      </div>
    </AppLayout>
  );
}
