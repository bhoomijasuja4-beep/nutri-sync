export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent-purple/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-50/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-120px)] py-16 lg:py-24">
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Decorative avocado badge */}
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-1.5 text-sm text-primary-700 font-medium">
              <span>🥑</span>
              <span>Cook smarter with personalized plans tailored to your lifestyle.</span>
            </div>

            {/* Main headline */}
            <h1 className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]" style={{ animationDelay: "0.1s" }}>
              <span className="text-foreground">AI-powered </span>
              <span className="text-foreground">meal planning </span>
              <span className="text-foreground">to help you </span>
              <span className="text-foreground">save </span>
              <br className="hidden sm:block" />
              <span className="text-gradient-green">Time, </span>
              <span className="text-gradient-green">Money & </span>
              <br className="hidden sm:block" />
              <span className="text-gradient-green">Eat Healthier.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="animate-fade-up mt-6 max-w-xl text-lg text-muted leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              Personalized meal planning tailored to your family&apos;s tastes
              and dietary needs. Enjoy smart recipes with ingredient
              alternatives, a hands-free cooking mode that guides you
              step-by-step.
              <span className="inline-flex items-center gap-1 ml-1">
                <span className="relative">
                  <span className="font-semibold text-foreground">
                    Start with a FREE WEEK—no credit card required!
                  </span>
                  <span className="animate-bounce-slow inline-block ml-1">✨</span>
                  <span className="animate-bounce-slow inline-block" style={{ animationDelay: "0.3s" }}>🎁</span>
                </span>
              </span>
            </p>

            {/* CTA */}
            <div
              className="animate-fade-up mt-8 flex flex-col sm:flex-row gap-4"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="#pricing"
                className="group relative inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0"
              >
                Get started
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary-50/50 hover:-translate-y-0.5"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Right Side - Decorative visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Floating food elements */}
            <div className="relative w-full max-w-lg aspect-square">
              {/* Central circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 border border-primary/10 flex items-center justify-center shadow-2xl shadow-primary/10">
                  <div className="w-60 h-60 rounded-full bg-gradient-to-br from-white to-primary-50 border border-primary/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl mb-2">🥗</div>
                      <p className="text-sm font-semibold text-primary-700">Smart Meal Plans</p>
                      <p className="text-xs text-muted mt-1">Powered by AI</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating food items */}
              <div className="absolute top-4 left-8 animate-float" style={{ animationDelay: "0s" }}>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/5 border border-border/50 text-3xl">
                  🥑
                </div>
              </div>
              <div className="absolute top-12 right-4 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/5 border border-border/50 text-2xl">
                  🍎
                </div>
              </div>
              <div className="absolute bottom-20 left-0 animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/5 border border-border/50 text-2xl">
                  🥦
                </div>
              </div>
              <div className="absolute bottom-8 right-12 animate-float" style={{ animationDelay: "3s" }}>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/5 border border-border/50 text-3xl">
                  🍗
                </div>
              </div>
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg shadow-black/5 border border-border/50 text-xl">
                  🥕
                </div>
              </div>
              <div className="absolute top-1/3 -right-2 animate-float" style={{ animationDelay: "2.5s" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg shadow-black/5 border border-border/50 text-xl">
                  🍋
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-light/40 p-1.5">
          <div className="h-2 w-1 rounded-full bg-muted-light/60 animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
}
