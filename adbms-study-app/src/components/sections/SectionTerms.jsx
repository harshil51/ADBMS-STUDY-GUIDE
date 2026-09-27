import React, { useState } from 'react';
import { BookOpen, Search, Sparkles } from 'lucide-react';

export default function SectionTerms({ terms }) {
  const [query, setQuery] = useState('');

  if (!terms || terms.length === 0) return null;

  const filtered = query
    ? terms.filter(t => t.term.toLowerCase().includes(query.toLowerCase()) || t.definition.toLowerCase().includes(query.toLowerCase()))
    : terms;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <BookOpen className="w-4 h-4" />
          <span>Section 9: Important Terms Glossary ({terms.length} Definitions)</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search glossary..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Grid of Glossary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400 group-hover:underline">
                  {item.term}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono">
                  Concept
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {item.definition}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
