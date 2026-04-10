const steps = [
  {
    number: "1",
    step: "Step 1",
    title: "Set your preferences",
    description:
      "Customize your meal planning experience with personalized dietary preferences, allergies, and nutritional goals.",
    tags: ["Dietary Preferences", "Allergy Management"],
    cta: "Start generating",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    number: "2",
    step: "Step 2",
    title: "Generate a meal plan",
    description:
      "AI-powered meal planning that creates complete weekly menus based on your dietary preferences and nutritional goals.",
    tags: ["AI-Powered", "Nutritional Balance"],
    cta: "Plan your week",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    number: "3",
    step: "Step 3",
    title: "View your weekly meal plan",
    description:
      "See your generated meal plan for the week. Detailed recipes, shopping lists, and cooking instructions for stress-free meal preparation. Use powerful cooking mode to get cooking instructions without dimming or locking screen on mobile devices.",
    tags: ["Interactive Calendar", "Shopping Lists"],
    cta: "Start today",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: "4",
    step: "Step 4",
    title: "View your shopping list",
    description:
      "View your shopping list with all the ingredients you need for your meal plan. You can also add custom items to your shopping list.",
    tags: ["Smart Lists", "Custom Items"],
    cta: "Start today",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface/50 to-white">
        <div className="absolute inset-0 bg-grid" style={{ maskImage: "linear-gradient(to bottom, white, transparent)" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-1 text-xs font-semibold text-primary-700 mb-4">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simplify Your Meal Planning
          </h2>
          <p className="mx-auto max-w-2xl text-muted text-lg leading-relaxed">
            Our app provides powerful tools to help you eat healthier, save time, and
            reduce food waste with AI-powered meal planning.
          </p>
        </div>

        {/* Free trial banner */}
        <div className="relative mb-16 mx-auto max-w-3xl">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-8 py-6 shadow-lg shadow-primary/5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
              <span className="text-lg">✨</span>
              <div>
                <div className="rounded-full inline-flex bg-white/80 border border-primary/10 px-3 py-0.5 text-xs font-medium text-primary-700 mb-1">
                  No credit card required
                </div>
                <p className="text-sm font-medium text-foreground">
                  New users get their first week{" "}
                  <span className="text-primary font-bold">absolutely FREE!</span>
                </p>
              </div>
              <span className="animate-bounce-slow text-lg">🎉</span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`group relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Step visual */}
              <div className="relative flex-shrink-0">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary/10 flex items-center justify-center shadow-xl shadow-primary/5 transition-transform group-hover:scale-[1.02]">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white text-xl font-bold shadow-lg shadow-primary/30">
                    {step.number}
                  </div>
                  {/* Icon */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md border border-border/50 text-primary">
                      <div className="scale-150">{step.icon}</div>
                    </div>
                    <span className="text-sm font-semibold text-primary-700">{step.title}</span>
                  </div>
                </div>

                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-20 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary/20 to-transparent" />
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 max-w-lg text-center lg:text-left">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-700">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted text-lg leading-relaxed mb-6">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary-50 border border-primary/10 px-3 py-1 text-xs font-medium text-primary-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:-translate-y-0.5"
                >
                  {step.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
