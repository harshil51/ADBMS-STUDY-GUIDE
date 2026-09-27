import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { TOPICS_DATA } from '../data/courseData';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { FLASHCARDS_DATA } from '../data/flashcardData';

export default function SearchModal({ isOpen, onClose, onSelectTopic }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search through Topics safely across all object properties
  const topicResults = query.trim()
    ? TOPICS_DATA.filter(t => {
        const q = query.toLowerCase().trim();
        const idMatch = t.id?.toLowerCase().includes(q);
        const titleMatch = t.title?.toLowerCase().includes(q);
        const moduleMatch = t.moduleName?.toLowerCase().includes(q);
        const overviewMatch = (t.overview?.whatIsIt || '').toLowerCase().includes(q);
        const detailedMatch = (t.detailedExplanation?.raw || '').toLowerCase().includes(q) ||
          (Array.isArray(t.detailedExplanation?.subsections) && t.detailedExplanation.subsections.some(s => 
            (s.title || '').toLowerCase().includes(q) || (s.content || '').toLowerCase().includes(q)
          ));
        const termsMatch = typeof t.importantTerms === 'string' 
          ? t.importantTerms.toLowerCase().includes(q) 
          : Array.isArray(t.terms) && t.terms.some(tm => (tm.term || '').toLowerCase().includes(q) || (tm.meaning || '').toLowerCase().includes(q));
        const analogiesMatch = Array.isArray(t.analogies) && t.analogies.some(a => (typeof a === 'string' ? a : a?.analogy || '').toLowerCase().includes(q));
        const examplesMatch = Array.isArray(t.examples) && t.examples.some(ex => (typeof ex === 'string' ? ex : ex?.code || ex?.description || '').toLowerCase().includes(q));

        return idMatch || titleMatch || moduleMatch || overviewMatch || detailedMatch || termsMatch || analogiesMatch || examplesMatch;
      })
    : [];

  // Search through Flashcards
  const flashcardResults = query.trim()
    ? FLASHCARDS_DATA.filter(f =>
        f.front.toLowerCase().includes(query.toLowerCase()) ||
        f.back.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Search through Quiz Questions
  const quizResults = query.trim()
    ? QUIZ_QUESTIONS.filter(q =>
        q.question.toLowerCase().includes(query.toLowerCase()) ||
        q.options.some(opt => opt.toLowerCase().includes(query.toLowerCase())) ||
        (q.explanation || '').toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handlePickTopic = (topicId) => {
    onSelectTopic(topicId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search concepts (e.g. 2PL, MongoDB find, ACID, Saga, BSON, Apriori)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-blue-500 opacity-60" />
              <p>Type keywords to search across all 21 textbook topics, definitions, formulas, and questions.</p>
            </div>
          ) : topicResults.length === 0 && flashcardResults.length === 0 && quizResults.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No direct matches found for "{query}". Try searching for terms like "locks", "2PC", "MongoDB", "ACID", or "ETL".
            </div>
          ) : (
            <>
              {/* Topic Results */}
              {topicResults.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Textbook Topics ({topicResults.length})
                  </div>
                  {topicResults.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handlePickTopic(t.id)}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                            Topic {t.id}
                          </span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {t.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {t.overview.whatIsIt}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              )}

              {/* Flashcards Results */}
              {flashcardResults.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider font-mono">
                    Flashcards & Definitions ({flashcardResults.length})
                  </div>
                  {flashcardResults.map(f => (
                    <div
                      key={f.id}
                      onClick={() => handlePickTopic(f.topicId)}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-left hover:border-purple-500/40 cursor-pointer transition-all"
                    >
                      <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">
                        {f.front}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300">
                        {f.back}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">Topic {f.topicId} → Open Topic</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quiz Results */}
              {quizResults.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    Practice Questions ({quizResults.length})
                  </div>
                  {quizResults.map(q => (
                    <div
                      key={q.id}
                      onClick={() => handlePickTopic(q.topicId)}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-left hover:border-emerald-500/40 cursor-pointer transition-all"
                    >
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        {q.question}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        Correct Answer: {q.options[q.correctIndex]}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">Topic {q.topicId} → Go to Quiz</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Navigate with mouse or keyboard</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-200 dark:bg-slate-800">
            Esc to close
          </kbd>
        </div>

      </div>
    </div>
  );
}
