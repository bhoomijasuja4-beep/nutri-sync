"use client";

import type { DailyNutritionSummary, MacroTargets } from "@/types";

interface Props {
  summaries: DailyNutritionSummary[];
  macroTargets: MacroTargets;
}

export default function MacroDistributionChart({ summaries, macroTargets }: Props) {
  const loggedDays = summaries.filter(s => s.mealCount > 0);
  
  if (loggedDays.length === 0) return null;

  // Average actuals over logged days
  const avgPro = loggedDays.reduce((s, d) => s + d.totalProtein, 0) / loggedDays.length;
  const avgCarb = loggedDays.reduce((s, d) => s + d.totalCarbs, 0) / loggedDays.length;
  const avgFat = loggedDays.reduce((s, d) => s + d.totalFat, 0) / loggedDays.length;
  
  const totalActualMacros = avgPro + avgCarb + avgFat;
  
  const pPct = ((avgPro / totalActualMacros) * 100) || 0;
  const cPct = ((avgCarb / totalActualMacros) * 100) || 0;
  const fPct = ((avgFat / totalActualMacros) * 100) || 0;

  const totalTargetMacros = macroTargets.proteinG + macroTargets.carbsG + macroTargets.fatG;
  const tpPct = ((macroTargets.proteinG / totalTargetMacros) * 100) || 0;
  const tcPct = ((macroTargets.carbsG / totalTargetMacros) * 100) || 0;
  const tfPct = ((macroTargets.fatG / totalTargetMacros) * 100) || 0;

  const renderBar = (p: number, c: number, f: number, label: string) => (
    <div className="mb-6">
      <div className="flex justify-between text-xs font-semibold mb-2">
        <span className="text-foreground">{label}</span>
      </div>
      <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner">
        {p > 0 && <div className="bg-blue-500 h-full flex items-center justify-center text-[10px] text-white font-bold" style={{ width: `${p}%` }}>
          {p >= 10 ? `${Math.round(p)}%` : ''}
        </div>}
        {c > 0 && <div className="bg-orange-500 h-full flex items-center justify-center text-[10px] text-white font-bold" style={{ width: `${c}%` }}>
          {c >= 10 ? `${Math.round(c)}%` : ''}
        </div>}
        {f > 0 && <div className="bg-yellow-400 h-full flex items-center justify-center text-[10px] text-yellow-900 font-bold" style={{ width: `${f}%` }}>
          {f >= 10 ? `${Math.round(f)}%` : ''}
        </div>}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl p-6 border border-border/60 shadow-sm h-full flex flex-col justify-center">
      <h3 className="text-lg font-bold text-foreground mb-1">Macro Balance</h3>
      <p className="text-xs text-muted mb-6">Your actual vs targeted macro distribution</p>

      {renderBar(pPct, cPct, fPct, "Your Average Intake")}
      {renderBar(tpPct, tcPct, tfPct, "Your Goal Target")}

      <div className="flex justify-between px-2 mt-4">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-500" /> <span className="text-xs font-semibold text-muted">Protein</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-orange-500" /> <span className="text-xs font-semibold text-muted">Carbs</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-yellow-400" /> <span className="text-xs font-semibold text-muted">Fat</span></div>
      </div>
    </div>
  );
}
