import React, { useState, useEffect } from 'react';
import { Award, X, Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import confetti from 'canvas-confetti';

export default function PracticeExamModal({ isOpen, onClose }) {
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [questionCount, setQuestionCount] = useState(15);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    let timer;
    if (examStarted && !examFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished, timeLeft]);

  if (!isOpen) return null;

  const handleStartExam = () => {
    // Shuffle questions and slice
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, questionCount);
    setActiveQuestions(shuffled);
    setCurrentQIndex(0);
    setAnswers({});
    setTimeLeft(questionCount * 45); // 45 seconds per question
    setExamStarted(true);
    setExamFinished(false);
  };

  const handleSelectOption = (optIndex) => {
    const qId = activeQuestions[currentQIndex]?.id;
    if (!qId) return;
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleFinishExam = () => {
    setExamFinished(true);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const currentQ = activeQuestions[currentQIndex];

  // Calculate score
  let score = 0;
  activeQuestions.forEach(q => {
    if (answers[q.id] === q.correctIndex) {
      score++;
    }
  });

  const scorePercentage = activeQuestions.length > 0 ? Math.round((score / activeQuestions.length) * 100) : 0;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                GTU ADBMS Mock Practice Exam
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {examStarted && !examFinished ? `Question ${currentQIndex + 1} of ${activeQuestions.length}` : 'Self-Assessment Test Engine'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {examStarted && !examFinished && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!examStarted ? (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/20">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  University Exam Preparation Test
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                  Randomized questions drawn from all 4 Modules covering 2PL concurrency, parallel architectures, MongoDB queries, ACID, Real-Time transactions, and Data Mining.
                </p>
              </div>

              {/* Choose question count */}
              <div className="flex justify-center gap-3 text-xs font-semibold">
                {[
                  { count: 10, label: "Quick (10 Qs)" },
                  { count: 15, label: "Standard (15 Qs)" },
                  { count: 25, label: "Full Mock (25 Qs)" }
                ].map(item => (
                  <button
                    key={item.count}
                    onClick={() => setQuestionCount(item.count)}
                    className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                      questionCount === item.count
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleStartExam}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Begin Practice Test
              </button>
            </div>
          ) : !examFinished ? (
            <div className="space-y-6">
              {/* Question card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Topic {currentQ.topicId}</span>
                  <span className="text-blue-500 font-bold">{currentQ.difficulty}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-[10px] shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6 py-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-blue-500/10 border border-emerald-500/30 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
                  Score: {score} / {activeQuestions.length} ({scorePercentage}%)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {scorePercentage >= 80 ? "🌟 Outstanding Mastery! GTU Distinction Level." : scorePercentage >= 60 ? "👍 Good understanding! Review missed topics below." : "📚 Needs more revision. Practice flashcards and re-read topics."}
                </p>
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Question Review & Explanations
                </h5>
                {activeQuestions.map((q, idx) => {
                  const userAnswer = answers[q.id];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          #{idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <span className="text-emerald-500 font-bold flex items-center gap-1 shrink-0"><CheckCircle2 className="w-4 h-4" /> Correct</span>
                        ) : (
                          <span className="text-rose-500 font-bold flex items-center gap-1 shrink-0"><XCircle className="w-4 h-4" /> Incorrect</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Correct Option: <strong className="text-emerald-600 dark:text-emerald-400">{q.options[q.correctIndex]}</strong>
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 p-2 rounded">
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {examStarted && (
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {!examFinished ? (
              <>
                <button
                  onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                  disabled={currentQIndex === 0}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                {currentQIndex === activeQuestions.length - 1 ? (
                  <button
                    onClick={handleFinishExam}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    Submit Exam
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQIndex(currentQIndex + 1)}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    Next Question →
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => { setExamStarted(false); setExamFinished(false); }}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Another Practice Exam
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
