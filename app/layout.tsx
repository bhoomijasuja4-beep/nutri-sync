import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NutriSync — AI-Powered Meal Planning | Save Time, Money & Eat Healthier",
  description:
    "Personalized meal planning tailored to your family's tastes and dietary needs. Enjoy smart recipes with ingredient alternatives, a hands-free cooking mode, and automated shopping lists.",
  keywords: [
    "meal planning",
    "nutrition",
    "healthy eating",
    "AI meal planner",
    "recipes",
    "diet",
    "NutriSync",
  ],
  openGraph: {
    title: "NutriSync — AI-Powered Meal Planning",
    description:
      "Save time, reduce food waste, and eat healthier with intelligent meal planning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
