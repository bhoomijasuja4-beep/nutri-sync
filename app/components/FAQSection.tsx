"use client";

import { useState } from "react";

const faqItems = [
  {
    category: "Pricing",
    question: "How much does NutriSync cost?",
    answer:
      "NutriSync uses a token-based pricing system. You can start with a single token for $5.99 (1 week), get 4 tokens for $17.99 (1 month), or our best value pack of 10 tokens for $39.99. Every new user gets their first week free!",
  },
  {
    category: "Meal Planning",
    question: "How does the AI meal planning work?",
    answer:
      "Our AI analyzes your dietary preferences, allergies, nutritional goals, and family size to generate personalized weekly meal plans. Each plan includes breakfast, lunch, dinner, and snacks with detailed recipes and shopping lists.",
  },
  {
    category: "Preferences",
    question: "Can I change my preferences after onboarding?",
    answer:
      "Absolutely! You can update your dietary preferences, allergies, family size, and nutritional goals anytime from your profile settings. Your next meal plan will automatically reflect the changes.",
  },
  {
    category: "Dietary Preferences",
    question: "What dietary restrictions and preferences do you support?",
    answer:
      "We support a wide range including vegetarian, vegan, gluten-free, dairy-free, keto, paleo, low-carb, and many more. You can also specify individual food allergies and ingredients to avoid.",
  },
  {
    category: "Family Planning",
    question: "Can I plan meals for my whole family?",
    answer:
      "Yes! You can set up family profiles with different dietary needs and our AI will create meal plans that accommodate everyone. Recipes can be scaled to any serving size.",
  },
  {
    category: "Shopping Lists",
    question: "How do the automated shopping lists work?",
    answer:
      "When you generate a meal plan, we automatically create organized shopping lists grouped by category (produce, dairy, proteins, etc.). You can check off items, add custom items, and share lists with family members.",
  },
  {
    category: "Nutrition",
    question: "Do recipes include nutritional information?",
    answer:
      "Every recipe includes comprehensive nutritional data including calories, protein, carbs, fat, fiber, vitamins, and minerals. We also show how each meal contributes to your daily nutritional goals.",
  },
  {
    category: "Tokens",
    question: "How does the token system work?",
    answer:
      "Each token generates one complete week of personalized meal plans. Tokens never expire, so you can use them whenever you need fresh meal ideas. Buy in bulk for better value!",
  },
  {
    category: "Data Storage",
    question: "How is my data stored?",
    answer:
      "Your data is securely stored using industry-standard encryption. We never share your personal information with third parties. You can export or delete your data at any time.",
  },
  {
    category: "Tokens",
    question: "Are tokens refundable?",
    answer:
      "While tokens are non-refundable, we're committed to your satisfaction. If you encounter any issues with your meal plans, our support team will work with you to resolve them.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-1 text-xs font-semibold text-primary-700 mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-xl text-muted text-lg leading-relaxed">
            Everything you need to know about NutriSync. Can&apos;t find the answer you&apos;re
            looking for? Our friendly team is here to help.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={`group rounded-2xl border transition-all ${
                openIndex === i
                  ? "border-primary/20 bg-primary-50/30 shadow-md"
                  : "border-border/60 bg-white hover:border-primary/10 hover:shadow-sm"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary-700">
                    {item.category}
                  </span>
                  <span className="text-sm font-semibold text-foreground truncate">
                    {item.question}
                  </span>
                </div>
                <svg
                  className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-5 animate-slide-up">
                  <p className="text-sm text-muted leading-relaxed pl-0 sm:pl-[calc(theme(spacing.3)+4rem)]">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 via-white/80 to-primary/5 p-8 sm:p-10 text-center">
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-primary/10 blur-xl" />

          <div className="relative space-y-2 mb-6">
            <h3 className="text-xl font-bold text-foreground">Still have questions?</h3>
            <p className="text-sm text-muted leading-relaxed max-w-md mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Our friendly support team is ready
              to help you get the most out of NutriSync.
            </p>
          </div>
          <a
            href="mailto:support@nutrisync.com"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
