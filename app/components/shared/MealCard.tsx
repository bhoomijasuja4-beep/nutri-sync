"use client";

import type { Recipe } from "@/types";

interface Props {
  recipe: Recipe;
  mealType: string;
  onSwapClick?: () => void;
  hideSwap?: boolean;
}

export default function MealCard({ recipe, mealType, onSwapClick, hideSwap = false }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted capitalize">{mealType}</span>
            <span className="text-xs font-medium bg-surface px-2 py-0.5 rounded-full text-foreground border border-border/40">
              ⏱ {recipe.cookTimeMinutes}m
            </span>
          </div>
          {!hideSwap && onSwapClick && (
            <button 
              onClick={onSwapClick}
              className="text-xs font-semibold text-primary hover:text-primary-dark opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 px-2.5 py-1 rounded-lg"
            >
              Swap ⟲
            </button>
          )}
        </div>

        <div className="flex gap-4">
          <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-primary/5 to-surface rounded-xl flex items-center justify-center text-3xl border border-border/40">
            {recipe.image}
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {recipe.name}
            </h4>
            <div className="flex flex-wrap gap-1 mt-2">
              {recipe.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] font-medium text-muted bg-surface px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface/50 p-3 border-t border-border/40 grid grid-cols-4 gap-2 text-center mt-auto">
        <div>
          <p className="text-[10px] text-muted uppercase font-semibold">Cals</p>
          <p className="text-xs font-bold text-foreground">{recipe.nutrition.calories}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted uppercase font-semibold">Pro</p>
          <p className="text-xs font-bold text-blue-600">{recipe.nutrition.protein}g</p>
        </div>
        <div>
          <p className="text-[10px] text-muted uppercase font-semibold">Carb</p>
          <p className="text-xs font-bold text-orange-600">{recipe.nutrition.carbs}g</p>
        </div>
        <div>
          <p className="text-[10px] text-muted uppercase font-semibold">Fat</p>
          <p className="text-xs font-bold text-yellow-600">{recipe.nutrition.fat}g</p>
        </div>
      </div>
    </div>
  );
}
