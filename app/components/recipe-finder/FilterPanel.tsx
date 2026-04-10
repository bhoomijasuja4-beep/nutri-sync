"use client";

import { useRecipeStore } from "@/stores/useRecipeStore";

export default function FilterPanel() {
  const filters = useRecipeStore((s) => s.filters);
  const setFilters = useRecipeStore((s) => s.setFilters);
  const resetFilters = useRecipeStore((s) => s.resetFilters);

  return (
    <div className="bg-white rounded-3xl p-5 border border-border/60 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
      <div>
        <label className="block text-xs font-semibold text-muted mb-1.5">Meal Type</label>
        <select 
          value={filters.mealType || ""}
          onChange={(e) => setFilters({ mealType: e.target.value || null })}
          className="bg-surface/50 border border-border/60 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
        >
          <option value="">Any Meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted mb-1.5">Diet</label>
        <select 
          value={filters.diet || ""}
          onChange={(e) => setFilters({ diet: e.target.value || null })}
          className="bg-surface/50 border border-border/60 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
        >
          <option value="">Any Diet</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="dairy-free">Dairy-Free</option>
          <option value="low-carb">Low Carb</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted mb-1.5">Max Time (min)</label>
        <select 
          value={filters.maxCookTime || ""}
          onChange={(e) => setFilters({ maxCookTime: e.target.value ? Number(e.target.value) : null })}
          className="bg-surface/50 border border-border/60 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
        >
          <option value="">Any Time</option>
          <option value="15">Under 15m</option>
          <option value="30">Under 30m</option>
          <option value="45">Under 45m</option>
        </select>
      </div>

      <button 
        onClick={resetFilters}
        className="ml-auto text-xs font-semibold text-primary hover:text-primary-dark hover:underline py-2 px-3 mt-4"
      >
        Clear Filters
      </button>
    </div>
  );
}
