"use client";

import type { Recipe } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (recipe: Recipe) => void;
  alternatives: Recipe[];
  mealType: string;
}

export default function SwapMealModal({ isOpen, onClose, onSelect, alternatives, mealType }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Swap {mealType}</h2>
            <p className="text-sm text-muted">Select an alternative recipe matching your nutrition goals.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-border/50 transition-colors text-muted hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {alternatives.length === 0 ? (
          <div className="text-center py-12 text-muted">
            <p className="text-4xl mb-2">🤷</p>
            <p>No alternatives found matching your dietary filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alternatives.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => {
                  onSelect(recipe);
                  onClose();
                }}
                className="text-left group bg-surface/30 hover:bg-primary/5 border border-border/60 hover:border-primary/30 rounded-2xl p-4 transition-all hover:shadow-md outline-none focus:ring-2 focus:ring-primary/20"
              >
                <div className="text-4xl mb-3 h-12 w-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-border/40 group-hover:scale-110 transition-transform">
                  {recipe.image}
                </div>
                <h4 className="font-bold text-sm text-foreground mb-1 line-clamp-2 leading-snug">{recipe.name}</h4>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted mb-2">⏱ {recipe.cookTimeMinutes}m</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {recipe.tags.slice(0,2).map(t => (
                    <span key={t} className="text-[9px] bg-white border border-border/40 px-1.5 py-0.5 rounded text-muted">{t}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-1 border-t border-border/40 pt-2 mt-auto">
                  <div className="text-[10px]">
                    <span className="text-muted">Cals:</span> <span className="font-bold text-foreground">{recipe.nutrition.calories}</span>
                  </div>
                  <div className="text-[10px]">
                    <span className="text-muted">Pro:</span> <span className="font-bold text-blue-600">{recipe.nutrition.protein}g</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
