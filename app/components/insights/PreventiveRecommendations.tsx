"use client";

import type { InsightTip } from "@/types";
import Link from "next/link";

interface Props {
  tips: InsightTip[];
}

export default function PreventiveRecommendations({ tips }: Props) {
  if (tips.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-foreground mb-6">Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <Link 
            key={tip.id} 
            href={tip.linkTo}
            className="group flex flex-col bg-white rounded-3xl p-6 border border-border/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full"
          >
             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
               {tip.icon}
             </div>
             <h4 className="font-bold text-foreground mb-2 leading-snug">{tip.title}</h4>
             <p className="text-xs text-muted leading-relaxed flex-1">{tip.description}</p>
             <div className="mt-4 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
               Take action →
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
