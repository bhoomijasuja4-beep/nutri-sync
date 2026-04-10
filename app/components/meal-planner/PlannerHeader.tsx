"use client";

interface Props {
  isWeekly: boolean;
  onSetWeekly: (weekly: boolean) => void;
  onRegenerate: () => void;
  onSave: () => void;
}

export default function PlannerHeader({ isWeekly, onSetWeekly, onRegenerate, onSave }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Meal Planner</h1>
        <p className="text-sm text-muted mt-1">AI-generated plans matching your goals and dietary needs.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="bg-surface/50 p-1 rounded-xl flex items-center border border-border/40">
          <button
            onClick={() => onSetWeekly(false)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              !isWeekly ? "bg-white text-foreground shadow-sm ring-1 ring-border/50" : "text-muted hover:text-foreground"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => onSetWeekly(true)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              isWeekly ? "bg-white text-foreground shadow-sm ring-1 ring-border/50" : "text-muted hover:text-foreground"
            }`}
          >
            Week
          </button>
        </div>

        <button 
          onClick={onRegenerate}
          className="px-4 py-2.5 text-sm font-semibold text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors flex items-center gap-2"
        >
          <span>✨</span> Regenerate
        </button>

        <button 
          onClick={onSave}
          className="px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
        >
          Save Plan
        </button>
      </div>
    </div>
  );
}
