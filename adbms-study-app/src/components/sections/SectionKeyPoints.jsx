import React from 'react';
import { Award, Zap, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function SectionKeyPoints({ keyPoints }) {
  if (!keyPoints) return null;

  const takeaways = keyPoints.takeaways || [];
  const misconceptions = keyPoints.misconceptions || [];
  const examTips = keyPoints.examTips || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Award className="w-4 h-4" />
          <span>Section 13: Key Points to Remember & Exam Tips</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
          High-Yield Revision
        </span>
      </div>

      <div className="space-y-4">
        
        {/* Exam Tips (Golden Alert) */}
        {examTips.length > 0 && (
          <div className="rounded-3xl p-6 border border-amber-300 dark:border-amber-800/80 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-orange-500/10 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <Award className="w-5 h-5 text-amber-500" />
              <span>🧠 GTU University Exam High-Priority Points</span>
            </div>
            <ul className="space-y-2">
              {examTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Common Misconceptions (Rose/Purple Alert) */}
        {misconceptions.length > 0 && (
          <div className="rounded-3xl p-6 border border-rose-300 dark:border-rose-900/60 bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-purple-500/10 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <span>💡 Common Misconceptions Debunked</span>
            </div>
            <ul className="space-y-2.5">
              {misconceptions.map((misc, idx) => (
                <li key={idx} className="p-3 rounded-2xl bg-white dark:bg-slate-900/80 border border-rose-200 dark:border-rose-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-rose-600 dark:text-rose-400 block mb-1">Myth vs Reality:</strong>
                  {misc}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Core Architectural Takeaways (Blue Alert) */}
        {takeaways.length > 0 && (
          <div className="rounded-3xl p-6 border border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/30 dark:from-blue-950/20 dark:via-slate-900 dark:to-slate-900 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              <Zap className="w-5 h-5 text-blue-500" />
              <span>⚡ Core Architectural Takeaways</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {takeaways.map((point, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
