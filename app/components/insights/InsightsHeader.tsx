"use client";

interface Props {
  days: number;
  onDaysChange: (days: number) => void;
}

export default function InsightsHeader({ days, onDaysChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Health Insights</h1>
        <p className="text-sm text-muted mt-1">AI-analyzed trends and alerts based on your meal history.</p>
      </div>

      <div className="bg-surface/50 p-1 rounded-xl flex items-center border border-border/40 shrink-0">
        {[7, 14, 30].map(d => (
          <button
            key={d}
            onClick={() => onDaysChange(d)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              days === d ? "bg-white text-foreground shadow-sm ring-1 ring-border/50" : "text-muted hover:text-foreground"
            }`}
          >
            {d} Days
          </button>
        ))}
      </div>
    </div>
  );
}
