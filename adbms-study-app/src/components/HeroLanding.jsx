import React from 'react';
import { 
  BookOpen, Sparkles, Clock, CheckCircle2, Award, 
  Layers, ArrowRight, Compass, ShieldCheck, Database, 
  Cpu, Workflow, Server, Zap, Check, FileCode, Code2
} from 'lucide-react';
import { BOOK_METADATA, MODULES_DATA, TOPICS_DATA } from '../data/courseData';

export default function HeroLanding({
  onStartLearning,
  onContinueReading,
  lastVisitedTopicId,
  completedTopics,
  onSelectTopic
}) {
  const progressPercent = Math.round((completedTopics.length / TOPICS_DATA.length) * 100);

  const getModuleIcon = (modId) => {
    switch(modId) {
      case 1: return Server;
      case 2: return FileCode;
      case 3: return Database;
      case 4: return Workflow;
      case 5: return Cpu;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner with Glass Layer & Soft Gradients */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-blue-50/50 via-white/80 to-indigo-50/30 dark:from-slate-900/80 dark:via-slate-950 dark:to-blue-950/20 shadow-2xl backdrop-blur-xl">
        
        {/* Abstract Glowing Backdrop Shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-600 text-white shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> GTU University Curriculum (BE SEM 5)
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              Subject Code: {BOOK_METADATA.subjectCode}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            {BOOK_METADATA.title}
          </h1>

          <p className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300 mb-2">
            {BOOK_METADATA.subtitle}
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">
            Authored by <strong className="text-slate-700 dark:text-slate-200">{BOOK_METADATA.author}</strong>. 
            Converted into a complete digital study textbook featuring interactive 2PL locking visualizers, 
            ORDBMS structured types & table inheritance steppers, XML / XPath / FLWOR playgrounds, 
            MongoDB query simulators, aggregation pipelines, ACID state machines, and real-time scheduling algorithms.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onStartLearning}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {lastVisitedTopicId && (
              <button
                onClick={onContinueReading}
                className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-blue-500/50 text-slate-800 dark:text-white font-semibold text-sm sm:text-base shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-blue-500" />
                <span>Continue Reading (Topic {lastVisitedTopicId})</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Quick Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">{TOPICS_DATA.length}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">In-Depth Topics</div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">{TOPICS_DATA.length}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Interactive Simulators</div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{BOOK_METADATA.totalPages}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Book Pages Equivalent</div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">{progressPercent}%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Your Completion</div>
          </div>
        </div>

      </section>

      {/* Modules & Topics Directory Grid */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Curriculum Modules & Topics
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select any topic below to dive into its complete structured lesson, interactive diagrams, and practice quiz
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULES_DATA.map(mod => {
            const modTopics = TOPICS_DATA.filter(t => t.moduleId === mod.id);
            const IconComp = getModuleIcon(mod.id);
            const completedInMod = modTopics.filter(t => completedTopics.includes(t.id)).length;

            return (
              <div
                key={mod.id}
                className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  {/* Module Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          Module {mod.id} • {mod.badge}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {mod.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {completedInMod}/{modTopics.length} Done
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Topics List Inside Module */}
                  <div className="space-y-2">
                    {modTopics.map(topic => {
                      const isCompleted = completedTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          onClick={() => onSelectTopic(topic.id)}
                          className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/70 dark:border-slate-800 hover:border-blue-500/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 mr-2">
                            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                              {topic.id}
                            </span>
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {topic.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-slate-400 font-mono">
                              {topic.estimatedTime}
                            </span>
                            {isCompleted && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            )}
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
