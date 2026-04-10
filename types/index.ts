// ============================================
// NutriSync — Core Type Definitions
// ============================================

// --- Health Conditions ---
export type HealthCondition =
  | "diabetes"
  | "hypertension"
  | "heart_disease"
  | "lactose_intolerance"
  | "gluten_intolerance"
  | "vegan"
  | "vegetarian";

// --- User Profile ---
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  heightCm: number;
  weightKg: number;
  bmi: number;
  activityLevel: "sedentary" | "light" | "moderate" | "very_active";
  goal: "lose_weight" | "gain_muscle" | "maintain" | "improve_energy";
  healthConditions: HealthCondition[];
  dailyCalorieTarget: number;
  macroTargets: MacroTargets;
  createdAt: string;
}

export interface MacroTargets {
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  sugarG: number;
  sodiumMg: number;
}

// --- Food Item ---
export interface FoodItem {
  id: string;
  name: string;
  category: string;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

// --- Logged Meals ---
export interface LoggedFoodItem {
  foodItem: FoodItem;
  quantity: number;
  unit: string;
}

export interface LoggedMeal {
  id: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  items: LoggedFoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
  loggedAt: string;
}

// --- Recipes ---
export interface RecipeIngredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: string; // emoji
  cookTimeMinutes: number;
  servings: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  tags: string[];
  ingredients: RecipeIngredient[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  dietaryLabels: string[];
  difficulty: "easy" | "medium" | "hard";
}

// --- Meal Plans ---
export interface MealSlot {
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  recipe: Recipe;
  alternatives: Recipe[];
}

export interface DayPlan {
  date: string;
  meals: MealSlot[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface MealPlan {
  id: string;
  days: DayPlan[];
  createdAt: string;
  profileSnapshot: {
    goal: string;
    calorieTarget: number;
    healthConditions: string[];
  };
}

// --- Insights ---
export type AlertSeverity = "good" | "warning" | "critical" | "info";

export interface HealthAlert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  icon: string;
  category: string;
}

export interface InsightTip {
  id: string;
  title: string;
  description: string;
  linkTo?: string;
  icon: string;
}

export interface DailyNutritionSummary {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
  mealCount: number;
  mealsLogged: string[]; // meal type names
}

// --- Health Rules ---
export interface HealthRule {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: AlertSeverity;
  condition: {
    metric: string;
    operator: "gt" | "lt" | "gte" | "lte";
    value: number;
    daysRequired?: number;
    healthConditionRequired?: HealthCondition;
  };
  recommendation: string;
  icon: string;
}

// --- Water Tracking ---
export interface WaterLog {
  date: string;
  glasses: number;
  target: number;
}

// --- Achievements ---
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

// --- Recipe Filters ---
export interface RecipeFilters {
  mealType: string | null;
  diet: string | null;
  maxCookTime: number | null;
  maxCalories: number | null;
  searchIngredients: string[];
}
