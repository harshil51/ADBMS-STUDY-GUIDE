import React from 'react';
import { BookOpen, HelpCircle, Compass, Lightbulb, Sparkles } from 'lucide-react';

export default function SectionOverview({ overview }) {
  if (!overview) return null;

  let whatIsIt = '';
  let whyNeed = '';
  let whereUsed = '';
  let importantNotes = '';

  if (typeof overview === 'string') {
    whatIsIt = overview;
  } else {
    whatIsIt = overview.whatIsIt || overview.definition || overview.quickSummary || '';
    whyNeed = overview.whyNeed || overview.whyItMatters || overview.motivation || '';
    whereUsed = overview.whereUsed || overview.applications || '';
    importantNotes = overview.importantNotes || overview.notes || '';
  }

  // If whyNeed is not explicitly filled, but whatIsIt has "Why do we need it?"
  if (!whyNeed && whatIsIt.includes('Why do we need it?')) {
    const parts = whatIsIt.split(/Why do we need it\?|Where is it used\?|Important:/i);
    if (parts.length > 1) {
      whatIsIt = parts[0].replace(/^1\.\s*Topic Name[^\n]*\n|What is it\?\s*/i, '').trim();
      whyNeed = parts[1]?.trim() || '';
      if (parts[2]) whereUsed = parts[2]?.trim() || '';
      if (parts[3]) importantNotes = parts[3]?.trim() || '';
    }
  }

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <BookOpen className="w-4 h-4" />
          <span>Section 1: Topic Overview & Motivation</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
          Core Foundations
        </span>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* What is it? */}
        <div className="relative overflow-hidden rounded-2xl p-5 border border-blue-200/80 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/30 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-900 shadow-md hover:shadow-lg transition-all group">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Definition & Core Concept
          </span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            What is it?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
            {whatIsIt || 'Comprehensive architectural foundation and fundamental database principles.'}
          </p>
        </div>

        {/* Why do we need it? */}
        <div className="relative overflow-hidden rounded-2xl p-5 border border-purple-200/80 dark:border-purple-900/50 bg-gradient-to-br from-purple-50/80 via-white to-purple-50/30 dark:from-purple-950/30 dark:via-slate-900 dark:to-slate-900 shadow-md hover:shadow-lg transition-all group">
          <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <HelpCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
            Motivation & Problem Solved
          </span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Why do we need it?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
            {whyNeed || 'Enables efficient scaling, reliable concurrency control, fault tolerance, and data isolation.'}
          </p>
        </div>

        {/* Where is it used? */}
        <div className="relative overflow-hidden rounded-2xl p-5 border border-emerald-200/80 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 shadow-md hover:shadow-lg transition-all group">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            Industry Ecosystem
          </span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Where is it used?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
            {whereUsed || 'Mission-critical enterprise applications, distributed clouds, banking transactions, and analytics.'}
          </p>
        </div>

      </div>

      {/* Highlighted Important Note Alert */}
      {importantNotes && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-sm">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Crucial Architectural Note
            </div>
            <p className="text-xs leading-relaxed whitespace-pre-line">
              {importantNotes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
