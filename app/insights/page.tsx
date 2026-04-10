"use client";

import { useState } from "react";
import AppLayout from "@/app/components/layout/AppLayout";
import InsightsHeader from "@/app/components/insights/InsightsHeader";
import CalorieTrendChart from "@/app/components/insights/CalorieTrendChart";
import MacroDistributionChart from "@/app/components/insights/MacroDistributionChart";
import EatingPatternSummary from "@/app/components/insights/EatingPatternSummary";
import HealthAlertCards from "@/app/components/insights/HealthAlertCards";
import PreventiveRecommendations from "@/app/components/insights/PreventiveRecommendations";
import StreakAndAchievements from "@/app/components/insights/StreakAndAchievements";

import { useUserStore } from "@/stores/useUserStore";
import { useFoodLogStore } from "@/stores/useFoodLogStore";
import { 
  getDailySummaries, 
  generateAlerts, 
  generateTips, 
  calculateStreak, 
  getAchievements 
} from "@/lib/insights-engine";

export default function InsightsPage() {
  const profile = useUserStore((s) => s.profile);
  const meals = useFoodLogStore((s) => s.meals);
  const [days, setDays] = useState(7);

  if (!profile) return null;

  const summaries = getDailySummaries(meals, days);
  const alerts = generateAlerts(meals, profile);
  const tips = generateTips(meals, profile);
  const streak = calculateStreak(meals, profile.dailyCalorieTarget);
  const achievements = getAchievements(meals, profile);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <InsightsHeader days={days} onDaysChange={setDays} />

        <StreakAndAchievements streak={streak} achievements={achievements} />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">Trends ({days} Days)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CalorieTrendChart summaries={summaries} targetCals={profile.dailyCalorieTarget} />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <MacroDistributionChart summaries={summaries} macroTargets={profile.macroTargets} />
              <EatingPatternSummary summaries={summaries} targetCals={profile.dailyCalorieTarget} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">Health Alerts</h2>
          <HealthAlertCards alerts={alerts} />
        </div>

        <PreventiveRecommendations tips={tips} />
      </div>
    </AppLayout>
  );
}
