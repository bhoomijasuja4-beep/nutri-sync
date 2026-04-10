"use client";

import type { HealthAlert } from "@/types";

interface Props {
  alerts: HealthAlert[];
}

export default function HealthAlertCards({ alerts }: Props) {
  if (alerts.length === 0) {
    return (
      <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100 flex flex-col items-center justify-center">
        <span className="text-4xl mb-3">✅</span>
        <h3 className="font-bold text-emerald-900 mb-1">Looking Good!</h3>
        <p className="text-sm text-emerald-700 max-w-sm">No health warnings detected in your recent meal history. Keep up the great work.</p>
      </div>
    );
  }

  const colors = {
    critical: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    good: "bg-emerald-50 border-emerald-200 text-emerald-800"
  };

  const bgColors = {
    critical: "bg-white",
    warning: "bg-white",
    info: "bg-white",
    good: "bg-white"
  };

  // Sort: critical > warning > info > good
  const sortedAlerts = [...alerts].sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2, good: 3 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedAlerts.map(alert => (
        <div key={alert.id} className={`rounded-2xl p-5 border shadow-sm ${colors[alert.severity]} ${bgColors[alert.severity]} transition-all hover:shadow-md block`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border shadow-sm ${colors[alert.severity].split(' ')[0]} ${colors[alert.severity].split(' ')[1]}`}>
              {alert.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1 line-clamp-1" title={alert.title}>{alert.title}</h4>
              <p className="text-xs opacity-90 leading-relaxed">{alert.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
