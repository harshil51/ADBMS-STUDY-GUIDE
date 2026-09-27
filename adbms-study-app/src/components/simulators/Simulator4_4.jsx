import React, { useState } from 'react';
import { Plane, Hotel, Car, RotateCcw, CheckCircle2, XCircle, ArrowRight, Play, RefreshCw } from 'lucide-react';

export default function Simulator4_4() {
  const [sagaState, setSagaState] = useState('idle'); // 'idle', 'step1', 'step2', 'step3_fail', 'comp2', 'comp1', 'done_abort', 'success'
  const [forceFail, setForceFail] = useState(true);

  const runSaga = () => {
    setSagaState('step1'); // Book Flight

    setTimeout(() => {
      setSagaState('step2'); // Book Hotel

      setTimeout(() => {
        if (forceFail) {
          setSagaState('step3_fail'); // Car fails

          setTimeout(() => {
            setSagaState('comp2'); // Cancel Hotel

            setTimeout(() => {
              setSagaState('comp1'); // Cancel Flight

              setTimeout(() => {
                setSagaState('done_abort');
              }, 800);
            }, 1000);
          }, 1000);
        } else {
          setSagaState('success');
        }
      }, 1000);
    }, 1000);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Saga Pattern & Compensating Transactions Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate forward transactions (T1, T2, T3) and backward semantic compensation (C2, C1) on failure
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-300 flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={forceFail}
              onChange={e => setForceFail(e.target.checked)}
              disabled={sagaState !== 'idle' && sagaState !== 'done_abort' && sagaState !== 'success'}
              className="rounded text-blue-600 focus:ring-0"
            />
            Simulate Failure at Step 3 (Car Rental)
          </label>

          <button
            onClick={runSaga}
            disabled={sagaState !== 'idle' && sagaState !== 'done_abort' && sagaState !== 'success'}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
          >
            {sagaState !== 'idle' && sagaState !== 'done_abort' && sagaState !== 'success' ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            Run Saga
          </button>
        </div>
      </div>

      {/* Forward Pipeline */}
      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 mb-6">
        <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          Forward Transactions (Local Commits)
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className={`p-4 rounded-xl border transition-all ${
            sagaState === 'step1' || sagaState === 'step2' || sagaState === 'step3_fail' || sagaState === 'success'
              ? 'border-emerald-500 bg-emerald-950/30'
              : sagaState === 'comp1' || sagaState === 'done_abort'
              ? 'border-amber-500/40 bg-amber-950/20 opacity-70'
              : 'border-slate-800 bg-slate-900/60'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Plane className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-slate-200">T1: Book Airline Flight</span>
            </div>
            <p className="text-[11px] text-slate-400">Deducts seat inventory & charges airline fare.</p>
            {sagaState === 'comp1' && (
              <div className="mt-2 text-[10px] text-amber-400 font-mono">
                ⚡ Executing C1: Refund Flight Ticket...
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div className={`p-4 rounded-xl border transition-all ${
            sagaState === 'step2' || sagaState === 'step3_fail' || sagaState === 'success'
              ? 'border-emerald-500 bg-emerald-950/30'
              : sagaState === 'comp2' || sagaState === 'comp1' || sagaState === 'done_abort'
              ? 'border-amber-500/40 bg-amber-950/20 opacity-70'
              : 'border-slate-800 bg-slate-900/60'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Hotel className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-slate-200">T2: Reserve Hotel Room</span>
            </div>
            <p className="text-[11px] text-slate-400">Reserves deluxe room & locks dates.</p>
            {sagaState === 'comp2' && (
              <div className="mt-2 text-[10px] text-amber-400 font-mono">
                ⚡ Executing C2: Cancel Hotel Reservation...
              </div>
            )}
          </div>

          {/* Step 3 */}
          <div className={`p-4 rounded-xl border transition-all ${
            sagaState === 'success'
              ? 'border-emerald-500 bg-emerald-950/30'
              : sagaState === 'step3_fail' || sagaState === 'comp2' || sagaState === 'comp1' || sagaState === 'done_abort'
              ? 'border-rose-500 bg-rose-950/30'
              : 'border-slate-800 bg-slate-900/60'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">T3: Rent Rental Car</span>
            </div>
            <p className="text-[11px] text-slate-400">Attempts car booking at airport hub.</p>
            {sagaState === 'step3_fail' && (
              <div className="mt-2 text-[10px] text-rose-400 font-mono font-bold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> FAILED: No cars available!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Saga Outcome Banner */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
        <div className="text-slate-300">
          <span className="font-bold text-white">Saga Core Principle:</span> Because traditional database rollbacks cannot undo already committed sub-transactions in distributed microservices, the system issues backward compensating transactions ($C_i$) to semantically reverse committed work.
        </div>
        {sagaState === 'done_abort' && (
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg font-mono font-bold text-[11px] shrink-0 ml-4">
            Compensations Finished (Clean Rollback)
          </span>
        )}
      </div>
    </div>
  );
}
