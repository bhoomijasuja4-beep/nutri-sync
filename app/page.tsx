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
  return (
    <>
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <HeroSection />
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
