import React from 'react';
import { CheckCircle2, Building2, GraduationCap, Globe, Zap } from 'lucide-react';

export default function SectionExamples({ examples }) {
  if (!examples || examples.length === 0) return null;

  const getExampleBadge = (type) => {
    const t = type.toLowerCase();
    if (t.includes('easy')) return { color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: Zap };
    if (t.includes('practical')) return { color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20', icon: GraduationCap };
    if (t.includes('industry')) return { color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20', icon: Building2 };
    return { color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Globe };
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>Section 10: Multi-Perspective Examples ({examples.length})</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          Real-World Demonstrations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examples.map((ex, idx) => {
          const badge = getExampleBadge(ex.type);
          const IconComp = badge.icon;

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${badge.color}`}>
                    <IconComp className="w-3.5 h-3.5" />
                    {ex.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Example #{idx + 1}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans mt-2">
                  {ex.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
