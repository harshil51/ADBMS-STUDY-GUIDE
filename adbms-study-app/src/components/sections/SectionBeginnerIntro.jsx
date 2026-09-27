import React from 'react';
import { Lightbulb, BookMarked, Sparkles, MessageSquare } from 'lucide-react';

export default function SectionBeginnerIntro({ beginnerIntro }) {
  if (!beginnerIntro) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Lightbulb className="w-4 h-4" />
          <span>Section 2: Beginner Friendly Intuition & Key Words</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          Intuitive Explanation
        </span>
      </div>

      {/* Story Intuition Box */}
      {beginnerIntro.story && (
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-emerald-200/80 dark:border-emerald-900/40 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 shadow-md">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Intuitive Story Explanation
              </span>
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                {beginnerIntro.story}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Technical Key Words Dictionary Grid */}
      {beginnerIntro.keywords && beginnerIntro.keywords.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-emerald-500" />
              Technical Keywords & Plain-English Meanings ({beginnerIntro.keywords.length})
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Quick Vocabulary</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {beginnerIntro.keywords.map((kw, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 group-hover:underline">
                    {kw.term}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-500 font-mono">
                    Term
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {kw.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
