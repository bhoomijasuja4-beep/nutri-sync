"use client";

import type { DailyNutritionSummary } from "@/types";

interface Props {
  summaries: DailyNutritionSummary[];
  targetCals: number;
}

export default function CalorieTrendChart({ summaries, targetCals }: Props) {
  // Sort oldest to newest for the chart
  const chartData = [...summaries].reverse();
  
  if (chartData.length === 0) return null;

  // Find max value to scale the chart
  const maxCals = Math.max(...chartData.map(d => d.totalCalories), targetCals * 1.5, 2000);
  
  // Calculate average
  const loggedDays = chartData.filter(d => d.mealCount > 0);
  const avgCals = loggedDays.length > 0 
    ? Math.round(loggedDays.reduce((s, d) => s + d.totalCalories, 0) / loggedDays.length)
    : 0;

  return (
    <div className="bg-white rounded-3xl p-6 border border-border/60 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Calorie Trends</h3>
          <p className="text-xs text-muted">Your daily intake vs target over time</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 object-contain"><div className="w-3 h-3 rounded-full bg-primary"></div>Intake</div>
          <div className="flex items-center gap-1.5 object-contain"><div className="w-4 border-t-2 border-dashed border-red-400"></div>Target ({targetCals})</div>
          <div className="flex items-center gap-1.5 object-contain"><div className="w-4 border-t-2 border-dotted border-blue-400"></div>Avg ({avgCals})</div>
        </div>
      </div>

      <div className="relative h-64 w-full flex items-end justify-between gap-1 sm:gap-2 pb-6 px-2">
        {/* Y-axis labels */}
        <div className="absolute left-0 inset-y-0 w-8 flex flex-col justify-between text-[10px] text-muted-light pb-6 -ml-4 z-10">
          <span>{Math.round(maxCals)}</span>
          <span>{Math.round(maxCals/2)}</span>
          <span>0</span>
        </div>

        {/* Target Line */}
        <div 
          className="absolute left-0 right-0 border-t-2 border-dashed border-red-400/50 z-0 pointer-events-none"
          style={{ bottom: `calc(${(targetCals / maxCals) * 100}% + 24px)` }}
        />
        
        {/* Avg Line */}
        {avgCals > 0 && (
           <div 
           className="absolute left-0 right-0 border-t-2 border-dotted border-blue-400/50 z-0 pointer-events-none"
           style={{ bottom: `calc(${(avgCals / maxCals) * 100}% + 24px)` }}
         />
        )}

        {/* Bars */}
        {chartData.map((day, i) => {
          const pct = Math.min((day.totalCalories / maxCals) * 100, 100);
          const isOver = day.totalCalories > targetCals * 1.1;
          const isUnder = day.totalCalories > 0 && day.totalCalories < targetCals * 0.8;
          const dayLabel = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={day.date} className="relative flex-1 flex flex-col justify-end h-full group z-10">
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-foreground text-surface text-[10px] py-1 px-2 rounded whitespace-nowrap pointer-events-none transition-opacity z-20">
                {day.totalCalories} kcal
              </div>
              
              <div 
                className={`w-full rounded-t-sm transition-all duration-500 hover:opacity-80 ${
                  day.mealCount === 0 ? 'bg-transparent' : 
                  isOver ? 'bg-red-400' : 
                  isUnder ? 'bg-amber-400' : 'bg-primary'
                }`}
                style={{ height: `${pct}%`, minHeight: day.mealCount > 0 ? '4px' : '0' }}
              />
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-light max-w-full overflow-hidden whitespace-nowrap">
                {i % Math.ceil(chartData.length / 7) === 0 ? dayLabel : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
