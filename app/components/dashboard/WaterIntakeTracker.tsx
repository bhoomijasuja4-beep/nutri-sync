"use client";

import { useFoodLogStore } from "@/stores/useFoodLogStore";

export default function WaterIntakeTracker() {
  const { waterGlasses, waterTarget, addWater, removeWater } = useFoodLogStore();
  const pct = Math.min((waterGlasses / waterTarget) * 100, 100);

  return (
    <div className="bg-white rounded-3xl p-6 border border-border/60 shadow-sm mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-blue-50 border border-blue-100 shrink-0">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-blue-400 transition-all duration-500 ease-out"
            style={{ height: `${pct}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-2xl z-10">
            💧
          </div>
        </div>
        <div>
          <h3 className="font-bold text-foreground text-sm">Water Intake</h3>
          <p className="text-xs text-muted">{waterGlasses} of {waterTarget} glasses</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={removeWater}
          disabled={waterGlasses === 0}
          className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted hover:bg-surface disabled:opacity-50"
        >
          -
        </button>
        <button 
          onClick={addWater}
          className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200"
        >
          +
        </button>
      </div>
    </div>
  );
}
