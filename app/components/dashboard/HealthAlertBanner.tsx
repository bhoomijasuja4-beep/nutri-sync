"use client";

import { useFoodLogStore } from "@/stores/useFoodLogStore";
import { useUserStore } from "@/stores/useUserStore";
import { generateAlerts } from "@/lib/insights-engine";
import Link from "next/link";
import { useMemo } from "react";

export default function HealthAlertBanner() {
  const profile = useUserStore((s) => s.profile);
  const meals = useFoodLogStore((s) => s.meals);

  const topAlert = useMemo(() => {
    if (!profile || meals.length === 0) return null;
    const alerts = generateAlerts(meals, profile);
    // Sort by severity (critical, warning, info, good)
    alerts.sort((a, b) => {
      const order = { critical: 0, warning: 1, info: 2, good: 3 };
      return order[a.severity] - order[b.severity];
    });
    // Return only top alert if it's actionable/critical/warning
    const alert = alerts[0];
    if (alert && (alert.severity === "critical" || alert.severity === "warning" || alert.severity === "good")) {
      return alert;
    }
    return null;
  }, [profile, meals]);

  if (!topAlert) return null;

  const colors = {
    critical: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    good: "bg-emerald-50 border-emerald-200 text-emerald-800"
  };

  return (
    <div className={`rounded-2xl border p-4 mb-6 flex items-start gap-3 shadow-sm ${colors[topAlert.severity]}`}>
      <div className="text-xl shrink-0 leading-none py-1">{topAlert.icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-bold mb-1">{topAlert.title}</h4>
        <p className="text-xs opacity-90 mb-2 leading-relaxed">{topAlert.message}</p>
        <Link href="/insights" className="text-xs font-bold underline opacity-80 hover:opacity-100 transition-opacity">
          View all insights →
        </Link>
      </div>
    </div>
  );
}
