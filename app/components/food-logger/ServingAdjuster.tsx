"use client";

import type { FoodItem } from "@/types";

interface Props {
  food: FoodItem;
  quantity: number;
  onQuantityChange: (q: number) => void;
}

export default function ServingAdjuster({ food, quantity, onQuantityChange }: Props) {
  return (
    <div className="flex items-center gap-3 bg-surface/50 p-2 rounded-xl border border-border/60">
      <input
        type="number"
        value={quantity}
        onChange={(e) => onQuantityChange(Math.max(0.1, Number(e.target.value)))}
        min="0.1"
        step="0.1"
        className="w-16 bg-white border border-border/60 rounded-lg py-1 px-2 text-center text-sm font-semibold focus:outline-none focus:border-primary"
      />
      <span className="text-xs font-medium text-muted whitespace-nowrap">
        × {food.servingSize}{food.servingUnit}
      </span>
    </div>
  );
}
