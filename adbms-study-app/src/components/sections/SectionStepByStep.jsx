import React, { useState, useEffect } from 'react';
import { Workflow, Play, Pause, RotateCcw, ChevronRight, ChevronLeft, CheckCircle2, ArrowDown } from 'lucide-react';

export default function SectionStepByStep({ stepByStep }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  let stepsList = [];
  if (Array.isArray(stepByStep)) {
    stepsList = stepByStep.map((s, idx) => ({
      step: s.step || idx + 1,
      title: s.title || `Stage ${idx + 1}`,
      description: s.description || s.content || ''
    }));
  } else if (typeof stepByStep === 'string') {
    const lines = stepByStep.split('\n').map(l => l.trim()).filter(l => l && l !== '↓');
    stepsList = lines.map((title, idx) => ({
      step: idx + 1,
      title,
      description: ''
    }));
  }

  useEffect(() => {
    let timer;
    if (isPlaying && stepsList.length > 0) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= stepsList.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, stepsList.length]);

  if (!stepsList || stepsList.length === 0) return null;

  const active = stepsList[currentStep] || stepsList[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          <Workflow className="w-4 h-4" />
          <span>Section 5: Step-by-Step Execution Stepper ({stepsList.length} Stages)</span>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Auto-Play'}</span>
          </button>
          <button
            onClick={() => { setIsPlaying(false); setCurrentStep(0); }}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stepper Visual Pipeline */}
      <div className="rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 bg-slate-900 text-white shadow-xl space-y-4">
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 rounded-full"
            style={{ width: `${((currentStep + 1) / stepsList.length) * 100}%` }}
          />
        </div>

        {/* Current Active Step Spotlight */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/40 shadow-inner flex flex-col items-center justify-center text-center space-y-3 min-h-[160px]">
          <span className="text-[11px] font-mono text-purple-400 font-bold uppercase tracking-wider">
            Active Execution Step #{active?.step || currentStep + 1} of {stepsList.length}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white max-w-xl">
            {active?.title}
          </h4>
          {active?.description && (
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm font-sans text-left max-w-2xl w-full whitespace-pre-line leading-relaxed">
              {active.description}
            </div>
          )}
        </div>

        {/* Step Navigation Dots / Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Prev Step
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[50%] py-1">
            {stepsList.map((st, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentStep === idx
                    ? 'w-6 bg-purple-500'
                    : currentStep > idx
                    ? 'w-2.5 bg-emerald-500'
                    : 'w-2.5 bg-slate-700'
                }`}
                title={`Step ${idx + 1}: ${st.title}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentStep(Math.min(stepsList.length - 1, currentStep + 1))}
            disabled={currentStep === stepsList.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold disabled:opacity-40 cursor-pointer"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
