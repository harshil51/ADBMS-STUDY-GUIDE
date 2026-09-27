import React, { useState } from 'react';
import { 
  ChevronDown, ChevronRight, CheckCircle2, Circle, Clock, 
  Layers, Award, Sparkles, BookOpen, Bookmark, Home, Check
} from 'lucide-react';
import { MODULES_DATA, TOPICS_DATA } from '../data/courseData';

export default function Sidebar({
  currentView,
  setCurrentView,
  currentTopicId,
  setCurrentTopicId,
  completedTopics,
  toggleTopicCompleted,
  openFlashcards,
  openQuiz,
  openFormulas,
  openNotes,
  closeMobileMenu
}) {
  const [expandedModules, setExpandedModules] = useState({ 1: true, 3: true, 4: true, 5: true });
  const [filterText, setFilterText] = useState('');

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const progressPercent = Math.round((completedTopics.length / TOPICS_DATA.length) * 100);

  const filteredTopics = filterText
    ? TOPICS_DATA.filter(t => t.title.toLowerCase().includes(filterText.toLowerCase()) || t.id.includes(filterText))
    : TOPICS_DATA;

  const handleSelectTopic = (topicId) => {
    setCurrentTopicId(topicId);
    setCurrentView('topic');
    if (closeMobileMenu) closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md flex flex-col justify-between">
      
      <div>
        {/* Progress Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 border border-blue-500/20 mb-4">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-700 dark:text-slate-300">Study Progress</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>{completedTopics.length} of {TOPICS_DATA.length} topics finished</span>
            <button
              onClick={() => { setCurrentView('home'); if (closeMobileMenu) closeMobileMenu(); }}
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <Home className="w-3 h-3" /> Home
            </button>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter topics..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Modules & Topics Hierarchy */}
        <div className="space-y-3">
          {MODULES_DATA.map(mod => {
            const modTopics = filteredTopics.filter(t => t.moduleId === mod.id);
            if (modTopics.length === 0) return null;
            const isExpanded = expandedModules[mod.id];
            const modCompletedCount = modTopics.filter(t => completedTopics.includes(t.id)).length;

            return (
              <div key={mod.id} className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-2.5 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center font-mono">
                      M{mod.id}
                    </span>
                    <span className="font-heading font-bold text-xs text-slate-800 dark:text-slate-200">
                      {mod.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="text-[10px] font-mono">
                      {modCompletedCount}/{modTopics.length}
                    </span>
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Topics List */}
                {isExpanded && (
                  <div className="p-1 space-y-0.5 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40">
                    {modTopics.map(t => {
                      const isActive = currentView === 'topic' && currentTopicId === t.id;
                      const isCompleted = completedTopics.includes(t.id);

                      return (
                        <div
                          key={t.id}
                          className={`group flex items-center justify-between p-2 rounded-lg text-xs transition-all ${
                            isActive
                              ? 'bg-blue-600 text-white font-semibold shadow-sm'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <button
                            onClick={() => handleSelectTopic(t.id)}
                            className="flex-1 flex items-start gap-2 text-left cursor-pointer mr-1"
                          >
                            <span className={`font-mono text-[10px] mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                              {t.id}
                            </span>
                            <span className="line-clamp-2 leading-tight">
                              {t.title}
                            </span>
                          </button>

                          <div className="flex items-center gap-1 shrink-0">
                            <span className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                              {t.estimatedTime}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTopicCompleted(t.id);
                              }}
                              className={`p-1 rounded hover:scale-110 transition-transform ${
                                isCompleted
                                  ? isActive ? 'text-white' : 'text-emerald-500'
                                  : isActive ? 'text-blue-200' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'
                              }`}
                              title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                            >
                              {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar Quick Shortcuts */}
      <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
        <button
          onClick={() => { openFlashcards(); if (closeMobileMenu) closeMobileMenu(); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <Layers className="w-4 h-4 text-purple-500" />
          <span>Interactive Flashcards</span>
        </button>

        <button
          onClick={() => { openQuiz(); if (closeMobileMenu) closeMobileMenu(); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <Award className="w-4 h-4 text-emerald-500" />
          <span>GTU Exam Practice Mock</span>
        </button>

        <button
          onClick={() => { openFormulas(); if (closeMobileMenu) closeMobileMenu(); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>KaTeX Formula Sheet</span>
        </button>

        <button
          onClick={() => { openNotes(); if (closeMobileMenu) closeMobileMenu(); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <Bookmark className="w-4 h-4 text-blue-500" />
          <span>Personal Notes & Bookmarks</span>
        </button>
      </div>

    </aside>
  );
}
