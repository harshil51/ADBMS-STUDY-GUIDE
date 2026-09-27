import React, { useState } from 'react';
import { Globe, Server, Check, X, ShieldAlert, CheckCircle2, Play, RefreshCw, Split } from 'lucide-react';

export default function Simulator1_4() {
  const [activeTab, setActiveTab] = useState('2pc'); // '2pc' or 'fragmentation'
  
  // 2PC State
  const [phase, setPhase] = useState('idle'); // 'idle', 'preparing', 'voting', 'committing', 'done'
  const [votes, setVotes] = useState({ site1: true, site2: true, site3: true });
  const [finalDecision, setFinalDecision] = useState(null); // 'GLOBAL-COMMIT' or 'GLOBAL-ABORT'
  const [stepLogs, setStepLogs] = useState([]);

  // Fragmentation state
  const [fragType, setFragType] = useState('horizontal');

  const start2PC = () => {
    setPhase('preparing');
    setFinalDecision(null);
    setStepLogs(['Phase 1: Coordinator broadcasts PREPARE message to all participant sites.']);

    setTimeout(() => {
      setPhase('voting');
      const allYes = votes.site1 && votes.site2 && votes.site3;
      setStepLogs(prev => [
        `Participant Sites responded: Site1=${votes.site1 ? 'YES' : 'NO'}, Site2=${votes.site2 ? 'YES' : 'NO'}, Site3=${votes.site3 ? 'YES' : 'NO'}.`,
        ...prev
      ]);

      setTimeout(() => {
        setPhase('committing');
        if (allYes) {
          setFinalDecision('GLOBAL-COMMIT');
          setStepLogs(prev => ['Phase 2: All sites voted YES. Coordinator broadcasts GLOBAL-COMMIT message.', ...prev]);
        } else {
          setFinalDecision('GLOBAL-ABORT');
          setStepLogs(prev => ['Phase 2: One or more sites voted NO. Coordinator broadcasts GLOBAL-ABORT message.', ...prev]);
        }

        setTimeout(() => {
          setPhase('done');
          setStepLogs(prev => ['Consensus finalized across all distributed sites.', ...prev]);
        }, 800);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Distributed 2-Phase Commit (2PC) & Fragmentation Simulator
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Simulate consensus voting in distributed transactions and inspect data fragmentation strategies
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('2pc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === '2pc' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Two-Phase Commit (2PC)
          </button>
          <button
            onClick={() => setActiveTab('fragmentation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'fragmentation' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fragmentation Explorer
          </button>
        </div>
      </div>

      {activeTab === '2pc' && (
        <div>
          {/* Coordinator & Sites Diagram */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 mb-6">
            
            {/* Coordinator Header */}
            <div className="max-w-md mx-auto p-4 rounded-xl bg-blue-950/60 border border-blue-500/40 text-center mb-8 relative">
              <div className="text-xs text-blue-300 font-mono font-bold uppercase tracking-wider mb-1">
                Coordinator Node (Site 0)
              </div>
              <div className="text-sm font-bold text-white">Transaction Manager</div>
              <div className="mt-2 text-xs font-mono">
                Status: <span className="text-blue-400 font-bold uppercase">{phase}</span>
                {finalDecision && (
                  <span className={`ml-2 px-2 py-0.5 rounded text-[11px] font-bold ${
                    finalDecision === 'GLOBAL-COMMIT' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {finalDecision}
                  </span>
                )}
              </div>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'site1', name: 'Participant Site A (New York)', region: 'East DC' },
                { id: 'site2', name: 'Participant Site B (London)', region: 'EU DC' },
                { id: 'site3', name: 'Participant Site C (Tokyo)', region: 'Asia DC' }
              ].map(site => (
                <div key={site.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-200">{site.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{site.region}</span>
                  </div>

                  <div className="text-xs text-slate-400 mb-3">
                    Simulate Site Health / Resource Vote:
                  </div>

                  <button
                    onClick={() => setVotes(prev => ({ ...prev, [site.id]: !prev[site.id] }))}
                    disabled={phase === 'preparing' || phase === 'voting' || phase === 'committing'}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                      votes[site.id]
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40'
                        : 'bg-rose-950/40 text-rose-300 border-rose-500/40 hover:bg-rose-900/40'
                    }`}
                  >
                    {votes[site.id] ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />}
                    Will Vote: {votes[site.id] ? 'YES (Ready)' : 'NO (Abort/Crash)'}
                  </button>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Tip: Toggle any site to "NO" to witness how 2PC aborts globally to prevent partial writes.
              </div>
              <button
                onClick={start2PC}
                disabled={phase === 'preparing' || phase === 'voting' || phase === 'committing'}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
              >
                {phase !== 'idle' && phase !== 'done' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                Execute 2PC Protocol
              </button>
            </div>
          </div>

          {/* Audit Log */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Distributed Protocol Audit Log
            </h5>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-[11px] space-y-1 max-h-32 overflow-y-auto">
              {stepLogs.length === 0 ? (
                <div className="text-slate-500">Ready. Click "Execute 2PC Protocol" to simulate.</div>
              ) : (
                stepLogs.map((log, i) => (
                  <div key={i} className={log.includes('GLOBAL-COMMIT') ? 'text-emerald-400 font-bold' : log.includes('GLOBAL-ABORT') ? 'text-rose-400 font-bold' : 'text-blue-300'}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fragmentation' && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h5 className="text-sm font-bold text-slate-200">Table Fragmentation Strategies</h5>
              <p className="text-xs text-slate-400">How distributed systems split relational tables across remote physical sites</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFragType('horizontal')}
                className={`px-3 py-1 rounded text-xs font-semibold border ${
                  fragType === 'horizontal' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Horizontal (Split by Rows)
              </button>
              <button
                onClick={() => setFragType('vertical')}
                className={`px-3 py-1 rounded text-xs font-semibold border ${
                  fragType === 'vertical' ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Vertical (Split by Columns)
              </button>
            </div>
          </div>

          {fragType === 'horizontal' ? (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/30 text-xs text-blue-300">
                <span className="font-bold">Horizontal Fragmentation:</span> Tuples (rows) of the table are split into subsets using selection predicates (`WHERE location = '...'`).
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] mb-1 font-sans">Fragment 1 (Site NYC)</div>
                  <div className="text-emerald-400 font-bold mb-2">SELECT * FROM Account WHERE branch = 'NYC';</div>
                  <table className="w-full text-left text-[11px] border border-slate-800">
                    <tr className="border-b border-slate-800 text-slate-400"><th>Acc_No</th><th>Name</th><th>Branch</th></tr>
                    <tr><td>101</td><td>Alice</td><td>NYC</td></tr>
                    <tr><td>102</td><td>Bob</td><td>NYC</td></tr>
                  </table>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] mb-1 font-sans">Fragment 2 (Site London)</div>
                  <div className="text-purple-400 font-bold mb-2">SELECT * FROM Account WHERE branch = 'London';</div>
                  <table className="w-full text-left text-[11px] border border-slate-800">
                    <tr className="border-b border-slate-800 text-slate-400"><th>Acc_No</th><th>Name</th><th>Branch</th></tr>
                    <tr><td>201</td><td>Charlie</td><td>London</td></tr>
                    <tr><td>202</td><td>Diana</td><td>London</td></tr>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/30 text-xs text-purple-300">
                <span className="font-bold">Vertical Fragmentation:</span> Attributes (columns) of the table are split. <span className="underline">The Primary Key must be included in all fragments</span> so they can be rejoined.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] mb-1 font-sans">Fragment 1 (Public Portal Site)</div>
                  <div className="text-blue-400 font-bold mb-2">SELECT Emp_ID, Name, Department FROM Employee;</div>
                  <table className="w-full text-left text-[11px] border border-slate-800">
                    <tr className="border-b border-slate-800 text-slate-400"><th>Emp_ID (PK)</th><th>Name</th><th>Dept</th></tr>
                    <tr><td>E1</td><td>John Doe</td><td>Engineering</td></tr>
                  </table>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] mb-1 font-sans">Fragment 2 (HR & Payroll Site)</div>
                  <div className="text-amber-400 font-bold mb-2">SELECT Emp_ID, Salary, Bank_Acc FROM Employee;</div>
                  <table className="w-full text-left text-[11px] border border-slate-800">
                    <tr className="border-b border-slate-800 text-slate-400"><th>Emp_ID (PK)</th><th>Salary</th><th>Bank_Acc</th></tr>
                    <tr><td>E1</td><td>$120,000</td><td>****9821</td></tr>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
