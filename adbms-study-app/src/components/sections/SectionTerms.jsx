import React, { useState } from 'react';
import { BookOpen, Search, Sparkles } from 'lucide-react';

export default function SectionTerms({ terms }) {
  const [query, setQuery] = useState('');

  if (!terms || (Array.isArray(terms) && terms.length === 0) || (typeof terms === 'string' && !terms.trim())) {
    return null;
  }

  let termsList = [];
  if (Array.isArray(terms)) {
    termsList = terms.map((t, idx) => ({
      term: t.term || `Term #${idx + 1}`,
      definition: t.definition || t.meaning || t.details || ''
    }));
  } else if (typeof terms === 'string') {
    const lines = terms.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('9.') && !l.toLowerCase().includes('simple meaning') && !l.toLowerCase().startsWith('term\t'));
    termsList = lines.map((line, idx) => {
      const parts = line.split(/[\t:]|\s{2,}/).map(p => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        return {
          term: parts[0],
          definition: parts.slice(1).join(' - ')
        };
      }
      return {
        term: `Term #${idx + 1}`,
        definition: line
      };
    });
  }

  if (termsList.length === 0) return null;

  const q = (query || '').toLowerCase().trim();
  const filtered = q
    ? termsList.filter(t => (t.term || '').toLowerCase().includes(q) || (t.definition || '').toLowerCase().includes(q))
    : termsList;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <BookOpen className="w-4 h-4" />
          <span>Section 9: Important Terms Glossary ({termsList.length} Definitions)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search glossary..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-8 pr-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
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
