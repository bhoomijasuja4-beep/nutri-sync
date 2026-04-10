const recipes = [
  {
    title: "Quick Shrimp & Herb Fresh Rolls",
    description:
      "Light and refreshing fresh spring rolls filled with succulent shrimp, crisp vegetables, and aromatic herbs, served with a speedy peanut dipping sauce.",
    category: "Snack",
    difficulty: "Medium",
    rating: "9/5",
    cals: 195,
    protein: "18.95g",
    fat: "2.95g",
    time: "8 min",
    emoji: "🍤",
    gradient: "from-orange-50 to-amber-50",
    border: "border-orange-100",
  },
  {
    title: "Tropical Fruit & Mint Salad with Lime Drizzle",
    description:
      "A vibrant and refreshing fruit salad featuring seasonal produce, elevated with a zesty lime and fresh mint dressing, and a scattering of cashews for healthy fats.",
    category: "Snack",
    difficulty: "Medium",
    rating: "9/5",
    cals: 204.5,
    protein: "5.8g",
    fat: "11.5g",
    time: "8 min",
    emoji: "🥗",
    gradient: "from-lime-50 to-green-50",
    border: "border-lime-100",
  },
  {
    title: "High-Protein Greek Fava with Poached Egg",
    description:
      "A hearty and savory Greek-inspired breakfast featuring creamy split pea puree, topped with a perfectly poached egg and briny Kalamata olives.",
    category: "Breakfast",
    difficulty: "Medium",
    rating: "9/5",
    cals: 1050,
    protein: "105g",
    fat: "35g",
    time: "20 min",
    emoji: "🍳",
    gradient: "from-yellow-50 to-orange-50",
    border: "border-yellow-100",
  },
  {
    title: "High-Protein Greek Mussels Saganaki",
    description:
      "Plump, fresh mussels cooked in a vibrant tomato and herb sauce, with a hint of ouzo, embodying the flavors of the Greek islands.",
    category: "Dinner",
    difficulty: "Medium",
    rating: "9/5",
    cals: 1200,
    protein: "120g",
    fat: "40g",
    time: "25 min",
    emoji: "🦪",
    gradient: "from-red-50 to-rose-50",
    border: "border-red-100",
  },
  {
    title: "High-Protein Buckwheat Porridge with Apple",
    description:
      "A warming and hearty buckwheat porridge, boosted with protein powder and topped with seasonal apples and crunchy walnuts.",
    category: "Breakfast",
    difficulty: "Medium",
    rating: "9/5",
    cals: 478,
    protein: "47g",
    fat: "12g",
    time: "15 min",
    emoji: "🥣",
    gradient: "from-amber-50 to-yellow-50",
    border: "border-amber-100",
  },
  {
    title: "Hearty Beef and Leek Soup",
    description:
      "A comforting and nutritious soup, perfect for a winter evening, featuring tender lean beef, seasonal leeks, potatoes, and carrots in a savory broth.",
    category: "Dinner",
    difficulty: "Medium",
    rating: "9/5",
    cals: 653,
    protein: "63g",
    fat: "19g",
    time: "20 min",
    emoji: "🍲",
    gradient: "from-emerald-50 to-teal-50",
    border: "border-emerald-100",
  },
];

const stats = [
  { label: "Recipe Collection", value: "2,246", sub: "Delicious recipes ready to cook", icon: "📚" },
  { label: "Happy Cooks", value: "156+", sub: "Active community members", icon: "👨‍🍳" },
  { label: "Average Rating", value: "4.8", sub: "From verified reviews", icon: "⭐" },
];

export default function RecipesSection() {
  return (
    <section id="recipes" className="relative overflow-hidden bg-gradient-to-b from-white to-surface/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-1 text-xs font-semibold text-primary-700 mb-4">
            Featured Recipes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Discover Amazing Recipes
          </h2>
          <p className="mx-auto max-w-2xl text-muted text-lg leading-relaxed">
            Explore our collection of delicious, healthy recipes crafted by nutrition experts.
            From quick weeknight dinners to impressive weekend meals, find your next favorite dish.
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {["Updated Daily", "AI-Powered Recommendations", "Community Tested"].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {badge}
            </span>
          ))}
        </div>

        {/* Recipe cards carousel */}
        <div className="mb-16 -mx-4 px-4 overflow-x-auto scrollbar-thin">
          <div className="flex gap-6 pb-4" style={{ minWidth: "max-content" }}>
            {recipes.map((recipe) => (
              <div
                key={recipe.title}
                className="group relative w-[320px] flex-shrink-0 rounded-2xl border border-border/60 bg-white overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-2 hover:border-primary/20"
              >
                {/* Image placeholder */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${recipe.gradient} flex items-center justify-center overflow-hidden`}
                >
                  <span className="text-6xl transition-transform group-hover:scale-125 group-hover:rotate-6">
                    {recipe.emoji}
                  </span>
                  {/* Tags overlay */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
                      {recipe.category}
                    </span>
                    <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-muted shadow-sm backdrop-blur">
                      {recipe.difficulty}
                    </span>
                  </div>
                  {/* Rating */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] text-amber-600 font-semibold shadow-sm backdrop-blur">
                    ⭐ {recipe.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 leading-snug">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Nutrition row */}
                  <div className="flex items-center gap-3 mb-3">
                    {[
                      { label: "Cals", value: recipe.cals },
                      { label: "Protein", value: recipe.protein },
                      { label: "Fat", value: recipe.fat },
                    ].map((n) => (
                      <div key={n.label} className="text-center flex-1">
                        <div className="text-sm font-bold text-foreground">{n.value}</div>
                        <div className="text-[10px] text-muted uppercase tracking-wider">{n.label}</div>
                      </div>
                    ))}
                    <div className="flex items-center gap-1 text-muted text-xs font-medium">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {recipe.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Join Our Growing Community</h3>
            <p className="text-muted">Thousands of home cooks are already transforming their kitchens</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group text-center rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-0.5 text-[11px] font-semibold text-primary-700 mb-3">
                  {stat.label}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted mb-6">Join thousands of home cooks discovering new flavors every day</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:-translate-y-0.5"
            >
              Start Your Culinary Journey
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary-50/50"
            >
              Sign In to Explore More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
