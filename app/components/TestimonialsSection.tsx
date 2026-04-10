const testimonials = [
  {
    name: "Sarah Miller",
    role: "Busy Mom & Fitness Enthusiast",
    quote:
      "This app has been a game-changer for our family! Meal planning used to be a stressful chore, but now it's so easy to create healthy, delicious meals that everyone loves. The automated shopping list is a lifesaver!",
    rating: 5,
  },
  {
    name: "Alex Chen",
    role: "Software Developer with Dietary Restrictions",
    quote:
      "Finally, an app that understands my dietary needs! Finding recipes and planning meals that fit my restrictions was always a challenge. Now, I get personalized suggestions and feel confident about what I'm eating.",
    rating: 5,
  },
  {
    name: "Dr. David Lee",
    role: "Nutritionist",
    quote:
      "I often recommend this app to my clients. It empowers them to take control of their nutrition by making meal planning accessible and educational. The nutritional insights feature is particularly valuable.",
    rating: 5,
  },
  {
    name: "Maya Patel",
    role: "Working Parent & Home Cook",
    quote:
      "Between work and kids' activities, I barely had time to plan healthy meals. This app changed everything! I can now prepare nutritious dinners for my family without the daily stress of 'what's for dinner?' The seasonal recipe suggestions are wonderful.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Fitness Instructor with Specific Macro Goals",
    quote:
      "I've tried numerous meal planning apps, but this one stands out for tracking macros. The ability to adjust recipes to meet specific protein, carb, and fat targets is exactly what I needed for my training regimen and my clients.",
    rating: 5,
  },
  {
    name: "Olivia Rodriguez",
    role: "Dietitian",
    quote:
      "As a dietitian, I appreciate the scientific accuracy of the nutritional information. My patients have made remarkable progress using this app to manage various health conditions through proper nutrition planning.",
    rating: 5,
  },
  {
    name: "Sophia Martinez",
    role: "Parent of Children with Food Allergies",
    quote:
      "Managing multiple food allergies in our family used to be overwhelming. This app lets me filter out allergens and still find delicious recipes everyone can enjoy. The substitution suggestions are incredibly thoughtful and practical.",
    rating: 5,
  },
  {
    name: "Robert Jackson",
    role: "Retired & New to Cooking",
    quote:
      "After my wife passed, I had to learn to cook for myself at 68. This app has been my companion and teacher. The beginner-friendly recipes and clear instructions have given me confidence in the kitchen I never thought I'd have.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "Cooking Enthusiast Learning New Cuisines",
    quote:
      "I've expanded my culinary horizons with this app! From Thai curries to Mediterranean dishes, the international recipe collection has transformed my cooking skills. The video tutorials for complex techniques are especially helpful.",
    rating: 5,
  },
  {
    name: "Noah Kim",
    role: "College Student on a Budget",
    quote:
      "This app has been perfect for my student lifestyle! It helps me plan affordable, quick meals that don't sacrifice nutrition. The cost estimates for each recipe help me stay within my tight budget while eating well.",
    rating: 5,
  },
  {
    name: "Ethan Green",
    role: "Eco-conscious Consumer",
    quote:
      "Reducing food waste is important to me, and this app helps a lot. By planning meals and generating precise shopping lists, I buy only what I need. It's great for my budget and the planet.",
    rating: 5,
  },
  {
    name: "Mark Robinson",
    role: "Athlete & Health Coach",
    quote:
      "Tracking my macros and planning my meals around my training schedule is crucial. This app simplifies the entire process, from planning to shopping to tracking. Highly recommended for anyone serious about their fitness and nutrition.",
    rating: 5,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const avatarColors = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-lime-100 text-lime-700",
  "bg-fuchsia-100 text-fuchsia-700",
  "bg-orange-100 text-orange-700",
  "bg-teal-100 text-teal-700",
  "bg-indigo-100 text-indigo-700",
  "bg-pink-100 text-pink-700",
];

export default function TestimonialsSection() {
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-1 text-xs font-semibold text-primary-700 mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What our clients are sharing
          </h2>
          <p className="mx-auto max-w-2xl text-muted text-lg leading-relaxed">
            Discover the glowing feedback from our delighted customers worldwide. See
            how our platform has transformed their meal planning experience.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[col1, col2, col3].map((col, colIdx) => (
            <div key={colIdx} className="space-y-6">
              {col.map((t, i) => {
                const globalIdx = colIdx + i * 3;
                return (
                  <div
                    key={t.name}
                    className="group rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: t.rating }).map((_, si) => (
                        <svg
                          key={si}
                          className="h-4 w-4 text-amber-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm text-foreground/80 leading-relaxed mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                          avatarColors[globalIdx % avatarColors.length]
                        }`}
                      >
                        {getInitials(t.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted truncate">{t.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
