"use client";

import AppLayout from "@/app/components/layout/AppLayout";
import MealTypeSelector from "@/app/components/food-logger/MealTypeSelector";
import FoodSearchDropdown from "@/app/components/food-logger/FoodSearchDropdown";
import NutritionLogTable from "@/app/components/food-logger/NutritionLogTable";
import NutritionTotalsPanel from "@/app/components/food-logger/NutritionTotalsPanel";
import RecentMealsSection from "@/app/components/food-logger/RecentMealsSection";
import { useFoodLogStore } from "@/stores/useFoodLogStore";

export default function FoodLoggerPage() {
  const addItem = useFoodLogStore((s) => s.addItem);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Food Logger</h1>
          <p className="text-sm text-muted mt-2">Log your meals to track nutrition and get health insights.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <MealTypeSelector />
            <FoodSearchDropdown onSelect={(food) => addItem(food, 1, food.servingUnit)} />
            <NutritionLogTable />
            <RecentMealsSection />
          </div>

          <div className="lg:col-span-1">
            <NutritionTotalsPanel />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
