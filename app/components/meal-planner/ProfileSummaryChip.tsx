"use client";

import { useUserStore } from "@/stores/useUserStore";

export default function ProfileSummaryChip() {
  const profile = useUserStore((s) => s.profile);
  
  if (!profile) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <div className="text-xs font-medium text-foreground bg-white border border-border/60 px-3 py-1.5 rounded-full shadow-sm">
        🎯 {profile.goal.replace("_", " ")}
      </div>
      <div className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
        🔥 {profile.dailyCalorieTarget} kcal/day
      </div>
      {profile.healthConditions.map(c => (
        <div key={c} className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full capitalize">
          🩺 {c.replace("_", " ")}
        </div>
      ))}
    </div>
  );
}
