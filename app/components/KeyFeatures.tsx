const features = [
  {
    title: "Effortless weekly meal planning",
    description:
      "Simplify your week! Create diverse menus that fit your busy lifestyle, budget, and family preferences, taking the stress out of \"what's for dinner?\"",
    icon: "📅",
    size: "large",
  },
  {
    title: "Step-by-Step Cooking Mode",
    description:
      "Tapping on a recipe enters cooking mode with step-by-step instructions, preventing the screen from locking while you cook.",
    icon: "👨‍🍳",
    size: "small",
  },
  {
    title: "Shopping Lists, Simplified & Organized",
    description:
      "Automatically generate categorized shopping lists from your meal plan. Grocery trips become faster, ensuring no ingredient is forgotten.",
    icon: "🛒",
    size: "small",
  },
  {
    title: "Smart Leftover Solutions & Reduced Waste",
    description:
      "Our app intelligently incorporates leftovers into future meals, helping you save money and minimize food waste.",
    icon: "♻️",
    size: "small",
  },
];

export default function KeyFeatures() {
  return (
    <section id="features" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-transparent to-primary-50/30" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent-green/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent-blue/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-1 text-xs font-semibold text-primary-700 mb-4">
            Key Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need for Perfect Meals
          </h2>
          <p className="mx-auto max-w-2xl text-muted text-lg leading-relaxed">
            From personalized meal planning to smart shopping lists, discover how our
            platform transforms your kitchen experience with intelligent features designed
            for modern life.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Large featured card */}
          <div className="lg:row-span-2 group relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-white to-primary-50/30 p-8 shadow-xl shadow-primary/5 transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/5 blur-2xl transition-transform group-hover:scale-150" />

            <div className="relative">
              {/* Personalization badge */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl mb-6 transition-transform group-hover:scale-110">
                {features[0].icon}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2">
                Unlock Your{" "}
                <span className="text-gradient-green">Perfect Meal </span>
                Plan, 100% You!
              </h3>

              <p className="text-muted leading-relaxed mt-4 mb-8">
                {features[0].description}
              </p>

              {/* Decorative stat */}
              <div className="rounded-2xl border border-primary/10 bg-white/80 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg">
                    100%
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{features[0].title}</p>
                    <p className="text-xs text-muted">
                      Experience meal planning tailored to your unique tastes, dietary needs,
                      and health goals. Healthy eating has never been this easy or delicious!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller feature cards */}
          {features.slice(1).map((feature, i) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-white p-6 shadow-md transition-all hover:shadow-xl hover:border-primary/20 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-primary/5 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
