"use client";

import { useFoodLogStore } from "@/stores/useFoodLogStore";
import { useUserStore } from "@/stores/useUserStore";
import { calculateStreak } from "@/lib/insights-engine";
import { useMemo } from "react";

export default function StreakBadge() {
  const profile = useUserStore((s) => s.profile);
  const meals = useFoodLogStore((s) => s.meals);

  const streak = useMemo(() => {
    if (!profile) return 0;
    return calculateStreak(meals, profile.dailyCalorieTarget);
  }, [profile, meals]);

  if (streak === 0) return null;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100 shadow-sm mb-6 flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-2xl border border-orange-100/50">
        🔥
      </div>
      <div>
        <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">Current Streak</p>
        <p className="text-lg font-bold text-orange-900 leading-tight">{streak} {streak === 1 ? 'Day' : 'Days'}</p>
      </div>
    </div>
  );
}
