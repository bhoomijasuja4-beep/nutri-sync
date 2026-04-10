"use client";

import { useFoodLogStore } from "@/stores/useFoodLogStore";
import ServingAdjuster from "./ServingAdjuster";

export default function NutritionLogTable() {
  const items = useFoodLogStore((s) => s.currentMealItems);
  const removeItem = useFoodLogStore((s) => s.removeItem);
  const adjustQty = useFoodLogStore((s) => s.adjustQuantity);

  if (items.length === 0) {
    return (
      <div className="py-12 text-center border-2 border-dashed border-border/60 rounded-3xl bg-surface/30">
        <div className="text-4xl mb-3">🍽️</div>
        <h3 className="text-sm font-bold text-foreground">Your meal is empty</h3>
        <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
          Search for foods above and add them to build your meal.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border/60 rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-surface/50 text-muted text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold w-full">Food</th>
              <th className="px-6 py-4 font-semibold text-right">Servings</th>
              <th className="px-6 py-4 font-semibold text-right">Calories</th>
              <th className="px-6 py-4 font-semibold text-right hidden sm:table-cell">Protein</th>
              <th className="px-6 py-4 font-semibold text-right hidden sm:table-cell">Carbs</th>
              <th className="px-6 py-4 font-semibold text-right hidden sm:table-cell">Fat</th>
              <th className="px-6 py-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {items.map((item, index) => {
              const { foodItem: food, quantity: q } = item;
              return (
                <tr key={`${food.id}-${index}`} className="hover:bg-surface/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-foreground">{food.name}</p>
                    <p className="text-[10px] text-muted">{food.category}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ServingAdjuster 
                      food={food} 
                      quantity={q} 
                      onQuantityChange={(newQ) => adjustQty(index, newQ)} 
                    />
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-foreground">
                    {Math.round(food.calories * q)}
                  </td>
                  <td className="px-6 py-4 text-right hidden sm:table-cell">
                    {(food.protein * q).toFixed(1)}g
                  </td>
                  <td className="px-6 py-4 text-right hidden sm:table-cell">
                    {(food.carbs * q).toFixed(1)}g
                  </td>
                  <td className="px-6 py-4 text-right hidden sm:table-cell">
                    {(food.fat * q).toFixed(1)}g
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-muted hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                      title="Remove"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
