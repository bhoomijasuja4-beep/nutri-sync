"use client";

import { useUserStore } from "@/stores/useUserStore";

interface MacroProps {
  protein: number;
  carbs: number;
  fat: number;
}

export default function MacroRingSummary({ protein, carbs, fat }: MacroProps) {
  const profile = useUserStore((s) => s.profile);
  if (!profile) return null;

  const targets = profile.macroTargets;

  const macros = [
    { label: "Protein", current: protein, target: targets.proteinG, color: "#3b82f6", bg: "#dbeafe" }, // Blue
    { label: "Carbs", current: carbs, target: targets.carbsG, color: "#f59e0b", bg: "#fef3c7" }, // Orange
    { label: "Fat", current: fat, target: targets.fatG, color: "#eab308", bg: "#fef08a" }, // Yellow
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-border/60 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-foreground mb-6">Daily Macros</h3>
      <div className="grid grid-cols-3 gap-4">
        {macros.map((m) => {
          const pct = Math.min((m.current / m.target) * 100, 100);
          return (
            <div key={m.label} className="flex flex-col items-center">
              <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke={m.bg} strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={m.color}
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * pct) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-muted font-medium uppercase tracking-wide">{m.label}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-foreground leading-tight">{m.current.toFixed(1)}g</p>
                <p className="text-xs text-muted">/ {m.target}g</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
