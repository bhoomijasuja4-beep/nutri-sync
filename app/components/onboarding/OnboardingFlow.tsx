"use client";

import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { calculateBMI, getBMICategory, calculateFullProfile } from "@/lib/nutrition";
import type { HealthCondition } from "@/types";

const healthConditionOptions: { id: HealthCondition; label: string; icon: string }[] = [
  { id: "diabetes", label: "Diabetes", icon: "🩺" },
  { id: "hypertension", label: "Hypertension", icon: "❤️" },
  { id: "heart_disease", label: "Heart Disease", icon: "🫀" },
  { id: "lactose_intolerance", label: "Lactose Intolerance", icon: "🥛" },
  { id: "gluten_intolerance", label: "Gluten Intolerance", icon: "🌾" },
  { id: "vegan", label: "Vegan", icon: "🌱" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥬" },
];

const goalOptions: { id: string; label: string; icon: string; desc: string }[] = [
  { id: "lose_weight", label: "Lose Weight", icon: "📉", desc: "Create a calorie deficit to lose weight safely" },
  { id: "gain_muscle", label: "Build Muscle", icon: "💪", desc: "Increase protein intake and build lean muscle" },
  { id: "maintain", label: "Maintain Weight", icon: "⚖️", desc: "Keep your current weight with balanced nutrition" },
  { id: "improve_energy", label: "Improve Energy", icon: "⚡", desc: "Optimize nutrition for better energy levels" },
];

const activityOptions: { id: string; label: string; icon: string; desc: string; multiplier: string }[] = [
  { id: "sedentary", label: "Sedentary", icon: "🪑", desc: "Little or no exercise, desk job", multiplier: "×1.2" },
  { id: "light", label: "Lightly Active", icon: "🚶", desc: "Light exercise 1-3 days/week", multiplier: "×1.375" },
  { id: "moderate", label: "Moderately Active", icon: "🏃", desc: "Moderate exercise 3-5 days/week", multiplier: "×1.55" },
  { id: "very_active", label: "Very Active", icon: "🏋️", desc: "Hard exercise 6-7 days/week", multiplier: "×1.725" },
];

export default function OnboardingFlow() {
  const router = useRouter();
  const setProfile = useUserStore((s) => s.setProfile);
  const [step, setStep] = useState(0);

  // Form state
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [healthConditions, setHealthConditions] = useState<HealthCondition[]>([]);
  const [goal, setGoal] = useState("maintain");
  const [activityLevel, setActivityLevel] = useState("moderate");

  const bmi = calculateBMI(weightKg, heightCm);
  const bmiInfo = getBMICategory(bmi);

  const canNext = () => {
    if (step === 0) return name.trim().length > 0 && age > 0 && heightCm > 0 && weightKg > 0;
    return true;
  };

  const handleSubmit = () => {
    setProfile({
      name,
      age,
      gender,
      heightCm,
      weightKg,
      activityLevel: activityLevel as "sedentary" | "light" | "moderate" | "very_active",
      goal: goal as "lose_weight" | "gain_muscle" | "maintain" | "improve_energy",
      healthConditions,
    });
    router.push("/dashboard");
  };

  const calc = calculateFullProfile(weightKg, heightCm, age, gender, activityLevel, goal, healthConditions);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent-blue/10 blur-3xl" />

      <div className="relative w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25">N</div>
            <span className="text-2xl font-bold text-foreground">Nutri<span className="text-primary">Sync</span></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Let&apos;s personalize your experience</h1>
          <p className="text-muted mt-2">Tell us about yourself to get tailored meal plans and nutrition insights.</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8 max-w-xs mx-auto">
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-2 rounded-full overflow-hidden bg-border/40">
              <div className={`h-full rounded-full transition-all duration-500 ${s <= step ? "bg-primary w-full" : "w-0"}`} />
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-border/60 bg-white shadow-2xl shadow-black/5 p-6 sm:p-8 animate-fade-up">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">👤 Personal Information</h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground bg-surface/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min={10} max={100} className="w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground bg-surface/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Gender</label>
                  <div className="flex gap-2">
                    {(["male", "female", "other"] as const).map((g) => (
                      <button key={g} onClick={() => setGender(g)} className={`flex-1 rounded-xl border px-3 py-3 text-sm font-medium transition-all ${gender === g ? "border-primary bg-primary/10 text-primary" : "border-border text-muted hover:border-primary/30"}`}>
                        {g === "male" ? "♂ Male" : g === "female" ? "♀ Female" : "⚧ Other"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Height (cm)</label>
                  <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} min={100} max={250} className="w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground bg-surface/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Weight (kg)</label>
                  <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} min={20} max={300} className="w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground bg-surface/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
              </div>

              {/* BMI Card */}
              {heightCm > 0 && weightKg > 0 && (
                <div className="rounded-2xl border border-border/60 bg-gradient-to-r from-surface to-white p-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl" style={{ backgroundColor: bmiInfo.color + "18" }}>
                    {bmiInfo.emoji}
                  </div>
                  <div>
                    <p className="text-sm text-muted">Your BMI</p>
                    <p className="text-2xl font-bold" style={{ color: bmiInfo.color }}>{bmi}</p>
                    <p className="text-xs font-medium" style={{ color: bmiInfo.color }}>{bmiInfo.label}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs text-muted">Healthy Range</div>
                    <div className="text-sm font-semibold text-foreground">18.5 – 24.9</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Health Conditions */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">🩺 Health Conditions</h2>
              <p className="text-sm text-muted">Select any conditions that apply. This helps us filter recipes and provide safer recommendations.</p>
              <div className="grid grid-cols-2 gap-3">
                {healthConditionOptions.map((opt) => {
                  const selected = healthConditions.includes(opt.id);
                  return (
                    <button key={opt.id} onClick={() => setHealthConditions(selected ? healthConditions.filter((c) => c !== opt.id) : [...healthConditions, opt.id])} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${selected ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"}`}>
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <p className={`text-sm font-semibold ${selected ? "text-primary" : "text-foreground"}`}>{opt.label}</p>
                        {selected && <p className="text-xs text-primary">Selected ✓</p>}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted text-center">You can skip this step if none apply.</p>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">🎯 Your Goal</h2>
              <p className="text-sm text-muted">What would you like to achieve? This adjusts your calorie and macro targets.</p>
              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map((opt) => (
                  <button key={opt.id} onClick={() => setGoal(opt.id)} className={`flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-all ${goal === opt.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"}`}>
                    <span className="text-3xl">{opt.icon}</span>
                    <p className={`text-sm font-semibold ${goal === opt.id ? "text-primary" : "text-foreground"}`}>{opt.label}</p>
                    <p className="text-xs text-muted leading-tight">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Activity Level */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">🏃 Activity Level</h2>
              <p className="text-sm text-muted">How active are you? This determines your daily energy expenditure.</p>
              <div className="space-y-3">
                {activityOptions.map((opt) => (
                  <button key={opt.id} onClick={() => setActivityLevel(opt.id)} className={`w-full flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${activityLevel === opt.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"}`}>
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${activityLevel === opt.id ? "text-primary" : "text-foreground"}`}>{opt.label}</p>
                      <p className="text-xs text-muted">{opt.desc}</p>
                    </div>
                    <span className="text-xs font-mono text-muted">{opt.multiplier}</span>
                  </button>
                ))}
              </div>

              {/* Calorie Preview */}
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-5">
                <p className="text-sm font-semibold text-foreground mb-3">Your Personalized Plan:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{calc.dailyCalorieTarget}</p>
                    <p className="text-xs text-muted mt-1">kcal / day</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs"><span className="text-muted">Protein</span><span className="font-semibold text-foreground">{calc.macroTargets.proteinG}g</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted">Carbs</span><span className="font-semibold text-foreground">{calc.macroTargets.carbsG}g</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted">Fat</span><span className="font-semibold text-foreground">{calc.macroTargets.fatG}g</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted">Fiber</span><span className="font-semibold text-foreground">{calc.macroTargets.fiberG}g</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/40">
            <button onClick={() => setStep(Math.max(0, step - 1))} className={`rounded-xl px-6 py-2.5 text-sm font-medium transition-all ${step === 0 ? "opacity-0 pointer-events-none" : "text-muted hover:text-foreground hover:bg-surface"}`}>
              ← Back
            </button>
            <div className="flex items-center gap-2 text-xs text-muted">Step {step + 1} of 4</div>
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} disabled={!canNext()} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                Next →
              </button>
            ) : (
              <button onClick={handleSubmit} className="rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:-translate-y-0.5">
                🎉 Get Started!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
