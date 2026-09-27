import React, { useState } from 'react';
import { Activity, CheckCircle2, XCircle, RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Simulator4_1() {
  const [state, setState] = useState('ACTIVE'); // 'ACTIVE', 'PARTIALLY_COMMITTED', 'COMMITTED', 'FAILED', 'ABORTED'
  const [history, setHistory] = useState(['Transaction T1 initialized in ACTIVE state.']);

  const transitionTo = (newState, reason) => {
    setState(newState);
    setHistory(prev => [`↳ Transitioned to [${newState}]: ${reason}`, ...prev]);
  };

  const resetState = () => {
    setState('ACTIVE');
    setHistory(['Transaction T1 restarted in ACTIVE state.']);
  };

  const states = [
    { id: 'ACTIVE', label: 'Active', desc: 'Initial state; transaction executes read/write operations.' },
    { id: 'PARTIALLY_COMMITTED', label: 'Partially Committed', desc: 'Final statement executed; buffers awaiting disk sync.' },
    { id: 'COMMITTED', label: 'Committed', desc: 'Log records flushed to non-volatile storage. Transaction permanent.' },
    { id: 'FAILED', label: 'Failed', desc: 'Error detected (syntax error, division by zero, lock deadlock, or crash).' },
    { id: 'ABORTED', label: 'Aborted / Rolled Back', desc: 'Undo log applied; database restored to prior consistent state.' }
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Transaction State Machine & ACID Lifecycle
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate standard database transaction state transitions and failure recovery
          </p>
        </div>

        <button
          onClick={resetState}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset State
        </button>
      </div>

      {/* Visual State Nodes */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {states.map(st => {
            const isActive = state === st.id;
            const isCommitted = st.id === 'COMMITTED';
            const isAborted = st.id === 'ABORTED';
            return (
              <div
                key={st.id}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isActive
                    ? isCommitted
                      ? 'border-emerald-500 bg-emerald-950/60 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400'
                      : isAborted
                      ? 'border-rose-500 bg-rose-950/60 shadow-lg shadow-rose-500/20 ring-2 ring-rose-400'
                      : 'border-blue-500 bg-blue-950/60 shadow-lg shadow-blue-500/20 ring-2 ring-blue-400'
                    : 'border-slate-800 bg-slate-900/60 text-slate-500'
                }`}
              >
                <div className="text-xs font-bold mb-1">{st.label}</div>
                <div className="text-[10px] text-slate-400 line-clamp-2">{st.desc}</div>
              </div>
            );
          })}
        </div>

        {/* State Transition Triggers */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            Trigger State Actions (Current State: <span className="text-blue-400">{state}</span>)
          </div>

          <div className="flex flex-wrap gap-2">
            {state === 'ACTIVE' && (
              <>
                <button
                  onClick={() => transitionTo('PARTIALLY_COMMITTED', 'All read/write operations completed successfully.')}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Complete Operations → Partially Committed
                </button>
                <button
                  onClick={() => transitionTo('FAILED', 'Runtime exception / constraint violation occurred.')}
                  className="px-3.5 py-2 bg-rose-600/40 hover:bg-rose-600/60 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Trigger Error → Failed
                </button>
              </>
            )}

            {state === 'PARTIALLY_COMMITTED' && (
              <>
                <button
                  onClick={() => transitionTo('COMMITTED', 'Write-Ahead Log (WAL) and buffers flushed to disk.')}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Flush WAL to Disk → Commit (Permanent)
                </button>
                <button
                  onClick={() => transitionTo('FAILED', 'Disk I/O error or power crash during buffer flush.')}
                  className="px-3.5 py-2 bg-rose-600/40 hover:bg-rose-600/60 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  I/O Failure → Failed
                </button>
              </>
            )}

            {state === 'FAILED' && (
              <button
                onClick={() => transitionTo('ABORTED', 'Rollback engine applied undo logs to revert all changes.')}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Execute Rollback → Aborted (Restored)
              </button>
            )}

            {(state === 'COMMITTED' || state === 'ABORTED') && (
              <div className="text-xs text-slate-400 flex items-center gap-2">
                {state === 'COMMITTED' ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Transaction finalized successfully. Durability guaranteed!</span>
                ) : (
                  <span className="text-rose-400 font-bold flex items-center gap-1.5"><XCircle className="w-4 h-4" /> Transaction cleanly aborted. Atomicity preserved!</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Log */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px]">
        <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">State Transition History</div>
        <div className="space-y-1 max-h-28 overflow-y-auto">
          {history.map((h, idx) => (
            <div key={idx} className={h.includes('COMMITTED') ? 'text-emerald-300' : h.includes('ABORTED') || h.includes('FAILED') ? 'text-rose-300' : 'text-blue-300'}>
              {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
