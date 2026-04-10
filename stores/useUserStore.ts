import { create } from "zustand";
import type { UserProfile, HealthCondition, MacroTargets } from "@/types";
import { calculateFullProfile } from "@/lib/nutrition";

interface UserState {
  profile: UserProfile | null;
  isOnboarded: boolean;
  setProfile: (data: {
    name: string;
    age: number;
    gender: "male" | "female" | "other";
    heightCm: number;
    weightKg: number;
    activityLevel: "sedentary" | "light" | "moderate" | "very_active";
    goal: "lose_weight" | "gain_muscle" | "maintain" | "improve_energy";
    healthConditions: HealthCondition[];
  }) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  clearProfile: () => void;
  loadFromStorage: () => void;
}

function saveToStorage(profile: UserProfile | null) {
  if (typeof window === "undefined") return;
  if (profile) {
    localStorage.setItem("nutrisync_profile", JSON.stringify(profile));
    localStorage.setItem("nutrisync_onboarded", "true");
  } else {
    localStorage.removeItem("nutrisync_profile");
    localStorage.removeItem("nutrisync_onboarded");
  }
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isOnboarded: false,

  setProfile: (data) => {
    const calc = calculateFullProfile(
      data.weightKg,
      data.heightCm,
      data.age,
      data.gender,
      data.activityLevel,
      data.goal,
      data.healthConditions
    );

    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name: data.name,
      age: data.age,
      gender: data.gender,
      heightCm: data.heightCm,
      weightKg: data.weightKg,
      bmi: calc.bmi,
      activityLevel: data.activityLevel,
      goal: data.goal,
      healthConditions: data.healthConditions,
      dailyCalorieTarget: calc.dailyCalorieTarget,
      macroTargets: calc.macroTargets,
      createdAt: new Date().toISOString(),
    };

    saveToStorage(profile);
    set({ profile, isOnboarded: true });
  },

  updateProfile: (updates) => {
    set((state) => {
      if (!state.profile) return state;
      const updated = { ...state.profile, ...updates };

      // Recalculate if relevant fields changed
      if (
        updates.weightKg !== undefined ||
        updates.heightCm !== undefined ||
        updates.age !== undefined ||
        updates.gender !== undefined ||
        updates.activityLevel !== undefined ||
        updates.goal !== undefined ||
        updates.healthConditions !== undefined
      ) {
        const calc = calculateFullProfile(
          updated.weightKg,
          updated.heightCm,
          updated.age,
          updated.gender,
          updated.activityLevel,
          updated.goal,
          updated.healthConditions
        );
        updated.bmi = calc.bmi;
        updated.dailyCalorieTarget = calc.dailyCalorieTarget;
        updated.macroTargets = calc.macroTargets;
      }

      saveToStorage(updated);
      return { profile: updated };
    });
  },

  clearProfile: () => {
    saveToStorage(null);
    set({ profile: null, isOnboarded: false });
  },

  loadFromStorage: () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("nutrisync_profile");
    const onboarded = localStorage.getItem("nutrisync_onboarded") === "true";
    if (stored) {
      try {
        const profile = JSON.parse(stored) as UserProfile;
        set({ profile, isOnboarded: onboarded });
      } catch {
        set({ profile: null, isOnboarded: false });
      }
    }
  },
}));
