# NutriSync — AI-Powered Nutrition & Meal Planning 🥗

NutriSync is a comprehensive, offline-first health and nutrition web application designed to help users track their intake, plan their meals, and gain data-driven insights into their health goals. Built with a focus on privacy and reliability, it uses local datasets and rule-based engines to provide personalized recommendations without the need for external APIs.

![NutriSync Dashboard](https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2053&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

## ✨ Key Features

### 🚀 Smart Onboarding
- **Personalized Profile**: Calculates BMR, TDEE, and macro targets using the Mifflin-St Jeor formula.
- **Interactive Metrics**: Live BMI calculation with visual categories.
- **Condition-Aware**: Tailors the experience for Diabetes, Hypertension, Vegan, Gluten-Free, and more.

### 📊 Professional Dashboard
- **Macro Distribution**: Real-time tracking of Protein, Carbs, and Fat via animated ring charts.
- **Water Tracker**: Daily hydration logging with a dynamic fill visualizer.
- **Health Alerts**: Immediate feedback on nutritional patterns (e.g., "High Sugar Day").
- **Gamification**: Streak badges to reward consistent logging.

### 📝 Precision Food Logger
- **Searchable Database**: Offline dataset of 100+ common foods with full nutritional profiles.
- **Meal History**: 7-day log with the ability to re-log favorite meals instantly.
- **Live Accumulator**: Real-time calculation of 7+ macronutrients as you build your meal.

### 📅 AI-Powered Meal Planner
- **Goal-Based Generation**: Specific plans for Weight Loss, Muscle Gain, and Maintenance.
- **Instant Swapping**: Don't like a suggestion? Swap any meal for a macro-equivalent alternative in one click.
- **Dietary Safeguards**: Automatically filters out recipes incompatible with your health conditions.

### 🔍 Recipe Finder
- **"Fridge-First" Search**: Find recipes by the ingredients you already have.
- **Match Percentage**: Intelligent sorting shows you exactly how well a recipe fits your list.
- **One-Click Log**: Move from recipe to food log instantly.

### 💡 Health Insights Engine
- **Trend Analysis**: Visual charts for calorie intake and macro balance over 7, 14, or 30 days.
- **Pattern Recognition**: Detects skipping breakfast, late-night eating, and nutritional deficits.
- **Actionable Tips**: Personalized recommendations linked across the app.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Persistence**: Browser `localStorage`
- **Design**: Custom Glassmorphism System

## 📂 Project Structure

```text
nutri-sync/
├── app/                  # App Router pages and layouts
│   ├── components/       # Feature-specific UI components
│   ├── dashboard/        # Central hub
│   ├── meal-planner/     # Plan generation flow
│   ├── recipe-finder/    # Ingredient search
│   ├── food-logger/      # Nutrition logging
│   └── insights/         # Health analytics
├── data/                 # Offline JSON datasets (Foods, Recipes, Rules)
├── lib/                  # Core Business Logic (Math, Generators, Engines)
├── stores/               # Zustand state definitions
└── types/                # TypeScript interfaces
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm / pnpm / yarn

### Installation
1. Clone the repository
2. Navigate to the project folder:
   ```bash
   cd nutri-sync
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛡️ Privacy & Logic
NutriSync is designed as a **Static Web Project**. All calculations (BMR, TDEE, Macro generation) happen locally in the browser. No user data is ever sent to a server; everything is stored securely in your browser's local storage.

---
Built with ❤️ for better health.
