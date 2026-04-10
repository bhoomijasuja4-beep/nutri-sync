"use client";

interface Achievement {
  id: string;
  title: string;
  icon: string;
  earned: boolean;
  description: string;
}

interface Props {
  streak: number;
  achievements: Achievement[];
}

export default function StreakAndAchievements({ streak, achievements }: Props) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-foreground mb-6">Milestones</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Streak Box */}
        <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl p-6 text-white shadow-lg shadow-orange-500/20 shrink-0 md:w-64 flex flex-col justify-center items-center text-center">
          <div className="text-5xl mb-2 filter drop-shadow-md">🔥</div>
          <p className="text-orange-100 text-sm font-semibold uppercase tracking-wider mb-1">Current Streak</p>
          <p className="text-4xl font-extrabold">{streak} <span className="text-xl">Days</span></p>
          <p className="text-xs text-orange-100 mt-3 opacity-90">Hitting your calorie targets</p>
        </div>

        {/* Achievements Grid */}
        <div className="flex-1 bg-white rounded-3xl p-6 border border-border/60 shadow-sm">
          <h3 className="font-bold text-sm text-muted uppercase tracking-wider mb-4">Badges</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div 
                key={ach.id} 
                className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all ${
                  ach.earned 
                    ? "bg-surface border-border/60" 
                    : "bg-surface/30 border-dashed border-border/40 opacity-50 grayscale"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${ach.earned ? "bg-white shadow-sm" : "bg-transparent"}`}>
                  {ach.icon}
                </div>
                <h4 className="font-bold text-xs text-foreground mb-1 leading-tight">{ach.title}</h4>
                <p className="text-[9px] text-muted leading-tight">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
