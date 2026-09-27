import React from 'react';
import { 
  BookOpen, Search, Moon, Sun, Layers, HelpCircle, 
  Bookmark, Edit3, Award, Menu, X, Sparkles, Compass, Maximize2, Minimize2, Palette
} from 'lucide-react';
import { BOOK_METADATA } from '../data/courseData';

export default function Navbar({
  currentView,
  setCurrentView,
  currentTheme,
  openAppearance,
  darkMode,
  setDarkMode,
  readingMode,
  setReadingMode,
  openSearch,
  openFlashcards,
  openQuiz,
  openFormulas,
  openNotes,
  toggleMobileMenu,
  mobileMenuOpen
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  ADBMS Study Guide
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  GTU Sem-5
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Interactive Edition • By Harshil Bhagora
              </p>
            </div>
          </button>
        </div>

        {/* Center: Search Bar Trigger */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            onClick={openSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search topics, definitions, formulas, or questions...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Mobile Search Button */}
          <button
            onClick={openSearch}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Flashcards button */}
          <button
            onClick={openFlashcards}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Interactive Flashcards"
          >
            <Layers className="w-4 h-4 text-purple-500" />
            <span>Flashcards</span>
          </button>

          {/* Practice Exam Button */}
          <button
            onClick={openQuiz}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Practice Questions & Mock Exam"
          >
            <Award className="w-4 h-4 text-emerald-500" />
            <span>Practice Exam</span>
          </button>

          {/* Formulas Button */}
          <button
            onClick={openFormulas}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Formulas & KaTeX Cheat Sheet"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Formulas</span>
          </button>

          {/* Notes & Bookmarks */}
          <button
            onClick={openNotes}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Personal Notes & Bookmarks"
          >
            <Bookmark className="w-4 h-4 text-blue-500" />
          </button>

          {/* Reading Mode Toggle */}
          <button
            onClick={() => setReadingMode(!readingMode)}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              readingMode 
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={readingMode ? "Exit Focus Reading Mode" : "Distraction-Free Reading Mode"}
          >
            {readingMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Appearance & Themes Selector Button */}
          <button
            onClick={openAppearance}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/25 transition-all shadow-xs cursor-pointer"
            title="Customize Themes & Visual Appearance"
          >
            <Palette className="w-4 h-4 text-purple-500 animate-pulse" />
            <span className="text-xs font-bold hidden md:inline capitalize">{currentTheme}</span>
          </button>

        </div>
      </div>
    </header>
  );
}
