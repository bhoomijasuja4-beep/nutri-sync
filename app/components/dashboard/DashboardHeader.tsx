"use client";

import { useUserStore } from "@/stores/useUserStore";

export default function DashboardHeader({ todayCalories }: { todayCalories: number }) {
  const profile = useUserStore((s) => s.profile);
  
  if (!profile) return null;

  const target = profile.dailyCalorieTarget;
  const pct = Math.min((todayCalories / target) * 100, 100);
  const remaining = Math.max(target - todayCalories, 0);

  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white rounded-3xl p-6 border border-border/60 shadow-sm mb-6">
      <div>
        <p className="text-sm text-muted font-medium mb-1">{dateStr}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Good morning, {profile.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-sm text-muted mt-2 max-w-md">
          {todayCalories === 0
            ? "Ready to crush your goals today? Log your first meal to get started."
            : pct >= 100
            ? "You've hit your calorie target for today! Great job staying on track."
            : `You have ${remaining} kcal remaining to reach your daily goal.`}
        </p>
      </div>

      <div className="flex items-center gap-4 shrink-0 bg-surface/50 p-4 rounded-2xl border border-border/40">
        {/* Simple Donut Chart using SVG */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e5e5" strokeWidth="12" />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#58ab4f"
              strokeWidth="12"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * pct) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-foreground leading-none">{Math.round(pct)}%</span>
            <span className="text-[10px] text-muted font-medium uppercase tracking-wider">of Goal</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-sm">
            <span className="font-bold text-foreground">{todayCalories}</span>
            <span className="text-muted text-xs ml-1">kcal eaten</span>
          </div>
          <div className="text-sm">
            <span className="font-bold text-foreground">{remaining}</span>
            <span className="text-muted text-xs ml-1">kcal left</span>
          </div>
        </div>
      </div>
    </div>
  );
}
