import React from 'react';
import { Sparkles, Utensils, Building2, Plane, CheckCircle2 } from 'lucide-react';

export default function SectionAnalogies({ analogies }) {
  if (!analogies || analogies.length === 0) return null;

  const analogyList = (Array.isArray(analogies) ? analogies : [analogies]).map((a, idx) => {
    if (typeof a === 'string') {
      const cleanStr = a.replace(/^Analogy\s*\d*\s*[-:]\s*/i, '').trim();
      const firstColon = cleanStr.indexOf(':');
      if (firstColon > 0 && firstColon < 40) {
        return {
          num: idx + 1,
          title: cleanStr.slice(0, firstColon).trim(),
          description: cleanStr.slice(firstColon + 1).trim()
        };
      }
      return {
        num: idx + 1,
        title: `Intuitive Metaphor ${idx + 1}`,
        description: cleanStr
      };
    }
    return {
      num: a.num || idx + 1,
      title: a.title || `Analogy #${idx + 1}`,
      description: a.description || a.content || ''
    };
  });

  const getAnalogyIcon = (title) => {
    const t = (title || '').toString().toLowerCase();
    if (t.includes('restaurant') || t.includes('waiter') || t.includes('kitchen') || t.includes('food')) return Utensils;
    if (t.includes('bank') || t.includes('branch') || t.includes('office') || t.includes('supermarket')) return Building2;
    if (t.includes('trip') || t.includes('flight') || t.includes('vacation')) return Plane;
    return Sparkles;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span>Section 3: Real-Life Analogies ({analogyList.length})</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
          Visual Mental Models
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analogyList.map((a, idx) => {
          const IconComp = getAnalogyIcon(a.title);

          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-3xl p-6 border border-amber-200/80 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/30 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900 shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Analogy #{a.num}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {a.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans mt-2 whitespace-pre-line">
                  {a.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-300">
                <span className="font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  Key Takeaway: Intuitive Mental Bridge
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
