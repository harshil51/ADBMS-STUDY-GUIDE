import React, { useState } from 'react';
import { FileText, Copy, Check, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

export default function SectionDetailedExplanation({ detailedExplanation }) {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);
  const [expandedSections, setExpandedSections] = useState({ 0: true, 1: true, 2: true });

  if (!detailedExplanation) return null;

  let subsections = detailedExplanation.subsections || [];
  
  // If subsections are missing, fallback to parsing raw text
  if (subsections.length === 0) {
    const rawText = detailedExplanation.raw || (typeof detailedExplanation === 'string' ? detailedExplanation : '');
    if (rawText) {
      const parts = rawText.split(/(?=\b\d+\.\d+\s+)/g).filter(Boolean);
      if (parts.length > 1) {
        subsections = parts.map((part, idx) => {
          const firstLine = part.trim().split('\n')[0];
          const rest = part.trim().slice(firstLine.length).trim();
          return {
            title: firstLine.replace(/^4\.\s*Complete Detailed Explanation\s*/i, '').trim(),
            content: rest
          };
        });
      } else {
        subsections = [{
          title: 'Detailed Theory & Architecture Breakdown',
          content: rawText.replace(/^4\.\s*Complete Detailed Explanation\s*/i, '').trim()
        }];
      }
    }
  }

  if (subsections.length === 0) return null;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const toggleSection = (idx) => {
    setExpandedSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Helper to format content into paragraphs, code blocks, lists, or exam tips
  const renderFormattedContent = (rawText, subIdx) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');
    const elements = [];

    lines.forEach((l, lIdx) => {
      const line = l.trim();
      if (!line) return;

      // Check if line looks like code / query (e.g. db.collection..., SELECT..., { ... })
      if (line.startsWith('db.') || line.startsWith('SELECT') || line.startsWith('INSERT') || line.startsWith('{') || line.startsWith('$') || line.includes('PRIMARY KEY')) {
        elements.push(
          <div key={lIdx} className="my-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 font-mono text-xs flex items-center justify-between shadow-inner">
            <code>{line}</code>
            <button
              onClick={() => handleCopy(line, `${subIdx}-${lIdx}`)}
              className="p-1 rounded text-slate-500 hover:text-slate-200 cursor-pointer"
              title="Copy code"
            >
              {copiedCodeIdx === `${subIdx}-${lIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        );
      } else if (line.startsWith('Exam Tip:')) {
        elements.push(
          <div key={lIdx} className="my-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">GTU Exam Tip: </strong>
              {line.replace('Exam Tip:', '').trim()}
            </div>
          </div>
        );
      } else if (line.startsWith('-') || line.startsWith('•')) {
        elements.push(
          <li key={lIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-none flex items-start gap-2 my-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
            <span>{line.replace(/^[-•*\s]+/, '').trim()}</span>
          </li>
        );
      } else if (reMatchesNumberedItem(line)) {
        elements.push(
          <div key={lIdx} className="my-2 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            {line}
          </div>
        );
      } else {
        elements.push(
          <p key={lIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-2 font-sans">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  function reMatchesNumberedItem(str) {
    return /^\d+\.\s+[A-Za-z]/.test(str);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <FileText className="w-4 h-4" />
          <span>Section 4: Complete In-Depth Detailed Explanation</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
          {subsections.length} Detailed Subsections
        </span>
      </div>

      {/* Subsections Cards */}
      <div className="space-y-4">
        {subsections.map((sub, idx) => {
          const isExpanded = expandedSections[idx] !== false;

          return (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 shadow-md overflow-hidden transition-all"
            >
              {/* Subsection Header */}
              <button
                onClick={() => toggleSection(idx)}
                className="w-full p-5 sm:p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {sub.title}
                  </h3>
                </div>

                <div className="p-1 rounded-lg text-slate-400">
                  {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
              </button>

              {/* Subsection Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-950/40">
                  {renderFormattedContent(sub.content, idx)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
