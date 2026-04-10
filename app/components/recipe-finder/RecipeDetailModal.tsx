"use client";

import type { Recipe } from "@/types";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { useFoodLogStore } from "@/stores/useFoodLogStore";

interface Props {
  recipe: Recipe | null;
  onClose: () => void;
  searchedIngredients: string[];
}

export default function RecipeDetailModal({ recipe, onClose, searchedIngredients }: Props) {
  const { savedRecipeIds, toggleSave } = useRecipeStore();
  const { setMealType, clearCurrentMeal, addItem, logMeal } = useFoodLogStore();

  if (!recipe) return null;

  const isSaved = savedRecipeIds.includes(recipe.id);

  const handleLogMeal = () => {
    // Treat the whole recipe as a "food item" for the logger to make things simple
    const mockFoodItem = {
      id: `recipe-${recipe.id}`,
      name: recipe.name,
      category: "Recipe",
      servingSize: 1,
      servingUnit: "serving",
      calories: recipe.nutrition.calories,
      protein: recipe.nutrition.protein,
      carbs: recipe.nutrition.carbs,
      fat: recipe.nutrition.fat,
      fiber: recipe.nutrition.fiber,
      sugar: recipe.nutrition.sugar,
      sodium: recipe.nutrition.sodium,
    };

    setMealType(recipe.mealType as "breakfast" | "lunch" | "dinner" | "snack");
    clearCurrentMeal();
    addItem(mockFoodItem, 1, "serving");
    logMeal();
    onClose();
    alert("Meal logged successfully!"); // simple notification for now
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl w-full max-w-3xl shadow-2xl animate-fade-up max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-50 to-white px-6 md:px-8 py-6 border-b border-border/40 flex items-start gap-4 shrink-0">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-border/40 shrink-0">
            {recipe.image}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-2 pr-4">{recipe.name}</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-border/50 transition-colors text-muted hover:text-foreground shrink-0"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-lg capitalize">{recipe.mealType}</span>
              <span className="bg-surface text-foreground border border-border/60 px-2.5 py-1 rounded-lg">⏱ {recipe.cookTimeMinutes} mins</span>
              <span className="bg-surface text-foreground border border-border/60 px-2.5 py-1 rounded-lg">🍽 {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Ingredients & Nutrition */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Ingredients</h3>
              <ul className="space-y-3 mb-8">
                {recipe.ingredients.map((ing, i) => {
                  const isMatched = searchedIngredients.some(si => ing.name.toLowerCase().includes(si.toLowerCase()));
                  return (
                    <li key={i} className="flex items-center justify-between text-sm py-2 px-3 rounded-lg bg-surface/30 border border-border/40">
                      <span className={`font-medium ${isMatched ? 'text-primary' : 'text-foreground'}`}>
                        {ing.name}
                        {isMatched && <span className="ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase tracking-wider">You have this</span>}
                      </span>
                      <span className="text-muted font-mono text-xs">{ing.amount} {ing.unit}</span>
                    </li>
                  )
                })}
              </ul>

              <h3 className="text-lg font-bold text-foreground mb-4">Nutrition Facts</h3>
              <div className="bg-surface/50 rounded-2xl p-4 border border-border/40 grid grid-cols-2 gap-y-4">
                <div><p className="text-xs text-muted">Calories</p><p className="font-bold text-foreground">{recipe.nutrition.calories} kcal</p></div>
                <div><p className="text-xs text-muted">Protein</p><p className="font-bold text-blue-600">{recipe.nutrition.protein}g</p></div>
                <div><p className="text-xs text-muted">Carbs</p><p className="font-bold text-orange-600">{recipe.nutrition.carbs}g</p></div>
                <div><p className="text-xs text-muted">Fat</p><p className="font-bold text-yellow-600">{recipe.nutrition.fat}g</p></div>
                <div><p className="text-xs text-muted">Fiber</p><p className="font-bold text-foreground">{recipe.nutrition.fiber}g</p></div>
                <div><p className="text-xs text-muted">Sugar</p><p className="font-bold text-foreground">{recipe.nutrition.sugar}g</p></div>
              </div>
            </div>

            {/* Right: Instructions & Labels */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Instructions</h3>
              <ol className="space-y-4 mb-8">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>

              <h3 className="text-lg font-bold text-foreground mb-4">Dietary Labels</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.dietaryLabels.map(l => (
                  <span key={l} className="bg-surface border border-border/60 text-muted px-3 py-1.5 rounded-xl text-xs font-medium capitalize">
                    {l.replace("-", " ")}
                  </span>
                ))}
                {recipe.tags.map(t => (
                  <span key={t} className="bg-surface border border-border/60 text-muted px-3 py-1.5 rounded-xl text-xs font-medium capitalize">
                    {t.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border/40 p-4 shrink-0 bg-surface/30 flex gap-3">
          <button
            onClick={() => toggleSave(recipe.id)}
            className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all border ${
              isSaved 
                ? "bg-primary/10 border-primary/20 text-primary" 
                : "bg-white border-border/60 text-foreground hover:bg-surface"
            }`}
          >
            {isSaved ? "Saved ♥" : "Save Recipe ♡"}
          </button>
          
          <button
            onClick={handleLogMeal}
            className="flex-1 flex justify-center items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
          >
            Log This Meal 📝
          </button>
        </div>

      </div>
    </div>
  );
}
