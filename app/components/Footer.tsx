const footerLinks = {
  product: [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Recipes", href: "#recipes" },
    { label: "Wall of Love", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-white/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* CTA Banner */}
        <div className="relative my-12 overflow-hidden rounded-3xl border border-primary/20">
          {/* BG gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white/80 to-primary/5" />
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-primary/10 blur-xl" />

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-1 text-xs font-semibold text-primary-700 mb-4">
              AI-Powered Meal Planning
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Transform Your Meal Planning Today
            </h2>
            <p className="mx-auto max-w-lg text-muted leading-relaxed mb-8">
              Save time, reduce food waste, and eat healthier with our intelligent meal planning platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:-translate-y-0.5"
              >
                Get Started
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary-50/50"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 py-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-md shadow-primary/25">
                N
              </div>
              <span className="text-lg font-bold text-foreground">
                Nutri<span className="text-primary">Sync</span>
              </span>
            </a>
            <p className="max-w-sm text-sm text-muted leading-relaxed">
              AI-powered meal planning that helps you eat healthier, save money,
              and reduce food waste with personalized recipes and smart shopping
              lists.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">© 2025 NutriSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
