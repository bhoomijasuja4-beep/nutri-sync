"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useFoodLogStore } from "@/stores/useFoodLogStore";
import { useMealPlanStore } from "@/stores/useMealPlanStore";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { useRouter } from "next/navigation";
import AppSidebar from "./AppSidebar";
import MobileNav from "./MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isOnboarded = useUserStore((s) => s.isOnboarded);
  const loadUser = useUserStore((s) => s.loadFromStorage);
  const loadFood = useFoodLogStore((s) => s.loadFromStorage);
  const loadMealPlan = useMealPlanStore((s) => s.loadFromStorage);
  const loadRecipes = useRecipeStore((s) => s.loadFromStorage);
  
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Load all local storage data
    loadUser();
    loadFood();
    loadMealPlan();
    loadRecipes();
    setHydrated(true);
  }, [loadUser, loadFood, loadMealPlan, loadRecipes]);

  useEffect(() => {
    if (hydrated && !isOnboarded) {
      router.push("/");
    }
  }, [hydrated, isOnboarded, router]);

  if (!hydrated || !isOnboarded) return null;

  return (
    <div className="flex min-h-screen bg-surface">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen pb-20 lg:pb-0">
        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
