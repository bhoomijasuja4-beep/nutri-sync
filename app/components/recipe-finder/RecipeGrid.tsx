"use client";

import type { Recipe } from "@/types";
import MealCard from "../shared/MealCard";

interface Props {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
  searchedIngredients: string[];
}

export default function RecipeGrid({ recipes, onRecipeClick, searchedIngredients }: Props) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border/60">
        <p className="text-4xl mb-4">🍽️</p>
        <h3 className="text-lg font-bold text-foreground">No recipes found</h3>
        <p className="text-sm text-muted">Try removing some filters or ingredients to see more results.</p>
      </div>
    );
  }

  // Calculate match percentage if we have searched ingredients
  const getMatchPct = (recipe: Recipe) => {
    if (searchedIngredients.length === 0) return null;
    const recipeIngs = recipe.ingredients.map(i => i.name.toLowerCase());
    const matched = searchedIngredients.filter(si => 
      recipeIngs.some(ri => ri.includes(si))
    );
    return Math.round((matched.length / searchedIngredients.length) * 100);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe, i) => {
        const matchPct = getMatchPct(recipe);
        
        return (
          <div key={recipe.id} className="relative animate-fade-up cursor-pointer" style={{ animationDelay: `${i * 0.05}s` }}>
            <div onClick={() => onRecipeClick(recipe)}>
              <MealCard 
                mealType={recipe.mealType} 
                recipe={recipe} 
                hideSwap={true}
              />
            </div>
            
            {matchPct !== null && (
              <div className={`absolute -top-3 -right-3 px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg z-10 ${
                matchPct === 100 ? 'bg-emerald-500' : matchPct > 50 ? 'bg-amber-500' : 'bg-gray-400'
              }`}>
                {matchPct}% Match
              </div>
            )}
          </div>
        )
      })}
    </div>
  );
}
