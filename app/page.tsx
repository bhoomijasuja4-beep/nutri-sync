"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import OnboardingFlow from "./components/onboarding/OnboardingFlow";
import PromoBanner from "./components/PromoBanner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import KeyFeatures from "./components/KeyFeatures";
import RecipesSection from "./components/RecipesSection";
import PricingSection from "./components/PricingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {
  const loadFromStorage = useUserStore((s) => s.loadFromStorage);
  const isOnboarded = useUserStore((s) => s.isOnboarded);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadFromStorage();
    setHydrated(true);
  }, [loadFromStorage]);

  if (!hydrated) return null;

  // If already onboarded show redirect hint
  if (isOnboarded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50/30">
        <div className="text-center space-y-4 animate-fade-up">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white font-bold text-xl shadow-lg shadow-primary/25">N</div>
            <span className="text-3xl font-bold text-foreground">Nutri<span className="text-primary">Sync</span></span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back! 👋</h1>
          <p className="text-muted">You&apos;re already set up. Head to your dashboard.</p>
          <a href="/dashboard" className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:-translate-y-0.5">
            Go to Dashboard →
          </a>
        </div>
      </div>
    );
  }

  // Show onboarding flow
  if (showOnboarding) {
    return <OnboardingFlow />;
  }

  // Landing page
  return (
    <>
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <HeroSection onGetStarted={() => setShowOnboarding(true)} />
        <div className="divider-gradient mx-auto max-w-sm" />
        <HowItWorks />
        <KeyFeatures />
        <RecipesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
