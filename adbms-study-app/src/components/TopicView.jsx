import React, { useState, useEffect } from 'react';
import { 
  Clock, BookOpen, Bookmark, CheckCircle2, Circle, ArrowLeft, ArrowRight, 
  Sparkles, Layers, Award, Edit3, MessageSquare, ChevronRight, Check
} from 'lucide-react';
import SimulatorRegistry from './simulators/SimulatorRegistry';
import SectionOverview from './sections/SectionOverview';
import SectionBeginnerIntro from './sections/SectionBeginnerIntro';
import SectionAnalogies from './sections/SectionAnalogies';
import SectionDetailedExplanation from './sections/SectionDetailedExplanation';
import SectionStepByStep from './sections/SectionStepByStep';
import SectionTables from './sections/SectionTables';
import SectionTerms from './sections/SectionTerms';
import SectionExamples from './sections/SectionExamples';
import SectionAdvantagesLimitations from './sections/SectionAdvantagesLimitations';
import SectionApplications from './sections/SectionApplications';
import SectionKeyPoints from './sections/SectionKeyPoints';
import { TOPICS_DATA } from '../data/courseData';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { FLASHCARDS_DATA } from '../data/flashcardData';
import confetti from 'canvas-confetti';

export default function TopicView({
  topicId,
  onNavigateTopic,
  onBackToHome,
  isCompleted,
  onToggleCompleted,
  isBookmarked,
  onToggleBookmark,
  notes,
  onSaveNote
}) {
  const topic = TOPICS_DATA.find(t => t.id === topicId) || TOPICS_DATA[0];
  const topicQuestions = QUIZ_QUESTIONS.filter(q => q.topicId === topic.id);
  const topicFlashcards = FLASHCARDS_DATA.filter(f => f.topicId === topic.id);

  // Sub-tabs
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'simulator', 'steps', 'tables', 'quiz', 'flashcards', 'revision'
  
  // Interactive Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({});

  // Flashcards state
  const [flippedCards, setFlippedCards] = useState({});
  const [masteredCards, setMasteredCards] = useState({});

  // Personal Note State
  const [noteText, setNoteText] = useState(notes[topic.id] || '');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  useEffect(() => {
    setNoteText(notes[topic.id] || '');
    setSelectedAnswers({});
    setCheckedAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topic.id]);

  const handleSaveNote = () => {
    onSaveNote(topic.id, noteText);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    if (checkedAnswers[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckAnswer = (questionId, correctIndex) => {
    setCheckedAnswers(prev => ({ ...prev, [questionId]: true }));
    if (selectedAnswers[questionId] === correctIndex) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch(e) {}
    }
  };

  // Find previous and next topics for bottom bar navigation
  const currentIndex = TOPICS_DATA.findIndex(t => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? TOPICS_DATA[currentIndex - 1] : null;
  const nextTopic = currentIndex < TOPICS_DATA.length - 1 ? TOPICS_DATA[currentIndex + 1] : null;

  return (
    <div className="space-y-8 pb-20 animate-fade-in">
      
      {/* Breadcrumbs & Actions Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <button
            onClick={onBackToHome}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span>Module {topic.moduleId}: {topic.moduleName}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-bold">Topic {topic.id}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(topic.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Mark Completed Button */}
          <button
            onClick={() => onToggleCompleted(topic.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed' : 'Mark as Read'}</span>
          </button>
        </div>
      </div>

      {/* Topic Hero Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-blue-50/70 via-white to-purple-50/40 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/30 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-blue-600 text-white shadow-sm">
            Topic {topic.id}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            Module {topic.moduleId}: {topic.moduleName}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono ml-auto">
            <Clock className="w-3.5 h-3.5" /> {topic.estimatedTime} Read • Book Pages {topic.pages}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {topic.title}
        </h1>

        {/* What You Will Learn Card */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Core Learning Objectives
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Master architectural components, design tiers, and foundational rules</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Step-by-step algorithms, real-life analogies, and operational flowcharts</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Hands-on interactive simulator testing with live conflict/query models</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>GTU exam high-priority questions, misconceptions debunked & practice quiz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'all', label: 'Full Study Guide' },
          { id: 'simulator', label: 'Interactive Simulator' },
          { id: 'steps', label: 'Step-by-Step Flow' },
          { id: 'tables', label: 'Comparison Tables' },
          { id: 'quiz', label: `Practice Quiz (${topicQuestions.length})` },
          { id: 'flashcards', label: `Flashcards (${topicFlashcards.length})` },
          { id: 'revision', label: 'Quick Revision' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: FULL STUDY GUIDE (or Specific View) */}
      {(activeTab === 'all' || activeTab === 'simulator') && (
        <section className="space-y-10">
          
          {/* SECTION 1: TOPIC OVERVIEW & MOTIVATION */}
          <SectionOverview overview={topic.overview} />

          {/* SECTION 6 & 7: INTERACTIVE SIMULATOR */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                <Sparkles className="w-4 h-4" /> Section 6 & 7: Interactive Architecture & Simulator
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Live Interactive Web Component</span>
            </div>
            <SimulatorRegistry topicId={topic.id} />
          </div>

          {activeTab === 'all' && (
            <>
              {/* SECTION 2: BEGINNER FRIENDLY INTUITION & KEYWORDS */}
              <SectionBeginnerIntro beginnerIntro={topic.beginnerIntro} />

              {/* SECTION 3: REAL-LIFE ANALOGIES */}
              <SectionAnalogies analogies={topic.analogies} />

              {/* SECTION 4: COMPLETE DETAILED EXPLANATION */}
              <SectionDetailedExplanation detailedExplanation={topic.detailedExplanation} />

              {/* SECTION 5: STEP-BY-STEP STEPPER */}
              <SectionStepByStep stepByStep={topic.stepByStep} />

              {/* SECTION 8: COMPARATIVE TABLES */}
              <SectionTables tablesRaw={topic.tablesRaw} structuredTables={topic.structuredTables} />

              {/* SECTION 9: IMPORTANT TERMS GLOSSARY */}
              <SectionTerms terms={topic.terms} />

              {/* SECTION 10: MULTI-PERSPECTIVE EXAMPLES */}
              <SectionExamples examples={topic.examples} />

              {/* SECTION 11: ADVANTAGES & LIMITATIONS */}
              <SectionAdvantagesLimitations 
                advantages={topic.advantages} 
                limitations={topic.limitations} 
              />

              {/* SECTION 12: REAL-WORLD APPLICATIONS */}
              <SectionApplications applications={topic.applications} />

              {/* SECTION 13: KEY POINTS & EXAM TIPS */}
              <SectionKeyPoints keyPoints={topic.keyPoints} />
            </>
          )}

        </section>
      )}

      {/* TAB 2: STEP-BY-STEP FLOW */}
      {activeTab === 'steps' && (
        <SectionStepByStep stepByStep={topic.stepByStep} />
      )}

      {/* TAB 3: TABLES */}
      {activeTab === 'tables' && (
        <SectionTables tablesRaw={topic.tablesRaw} structuredTables={topic.structuredTables} />
      )}

      {/* TAB 4: PRACTICE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" />
              Topic Practice Questions ({topicQuestions.length} Questions)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test your conceptual understanding with immediate feedback and GTU exam explanations
            </p>
          </div>

          <div className="space-y-4">
            {topicQuestions.map((q, qIdx) => {
              const isChecked = checkedAnswers[q.id];
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      Question {qIdx + 1}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{q.difficulty}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {q.question}
                  </h4>

                  {/* Options List */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      let btnClass = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300";

                      if (isChecked) {
                        if (optIdx === q.correctIndex) {
                          btnClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold";
                        } else if (isThisSelected) {
                          btnClass = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-bold";
                        }
                      } else if (isThisSelected) {
                        btnClass = "border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-semibold";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswerSelect(q.id, optIdx)}
                          disabled={isChecked}
                          className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-[10px]">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isChecked && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Check Answer Button / Explanation */}
                  <div className="pt-2">
                    {!isChecked ? (
                      <button
                        onClick={() => handleCheckAnswer(q.id, q.correctIndex)}
                        disabled={selectedOpt === undefined}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-40 cursor-pointer"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                        isCorrect 
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-900 dark:text-emerald-300' 
                          : 'bg-rose-50 dark:bg-rose-950/30 border-rose-500/40 text-rose-900 dark:text-rose-300'
                      }`}>
                        <div className="font-bold mb-1">
                          {isCorrect ? "✅ Correct Answer!" : "❌ Incorrect."}
                        </div>
                        <div>{q.explanation}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-500" />
              Interactive Flashcards ({topicFlashcards.length} Cards)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any card to flip and reveal definitions and key rules
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicFlashcards.map((fc, idx) => {
              const isFlipped = flippedCards[fc.id];
              const isMastered = masteredCards[fc.id];

              return (
                <div
                  key={fc.id}
                  onClick={() => setFlippedCards(prev => ({ ...prev, [fc.id]: !prev[fc.id] }))}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer min-h-[160px] flex flex-col justify-between select-none ${
                    isFlipped
                      ? 'bg-purple-950/40 border-purple-500/50 text-purple-200'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-purple-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-mono">
                    <span>Card #{idx + 1}</span>
                    <span className="text-[10px] uppercase font-bold text-purple-400">
                      {isFlipped ? "Definition / Answer" : "Click to Flip"}
                    </span>
                  </div>

                  <div className="text-sm sm:text-base font-semibold text-center my-auto">
                    {isFlipped ? fc.back : fc.front}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-slate-800/50 text-[10px]">
                    <span className="text-slate-400">Topic {fc.topicId}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMasteredCards(prev => ({ ...prev, [fc.id]: !prev[fc.id] }));
                      }}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        isMastered
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isMastered ? "✓ Mastered" : "Mark Mastered"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: QUICK REVISION */}
      {activeTab === 'revision' && (
        <div className="space-y-6">
          <SectionKeyPoints keyPoints={topic.keyPoints} />
          <SectionAdvantagesLimitations 
            advantages={topic.advantages} 
            limitations={topic.limitations} 
          />
        </div>
      )}

      {/* Personal Notes Box for this topic */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            My Personal Study Notes for Topic {topic.id}
          </div>
          {noteSavedFeedback && (
            <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Note Saved to LocalStorage!
            </span>
          )}
        </div>

        <textarea
          rows={3}
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          placeholder="Write custom study notes, formulas, or reminders for this topic..."
          className="w-full p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSaveNote}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            Save Note
          </button>
        </div>
      </div>

      {/* Bottom Topic Navigation Bar */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {prevTopic ? (
          <button
            onClick={() => onNavigateTopic(prevTopic.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400">Previous Topic</div>
              <div className="font-bold">{prevTopic.id}: {prevTopic.title}</div>
            </div>
          </button>
        ) : <div />}

        {nextTopic && (
          <button
            onClick={() => onNavigateTopic(nextTopic.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer ml-auto"
          >
            <div className="text-right">
              <div className="text-[10px] text-blue-200">Next Topic</div>
              <div className="font-bold">{nextTopic.id}: {nextTopic.title}</div>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
