import React from 'react';
import { CheckCircle2, AlertTriangle, Scale } from 'lucide-react';

export default function SectionAdvantagesLimitations({ advantages, limitations }) {
  const advList = Array.isArray(advantages) ? advantages : (advantages || '').split('\n').filter(Boolean);
  const limList = Array.isArray(limitations) ? limitations : (limitations || '').split('\n').filter(Boolean);

  if (advList.length === 0 && limList.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Scale className="w-4 h-4 text-blue-500" />
          <span>Section 11: Advantages & Limitations Balance Sheet</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
          Architectural Trade-offs
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Advantages Column */}
        <div className="rounded-3xl p-6 border border-emerald-200/80 dark:border-emerald-900/40 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/20 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Advantages & Benefits</span>
          </div>

          <ul className="space-y-2">
            {advList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations Column */}
        <div className="rounded-3xl p-6 border border-rose-200/80 dark:border-rose-900/40 bg-gradient-to-br from-rose-50/60 via-white to-pink-50/20 dark:from-rose-950/20 dark:via-slate-900 dark:to-slate-900 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Bottlenecks & Limitations</span>
          </div>

          <ul className="space-y-2">
            {limList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  !
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
