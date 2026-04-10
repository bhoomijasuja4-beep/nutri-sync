// ============================================
// NutriSync — Insights Engine
// Analyzes meal history to generate health alerts
// ============================================

import type {
  LoggedMeal,
  UserProfile,
  HealthAlert,
  InsightTip,
  DailyNutritionSummary,
} from "@/types";

// --- Aggregate daily summaries from meal history ---
export function getDailySummaries(
  meals: LoggedMeal[],
  days: number = 7
): DailyNutritionSummary[] {
  const today = new Date();
  const summaries: DailyNutritionSummary[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    const dayMeals = meals.filter((m) => m.date === dateStr);

    summaries.push({
      date: dateStr,
      totalCalories: dayMeals.reduce((s, m) => s + m.totalCalories, 0),
      totalProtein: dayMeals.reduce((s, m) => s + m.totalProtein, 0),
      totalCarbs: dayMeals.reduce((s, m) => s + m.totalCarbs, 0),
      totalFat: dayMeals.reduce((s, m) => s + m.totalFat, 0),
      totalFiber: dayMeals.reduce((s, m) => s + m.totalFiber, 0),
      totalSugar: dayMeals.reduce((s, m) => s + m.totalSugar, 0),
      totalSodium: dayMeals.reduce((s, m) => s + m.totalSodium, 0),
      mealCount: dayMeals.length,
      mealsLogged: dayMeals.map((m) => m.mealType),
    });
  }

  return summaries;
}

// --- Generate health alerts ---
export function generateAlerts(
  meals: LoggedMeal[],
  profile: UserProfile
): HealthAlert[] {
  const alerts: HealthAlert[] = [];
  const summaries = getDailySummaries(meals, 7);
  const today = summaries[0];
  const target = profile.dailyCalorieTarget;

  // Only generate alerts if user has logged at least some data
  if (summaries.every((s) => s.mealCount === 0)) {
    return [
      {
        id: "no-data",
        title: "Start Logging Meals",
        message: "Log your meals in the Food Logger to start receiving personalized health insights and recommendations.",
        severity: "info",
        icon: "📝",
        category: "getting-started",
      },
    ];
  }

  // --- Calorie checks ---
  if (today.mealCount > 0 && today.totalCalories > target * 1.2) {
    alerts.push({
      id: "high-cal-today",
      title: "High Calorie Day",
      message: `You've consumed ${today.totalCalories} kcal today — ${Math.round((today.totalCalories / target) * 100)}% of your ${target} kcal target. Consider lighter options for remaining meals.`,
      severity: "warning",
      icon: "⚠️",
      category: "calories",
    });
  }

  if (today.mealCount > 0 && today.totalCalories < target * 0.5 && today.totalCalories > 0) {
    alerts.push({
      id: "low-cal-today",
      title: "Under-eating Today",
      message: `You've only consumed ${today.totalCalories} kcal — less than half your ${target} kcal target. Make sure you're fueling adequately.`,
      severity: "warning",
      icon: "📉",
      category: "calories",
    });
  }

  // Multi-day calorie excess
  const overDays = summaries.filter(
    (s) => s.mealCount > 0 && s.totalCalories > target * 1.2
  ).length;
  if (overDays >= 3) {
    alerts.push({
      id: "cal-binge-pattern",
      title: "Calorie Excess Pattern",
      message: `You've exceeded your calorie target on ${overDays} of the last 7 days. Consider adjusting portion sizes or swapping to lower-calorie alternatives.`,
      severity: "critical",
      icon: "🔴",
      category: "calories",
    });
  }

  // --- Sugar checks ---
  if (today.totalSugar > 50) {
    alerts.push({
      id: "high-sugar",
      title: "Excess Sugar Intake",
      message: `Today's sugar intake is ${Math.round(today.totalSugar)}g — well above the recommended 25g limit. Try reducing sweetened drinks and processed snacks.`,
      severity: "warning",
      icon: "🍬",
      category: "sugar",
    });
  }

  // Diabetic-specific sugar alert
  if (profile.healthConditions.includes("diabetes")) {
    const highSugarMeals = meals.filter(
      (m) => m.date === today.date && m.totalSugar > 30
    );
    if (highSugarMeals.length > 0) {
      alerts.push({
        id: "diabetic-sugar-spike",
        title: "High Sugar Meal (Diabetes Alert)",
        message: `A meal today contains ${Math.round(highSugarMeals[0].totalSugar)}g sugar, which may cause blood sugar spikes. Consider low-GI alternatives.`,
        severity: "critical",
        icon: "🚨",
        category: "sugar",
      });
    }
  }

  // --- Sodium checks ---
  if (today.totalSodium > 2300) {
    const msg =
      profile.healthConditions.includes("hypertension")
        ? `Today's sodium is ${today.totalSodium}mg — your limit is 1500mg for hypertension. This is critically high.`
        : `Today's sodium is ${today.totalSodium}mg — exceeding the 2300mg daily limit.`;
    alerts.push({
      id: "high-sodium",
      title: "High Sodium",
      message: msg,
      severity: profile.healthConditions.includes("hypertension") ? "critical" : "warning",
      icon: "🧂",
      category: "sodium",
    });
  }

  // --- Fiber checks ---
  const lowFiberDays = summaries.filter(
    (s) => s.mealCount > 0 && s.totalFiber < 25
  ).length;
  if (lowFiberDays >= 3) {
    alerts.push({
      id: "low-fiber",
      title: "Low Fiber Intake",
      message: `Your fiber intake has been below 25g on ${lowFiberDays} of the last 7 days. Add more leafy greens, legumes, and whole grains.`,
      severity: "warning",
      icon: "🥦",
      category: "fiber",
    });
  }

  // --- Protein checks ---
  const lowProteinDays = summaries.filter(
    (s) => s.mealCount > 0 && s.totalProtein < profile.macroTargets.proteinG * 0.8
  ).length;
  if (lowProteinDays >= 4) {
    alerts.push({
      id: "low-protein",
      title: "Protein Deficit",
      message: `You've been below 80% of your protein target (${profile.macroTargets.proteinG}g) on ${lowProteinDays} of the last 7 days. Include more lean meats, eggs, or legumes.`,
      severity: "warning",
      icon: "💪",
      category: "protein",
    });
  }

  // --- Pattern checks ---
  const breakfastSkipped = summaries.filter(
    (s) => s.mealCount > 0 && !s.mealsLogged.includes("breakfast")
  ).length;
  if (breakfastSkipped >= 4) {
    alerts.push({
      id: "breakfast-skip",
      title: "Skipping Breakfast",
      message: `You've skipped breakfast ${breakfastSkipped} times in the last week. A morning meal helps kickstart metabolism and improve focus.`,
      severity: "info",
      icon: "🌅",
      category: "patterns",
    });
  }

  // --- Good alerts ---
  const onTrackDays = summaries.filter(
    (s) =>
      s.mealCount > 0 &&
      s.totalCalories >= target * 0.85 &&
      s.totalCalories <= target * 1.1
  ).length;
  if (onTrackDays >= 5) {
    alerts.push({
      id: "great-streak",
      title: "Excellent Calorie Management! 🎉",
      message: `You've hit your calorie target on ${onTrackDays} of the last 7 days. Keep up the amazing work!`,
      severity: "good",
      icon: "🟢",
      category: "achievement",
    });
  }

  return alerts;
}

// --- Generate insight tips ---
export function generateTips(
  meals: LoggedMeal[],
  profile: UserProfile
): InsightTip[] {
  const tips: InsightTip[] = [];
  const summaries = getDailySummaries(meals, 7);
  const avgCalories =
    summaries.filter((s) => s.mealCount > 0).reduce((s, d) => s + d.totalCalories, 0) /
    Math.max(summaries.filter((s) => s.mealCount > 0).length, 1);

  if (avgCalories > profile.dailyCalorieTarget * 1.1) {
    tips.push({
      id: "tip-swap-rice",
      title: "Try Swapping White Rice with Quinoa",
      description: "Quinoa has more protein and fiber, helping you feel fuller on fewer calories.",
      linkTo: "/recipe-finder",
      icon: "🍚",
    });
  }

  if (profile.healthConditions.includes("diabetes")) {
    tips.push({
      id: "tip-low-gi",
      title: "Choose Low-GI Foods",
      description: "Brown rice, sweet potatoes, and legumes release energy slowly, helping to maintain stable blood sugar levels.",
      linkTo: "/recipe-finder",
      icon: "📊",
    });
  }

  if (profile.goal === "gain_muscle") {
    tips.push({
      id: "tip-protein-timing",
      title: "Spread Protein Throughout the Day",
      description: "Aim for 25-30g protein per meal rather than one large protein-heavy meal for better absorption.",
      linkTo: "/food-logger",
      icon: "💪",
    });
  }

  if (profile.goal === "lose_weight") {
    tips.push({
      id: "tip-volume-eating",
      title: "Try Volume Eating",
      description: "Fill up on high-volume, low-calorie foods like vegetables and soups to feel satisfied while staying in a calorie deficit.",
      linkTo: "/recipe-finder",
      icon: "🥗",
    });
  }

  tips.push({
    id: "tip-water",
    title: "Stay Hydrated",
    description: "Drinking 8 glasses of water daily helps with metabolism, energy levels, and can help reduce overeating.",
    linkTo: "/dashboard",
    icon: "💧",
  });

  tips.push({
    id: "tip-meal-prep",
    title: "Plan Meals Ahead",
    description: "Using the Meal Planner to plan your week reduces last-minute unhealthy decisions and saves money on groceries.",
    linkTo: "/meal-planner",
    icon: "📅",
  });

  return tips;
}

// --- Calculate streak ---
export function calculateStreak(meals: LoggedMeal[], target: number): number {
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayMeals = meals.filter((m) => m.date === dateStr);

    if (dayMeals.length === 0) {
      if (i === 0) continue; // today might not be logged yet
      break;
    }

    const dayCalories = dayMeals.reduce((s, m) => s + m.totalCalories, 0);
    if (dayCalories >= target * 0.8 && dayCalories <= target * 1.2) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// --- Calculate achievements ---
export function getAchievements(
  meals: LoggedMeal[],
  profile: UserProfile
): { id: string; title: string; icon: string; earned: boolean; description: string }[] {
  const totalMeals = meals.length;
  const streak = calculateStreak(meals, profile.dailyCalorieTarget);
  const summaries = getDailySummaries(meals, 30);
  const loggedDays = summaries.filter((s) => s.mealCount > 0).length;

  return [
    {
      id: "first-log",
      title: "First Log",
      icon: "🎯",
      earned: totalMeals >= 1,
      description: "Log your first meal",
    },
    {
      id: "week-logger",
      title: "7-Day Logger",
      icon: "📅",
      earned: loggedDays >= 7,
      description: "Log meals on 7 different days",
    },
    {
      id: "streak-3",
      title: "3-Day Streak",
      icon: "🔥",
      earned: streak >= 3,
      description: "Hit your calorie target 3 days in a row",
    },
    {
      id: "streak-7",
      title: "7-Day Streak",
      icon: "⚡",
      earned: streak >= 7,
      description: "Hit your calorie target 7 days in a row",
    },
    {
      id: "protein-champ",
      title: "Protein Champion",
      icon: "💪",
      earned: summaries.filter((s) => s.totalProtein >= profile.macroTargets.proteinG).length >= 5,
      description: "Meet your protein target 5 times",
    },
    {
      id: "meal-variety",
      title: "Variety King",
      icon: "🌈",
      earned: totalMeals >= 20,
      description: "Log 20 meals total",
    },
  ];
}
