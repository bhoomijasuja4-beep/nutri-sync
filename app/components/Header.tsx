"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Recipes", href: "#recipes" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border/60 shadow-sm"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg shadow-md shadow-primary/25 transition-transform group-hover:scale-110">
            N
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            Nutri<span className="text-primary">Sync</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground rounded-lg hover:bg-black/[0.04] group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-4/5" />
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            Sign In
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-black/[0.04] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18" /><path d="M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/60 bg-white/95 backdrop-blur-xl animate-slide-up">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-black/[0.04] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25"
            >
              Sign In
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
