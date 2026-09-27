import React, { useState } from 'react';
import { Layers, X, ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Circle } from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/flashcardData';

export default function FlashcardsDeckModal({ isOpen, onClose, onSelectTopic }) {
  const [selectedModule, setSelectedModule] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState({});

  if (!isOpen) return null;

  const filteredCards = selectedModule === 'all'
    ? FLASHCARDS_DATA
    : FLASHCARDS_DATA.filter(f => f.topicId.startsWith(selectedModule));

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isCardMastered = currentCard ? mastered[currentCard.id] : false;

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((currentIndex + 1) % filteredCards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((currentIndex - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleMastered = () => {
    if (!currentCard) return;
    setMastered(prev => ({ ...prev, [currentCard.id]: !prev[currentCard.id] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Interactive Flashcard Deck
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Card {currentIndex + 1} of {filteredCards.length}
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

        {/* Filter Bar */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Modules' },
            { id: '1', label: 'Module 1 (Architecture)' },
            { id: '3', label: 'Module 3 (NoSQL & MongoDB)' },
            { id: '4', label: 'Module 4 (Transactions)' },
            { id: '5', label: 'Module 5 (Data Mining & BI)' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedModule(m.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedModule === m.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Card Canvas */}
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center">
          {currentCard ? (
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`w-full h-64 rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between text-center cursor-pointer shadow-xl select-none ${
                isFlipped
                  ? 'bg-gradient-to-br from-purple-950/80 via-slate-900 to-indigo-950/80 border-purple-500/50 text-purple-100 ring-2 ring-purple-500/20'
                  : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Topic {currentCard.topicId}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500">
                  {isFlipped ? "Definition / Answer" : "Click to Flip"}
                </span>
              </div>

              <div className="text-base sm:text-lg font-bold my-auto leading-relaxed">
                {isFlipped ? currentCard.back : currentCard.front}
              </div>

              <div className="text-[10px] text-slate-400">
                {isFlipped ? "Tap to see question" : "Tap to reveal answer"}
              </div>
            </div>
          ) : (
            <div className="py-12 text-slate-400 text-xs">No flashcards in this filter.</div>
          )}
        </div>

        {/* Card Controls */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={toggleMastered}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isCardMastered
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            {isCardMastered ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
            <span>{isCardMastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={prevCard}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
              title="Previous Card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextCard}
              className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20 cursor-pointer"
              title="Next Card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
