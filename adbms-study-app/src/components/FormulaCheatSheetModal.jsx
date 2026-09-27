import React, { useState } from 'react';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { FORMULA_DATA } from '../data/formulaData';
import KaTeXMath from './KaTeXMath';

export default function FormulaCheatSheetModal({ isOpen, onClose, onSelectTopic }) {
  const [expandedId, setExpandedId] = useState('f1');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Database Mathematical Formulas & Metrics
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                KaTeX-rendered algorithmic equations with symbol breakdowns and worked numerical examples
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulas List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {FORMULA_DATA.map(f => {
            const isExpanded = expandedId === f.id;
            return (
              <div
                key={f.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 space-y-3"
              >
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : f.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      Topic {f.topicId}
                    </span>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      {f.title}
                    </h4>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>

                {/* KaTeX Equation Display */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <KaTeXMath math={f.latex} block />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {f.meaning}
                </p>

                {isExpanded && (
                  <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Symbol Breakdown:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {f.symbols.map((s, idx) => (
                          <div key={idx} className="p-2 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
                            <KaTeXMath math={s.symbol} />: <span className="font-sans text-slate-600 dark:text-slate-400">{s.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-[11px] text-emerald-900 dark:text-emerald-300">
                      <strong>Numerical Example: </strong> {f.example}
                    </div>

                    <button
                      onClick={() => {
                        onSelectTopic(f.topicId);
                        onClose();
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      View Topic {f.topicId} In-Depth →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
