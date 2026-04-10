"use client";

import { useState, useRef, useEffect } from "react";
import type { FoodItem } from "@/types";
import foodsData from "@/data/foods.json";

export default function FoodSearchDropdown({ onSelect }: { onSelect: (food: FoodItem) => void }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const foods = foodsData as FoodItem[];

  const searchResults = query.trim() === "" 
    ? []
    : foods.filter((f) => f.name.toLowerCase().includes(query.toLowerCase())).slice(0, 10);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mb-6" ref={wrapperRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted">
          🔍
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search foods (e.g. Chicken, Apple, Rice...)"
          className="w-full bg-white border border-border/60 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
        />
      </div>

      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-xl border border-border/50 max-h-80 overflow-y-auto overflow-hidden animate-fade-in origin-top">
          {searchResults.map((food, index) => (
            <button
              key={food.id}
              onClick={() => {
                onSelect(food);
                setQuery("");
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-3 hover:bg-surface flex items-center justify-between transition-colors ${
                index !== searchResults.length - 1 ? "border-b border-border/30" : ""
              }`}
            >
              <div>
                <p className="font-semibold text-sm text-foreground">{food.name}</p>
                <p className="text-xs text-muted">
                  {food.servingSize} {food.servingUnit}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{food.calories}</p>
                <p className="text-[10px] text-muted uppercase">kcal</p>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {isOpen && query.length > 0 && searchResults.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-xl border border-border/50 p-6 text-center text-sm text-muted">
          No foods found matching "{query}"
        </div>
      )}
    </div>
  );
}
