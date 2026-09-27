import React, { useState } from 'react';
import { Lock, Unlock, AlertTriangle, CheckCircle2, ShieldAlert, RotateCcw, ArrowRight, Play } from 'lucide-react';

export default function Simulator1_2() {
  const [activeTab, setActiveTab] = useState('2pl'); // '2pl', 'matrix', 'deadlock'
  
  // 2PL State
  const [phase, setPhase] = useState('growing'); // 'growing' or 'shrinking'
  const [locksHeld, setLocksHeld] = useState([]);
  const [log, setLog] = useState(['Transaction T1 initialized in GROWING phase.']);

  // Deadlock State
  const [t1Holds, setT1Holds] = useState('A');
  const [t1Waits, setT1Waits] = useState('B');
  const [t2Holds, setT2Holds] = useState('B');
  const [t2Waits, setT2Waits] = useState('A');

  const acquireLock = (item, type) => {
    if (phase === 'shrinking') {
      setLog(prev => [`❌ VIOLATION: Cannot acquire Lock on ${item} during SHRINKING phase! (2PL Rule)`, ...prev]);
      return;
    }
    if (locksHeld.some(l => l.item === item)) {
      setLog(prev => [`⚠️ Lock on ${item} is already held by T1.`, ...prev]);
      return;
    }
    setLocksHeld(prev => [...prev, { item, type }]);
    setLog(prev => [`🔒 Acquired ${type} Lock on Data Item [${item}]`, ...prev]);
  };

  const releaseLock = (item) => {
    if (phase === 'growing') {
      setPhase('shrinking');
      setLog(prev => [`⚡ Transitioned to SHRINKING PHASE. No further locks can be acquired!`, ...prev]);
    }
    setLocksHeld(prev => prev.filter(l => l.item !== item));
    setLog(prev => [`🔓 Released Lock on Data Item [${item}]`, ...prev]);
  };

  const reset2PL = () => {
    setPhase('growing');
    setLocksHeld([]);
    setLog(['Transaction T1 reset. Status: GROWING phase.']);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Concurrency Control & Locking Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Test 2PL Growing/Shrinking phases, Lock Compatibility Matrix & Deadlock Wait-for Graph
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('2pl')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === '2pl' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            2PL Phase Engine
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'matrix' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Compatibility Matrix
          </button>
          <button
            onClick={() => setActiveTab('deadlock')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'deadlock' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Deadlock WFG
          </button>
        </div>
      </div>

      {activeTab === '2pl' && (
        <div>
          {/* Phase Banner */}
          <div className={`p-4 rounded-xl mb-6 border flex items-center justify-between ${
            phase === 'growing' 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
              : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${phase === 'growing' ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                {phase === 'growing' ? <Lock className="w-5 h-5 text-emerald-400" /> : <Unlock className="w-5 h-5 text-amber-400" />}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-bold">Current Phase</div>
                <div className="text-base font-bold capitalize">{phase} Phase</div>
              </div>
            </div>
            <div className="text-xs text-right max-w-xs text-slate-300">
              {phase === 'growing' 
                ? 'Can acquire Shared (S) or Exclusive (X) locks. Releasing any lock starts Shrinking phase.'
                : 'Can only release locks. Attempting to acquire any new lock is strictly forbidden!'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Action Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Acquire Locks (Item A, B, C)
              </h5>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['A', 'B', 'C'].map(item => {
                  const isHeld = locksHeld.some(l => l.item === item);
                  return (
                    <div key={item} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <div className="text-sm font-bold text-slate-200 mb-2">Item {item}</div>
                      {isHeld ? (
                        <button
                          onClick={() => releaseLock(item)}
                          className="w-full px-2 py-1 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40 rounded text-[11px] font-semibold flex items-center justify-center gap-1"
                        >
                          <Unlock className="w-3 h-3" /> Release
                        </button>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => acquireLock(item, 'Shared (S)')}
                            className="w-full px-2 py-1 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 rounded text-[10px] font-medium"
                          >
                            Lock S (Read)
                          </button>
                          <button
                            onClick={() => acquireLock(item, 'Exclusive (X)')}
                            className="w-full px-2 py-1 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 rounded text-[10px] font-medium"
                          >
                            Lock X (Write)
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-xs text-slate-400">Held Locks: {locksHeld.length}</span>
                <button
                  onClick={reset2PL}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
            </div>

            {/* Execution Audit Log */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Transaction 2PL Protocol Log
              </h5>
              <div className="flex-1 bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] overflow-y-auto max-h-48 space-y-1.5">
                {log.map((entry, idx) => (
                  <div key={idx} className={entry.includes('❌') ? 'text-rose-400' : entry.includes('⚡') ? 'text-amber-400' : entry.includes('🔒') ? 'text-blue-300' : 'text-slate-400'}>
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matrix' && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <h5 className="text-sm font-bold text-slate-200 mb-2">Lock Compatibility Matrix</h5>
          <p className="text-xs text-slate-400 mb-4">
            Relational databases use this rule to decide whether a second transaction can be granted a lock on an item already locked.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800">
              <thead>
                <tr className="bg-slate-900 text-slate-300 border-b border-slate-800">
                  <th className="p-3 border-r border-slate-800">Held Lock \ Requested Lock</th>
                  <th className="p-3 border-r border-slate-800">Shared Lock (S) - Read</th>
                  <th className="p-3">Exclusive Lock (X) - Write</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-3 font-bold bg-slate-900/60 border-r border-slate-800">Shared (S) Held</td>
                  <td className="p-3 bg-emerald-950/40 text-emerald-400 font-bold border-r border-slate-800">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Compatible (Allowed)</span>
                  </td>
                  <td className="p-3 bg-rose-950/40 text-rose-400 font-bold">
                    <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Conflict (Must Wait)</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold bg-slate-900/60 border-r border-slate-800">Exclusive (X) Held</td>
                  <td className="p-3 bg-rose-950/40 text-rose-400 font-bold border-r border-slate-800">
                    <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Conflict (Must Wait)</span>
                  </td>
                  <td className="p-3 bg-rose-950/40 text-rose-400 font-bold">
                    <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Conflict (Must Wait)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'deadlock' && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h5 className="text-sm font-bold text-slate-200">Deadlock Detection (Wait-For Graph)</h5>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            When Transaction T1 holds item A and waits for B, while T2 holds item B and waits for A, a circular wait (cycle) is created.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="flex items-center justify-around mb-4">
                <div className="p-3 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-300 font-mono font-bold text-sm">
                  T1<br/><span className="text-[10px] text-slate-400">Holds: {t1Holds}</span>
                </div>
                <div className="text-rose-400 font-mono font-bold animate-pulse text-sm">
                  ⇄ Waiting ⇄
                </div>
                <div className="p-3 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold text-sm">
                  T2<br/><span className="text-[10px] text-slate-400">Holds: {t2Holds}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Deadlock Cycle Detected: T1 → T2 → T1
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-2">
              <div className="font-bold text-slate-100">Deadlock Recovery Mechanisms:</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px]">
                <span className="text-blue-400 font-bold">1. Victim Selection:</span> The DB engine picks one transaction (e.g. youngest or lowest cost) to abort.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px]">
                <span className="text-purple-400 font-bold">2. Rollback:</span> Roll back the victim to break the cycle and release its locks.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px]">
                <span className="text-amber-400 font-bold">3. Starvation Prevention:</span> Ensure the same transaction is not continuously picked as the victim.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
