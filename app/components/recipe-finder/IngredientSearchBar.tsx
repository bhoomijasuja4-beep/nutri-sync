"use client";

import { useState } from "react";
import { useRecipeStore } from "@/stores/useRecipeStore";

export default function IngredientSearchBar() {
  const [input, setInput] = useState("");
  const filters = useRecipeStore((s) => s.filters);
  const setFilters = useRecipeStore((s) => s.setFilters);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      const newIng = input.trim().toLowerCase();
      if (!filters.searchIngredients.includes(newIng)) {
        setFilters({ searchIngredients: [...filters.searchIngredients, newIng] });
      }
      setInput("");
    } else if (e.key === "Backspace" && input === "" && filters.searchIngredients.length > 0) {
      // Remove last ingredient if backspacing on empty input
      setFilters({ searchIngredients: filters.searchIngredients.slice(0, -1) });
    }
  };

  const removeIngredient = (ing: string) => {
    setFilters({ searchIngredients: filters.searchIngredients.filter(i => i !== ing) });
  };

  return (
    <div className="mb-6">
      <h2 className="text-sm font-bold text-foreground mb-2">What's in your fridge?</h2>
      <div className="bg-white border border-border/60 rounded-2xl p-2 flex flex-wrap items-center gap-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
        <span className="pl-2 text-muted">🔍</span>
        
        {filters.searchIngredients.map(ing => (
          <span key={ing} className="bg-primary/10 text-primary text-sm font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
            {ing}
            <button 
              onClick={() => removeIngredient(ing)}
              className="text-primary/60 hover:text-primary transition-colors ml-1"
            >
              ×
            </button>
          </span>
        ))}
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={filters.searchIngredients.length === 0 ? "Type an ingredient and press Enter..." : "Add another..."}
          className="flex-1 min-w-[150px] bg-transparent border-none py-2 px-2 text-sm focus:outline-none"
        />
      </div>
      <p className="text-xs text-muted mt-2">We'll find recipes that use as many of these ingredients as possible.</p>
    </div>
  );
}
