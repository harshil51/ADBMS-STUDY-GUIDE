import React from 'react';
import { BookOpen, Layers, Award, Sparkles, Heart, Compass, ShieldCheck } from 'lucide-react';
import { BOOK_METADATA, MODULES_DATA } from '../data/courseData';

export default function Footer({
  onSelectTopic,
  openFlashcards,
  openQuiz,
  openFormulas,
  openNotes
}) {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                  {BOOK_METADATA.title}
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400 block font-medium">
                  {BOOK_METADATA.subtitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Designed as a modern interactive digital study textbook for university students. 
              Complete GTU {BOOK_METADATA.branch} curriculum reference authored by {BOOK_METADATA.author}.
            </p>

            <div className="text-[11px] text-slate-400 font-mono">
              Subject Code: {BOOK_METADATA.subjectCode} • {BOOK_METADATA.totalPages} Pages Reference • {BOOK_METADATA.totalModules} Modules • {BOOK_METADATA.totalTopics} Topics
            </div>
          </div>

          {/* Modules Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-heading">
              Curriculum Modules
            </h4>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              {MODULES_DATA.map(mod => (
                <li key={mod.id}>
                  <button
                    onClick={() => {
                      const firstTopic = `${mod.id}.1`;
                      onSelectTopic(firstTopic);
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left"
                  >
                    Module {mod.id}: {mod.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Study Tools Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-heading">
              Study Tools
            </h4>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={openFlashcards}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Interactive Flashcards (Deck)
                </button>
              </li>
              <li>
                <button
                  onClick={openQuiz}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  GTU Practice Exam Mock
                </button>
              </li>
              <li>
                <button
                  onClick={openFormulas}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                >
                  KaTeX Formula Cheat Sheet
                </button>
              </li>
              <li>
                <button
                  onClick={openNotes}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  My Notes & Bookmarks
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} Advanced Database Systems Study Guide • All textbook contents preserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted for high-performance exam preparation</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
