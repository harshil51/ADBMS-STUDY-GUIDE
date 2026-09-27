import React, { useState } from 'react';
import { Server, Smartphone, Database, Layers, ShieldCheck, Zap, ArrowRight, CheckCircle2, Play, RefreshCw } from 'lucide-react';

export default function Simulator1_1() {
  const [tierMode, setTierMode] = useState('3-tier'); // '2-tier' or '3-tier'
  const [animating, setAnimating] = useState(false);
  const [step, setStep] = useState(0); // 0: idle, 1: client -> app, 2: app -> db, 3: db -> app, 4: app -> client

  const runSimulation = () => {
    if (animating) return;
    setAnimating(true);
    setStep(1);

    if (tierMode === '2-tier') {
      setTimeout(() => setStep(2), 700); // client -> db
      setTimeout(() => setStep(3), 1500); // db returns
      setTimeout(() => {
        setStep(4);
        setAnimating(false);
      }, 2200);
    } else {
      setTimeout(() => setStep(1), 400); // client -> app
      setTimeout(() => setStep(2), 1100); // app -> db
      setTimeout(() => setStep(3), 1900); // db -> app
      setTimeout(() => {
        setStep(4);
        setAnimating(false);
      }, 2700);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Interactive Architecture Flow Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate query processing and packet propagation in Two-Tier vs Three-Tier models
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => { setTierMode('2-tier'); setStep(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tierMode === '2-tier'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2-Tier (Client + DB)
          </button>
          <button
            onClick={() => { setTierMode('3-tier'); setStep(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tierMode === '3-tier'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3-Tier (Client + App + DB)
          </button>
        </div>
      </div>

      {/* Simulator Visual Canvas */}
      <div className="relative py-8 px-4 bg-slate-950 rounded-xl border border-slate-800/80 mb-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
          
          {/* Tier 1: Client */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            step === 1 || step === 4 ? 'border-blue-500 bg-blue-950/40 shadow-lg shadow-blue-500/20' : 'border-slate-800 bg-slate-900/60'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-200">Presentation Tier</h5>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                  {tierMode === '2-tier' ? 'Fat / Thick Client' : 'Thin Client (Browser/App)'}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {tierMode === '2-tier' 
                ? 'Runs UI + embeds SQL generation & business logic. Direct database driver.'
                : 'Handles user interaction and rendering only. Sends clean REST/API requests.'}
            </p>
            {step === 1 && (
              <div className="mt-3 text-[11px] text-blue-400 flex items-center gap-1 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" /> Dispatching Request...
              </div>
            )}
            {step === 4 && (
              <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Result Rendered in UI
              </div>
            )}
          </div>

          {/* Tier 2: Application Server (3-tier only) or Direct Link (2-tier) */}
          {tierMode === '3-tier' ? (
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              step === 2 || step === 3 ? 'border-purple-500 bg-purple-950/40 shadow-lg shadow-purple-500/20' : 'border-slate-800 bg-slate-900/60'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-200">Application Tier</h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                    Business Logic Server
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Validates business rules, enforces security, connection pooling, and formats responses.
              </p>
              {step === 2 && (
                <div className="mt-3 text-[11px] text-purple-400 flex items-center gap-1 font-mono">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" /> Validating & Querying DB...
                </div>
              )}
              {step === 3 && (
                <div className="mt-3 text-[11px] text-purple-300 flex items-center gap-1 font-mono">
                  <span className="w-2 h-2 rounded-full bg-purple-300 animate-ping" /> Transforming Result for Client...
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-amber-500/40 bg-amber-950/10 flex flex-col items-center justify-center text-center">
              <div className="text-amber-400 font-mono text-xs font-semibold mb-1">Direct Driver Connection</div>
              <div className="text-[11px] text-slate-400">ODBC / JDBC direct socket (No middle tier)</div>
              <div className="mt-2 text-[10px] text-amber-300/80 bg-amber-500/10 px-2 py-1 rounded">
                ⚠️ High security risk: DB exposed to network
              </div>
            </div>
          )}

          {/* Tier 3: Database Server */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            (tierMode === '2-tier' && step === 2) || (tierMode === '3-tier' && step === 2) ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/20' : 'border-slate-800 bg-slate-900/60'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-200">Data Tier</h5>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  RDBMS / Storage Engine
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Stores raw tables, indexes, enforces ACID constraints, and executes SQL execution plans.
            </p>
            {step === 2 && (
              <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Executing SQL Query...
              </div>
            )}
            {step === 3 && (
              <div className="mt-3 text-[11px] text-emerald-300 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Result Set Generated
              </div>
            )}
          </div>

        </div>

        {/* Action Controls */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-400">
            Current Status: <span className="text-slate-200 font-mono">{animating ? 'Processing Transaction...' : step === 4 ? 'Cycle Completed' : 'Ready'}</span>
          </div>
          <button
            onClick={runSimulation}
            disabled={animating}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
          >
            {animating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {animating ? 'Simulating...' : 'Send Test Query'}
          </button>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-slate-400 text-[11px] mb-1">Scalability</div>
          <div className={`font-bold ${tierMode === '3-tier' ? 'text-emerald-400' : 'text-amber-400'}`}>
            {tierMode === '3-tier' ? 'High (Load Balancers)' : 'Low (Server Bottleneck)'}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-slate-400 text-[11px] mb-1">Security</div>
          <div className={`font-bold ${tierMode === '3-tier' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {tierMode === '3-tier' ? 'High (DB Hidden)' : 'Low (Direct Access)'}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-slate-400 text-[11px] mb-1">Client Footprint</div>
          <div className="font-bold text-slate-200">
            {tierMode === '3-tier' ? 'Thin Client (Browser)' : 'Thick Client (Fat EXE)'}
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-slate-400 text-[11px] mb-1">Maintenance</div>
          <div className="font-bold text-slate-200">
            {tierMode === '3-tier' ? 'Update Server Only' : 'Update Every Client'}
          </div>
        </div>
      </div>
    </div>
  );
}
