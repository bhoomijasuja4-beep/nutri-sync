const plans = [
  {
    name: "Starter",
    subtitle: "Perfect for trying out",
    originalPrice: "$9.99",
    price: "$5.99",
    period: "1 token • 1 Week",
    perWeek: "$5.99 per week",
    cta: "Start Free Week",
    popular: false,
    save: null,
  },
  {
    name: "Popular",
    subtitle: "Most chosen by families",
    originalPrice: "$23.96",
    price: "$17.99",
    period: "4 tokens • 1 Month",
    perWeek: "$4.50 per week",
    cta: "Get 4 Tokens",
    popular: true,
    save: "Save 25%",
  },
  {
    name: "Pro",
    subtitle: "Best value for meal planners",
    originalPrice: "$59.90",
    price: "$39.99",
    period: "10 tokens • 10 Weeks",
    perWeek: "$4.00 per week",
    cta: "Get 10 Tokens",
    popular: false,
    save: "Save 33%",
  },
];

const allFeatures = [
  "Personalized meal plans",
  "Smart grocery shopping lists",
  "Nutritional insights",
  "Dietary preference settings",
  "Mobile-friendly interface",
  "Customer support",
];

const trustBadges = [
  { title: "Secure Payment", sub: "Stripe payment processing", icon: "🔒" },
  { title: "Never Expire", sub: "Use tokens anytime", icon: "⏰" },
  { title: "24/7 Support", sub: "Always here to help", icon: "💬" },
];

const pricingFaq = [
  {
    q: "How do tokens work?",
    a: "Each token generates one week of personalized meal plans. Tokens never expire and can be used whenever you need fresh meal ideas.",
  },
  {
    q: "Can I change my dietary preferences?",
    a: "Absolutely! Update your preferences anytime and your next meal plan will reflect the changes.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "While tokens are non-refundable, we're committed to your satisfaction. Contact our support team if you have any issues.",
  },
  {
    q: "Do I get a free trial?",
    a: "Yes! Every new user gets one free token, which covers your first week of meal planning. No payment required to try it out.",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface/30 via-transparent to-primary-50/30" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-border/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent-green/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-1 text-xs font-semibold text-primary-700 mb-4">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-muted text-lg leading-relaxed">
            Choose the perfect plan for your family&apos;s meal planning needs. No hidden
            fees, cancel anytime.
          </p>

          {/* Free trial badge */}
          <div className="mt-6 inline-flex flex-col items-center">
            <div className="rounded-full bg-white border border-primary/10 px-4 py-1 text-xs font-medium text-primary-700 shadow-sm mb-2">
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <span>✨</span>
              <p className="text-sm font-medium text-foreground">
                New users get their first week{" "}
                <span className="text-primary font-bold">absolutely FREE!</span>
              </p>
              <span className="animate-bounce-slow">🎉</span>
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-2 ${
                plan.popular
                  ? "border-primary/30 bg-white shadow-2xl shadow-primary/10 scale-[1.03] z-10"
                  : "border-border/60 bg-white shadow-lg hover:shadow-xl hover:border-primary/20"
              }`}
            >
              {/* Popular / Save badges */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-white shadow-lg shadow-primary/30">
                    Most Popular
                  </span>
                </div>
              )}
              {plan.save && (
                <div className="absolute -top-3 right-4">
                  <span className="rounded-full bg-emerald-100 border border-emerald-200 px-3 py-0.5 text-[11px] font-bold text-emerald-700">
                    {plan.save}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                </div>
                <p className="text-sm text-muted">{plan.subtitle}</p>
              </div>

              {/* Price */}
              <div className="mb-6 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted line-through">{plan.originalPrice}</span>
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  {plan.period}
                </div>
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3 flex-1">
                {allFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <svg className="h-4 w-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="relative z-20">
                <a
                  href="#"
                  className={`flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark hover:-translate-y-0.5"
                      : "bg-foreground text-white hover:bg-foreground/80 hover:-translate-y-0.5"
                  }`}
                >
                  {plan.cta}
                </a>
                <p className="mt-2 text-center text-xs text-muted">{plan.perWeek}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
          {trustBadges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-3 justify-center">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{badge.title}</p>
                <p className="text-xs text-muted">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing FAQ */}
        <div className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {pricingFaq.map((item) => (
              <div key={item.q}>
                <h4 className="text-sm font-semibold text-foreground mb-1">{item.q}</h4>
                <p className="text-sm text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted mt-8">
          Need help choosing? Email support@nutrisync.com for personalized recommendations.
        </p>
      </div>
    </section>
  );
}
