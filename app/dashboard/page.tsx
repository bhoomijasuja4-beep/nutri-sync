"use client";

import AppLayout from "@/app/components/layout/AppLayout";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import MacroRingSummary from "@/app/components/dashboard/MacroRingSummary";
import NavigationCards from "@/app/components/dashboard/NavigationCards";
import WaterIntakeTracker from "@/app/components/dashboard/WaterIntakeTracker";
import RecentMealsWidget from "@/app/components/dashboard/RecentMealsWidget";
import HealthAlertBanner from "@/app/components/dashboard/HealthAlertBanner";
import StreakBadge from "@/app/components/dashboard/StreakBadge";
import { useFoodLogStore } from "@/stores/useFoodLogStore";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [hydrated, setHydrated] = useState(false);
  const getTodaysMeals = useFoodLogStore((s) => s.getTodaysMeals);
  
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const todayMeals = getTodaysMeals();
  
  const totals = todayMeals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.totalCalories,
      protein: acc.protein + m.totalProtein,
      carbs: acc.carbs + m.totalCarbs,
      fat: acc.fat + m.totalFat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <HealthAlertBanner />
        <DashboardHeader todayCalories={totals.calories} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MacroRingSummary 
              protein={totals.protein} 
              carbs={totals.carbs} 
              fat={totals.fat} 
            />
            <NavigationCards />
          </div>
          
          <div className="col-span-1">
            <StreakBadge />
            <WaterIntakeTracker />
            <RecentMealsWidget />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
